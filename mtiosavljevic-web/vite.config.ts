import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// `vite build --ssr` reuses this config; only the build target differs.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  // The env file lives at the repo root, not in this package. Without this,
  // Vite never found VITE_SUPABASE_ANON_KEY, the client fell back to the literal
  // string 'placeholder', and every PostgREST request on production returned 401.
  // Only VITE_-prefixed vars are exposed to the bundle; the secrets in that file
  // (JWT_SECRET, POSTGRES_PASSWORD, SUPABASE_SERVICE_KEY) are not.
  envDir: path.resolve(__dirname, '..'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  // react-helmet-async ships CJS; externalising it makes Node fail on the
  // named import in the SSR bundle, so bundle it in instead.
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  build: {
    outDir: isSsrBuild ? 'dist/server' : 'dist',
    sourcemap: false,
    rollupOptions: isSsrBuild
      ? { input: 'src/entry-server.tsx', output: { entryFileNames: 'entry-server.js' } }
      : {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom', 'react-router-dom'],
              supabase: ['@supabase/supabase-js'],
              motion: ['framer-motion'],
            },
          },
        },
  },
}))
