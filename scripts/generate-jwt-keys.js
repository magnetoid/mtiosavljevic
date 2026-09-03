#!/usr/bin/env node
/**
 * Generates a fresh Supabase secret set: JWT_SECRET, POSTGRES_PASSWORD, and the
 * anon / service_role JWTs signed with that secret (HS256, iss "supabase",
 * 5-year expiry — matching the format the stack already uses).
 *
 * Writes to a file you pass as the first argument, defaulting to
 * .env.production.new. It never overwrites .env.production in place and never
 * prints a full secret to stdout.
 *
 *   node scripts/generate-jwt-keys.js [outfile] [--from .env.production]
 *
 * With --from, every non-secret var in that file is carried over unchanged so
 * the result is a complete, drop-in env file.
 */
const crypto = require('node:crypto')
const fs = require('node:fs')

const args = process.argv.slice(2)
const out = args.find(a => !a.startsWith('--')) || '.env.production.new'
const fromIdx = args.indexOf('--from')
const from = fromIdx !== -1 ? args[fromIdx + 1] : null

const b64 = o => Buffer.from(JSON.stringify(o)).toString('base64url')
function jwt(payload, secret) {
  const head = b64({ alg: 'HS256', typ: 'JWT' })
  const body = b64(payload)
  const sig = crypto.createHmac('sha256', secret).update(`${head}.${body}`).digest('base64url')
  return `${head}.${body}.${sig}`
}

const JWT_SECRET = crypto.randomBytes(48).toString('base64url')       // 64 chars
const POSTGRES_PASSWORD = crypto.randomBytes(24).toString('base64url') // 32 chars

const iat = Math.floor(Date.now() / 1000)
const exp = iat + 60 * 60 * 24 * 365 * 5
const ANON = jwt({ role: 'anon', iss: 'supabase', iat, exp }, JWT_SECRET)
const SERVICE = jwt({ role: 'service_role', iss: 'supabase', iat, exp }, JWT_SECRET)

const rotated = {
  JWT_SECRET,
  POSTGRES_PASSWORD,
  SUPABASE_ANON_KEY: ANON,
  SUPABASE_SERVICE_KEY: SERVICE,
  VITE_SUPABASE_ANON_KEY: ANON,
}

let lines = []
if (from && fs.existsSync(from)) {
  // Carry every other var across untouched so the output is complete.
  lines = fs.readFileSync(from, 'utf8').split('\n').map(line => {
    const m = line.match(/^([A-Z0-9_]+)=/)
    if (m && m[1] in rotated) return `${m[1]}=${rotated[m[1]]}`
    return line
  })
  for (const [k, v] of Object.entries(rotated)) {
    if (!lines.some(l => l.startsWith(`${k}=`))) lines.push(`${k}=${v}`)
  }
} else {
  lines = Object.entries(rotated).map(([k, v]) => `${k}=${v}`)
}

fs.writeFileSync(out, lines.join('\n').replace(/\n*$/, '\n'), { mode: 0o600 })

const mask = s => `${s.slice(0, 6)}…${s.slice(-4)} (${s.length} chars)`
console.log(`Wrote ${out} (mode 600)\n`)
console.log('  JWT_SECRET            ', mask(JWT_SECRET))
console.log('  POSTGRES_PASSWORD     ', mask(POSTGRES_PASSWORD))
console.log('  SUPABASE_ANON_KEY     ', mask(ANON))
console.log('  SUPABASE_SERVICE_KEY  ', mask(SERVICE))
console.log(`\n  anon/service expire   ${new Date(exp * 1000).toISOString().slice(0, 10)}`)
console.log('\nThis file is gitignored. Do not commit it.')
