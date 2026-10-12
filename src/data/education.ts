import type { EducationEntry, Certification } from './types'

// Source: public/resume.pdf
export const education: EducationEntry[] = [
  {
    degree: 'M.S. in Computer Science',
    institution: 'West Virginia University',
    location: 'Morgantown, WV',
    start: 'Jan 2025',
    end: 'Dec 2026 (Expected)',
    gpa: '3.87 / 4.00',
    coursework: ['Agentic AI', 'Deep Learning', 'Pattern Recognition', 'Big Data'],
  },
  {
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'Jawaharlal Nehru Technological University Hyderabad',
    location: 'Hyderabad, India',
    start: 'Nov 2020',
    end: 'Jun 2024',
  },
]

// Only certifications listed on the résumé. Add a date when one is known.
export const certifications: Certification[] = [
  {
    name: 'Oracle Agentic AI Certified Foundations Associate',
    issuer: 'Oracle',
  },
  {
    name: 'RAG and Agentic AI Professional Certificate',
    issuer: 'IBM',
    date: 'Sep 2025',
  },
]
