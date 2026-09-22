export type FocusCategory =
  | 'Software Engineering'
  | 'Full-Stack Engineering'
  | 'Applied AI'
  | 'Research Engineering'
  | 'Open-Source Collaboration'

export interface FocusArea {
  category: FocusCategory
  summary: string
  items: string[]
}

export interface ExperienceEntry {
  role: string
  organization: string
  context: string
  start: string
  end: string
  bullets: string[]
  tech: string[]
}

export interface ProjectLink {
  github: string
  demo?: string
  docs?: string
}

export interface ArchitectureStep {
  label: string
  detail?: string
}

export interface Project {
  slug: string
  name: string
  oneLiner: string
  category: FocusCategory
  secondaryCategories?: FocusCategory[]
  problem: string
  approach: string
  highlights: string[]
  stack: string[]
  links: ProjectLink
  architecture: ArchitectureStep[]
  license?: string
  flagship?: boolean
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
  date: string
}
