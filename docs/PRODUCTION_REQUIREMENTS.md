# MindoraInsight — Production-Grade Project Requirements

> **Status:** Binding product & engineering constitution for this repository.  
> **Audience:** Humans and Cursor agents.  
> **Product:** MindoraInsight (not TestLibrary).  
> **Cursor rule:** `.cursor/rules/production-grade.mdc` (always apply)  
> **Agent entry:** `AGENTS.md`

This document defines the **non-negotiable** standard: build a **professional, production-ready, scalable commercial system** — not a prototype, demo, or collection of basic screens.

Every major surface — website, CRM, admin dashboard, customer portal, authentication, database, APIs, payments, communications, integrations, reporting, and internal tools — must be implemented with the completeness expected of a serious commercial product.

The system must be easy to **understand, maintain, extend, test, and migrate**.

---

## 0. Guiding principles

1. **Production over prototype** — loading, empty, success, failure, permissions, validation, audit, and recovery are part of “done.”
2. **Clean boundaries** — UI → Application services → Repositories/adapters → Infrastructure.
3. **Provider isolation** — Clerk and Supabase are current providers, not permanent architecture.
4. **Research before build** — use current official docs; never deprecated Clerk JWT templates for Supabase.
5. **No over-engineering** — abstractions only where they protect migration or prevent duplication.
6. **Security by default** — RLS, least privilege, no secrets in clients, clear authz.
7. **Brand** — MindoraInsight work-mentality / learning-curve positioning (`BRAND.md`).

---

## 1. Highly organised project structure

### 1.1 Target monorepo layout (target state)

```text
/
├── AGENTS.md
├── BRAND.md
├── README.md
├── docs/
│   ├── PRODUCTION_REQUIREMENTS.md   ← this file
│   ├── ARCHITECTURE.md
│   ├── DATA_MODEL.md
│   ├── API_CONTRACTS.md
│   └── RUNBOOKS.md
├── .cursor/rules/
│   └── production-grade.mdc
├── apps/
│   ├── web/                 # Public marketing site + assessment UX
│   ├── portal/              # Customer dashboard / account portal
│   ├── admin/               # Internal admin + CRM UI (or apps/crm)
│   └── api/                 # Optional dedicated API (future / progressive)
├── packages/
│   ├── ui/                  # Shared design system components
│   ├── config/              # Shared ESLint/TS/Tailwind tokens
│   ├── types/               # Shared domain types / DTOs
│   ├── validation/          # Zod (or equivalent) schemas
│   ├── domain/              # Pure business rules (no I/O)
│   ├── application/         # Use-cases / application services
│   ├── auth/                # Auth port + Clerk adapter
│   ├── db/                  # Repository ports + Supabase adapter
│   ├── payments/            # Payments port + provider adapter
│   ├── email/               # Email port + provider adapter
│   ├── storage/             # Files/storage port + adapter
│   ├── notifications/       # In-app / push notification services
│   ├── analytics/           # Analytics adapter
│   └── utils/               # Shared helpers (no domain leakage)
├── supabase/                # Migrations, seed, config (or infra/supabase)
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

Until the monorepo split is complete, mirror this **logical** structure inside the current app (`app/src/...`) using the same names.

### 1.2 Required source folders (logical)

| Area | Responsibility |
|------|----------------|
| `pages/` / `routes/` | Route composition only |
| `components/ui/` | Primitive UI |
| `components/features/<feature>/` | Feature-specific UI |
| `features/crm/` | CRM UI + feature hooks (no raw SQL) |
| `features/auth/` | Auth UI wrappers |
| `application/` | Use-cases / orchestration |
| `domain/` | Business rules, entities, value objects |
| `repositories/` or `ports/` | Interfaces for persistence |
| `adapters/supabase/` | Supabase-specific implementations |
| `adapters/clerk/` | Clerk-specific implementations |
| `adapters/payments/` | Stripe (or chosen PSP) |
| `adapters/email/` | Resend/SendGrid/etc. |
| `services/` | Cross-cutting application services |
| `integrations/` | Webhooks, third-party sync |
| `validation/` | Input schemas |
| `types/` | Shared TypeScript types |
| `hooks/` | React hooks (thin; call application layer) |
| `state/` | Client state (prefer server state + cache) |
| `config/` | Env, feature flags |
| `constants/` | Enums, static config |
| `lib/` / `utils/` | Pure helpers |
| `email/` templates | Transactional templates |
| `storage/` | Upload helpers via storage port |
| `payments/` | Checkout/billing UX via payments port |
| `notifications/` | Toast/in-app notification system |
| `analytics/` | Event tracking via analytics port |
| `tests/` | Co-located or top-level tests |
| `docs/` | Architecture & runbooks |

### 1.3 Structure rules

- Do **not** dump unrelated logic into large files.
- Do **not** scatter CRM code across random folders.
- Avoid deep nesting, duplicate utilities, unclear names.
- Consistent naming: `kebab-case` files for UI routes if preferred; `PascalCase` components; `camelCase` functions; `SCREAMING_SNAKE` only for true constants.
- One primary responsibility per module.

---

## 2. Clear separation of responsibilities

```text
UI (React)
  → Application Services / Use-cases
    → Domain (pure rules)
    → Ports (interfaces)
      → Adapters (Clerk / Supabase / Stripe / Email / Storage)
