import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { links } from '../data/links'

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border py-24 sm:py-32">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Let's build useful systems.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
            I'm interested in opportunities involving software engineering,
            full-stack development, applied AI, research engineering, and
            open-source collaboration.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${links.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-text px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              <Mail size={16} />
              Email Me
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border-strong px-5 py-3 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border-strong px-5 py-3 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
              <Github size={16} />
              GitHub
              <ArrowUpRight size={14} />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
