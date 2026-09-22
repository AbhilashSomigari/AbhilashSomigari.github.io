import { Container } from './ui/Container'
import { links } from '../data/links'

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-3 text-xs text-text-tertiary sm:flex-row">
        <p>© {new Date().getFullYear()} {links.name}</p>
        <p className="font-mono">Built with React, TypeScript, Vite & Tailwind CSS</p>
      </Container>
    </footer>
  )
}
