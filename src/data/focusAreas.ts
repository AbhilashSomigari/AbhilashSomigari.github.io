import type { FocusArea } from './types'

export const focusAreas: FocusArea[] = [
  {
    category: 'Software Engineering',
    summary:
      'Designing systems and services that stay maintainable after the first demo.',
    items: [
      'Application & service architecture',
      'REST API design',
      'Automated testing (pytest, CI)',
      'Containerized deployment (Docker, Kubernetes)',
      'Documentation-first repositories',
    ],
  },
  {
    category: 'Full-Stack Engineering',
    summary:
      'Shipping the interface, the API layer, and the data underneath it as one system.',
    items: [
      'React interfaces',
      'Python & JavaScript services',
      'PostgreSQL & vector databases',
      'FastAPI / Flask backends',
      'Cloud deployment (AWS, Terraform)',
    ],
  },
  {
    category: 'Applied AI',
    summary:
      'Turning language models and vision models into tools with evidence, guardrails, and evaluation.',
    items: [
      'Agent orchestration (LangGraph)',
      'Retrieval-augmented generation',
      'Tool-calling & MCP servers',
      'Computer vision & object detection',
      'Model evaluation frameworks',
    ],
  },
  {
    category: 'Research Engineering',
    summary:
      'Treating experiments like software: reproducible, tested, and measured against a baseline.',
    items: [
      'Explainable AI (Grad-CAM, EigenCAM, Integrated Gradients)',
      'Quantitative evaluation metrics',
      'Baseline-driven model comparison',
      'Applied medical computer vision',
      'Reproducible pipelines',
    ],
  },
  {
    category: 'Open-Source Collaboration',
    summary:
      'Publishing work that a stranger could clone, run, and understand from the README alone.',
    items: [
      'MIT-licensed public repositories',
      'CI on every push',
      'Crediting upstream projects',
      'Reproducible, gitignore-disciplined data pipelines',
      'Written for reuse, not just for grading',
    ],
  },
]
