# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This is a single-app repo with two top levels:

- **`mtiosavljevic-web/`** — the Vite + React + TypeScript SPA (frontend **and** admin). Almost all application work happens here. Run `npm` commands from inside this directory.
- **Repo root** — infrastructure: `docker-compose.yml` (self-hosted Supabase stack), `migrations/` (versioned SQL), `scripts/` (migration runner, kong config, JWT key gen), and `init.sql`.

Note: package/README metadata still references the project's prior identities ("imba-production-web", "woopulse-web"). The deployed product is **mtiosavljevic** — a video-production agency site with a self-hosted CMS + AI CRM.

## Commands

All run from `mtiosavljevic-web/`:

```bash
npm run dev        # Vite dev server on http://localhost:3000
npm run build      # tsc typecheck + vite build → dist/
npm run lint       # eslint, --max-warnings 0 (zero-warning policy)
npm run preview    # serve the production build
```

There is **no test suite** — verify changes via `npm run build` (catches type errors) and `npm run lint`.

### Database migrations (from repo root)

Migrations are plain SQL files in `migrations/` named `V###__description.sql`, applied in version order against the running Supabase Postgres container via Docker:

```bash
./scripts/migrate.sh --status     # show applied vs pending
./scripts/migrate.sh --dry-run    # preview
./scripts/migrate.sh              # apply pending
./scripts/new-migration.sh "name" # scaffold next V### file
```

The runner finds the container by `COOLIFY_APP_ID` (override via env if not on the default), bootstraps a `public.schema_migrations` table, and skips already-recorded versions. Never edit an applied migration — add a new one.

## Architecture

### Frontend / Admin split (single SPA, one router)

[src/App.tsx](mtiosavljevic-web/src/App.tsx) defines all routes in one `<Routes>` tree:

- **Public** routes wrap pages in `PublicLayout` (Nav + Footer + a scroll-reveal `IntersectionObserver` that toggles `.in-view` on `.reveal` elements).
- **Admin** routes (`/admin/*`) nest under [src/admin/AdminLayout.tsx](mtiosavljevic-web/src/admin/AdminLayout.tsx), which gates everything behind Supabase Auth — it renders a login form when there's no session and the dashboard chrome when there is. The admin is itself split into two modes sharing one sidebar: **CMS** (content) and **AI CRM** (`/admin/crm/*`, amber-themed).

`@/` is a path alias to `src/` (configured in both [vite.config.ts](mtiosavljevic-web/vite.config.ts) and tsconfig).

### Data layer — Supabase, no custom backend

There is no API server. The browser talks directly to self-hosted Supabase (PostgREST + GoTrue + Storage) via the client in [src/lib/supabase.ts](mtiosavljevic-web/src/lib/supabase.ts). Key behavior:

- If `VITE_SUPABASE_URL` is unset/placeholder at build time, the client falls back to `${origin}/supabase` — nginx proxies that path to Kong. This lets the same build run on any domain.
- All shared domain TypeScript types (`PortfolioItem`, `BlogPost`, `Service`, `Testimonial`, `QuoteRequest`, etc.) live in this file alongside the client. Update types here when changing a table's columns.
- Access control is enforced by **Postgres RLS policies in the migrations**, not in app code: public reads are gated on `published = true`; `quote_requests` is INSERT-only for anon. When adding a table, add its RLS policies in the same migration.

### AI CRM

The CRM modules under [src/admin/crm/](mtiosavljevic-web/src/admin/crm/) call the **Anthropic API directly from the browser** (`fetch('https://api.anthropic.com/v1/messages', …)`). The API key is read from `localStorage` / the `crm_ai_settings` table, not from build-time env. CRM tables (`crm_leads`, `crm_outreach_campaigns`, `crm_ai_settings`, proposals, invoices) are introduced in migrations V005–V006.

### i18n

[src/i18n/index.ts](mtiosavljevic-web/src/i18n/index.ts) uses i18next with `localStorage`-then-`navigator` detection. Only `en.json` exists today under `src/i18n/locales/`; the Translations admin manages DB-backed translations separately.

### UI conventions

- TailwindCSS + Radix primitives wrapped in [src/components/ui/](mtiosavljevic-web/src/components/ui/) (shadcn-style), composed with `class-variance-authority` + the `cn()` helper in [src/lib/utils.ts](mtiosavljevic-web/src/lib/utils.ts).
- Rich text editing uses Tiptap ([src/admin/TiptapEditor.tsx](mtiosavljevic-web/src/admin/TiptapEditor.tsx)).
- Brand fonts: Cormorant Garamond (display) + DM Mono (mono accents).

## Deployment

Built as a Docker image ([mtiosavljevic-web/Dockerfile](mtiosavljevic-web/Dockerfile)) served by nginx, deployed via the root `docker-compose.yml` on Coolify/Hetzner. The compose stack runs the full self-hosted Supabase set (`mtio-db`, `mtio-rest`, `mtio-auth`, `mtio-storage`, `mtio-kong`, `mtio-studio`, `mtio-meta`) plus Redis and the web container, fronted by Traefik for TLS. Coolify deploys on push to `main`.
