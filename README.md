# Hassan Khan — Portfolio

Personal portfolio for Muhammad Hassan Khan, Senior Product Designer — five in-site case studies, an ATS-formatted resume with a generated PDF download, light/dark theming.

## Stack

Astro (static output) + vanilla CSS, deployed to Vercel. No React/Tailwind — the design is intentionally hand-tuned and minimal.

See [design.md](./design.md) for the full design system.

## Development

```bash
npm install
npm run dev
```

## Resume PDF

The `/resume` page is the single source of truth. Regenerate the downloadable PDF after editing `src/data/resume.ts` or `src/pages/resume.astro`:

```bash
npm run resume:pdf
```

This spins up a local server, prints `/resume/` to PDF via Playwright, and writes `public/resume.pdf`. Committed as a static asset rather than generated on every Vercel build.

## Deploy

Import this repo at [vercel.com/new](https://vercel.com/new) — Astro is auto-detected, no config needed.
