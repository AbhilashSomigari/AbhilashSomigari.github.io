export type ProjectTag = 'Agentic AI' | 'AI/ML' | 'Backend' | 'Full Stack' | 'Frontend' | 'Research'

export const PROJECT_TAGS: ProjectTag[] = ['Agentic AI', 'AI/ML', 'Backend', 'Full Stack', 'Frontend', 'Research']

export interface FocusArea {
  title: string
  summary: string
}

export interface ExperienceEntry {
  role: string
  organization: string
  location: string
  start: string
  end: string
  bullets: string[]
  tech: string[]
}

export interface ArchitectureStep {
  label: string
  detail?: string
}

/** A measured outcome, quoted from the repo README or the résumé. */
export interface ProjectResult {
  value: string
  label: string
}

/**
 * Hand-curated project copy. Anything that GitHub knows better (stars,
 * language, topics, last push, archived state, live-demo URL) is read from
 * the synced snapshot via `repo` instead of being typed here.
 */
export interface Project {
  slug: string
  /** GitHub repository name; joins this entry to the synced metadata. */
  repo: string
  name: string
  oneLiner: string
  tags: ProjectTag[]
  problem: string
  approach: string
  highlights: string[]
  results?: ProjectResult[]
  /** Results context, e.g. how and when the numbers were measured. */
  resultsNote?: string
  stack: string[]
  architecture: ArchitectureStep[]
  /** Overrides the GitHub homepage / Pages URL if set. */
  demo?: string
  /** Extra link, e.g. a package registry page. */
  extraLink?: { label: string; href: string }
}

export interface ResearchTheme {
  title: string
  description: string
  tags: string[]
  linkedProjectSlug?: string
}

export interface SkillGroup {
  category: string
  skills: string[]
}

export interface EducationEntry {
  degree: string
  institution: string
  location: string
  start: string
  end: string
  gpa?: string
  coursework?: string[]
}

export interface Certification {
  name: string
  issuer: string
  date?: string
}
