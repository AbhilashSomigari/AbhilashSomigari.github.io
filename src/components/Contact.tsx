import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, FileText, Github, Linkedin, Mail } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { ExternalLink } from './ui/ExternalLink'
import { buttonPrimary, buttonSecondary } from './ui/Button'
import { links } from '../data/links'

type CopyState = 'idle' | 'copied' | 'failed'

function CopyEmail() {
  const [state, setState] = useState<CopyState>('idle')
  const timer = useRef<number>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setState('copied')
    } catch {
      setState('failed')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2500)
  }

  return (
    <>
      <button type="button" onClick={copy} className={buttonSecondary}>
        {state === 'copied' ? (
          <Check size={16} className="text-accent" aria-hidden="true" />
        ) : (
          <Copy size={16} aria-hidden="true" />
        )}
        {state === 'copied' ? 'Copied' : 'Copy email'}
      </button>
      <span className="sr-only" role="status">
        {state === 'copied' ? 'Email address copied to clipboard' : ''}
        {state === 'failed' ? `Copy failed. The address is ${links.email}` : ''}
      </span>
    </>
  )
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 border-t border-border py-24 sm:py-32">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
          <h2 id="contact-heading" className="mt-3 text-balance text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Let’s talk about building reliable AI systems.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
            I’m looking for AI/ML engineering, LLM and agent engineering, and
            software engineering roles. Email is the fastest way to reach me.
          </p>

          <p className="mt-8">
            <a
              href={`mailto:${links.email}`}
              className="break-all font-mono text-base text-text underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent sm:text-lg"
            >
              {links.email}
            </a>
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${links.email}`} className={buttonPrimary}>
              <Mail size={16} aria-hidden="true" />
              Email me
            </a>
            <CopyEmail />
            <ExternalLink href={links.linkedin} className={buttonSecondary}>
              <Linkedin size={16} aria-hidden="true" />
              LinkedIn
              <ArrowUpRight size={14} aria-hidden="true" />
            </ExternalLink>
            <ExternalLink href={links.github} className={buttonSecondary}>
              <Github size={16} aria-hidden="true" />
              GitHub
              <ArrowUpRight size={14} aria-hidden="true" />
            </ExternalLink>
            <a href={links.resume} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
              <FileText size={16} aria-hidden="true" />
              Résumé
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
