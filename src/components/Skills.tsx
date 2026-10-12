import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { skills } from '../data/skills'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-20 border-t border-border py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="skills-heading"
          eyebrow="Skills"
          title="Technical toolbox"
          description="Grouped by area, most relevant first. No proficiency bars: the projects above show how each one is used."
        />

        <Reveal className="mt-10">
          <dl className="card divide-y divide-border rounded-xl border border-border bg-bg-card">
            {skills.map((group) => (
              <div key={group.category} className="grid gap-3 p-5 sm:grid-cols-[200px_1fr] sm:gap-6 sm:p-6">
                <dt className="font-mono text-xs uppercase tracking-wider text-accent sm:pt-1.5">
                  {group.category}
                </dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-md border border-border bg-bg-elevated px-2.5 py-1 text-sm text-text"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  )
}
