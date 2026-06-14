#!/bin/sh
set -eu

: "${VITE_SUPABASE_URL:=}"
: "${VITE_SUPABASE_ANON_KEY:=}"
: "${VITE_APP_URL:=https://mtiosavljevic.com}"

envsubst '${VITE_SUPABASE_URL} ${VITE_SUPABASE_ANON_KEY} ${VITE_APP_URL}' \
  < /etc/mtio/runtime-config.template.js \
  > /usr/share/nginx/html/runtime-config.js

exec "$@"
