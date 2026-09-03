/**
 * Contact-form notifier.
 *
 * The site writes submissions straight into public.quote_requests and nothing
 * ever told anyone. This claims un-notified rows and emails them over the
 * server's own SMTP, then stamps notified_at so a row is sent exactly once.
 *
 * Polling rather than a database trigger: it needs no Postgres extension, and a
 * dead SMTP server or a restart just delays delivery instead of losing it.
 *
 * Required env:
 *   SUPABASE_URL           internal Kong URL, e.g. http://mtio-kong:8000
 *   SUPABASE_SERVICE_KEY   service_role JWT (bypasses RLS)
 *   SMTP_HOST SMTP_PORT    the server's mail host
 *   CONTACT_NOTIFY_TO      where enquiries land
 * Optional:
 *   SMTP_USER SMTP_PASS    omit for an unauthenticated relay on localhost
 *   SMTP_SECURE            "true" for implicit TLS (port 465); default STARTTLS
 *   CONTACT_NOTIFY_FROM    defaults to SMTP_USER, else no-reply@<APP_DOMAIN>
 *   POLL_INTERVAL_SECONDS  default 60
 *   MAX_ATTEMPTS           default 5
 */
import nodemailer from 'nodemailer'

const env = (k, d) => process.env[k] ?? d
const required = ['SUPABASE_URL', 'SUPABASE_SERVICE_KEY', 'SMTP_HOST', 'CONTACT_NOTIFY_TO']
const missing = required.filter(k => !process.env[k])
if (missing.length) {
  console.error(`[mailer] missing required env: ${missing.join(', ')}`)
  process.exit(1)
}

const API = `${env('SUPABASE_URL').replace(/\/$/, '')}/rest/v1`
const KEY = env('SUPABASE_SERVICE_KEY')
const TO = env('CONTACT_NOTIFY_TO')
const FROM = env('CONTACT_NOTIFY_FROM') || env('SMTP_USER') || `no-reply@${env('APP_DOMAIN', 'mtiosavljevic.com')}`
const INTERVAL = Number(env('POLL_INTERVAL_SECONDS', '60')) * 1000
const MAX_ATTEMPTS = Number(env('MAX_ATTEMPTS', '5'))

const transport = nodemailer.createTransport({
  host: env('SMTP_HOST'),
  port: Number(env('SMTP_PORT', '587')),
  secure: env('SMTP_SECURE', 'false') === 'true',
  auth: env('SMTP_USER') ? { user: env('SMTP_USER'), pass: env('SMTP_PASS') } : undefined,
})

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json',
}

async function pending() {
  const q = new URLSearchParams({
    select: 'id,full_name,email,company,service_type,budget_range,message,created_at,notify_attempts',
    notified_at: 'is.null',
    notify_attempts: `lt.${MAX_ATTEMPTS}`,
    order: 'created_at.asc',
    limit: '20',
  })
  const res = await fetch(`${API}/quote_requests?${q}`, { headers })
  if (!res.ok) throw new Error(`fetch pending failed: ${res.status} ${await res.text()}`)
  return res.json()
}

async function mark(id, patch) {
  const res = await fetch(`${API}/quote_requests?id=eq.${id}`, {
    method: 'PATCH',
    headers: { ...headers, Prefer: 'return=minimal' },
    body: JSON.stringify(patch),
  })
  if (!res.ok) throw new Error(`mark ${id} failed: ${res.status} ${await res.text()}`)
}

/** Plain text only — the message is untrusted input and never becomes HTML. */
function body(r) {
  return [
    `New enquiry from ${r.full_name} <${r.email}>`,
    '',
    `Company      ${r.company || '—'}`,
    `Looking for  ${r.service_type || '—'}`,
    `Budget       ${r.budget_range || '—'}`,
    `Received     ${r.created_at}`,
    `Reference    ${r.id}`,
    '',
    '--- message ---',
    (r.message || '(no message)').trim(),
    '',
    '--- ',
    'Sent by mtio-contact-mailer. Manage at /admin -> Quote Requests.',
  ].join('\n')
}

async function tick() {
  let rows
  try {
    rows = await pending()
  } catch (e) {
    console.error(`[mailer] ${e.message}`)
    return
  }
  if (!rows.length) return
  console.log(`[mailer] ${rows.length} pending`)

  for (const r of rows) {
    try {
      await transport.sendMail({
        from: FROM,
        to: TO,
        replyTo: r.email,
        subject: `Contact form — ${r.full_name}${r.company ? ` (${r.company})` : ''}`,
        text: body(r),
      })
      await mark(r.id, { notified_at: new Date().toISOString(), notify_attempts: r.notify_attempts + 1, notify_error: null })
      console.log(`[mailer] sent ${r.id}`)
    } catch (e) {
      const attempts = r.notify_attempts + 1
      console.error(`[mailer] send ${r.id} failed (attempt ${attempts}/${MAX_ATTEMPTS}): ${e.message}`)
      try {
        await mark(r.id, { notify_attempts: attempts, notify_error: String(e.message).slice(0, 500) })
      } catch (e2) {
        console.error(`[mailer] ${e2.message}`)
      }
    }
  }
}

let stopping = false
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => { stopping = true; console.log(`[mailer] ${sig}, stopping`); transport.close?.(); process.exit(0) })
}

console.log(`[mailer] polling every ${INTERVAL / 1000}s; notifying ${TO}`)
try {
  await transport.verify()
  console.log('[mailer] SMTP connection verified')
} catch (e) {
  console.error(`[mailer] SMTP verify failed (will keep retrying): ${e.message}`)
}
await tick()
setInterval(() => { if (!stopping) tick() }, INTERVAL)
