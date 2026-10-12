import type { Project } from './types'

// Hand-curated project copy. Array order is display order; the first entry
// is the flagship. Live metadata (stars, language, last push, archived,
// demo URL) comes from the GitHub sync — see src/data/github.ts.
//
// Every claim here is sourced from the repo README or public/resume.pdf.

export const projects: Project[] = [
  {
    slug: 'opspilot',
    repo: 'opspilot',
    name: 'OpsPilot',
    oneLiner:
      'An AI SRE agent that investigates production incidents end to end and cannot act without a human’s approval.',
    tags: ['Agentic AI', 'Backend', 'Full Stack', 'Research'],
    problem:
      'During an incident, an engineer has to correlate logs, metrics, traces, deployment history, and runbooks under time pressure before they can even form a root-cause hypothesis.',
    approach:
      'A LangGraph investigation graph gathers evidence with five tools (Prometheus metrics, structured logs, OpenTelemetry traces, deployment history, and hybrid pgvector + full-text runbook search) and returns a ranked root cause with cited evidence and a proposed remediation. Every action stops at a server-enforced human-approval gate.',
    results: [
      { value: '93%', label: 'root-cause top-1 accuracy, vs. 30% for an alert-only LLM baseline' },
      { value: '0', label: 'unsafe actions across 90 investigations' },
      { value: '$0.03', label: 'model cost per investigated incident' },
    ],
    resultsNote:
      'Mean of 3 full runs over a 30-incident, 3-microservice hidden-fault benchmark (gpt-5-mini). Synthetic environment; methodology and misses are documented in the README.',
    highlights: [
      'Found and fixed 4 flaws in its own eval harness (leaked fault telemetry, cross-case contamination, keyword scoring) before trusting the numbers',
      'Approval gate secured with role-separated bearer tokens and an atomic Postgres compare-and-set, so concurrent approvals execute at most once',
      'Hybrid retrieval: pgvector cosine similarity fused with PostgreSQL full-text search via reciprocal-rank fusion',
      'Durable LangGraph orchestration with Postgres checkpointing, retrying tool calls, and a full audit trail',
      'Three fault-injectable FastAPI microservices with real Prometheus, OpenTelemetry, and Jaeger telemetry',
      'Same tools exposed through an MCP server; Next.js evaluation dashboard; Kubernetes manifests and Terraform (validated, not yet deployed to AWS)',
    ],
    stack: [
      'Python',
      'LangGraph',
      'FastAPI',
      'PostgreSQL',
      'pgvector',
      'OpenTelemetry',
      'Prometheus',
      'MCP',
      'Next.js',
      'Docker',
      'Kubernetes',
      'Terraform',
    ],
    architecture: [
      { label: 'Alert / Engineer', detail: 'Symptoms only; the root cause is never leaked' },
      { label: 'FastAPI Agent API', detail: 'Incident, approval, and audit endpoints' },
      { label: 'LangGraph Investigation', detail: 'Metrics, logs, traces, deployments, hybrid RAG' },
      { label: 'Ranked Root Cause + Evidence', detail: 'Citations required; insufficiency stated explicitly' },
      { label: 'Human Approval', detail: 'Separate, server-enforced authorization path' },
      { label: 'Constrained Executor + Audit Trail', detail: 'Action only after explicit approval' },
    ],
  },
  {
    slug: 'evalforge',
    repo: 'evalforge',
    name: 'EvalForge',
    oneLiner:
      'CI/CD evaluation for tool-using AI agents: run scenarios, grade the full trajectory, and block a merge when quality regresses.',
    tags: ['Agentic AI', 'AI/ML', 'Backend'],
    problem:
      'Agents are non-deterministic, make several model calls, and use tools, so unit tests on the final string can’t tell you whether a prompt, model, or tool-schema change made things worse.',
    approach:
      'A framework-agnostic harness that runs YAML scenario suites against any agent (over stdin/stdout or HTTP), records the full trajectory, grades it, and enforces absolute and regression gates against a per-branch baseline. It exits non-zero so CI blocks the change.',
    results: [
      { value: '11', label: 'grader types, from tool-sequence checks to LLM-as-judge' },
      { value: '104', label: 'unit and Postgres integration tests' },
      { value: '4.7×', label: 'cost gap found benchmarking GPT-4o vs. Claude (24 trials each)' },
    ],
    highlights: [
      'Published to PyPI as evalforge-agents, released through hash-pinned builds and OIDC trusted publishing',
      'Graders for tool sequence and arguments, RAG citation groundedness, hallucination guards, LLM-as-judge, and imported human scores',
      'Per-task comparison surfaced a refund-handling gap between two models that aggregate scores missed',
      'FastAPI run service with constant-time API-key auth and Postgres-backed rate limits shared across replicas',
      'Re-grade a recorded run without calling the agent; A/B two agents on one suite',
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'YAML', 'GitHub Actions', 'PyPI', 'Docker'],
    architecture: [
      { label: 'YAML Suite', detail: 'Tasks, trials, graders, gates' },
      { label: 'Eval Runner', detail: 'Concurrent trials, opt-in retries' },
      { label: 'Agent Adapter or Recorded Replay', detail: 'Command / HTTP, or no model call' },
      { label: 'Graders', detail: 'Code, tool, RAG, LLM-judge, human' },
      { label: 'Regression Gates', detail: 'Baseline per branch → PASS / BLOCK' },
    ],
    extraLink: { label: 'PyPI', href: 'https://pypi.org/project/evalforge-agents/' },
  },
  {
    slug: 'prospectpilot',
    repo: 'prospectpilot',
    name: 'ProspectPilot',
    oneLiner:
      'A self-improving multi-agent SDR pipeline whose prompt optimizer only ships changes that pass statistical and regression gates.',
    tags: ['Agentic AI', 'AI/ML', 'Backend', 'Research'],
    problem:
      'Self-improving agents can “improve” on noise: picking the best of several prompt variants on a small eval almost always looks like a gain, even when nothing changed.',
    approach:
      'A LangGraph pipeline (prospect → enrich → verify → write → critique) where every personalized claim must cite a stored, source-linked fact. A nightly loop clusters eval failures into a learnings memory, proposes candidate prompts, and evaluates them on identical seeds through EvalForge.',
    results: [
      { value: '960', label: 'seeded eval trials (3 rounds × 4 variants × 80) on a local 7B model' },
      { value: '8 / 9', label: 'leads verified at confidence ≥ 0.7, without SMTP probing' },
      { value: '0 / 3', label: 'promoted prompts survived paired-bootstrap testing; the null result is published' },
    ],
    highlights: [
      'Added a paired-bootstrap significance gate that would have rejected all three earlier promotions, and published that finding',
      'Critic combines deterministic grounding checks with an LLM rubric; failures trigger at most two rewrites',
      'Postgres + pgvector for prospect facts, learnings memory, and a versioned prompt registry',
      'OpenTelemetry traces per campaign, Prometheus metrics, and Grafana dashboards',
      'Guardrails: robots.txt and rate limits on fetches, sandbox-only email sending, simulated replies always labeled',
    ],
    stack: ['Python', 'LangGraph', 'FastAPI', 'PostgreSQL', 'pgvector', 'OpenTelemetry', 'Ollama', 'Terraform'],
    architecture: [
      { label: 'Ideal Customer Profile' },
      { label: 'Prospector → Enricher → Verifier', detail: 'Public sources only; facts stored with source URLs' },
      { label: 'Writer ⇄ Critic', detail: 'Every personalized claim must cite a stored fact' },
      { label: 'Nightly EvalForge Suite', detail: 'Failure clustering into a learnings memory' },
      { label: 'Gated Promotion', detail: 'Gain CI must exclude 0, plus cost and grounding gates' },
    ],
  },
  {
    slug: 'multi-agent-debate-rag',
    repo: 'multi_agent-debate-rag',
    name: 'Multi-Agent Debate RAG',
    oneLiner:
      'Two independently retrieving agents argue over the evidence before a judge synthesizes a cited answer.',
    tags: ['Agentic AI', 'AI/ML'],
    problem:
      'Single-pass RAG systems produce confident answers even when the retrieved context doesn’t actually support them.',
    approach:
      'Two agents retrieve with different strategies (one narrow and technical, one broad and counterpoint-seeking), draft grounded answers, cross-examine each other’s citations, and revise. A judge synthesizes the final answer, and a citation checker forces a rewrite of any uncited factual sentence.',
    highlights: [
      'Dual retrieval strategies over a persistent Chroma vector store',
      'Cross-examination step where each agent checks the other’s claims against its cited chunks',
      'Judge synthesis that explicitly resolves contradictions between two drafts',
      'Runs entirely locally through Ollama, with no API keys required',
    ],
    stack: ['Python', 'LangGraph', 'Ollama', 'Chroma', 'RAG'],
    architecture: [
      { label: 'Question' },
      { label: 'Agent A: Narrow Retrieval', detail: 'Top-6 chunks, technical tone' },
      { label: 'Agent B: Broad Retrieval', detail: 'Top-14 chunks, rewritten for counterpoints' },
      { label: 'Cross-Examination', detail: 'Each agent critiques the other’s citations' },
      { label: 'Judge Synthesis', detail: 'Resolves contradictions across both drafts' },
      { label: 'Citation Verification', detail: 'Uncited claims trigger a rewrite pass' },
    ],
  },
  {
    slug: 'yolov5-satellite-image-detector',
    repo: 'yolov5-satellite-image-detector',
    name: 'Explainable Satellite Object Detection',
    oneLiner:
      'Does the detector’s saliency land on the object it claims to detect? An XAI pipeline built to measure it.',
    tags: ['AI/ML', 'Research'],
    problem:
      'Detectors on satellite imagery can be confidently right for the wrong reasons; high confidence doesn’t mean the model is looking at the correct pixels.',
    approach:
      'A YOLOv5 fork trained on hand-labeled satellite imagery, paired with Grad-CAM, EigenCAM, and Integrated Gradients attribution and a quantitative localization-faithfulness metric that scores how well each heatmap aligns with the ground-truth box.',
    results: [
      { value: '70%', label: 'less manual heatmap inspection, using the faithfulness metric to rank methods' },
    ],
    highlights: [
      'Custom faithfulness metric: localization-curve AUC across K ∈ {1, 5, 10, 50, 100} per image',
      'Grad-CAM, EigenCAM, and Integrated Gradients as interchangeable attribution backends',
      'Streamlit and Gradio apps for interactive detection and explanation',
      'Reproducible pipeline separating tracked raw data from gitignored generated artifacts',
    ],
    stack: ['Python', 'PyTorch', 'YOLOv5', 'OpenCV', 'Captum', 'Streamlit', 'Gradio'],
    architecture: [
      { label: 'Satellite Imagery Dataset', detail: 'Hand-labeled, multi-class' },
      { label: 'YOLOv5 Detector', detail: 'Fine-tuned on the dataset' },
      { label: 'Attribution Pipeline', detail: 'Grad-CAM, EigenCAM, Integrated Gradients' },
      { label: 'Faithfulness Scoring', detail: 'Localization-curve AUC vs. ground truth' },
      { label: 'Interactive Inspection', detail: 'Streamlit / Gradio apps' },
    ],
  },
  {
    slug: 'spatiotemporal-cloud-forecasting',
    repo: 'spatiotemporal-cloud-forecasting',
    name: 'Spatiotemporal Cloud Forecasting',
    oneLiner:
      'Next-frame cloud forecasting from GOES satellite imagery, testing whether a ConvLSTM actually beats a naive baseline.',
    tags: ['AI/ML', 'Research'],
    problem:
      'Short-term cloud forecasting needs genuinely different models compared against a rigorous baseline, not one model trained and assumed to work.',
    approach:
      'GOES frames are cropped, clipped to a fixed brightness-temperature range, normalized, and split chronologically. A persistence baseline, a channel-stacked CNN, and a ConvLSTM are trained and evaluated under identical conditions.',
    highlights: [
      'Chronological train/val/test split to avoid temporal leakage',
      'Three comparable tiers: persistence baseline, CNN, and ConvLSTM',
      'Unit tests over synthetic tensors, so CI runs without any raw satellite data',
      'GitHub Actions CI on every push',
    ],
    stack: ['Python', 'PyTorch', 'NumPy', 'pytest', 'GitHub Actions'],
    architecture: [
      { label: 'Raw GOES .nc Frames' },
      { label: 'Extraction & Normalization', detail: 'Crop, clip to a fixed Kelvin range, scale to [0,1]' },
      { label: 'Chronological Split', detail: '70 / 15 / 15 train / val / test' },
      { label: 'Persistence / CNN / ConvLSTM', detail: 'Trained under identical conditions' },
      { label: 'Evaluation', detail: 'MAE comparison across all three tiers' },
    ],
  },
  {
    slug: 'fras',
    repo: 'FRAS',
    name: 'Face Recognition Attendance System',
    oneLiner:
      'Webcam enrollment, live recognition, and automated PDF reporting as one solo-engineered pipeline.',
    tags: ['AI/ML'],
    problem:
      'Automating attendance means enrollment, recognition, duplicate prevention, and reporting have to work together as one reliable system, not a one-off script.',
    approach:
      'Students enroll through webcam capture, a live recognition loop matches faces with a 75-minute cooldown to prevent duplicates, and a reporting module turns the CSV log into a formatted PDF.',
    highlights: [
      'End-to-end: enrollment → recognition → CSV logging → PDF reporting',
      'Cooldown logic that prevents duplicate entries within a session',
      'CLI menu separating registration, recognition, and reporting concerns',
    ],
    stack: ['Python', 'OpenCV', 'face_recognition', 'dlib'],
    architecture: [
      { label: 'Webcam Enrollment', detail: 'Up to 10 images per student' },
      { label: 'Live Recognition Loop', detail: '75-minute per-student cooldown' },
      { label: 'Attendance Log (CSV)' },
      { label: 'PDF Report Generation', detail: 'Summarized by date' },
    ],
  },
  {
    slug: 'blueprint-tic-tac-toe',
    repo: 'tic-tac-toe',
    name: 'Blueprint Minimax Tic-Tac-Toe',
    oneLiner:
      'A tic-tac-toe game whose “AI Thinking” panel renders the exact Minimax search the computer used. Nothing on screen is faked.',
    tags: ['Frontend'],
    problem:
      'Simple game AIs are black boxes; the interesting problem isn’t beating the player, it’s making the search itself inspectable.',
    approach:
      'Every computer move runs a full Minimax search. The UI renders that same search as board annotations, a decision report (score, depth, nodes searched, ranked candidates), and a collapsible SVG game-tree, all from one analysis call per turn.',
    highlights: [
      'Single dependency-free HTML file: no build step, no framework',
      'Full keyboard play, aria-live status updates, and reduced-motion support',
      'Undo backed by a real snapshot stack',
    ],
    stack: ['JavaScript', 'SVG', 'Web Animations API'],
    architecture: [
      { label: 'Player Move' },
      { label: 'Minimax Search', detail: 'Full search every turn, all difficulties' },
      { label: 'Difficulty-Aware Selection', detail: 'Easy / Medium / Unbeatable' },
      { label: 'Decision Report + Search Schematic', detail: 'Rendered from the same analysis object' },
    ],
  },
]

export const flagshipProject = projects[0]
export const otherProjects = projects.slice(1)
