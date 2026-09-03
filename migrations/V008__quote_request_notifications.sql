-- V008 — track which contact-form submissions have been emailed.
--
-- The contact form writes straight to public.quote_requests and nothing ever
-- notified anyone, so enquiries sat unseen until someone opened /admin. The
-- mtio-mailer service (services/contact-mailer) claims un-notified rows and
-- sends them over SMTP; these columns are how it knows what it has already sent
-- and lets it retry a failure without spamming on success.

ALTER TABLE public.quote_requests
  ADD COLUMN IF NOT EXISTS notified_at    TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS notify_attempts INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS notify_error   TEXT;

-- The mailer's hot query: unsent rows, oldest first, giving up after N tries.
CREATE INDEX IF NOT EXISTS idx_quotes_pending_notify
  ON public.quote_requests (created_at)
  WHERE notified_at IS NULL;

-- Anon may still only INSERT. These columns are written by the mailer, which
-- connects with the service role, so no policy change is required — but make
-- the intent explicit for anyone reading the schema later.
COMMENT ON COLUMN public.quote_requests.notified_at IS
  'Set by mtio-mailer once the notification email is accepted by the SMTP server. NULL means unsent.';
COMMENT ON COLUMN public.quote_requests.notify_attempts IS
  'Incremented on every send attempt. The mailer stops retrying past its max-attempts setting.';
COMMENT ON COLUMN public.quote_requests.notify_error IS
  'Last SMTP error for this row, for debugging failed deliveries.';
