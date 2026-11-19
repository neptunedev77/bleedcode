# bleedcode

Source of [bleedcode.space](https://bleedcode.space): the portfolio and web-app studio of António Sousa.

Static [Astro](https://astro.build) site, TypeScript strict, plain CSS, self-hosted fonts, no client JS.

## Run it

Requires Node LTS.

```sh
npm install
npm run dev       # http://localhost:4321
npm run check     # astro check (types + templates)
npm run build     # static output in dist/
npm run preview   # serve dist/
```

## Add a project

Add one markdown file to `src/content/projects/`, e.g. `src/content/projects/myapp.md`:

```md
---
name: MyApp
slug: myapp
tagline: One line about what it does.
status: wip            # live | wip | archived
url: https://myapp.bleedcode.space   # optional
repo: neptunedev77/myapp             # optional, owner/name
stack: [astro, typescript]
kind: personal         # personal | academic
featured: false        # the first 4 featured ones show on the home page
order: 7               # sort order inside featured / the rest
icon: terminal         # pixel icon from src/lib/icons.ts, used when there is no logo
logo: /logos/myapp.svg # optional, file in public/logos/, replaces the icon
---

Longer description for the project page.
```

It shows up on `/projects`, gets its own page at `/projects/myapp`, and lands in the sitemap. The schema lives in `src/content.config.ts`; a wrong field fails the build.

## Where things are

| Path | What |
|---|---|
| `src/site.config.ts` | Intro sentence, name, location, email, GitHub, /me focus |
| `src/i18n/` | UI strings (English now; add `pt.ts` for `/pt/...`) |
| `src/styles/global.css` | Colour, type and spacing tokens (8/16/24/32/48), base styles |
| `src/layouts/Card.astro` | The one layout: card, header, footer, meta tags |
| `src/lib/icons.ts` | 16×16 pixel icons for projects; add one as a text grid |
| `src/components/Mascot.astro` | The cat, at integer scales |
| `scripts/build-cat.py` | Regenerates the cat sprite, favicon, touch icon and OG image from `design/mockup/gato_v4.png` (`python scripts/build-cat.py`, needs Pillow) |

## Deploy (Vercel)

1. Import `github.com/neptunedev77/bleedcode` in Vercel. The framework is auto-detected as Astro; no settings or env vars needed.
2. In the project's **Domains**, add `bleedcode.space` (apex) and `www.bleedcode.space`, and point DNS as Vercel instructs.
3. Each app is its own Vercel project with its own subdomain (`timemesh.bleedcode.space`, …), pointed by DNS. Put that URL in the project's `url` field here.
