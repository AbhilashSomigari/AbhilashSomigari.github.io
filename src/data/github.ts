// Typed access to the build-time GitHub snapshot written by
// scripts/sync-github.mjs. Never edit generated/github.json by hand.
import snapshot from './generated/github.json'

export interface RepoMeta {
  id: number
  name: string
  url: string
  description: string | null
  readmeSummary: string | null
  homepage: string | null
  pagesUrl: string | null
  language: string | null
  topics: string[]
  stars: number
  forks: number
  license: string | null
  fork: boolean
  archived: boolean
  createdAt: string
  pushedAt: string
}

interface Snapshot {
  user: string
  repos: RepoMeta[]
  aliases: Record<string, string>
}

const data = snapshot as Snapshot

/**
 * Public repos that should never appear in the auto-generated
 * "More on GitHub" list (coursework labs, tutorials). They still sync, and
 * can still be curated in projects.ts if that ever changes.
 */
export const HIDDEN_REPOS = new Set(['Lab4-Follow-the-Gap', 'todo-app'])

const byName = new Map(data.repos.map((repo) => [repo.name, repo]))

/** Looks up a repo by name, following renames recorded by the sync script. */
export function getRepo(name: string): RepoMeta | undefined {
  return byName.get(name) ?? byName.get(data.aliases[name] ?? '')
}

export function repoUrl(name: string): string {
  return getRepo(name)?.url ?? `https://github.com/${data.user}/${name}`
}

export function demoUrl(repo: RepoMeta | undefined): string | undefined {
  return repo?.homepage ?? repo?.pagesUrl ?? undefined
}

/** Non-fork public repos that aren't curated or hidden, most recent first. */
export function uncuratedRepos(curatedNames: string[]): RepoMeta[] {
  const curated = new Set(curatedNames.map((name) => getRepo(name)?.name ?? name))
  return data.repos
    .filter((repo) => !repo.fork && !curated.has(repo.name) && !HIDDEN_REPOS.has(repo.name))
    .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt))
}

const MONTH = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })

/** "Oct 2026": coarse on purpose, so the prerendered HTML never disagrees
 *  with the client and the copy doesn't go stale between deploys. */
export function formatMonth(iso: string): string {
  return MONTH.format(new Date(iso))
}
