# imba-crm as Central CRM Backend — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retire mtiosavljevic's stale in-browser CRM (`src/admin/crm/*`) and make the already-built `imba-crm` stack the single, centrally-deployed, auto-updating CRM backend that this site (and other projects) launch into.

**Architecture:** `imba-crm` is deployed **once** as the canonical CRM — its Supabase project (Kong/PostgREST/GoTrue/Storage) plus the `inbox-puller` worker that serves `POST /api/ai/route` and reads provider keys from the `crm_provider_credentials` table. mtiosavljevic stops embedding CRM screens; `/admin/crm` becomes a launcher to the central CRM SPA. Because no CRM code or AI logic is copied into this repo, backend updates propagate automatically ("autoupdate"). An optional later phase vendors the CRM UI into this repo if true in-app embedding is required — gated on a live schema dump that does not exist in the repo today.

**Tech Stack:** Vite + React + TypeScript (this repo), Supabase self-hosted, Docker Compose / Coolify, nginx. `imba-crm` monorepo (pnpm): `packages/crm` (SPA), `packages/inbox-puller` (worker + `/api/ai/route`), `packages/shared` (`@imba/shared`).

---

## Decisions adopted (change before executing if wrong)

- **Canonical backend:** the existing `imba-crm` Supabase + `inbox-puller` worker (it already holds data, provider credentials, and the AI proxy). Not a new project, not mtiosavljevic's DB.
- **CRM surface in this site:** serve `imba-crm`'s CRM SPA centrally; `/admin/crm` launches into it. This removes the stale `src/admin/crm/*` (a real "replacement") and gives autoupdate. Full vendor-into-repo is **Phase 4 (alternative)**, not the default.

## Hard prerequisite (blocks Phase 0+ data work, NOT Phase 1)

The core tables `crm_leads`, `crm_outreach_emails`, `crm_inbox_messages`, `crm_proposals`, `crm_invoices`, `crm_email_events` are **not** in `imba-crm/migrations/` — they came from a legacy `init.sql`. Capture live DDL from the running CRM DB before standing up a fresh central instance:

```bash
# On the host running the imba-crm Supabase DB container:
docker exec <imba-crm-db-container> pg_dump -U postgres -d agencycrm \
  --schema-only --schema=public \
  -t 'crm_*' -t 'ai_generations' > imba-crm-live-schema.sql
```

This file is the source of truth for any "stand up a new central DB" path and for Phase 4.

---

## File Structure (this repo, Phase 1)

- Modify: `mtiosavljevic-web/src/App.tsx` — replace the 9 nested `/admin/crm/*` routes with one launcher route.
- Create: `mtiosavljevic-web/src/admin/crm/CRMLauncher.tsx` — the launch/redirect surface.
- Modify: `mtiosavljevic-web/src/admin/AdminLayout.tsx` — replace the CRM sub-nav with a single external "Open CRM" entry.
- Delete: `mtiosavljevic-web/src/admin/crm/{CRMDashboard,LeadDetail,AILeadSearcher,AIOutreach,AIInbox,Proposals,Invoices,AIAnalytics,AISettings,SEOManager}.tsx` — the stale embedded CRM.
- Modify: `mtiosavljevic-web/.env.example` (+ deployment env) — add `VITE_CRM_URL`.

> **Note on verification:** this repo has **no test runner** (per CLAUDE.md). "Verify" steps therefore use `npm run build` (tsc typecheck) and a manual browser check, not unit tests.

---

## Phase 0 — Deploy imba-crm as the central CRM (infra runbook)

This is infrastructure on your Coolify/Hetzner; it is not code in this repo. Sequence:

- [ ] **0.1** Capture the legacy DDL (command above) and commit it into the `imba-crm` repo as `migrations/00000000_legacy_core_tables.sql` so the schema becomes reproducible.
- [ ] **0.2** Deploy `imba-crm/docker-compose.yml` as its own Coolify project. Set `CRM_URL` to the chosen domain (e.g. `https://crm.mtiosavljevic.com`), `SUPABASE_SERVICE_KEY`, `JWT_SECRET`, anon key, and provider credentials seeded into `crm_provider_credentials`.
- [ ] **0.3** Confirm the worker is reachable: `curl https://crm.mtiosavljevic.com/api/worker/health` → ok, and the SPA loads at the domain root and authenticates (GoTrue email+password; `GOTRUE_DISABLE_SIGNUP=true`, so pre-create the admin user).
- [ ] **0.4** Smoke-test AI routing:

