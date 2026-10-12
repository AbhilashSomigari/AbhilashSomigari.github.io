import type { ReactNode } from 'react'

/** Anchor that opens in a new tab and tells screen-reader users so. */
export function ExternalLink({
  href,
  children,
  className = '',
  label,
}: {
  href: string
  children: ReactNode
  className?: string
  label?: string
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
      {children}
      {!label && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}
