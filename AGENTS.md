# AGENTS.md — MindoraInsight

Instructions for Cursor agents working in this repository.

## Read first

1. [`docs/PRODUCTION_REQUIREMENTS.md`](docs/PRODUCTION_REQUIREMENTS.md) — binding production constitution  
2. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — current folder layout + ports/adapters  
3. [`BRAND.md`](BRAND.md) — soft forest/sage/blue palette (not neon; not TestLibrary trademark)  
4. [`.cursor/rules/production-grade.mdc`](.cursor/rules/production-grade.mdc) — always-on rules  

## Product

**MindoraInsight** — calm professional assessment platform + CRM foundation. Must remain visually and verbally distinct from TestLibrary.

## Stack direction

| Concern | Current | Rule |
|---------|---------|------|
| Auth | `AuthPort` → local adapter | Wire Clerk next (native Supabase third-party auth) |
| Data | `DatabasePort` → memory adapter | Wire Supabase repositories next |
| Frontend | Vite + React in `app/` only | Legacy `web/` Next app was removed |
| i18n | `app/src/i18n` + flag language switcher | Keep RTL support for Arabic |

## Active code

- App: **`app/`** (Vite) — only frontend to maintain  
- CRM: `app/src/features/crm` → `application/crm`  
- Marketing: `components/layout` + `components/marketing`  
- Hero must stay differentiated (split layout + slideshow), not a TestLibrary clone  
- Mosaic pill **colors** should not be casually changed  

## How to work

- Prefer small changes that deepen the production architecture.
- Never put secrets or `service_role` in the client.
- Keep colors soft (sage `#31B070`, forest `#032514`, blue `#4880D9`).
- Do not ship UI-only CRM stubs as “complete.”
