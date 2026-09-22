import type { Project } from './types'

export const flagshipProject: Project = {
  slug: 'opspilot',
  name: 'OpsPilot',
  oneLiner:
    'An AI SRE agent that investigates production incidents end to end — and cannot act without a human’s approval.',
  category: 'Applied AI',
  secondaryCategories: ['Full-Stack Engineering', 'Software Engineering', 'Research Engineering'],
  problem:
    'When a production incident fires, an engineer has to manually correlate logs, metrics, traces, deployment history, and runbooks under time pressure before they can even form a root-cause hypothesis.',
  approach:
    'OpsPilot runs a LangGraph investigation graph that pulls evidence from Prometheus metrics, structured logs, OpenTelemetry traces, GitHub deployment history, and a hybrid pgvector + full-text runbook retriever, fusing results with reciprocal-rank fusion. It returns a ranked root-cause hypothesis with cited evidence and a proposed remediation — but every action stops at a server-side human-approval boundary before anything executes.',
  highlights: [
    'Three containerized FastAPI microservices (catalog, payment, checkout) with built-in fault injection for reproducible incident testing',
    'Hybrid retrieval: pgvector cosine similarity fused with PostgreSQL full-text search via reciprocal-rank fusion',
    'Durable LangGraph orchestration with PostgreSQL-backed checkpointing and retrying tool calls',
    'Human-approval boundary enforced in a separate API route against persisted state — the model cannot set approval itself',
    'Complete audit trail of tool calls, retries, model decisions, and approvals',
    '30-incident reproducible evaluation harness scoring root-cause accuracy, tool-call correctness, and unsafe-action rate against a no-tools baseline',
    'Next.js evaluation dashboard, GitHub Actions CI/CD, Kubernetes manifests, and Terraform for AWS EKS / ECR / RDS',
    'MCP server exposing the same investigation tools for use by other agents',
  ],
  stack: [
    'Python',
    'FastAPI',
    'LangGraph',
    'PostgreSQL',
    'pgvector',
    'Next.js',
    'Docker',
    'Kubernetes',
    'Terraform',
    'AWS',
    'Prometheus',
    'OpenTelemetry',
    'GitHub Actions',
  ],
  links: {
    github: 'https://github.com/AbhilashSomigari/opspilot',
  },
  architecture: [
    { label: 'Alert / Engineer', detail: 'Incident symptoms only — no root cause leaked' },
    { label: 'FastAPI Agent API', detail: 'Incident, approval, and audit endpoints' },
    {
      label: 'LangGraph Investigation',
      detail: 'Tool calls: metrics, logs, traces, deployments, hybrid RAG',
    },
    { label: 'Ranked Root Cause + Evidence', detail: 'Citations required, insufficiency stated explicitly' },
    { label: 'Human Approval', detail: 'Separate, server-enforced authorization path' },
    { label: 'Constrained Executor + Audit Trail', detail: 'Action only after explicit approval' },
  ],
  flagship: true,
}

