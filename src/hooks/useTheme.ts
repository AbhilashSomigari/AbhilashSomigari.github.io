import { useCallback, useEffect } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const THEME_COLORS: Record<Theme, string> = { dark: '#0a0a0b', light: '#fafafa' }

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLORS[theme])
}

/**
 * The initial theme is set by an inline script in index.html before first
 * paint (stored choice, else OS preference). This hook only handles the
 * toggle and follows OS changes until the visitor makes an explicit choice.
 * The current theme is read from the DOM, never from React state, so the
 * prerendered markup can't mismatch on hydration.
 */
export function useTheme() {
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (event: MediaQueryListEvent) => {
      if (!storedTheme()) applyTheme(event.matches ? 'light' : 'dark')
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    const next: Theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'
    applyTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage unavailable (private mode): the choice lasts for this page view.
    }
  }, [])

  return { toggle }
}
