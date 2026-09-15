# Data model — MindoraInsight

Supabase/Postgres is the **current** persistence platform. Application code talks to **repository ports**; adapters may be swapped for self-hosted Postgres later.

## Identity

| Table | Purpose |
|-------|---------|
| `profiles` | App user row synced from **Clerk webhooks** (`clerk_user_id`). Auth alone does not create CRM rows. |

Roles: `customer` \| `staff` \| `admin` (prefer Clerk `app_metadata` for elevated claims; never trust user-editable metadata for authz).

## Assessments

| Table | Purpose |
|-------|---------|
| `assessments` | Optional catalog mirror of slugs/titles |
| `assessment_attempts` | In-progress + completed runs for portal progress |

Portal “tests completed” = count of `assessment_attempts` where `status = 'completed'` for `current_profile_id()`.

## CRM

| Table | Purpose |
|-------|---------|
| `contacts` | People |
| `leads` | Pipeline entry |
| `deals` | Opportunities |
| `audit_events` | Append-only audit |

## Auth model (Clerk ↔ Supabase)

- Native **third-party auth** (not deprecated JWT templates).
- RLS keys off `auth.jwt()->>'sub'` (Clerk user id) via `public.current_clerk_user_id()`.
- Client: Supabase JS with `accessToken: () => clerk.getToken()`.

## Migrations

Versioned SQL under `supabase/migrations/`.
