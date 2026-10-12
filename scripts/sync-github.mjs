#!/usr/bin/env node
// Build-time GitHub metadata sync.
//
// Fetches public repository metadata for GITHUB_USER and writes a
// deterministic snapshot to src/data/generated/github.json, which the site
// imports at build time. Nothing here runs in the browser, so no token is
// ever shipped to visitors.
//
// Safety properties:
// - The snapshot is only overwritten after a complete, sane response.
//   Any network error, rate limit, or suspicious result exits non-zero and
//   leaves the last good snapshot untouched.
// - Output is sorted and has no timestamps, so the file only changes when
//   repository metadata actually changes (the deploy workflow relies on this).
// - Renames are tracked by stable repo ID, so curated entries keep working
//   after a repository is renamed.
//
// Usage: node scripts/sync-github.mjs [--check]
//   GITHUB_TOKEN (optional) raises the API rate limit from 60 to 5000/hr.
//   --check fetches and reports differences without writing.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const SNAPSHOT_PATH = resolve(ROOT, 'src/data/generated/github.json')
const CURATED_PATH = resolve(ROOT, 'src/data/projects.ts')

const USER = process.env.GITHUB_USER ?? 'AbhilashSomigari'
const API = 'https://api.github.com'
const MAX_ATTEMPTS = 3

// --- Pure helpers (exported for tests) ------------------------------------

/** Repos that are structural, not projects. Excluding the site's own repo
 *  also matters for correctness: its pushed_at changes on every snapshot
 *  commit, which would otherwise make every sync "change" forever. */
export function isStructuralRepo(name, user) {
  const n = name.toLowerCase()
  const u = user.toLowerCase()
  return n === u || n === `${u}.github.io`
}

export function normalizeRepo(raw, user) {
  return {
    id: raw.id,
    name: raw.name,
    url: raw.html_url,
    description: raw.description?.trim() || null,
    readmeSummary: null,
    homepage: raw.homepage?.trim() || null,
    pagesUrl: raw.has_pages
      ? `https://${user.toLowerCase()}.github.io/${raw.name}/`
      : null,
    language: raw.language ?? null,
    topics: [...(raw.topics ?? [])].sort(),
    stars: raw.stargazers_count ?? 0,
    forks: raw.forks_count ?? 0,
    license: raw.license?.spdx_id && raw.license.spdx_id !== 'NOASSERTION'
      ? raw.license.spdx_id
      : null,
    fork: Boolean(raw.fork),
    archived: Boolean(raw.archived),
    createdAt: raw.created_at,
    pushedAt: raw.pushed_at,
  }
}

/** First prose paragraph of a README, stripped of markdown, for repos that
 *  have no GitHub description. Returns null if nothing usable is found. */
export function extractReadmeSummary(markdown, maxLength = 240) {
  if (!markdown) return null
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, '')
  const paragraphs = withoutCode.split(/\n\s*\n/)
  for (const block of paragraphs) {
    const text = block.trim()
    if (!text) continue
    if (/^(#|<|!\[|\[!\[|>|\||-{3,}|={3,}|[-*+]\s|\d+\.\s)/.test(text)) continue
    const plain = text
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/(\*\*|__)(.+?)\1/g, '$2')
      .replace(/(\*|_)(.+?)\1/g, '$2')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    if (plain.length < 40) continue
    if (plain.length <= maxLength) return plain
    const cut = plain.slice(0, maxLength)
    return `${cut.slice(0, cut.lastIndexOf(' '))}…`
  }
  return null
}

/** Carries rename history forward: if a repo ID that previously had name A
 *  now has name B, record A → B. Chains collapse to the newest name. */
export function mergeAliases(previous, repos) {
  const aliases = { ...(previous?.aliases ?? {}) }
  const nameById = new Map(repos.map((r) => [r.id, r.name]))
  for (const old of previous?.repos ?? []) {
    const current = nameById.get(old.id)
    if (current && current !== old.name) aliases[old.name] = current
  }
  const liveNames = new Set(nameById.values())
  const resolved = {}
  for (const [from, to] of Object.entries(aliases)) {
    if (liveNames.has(from)) continue // name reused by a live repo; the live repo wins
    let target = to
    const seen = new Set([from])
    while (aliases[target] && !liveNames.has(target) && !seen.has(target)) {
      seen.add(target)
      target = aliases[target]
    }
    resolved[from] = target
  }
  return Object.fromEntries(Object.entries(resolved).sort(([a], [b]) => a.localeCompare(b)))
}

