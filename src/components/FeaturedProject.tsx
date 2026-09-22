import { ArrowUpRight, Github } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { Tag } from './ui/Tag'
import { ArchitectureFlow } from './ui/ArchitectureFlow'
import { flagshipProject } from '../data/projects'

export function FeaturedProject() {
  const project = flagshipProject
  const categories = [project.category, ...(project.secondaryCategories ?? [])]

  return (
    <div className="border-t border-border py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Featured System
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
              {project.name}
            </h3>
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
              <Github size={16} />
              View Repository
              <ArrowUpRight size={14} />
            </a>
          </div>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-text-secondary">
            {project.oneLiner}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Tag key={category}>{category}</Tag>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 rounded-2xl border border-border bg-bg-card p-6 sm:p-8 lg:grid-cols-[1fr_1fr]">
          <Reveal delay={0.05}>
            <div className="space-y-6">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-text-tertiary">
                  Problem
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {project.problem}
                </p>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-text-tertiary">
                  Approach
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {project.approach}
                </p>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-text-tertiary">
                  Engineering Highlights
                </h4>
                <ul className="mt-2 space-y-2">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-2.5 text-sm leading-relaxed text-text-secondary"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-border pt-5">
                {project.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-text-tertiary">
                Architecture
              </h4>
              <div className="mt-5">
                <ArchitectureFlow steps={project.architecture} />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  )
}
