# Abhilash Somigari — Portfolio

Personal portfolio site for Abhilash Somigari, deployed at
[abhilashsomigari.github.io](https://abhilashsomigari.github.io/).

## Positioning

This portfolio represents five connected areas of work, in this order of
emphasis:

- **Software Engineering** — architecture, APIs, testing, deployment
- **Full-Stack Engineering** — React interfaces, backend services, databases
- **Applied AI** — agents, RAG, computer vision, model integration
- **Research Engineering** — explainability, evaluation, reproducible experiments
- **Open-Source Collaboration** — public, documented, reusable repositories

AI is one part of the story here, not the whole story — the site is built so
a recruiter who doesn't know what "RAG" means can still tell exactly what
kind of engineer this is within the first screen.

All content (experience, projects, skills, education) is sourced from the
[GitHub profile](https://github.com/AbhilashSomigari), its
[profile README](https://github.com/AbhilashSomigari/AbhilashSomigari), the
READMEs of the linked repositories, and the résumé in `public/resume.pdf`.
Nothing is fabricated; anything that couldn't be verified was left out.

## Tech Stack

- **React 18 + TypeScript + Vite** — no server, ships as static files
- **Tailwind CSS v4** (CSS-first `@theme` config in `src/index.css`)
- **Framer Motion** — restrained, `prefers-reduced-motion`-aware micro-interactions
- **Lucide React** — icons
- No router: this is a single scrolling page, which sidesteps GitHub Pages'
  usual SPA-routing problems entirely.

## Local Development

```bash
git clone https://github.com/AbhilashSomigari/AbhilashSomigari.github.io.git
cd AbhilashSomigari.github.io
npm install
npm run dev
```

## Production Build

```bash
npm run build   # type-checks with tsc, then builds with Vite to dist/
npm run preview # serve the production build locally
```

## GitHub Pages Deployment

This repo deploys automatically via `.github/workflows/deploy.yml`:

1. Push to `main`.
2. GitHub Actions installs dependencies, runs `npm run build`, and uploads
   `dist/` as a Pages artifact.
3. The `deploy` job publishes that artifact to GitHub Pages.

One-time setup in the repository's **Settings → Pages**: set **Source** to
**GitHub Actions** (not "Deploy from a branch"). No other configuration is
required.

Because this repo is named `AbhilashSomigari.github.io` (a user/organization
page), the site is served from the domain root and `vite.config.ts` sets
`base: '/'`. If this project is ever moved to a different repo name (a
"project page"), `base` must be changed to `/<repo-name>/` to match exactly,
or all asset paths will 404 on Pages.

## Updating Portfolio Content

All factual content lives in `src/data/`, separate from presentation
components:

| File | Contents |
| --- | --- |
| `data/links.ts` | Name, GitHub, LinkedIn, email, résumé path |
| `data/focusAreas.ts` | The five focus-area cards |
| `data/experience.ts` | Work/research/teaching experience timeline |
| `data/projects.ts` | Flagship project (OpsPilot) + featured project grid |
| `data/research.ts` | Research & technical exploration themes |
| `data/openSource.ts` | Open-source principles + selected public repos |
| `data/skills.ts` | Skills grouped by category |
| `data/education.ts` | Degree(s) and certifications |

To add a new project, add an entry to the `projects` array in
`data/projects.ts` following the existing `Project` shape (see
`data/types.ts`) — the grid and card UI pick it up automatically.

### Updating the résumé

Replace `public/resume.pdf` with the current file, keeping the same filename
— the "View Résumé" button links to `/resume.pdf` and needs no code change.

## Project Structure

```
src/
├── components/       Presentation components (one per section)
│   └── ui/            Reusable primitives (Container, Reveal, Tag, ArchitectureFlow, ...)
├── data/              Typed content, separate from presentation
├── hooks/             useActiveSection (nav scrollspy), usePrefersReducedMotion
├── App.tsx
└── main.tsx
```
