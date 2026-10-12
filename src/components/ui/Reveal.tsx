import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealState = 'static' | 'hidden' | 'shown'

/**
 * Fades content in as it scrolls into view. Content that is already on
 * screen when the page loads is never hidden, and nothing animates when the
 * visitor prefers reduced motion, so this can't delay access to content.
 * Plain CSS + IntersectionObserver; see .reveal-* in index.css.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<RevealState>('static')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return

    setState('hidden')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -60px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const stateClass =
    state === 'hidden' ? 'reveal-hidden' : state === 'shown' ? 'reveal-shown' : ''

  return (
    <div
      ref={ref}
      className={`${className} ${stateClass}`.trim()}
      style={state === 'shown' && delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}
