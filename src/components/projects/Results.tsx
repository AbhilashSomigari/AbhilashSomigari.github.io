import type { ProjectResult } from '../../data/types'

export function Results({ results, compact = false }: { results: ProjectResult[]; compact?: boolean }) {
  return (
    <ul className={`grid gap-3 ${compact ? 'grid-cols-1' : 'sm:grid-cols-3'}`}>
      {results.map((result) => (
        <li
          key={result.label}
          className={`rounded-lg border border-border bg-bg-elevated ${compact ? 'flex items-baseline gap-3 px-3 py-2.5' : 'p-4'}`}
        >
          <span className={`block shrink-0 font-mono font-semibold text-accent ${compact ? 'text-base' : 'text-2xl'}`}>
            {result.value}
          </span>{' '}
          <span className={`block text-sm leading-snug text-text-secondary ${compact ? '' : 'mt-1'}`}>
            {result.label}
          </span>
        </li>
      ))}
    </ul>
  )
}
