# Architecture

## Current layout (`app/src`)

```text
src/
  pages/                 # Route screens (thin)
  layouts/               # Public + Admin shells
  components/
    layout/              # Header, Footer, Seo
    marketing/           # TestCard, FAQ, category pills
    ui/                  # (primitives — expand next)
  features/
    assessments/         # TestRunner
    crm/                 # CRM screens (uses application layer)
    auth/                # Clerk AuthProvider + login wrappers
    portal/              # (customer portal pages live in pages/ for now)
  application/           # Use-cases (CRM, portal, reviews)
  domain/                # Pure business rules
  ports/                 # AuthPort, DatabasePort, PortalPort…
  adapters/
    clerk/               # LocalAuthAdapter + ClerkAuthPort
    supabase/            # memory-db + browser client (accessToken)
    portal/              # memory + supabase portal adapters
    payments/ email/ storage/
  data/                  # Static catalog content
  config/                # Env flags (Clerk/Supabase)
  validation/ types/ hooks/ lib/ integrations/
```

## Layering

```
UI → Application services → Ports → Adapters (Clerk / Supabase / …)
```

- CRM overview/leads/contacts/deals call `application/crm` + `DatabasePort`.
- Portal progress calls `application/portal` + `PortalPort` (memory now; Supabase when Clerk token wired).
- Native Clerk ↔ Supabase third-party auth — **never** deprecated JWT templates.
- RLS uses `auth.jwt()->>'sub'` via `public.current_clerk_user_id()`.

## Supabase project

- Project: **MindoraInsight** (`hsqibxusbrvhapnctfuy`, `eu-west-2`)
- Migrations: `supabase/migrations/`
- Data model: `docs/DATA_MODEL.md`

## Visual system

Soft MindoraInsight palette (not neon):

| Token | Hex |
|-------|-----|
| Forest topbar | `#032514` |
| Soft green CTA | `#31B070` |
| Soft green wash | `#E8F6F1` |
| Blue accent | `#4880D9` |
| Text | `#1F2A33` |
| Cream mosaic | `#FBF5EE` |
| Sky growth | `#EDF2FB` |

See `BRAND.md` and `docs/PRODUCTION_REQUIREMENTS.md`.
