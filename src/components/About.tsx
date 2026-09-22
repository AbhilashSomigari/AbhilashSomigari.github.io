import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const FACTS = [
  { label: 'Based in', value: 'Morgantown, WV' },
  { label: 'Education', value: 'M.S. Computer Science, WVU (2025–26)' },
  { label: 'Currently', value: 'Graduate Research Assistant & Teaching Assistant' },
  { label: 'Focus', value: 'Full-stack systems, applied AI, research engineering' },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24 sm:py-28">
      <Container>
        <SectionHeading eyebrow="About" title="What I work on" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="space-y-5 text-base leading-relaxed text-text-secondary sm:text-lg">
            <p>
              I build software systems end to end — the interface a user
              touches, the API and services behind it, and, increasingly, the
              models and retrieval pipelines that make that software useful in
              ways plain logic can't. My work spans full-stack web platforms,
              backend services in Python and Flask/FastAPI, and applied AI
              components: retrieval-augmented generation, agent orchestration
              with LangGraph, and computer-vision pipelines built with PyTorch
              and OpenCV.
            </p>
            <p>
              As a Graduate Research Assistant at West Virginia University, I
              treat research like engineering: every experiment gets a
              baseline, a reproducible pipeline, and a quantitative way to
              measure whether it actually worked. That's shown up as a custom
              faithfulness metric for explainable AI, a benchmark harness that
              scores an incident-response agent against a no-tools baseline,
              and normalization methods for quantitative video analysis.
            </p>
            <p>
              AI is a significant part of that work, but it's one layer of a
              larger practice — the frontend, the API, the database, the
              deployment pipeline, and the evaluation loop matter just as
              much. I publish most of what I build on GitHub, with
              documentation and licensing meant for someone else to actually
              read, run, and reuse.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="grid grid-cols-1 gap-5 rounded-xl border border-border bg-bg-card p-6">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm text-text">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
