// Fails if any site text contains an em dash (—). Runs before every deploy.
// Fix any line it reports by using a comma, colon, period or the word "to" instead.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const roots = ['src'];
const bad = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) await walk(f);
    else if (/\.(md|astro|ts|css|mjs)$/.test(e.name)) {
      (await readFile(f, 'utf8')).split('\n').forEach((line, i) => {
        if (line.includes('—')) bad.push(`${f}:${i + 1}: ${line.trim()}`);
      });
    }
  }
}
for (const r of roots) await walk(r);
if (bad.length) {
  console.error(`Found ${bad.length} em dash(es):\n` + bad.join('\n'));
  process.exit(1);
}
console.log('No em dashes found.');
