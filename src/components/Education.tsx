import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { Tag } from './ui/Tag'
import { certifications, education } from '../data/education'

export function Education() {
  return (
    <section id="education" className="scroll-mt-20 border-t border-border py-24 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Education" title="Education & Certifications" />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-6">
              {education.map((entry) => (
                <div
                  key={entry.degree}
                  className="rounded-xl border border-border bg-bg-card p-6"
                >
                  <p className="font-mono text-xs text-text-tertiary">
                    {entry.start} – {entry.end}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-text">
                    {entry.degree}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {entry.institution} · {entry.location}
                  </p>
                  {entry.gpa && (
                    <p className="mt-2 text-sm text-text-secondary">
                      GPA: {entry.gpa}
                    </p>
                  )}
                  {entry.coursework && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {entry.coursework.map((course) => (
                        <Tag key={course}>{course}</Tag>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-xl border border-border bg-bg-card p-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-tertiary">
                Certifications
              </h3>
              <ul className="mt-4 space-y-4">
                {certifications.map((cert) => (
                  <li key={cert.name} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-text">{cert.name}</p>
                      <p className="text-sm text-text-secondary">{cert.issuer}</p>
                    </div>
                    <p className="whitespace-nowrap font-mono text-xs text-text-tertiary">
                      {cert.date}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
