export const links = {
  name: 'Abhilash Somigari',
  fullName: 'Abhilash Reddy Somigari',
  github: 'https://github.com/AbhilashSomigari',
  linkedin: 'https://www.linkedin.com/in/abhilashreddysomigari',
  email: 'abhilashreddysomigari@gmail.com',
  // public/resume.pdf, with a content hash appended at build time so a
  // replaced PDF is never served from a stale browser or CDN cache.
  resume: `/resume.pdf?v=${__RESUME_VERSION__}`,
  resumeFileName: 'Abhilash-Somigari-Resume.pdf',
} as const