```bash
curl -s https://crm.mtiosavljevic.com/api/ai/route -X POST -H 'content-type: application/json' \
  -d '{"task":{"type":"reasoning","messages":[{"role":"user","content":"reply OK"}]}}'
# Expect: {"ok":true,"data":{"content":"..."},"event":{"provider":"...","costCents":...}}
```

Expected: `ok:true`. If `NO_RUNTIME`, seed the `crm_runtime_settings` singleton (id=1) with `active_ai_provider`/`active_ai_model`. If `UNSUPPORTED_PROVIDER`, set provider to anthropic/openai/openrouter (the only three implemented in `ai-proxy.ts`).

---

## Phase 1 — Replace this site's embedded CRM with a launcher

### Task 1: Add the CRM URL env var

**Files:**
- Modify: `mtiosavljevic-web/.env.example`

- [ ] **Step 1: Add the var**

Append to `.env.example`:

```bash
# URL of the centrally-deployed imba-crm SPA (the shared CRM backend).
VITE_CRM_URL=https://crm.mtiosavljevic.com
```

- [ ] **Step 2: Commit**

```bash
git add mtiosavljevic-web/.env.example
git commit -m "chore(crm): add VITE_CRM_URL for central CRM launcher"
```

### Task 2: Create the CRM launcher component

**Files:**
- Create: `mtiosavljevic-web/src/admin/crm/CRMLauncher.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { useEffect } from 'react'
import { ExternalLink, Loader2 } from 'lucide-react'

const CRM_URL = (import.meta.env.VITE_CRM_URL as string) || ''

export default function CRMLauncher() {
  // If configured, send the operator straight to the central CRM.
  useEffect(() => {
    if (CRM_URL) {
      const t = setTimeout(() => { window.location.href = CRM_URL }, 600)
      return () => clearTimeout(t)
    }
  }, [])

  if (!CRM_URL) {
    return (
      <div className="p-10 max-w-xl">
        <h1 className="text-lg font-semibold text-foreground mb-2">CRM not configured</h1>
        <p className="text-sm text-muted-foreground">
          Set <code className="font-mono">VITE_CRM_URL</code> to the central imba-crm
          deployment and rebuild. The CRM is served centrally and updates automatically.
        </p>
      </div>
    )
  }

  return (
    <div className="p-10 flex flex-col items-start gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Opening the CRM…</span>
      </div>
      <a
        href={CRM_URL}
        className="inline-flex items-center gap-2 text-sm font-medium text-amber-500 hover:text-amber-400"
      >
        Open the CRM <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}
```

- [ ] **Step 2: Verify it typechecks**

Run: `cd mtiosavljevic-web && npm run build`
Expected: build succeeds (the component is not yet routed, but must compile).

### Task 3: Swap the CRM routes for the launcher

**Files:**
- Modify: `mtiosavljevic-web/src/App.tsx`

- [ ] **Step 1: Remove the 9 CRM imports** (lines importing `CRMDashboard, LeadDetail, AILeadSearcher, AIOutreach, AIInbox, Proposals, Invoices, AIAnalytics, AISettings` from `@/admin/crm/*`) and add:

```tsx
import CRMLauncher from '@/admin/crm/CRMLauncher'
```

- [ ] **Step 2: Replace the nested CRM routes**

Replace the block from `<Route path="crm" element={<CRMDashboard />} />` through `<Route path="crm/settings" element={<AISettings />} />` with:

```tsx
<Route path="crm" element={<CRMLauncher />} />
```

- [ ] **Step 3: Verify**

Run: `cd mtiosavljevic-web && npm run build`
Expected: build succeeds with no unused-import or missing-module errors.

### Task 4: Collapse the CRM sidebar to a single external link

**Files:**
- Modify: `mtiosavljevic-web/src/admin/AdminLayout.tsx`

- [ ] **Step 1: Replace the CRM nav block** (the `isCRM` `<nav>` listing Pipeline/Lead Finder/Outreach/Inbox/Proposals/Invoices/Analytics/Settings) with a single anchor that leaves the SPA:

