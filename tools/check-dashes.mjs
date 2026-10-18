// Fails if any site text contains an em dash (—), written directly or as an
// HTML code like &mdash;. Runs before every deploy, and again on the finished
// pages after the build, so nothing slips through.
// Fix any line it reports by using a comma, colon, period or the word "to" instead.
//
//   npm run check-dashes          checks the source files in src/
//   npm run check-dashes -- dist  also checks the built pages in dist/
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const EM = /—|&mdash;|&#8212;|&#x2014;/i;
const roots = ['src', ...process.argv.slice(2)];
const exts = /\.(md|astro|ts|css|mjs|html|js|json|xml|txt|svg)$/;
const bad = [];

async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) await walk(f);
    else if (exts.test(e.name) && !f.endsWith('check-dashes.mjs')) {
      (await readFile(f, 'utf8')).split('\n').forEach((line, i) => {
        const m = line.match(EM);
        if (m) bad.push(`${f}:${i + 1}: ...${line.slice(Math.max(0, m.index - 40), m.index + 40).trim()}...`);
      });
    }
  }
}
for (const r of roots) {
  try { if ((await stat(r)).isDirectory()) await walk(r); } catch {}
}
if (bad.length) {
  console.error(`Found ${bad.length} em dash(es):\n` + bad.join('\n'));
  process.exit(1);
}
console.log(`No em dashes found in ${roots.join(' and ')}.`);
