import type { ResearchTheme } from './types'

export const researchThemes: ResearchTheme[] = [
  {
    title: 'Explainable AI',
    description:
      'A quantitative localization-faithfulness metric (top-K%-by-mass AUC) for scoring whether Grad-CAM, EigenCAM, and Integrated Gradients heatmaps actually align with a detector’s ground truth — not just whether they look plausible.',
    tags: ['Grad-CAM', 'EigenCAM', 'Integrated Gradients', 'Localization AUC'],
    linkedProjectSlug: 'yolov5-satellite-image-detector',
  },
  {
    title: 'Computer Vision & Object Detection',
    description:
      'Fine-tuning YOLOv5 on hand-labeled aerial and satellite imagery, with a pipeline built to interrogate the detector’s behavior, not just report its accuracy.',
    tags: ['YOLOv5', 'PyTorch', 'Remote Sensing'],
    linkedProjectSlug: 'yolov5-satellite-image-detector',
  },
  {
    title: 'Applied Medical Computer Vision',
    description:
      'A SAM3-based segmentation and scaling-normalization pipeline for quantitative, surgeon-wise analysis of gastric resection patterns across 20 laparoscopic sleeve gastrectomy videos — graduate research conducted at West Virginia University.',
    tags: ['SAM3', 'Video Segmentation', 'Normalization'],
  },
  {
    title: 'Spatiotemporal Deep Learning',
    description:
      'Benchmarking a channel-stacked CNN and a recurrent ConvLSTM against a naive persistence baseline for next-frame cloud-movement forecasting from GOES satellite imagery.',
    tags: ['ConvLSTM', 'CNN', 'Time-Series Forecasting'],
    linkedProjectSlug: 'spatiotemporal-cloud-forecasting',
  },
  {
    title: 'Reliable Retrieval-Augmented Generation',
    description:
      'Using multi-agent debate, cross-examination, and automated citation verification to reduce unsupported or hallucinated claims in RAG answers.',
    tags: ['LangGraph', 'RAG', 'Citation Verification'],
    linkedProjectSlug: 'multi-agent-debate-rag',
  },
  {
    title: 'AI Evaluation & Reliability Engineering',
    description:
      'A reproducible 30-incident benchmark harness that scores an AI agent on root-cause accuracy, tool-call correctness, unsupported-claim rate, and unsafe-action rate against a no-tools baseline — evaluation treated as a first-class engineering artifact.',
    tags: ['Evaluation Harness', 'LangGraph', 'Observability'],
    linkedProjectSlug: 'opspilot',
  },
]

export const researchNote =
  'These are research and engineering projects developed through graduate research assistantship work at West Virginia University and independent study — not peer-reviewed publications.'
