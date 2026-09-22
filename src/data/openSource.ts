export interface PublicRepo {
  name: string
  description: string
  language: string
  license?: string
  url: string
}

export const openSourcePrinciples: string[] = [
  'MIT-licensed by default, so the work is reusable without asking',
  'Continuous integration on every push, not just a passing test on one machine',
  'Generated artifacts (checkpoints, datasets, caches) gitignored — only reproducible inputs and code are tracked',
  'Forked or dependent projects (YOLOv5, pytorch-grad-cam, Captum, LangGraph, Ollama) credited explicitly in the README',
]

export const publicRepos: PublicRepo[] = [
  {
    name: 'opspilot',
    description: 'AI incident-response agent with observability, hybrid RAG, and human-approval controls.',
    language: 'Python',
    url: 'https://github.com/AbhilashSomigari/opspilot',
  },
  {
    name: 'multi_agent-debate-rag',
    description: 'Debate-style, citation-verified RAG pipeline running entirely on local models.',
    language: 'Python',
    license: 'MIT',
    url: 'https://github.com/AbhilashSomigari/multi_agent-debate-rag',
  },
  {
    name: 'yolov5-satellite-image-detector',
    description: 'YOLOv5 fork with a Grad-CAM / EigenCAM / Integrated Gradients explainability pipeline.',
    language: 'Python',
    license: 'Fork of AGPL-3.0',
    url: 'https://github.com/AbhilashSomigari/yolov5-satellite-image-detector',
  },
  {
    name: 'spatiotemporal-cloud-forecasting',
    description: 'CNN / ConvLSTM cloud-movement forecasting benchmarked against a persistence baseline.',
    language: 'Python',
    license: 'MIT',
    url: 'https://github.com/AbhilashSomigari/spatiotemporal-cloud-forecasting',
  },
  {
    name: 'FRAS',
    description: 'Facial recognition classroom attendance system with PDF reporting.',
    language: 'Python',
    license: 'MIT',
    url: 'https://github.com/AbhilashSomigari/FRAS',
  },
  {
    name: 'tic-tac-toe',
    description: 'Dependency-free, fully transparent Minimax tic-tac-toe with a live search visualization.',
    language: 'JavaScript',
    url: 'https://github.com/AbhilashSomigari/tic-tac-toe',
  },
]
