import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { Tag } from './ui/Tag'
import { researchNote, researchThemes } from '../data/research'

export function Research() {
  return (
    <section id="research" className="scroll-mt-20 border-t border-border py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Research & Technical Exploration"
          title="Research Engineering"
          description={researchNote}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {researchThemes.map((theme, index) => (
            <Reveal key={theme.title} delay={(index % 2) * 0.06}>
              <div className="h-full rounded-xl border border-border bg-bg-card p-6">
                <h3 className="text-base font-semibold text-text">
                  {theme.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {theme.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {theme.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
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
