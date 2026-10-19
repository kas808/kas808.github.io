# Kasin Ito-Sato portfolio

The source for https://kasinitosato.github.io. Every push to `main` rebuilds the
site and puts it online through GitHub Actions.

## Link previews

When you paste a link to the site into LinkedIn, iMessage, Slack, an email or a
job application, the app shows a preview card: a picture, a title and a short
description. Every page has its own preview, and the pictures are drawn
automatically each time the site builds, in the site's colors and font.

### What each page shows

| Page | Picture | Description |
|---|---|---|
| Home | Your name, "Mechanical Engineer · LMU '27" and three project photos | The site description in `src/lib/site.ts` |
| Skill filters, like `/projects/thermal/` | The category name and intro over a darkened project photo | The category's `intro` |
| Project pages (LMU and Punahou) | The project title over its cover photo, with the course or "Punahou School" | The project's `summary` |
| Experience pages | The job title over its cover photo, with the organization | The `summary` |
| Projects, Punahou, Experience, Resume, Contact | The home design with the page name | The page's own description |

Descriptions are trimmed to about 155 characters so apps don't cut them off.

### How to change a preview

- **A project page:** change `title`, `course`, `summary`, `cover` or
  `coverPosition` in that project's `index.md`. `coverPosition` picks which
  part of the photo stays in the picture (`50% 0%` is the top, `50% 50%` the middle).
- **A skill filter page:** change the `name` or `intro` in `src/lib/categories.ts`.
  The photo comes from the first project in that category that has a photo. To
  pick a different one, set `shareFrom` to that project's address, for example
  `shareFrom: '/projects/wind-turbine/'`.
- **The home page photo strip:** it uses the first three projects in
  `src/lib/featured.ts`.
- **The plain pages** (Resume, Contact and so on): the page name and the line
  under it are in `src/lib/og.ts`.
- **The layout itself** (sizes, colors, darkening): `src/lib/og-image.ts`.

The pictures are saved at `/og/<page>.jpg`, for example
https://kasinitosato.github.io/og/projects--thermal.jpg. To look at them
before pushing, run `npm run build` and open the files in `dist/og/`.

After a build, `npm run check-previews` checks that every page has all the
preview tags and that its picture exists. If you add a new kind of page, the
build stops and tells you to add it to `src/lib/og.ts`.

### Seeing your change in the apps

Apps save a copy of a preview the first time a link is shared, so after you
push a change it can keep showing the old one for a while. To refresh it:

1. Wait for the GitHub Actions run to finish (the green check on the repo page).
2. **LinkedIn:** open the [Post Inspector](https://www.linkedin.com/post-inspector/),
   paste the page's link and click **Inspect**. That fetches the page again and
   updates the preview LinkedIn shows.
3. **Facebook, Instagram and WhatsApp:** open the
   [Sharing Debugger](https://developers.facebook.com/tools/debug/), paste the
   link, click **Debug**, then **Scrape Again**.
4. **iMessage and Slack:** these don't have a refresh tool. Adding something
   to the end of the link, like `?v=2`, makes them fetch a fresh preview.
