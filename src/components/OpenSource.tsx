import { ArrowUpRight, Github } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { openSourcePrinciples, publicRepos } from '../data/openSource'
import { links } from '../data/links'

export function OpenSource() {
  return (
    <section id="open-source" className="scroll-mt-20 border-t border-border py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Open Source & Public Engineering"
          title="Building in the Open"
          description="All of my active projects are public on GitHub, documented well enough for a stranger to clone and run them."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <ul className="space-y-4">
              {openSourcePrinciples.map((principle) => (
                <li
                  key={principle}
                  className="flex gap-3 rounded-lg border border-border bg-bg-card p-4 text-sm leading-relaxed text-text-secondary"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {principle}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="divide-y divide-border rounded-xl border border-border bg-bg-card">
              {publicRepos.map((repo) => (
                <li key={repo.name} className="p-4 sm:p-5">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="font-mono text-sm font-medium text-text group-hover:text-accent">
                        {repo.name}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                        {repo.description}
                      </p>
                      <p className="mt-2 text-xs text-text-tertiary">
                        {repo.language}
                        {repo.license ? ` · ${repo.license}` : ''}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="mt-1 shrink-0 text-text-tertiary group-hover:text-accent"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text"
            >
              <Github size={16} />
              View all repositories on GitHub
              <ArrowUpRight size={13} />
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
