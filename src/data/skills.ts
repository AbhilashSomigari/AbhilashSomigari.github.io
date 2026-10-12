import type { SkillGroup } from './types'

// Source: public/resume.pdf skills section, cross-checked against the repos.
// Ordered so the most role-relevant groups come first.
export const skills: SkillGroup[] = [
  {
    category: 'Generative AI & Agents',
    skills: [
      'LangGraph',
      'LangChain',
      'RAG',
      'MCP',
      'OpenAI & Anthropic APIs',
      'Ollama',
      'LLM Evaluation',
    ],
  },
  {
    category: 'Machine Learning',
    skills: [
      'PyTorch',
      'TensorFlow',
      'scikit-learn',
      'Computer Vision',
      'NLP',
      'OpenCV',
      'YOLOv5',
      'SAM',
    ],
  },
  {
    category: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C / C++', 'SQL'],
  },
  {
    category: 'Backend & Data',
    skills: ['FastAPI', 'Flask', 'Django', 'REST APIs', 'PostgreSQL', 'pgvector', 'Chroma', 'Pandas'],
  },
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    category: 'Cloud & DevOps',
    skills: [
      'Docker',
      'Kubernetes',
      'Terraform',
      'AWS (EKS, ECR, RDS)',
      'Azure',
      'GCP',
      'GitHub Actions',
      'OpenTelemetry',
      'Linux',
    ],
  },
]
