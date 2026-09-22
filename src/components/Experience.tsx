import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { Tag } from './ui/Tag'
import { experience } from '../data/experience'

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-border py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Engineering Experience"
          description="Research assistantship, teaching, and mentoring work — the professional context behind the projects below."
        />

        <div className="mt-12 space-y-10">
          {experience.map((entry, index) => (
            <Reveal key={entry.role + entry.organization} delay={index * 0.05}>
              <div className="grid gap-2 border-t border-border pt-8 sm:grid-cols-[220px_1fr] sm:gap-8">
                <div>
                  <p className="font-mono text-xs text-text-tertiary">
                    {entry.start} — {entry.end}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-text">
                    {entry.role}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {entry.organization}
                  </p>
                  <p className="mt-1 text-xs text-text-tertiary">
                    {entry.context}
                  </p>
                </div>

                <div>
                  <ul className="space-y-2.5">
                    {entry.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2.5 text-sm leading-relaxed text-text-secondary"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.tech.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
