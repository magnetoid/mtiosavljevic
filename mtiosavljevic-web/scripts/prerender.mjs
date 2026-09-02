/**
 * Post-build prerender.
 *
 * The app is a Vite SPA, so `dist/index.html` shipped an empty <div id="root">
 * and crawlers saw nothing but the <title>. This renders each public route to
 * real HTML and writes it into dist/, then React hydrates over it in the
 * browser. No framework migration and no new runtime dependency.
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

// Public routes only. /admin is session-gated and deliberately excluded.
const ROUTES = ['/', '/projects', '/blog', '/contact']

const { render } = await import(path.join(dist, 'server', 'entry-server.js'))
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')

let written = 0
for (const route of ROUTES) {
  const { html, head } = render(route)

  let page = template.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  )
  if (head) page = page.replace('</head>', `  ${head}\n  </head>`)

  const outFile =
    route === '/'
      ? path.join(dist, 'index.html')
      : path.join(dist, route.replace(/^\//, ''), 'index.html')

  await fs.mkdir(path.dirname(outFile), { recursive: true })
  await fs.writeFile(outFile, page)
  console.log(`  prerendered ${route.padEnd(12)} -> ${path.relative(root, outFile)}`)
  written++
}

// The server bundle is a build artifact, not something to deploy.
await fs.rm(path.join(dist, 'server'), { recursive: true, force: true })
console.log(`\n  ${written} routes prerendered`)
