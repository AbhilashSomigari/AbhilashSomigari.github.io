import type { ExperienceEntry } from './types'

// Source: public/resume.pdf. Keep dates and numbers in sync with it.
export const experience: ExperienceEntry[] = [
  {
    role: 'Graduate Research Assistant',
    organization: 'West Virginia University',
    location: 'Morgantown, WV',
    start: 'Aug 2025',
    end: 'Aug 2026',
    bullets: [
      'Designed a custom XAI faithfulness metric (localization-curve AUC) that ranks Grad-CAM, EigenCAM, and Integrated Gradients on a YOLOv5 detector trained on hand-labeled satellite imagery, cutting manual heatmap inspection by 70%.',
      'Built a full-stack web app (Flask, React) that runs detection and XAI in the browser, cutting experiment iteration time by 50%.',
      'Built a SAM3 video-segmentation pipeline over 20 laparoscopic surgeries; a scaling-based normalization made cross-frame comparisons 30% more reliable, and automated cut-ratio analysis cut manual review by 40%.',
    ],
    tech: ['PyTorch', 'YOLOv5', 'SAM3', 'Grad-CAM / EigenCAM', 'Flask', 'React'],
  },
  {
    role: 'Teaching Assistant, Data-Driven WV',
    organization: 'West Virginia University',
    location: 'Morgantown, WV',
    start: 'Jan 2026',
    end: 'May 2026',
    bullets: [
      'Built GOES-16 data pipelines and starter code that cut student setup time by 30% and raised submission success by 35%.',
      'Designed spatiotemporal ML assignments (CNN and ConvLSTM cloud forecasting vs. a persistence baseline in PyTorch), improving evaluation consistency by 25%.',
    ],
    tech: ['Python', 'PyTorch', 'GOES-16 Data', 'ConvLSTM'],
  },
  {
    role: 'Software Developer Intern',
    organization: 'SAK Informatics',
    location: 'Hyderabad, India',
    start: 'Jan 2024',
    end: 'Mar 2024',
    bullets: [
      'Built Python automation scripts and data pipelines in Agile sprints, reducing manual data handling by 30%.',
      'Built Flask REST APIs and internal tools with Pandas and NumPy, making data access and prototyping 25% faster.',
    ],
    tech: ['Python', 'Flask', 'REST APIs', 'Pandas', 'NumPy'],
  },
  {
    role: 'Mentor',
    organization: 'Smart Interviews',
    location: 'Hyderabad, India',
    start: 'Oct 2023',
    end: 'Dec 2023',
    bullets: [
      'Mentored 80+ students in data structures and algorithms through lectures, live coding, and doubt-solving sessions.',
    ],
    tech: ['Data Structures & Algorithms'],
  },
]
