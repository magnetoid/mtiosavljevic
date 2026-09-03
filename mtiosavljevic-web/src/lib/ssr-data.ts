import type { BlogPost } from './supabase'

/**
 * Data captured at build time and embedded in the prerendered HTML.
 *
 * Blog posts are fetched inside useEffect, which never runs under
 * renderToString — so the prerendered /blog carried a heading and an empty
 * list, and the whole archive was invisible to crawlers. The prerender script
 * fetches the posts once and injects them as window.__SSR_DATA__; components
 * seed their state from here so the server and client render the same markup
 * and hydration stays clean.
 */
export interface SsrData {
  posts?: BlogPost[]
}

declare global {
  interface Window { __SSR_DATA__?: SsrData }
}

let serverData: SsrData = {}

/** Called by entry-server.tsx before each render. */
export function setSsrData(data: SsrData) {
  serverData = data
}

export function getSsrData(): SsrData {
  if (typeof window !== 'undefined') return window.__SSR_DATA__ ?? {}
  return serverData
}
