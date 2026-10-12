import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { Tag } from './ui/Tag'
import { experience } from '../data/experience'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-20 border-t border-border py-20 sm:py-24">
      <Container>
        <SectionHeading id="experience-heading" eyebrow="Experience" title="Where I’ve worked" />

        <ol className="relative mt-12 space-y-10 border-l border-border pl-6 sm:pl-8">
          {experience.map((entry, index) => (
            <li key={entry.role + entry.organization} className="relative">
              <span
                aria-hidden="true"
                className={`absolute top-1.5 -left-[29px] h-2.5 w-2.5 rounded-full border-2 sm:-left-[37px] ${
                  index === 0 ? 'border-accent bg-accent' : 'border-border-strong bg-bg'
                }`}
              />
              <Reveal delay={Math.min(index, 2) * 0.04}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-lg font-semibold text-text">{entry.role}</h3>
                  <p className="font-mono text-xs text-text-tertiary">
                    <time>{entry.start}</time> – <time>{entry.end}</time>
                  </p>
                </div>
                <p className="mt-0.5 text-sm text-text-secondary">
                  {entry.organization} · {entry.location}
                </p>
                <ul className="mt-4 max-w-3xl space-y-2.5">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-text-secondary">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.tech.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
