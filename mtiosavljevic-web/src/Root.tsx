import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import App from './App'

/**
 * The tree below the router. Both entries render exactly this — if the client
 * mounts anything the prerender did not (a Toaster, a provider), hydration
 * mismatches and React throws the whole prerendered DOM away.
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 1000 * 60 * 5, retry: 1 },
    },
  })
}

export default function Root({ queryClient }: { queryClient: QueryClient }) {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#18181B',
            color: '#E8E6E1',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '0',
            fontSize: '0.85rem',
          },
        }}
      />
    </QueryClientProvider>
  )
}
