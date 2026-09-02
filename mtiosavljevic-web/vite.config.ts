import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// `vite build --ssr` reuses this config; only the build target differs.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
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
