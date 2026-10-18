// Shrinks oversized photos so the project stays small and builds quickly.
// Run it after adding new photos:   npm run shrink
//
// Any JPG or PNG in src/content or src/assets that is wider or taller than
// 2000 px gets resized (in place, same file name). The website itself then
// makes even smaller WebP copies for each screen size when it builds.
import sharp from 'sharp';
import { readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const MAX = 2000;
const roots = ['src/content', 'src/assets'];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) yield full;
  }
}

let changed = 0;
let saved = 0;
for (const root of roots) {
  for await (const file of walk(root)) {
    const before = (await stat(file)).size;
    const img = sharp(file, { failOn: 'none' }).rotate(); // rotate() applies phone photo orientation
    const meta = await img.metadata();
    const big = Math.max(meta.width ?? 0, meta.height ?? 0) > MAX;
    if (!big) continue; // already a sensible size: leave it alone so it isn't recompressed again

    let pipeline = img.resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true });
    pipeline = /\.png$/i.test(file)
      ? pipeline.png({ compressionLevel: 9 })
      : pipeline.jpeg({ quality: 82, mozjpeg: true });
    const out = await pipeline.toBuffer();
    if (out.length < before) {
      await writeFile(file, out);
      changed++;
      saved += before - out.length;
    }
  }
}
console.log(`Shrank ${changed} images, saved ${(saved / 1e6).toFixed(1)} MB.`);
