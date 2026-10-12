import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { ExternalLink } from './ui/ExternalLink'
import { linkSubtle } from './ui/Button'
import { FlagshipCard, ProjectCard } from './projects/ProjectCard'
import { projectAnchor } from './projects/anchor'
import { flagshipProject, otherProjects, projects } from '../data/projects'
import { formatMonth, uncuratedRepos } from '../data/github'
import { links } from '../data/links'
import { PROJECT_TAGS, type ProjectTag } from '../data/types'

type Filter = ProjectTag | 'All'

const FILTERS: Filter[] = [
  'All',
  ...PROJECT_TAGS.filter((tag) => otherProjects.some((p) => p.tags.includes(tag))),
]

function MoreOnGitHub() {
  const repos = uncuratedRepos(projects.map((p) => p.repo))

  return (
    <div className="mt-16">
      <h3 className="text-lg font-semibold text-text">More on GitHub</h3>
      <p className="mt-1 text-sm text-text-secondary">
        {repos.length > 0
          ? 'Other public repositories, synced from GitHub automatically.'
          : 'Every public repository is featured above. New ones appear here automatically.'}
      </p>
      {repos.length > 0 && (
        <ul className="card mt-5 divide-y divide-border rounded-xl border border-border bg-bg-card">
          {repos.map((repo) => (
            <li key={repo.name}>
              <ExternalLink
                href={repo.url}
                className="group flex items-start justify-between gap-4 p-4 transition-colors hover:bg-bg-elevated sm:p-5"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-sm font-medium text-text group-hover:text-accent">
                    {repo.name}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-text-secondary">
                    {repo.description ?? repo.readmeSummary ?? 'No description yet.'}
                  </span>
                  <span className="mt-2 block font-mono text-[11px] text-text-tertiary">
                    {[repo.language, repo.archived && 'Archived', `Updated ${formatMonth(repo.pushedAt)}`]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                </span>
                <ArrowUpRight size={16} aria-hidden="true" className="mt-1 shrink-0 text-text-tertiary group-hover:text-accent" />
              </ExternalLink>
            </li>
          ))}
        </ul>
      )}
      <ExternalLink href={`${links.github}?tab=repositories`} className={`${linkSubtle} mt-5`}>
        <Github size={16} aria-hidden="true" />
        All repositories on GitHub
        <ArrowUpRight size={13} aria-hidden="true" />
      </ExternalLink>
    </div>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All')

  const visible = useMemo(
    () => (filter === 'All' ? otherProjects : otherProjects.filter((p) => p.tags.includes(filter))),
    [filter],
  )

  // A shared #project-… link must never point at a card the filter hid.
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash
      if (hash.startsWith('#project-') && !visible.some((p) => `#${projectAnchor(p.slug)}` === hash)) {
        setFilter('All')
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [visible])

  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-20 border-t border-border py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="projects-heading"
          eyebrow="Selected Work"
          title="Projects"
          description="Problem, approach, and measured results for each project. Numbers come from the project READMEs and my résumé. Repository details stay in sync with GitHub."
        />

        <Reveal className="mt-10">
          <FlagshipCard project={flagshipProject} />
        </Reveal>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-text">More projects</h3>
          <div role="group" aria-label="Filter projects by area" className="flex flex-wrap gap-2">
            {FILTERS.map((option) => {
              const selected = filter === option
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(option)}
                  className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
                    selected
                      ? 'border-accent bg-accent-soft text-accent'
                      : 'border-border text-text-secondary hover:border-border-strong hover:text-text'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          {filter === 'All' ? '' : ` tagged ${filter}`}
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {visible.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 0.06} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <MoreOnGitHub />
      </Container>
    </section>
  )
}
