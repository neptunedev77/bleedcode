# Build the bleedcode portfolio site

You are building **bleedcode.space**, the personal portfolio and web-app studio of António Sousa (GitHub: `neptunedev77`). The repo is `github.com/neptunedev77/bleedcode` and the site will be deployed on **Vercel**.

## Read this first

The approved visual design is in `design/mockup/index.html` (open it in a browser). It is a static mockup: treat it as the **source of truth for the look**, not as code to copy. Rebuild it cleanly with real components and real data. Assets next to it:
- `design/mockup/gato_v4.png`: the mascot (48×46 pixel-art sprite). Always render with `image-rendering: pixelated` at integer scales (1×, 2×, 3×).
- `design/mockup/favicon.svg`: the logo. It is used **only as the favicon**, never inside the page.

Before writing code, read the mockup and write a short plan (stack, file tree, components). Then build it.

## Stack (decided)

- **Astro** (latest stable), static output. Vercel deploys it with zero config, so don't add an adapter unless something needs SSR (nothing does yet).
- **TypeScript**, strict mode.
- **Plain CSS** with custom properties in one `src/styles/global.css`, plus scoped `<style>` in components. No Tailwind and no UI libraries.
- **Fonts** self-hosted via `@fontsource/ibm-plex-mono` (500, 600, 700) and `@fontsource/silkscreen` (400). No Google Fonts requests.
- **No client JS by default.** The only allowed script is a tiny inline theme toggle (later, see below).
- Package manager: npm. Node LTS.

## Pages

| Route | Content |
|---|---|
| `/` | The home page exactly as in the mockup: centered card with the corner captions, name, subtitle, nav tiles, the cat sitting on the divider, 4 featured projects, footer. |
| `/projects` | Same card shell. All projects in the same 2-column grid, featured first, then the rest. |
| `/projects/[slug]` | Same shell. Project name, status badge, long description, stack chips, links (live URL, repo) and room for screenshots. |
| `/me` | Same shell. Short bio, education, focus areas and contact. Use clear `TODO:` placeholders for anything not provided. **Do not invent biography facts.** |
| `404` | Same shell, a one-line message, and the cat. |

All pages share one layout: `src/layouts/Card.astro` holds the centered card, the stains, the header and the footer.

## Data

Projects live in an **Astro content collection** (`src/content/projects/*.md`) with a zod schema:

```ts
{ name: string; slug: string; tagline: string; status: 'live' | 'wip' | 'archived';
  url?: string;        // e.g. https://timemesh.bleedcode.space
  repo?: string; stack: string[]; kind: 'personal' | 'academic';
  featured: boolean; order: number; monogram: string; logo?: string }
```

Seed it with these (descriptions are short, in English, professional):
- **meiUM**: live at https://meium.space. Interactive study notes for the MSc in Informatics Engineering. html/css/js. repo `neptunedev77/meiUM`. featured.
- **TimeMesh**: wip. Finds the time slots a whole group has in common. next.js/supabase. featured.
- **TollLab**: wip. Toll network simulator for northern Portugal's motorways. react/three.js. featured.
- **riffspace**: wip. Visual profile cards for metal fans and guitarists. react/typescript. featured.
- **miaUM**: wip. Lost & found for the University of Minho. next.js/postgresql/prisma.
- **metal-shell**: terminal collectible strategy game about metal bands. python. Repo link only, no URL.

The future subdomain pattern is `<app>.bleedcode.space`. Don't hard-code it: always use `url` from the data.

## Design rules (from the mockup)

- **Palette:** page `#0b0b0d`, card `#121215`, inner cards `#17171a`, accent cherry red `#b8304a`, dried-blood tones `#8e1b2b` and `#5c0f1a`, light border `#e9dcd9`, muted text `#a8a3a0`. Put them all in CSS variables.
- **No rounded corners anywhere.** Borders are "pixel" borders: four hard box-shadows (top, bottom, left, right), so the corners look notched. Make this a reusable utility class.
- **Fonts:**
  - IBM Plex Mono for the name, body, nav, chips and descriptions.
  - Silkscreen only for small captions, section labels and badges.
  - The name "bleed**code**" is Plex Mono bold, with "code" in the accent colour. Never in the pixel font.
- **Blood:** pixel-art pools, smears and specks on the card borders (not drips). Build one `Stain.astro` component that renders an SVG from a small shape table (pool, puddle, corner, smear, specks), with props for kind, position, scale and flip. Every project card gets a different stain. The mockup's shapes and colours are the reference.
- **The cat** sits on the dashed divider above the projects, with its feet on the line and a small puddle beside it. It must never float. Use 3× scale on the home page. It will later become an animated sprite (licking itself), so build it as a `Mascot.astro` component that can take a sprite sheet later.
- **Project cards:** the logo cell is a **true square** (120×120). Use the monogram on a tile when there is no logo. Name, status badge, one-line tagline and stack chips go beside it.
- **Nav:** the square icon tiles with labels (projects, /me, github, contact). Don't add a top nav bar or landing-page CTA buttons.
- **Footer:** © year, contact@bleedcode.space, "updated <build date>" generated at build time, and a placeholder for "pt" and "theme".
- **Placeholders:** the subtitle under the name is a placeholder. Keep it as `TODO: title` in one config file (`src/site.config.ts`) together with the email, GitHub URL and captions.

## Quality bar

- Semantic HTML: real `<a>`, `<nav>`, `<main>` and headings in order. `aria-label` on icon-only links. Decorative SVGs get `aria-hidden`.
- Text contrast is at least 4.5:1, and 3:1 for large text. Check the accent on the dark backgrounds.
- Responsive: the card is fluid up to 980px, and the project grid drops to one column on phones. The cat and the stains must not overflow or cover text on small screens.
- Performance: Lighthouse 100/100/100/100 on `/`, and each page under 100 KB excluding fonts.
- SEO basics: `<title>`, meta description, Open Graph tags, `sitemap` via `@astrojs/sitemap`, and a `robots.txt`. Set `site: 'https://bleedcode.space'` in `astro.config`.

## Not in v1 (but leave room for it)

- Portuguese version: structure strings so Astro i18n routing (`/pt/...`) can be added without rewriting components.
- Light theme: define the variables so a `[data-theme="light"]` override is all that is needed.
- Live status dots per app (uptime pings).

## Deploy

- `npm run build` must pass with no warnings, and so must `npx astro check`.
- Add a short `README.md` covering how to run it, how to add a project (one markdown file), and the deploy steps:
  1. Import the repo in Vercel. The framework is auto-detected as Astro.
  2. Add the domain `bleedcode.space` (apex and `www`) in Vercel.
  3. Each app is its own Vercel project with its own subdomain (`timemesh.bleedcode.space`, …) pointed by DNS.
- Don't commit secrets. No env vars are needed for v1.

## Working style

- Small, focused commits with clear messages. Push to a branch and open a PR to `main`, unless I tell you to commit directly.
- When something in this brief is ambiguous, pick the simplest option that matches the mockup and note it in the PR description.
- At the end, list what is still `TODO` (title, /me content, logos, screenshots).
