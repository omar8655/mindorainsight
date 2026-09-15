-- Row Level Security for MindoraInsight
-- Uses Clerk JWT `sub` via public.current_clerk_user_id()

alter table public.profiles enable row level security;
alter table public.assessments enable row level security;
alter table public.assessment_attempts enable row level security;
alter table public.contacts enable row level security;
alter table public.leads enable row level security;
alter table public.deals enable row level security;
alter table public.audit_events enable row level security;

-- Profiles: users read/update self; staff read all
drop policy if exists profiles_select_self_or_staff on public.profiles;
create policy profiles_select_self_or_staff
  on public.profiles for select
  using (
    clerk_user_id = public.current_clerk_user_id()
    or public.is_staff()
  );

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self
  on public.profiles for update
  using (clerk_user_id = public.current_clerk_user_id())
  with check (clerk_user_id = public.current_clerk_user_id());

-- Inserts come from service-role webhook sync (no public insert policy)

-- Assessments: published catalog readable by authenticated users
drop policy if exists assessments_select_published on public.assessments;
create policy assessments_select_published
  on public.assessments for select
  using (
    deleted_at is null
    and (is_published = true or public.is_staff())
  );

drop policy if exists assessments_staff_write on public.assessments;
create policy assessments_staff_write
  on public.assessments for all
  using (public.is_staff())
  with check (public.is_staff());

-- Attempts: owner only (staff can read)
drop policy if exists attempts_select_own_or_staff on public.assessment_attempts;
create policy attempts_select_own_or_staff
  on public.assessment_attempts for select
  using (
    profile_id = public.current_profile_id()
    or public.is_staff()
  );

drop policy if exists attempts_insert_own on public.assessment_attempts;
create policy attempts_insert_own
  on public.assessment_attempts for insert
  with check (profile_id = public.current_profile_id());

drop policy if exists attempts_update_own on public.assessment_attempts;
create policy attempts_update_own
  on public.assessment_attempts for update
  using (profile_id = public.current_profile_id())
  with check (profile_id = public.current_profile_id());

-- CRM tables: staff only
drop policy if exists contacts_staff_all on public.contacts;
create policy contacts_staff_all
  on public.contacts for all
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists leads_staff_all on public.leads;
create policy leads_staff_all
  on public.leads for all
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists deals_staff_all on public.deals;
create policy deals_staff_all
  on public.deals for all
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists audit_staff_select on public.audit_events;
create policy audit_staff_select
  on public.audit_events for select
  using (public.is_staff());

-- Authenticated role grants (no anon write paths)
grant usage on schema public to authenticated;
grant select, update on public.profiles to authenticated;
grant select on public.assessments to authenticated;
grant select, insert, update on public.assessment_attempts to authenticated;
grant select, insert, update, delete on public.contacts to authenticated;
grant select, insert, update, delete on public.leads to authenticated;
grant select, insert, update, delete on public.deals to authenticated;
grant select on public.audit_events to authenticated;
