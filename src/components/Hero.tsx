import { ArrowRight, FileText, Github, Linkedin, Mail } from 'lucide-react'
import { Container } from './ui/Container'
import { SystemGraph } from './ui/SystemGraph'
import { links } from '../data/links'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="relative grid gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-0">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Software Engineer · Full-Stack · Applied AI
          </p>

          <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
            Abhilash Somigari
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl">
            Software engineer building full-stack products and applied AI
            systems.
          </p>

          <p className="mt-3 max-w-xl text-sm font-medium text-text-tertiary sm:text-base">
            Software Engineering · Full-Stack Engineering · Applied AI ·
            Research Engineering · Open-Source Collaboration
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-text px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              Explore My Work
              <ArrowRight size={16} />
            </a>
            <a
              href={links.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border-strong px-5 py-3 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
              <FileText size={16} />
              View Résumé
            </a>
          </div>

          <div className="mt-8 flex items-center gap-5">
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="text-text-secondary transition-colors hover:text-accent"
            >
              <Github size={20} />
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="text-text-secondary transition-colors hover:text-accent"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${links.email}`}
              aria-label="Send email"
              className="text-text-secondary transition-colors hover:text-accent"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="hidden justify-center lg:flex" aria-hidden="true">
          <SystemGraph />
        </div>
      </Container>
    </section>
  )
}
