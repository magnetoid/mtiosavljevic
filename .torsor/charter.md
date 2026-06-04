---
type: charter
status: active
tags: [charter]
---

# Project Charter

## What we are building
**mtiosavljevic** — a video-production agency website with a self-hosted CMS and an
AI-powered CRM. A single Vite + React + TypeScript SPA serves both the public marketing
site (home, services, projects/case studies, blog, about, contact) and the `/admin`
back office (CMS for content + an amber-themed "AI CRM" for lead gen, outreach,
proposals, and invoices).

## Why it exists
Replaces a generic hosted site with a fully owned stack: self-hosted Supabase for data
and auth, a built-in CMS so content is editable without code, and an AI CRM that drives
sales workflows directly from the browser. No third-party SaaS lock-in; the operator
controls hosting, data, and AI keys.

## Non-negotiable principles
- **No custom backend.** The browser talks directly to self-hosted Supabase
  (PostgREST + GoTrue + Storage). Access control lives in **Postgres RLS policies**, not
  app code.
- **Migrations are append-only.** Versioned SQL in `migrations/V###__*.sql`; never edit an
  applied migration — add a new one. RLS policies ship in the same migration as their table.
- **Same build runs on any domain.** If `VITE_SUPABASE_URL` is unset, the Supabase client
  falls back to the `/supabase` nginx proxy path.
- **Zero-warning lint** and a green `npm run build` (tsc) are the verification bar — there is
  no test suite.

## Note on prior identities
Package/README metadata still says "imba-production-web" / "woopulse-web" — earlier names of
the same codebase. The live product is mtiosavljevic.
