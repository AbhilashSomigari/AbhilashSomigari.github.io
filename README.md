# Abhilash Somigari — Portfolio

Personal portfolio for Abhilash Somigari, deployed at
[abhilashsomigari.github.io](https://abhilashsomigari.github.io/).

AI engineer building agentic LLM systems, and the evaluation, guardrails,
and infrastructure that make them trustworthy. Every fact on the site comes
from the [GitHub profile](https://github.com/AbhilashSomigari), the linked
repository READMEs, or the résumé in `public/resume.pdf`.

## Tech stack

- **React 18 + TypeScript + Vite**, prerendered to static HTML at build time
  and hydrated in the browser (no server, no router)
- **Tailwind CSS v4** with CSS-variable design tokens (`src/index.css`);
  dark and light themes that follow the OS until the visitor picks one
- **Lucide React** icons; scroll reveals are plain CSS + IntersectionObserver
  and respect `prefers-reduced-motion`
- **Build-time GitHub sync** (`scripts/sync-github.mjs`), with no runtime API
  calls and no tokens in the browser

## Commands

```bash
npm install
npm run dev       # local dev server
npm run sync      # refresh GitHub metadata (set GITHUB_TOKEN for higher rate limits)
npm test          # sync-script unit tests (node --test)
npm run lint      # eslint
npm run build     # type-check, build, prerender to dist/
npm run check     # lint + test + build: run before pushing
npm run preview   # serve dist/ locally
```

## How GitHub sync works

```
GitHub REST API ──► scripts/sync-github.mjs ──► src/data/generated/github.json ──► build
                         (Actions: daily,          (committed snapshot,             (static
                          on push, or manual)        last known good)                 HTML)
```

**Automatic (from GitHub):** for every public, non-fork repo, the sync
fetches the name, URL, description, primary language, topics, stars, forks,
license, archived state, last push date, homepage, and GitHub Pages URL
(shown as a "Live demo" link). If a repo has no description, the first
paragraph of its README is used instead. Renames are tracked by repo ID,
so curated entries keep working after a rename.

**Manual (curated):** project names, one-liners, problem/approach copy,
highlights, measured results, architecture steps, tags, and display order
all live in `src/data/projects.ts`. GitHub metadata never overwrites them.
A repo is joined to its curated entry by the `repo` field.

**New repositories** appear automatically under *More on GitHub*, with
their GitHub description. They get a full project card only when you add
an entry to `projects.ts`. To keep a repo out of that list (coursework,
tutorials), add its name to `HIDDEN_REPOS` in `src/data/github.ts`.

**Failure handling:** the snapshot is only replaced after a complete, sane
response. Network errors, rate limits, auth failures, or a suspicious
drop in repo count exit non-zero and leave the last good snapshot in place.
The deploy still runs with the committed data. 5xx responses and network
errors are retried with backoff.

**When it runs** (`.github/workflows/deploy.yml`):

| Trigger | Sync | Deploy |
| --- | --- | --- |
| Push to `main` | yes | always |
| Daily, 06:23 UTC | yes | only if the snapshot changed |
| Manual: Actions → *Sync & Deploy to GitHub Pages* → **Run workflow** | yes | always |

A changed snapshot is committed back to `main` by `github-actions[bot]`
after lint, tests, and build pass. GitHub doesn't trigger workflows from
`GITHUB_TOKEN` pushes, so this can't loop. Because the bot may commit to
`main`, run `git pull` before pushing local changes.

What sync does **not** do: it doesn't rewrite project descriptions from
code changes. Metadata (stars, language, last push, archived state, new
repos) updates on its own. Describing a new feature still means editing
`projects.ts`.

## Updating content

| File | Contents |
| --- | --- |
| `src/data/links.ts` | Name, GitHub, LinkedIn, email, résumé path |
| `src/data/projects.ts` | Curated projects; first entry is the flagship; array order is display order |
| `src/data/github.ts` | Snapshot accessors and `HIDDEN_REPOS` |
| `src/data/experience.ts` | Experience timeline |
| `src/data/skills.ts` | Skills by category (no proficiency bars) |
| `src/data/research.ts` | Research themes |
| `src/data/education.ts` | Degrees and certifications |
| `src/data/focusAreas.ts` | The four focus cards in About |
| `src/data/generated/github.json` | **Generated**: don't edit by hand |

## Updating the résumé

1. Replace `public/resume.pdf` with the new file. Keep the exact filename.
2. Commit and push to `main`.

No code changes are needed. The build hashes the PDF and appends the hash
to every résumé link (`/resume.pdf?v=…`), so visitors get the new version
right away instead of a cached copy. The download button saves it as
`Abhilash-Somigari-Resume.pdf`. If the file is missing, the build fails
instead of shipping a broken link.

## Deployment

GitHub Pages must be set to deploy from **GitHub Actions** (Settings → Pages
→ Source), not from a branch. Check with:

```bash
gh api repos/AbhilashSomigari/AbhilashSomigari.github.io/pages -q .build_type   # → workflow
```

This is a `<username>.github.io` repo, so the site is served from the domain
root and `vite.config.ts` uses `base: '/'`. If the site ever moves to a
project-page repo, set `base` to `/<repo-name>/`.

## Project structure

```
scripts/
  sync-github.mjs        GitHub metadata sync (no dependencies)
  sync-github.test.mjs   Unit tests for the sync logic
  prerender.mjs          Injects server-rendered HTML into dist/index.html
src/
  components/            One component per section
    projects/            Project cards, live repo metadata, links
    ui/                  Shared primitives (Reveal, Tag, buttons, …)
  data/                  Typed content + generated GitHub snapshot
  hooks/                 useActiveSection (scrollspy), useTheme
  entry-server.tsx       Build-time render entry
  main.tsx               Client entry (hydrates the prerendered HTML)
```