export const projects: Project[] = [
  {
    slug: 'multi-agent-debate-rag',
    name: 'Multi-Agent Debate RAG',
    oneLiner:
      'A RAG pipeline where two independently retrieving agents argue over the evidence before a judge synthesizes a cited answer.',
    category: 'Applied AI',
    problem:
      'Single-pass RAG systems generate confident answers even when the retrieved context does not actually support them.',
    approach:
      'Two agents retrieve with different strategies — one narrow and technical, one broad and counterpoint-seeking — then draft grounded answers, cross-examine each other’s citations, and revise. A judge agent synthesizes a final answer from both revised drafts, and a citation checker flags any uncited factual sentence and triggers a rewrite.',
    highlights: [
      'Dual retrieval strategies over a persistent Chroma vector store',
      'Cross-examination step where each agent checks the other’s claims against its cited chunks',
      'Judge-synthesis step that explicitly resolves contradictions between two independent drafts',
      'Runs entirely locally through Ollama — no API keys required',
    ],
    stack: ['Python', 'LangGraph', 'Ollama', 'Chroma', 'RAG'],
    links: { github: 'https://github.com/AbhilashSomigari/multi_agent-debate-rag' },
    architecture: [
      { label: 'Question' },
      { label: 'Agent A: Narrow Retrieval', detail: 'Top-6 chunks, technical tone' },
      { label: 'Agent B: Broad Retrieval', detail: 'Top-14 chunks, rewritten for counterpoints' },
      { label: 'Cross-Examination', detail: 'Each agent critiques the other’s citations' },
      { label: 'Judge Synthesis', detail: 'Resolves contradictions across both drafts' },
      { label: 'Citation Verification', detail: 'Uncited claims trigger a rewrite pass' },
    ],
    license: 'MIT',
  },
  {
    slug: 'yolov5-satellite-image-detector',
    name: 'Explainable Satellite Object Detection',
    oneLiner:
      'Does the detector’s saliency actually land on the object it claims to detect? An XAI pipeline built to measure it.',
    category: 'Research Engineering',
    secondaryCategories: ['Applied AI'],
    problem:
      'Object detectors on aerial and satellite imagery can be confidently right for the wrong reasons — high confidence does not guarantee the model is looking at the correct pixels.',
    approach:
      'A YOLOv5 fork trained on hand-labeled satellite imagery is paired with a custom explainability pipeline — Grad-CAM, EigenCAM, and Integrated Gradients attribution maps — and a quantitative localization-faithfulness metric that scores how well each method’s heatmap aligns with the ground-truth box.',
    highlights: [
      'Custom Q-metric: a localization-curve AUC computed across K ∈ {1, 5, 10, 50, 100} per image',
      'Grad-CAM, EigenCAM, and Integrated Gradients implemented as interchangeable attribution backends',
      'Streamlit and Gradio apps for interactive detection + explanation exploration',
      'Reproducible pipeline separating tracked raw data from gitignored generated artifacts',
    ],
    stack: ['Python', 'PyTorch', 'YOLOv5', 'OpenCV', 'Grad-CAM / EigenCAM', 'Captum', 'Streamlit'],
    links: { github: 'https://github.com/AbhilashSomigari/yolov5-satellite-image-detector' },
    architecture: [
      { label: 'Satellite Imagery Dataset', detail: 'Hand-labeled, multi-class' },
      { label: 'YOLOv5 Detector', detail: 'Trained / fine-tuned on the dataset' },
      { label: 'Attribution Pipeline', detail: 'Grad-CAM, EigenCAM, Integrated Gradients' },
      { label: 'Q-Metric Scoring', detail: 'Localization-curve AUC vs. ground truth' },
      { label: 'Interactive Inspection', detail: 'Streamlit / Gradio apps' },
    ],
    license: 'Fork of Ultralytics YOLOv5 (AGPL-3.0)',
  },
  {
    slug: 'spatiotemporal-cloud-forecasting',
    name: 'Spatiotemporal Cloud Forecasting',
    oneLiner:
      'Predicting the next frame of cloud movement from satellite imagery — and testing whether a ConvLSTM actually beats a naive baseline.',
    category: 'Research Engineering',
    problem:
      'Forecasting short-term cloud movement from satellite imagery requires comparing genuinely different modeling approaches against a rigorous baseline, not training one model and assuming it works.',
    approach:
      'GOES satellite frames are cropped, clipped to a fixed brightness-temperature range, and normalized into a chronological train/val/test split. A persistence baseline, a channel-stacked CNN, and a recurrent ConvLSTM are trained and evaluated under identical conditions.',
    highlights: [
      'Chronological (not random) train/val/test splitting to avoid temporal leakage',
      'Three comparable model tiers: persistence baseline, CNN, and ConvLSTM',
      'Unit tests over synthetic tensors so the suite runs without any raw satellite data',
      'Continuous integration via GitHub Actions on every push',
    ],
    stack: ['Python', 'PyTorch', 'NumPy', 'GOES Satellite Data', 'pytest', 'GitHub Actions'],
    links: { github: 'https://github.com/AbhilashSomigari/spatiotemporal-cloud-forecasting' },
    architecture: [
      { label: 'Raw GOES .nc Frames' },
      { label: 'Extraction & Normalization', detail: 'Crop, clip to fixed Kelvin range, scale to [0,1]' },
      { label: 'Chronological Split', detail: '70 / 15 / 15 train / val / test' },
      { label: 'Persistence / CNN / ConvLSTM', detail: 'Trained under identical conditions' },
      { label: 'Evaluation', detail: 'MAE comparison across all three tiers' },
    ],
    license: 'MIT',
  },
  {
    slug: 'fras',
    name: 'Face Recognition Attendance System',
    oneLiner:
      'A complete, solo-engineered attendance pipeline: webcam registration, live recognition, and automated PDF reporting.',
    category: 'Software Engineering',
    secondaryCategories: ['Applied AI'],
    problem:
      'Manual attendance tracking is repetitive and error-prone; automating it requires enrollment, recognition, duplicate-prevention, and reporting to work together as one reliable system rather than a one-off script.',
    approach:
      'Students enroll through webcam capture, a live recognition loop matches faces with a 75-minute cooldown to prevent duplicate entries, and a reporting module compiles the CSV attendance log into a formatted PDF for administrators.',
    highlights: [
      'End-to-end pipeline: enrollment → recognition → CSV logging → PDF reporting',
      'Cooldown logic that prevents duplicate attendance entries within a session',
      'Structured, per-student dataset organization for the recognition model',
      'Clean CLI menu separating registration, live recognition, and reporting concerns',
    ],
    stack: ['Python', 'OpenCV', 'face_recognition', 'dlib'],
    links: { github: 'https://github.com/AbhilashSomigari/FRAS' },
    architecture: [
      { label: 'Webcam Enrollment', detail: 'Up to 10 images per student' },
      { label: 'Live Recognition Loop', detail: '75-minute per-student cooldown' },
      { label: 'Attendance Log (CSV)' },
      { label: 'PDF Report Generation', detail: 'Summarized by date' },
    ],
    license: 'MIT',
  },
  {
    slug: 'blueprint-tic-tac-toe',
    name: 'Blueprint Minimax Tic-Tac-Toe',
    oneLiner:
      'A tic-tac-toe game whose “AI Thinking” panel is generated from the exact Minimax search the computer used — nothing on screen is faked.',
    category: 'Software Engineering',
    problem:
      'Most simple game AIs are black boxes — the interesting engineering problem isn’t beating the player, it’s making the search itself inspectable.',
    approach:
      'Every computer move runs a full Minimax search regardless of difficulty. The UI renders that same search as board annotations, a decision-report panel (score, depth, nodes searched, ranked candidates), and a collapsible SVG game-tree schematic — all sourced from one analysis call per turn.',
    highlights: [
      'Single dependency-free HTML file — no build step, no framework',
      'Full keyboard play, aria-live status updates, and prefers-reduced-motion support throughout',
      'Undo backed by a real snapshot stack rather than manual state reversal',
      'Defensive localStorage handling that degrades to sane defaults if storage is unavailable',
    ],
    stack: ['Vanilla JavaScript', 'SVG', 'Web Animations API'],
    links: { github: 'https://github.com/AbhilashSomigari/tic-tac-toe' },
    architecture: [
      { label: 'Player Move' },
      { label: 'Minimax Search', detail: 'Full search run every turn, all difficulties' },
      { label: 'Difficulty-Aware Selection', detail: 'Easy / Medium / Unbeatable' },
      { label: 'Decision Report + Search Schematic', detail: 'Rendered from the same analysis object' },
    ],
  },
]

export const allProjects: Project[] = [flagshipProject, ...projects]
