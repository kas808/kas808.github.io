# Kasin Ito-Sato: mechanical engineering portfolio

Source for **[kasinitosato.github.io](https://kasinitosato.github.io)**, the portfolio of Kasin Ito-Sato, a
mechanical engineering student at Loyola Marymount University (BS, May 2027).

The site shows design, build and test work, and most projects report what was measured against what was
predicted. A few examples:

- [Rope Climbing Robot](https://kasinitosato.github.io/projects/rope-climbing-robot/): screw-slider drive, crossed 38 ft at 86% of predicted speed
- [Small Wind Turbine Design](https://kasinitosato.github.io/projects/wind-turbine/): 3D printed rotor, wind tunnel power vs. hand calculations and CFD
- [2x Magnifying Pantograph](https://kasinitosato.github.io/projects/pantograph/): aluminum linkage with GD&T drawings and a tolerance analysis
- [WSP internship](https://kasinitosato.github.io/experience/wsp/): HVAC, plumbing and fire protection design in Honolulu

Projects can be browsed by skill:
[aerodynamics](https://kasinitosato.github.io/projects/aerodynamics/) ·
[thermal & HVAC](https://kasinitosato.github.io/projects/thermal/) ·
[fluids](https://kasinitosato.github.io/projects/fluids/) ·
[design & CAD](https://kasinitosato.github.io/projects/design/) ·
[manufacturing](https://kasinitosato.github.io/projects/manufacturing/) ·
[testing](https://kasinitosato.github.io/projects/testing/) ·
[controls](https://kasinitosato.github.io/projects/controls/)

[Resume](https://kasinitosato.github.io/resume/) · [LinkedIn](https://www.linkedin.com/in/kasin-ito-sato) · [Contact](https://kasinitosato.github.io/contact/)

## How it's built

- **[Astro](https://astro.build)** static site. Every page is plain HTML at build time.
- **Content as Markdown.** Each project is a folder in `src/content/` with an `index.md` (front matter for
  title, course, date, role, team, skill categories, tools, cover photo, gallery and documents) and its images beside it. Adding a
  project means adding a folder, with no layout code to touch.
- **Responsive images.** Photos are resized to WebP at several widths during the build.
- **Generated link previews.** Every page gets its own share image, drawn at build time with
  [Satori](https://github.com/vercel/satori) from the page's title and cover photo (`src/lib/og-image.ts`).
- **PDFs as pages.** Reports and drawings are pre-rendered to page images (`tools/pdf-pages.mjs`), so
  they scroll inline instead of opening a browser PDF viewer.
- **Deploys on push.** GitHub Actions builds the site and publishes it to GitHub Pages on every push to
  `main` (`.github/workflows/deploy.yml`). The build fails if an em dash appears in the site copy.

## Running it locally

Needs Node 22.

```bash
npm ci
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

| Script | What it does |
|---|---|
| `npm run shrink` | Resizes any photo over 2000 px in `src/content` or `src/assets` |
| `npm run pdf-pages` | Renders PDFs marked `embed: true` to page images |
| `npm run check-dashes` | Fails if the site copy contains an em dash |
| `npm run check-previews` | After a build, checks every page has its preview tags and image |

## Layout

| Path | Contents |
|---|---|
| `src/content/projects/` | LMU projects, one folder each |
| `src/content/experience/` | WSP internship and Robotics TA pages |
| `src/content/punahou/` | Punahou School projects, grouped by section |
| `src/lib/` | Site details, skill categories, featured projects, preview images |
| `src/components/`, `src/layouts/`, `src/pages/` | Page templates and routes |
| `src/styles/global.css` | Colors, the type scale and shared styles |
| `public/media/` | Resume PDF and other files served as-is |
| `tools/` | The image, PDF and copy-check scripts above |
