# bleedcode

Source of [bleedcode.space](https://bleedcode.space): a small portfolio of web apps and side projects.

Static [Astro](https://astro.build) site: TypeScript strict, plain CSS, self-hosted fonts. The only JavaScript is one small file, `public/js/site.js` (click-to-copy email, the hover border trace and the animated project filters); everything still works without it.

## Run it

Requires Node 22.23.4 or later (see `engines` in `package.json`).

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
url: https://myapp.example.com       # optional, live site
repo: neptunedev77/myapp             # optional, owner/name
stack: [astro, typescript]
kind: personal         # personal | academic
featured: false
order: 7               # lower = shown earlier
icon: terminal         # pixel icon from src/lib/icons.ts, used when there is no logo
logo: /logos/myapp.svg # optional, file in public/logos/, replaces the icon
features:              # optional, up to 4 short points for the project page
  - "First thing it does"
  - "Second thing it does"
screenshots:           # optional; until then the page shows "no screenshots yet"
  - { src: /shots/myapp-1.png, alt: "The dashboard" }
---

Longer description for the project page.
```

It shows up on `/projects`, gets its own page at `/projects/myapp`, and lands in the sitemap. The home page shows two projects: live ones first, then featured, then by `order`. The schema lives in `src/content.config.ts`; a wrong field fails the build.

## Where things are

| Path | What |
|---|---|
| `src/site.config.ts` | Hero lines, email, GitHub, default description |
| `src/data/me.ts` | /me content: bio, education, interests |
| `src/i18n/` | UI strings (English now; add `pt.ts` for `/pt/...`) |
| `src/styles/global.css` | Colour, type, spacing and motion tokens; page transitions |
| `src/layouts/Card.astro` | The one layout: card, header, footer, meta tags |
| `src/lib/icons.ts` | 16×16 pixel icons for projects; add one as a text grid |
| `public/js/site.js` | The site's only script |
| `scripts/build-cat.py` | Regenerates the cat sprite, favicon, touch icon and OG image from `design/mockup/gato_v4.png` (`python scripts/build-cat.py`, needs Pillow) |
| `vercel.json` | Security headers and asset caching |

## Deploy (Vercel)

1. Import `github.com/neptunedev77/bleedcode` in Vercel. The framework is auto-detected as Astro; no build settings or environment variables are needed.
2. In the project's **Domains**, add `bleedcode.space` (apex) and `www.bleedcode.space`, and point DNS as Vercel instructs.

`vercel.json` sends a strict Content-Security-Policy (`script-src 'self'`, no inline scripts except the speculation rules), HSTS, `X-Frame-Options: DENY`, `nosniff`, a referrer policy and a permissions policy, and caches the hashed files in `/_astro/` for a year. If you add an external resource (an embed, analytics, a CDN), allow its origin in the CSP first.
