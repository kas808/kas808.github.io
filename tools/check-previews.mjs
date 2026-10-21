// Checks that every built page has a complete set of link preview tags and
// that its preview picture really exists. Run after a build:
//   npm run check-previews
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const site = 'https://kasinitosato.github.io';
const required = ['og:title', 'og:description', 'og:image', 'og:url', 'og:site_name', 'og:type', 'og:image:width', 'og:image:height', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];

const pages = [];
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
  const p = path.join(dir, e.name);
  if (e.isDirectory()) walk(p);
  else if (e.name.endsWith('.html')) pages.push(p);
});
walk(dist);

const meta = (html, key) => {
  const m = html.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)"`));
  return m && m[1].replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
};

let problems = 0;
const fail = (page, msg) => { problems++; console.log(`  ${path.relative(dist, page)}: ${msg}`); };
for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  for (const key of required) if (!meta(html, key)) fail(page, `missing ${key}`);
  if (meta(html, 'twitter:card') !== 'summary_large_image') fail(page, 'twitter:card is not summary_large_image');
  // The home page has its own look (graphite), every other page uses the site navy
  const isHome = path.relative(dist, page) === 'index.html';
  if (meta(html, 'theme-color') !== (isHome ? '#151515' : '#253447')) fail(page, `theme-color is not ${isHome ? 'the home graphite' : 'the site navy'}`);
  for (const key of ['og:image', 'og:url', 'twitter:image']) {
    const v = meta(html, key);
    if (v && !v.startsWith(`${site}/`)) fail(page, `${key} is not a full ${site} link: ${v}`);
  }
  const img = meta(html, 'og:image');
  if (img) {
    const file = path.join(dist, decodeURIComponent(new URL(img).pathname));
    if (!fs.existsSync(file)) fail(page, `og:image file does not exist: ${img}`);
  }
  const d = meta(html, 'og:description') ?? '';
  if (d.length > 160) fail(page, `description is ${d.length} characters`);
  if (/[—]|&mdash;/.test(d + (meta(html, 'og:title') ?? ''))) fail(page, 'em dash in preview text');
}
console.log(problems ? `${problems} problem(s) in ${pages.length} pages.` : `All ${pages.length} pages have complete link previews.`);
process.exit(problems ? 1 : 0);
