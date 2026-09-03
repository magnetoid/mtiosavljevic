# Credential rotation runbook

`.env.production` was committed to this **public** repo and is readable at
`raw.githubusercontent.com`. Treat `JWT_SECRET`, `POSTGRES_PASSWORD` and
`SUPABASE_SERVICE_KEY` as compromised. Purging git history does not undo that —
public repos are scraped continuously. **Only rotation closes it.**

New values are already generated in `.env.production.new` (gitignored, mode 600).

---

## Order matters

Rotating `JWT_SECRET` invalidates the anon key baked into `dist/`. If the stack
rotates before the frontend is rebuilt, the site 401s exactly as it did before.
So the stack and the frontend must go together, in **one** deploy.

---

## Step 0 — deploy what is already fixed (safe, do this first)

Everything currently committed is built against the **current, still-valid**
keys. Pushing now fixes the blog and ships the redesign, and changes no secrets.

```bash
git push --force-with-lease origin main    # force: history was rewritten
```

The force-push is what actually removes `.env.production` from GitHub.
`--force-with-lease` refuses if someone else pushed in the meantime.

## Step 1 — apply the migration

Adds the notification columns the mailer needs. On the server:

```bash
cd /path/to/mtiosavljevic
./scripts/migrate.sh --status     # expect V008 pending
./scripts/migrate.sh
```

## Step 2 — change the Postgres password *inside* the database

**The `POSTGRES_PASSWORD` env var only applies on first initialisation.** On an
existing volume, changing it alone does nothing — the old password keeps working
and the new one fails. Change it in the database itself, using the new value
from `.env.production.new`:

```bash
docker exec -it mtio-db psql -U supabase -d mtiosavljevic \
  -c "ALTER USER supabase WITH PASSWORD '<POSTGRES_PASSWORD from .env.production.new>';"
```

Do this immediately before Step 3 — between the two, the running containers
still hold the old password and will fail on reconnect.

## Step 3 — update Coolify env and redeploy the stack

Set these from `.env.production.new` in the Coolify environment for
`mtiosavljevic-com`:

```
JWT_SECRET
POSTGRES_PASSWORD
SUPABASE_ANON_KEY
SUPABASE_SERVICE_KEY
VITE_SUPABASE_ANON_KEY
```

And, for the contact-form mailer:

```
SMTP_HOST            your Plesk mail host
SMTP_PORT            587, or 465 with SMTP_SECURE=true
SMTP_USER SMTP_PASS  leave empty for an unauthenticated local relay
CONTACT_NOTIFY_TO    where enquiries should land
```

Then recreate the stack so every container picks up the new secret:

```bash
docker compose up -d --force-recreate
```

## Step 4 — rebuild the frontend with the rotated anon key and deploy

```bash
mv .env.production.new .env.production
cd mtiosavljevic-web && npm run build && cd ..
git add -A && git commit -m "chore: rebuild with rotated anon key" && git push
```

Then trigger the deploy in Coolify (auto-deploy has been unreliable).

## Step 5 — verify

```bash
# new anon key works, old one is dead
curl -s -o /dev/null -w '%{http_code}\n' -H "apikey: $NEW_ANON" \
  https://mtiosavljevic.com/supabase/rest/v1/blog_posts?select=id\&limit=1   # 200
curl -s -o /dev/null -w '%{http_code}\n' -H "apikey: $OLD_ANON" \
  https://mtiosavljevic.com/supabase/rest/v1/blog_posts?select=id\&limit=1   # 401

# the leaked service key is dead
curl -s -o /dev/null -w '%{http_code}\n' -H "apikey: $OLD_SERVICE" \
  -H "Authorization: Bearer $OLD_SERVICE" \
  https://mtiosavljevic.com/supabase/rest/v1/quote_requests?select=id        # 401

# blog renders, admin login works, mailer is happy
curl -s https://mtiosavljevic.com/blog | grep -c "Constitutional AI"
docker logs mtio-mailer | tail -20     # "SMTP connection verified"
```

Submit the contact form once and confirm the email arrives.

## Also worth doing

- **Rotate the Gmail app password** in `GOTRUE_SMTP_*` if one was ever set.
- **`master` branch**: `raw.githubusercontent.com/.../master/.env.production`
  returned 200. `git ls-remote` shows only `main`, so this is likely GitHub
  aliasing — but check the repo's branch list and delete `master` if it exists.
- Consider making the repo private. It is public today.

## Recovery

If a step goes wrong, the pre-rewrite state is bundled at
`<scratchpad>/pre-rewrite.bundle` and the previous env at
`<scratchpad>/env.production.OLD.bak`. The 10 unpublished blog posts are listed
in `<scratchpad>/unpublished-backup.json`; set `published=true` on those ids to
restore them.
