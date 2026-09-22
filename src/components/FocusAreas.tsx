import type { LucideIcon } from 'lucide-react'
import { Boxes, FlaskConical, GitBranch, Layers, Sparkles } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { focusAreas } from '../data/focusAreas'
import type { FocusCategory } from '../data/types'

const ICONS: Record<FocusCategory, LucideIcon> = {
  'Software Engineering': Boxes,
  'Full-Stack Engineering': Layers,
  'Applied AI': Sparkles,
  'Research Engineering': FlaskConical,
  'Open-Source Collaboration': GitBranch,
}

export function FocusAreas() {
  return (
    <section
      id="focus"
      aria-labelledby="focus-heading"
      className="scroll-mt-20 border-t border-border py-24 sm:py-28"
    >
      <Container>
        <h2 id="focus-heading" className="sr-only">
          Engineering focus areas
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {focusAreas.map((area, index) => {
            const Icon = ICONS[area.category]
            return (
              <Reveal key={area.category} delay={index * 0.06}>
                <div className="h-full rounded-xl border border-border bg-bg-card p-6 transition-colors hover:border-border-strong">
                  <Icon size={20} className="text-accent" />
                  <h3 className="mt-4 text-sm font-semibold text-text">
                    {area.category}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {area.summary}
                  </p>
                  <ul className="mt-4 space-y-1.5 border-t border-border pt-4">
                    {area.items.map((item) => (
                      <li
                        key={item}
                        className="text-xs leading-relaxed text-text-tertiary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
