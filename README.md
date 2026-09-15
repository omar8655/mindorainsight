# MindoraInsight

Work-mentality assessment platform — Vite + React, CRM-ready, rebranded away from TestLibrary.

## Brand & production standards

- [`BRAND.md`](BRAND.md) — naming & visual system  
- [`docs/PRODUCTION_REQUIREMENTS.md`](docs/PRODUCTION_REQUIREMENTS.md) — **full production constitution** (Clerk, Supabase, CRM, website, migration)  
- [`AGENTS.md`](AGENTS.md) — Cursor agent entrypoint  
- [`.cursor/rules/production-grade.mdc`](.cursor/rules/production-grade.mdc) — always-on Cursor rules  

## Stack

- **Vite + React 19 + TypeScript** — fast local UX
- **React Router** — multi-page app
- **Tailwind CSS v4** — design tokens (navy / amber / teal)
- **react-helmet-async** — per-route SEO titles & meta
- **`/admin` CRM shell** — leads, users, assessments tables ready to wire to an API
- **Target:** Clerk auth + Supabase data behind ports/adapters (see production docs)

## Run

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Routes

| Path | Purpose |
|------|---------|
| `/` | Marketing home |
| `/library` | Full assessment catalog |
| `/pricing` `/checkout` | Plans + demo checkout |
| `/test/:slug` | Take assessment + report |
| `/admin` | CRM overview (scaffold — not production CRM yet) |

## Note on SEO

SPA meta tags are in place. For maximum SEO later, add prerender/SSR (e.g. Vike) or keep a marketing site on a meta-framework — the UI package can stay shared with CRM.