```

### Must

- UI must **not** contain large business logic blocks.
- Database queries must **not** live in random components.
- Auth logic must **not** be duplicated across features.
- Business rules must be reusable outside presentation.
- External services only via dedicated adapters.

### Must not

- Import `@supabase/supabase-js` from deep UI leaf components for ad-hoc queries.
- Call Clerk low-level APIs from CRM feature tables.
- Encode RLS assumptions only in the frontend.

---

## 3. Authentication — Clerk

### 3.1 Clerk owns

- Sign up / sign in / sign out  
- Password / account recovery (as configured)  
- Email verification (as configured)  
- Session management  
- Protected routes  
- User identity  
- User metadata (prefer **app_metadata** for authorization-related data; never trust user-editable metadata for authz)  
- Organisations / teams where required  
- Role / permission integration  
- Auth error, loading, and failure states  

### 3.2 Abstraction requirement

Introduce an application **AuthPort**:

```ts
// conceptual
interface AuthPort {
  getCurrentUser(): Promise<AppUser | null>
  getSessionToken(): Promise<string | null>
  requireUser(): Promise<AppUser>
  hasPermission(permission: Permission): Promise<boolean>
  signOut(): Promise<void>
}
```

- UI and application services depend on `AuthPort` / `AppUser`.
- `adapters/clerk` implements the port.
- Migration off Clerk later replaces the adapter, not the product.

### 3.3 Clerk + Supabase (current recommended approach)

**Do not use the deprecated Clerk Supabase JWT template** (deprecated ~1 Apr 2025).

Use the **native Supabase third-party auth + Clerk** integration:

1. Enable Supabase compatibility in Clerk (Connect with Supabase).
2. Register Clerk under Supabase **Authentication → Third-Party Auth**.
3. Ensure Clerk session tokens include `"role": "authenticated"`.
4. Create Supabase clients with Clerk session token via `accessToken` callback.
5. RLS policies use `auth.jwt()->>'sub'` (Clerk user id).

Official references:

- https://clerk.com/docs/guides/development/integrations/databases/supabase  
- https://supabase.com/docs/guides/auth/third-party/clerk  

### 3.4 User synchronisation

Third-party auth **does not** auto-sync user profile rows into Postgres.

For local CRM / portal data:

- Clerk webhooks: `user.created`, `user.updated`, `user.deleted` (+ org events if used).
- Verified webhook handler upserts into `profiles` / `memberships`.
- Keep `clerk_user_id` as the stable external identity key.

### 3.5 Auth UX requirements

- Protected routes with clear redirects.
- Loading and failure states (never blank white screens).
- Expired session recovery.
- Permission-denied UI (not silent empty tables).

---

## 4. Backend & database — Supabase (current)

Supabase may provide:

- PostgreSQL  
- Queries  
- Storage  
- Realtime (only where required)  
- Edge Functions / server-side handlers  
- Migrations  
- DB functions  

### Critical rule

**Do not tightly couple the application to Supabase APIs everywhere.**

```text
Now:   UI → Application → Repository Port → Supabase Adapter
Later: UI → Application → Repository Port → Postgres / Custom API Adapter
```

Isolate:

- Supabase client construction  
- Storage bucket APIs  
- Realtime subscriptions  
- Edge Function paths  

behind ports/adapters.

---

## 5. Extremely easy backend migration

Must support future moves to:

- Another managed Postgres  
- Self-hosted Postgres  
- Dedicated API server  
- Alternate storage / realtime / email providers  

### Rules

- Business logic never imports provider SDKs.
- DTOs and domain models are provider-agnostic.
- Migrations are SQL-first and portable (avoid proprietary features unless abstracted).
- Document every Supabase-only dependency in `docs/ARCHITECTURE.md`.

Do **not** invent a framework of pointless interfaces. Add ports when:

- An external provider is involved, or  
- The same operation is used from multiple features.

---

## 6. Future custom backend support

Target evolution:

```text
Frontend → API (OpenAPI/tRPC/REST) → Backend services → Database
```

can replace:

```text
Frontend → Supabase client
```

without rebuilding the frontend.

Distinguish clearly:

| Layer | Contents |
|-------|----------|
| UI | Presentation, forms, route guards |
| Application / business logic | Use-cases |
| API / service contracts | Stable DTOs & errors |
| Data access | Repository ports |
| Infrastructure | Clerk, Supabase, Stripe, etc. |

---

## 7. Backend research before implementation

Before implementing backend pieces, research current official docs for:

- Clerk + Supabase third-party auth  
- User sync via webhooks  
- PostgreSQL schema design  
- RLS design  
- Server-side / service-role access patterns  
- Permissions model  
- API architecture  
- Repository/service patterns  
- Storage + Realtime necessity  
- Background jobs  
- Webhooks  
- Email  
- File handling  
- Transactions  
- Migrations  
- Backups  
- Logging / monitoring  
- Error handling  
- Scalability / security  
- Data portability / self-hosting  

**Forbidden:** outdated tutorials; deprecated Clerk JWT templates for Supabase; putting `service_role` keys in the browser.

---

## 8. Database architecture

### 8.1 Standards

- Proper relational modelling  
- Primary keys (prefer `uuid` for public ids)  
- Foreign keys + constraints  
- Indexes for real query paths  
- Appropriate types  
- `created_at` / `updated_at`  
- Soft delete (`deleted_at`) where recovery/audit matters  
- Audit tables for sensitive CRM mutations  
- RLS enabled on all exposed tables  

### 8.2 Core domains (minimum)

**Identity & access**

- `profiles` (synced from Clerk)  
- `organisations`, `memberships`, `roles`, `permissions`  

**CRM**

- `companies`  
- `contacts`  
- `leads`  
- `opportunities` / `deals` + `deal_stages`  
- `activities`, `tasks`, `notes`, `reminders`  
- `communications` (call/email/meeting logs)  
- `tags`, `taggables`  
- `custom_fields`, `custom_field_values`  
- `saved_views`  
- `attachments`  
- `imports` / `exports` jobs  
- `audit_logs`  

**Product / assessments**

- `assessments`, `questions`, `responses`, `reports`  
- `subscriptions`, `orders`, `payments`  

**Comms**

- `email_templates`, `email_deliveries`  
- `notifications`  

Exact schemas belong in `docs/DATA_MODEL.md` and `supabase/migrations/`.

---

## 9. CRM — full professional CRM

The CRM is a **complete commercial CRM**, not a leads table demo.

### Required capabilities

- Customer / contact management  
- Companies / organisations with multiple contacts  
- Leads + qualification  
- Opportunities / sales pipeline  
- Deals + deal stages  
- Activities, tasks, reminders, notes, follow-ups  
- Call / email / meeting tracking  
- Communication history  
- Email integration + templates  
- Automated follow-ups / workflows  
- Custom fields + custom statuses  
- Tags, categories, segmentation  
- Search, filter, sort, advanced views  
- Saved filters / views  
- Customer timeline / activity feed  
- Assignment to staff  
- Teams, roles, permissions  
- Internal notes + mentions  
- File / document attachments  
- Import / export  
- Duplicate detection + merge  
- Bulk actions  
- History + audit logs  
- Notifications  
- Reporting + analytics  
- Sales forecasting  
- Dashboards  
- Conversion tracking  
- Validation + full error handling  
- Loading / empty / success / failure states  
- Confirmations for destructive actions  
- Undo / recovery where appropriate  
- Pagination + performance  
- Secure authz + privacy controls  
- Backup / recovery considerations  
- Mobile / tablet responsiveness  

---

## 10. Website — complete production website

Treat the marketing/product site as a real production website.

### Required

- Responsive desktop / tablet / mobile  
- Professional nav + footer  
- Homepage + product/service pages  
- About + contact  
- Validated forms + submission handling  
- Success / error states  
- Spam protection  
- Search where relevant  
- Accounts (Clerk)  
- Login / logout / recovery  
- Customer portal where required  
- CMS/admin content management where required  
- SEO structure, metadata, social sharing  
- Accessible UI  
- Performance + image optimisation  
- 404 / error pages  
- Cookie / privacy where required  
- Security protections  
- Analytics where required  
- Email notifications  
- Mobile navigation  
- Browser compatibility  
- Graceful API / network failure handling  

Brand/visual system: `BRAND.md` (MindoraInsight navy / amber / teal work mentality).

---

## 11. Customer portal, admin, payments, comms

### Customer portal

- Account overview  
- Subscription management / cancel flow  
- Assessment history + reports  
- Invoices / receipts where applicable  
- Profile settings  
- Support contact  

### Admin

- User management  
- Role assignment  
- Assessment catalog management  
- Content / CMS hooks  
- System health / job status  
- Audit log viewer  

### Payments

- Behind `PaymentsPort`  
- Trial + recurring plans  
- Failed payment states  
- Webhook idempotency  
- Clear billing disclosure  

### Communications

- Transactional email via `EmailPort`  
- Delivery failure handling  
- Templates versioned in repo  

---

## 12. Error handling & edge cases

Every feature must handle:

- Invalid / missing / malformed input  
- Failed API / network / server errors  
- Auth failures / permission errors / expired sessions  
- Duplicate / missing records  
- Payment / email / upload failures  
- DB errors / timeouts / unexpected errors  
- Empty & no-results states  
- Concurrent updates  
- Deleted / archived records  

Errors must be **clear to users** and must **never** leave the app broken or inconsistent.

Use a shared error model:

```ts
type AppError = {
  code: string
  message: string      // user-safe
  cause?: unknown      // logged only
  retryable?: boolean
}
```

---

## 13. General production standards

Every part of the platform includes:

- Validation  
- Error handling  
- Security  
- Permissions  
- Responsive UI  
- Accessibility  
- Loading / empty / success / failure states  
- Notifications  
- Confirmation flows  
- Auditability  
- Logging  
- Performance considerations  
- Data consistency  
- Maintainable architecture  
- Scalable structure  
- Proper API + DB handling  
- Tests for critical functionality  

### Definition of Done (feature checklist)

A feature is not done until:

- [ ] Happy path works  
- [ ] Validation covers required fields/formats  
- [ ] Authz checked server-side (RLS and/or API)  
- [ ] Loading, empty, error, success states exist  
- [ ] Destructive actions confirmed  
- [ ] Mobile layout verified  
- [ ] Errors logged with correlation context  
- [ ] Types + validation schemas updated  
- [ ] Docs / migrations updated if schema changed  
- [ ] Critical path covered by at least one test  

---

## 14. Testing strategy

| Layer | Focus |
|-------|--------|
| Unit | Domain rules, validators, pure mappers |
| Integration | Repositories against test DB / mocked adapters |
| E2E | Auth, checkout demo→real, CRM critical flows |
| Contract | Webhooks idempotency (Clerk, Stripe) |

Prefer testing application services over brittle UI snapshots for business rules.

---

## 15. Security checklist

- No `service_role` / secret keys in client bundles  
- RLS on all exposed tables  
- Prefer `app_metadata` / server claims for authz; never user-editable metadata  
- Webhook signature verification  
- Least-privilege storage policies  
- CSRF / spam protections on public forms  
- PII minimisation + retention awareness  
- Audit sensitive CRM changes  

---

## 16. Documentation requirements

Maintain:

| Doc | Purpose |
|-----|---------|
| `docs/PRODUCTION_REQUIREMENTS.md` | This constitution |
| `docs/ARCHITECTURE.md` | Layers, adapters, migration plan |
| `docs/DATA_MODEL.md` | ERD / table dictionary |
| `docs/API_CONTRACTS.md` | DTOs / endpoints / errors |
| `docs/RUNBOOKS.md` | Deploy, webhook setup, incident basics |
| `BRAND.md` | Brand & naming |
| `AGENTS.md` | Cursor agent entrypoint |

---

## 17. Implementation phases (recommended)

1. **Foundation** — monorepo/layout, AuthPort, DbPort, migrations, Clerk+Supabase third-party auth, profile sync webhooks  
2. **Website production hardening** — SEO, forms, a11y, error pages, portal shell  
3. **Assessments core** — catalog, runner, reports, subscriptions/payments ports  
4. **CRM MVP → Full** — contacts/companies/leads/pipeline first, then automation, forecasting, import/export  
5. **Admin & reporting** — dashboards, audit, ops tools  
6. **Hardening** — e2e tests, monitoring, backup drills, migration dry-run docs  

Do not claim “CRM complete” until Section 9 capabilities are present with production states.

---

## 18. Explicit non-goals (for a single PR)

- Rewriting everything in one commit without migrations  
- Copying TestLibrary trademarks or assets  
- Blindly following outdated Clerk JWT-template tutorials  
- Fake CRM screens with no persistence or permissions  

---

*Last updated: 2026-09-14 — MindoraInsight engineering constitution.*
