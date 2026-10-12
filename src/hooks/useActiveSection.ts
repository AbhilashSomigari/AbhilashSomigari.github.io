import { useEffect, useState } from 'react'

/** Scrollspy: returns the id of the section nearest the top of the viewport.
 *  Pass a stable (module-level) array; the observer is rebuilt if it changes. */
export function useActiveSection(sectionIds: readonly string[]): string {
  const [active, setActive] = useState('')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        // First section in document order that's inside the band wins.
        setActive(sectionIds.find((id) => visible.has(id)) ?? '')
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  return active
}
