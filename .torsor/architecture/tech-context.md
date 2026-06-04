---
type: tech-context
status: active
tags: [architecture]
---

# Tech Context

## Stack & versions
- **Frontend/Admin:** Vite 5 · React 18 · TypeScript 5 · React Router 6 · TanStack Query 5.
- **UI:** TailwindCSS 3 · Radix UI · class-variance-authority · framer-motion · lucide-react ·
  Tiptap 3 (rich text) · react-hook-form · react-hot-toast · i18next.
- **Backend (self-hosted Supabase):** PostgreSQL + PostgREST + GoTrue + Storage, fronted by
  Kong; `@supabase/supabase-js` v2 client. Plus Redis.
- **Deploy:** Docker image (`mtiosavljevic-web/Dockerfile`) served by nginx, via the root
  `docker-compose.yml` on Coolify/Hetzner, TLS via Traefik. Compose services are prefixed
  `mtio-` (`mtio-db`, `mtio-rest`, `mtio-auth`, `mtio-storage`, `mtio-kong`, `mtio-studio`,
  `mtio-meta`, `mtio-web`). Coolify deploys on push to `main`.

## Commands
Run from `mtiosavljevic-web/`:
- `npm run dev` — Vite dev server on http://localhost:3000
- `npm run build` — `tsc` typecheck + vite build → `dist/`
- `npm run lint` — eslint, `--max-warnings 0`
- `npm run preview` — serve the production build

Migrations (from repo root): `./scripts/migrate.sh [--status|--dry-run]`,
`./scripts/new-migration.sh "name"`. The runner finds the Postgres container by
`COOLIFY_APP_ID`, bootstraps `public.schema_migrations`, and skips applied versions.

## Constraints
- **No test suite** — verification is `npm run build` (catches type errors) + `npm run lint`
  (zero warnings).
- Never edit an applied migration; append a new `V###` file.
- `npm` commands run inside `mtiosavljevic-web/`, not the repo root.

## torsor-helper note
torsor's symbol map (`map_repo`) and drift guard (`check_drift`) are **Python-AST-only**
(`cartographer.py` / `.py` files) and produce nothing on this TS/React codebase. Only the
memory/wiki layer (charter, system-patterns, tech-context, recall/remember, decisions,
bootstrap_session, handoff) is useful here.
