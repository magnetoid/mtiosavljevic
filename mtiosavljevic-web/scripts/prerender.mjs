/**
 * Post-build prerender.
 *
 * The app is a Vite SPA, so dist/index.html shipped an empty <div id="root">
 * and crawlers saw nothing but the <title>. This renders each public route to
 * real HTML, then React hydrates over it in the browser. No framework
 * migration and no new runtime dependency.
 *
 * It also fetches the published blog posts once and embeds them as
 * window.__SSR_DATA__, because those are loaded in useEffect — which never runs
 * under renderToString — so the archive was otherwise absent from the static
 * HTML. If the fetch fails the build still succeeds; the pages just fall back
 * to loading posts client-side, exactly as before.
 *
 * Routes are written as <route>.html rather than <route>/index.html so nginx
 * can serve them from `try_files $uri $uri.html` with no trailing-slash
 * redirect, keeping canonical URLs slash-free.
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

// Public routes only. /admin is session-gated and deliberately excluded.
const ROUTES = ['/', '/projects', '/blog', '/contact']

/**
 * Vite reads env from the repo root (see `envDir` in vite.config.ts), but this
 * script is a plain Node process and inherits none of it. Load the same file.
 */
async function loadEnv() {
  for (const f of [path.join(root, '..', '.env.production'), path.join(root, '.env.production')]) {
    try {
      const text = await fs.readFile(f, 'utf8')
      for (const line of text.split('\n')) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)
        if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '')
      }
      return f
    } catch { /* try the next location */ }
  }
  return null
}

async function fetchPosts() {
  const base = process.env.VITE_SUPABASE_URL
  const key = process.env.VITE_SUPABASE_ANON_KEY
  if (!base || !key || base.includes('placeholder')) {
    console.log('  no Supabase credentials at build time — skipping post prefetch')
    return []
  }
  const url =
    `${base.replace(/\/$/, '')}/rest/v1/blog_posts` +
    `?select=id,title,slug,excerpt,category,published_at,created_at,read_time_minutes` +
    `&published=eq.true&order=published_at.desc`
  try {
    const res = await fetch(url, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(20000),
    })
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    const posts = await res.json()
    console.log(`  prefetched ${posts.length} published posts`)
    return posts
  } catch (e) {
    console.warn(`  post prefetch failed (${e.message}) — pages will load them client-side`)
    return []
  }
}

await loadEnv()
const posts = await fetchPosts()

/**
 * Only ship each route the data it actually renders. /blog lists excerpts, so it
 * gets the full records; the homepage shows date and title only, so it gets a
 * slim set; /projects and /contact read no posts and get nothing. Shipping the
 * full payload everywhere cost 21 KB on a contact page that never touches it.
 */
const slim = p => ({
  id: p.id, title: p.title, slug: p.slug,
  category: p.category, published_at: p.published_at,
})
const ROUTE_DATA = {
  '/': { posts: posts.map(slim) },
  '/blog': { posts },
}

// </script> inside JSON would close the tag early; < is escaped to prevent it.
const tagFor = data =>
  data && data.posts?.length
    ? `<script>window.__SSR_DATA__=${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
    : ''

const { render } = await import(path.join(dist, 'server', 'entry-server.js'))
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')

let written = 0
for (const route of ROUTES) {
  const data = ROUTE_DATA[route] ?? {}
  const { html, head } = render(route, data)

  let page = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  page = page.replace('</head>', `  ${[head, tagFor(data)].filter(Boolean).join('\n    ')}\n  </head>`)

  const outFile =
    route === '/' ? path.join(dist, 'index.html') : path.join(dist, `${route.replace(/^\//, '')}.html`)

  await fs.mkdir(path.dirname(outFile), { recursive: true })
  await fs.writeFile(outFile, page)
  console.log(`  prerendered ${route.padEnd(12)} -> ${path.relative(root, outFile)}`)
  written++
}

// The server bundle is a build artifact, not something to deploy.
await fs.rm(path.join(dist, 'server'), { recursive: true, force: true })
console.log(`\n  ${written} routes prerendered`)
