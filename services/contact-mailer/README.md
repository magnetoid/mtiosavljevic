# contact-mailer

Emails new `public.quote_requests` rows over the server's SMTP, then stamps
`notified_at` so each row sends exactly once.

Before this existed the contact form wrote to the database and notified nobody,
so enquiries sat unread until someone opened `/admin`.

## Configure

Set these in Coolify (or the compose env) — see `docker-compose.yml`:

| var | required | notes |
|---|---|---|
| `SMTP_HOST` | yes | the server's mail host (Plesk mail server, or `localhost` if the container can reach it) |
| `SMTP_PORT` | no | default `587` |
| `SMTP_SECURE` | no | `true` for implicit TLS on 465; otherwise STARTTLS |
| `SMTP_USER` / `SMTP_PASS` | no | omit for an unauthenticated local relay |
| `CONTACT_NOTIFY_TO` | yes | where enquiries land |
| `CONTACT_NOTIFY_FROM` | no | defaults to `SMTP_USER`, else `no-reply@<APP_DOMAIN>` |
| `POLL_INTERVAL_SECONDS` | no | default `60` |
| `MAX_ATTEMPTS` | no | default `5`, then the row is left alone |

`SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are wired from the compose file and
point at Kong on the internal network — nothing leaves the host.

## Check it

```bash
docker logs -f mtio-mailer          # "SMTP connection verified" on boot
```

Rows that failed keep `notified_at` NULL and record the reason in
`notify_error`, so a bad SMTP config is visible in the table rather than silent.
