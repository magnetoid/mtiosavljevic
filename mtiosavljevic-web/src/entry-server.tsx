import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async'
import Root, { createQueryClient } from './Root'

/**
 * Renders one route to static HTML at build time (see scripts/prerender.mjs).
 * The tree here must match src/main.tsx exactly, or hydration fails and React
 * discards the prerendered DOM.
 *
 * Only public routes are prerendered — /admin stays client-only because it is
 * gated on a live Supabase session and has nothing useful to serve a crawler.
 */
export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {}

  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <Root queryClient={createQueryClient()} />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  )

  const { helmet } = helmetContext
  const head = [
    helmet?.title?.toString(),
    helmet?.meta?.toString(),
    helmet?.link?.toString(),
    helmet?.script?.toString(),
  ].filter(Boolean).join('\n    ')

  return { html, head }
}
