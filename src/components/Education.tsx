import { Award, GraduationCap } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { Tag } from './ui/Tag'
import { certifications, education } from '../data/education'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="scroll-mt-20 border-t border-border py-20 sm:py-24">
      <Container>
        <SectionHeading id="education-heading" eyebrow="Education" title="Education & certifications" />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="space-y-5">
            {education.map((entry) => (
              <article key={entry.degree} className="card rounded-xl border border-border bg-bg-card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-text">
                    <GraduationCap size={18} className="shrink-0 text-accent" aria-hidden="true" />
                    {entry.degree}
                  </h3>
                  <p className="font-mono text-xs text-text-tertiary">
                    {entry.start} – {entry.end}
                  </p>
                </div>
                <p className="mt-1 text-sm text-text-secondary">
                  {entry.institution} · {entry.location}
                </p>
                {entry.gpa && <p className="mt-2 text-sm text-text-secondary">GPA {entry.gpa}</p>}
                {entry.coursework && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.coursework.map((course) => (
                      <Tag key={course}>{course}</Tag>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </Reveal>

          <Reveal delay={0.06}>
            <article className="card rounded-xl border border-border bg-bg-card p-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-tertiary">Certifications</h3>
              <ul className="mt-4 space-y-4">
                {certifications.map((cert) => (
                  <li key={cert.name} className="flex items-start gap-3">
                    <Award size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-text">{cert.name}</p>
                      <p className="text-sm text-text-secondary">
                        {cert.issuer}
                        {cert.date && <span className="font-mono text-xs text-text-tertiary"> · {cert.date}</span>}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
