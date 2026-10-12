import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The résumé is maintained by hand at public/resume.pdf. Its content hash is
// appended to every résumé link (/resume.pdf?v=<hash>), so replacing the PDF
// busts browser and CDN caches with no code change. A missing file fails the
// build instead of shipping a broken link.
const RESUME = new URL('./public/resume.pdf', import.meta.url)
if (!existsSync(RESUME)) {
  throw new Error('public/resume.pdf is missing. Add the résumé PDF before building.')
}
const resumeVersion = createHash('sha256').update(readFileSync(RESUME)).digest('hex').slice(0, 10)

// Deploying to https://AbhilashSomigari.github.io/ (a user/org page), so
// the site is served from the domain root and base must stay '/'.
// If this ever moves to a project page (e.g. github.com/<user>/portfolio),
// change base to '/portfolio/' to match the repo name exactly.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  define: {
    __RESUME_VERSION__: JSON.stringify(resumeVersion),
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
