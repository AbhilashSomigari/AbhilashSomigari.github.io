import { useState } from 'react'
import { ArrowUpRight, ChevronDown, Github } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { Tag } from './ui/Tag'
import { ArchitectureFlow } from './ui/ArchitectureFlow'
import { projects } from '../data/projects'
import type { Project } from '../data/types'

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-bg-card p-6 transition-colors hover:border-border-strong">
      <div className="flex flex-wrap items-center gap-2">
        <Tag>{project.category}</Tag>
        {project.secondaryCategories?.map((category) => (
          <Tag key={category}>{category}</Tag>
        ))}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-text">{project.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {project.oneLiner}
      </p>

      <ul className="mt-4 space-y-2">
        {project.highlights.slice(0, 3).map((highlight) => (
          <li
            key={highlight}
            className="flex gap-2.5 text-sm leading-relaxed text-text-secondary"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {highlight}
          </li>
        ))}
      </ul>

      {expanded && (
        <div className="mt-5 space-y-5 border-t border-border pt-5">
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
              Problem
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
              {project.problem}
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
              Approach
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
              {project.approach}
            </p>
          </div>
          {project.highlights.length > 3 && (
            <ul className="space-y-2">
              {project.highlights.slice(3).map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-2.5 text-sm leading-relaxed text-text-secondary"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {highlight}
                </li>
              ))}
            </ul>
          )}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
              Architecture
            </h4>
            <div className="mt-4">
              <ArchitectureFlow steps={project.architecture} />
            </div>
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text"
        >
          {expanded ? 'Show less' : 'Engineering details'}
          <ChevronDown
            size={15}
            className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
        <a
          href={project.links.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-accent"
        >
          <Github size={15} />
          Repo
          <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <div className="border-t border-border py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Selected Work"
          title="More Projects"
          description="A range across applied AI, research engineering, and software engineering — each built as a complete, documented system rather than a script."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  )
}
