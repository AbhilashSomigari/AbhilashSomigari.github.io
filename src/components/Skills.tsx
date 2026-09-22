import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { Tag } from './ui/Tag'
import { skills } from '../data/skills'

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-border py-24 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Skills" title="Technical Toolbox" />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, index) => (
            <Reveal key={group.category} delay={(index % 3) * 0.05}>
              <div className="h-full rounded-xl border border-border bg-bg-card p-6">
                <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
                  {group.category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
