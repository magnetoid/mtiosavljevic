import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Root, { createQueryClient } from './Root'
import './index.css'

const container = document.getElementById('root')!

const tree = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Root queryClient={createQueryClient()} />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

// Prerendered pages arrive with markup already in #root; hydrate those and
// only create a fresh root for routes that were not prerendered (e.g. /admin).
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
