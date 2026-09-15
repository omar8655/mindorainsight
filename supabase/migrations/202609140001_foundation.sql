-- MindoraInsight foundation schema
-- Provider-portable: Clerk user id stored as text; RLS via auth.jwt()->>'sub'
-- Native Clerk ↔ Supabase third-party auth (NOT deprecated JWT templates)

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Profiles (synced from Clerk webhooks; auth alone does not create CRM rows)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null unique,
  email text,
  full_name text,
  image_url text,
  role text not null default 'customer'
    check (role in ('customer', 'staff', 'admin')),
  locale text default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists profiles_email_idx on public.profiles (email);
create index if not exists profiles_role_idx on public.profiles (role) where deleted_at is null;

-- ---------------------------------------------------------------------------
-- Assessment catalog mirror (optional sync from app catalog)
-- ---------------------------------------------------------------------------
create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  level text not null default 'intermediate'
    check (level in ('beginner', 'intermediate', 'advanced')),
  question_count int not null default 12 check (question_count > 0),
  estimated_minutes int not null default 10 check (estimated_minutes > 0),
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists assessments_published_idx
  on public.assessments (is_published)
  where deleted_at is null;

-- ---------------------------------------------------------------------------
-- Attempts / completions (customer portal progress)
-- ---------------------------------------------------------------------------
create table if not exists public.assessment_attempts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  assessment_id uuid references public.assessments (id) on delete set null,
  assessment_slug text not null,
  status text not null default 'in_progress'
    check (status in ('in_progress', 'completed', 'abandoned')),
  score_summary jsonb not null default '{}'::jsonb,
  answers jsonb not null default '[]'::jsonb,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists assessment_attempts_profile_idx
  on public.assessment_attempts (profile_id, completed_at desc);
create index if not exists assessment_attempts_slug_idx
  on public.assessment_attempts (assessment_slug);
create unique index if not exists assessment_attempts_one_open_idx
  on public.assessment_attempts (profile_id, assessment_slug)
  where status = 'in_progress';

-- ---------------------------------------------------------------------------
-- CRM foundation (staff)
-- ---------------------------------------------------------------------------
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  owner_profile_id uuid references public.profiles (id) on delete set null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists contacts_email_idx on public.contacts (email);
create index if not exists contacts_owner_idx on public.contacts (owner_profile_id);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid references public.contacts (id) on delete set null,
  title text not null,
  status text not null default 'new'
    check (status in ('new', 'qualified', 'proposal', 'won', 'lost')),
  source text,
  owner_profile_id uuid references public.profiles (id) on delete set null,
  score int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists leads_status_idx on public.leads (status) where deleted_at is null;

create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_id uuid references public.contacts (id) on delete set null,
  stage text not null default 'qualify'
    check (stage in ('qualify', 'proposal', 'negotiation', 'won', 'lost')),
  amount numeric(12, 2) not null default 0,
  currency text not null default 'USD',
  owner_profile_id uuid references public.profiles (id) on delete set null,
  expected_close_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists deals_stage_idx on public.deals (stage) where deleted_at is null;

-- ---------------------------------------------------------------------------
-- Audit log (append-oriented)
-- ---------------------------------------------------------------------------
create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_clerk_user_id text,
  action text not null,
  entity_type text not null,
  entity_id text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_events_created_idx on public.audit_events (created_at desc);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists assessments_set_updated_at on public.assessments;
create trigger assessments_set_updated_at
  before update on public.assessments
  for each row execute function public.set_updated_at();

drop trigger if exists assessment_attempts_set_updated_at on public.assessment_attempts;
create trigger assessment_attempts_set_updated_at
  before update on public.assessment_attempts
  for each row execute function public.set_updated_at();

drop trigger if exists contacts_set_updated_at on public.contacts;
create trigger contacts_set_updated_at
  before update on public.contacts
  for each row execute function public.set_updated_at();

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

drop trigger if exists deals_set_updated_at on public.deals;
create trigger deals_set_updated_at
  before update on public.deals
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Helpers for RLS (Clerk JWT sub)
-- ---------------------------------------------------------------------------
create or replace function public.current_clerk_user_id()
returns text
language sql
stable
as $$
  select nullif(auth.jwt()->>'sub', '');
$$;

create or replace function public.current_profile_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id
  from public.profiles
  where clerk_user_id = public.current_clerk_user_id()
    and deleted_at is null
  limit 1;
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where clerk_user_id = public.current_clerk_user_id()
      and role in ('staff', 'admin')
      and deleted_at is null
  );
$$;
