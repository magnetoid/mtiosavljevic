#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
#  Imba Production — Database Migration Runner
#
#  Usage:
#    ./scripts/migrate.sh              # run pending migrations
#    ./scripts/migrate.sh --dry-run    # preview without applying
#    ./scripts/migrate.sh --status     # show all migrations + status
#
#  How it works:
#    1. Finds the running supabase-db Docker container
#    2. Creates schema_migrations table if it doesn't exist
#    3. Runs each migrations/V*.sql file in version order
#    4. Skips files already recorded in schema_migrations
# ═══════════════════════════════════════════════════════════════
set -e

# ── Config ─────────────────────────────────────────────────────
# The mtiosavljevic compose pins its DB container_name to `mtio-db`, so target
# that directly. COOLIFY_APP_ID remains an optional fallback for the legacy
# Coolify-generated name pattern (supabase-db-<app-id>).
DB_CONTAINER_NAME="${DB_CONTAINER_NAME:-mtio-db}"
APP_ID="${COOLIFY_APP_ID:-}"
PG_USER="${POSTGRES_USER:-supabase}"
PG_DB="${POSTGRES_DB:-mtiosavljevic}"
DRY_RUN=false
STATUS_ONLY=false

for arg in "$@"; do
  case $arg in
    --dry-run)   DRY_RUN=true ;;
    --status)    STATUS_ONLY=true ;;
    --app-id=*)  APP_ID="${arg#*=}" ;;
  esac
done

# ── Find DB container ──────────────────────────────────────────
# Prefer the explicit compose container_name (mtio-db); fall back to the legacy
# Coolify-generated name (supabase-db-<app-id>) only if COOLIFY_APP_ID is set.
DB_CONTAINER=$(docker ps --filter "name=^/${DB_CONTAINER_NAME}$" --format "{{.Names}}" | head -1)
if [ -z "$DB_CONTAINER" ] && [ -n "$APP_ID" ]; then
  DB_CONTAINER=$(docker ps --filter "name=supabase-db-${APP_ID}" --format "{{.Names}}" | head -1)
fi

if [ -z "$DB_CONTAINER" ]; then
  echo "❌  Could not find the database container (looked for: ${DB_CONTAINER_NAME})"
  echo "    Override with: DB_CONTAINER_NAME=<name> ./scripts/migrate.sh"
  echo "    Postgres-like containers currently running:"
  docker ps --filter "name=db" --format "    {{.Names}}"
  exit 1
fi

echo "📦  DB container: $DB_CONTAINER"

# ── psql helper ────────────────────────────────────────────────
run_psql() {
  docker exec "$DB_CONTAINER" psql -U "$PG_USER" -d "$PG_DB" -v ON_ERROR_STOP=1 "$@"
}

# ── Bootstrap migrations table ─────────────────────────────────
run_psql -c "
  CREATE TABLE IF NOT EXISTS public.schema_migrations (
    version    TEXT PRIMARY KEY,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    checksum   TEXT
  );
" > /dev/null

# ── Locate migrations directory ────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MIGRATIONS_DIR="$(dirname "$SCRIPT_DIR")/migrations"

if [ ! -d "$MIGRATIONS_DIR" ]; then
  echo "❌  migrations/ directory not found at: $MIGRATIONS_DIR"
  exit 1
fi

# ── Status mode ────────────────────────────────────────────────
if [ "$STATUS_ONLY" = true ]; then
  echo ""
  echo "  VERSION                          APPLIED AT"
  echo "  ─────────────────────────────────────────────────────"
  for file in $(ls "$MIGRATIONS_DIR"/V*.sql 2>/dev/null | sort -V); do
    version=$(basename "$file" .sql)
    applied=$(run_psql -tAc "SELECT TO_CHAR(applied_at,'YYYY-MM-DD HH24:MI') FROM public.schema_migrations WHERE version='$version'")
    if [ -n "$applied" ]; then
      printf "  ✓  %-32s %s\n" "$version" "$applied"
    else
      printf "  ○  %-32s %s\n" "$version" "(pending)"
    fi
  done
  echo ""
  exit 0
fi

# ── Run migrations ─────────────────────────────────────────────
echo ""
pending=0
applied_count=0
errors=0

for file in $(ls "$MIGRATIONS_DIR"/V*.sql 2>/dev/null | sort -V); do
  version=$(basename "$file" .sql)

  is_applied=$(run_psql -tAc "SELECT COUNT(*) FROM public.schema_migrations WHERE version='$version'")

  if [ "$is_applied" -eq "0" ]; then
    pending=$((pending + 1))
    if [ "$DRY_RUN" = true ]; then
      echo "  ○  [dry-run] $version"
    else
      echo "  ▶  Applying: $version"
      if run_psql -f "$file" > /dev/null 2>&1; then
        run_psql -c "INSERT INTO public.schema_migrations (version) VALUES ('$version');" > /dev/null
        echo "  ✓  Applied:  $version"
        applied_count=$((applied_count + 1))
      else
        echo "  ❌  Failed:   $version"
        # Re-run showing errors
        run_psql -f "$file" || true
        errors=$((errors + 1))
        break
      fi
    fi
  else
    echo "  ⏭   Skipped:  $version (already applied)"
  fi
done

echo ""
if [ "$DRY_RUN" = true ]; then
  echo "  Dry run — $pending migration(s) would be applied."
elif [ "$errors" -gt 0 ]; then
  echo "  ❌  Migration failed. $applied_count applied before error."
  exit 1
else
  echo "  ✅  Done — $applied_count new migration(s) applied."
fi
