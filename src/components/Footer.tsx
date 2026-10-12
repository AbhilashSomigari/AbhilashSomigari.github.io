import { Container } from './ui/Container'
import { links } from '../data/links'

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-3 text-xs text-text-tertiary sm:flex-row">
        {/* Year is computed at build time; suppress the one-day-a-year
            hydration mismatch rather than render it client-only. */}
        <p suppressHydrationWarning>
          © {new Date().getFullYear()} {links.fullName}
        </p>
        <p className="font-mono">React · TypeScript · Tailwind CSS · project data synced daily from GitHub</p>
      </Container>
    </footer>
  )
}
