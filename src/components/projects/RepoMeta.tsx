import { Archive, Star } from 'lucide-react'
import { formatMonth, type RepoMeta as Repo } from '../../data/github'

/** Live metadata from the GitHub sync. Renders nothing if the repo is
 *  missing from the snapshot (deleted, private, or never synced). */
export function RepoMeta({ repo }: { repo: Repo | undefined }) {
  if (!repo) return null
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-text-tertiary">
      {repo.archived && (
        <span className="inline-flex items-center gap-1 rounded-full border border-border-strong px-2 py-0.5 text-text-secondary">
          <Archive size={11} aria-hidden="true" /> Archived
        </span>
      )}
      {repo.language && <span>{repo.language}</span>}
      {repo.stars > 0 && (
        <span className="inline-flex items-center gap-1">
          <Star size={11} aria-hidden="true" />
          {repo.stars}
          <span className="sr-only"> {repo.stars === 1 ? 'star' : 'stars'}</span>
        </span>
      )}
      {repo.license && <span>{repo.license}</span>}
      <span>Updated {formatMonth(repo.pushedAt)}</span>
    </p>
  )
}
