import { ArrowRight } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { Tag } from './ui/Tag'
import { linkSubtle } from './ui/Button'
import { researchNote, researchThemes } from '../data/research'
import { projects } from '../data/projects'
import { projectAnchor } from './projects/anchor'

export function Research() {
  return (
    <section id="research" aria-labelledby="research-heading" className="scroll-mt-20 border-t border-border py-20 sm:py-24">
      <Container>
        <SectionHeading id="research-heading" eyebrow="Research" title="Research engineering" description={researchNote} />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {researchThemes.map((theme, index) => {
            const project = projects.find((p) => p.slug === theme.linkedProjectSlug)
            return (
              <Reveal key={theme.title} delay={(index % 2) * 0.05} className="h-full">
                <article className="card flex h-full flex-col rounded-xl border border-border bg-bg-card p-6">
                  <h3 className="text-base font-semibold text-text">{theme.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{theme.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {theme.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  {project && (
                    <a href={`#${projectAnchor(project.slug)}`} className={`${linkSubtle} mt-auto pt-5`}>
                      Related project: {project.name}
                      <ArrowRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
