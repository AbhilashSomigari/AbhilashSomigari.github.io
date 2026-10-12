import { useEffect, useId, useState } from 'react'
import { ChevronDown, Link2 } from 'lucide-react'
import { Tag } from '../ui/Tag'
import { ArchitectureFlow } from '../ui/ArchitectureFlow'
import { ProjectLinks } from './ProjectLinks'
import { RepoMeta } from './RepoMeta'
import { Results } from './Results'
import { getRepo } from '../../data/github'
import type { Project } from '../../data/types'
import { projectAnchor } from './anchor'

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-text-secondary">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function Label({ children }: { children: string }) {
  return (
    <h4 className="font-mono text-[11px] uppercase tracking-wider text-text-tertiary">{children}</h4>
  )
}

/** Opens when the URL hash targets this project (shareable links). */
function useHashExpand(anchor: string, setExpanded: (value: boolean) => void) {
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === `#${anchor}`) setExpanded(true)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [anchor, setExpanded])
}

function AnchorLink({ anchor, name }: { anchor: string; name: string }) {
  return (
    <a
      href={`#${anchor}`}
      className="text-text-tertiary opacity-0 transition-opacity group-hover/title:opacity-100 focus-visible:opacity-100"
      aria-label={`Link to ${name}`}
    >
      <Link2 size={15} aria-hidden="true" />
    </a>
  )
}

export function FlagshipCard({ project }: { project: Project }) {
  const anchor = projectAnchor(project.slug)
  const repo = getRepo(project.repo)

  return (
    <article id={anchor} aria-labelledby={`${anchor}-title`} className="card scroll-mt-24 rounded-2xl border border-border bg-bg-card p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone="accent">Flagship</Tag>
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className="group/title mt-4 flex items-center gap-2">
        <h3 id={`${anchor}-title`} className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
          {project.name}
        </h3>
        <AnchorLink anchor={anchor} name={project.name} />
      </div>
      <p className="mt-2 max-w-3xl text-lg leading-relaxed text-text-secondary">{project.oneLiner}</p>
      <div className="mt-3">
        <RepoMeta repo={repo} />
      </div>

      {project.results && (
        <div className="mt-7">
          <Results results={project.results} />
          {project.resultsNote && (
            <p className="mt-3 text-xs leading-relaxed text-text-tertiary">{project.resultsNote}</p>
          )}
        </div>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <Label>Problem</Label>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{project.problem}</p>
          </div>
          <div>
            <Label>Approach</Label>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{project.approach}</p>
          </div>
          <div>
            <Label>Engineering highlights</Label>
            <div className="mt-2">
              <Bullets items={project.highlights} />
            </div>
          </div>
        </div>
        <div>
          <Label>Architecture</Label>
          <div className="mt-5">
            <ArchitectureFlow steps={project.architecture} />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
        {project.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
      <div className="mt-5">
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)
  const anchor = projectAnchor(project.slug)
  const detailsId = useId()
  const repo = getRepo(project.repo)
  useHashExpand(anchor, setExpanded)

  return (
    <article
      id={anchor}
      aria-labelledby={`${anchor}-title`}
      className="card flex h-full scroll-mt-24 flex-col rounded-xl border border-border bg-bg-card p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong"
    >
      <div className="flex flex-wrap items-center gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className="group/title mt-4 flex items-center gap-2">
        <h3 id={`${anchor}-title`} className="text-lg font-semibold text-text">
          {project.name}
        </h3>
        <AnchorLink anchor={anchor} name={project.name} />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{project.oneLiner}</p>
      <div className="mt-3">
        <RepoMeta repo={repo} />
      </div>

      {project.results && (
        <div className="mt-5">
          <Results results={project.results} compact />
        </div>
      )}

      <div className="mt-5">
        <Bullets items={project.highlights.slice(0, 2)} />
      </div>

      <div id={detailsId} hidden={!expanded} className="mt-5 space-y-5 border-t border-border pt-5">
        <div>
          <Label>Problem</Label>
          <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{project.problem}</p>
        </div>
        <div>
          <Label>Approach</Label>
          <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{project.approach}</p>
        </div>
        {project.highlights.length > 2 && (
          <div>
            <Label>More highlights</Label>
            <div className="mt-2">
              <Bullets items={project.highlights.slice(2)} />
            </div>
          </div>
        )}
        <div>
          <Label>Architecture</Label>
          <div className="mt-4">
            <ArchitectureFlow steps={project.architecture} />
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>

      <div className="grow" aria-hidden="true" />
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <ProjectLinks project={project} />
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
          aria-controls={detailsId}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text"
        >
          {expanded ? 'Less' : 'Case study'}
          <span className="sr-only"> for {project.name}</span>
          <ChevronDown
            size={15}
            aria-hidden="true"
            className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </article>
  )
}
