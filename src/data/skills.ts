import type { SkillGroup } from './types'

export const skills: SkillGroup[] = [
  {
    category: 'Languages',
    skills: ['Python', 'Java', 'C / C++', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    category: 'Frontend Engineering',
    skills: [
      'React',
      'Next.js',
      'HTML / CSS',
      'Tailwind CSS',
      'Responsive Design',
      'Component Architecture',
    ],
  },
  {
    category: 'Backend & APIs',
    skills: ['FastAPI', 'Flask', 'Django', 'REST API Design'],
  },
  {
    category: 'Databases & Data',
    skills: [
      'PostgreSQL',
      'pgvector',
      'SQLite',
      'Vector Retrieval (Chroma)',
      'Data Pipeline Design',
    ],
  },
  {
    category: 'AI / Machine Learning',
    skills: [
      'PyTorch',
      'TensorFlow',
      'scikit-learn',
      'Computer Vision',
      'Object Detection (YOLOv5)',
      'Explainable AI (Grad-CAM, EigenCAM, Integrated Gradients)',
      'Model Evaluation',
    ],
  },
  {
    category: 'Generative AI / Agents',
    skills: [
      'LangGraph',
      'LangChain',
      'CrewAI',
      'Agno',
      'Retrieval-Augmented Generation',
      'Tool-Calling & MCP Servers',
      'Agent Evaluation',
    ],
  },
  {
    category: 'Infrastructure & Developer Tools',
    skills: [
      'Docker',
      'Kubernetes',
      'Terraform',
      'AWS (EKS, ECR, RDS)',
      'Git / GitHub',
      'GitHub Actions (CI/CD)',
      'Linux',
    ],
  },
  {
    category: 'Research Engineering',
    skills: [
      'Experiment Design & Reproducibility',
      'Baseline-Driven Model Comparison',
      'Quantitative Evaluation Metrics',
      'Applied Medical Computer Vision (SAM3)',
    ],
  },
]
