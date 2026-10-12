import { ArrowUpRight, Github, Globe, Package } from 'lucide-react'
import { ExternalLink } from '../ui/ExternalLink'
import { linkSubtle } from '../ui/Button'
import { demoUrl, getRepo, repoUrl } from '../../data/github'
import type { Project } from '../../data/types'

export function ProjectLinks({ project }: { project: Project }) {
  const demo = project.demo ?? demoUrl(getRepo(project.repo))
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <ExternalLink href={repoUrl(project.repo)} className={linkSubtle}>
        <Github size={15} aria-hidden="true" />
        Source<span className="sr-only"> code for {project.name}</span>
        <ArrowUpRight size={13} aria-hidden="true" />
      </ExternalLink>
      {demo && (
        <ExternalLink href={demo} className={linkSubtle}>
          <Globe size={15} aria-hidden="true" />
          Live demo<span className="sr-only"> of {project.name}</span>
          <ArrowUpRight size={13} aria-hidden="true" />
        </ExternalLink>
      )}
      {project.extraLink && (
        <ExternalLink href={project.extraLink.href} className={linkSubtle}>
          <Package size={15} aria-hidden="true" />
          {project.extraLink.label}
          <ArrowUpRight size={13} aria-hidden="true" />
        </ExternalLink>
      )}
    </div>
  )
}
