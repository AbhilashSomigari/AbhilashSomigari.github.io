import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'

export function Philosophy() {
  return (
    <section className="border-t border-border py-24 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Engineering Philosophy
          </p>
          <blockquote className="mt-5 text-balance text-2xl font-medium leading-snug text-text sm:text-3xl">
            "Engineering is the discipline of turning ambiguity into
            reliable, scalable systems."
          </blockquote>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary">
            In practice, that means favoring clarity before complexity,
            interfaces that stay usable under real conditions, APIs that fail
            predictably, and AI components that are evaluated against a
            baseline rather than trusted on vibes. Documentation and
            reproducibility aren't an afterthought — they're what makes a
            project someone else's problem to extend, not just mine to
            remember.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
