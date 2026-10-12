#!/usr/bin/env node
// Injects the server-rendered app into dist/index.html so the page has real
// content before JavaScript loads: faster first paint, and crawlers and link
// previews that don't run JS see the full page. Runs after both Vite builds.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const htmlPath = resolve(root, 'dist/index.html')
const serverEntry = resolve(root, 'dist-ssr/entry-server.js')

const { render } = await import(pathToFileURL(serverEntry).href)
const appHtml = render()

const template = await readFile(htmlPath, 'utf8')
const marker = '<div id="root"></div>'
if (!template.includes(marker)) {
  throw new Error(`prerender: ${marker} not found in dist/index.html`)
}
if (!appHtml.includes('id="projects"')) {
  throw new Error('prerender: rendered HTML is missing the projects section')
}

await writeFile(htmlPath, template.replace(marker, `<div id="root">${appHtml}</div>`))
await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerender: injected ${(appHtml.length / 1024).toFixed(1)} kB of HTML into dist/index.html`)