/** Refuses snapshots that look like a partial or broken API response. */
export function sanityCheck(previous, repos) {
  if (repos.length === 0) {
    return 'GitHub returned zero public repositories'
  }
  const before = previous?.repos?.length ?? 0
  if (before >= 4 && repos.length < Math.ceil(before / 2)) {
    return `repository count dropped from ${before} to ${repos.length}; refusing to overwrite`
  }
  return null
}

export function buildSnapshot(user, repos, previous) {
  const sorted = [...repos].sort((a, b) => a.name.localeCompare(b.name))
  return { user, repos: sorted, aliases: mergeAliases(previous, sorted) }
}

export function serialize(snapshot) {
  return `${JSON.stringify(snapshot, null, 2)}\n`
}

// --- I/O -------------------------------------------------------------------

async function gh(path, { accept = 'application/vnd.github+json', allow404 = false } = {}) {
  const headers = {
    Accept: accept,
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': `${USER}-portfolio-sync`,
  }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

  for (let attempt = 1; ; attempt++) {
    let res
    try {
      res = await fetch(`${API}${path}`, { headers, signal: AbortSignal.timeout(20_000) })
    } catch (error) {
      if (attempt >= MAX_ATTEMPTS) throw new Error(`${path}: ${error.message}`)
      await sleep(1000 * 2 ** attempt)
      continue
    }
    if (res.ok) return accept.includes('raw') ? res.text() : res.json()
    if (res.status === 404 && allow404) return null

    const remaining = res.headers.get('x-ratelimit-remaining')
    const rateLimited = res.status === 429 || (res.status === 403 && remaining === '0')
    if (rateLimited) {
      const reset = Number(res.headers.get('x-ratelimit-reset')) * 1000
      const when = Number.isFinite(reset) ? new Date(reset).toISOString() : 'unknown'
      throw new Error(`rate limited on ${path} (resets ${when}); set GITHUB_TOKEN to raise the limit`)
    }
    if (res.status >= 500 && attempt < MAX_ATTEMPTS) {
      await sleep(1000 * 2 ** attempt)
      continue
    }
    throw new Error(`${path}: HTTP ${res.status} ${await res.text().catch(() => '')}`.slice(0, 300))
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchAllRepos() {
  const repos = []
  for (let page = 1; page <= 10; page++) {
    const batch = await gh(`/users/${USER}/repos?type=owner&per_page=100&page=${page}`)
    repos.push(...batch)
    if (batch.length < 100) break
  }
  return repos
}

async function readPrevious() {
  try {
    return JSON.parse(await readFile(SNAPSHOT_PATH, 'utf8'))
  } catch {
    return null
  }
}

async function warnOnMissingCurated(snapshot) {
  let source
  try {
    source = await readFile(CURATED_PATH, 'utf8')
  } catch {
    return
  }
  const names = new Set(snapshot.repos.map((r) => r.name))
  for (const [, repo] of source.matchAll(/\brepo:\s*'([^']+)'/g)) {
    if (!names.has(repo) && !snapshot.aliases[repo]) {
      const msg = `curated project references repo "${repo}", which is not public on GitHub (deleted, private, or renamed before tracking began)`
      console.warn(process.env.GITHUB_ACTIONS ? `::warning file=src/data/projects.ts::${msg}` : `warning: ${msg}`)
    }
  }
}

async function main() {
  const checkOnly = process.argv.includes('--check')
  const previous = await readPrevious()

  const raw = (await fetchAllRepos()).filter(
    (r) => !r.private && !isStructuralRepo(r.name, USER),
  )
  const repos = raw.map((r) => normalizeRepo(r, USER))

  // README fallback only for repos with no description, to keep requests low.
  for (const repo of repos) {
    if (repo.description) continue
    const readme = await gh(`/repos/${USER}/${repo.name}/readme`, {
      accept: 'application/vnd.github.raw+json',
      allow404: true,
    })
    repo.readmeSummary = extractReadmeSummary(readme)
  }

  const problem = sanityCheck(previous, repos)
  if (problem) throw new Error(problem)

  const snapshot = buildSnapshot(USER, repos, previous)
  const next = serialize(snapshot)
  const prev = previous ? serialize(previous) : ''
  await warnOnMissingCurated(snapshot)

  if (next === prev) {
    console.log(`GitHub snapshot unchanged (${repos.length} repos).`)
    return
  }
  if (checkOnly) {
    console.log(`GitHub snapshot would change (${repos.length} repos). Run without --check to write.`)
    return
  }
  await mkdir(dirname(SNAPSHOT_PATH), { recursive: true })
  await writeFile(SNAPSHOT_PATH, next)
  console.log(`GitHub snapshot updated (${repos.length} repos) → ${SNAPSHOT_PATH}`)
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch((error) => {
    console.error(`GitHub sync failed; keeping the last good snapshot. ${error.message}`)
    process.exit(1)
  })
}
