import type { ResearchTheme } from './types'

export const researchThemes: ResearchTheme[] = [
  {
    title: 'Evaluating AI Agents',
    description:
      'Treating evaluation as an engineering artifact: hidden-fault benchmarks scored against a no-tools baseline, harness bugs found and fixed before trusting the numbers, and paired-bootstrap confidence intervals to tell real prompt improvements from noise.',
    tags: ['Benchmarks', 'Regression Gates', 'Bootstrap CIs'],
    linkedProjectSlug: 'prospectpilot',
  },
  {
    title: 'Explainable AI for Object Detection',
    description:
      'A quantitative localization-faithfulness metric for scoring whether Grad-CAM, EigenCAM, and Integrated Gradients heatmaps actually align with a YOLOv5 detector’s ground truth, not just whether they look plausible.',
    tags: ['Grad-CAM', 'EigenCAM', 'Integrated Gradients'],
    linkedProjectSlug: 'yolov5-satellite-image-detector',
  },
  {
    title: 'Surgical Video Analysis',
    description:
      'A SAM3-based segmentation and scaling-normalization pipeline for quantitative, surgeon-wise analysis across 20 laparoscopic sleeve gastrectomy videos (graduate research at West Virginia University).',
    tags: ['SAM3', 'Video Segmentation', 'Medical CV'],
  },
  {
    title: 'Spatiotemporal Forecasting',
    description:
      'Benchmarking a channel-stacked CNN and a ConvLSTM against a persistence baseline for next-frame cloud-movement forecasting from GOES satellite imagery.',
    tags: ['ConvLSTM', 'CNN', 'Remote Sensing'],
    linkedProjectSlug: 'spatiotemporal-cloud-forecasting',
  },
]

export const researchNote =
  'Graduate research at West Virginia University and independent work. These are engineering and research projects, not peer-reviewed publications.'
