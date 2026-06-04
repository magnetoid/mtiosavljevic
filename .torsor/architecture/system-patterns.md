---
type: system-patterns
status: active
tags: [architecture]
---

# System Patterns

## Architecture overview
Single SPA, one router. `mtiosavljevic-web/src/App.tsx` defines every route in one
`<Routes>` tree:
- **Public** routes wrap pages in `PublicLayout` (Nav + Footer + a scroll-reveal
  `IntersectionObserver` that toggles `.in-view` on `.reveal` elements).
- **Admin** routes (`/admin/*`) nest under `src/admin/AdminLayout.tsx`, which gates
  everything behind Supabase Auth — renders a login form when there is no session,
  the dashboard chrome when there is. The admin has two modes sharing one sidebar:
  **CMS** (content) and **AI CRM** (`/admin/crm/*`, amber-themed).

Data layer: no API server. The browser uses the Supabase client in
`src/lib/supabase.ts`. All shared domain TypeScript types (`PortfolioItem`, `BlogPost`,
`Service`, `Testimonial`, `QuoteRequest`, …) live in that same file — update them there
when a table's columns change. Access control is enforced by Postgres RLS in the
migrations: public reads gated on `published = true`; `quote_requests` is INSERT-only
for anon.

AI CRM: modules under `src/admin/crm/` call the **Anthropic API directly from the
browser** (`fetch('https://api.anthropic.com/v1/messages', …)`). The API key is read
from `localStorage` / the `crm_ai_settings` table, not from build-time env. CRM tables
(`crm_leads`, `crm_outreach_campaigns`, `crm_ai_settings`, proposals, invoices) come
from migrations V005–V006.

## Conventions
- `@/` is a path alias to `src/` (set in both `vite.config.ts` and tsconfig).
- UI: TailwindCSS + Radix primitives wrapped shadcn-style in `src/components/ui/`,
  composed with `class-variance-authority` + the `cn()` helper in `src/lib/utils.ts`.
- Rich text editing uses Tiptap (`src/admin/TiptapEditor.tsx`).
- Brand fonts: Cormorant Garamond (display) + DM Mono (mono accents).
- i18n via i18next (`src/i18n/index.ts`), localStorage-then-navigator detection; only
  `en.json` exists today. DB-backed translations are managed separately in the
  Translations admin.

## Patterns in use
- RLS-as-authorization: add a table's policies in the same migration that creates it.
- Build-time-agnostic Supabase URL with `/supabase` nginx-proxy fallback.
- Single source of truth for domain types in `src/lib/supabase.ts`.
