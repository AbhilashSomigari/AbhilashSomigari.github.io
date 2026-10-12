import { ArrowRight, Download, FileText, Github, Linkedin, Mail } from 'lucide-react'
import { Container } from './ui/Container'
import { ExternalLink } from './ui/ExternalLink'
import { buttonPrimary, buttonSecondary, linkSubtle } from './ui/Button'
import { links } from '../data/links'

// Each line is quoted from the linked repo's README or the résumé.
const PROOF = [
  {
    project: 'OpsPilot',
    slug: 'opspilot',
    stat: '93% vs. 30%',
    text: 'root-cause accuracy of my incident-response agent vs. an LLM-only baseline, 30-incident benchmark',
  },
  {
    project: 'EvalForge',
    slug: 'evalforge',
    stat: 'On PyPI',
    text: 'an open-source CI harness that grades agent trajectories and blocks regressions',
  },
  {
    project: 'ProspectPilot',
    slug: 'prospectpilot',
    stat: '960 trials',
    text: 'of seeded evals, used to show a self-improvement loop’s gains were noise, and to fix the loop',
  },
]

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden pt-16">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16 lg:py-32">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/60 px-3 py-1 text-xs text-text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Open to AI/ML and software engineering roles
          </p>

          <h1
            id="hero-heading"
            className="mt-6 text-balance text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl"
          >
            Abhilash Somigari
          </h1>
          <p className="mt-3 font-mono text-sm uppercase tracking-[0.18em] text-accent">
            AI Engineer · Agentic Systems · LLM Evaluation
          </p>

          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-text-secondary sm:text-xl">
            I build agentic AI systems, and the evaluation, guardrails, and
            infrastructure that make them trustworthy.
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-tertiary sm:text-base">
            M.S. Computer Science at West Virginia University (Dec 2026). Python,
            LangGraph, FastAPI, PostgreSQL, PyTorch.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className={buttonPrimary}>
              View Projects
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <div className="inline-flex">
              <a
                href={links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonSecondary} rounded-r-none`}
              >
                <FileText size={16} aria-hidden="true" />
                Résumé
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
              <a
                href={links.resume}
                download={links.resumeFileName}
                aria-label="Download résumé (PDF)"
                title="Download PDF"
                className={`${buttonSecondary} -ml-px rounded-l-none px-3.5`}
              >
                <Download size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <li>
              <ExternalLink href={links.github} className={linkSubtle}>
                <Github size={16} aria-hidden="true" /> GitHub
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={links.linkedin} className={linkSubtle}>
                <Linkedin size={16} aria-hidden="true" /> LinkedIn
              </ExternalLink>
            </li>
            <li>
              <a href="#contact" className={linkSubtle}>
                <Mail size={16} aria-hidden="true" /> Contact
              </a>
            </li>
          </ul>
        </div>

        <aside aria-labelledby="proof-heading" className="card rounded-2xl border border-border bg-bg-card/80 p-6 backdrop-blur-sm sm:p-7">
          <h2 id="proof-heading" className="font-mono text-xs uppercase tracking-wider text-text-tertiary">
            Selected results
          </h2>
          <ul className="mt-5 divide-y divide-border">
            {PROOF.map((item) => (
              <li key={item.slug} className="py-4 first:pt-0 last:pb-0">
                <a href={`#project-${item.slug}`} className="group block">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold text-text group-hover:text-accent">
                      {item.project}
                    </span>
                    <span className="font-mono text-sm text-accent">{item.stat}</span>
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-text-secondary">
                    {item.text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </section>
  )
}
