import { useEffect, useRef, useState } from 'react'
import { FileText, Menu, Moon, Sun, X } from 'lucide-react'
import { Container } from './ui/Container'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'
import { links } from '../data/links'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'research', label: 'Research' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const

const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

function ThemeToggle() {
  const { toggle } = useTheme()
  // Both icons render; CSS shows the right one, so the prerendered markup
  // never depends on the visitor's theme.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text"
    >
      <Sun size={17} className="hidden dark:block" aria-hidden="true" />
      <Moon size={17} className="block dark:hidden" aria-hidden="true" />
    </button>
  )
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const onResize = () => desktop.matches && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors ${
        scrolled || menuOpen ? 'border-border bg-bg/85' : 'border-transparent bg-bg/40'
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight text-text">
          abhilash<span className="text-accent">.</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive ? 'text-text' : 'text-text-secondary hover:text-text'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-px h-px bg-accent transition-opacity ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg border border-border-strong px-3 py-1.5 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent sm:inline-flex"
          >
            <FileText size={15} aria-hidden="true" />
            Résumé
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
          <button
            ref={menuButton}
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-text md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-bg px-5 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`block rounded-lg px-3 py-3 text-base ${
                    active === item.id ? 'bg-bg-elevated text-text' : 'text-text-secondary'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-2 border-t border-border pt-3">
              <a
                href={links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-base text-text-secondary"
              >
                <FileText size={18} aria-hidden="true" /> Résumé (PDF)
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
