---
type: active-context
status: active
tags: [active]
---

# Active Context

## Current focus
Repo onboarding/tooling: a CLAUDE.md was authored and torsor-helper was installed as a
user-scoped MCP server to give the agent persistent project memory.

## Recent changes
- Added `CLAUDE.md` at repo root (architecture + commands guidance).
- Installed torsor-helper (`uv tool install`), registered it at user scope
  (`claude mcp add --scope user`), and scaffolded `.torsor/`.
- Recent feature work (git history): WordPress import dry-run report + image rehosting
  with URL rewrite; CMS/frontend blog visibility fixes for imported WP posts; `/projects`
  case studies (Aletheia, WooPulse, nisam.video); `/services/:slug` routing.

## Open questions
- Should `.torsor/` and `CLAUDE.md` be committed? (torsor intends `.torsor/` to be tracked.)
- Should `fastembed` embeddings be installed for semantic recall (vs. the hashing fallback)?
