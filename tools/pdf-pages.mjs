// Turns every page of each embedded PDF into a picture, so documents show on
// the site as clean pages you scroll through (no browser PDF toolbar).
//
// Run it after adding or replacing a PDF that has "embed: true":   npm run pdf-pages
//
// It reads the content files in src/content/projects and src/content/experience,
// finds documents marked embed: true, and saves the pages to
// src/assets/docs/<project-folder>/<pdf-name>/page-01.jpg, page-02.jpg, ...
import { readdir, readFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { getDocumentProxy, renderPageAsImage } from 'unpdf';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const WIDTH = 1400; // pixels; plenty for a sharp page on any screen
const only = process.argv[2]; // optional: just one project folder, e.g. npm run pdf-pages -- pantograph

const embeds = [];
for (const collection of ['projects', 'experience']) {
  const dir = path.join('src/content', collection);
  for (const folder of await readdir(dir)) {
    const file = path.join(dir, folder, 'index.md');
    if (!existsSync(file)) continue;
    const text = await readFile(file, 'utf8');
    for (const m of text.matchAll(/file:\s*([^,}\s]+\.pdf)\s*,\s*embed:\s*true/g)) {
      if (!only || only === folder) embeds.push({ folder, pdf: m[1] });
    }
  }
}

for (const { folder, pdf } of embeds) {
  const src = path.join('public/media', folder, pdf);
  if (!existsSync(src)) {
    console.warn(`Skipping ${src}: file not found`);
    continue;
  }
  const out = path.join('src/assets/docs', folder, pdf.replace(/\.pdf$/, ''));
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });

  const doc = await getDocumentProxy(new Uint8Array(await readFile(src)));
  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    const scale = WIDTH / page.getViewport({ scale: 1 }).width;
    const png = await renderPageAsImage(doc, n, {
      canvasImport: () => import('@napi-rs/canvas'),
      scale,
    });
    await sharp(Buffer.from(png))
      .flatten({ background: '#ffffff' })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(path.join(out, `page-${String(n).padStart(2, '0')}.jpg`));
  }
  console.log(`${folder}/${pdf}: ${doc.numPages} pages`);
}
