import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Deploying to https://AbhilashSomigari.github.io/ (a user/org page), so
// the site is served from the domain root and base must stay '/'.
// If this ever moves to a project page (e.g. github.com/<user>/portfolio),
// change base to '/portfolio/' to match the repo name exactly.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
