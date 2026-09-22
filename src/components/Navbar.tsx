import { useEffect, useState } from 'react'
import { Github, Menu, X } from 'lucide-react'
import { Container } from './ui/Container'
import { useActiveSection } from '../hooks/useActiveSection'
import { links } from '../data/links'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'open-source', label: 'Open Source' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(NAV_ITEMS.map((item) => item.id))

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#hero"
          className="font-mono text-sm font-semibold tracking-tight text-text"
        >
          Abhilash.
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                active === item.id
                  ? 'text-text'
                  : 'text-text-secondary hover:text-text'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="text-text-secondary transition-colors hover:text-text"
          >
            <Github size={19} />
          </a>
        </div>

        <button
          type="button"
          className="text-text md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {menuOpen && (
        <nav className="border-t border-border bg-bg px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-md px-3 py-2.5 text-base ${
                    active === item.id ? 'text-text' : 'text-text-secondary'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-2 border-t border-border pt-3">
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-base text-text-secondary"
              >
                <Github size={18} /> GitHub
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
