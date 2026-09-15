# Runbooks — MindoraInsight

## Clerk + Supabase (third-party auth)

1. Create a Clerk application; copy **Publishable key** into `app/.env` as `VITE_CLERK_PUBLISHABLE_KEY`.
2. In Clerk: **Connect → Supabase** (enable Supabase compatibility / session token `role: authenticated`).
3. In Supabase project **MindoraInsight**: **Authentication → Sign In / Providers → Third-party Auth → Clerk**; paste Clerk domain.
4. **Do not** use the deprecated Clerk Supabase JWT template.
5. Client uses `createClient(url, anonKey, { accessToken: () => clerk.getToken() })`.
6. Clerk webhooks (`user.created|updated|deleted`) must upsert `public.profiles` with `clerk_user_id` (service role, server only). Auth alone does not create profile rows.

## Local portal progress

Until webhook sync is live, completions are stored in `localStorage` via `adapters/portal/memory-portal.ts` so `/portal` still shows completed counts.

## Migrations

SQL lives in `supabase/migrations/`. Applied to project `hsqibxusbrvhapnctfuy`.

## If you want to leave Supabase later

Architecture is built so Supabase is a **current adapter**, not the product.

1. Keep using ports only: `DatabasePort`, `PortalPort`, `AuthPort` — never call `@supabase/supabase-js` from UI pages.
2. Write a new adapter (e.g. `adapters/postgres/pg-portal.ts` or a custom API client) that implements the same port interfaces.
3. Swap the wiring in `application/portal.ts` / `application/crm.ts` (composition root) to the new adapter.
4. Export schema from `docs/DATA_MODEL.md` / SQL migrations to your new Postgres (self-hosted, Neon, RDS, etc.).
5. Keep Clerk (or replace `adapters/clerk` the same way). JWT/`sub` mapping may change — update RLS or move authz into your API.

You do **not** rewrite the library, portal, or CRM screens if boundaries stay clean.