```tsx
<nav className="flex-1 p-3 flex flex-col gap-0.5 overflow-y-auto">
  <a
    href={(import.meta.env.VITE_CRM_URL as string) || '/admin/crm'}
    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm bg-amber-500/10 text-amber-500 font-medium hover:bg-amber-500/15"
  >
    <Users className="h-4 w-4 flex-shrink-0" />
    Open AI CRM
  </a>
  <p className="px-3 py-2 text-[0.65rem] text-muted-foreground/60">
    The CRM is served centrally and updates automatically.
  </p>
</nav>
```

(Keep the landing tile that navigates to `/admin/crm` — it now lands on the launcher.)

- [ ] **Step 2: Verify**

Run: `cd mtiosavljevic-web && npm run build`
Expected: build succeeds.

### Task 5: Delete the stale embedded CRM files

**Files:**
- Delete: `mtiosavljevic-web/src/admin/crm/*` except `CRMLauncher.tsx`

- [ ] **Step 1: Remove the files**

```bash
cd mtiosavljevic-web/src/admin/crm
git rm CRMDashboard.tsx LeadDetail.tsx AILeadSearcher.tsx AIOutreach.tsx \
       AIInbox.tsx Proposals.tsx Invoices.tsx AIAnalytics.tsx AISettings.tsx SEOManager.tsx
```

- [ ] **Step 2: Verify nothing else imports them**

Run: `cd mtiosavljevic-web && grep -rn "admin/crm/\(CRMDashboard\|LeadDetail\|AILeadSearcher\|AIOutreach\|AIInbox\|Proposals\|Invoices\|AIAnalytics\|AISettings\|SEOManager\)" src/`
Expected: no matches.

- [ ] **Step 3: Verify build**

Run: `cd mtiosavljevic-web && npm run build`
Expected: build succeeds.

- [ ] **Step 4: Commit Phase 1**

```bash
git add -A mtiosavljevic-web/src mtiosavljevic-web/.env.example
git commit -m "feat(crm): replace embedded CRM with central imba-crm launcher"
```

---

## Phase 2 — Single sign-on handoff (optional, recommended)

The central CRM uses its own Supabase (GoTrue) auth. For one login across both:

- [ ] **2.1** Decide: either (a) accept a separate CRM login (zero work — the launcher just opens the CRM's login), or (b) point mtiosavljevic's admin auth at the **same** Supabase project as the CRM by setting this site's `VITE_SUPABASE_URL`/anon key to the central project. Option (b) makes the JWT valid for both surfaces.
- [ ] **2.2** If (b): create the admin user in the central GoTrue and confirm `/admin` (CMS) and the CRM both accept the same session.

---

## Phase 4 (ALTERNATIVE) — Vendor the CRM into this repo

Only if you reject the central-serve model and want the CRM rendered **inside** mtiosavljevic. Gated on the Phase-0 DDL dump. High-level (expand into bite-sized tasks once the DDL exists):

- [ ] Extract `imba-crm/packages/shared` (`@imba/shared`) into a shared package or copy `lib/ai.ts`, `supabase/client.ts`, `auth/*`, UI primitives.
- [ ] Copy `packages/crm/src/modules/*` + `layouts/CRMLayout.tsx` + `registry.ts` into `mtiosavljevic-web/src/admin/crm/`.
- [ ] Point `callAI()` at the central worker: ensure `/api/ai/route` is reachable (nginx proxy on this site's host → central worker, or absolute `VITE_CRM_URL` base).
- [ ] Apply the legacy DDL + the 5 feature migrations (`ai_generations`, `outreach_send`, `lead_scoring_and_intent`, `lead_enricher_provenance`, `ai_cap_state`) to the canonical DB.
- [ ] Reconcile this site's Supabase types with the `crm_*` schema.
- [ ] **Autoupdate caveat:** vendored code does not autoupdate; add a git subtree/submodule sync or accept manual bumps.

---

## Self-Review

- **Spec coverage:** central backend (Phase 0) ✓; autoupdate (central-serve, no copied code) ✓; full replacement of `src/admin/crm/*` (Tasks 3–5 delete + reroute) ✓; AI provider/cost model (worker `/api/ai/route`, unchanged, central) ✓; vendor-in alternative (Phase 4) ✓.
- **Blocker surfaced:** legacy `crm_*` DDL not in repo — captured as the Phase-0 prerequisite; only Phase 4 and "new central DB" depend on it. Phase 1 does not.
- **Verification reality:** no test runner in this repo → steps use `npm run build` + manual checks, stated explicitly.
- **Type/name consistency:** `VITE_CRM_URL`, `CRMLauncher`, `/admin/crm` used consistently across Tasks 1–4.
