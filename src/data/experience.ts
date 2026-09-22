import type { ExperienceEntry } from './types'

export const experience: ExperienceEntry[] = [
  {
    role: 'Teaching Assistant',
    organization: 'Data-Driven West Virginia',
    context: 'Cloud Analytics & NOAA Data',
    start: 'Jan 2026',
    end: 'Present',
    bullets: [
      'Prepared and structured NOAA and GOES-16 datasets and project pipelines ahead of the course, reducing student setup time by 30%.',
      'Designed scalable data workflows and spatiotemporal ML tasks, improving project performance and evaluation consistency by 25%.',
      'Developed documentation, starter code, and debugging guides, improving overall project quality and submission success rate by 35%.',
    ],
    tech: ['Python', 'NOAA / GOES-16 Data', 'Spatiotemporal ML', 'Technical Documentation'],
  },
  {
    role: 'Graduate Research Assistant',
    organization: 'West Virginia University',
    context: 'AI, Machine Learning & Deep Learning',
    start: 'Aug 2025',
    end: 'Present',
    bullets: [
      'Built end-to-end object detection and explainability (XAI) pipelines using YOLOv5, trained and evaluated on a multi-class, hand-labeled satellite image dataset.',
      'Designed a quantitative Q-metric for XAI evaluation that reduced manual heatmap inspection by 70%, enabling faster identification of faithful explanation methods.',
      'Developed a full-stack web application for the YOLOv5–XAI pipeline that reduced experiment execution and iteration time by 50%.',
      'Built a SAM3-based surgical-video segmentation pipeline across 20 laparoscopic sleeve gastrectomy procedures for anatomical-region analysis.',
      'Designed a scaling-based normalization technique that achieved 30% more reliable cross-frame pixel comparisons for surgical transformation analysis.',
      'Computed quantitative cut-ratio metrics across all videos, including surgeon-wise analysis, reducing manual evaluation effort by 40%.',
    ],
    tech: ['PyTorch', 'YOLOv5', 'OpenCV', 'Grad-CAM / EigenCAM', 'SAM3', 'Flask', 'React'],
  },
  {
    role: 'Instructor & Mentor',
    organization: 'Smart Interviews',
    context: 'Data Structures & Algorithms',
    start: 'Jan 2024',
    end: 'May 2024',
    bullets: [
      'Taught core data-structures topics — arrays, strings, linked lists, stacks, and hash tables — to a cohort of 80+ students.',
      'Conducted doubt-solving sessions and coding practice to prepare students for technical assessments.',
      'Supported problem-solving ability and interview readiness through continuous, individualized feedback.',
    ],
    tech: ['Data Structures & Algorithms', 'Technical Mentoring'],
  },
]
