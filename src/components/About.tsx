import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { focusAreas } from '../data/focusAreas'

const FACTS = [
  { label: 'Based in', value: 'Morgantown, WV' },
  { label: 'Education', value: 'M.S. Computer Science, West Virginia University · GPA 3.87 · Expected Dec 2026' },
  { label: 'Previously', value: 'Graduate Research Assistant & Teaching Assistant, WVU · Software Developer Intern, SAK Informatics' },
  { label: 'Open to', value: 'AI/ML engineering, LLM & agent engineering, software engineering' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 border-t border-border py-20 sm:py-24">
      <Container>
        <SectionHeading id="about-heading" eyebrow="About" title="An AI engineer who measures" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <Reveal className="space-y-5 text-base leading-relaxed text-text-secondary sm:text-lg">
            <p>
              I build LLM agents end to end: the LangGraph orchestration and
              tool calls, the FastAPI services and Postgres/pgvector storage
              underneath, the observability around them, and the evaluation
              that says whether any of it works. My recent projects are an
              incident-response agent with a human-approval gate, an
              open-source CI harness for grading agents, and a self-improving
              multi-agent pipeline.
            </p>
            <p>
              My graduate research at West Virginia University taught me to treat
              every result as a claim to be tested: a baseline, a reproducible
              pipeline, and a quantitative way to tell whether it worked. That
              produced a faithfulness metric for explainable object detection, a
              SAM3 pipeline for surgical-video analysis, and, in my own
              projects, the habit of publishing a null result when the gains
              turn out to be noise.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="card grid gap-5 rounded-xl border border-border bg-bg-card p-6">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-text">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <h3 className="sr-only">Focus areas</h3>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {focusAreas.map((area) => (
              <li key={area.title} className="card rounded-xl border border-border bg-bg-card p-5">
                <p className="text-sm font-semibold text-text">{area.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{area.summary}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
