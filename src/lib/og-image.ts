// Draws the 1200 x 630 link preview pictures (the image that shows up when you
// paste a link into LinkedIn, iMessage, Slack, an application form and so on).
// The text and photos for each page come from src/lib/og.ts.
// Colors match src/styles/global.css; the font is Work Sans, like the site.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import satori from 'satori';
import sharp from 'sharp';
import type { OgPage } from './og';

const W = 1200;
const H = 630;
const C = {
  ink: '#253447',
  charcoal: '#454a50',
  steel: '#8b959e',
  mist: '#c6c8c5',
  paper: '#f1f0ec',
  white: '#fbfbf9',
  accent: '#c8ad87',
  light: '#dfe3e7',
};

const require = createRequire(import.meta.url);
const font = (weight: number) =>
  fs.readFileSync(require.resolve(`@fontsource/work-sans/files/work-sans-latin-${weight}-normal.woff`));
let fonts: { name: string; data: Buffer; weight: 500 | 600 | 800; style: 'normal' }[] | undefined;
const loadFonts = () =>
  (fonts ??= ([500, 600, 800] as const).map((weight) => ({ name: 'Work Sans', data: font(weight), weight, style: 'normal' as const })));

// A tiny helper so the layouts below read like HTML
type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, ...children: (Node | string | false | undefined)[]): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children: children.filter(Boolean) },
});
const img = (src: string, width: number, height: number, style: Record<string, unknown> = {}): Node => ({
  type: 'img',
  props: { src, width, height, style: { width, height, ...style } },
});

// The original file behind an imported photo
const fileOf = (image: ImageMetadata) => {
  const p = (image as ImageMetadata & { fsPath?: string }).fsPath;
  if (p && fs.existsSync(p)) return p;
  const dev = image.src.match(/^\/@fs(\/[^?]+)/);
  if (dev && fs.existsSync(decodeURIComponent(dev[1]))) return decodeURIComponent(dev[1]);
  throw new Error(`Link preview: could not find the file for the photo ${image.src}`);
};

// Crop a photo to exactly w x h, keeping the part named by `position` ('50% 12%' = near the top)
async function photo(image: ImageMetadata, w: number, h: number, position = '50% 50%') {
  const { data, info } = await sharp(fileOf(image)).rotate().toBuffer({ resolveWithObject: true });
  const scale = Math.max(w / info.width, h / info.height);
  const rw = Math.max(w, Math.round(info.width * scale));
  const rh = Math.max(h, Math.round(info.height * scale));
  const [px, py] = position.split(/\s+/).map((v) => Math.min(1, Math.max(0, parseFloat(v) / 100)));
  const out = await sharp(data)
    .resize(rw, rh)
    .extract({ left: Math.round((rw - w) * (px ?? 0.5)), top: Math.round((rh - h) * (py ?? 0.5)), width: w, height: h })
    .jpeg({ quality: 82 })
    .toBuffer();
  return `data:image/jpeg;base64,${out.toString('base64')}`;
}

const sizeFor = (text: string, sizes: [number, number][]) => sizes.find(([max]) => text.length <= max)?.[1] ?? sizes[sizes.length - 1][1];

const eyebrow = (text: string, color: string) =>
  el('div', { fontSize: 20, fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', color }, text);
const accentBar = (width = 72) => el('div', { width, height: 5, background: C.accent, borderRadius: 1 });
const siteLine = (color: string) => el('div', { fontSize: 20, fontWeight: 500, color, letterSpacing: 0.5 }, 'kasinitosato.github.io');

// Home, and the plain pages (Resume, Experience, Contact...): light paper background and a photo strip
async function homeLayout(page: OgPage) {
  const stripH = 210;
  const gap = 6;
  const pw = Math.floor((W - gap * 2) / 3);
  const photos = await Promise.all(page.photos.slice(0, 3).map((p, i) => photo(p.image, i === 2 ? W - 2 * (pw + gap) : pw, stripH, p.position)));
  const isHome = page.kind === 'home';
  const big = isHome ? 'Kasin Ito-Sato' : page.title;
  return el(
    'div',
    { width: W, height: H, flexDirection: 'column', background: C.paper, fontFamily: 'Work Sans' },
    el(
      'div',
      { flex: 1, flexDirection: 'column', justifyContent: 'center', padding: '0 72px', gap: 18 },
      isHome ? eyebrow('Portfolio', C.steel) : eyebrow('Kasin Ito-Sato', C.steel),
      el('div', { fontSize: sizeFor(big, [[16, 92], [26, 76], [40, 60]]), fontWeight: 800, color: C.ink, letterSpacing: -2, lineHeight: 1.02 }, big),
      el(
        'div',
        { alignItems: 'center', gap: 22 },
        accentBar(),
        el('div', { fontSize: 30, fontWeight: 500, color: C.charcoal }, isHome ? "Mechanical Engineer · LMU '27" : page.label ?? "Mechanical Engineer · LMU '27"),
      ),
    ),
    el('div', { height: stripH, gap, background: C.paper }, ...photos.map((src, i) => img(src, i === 2 ? W - 2 * (pw + gap) : pw, stripH))),
  );
}

// Skill filter pages: big category name and intro over a darkened project photo
async function categoryLayout(page: OgPage) {
  const bg = page.photos[0] ? await photo(page.photos[0].image, W, H, page.photos[0].position) : undefined;
  return el(
    'div',
    { width: W, height: H, position: 'relative', background: C.ink, fontFamily: 'Work Sans' },
    bg && img(bg, W, H, { position: 'absolute', top: 0, left: 0 }),
    el('div', {
      position: 'absolute', top: 0, left: 0, width: W, height: H,
      backgroundImage: 'linear-gradient(90deg, rgba(37,52,71,0.94) 0%, rgba(37,52,71,0.86) 55%, rgba(37,52,71,0.62) 100%)',
    }),
    el(
      'div',
      { position: 'absolute', top: 0, left: 0, width: W, height: H, flexDirection: 'column', justifyContent: 'center', padding: '0 80px', gap: 22 },
      eyebrow('Projects · Browse by skill', C.accent),
      el('div', { fontSize: sizeFor(page.title, [[16, 88], [26, 74]]), fontWeight: 800, color: '#fff', letterSpacing: -2, lineHeight: 1.04, maxWidth: 1000 }, page.title),
      accentBar(),
      el('div', { fontSize: 30, fontWeight: 500, color: C.light, lineHeight: 1.35, maxWidth: 940 }, page.intro ?? ''),
    ),
    el('div', { position: 'absolute', left: 80, bottom: 44, fontSize: 20, fontWeight: 600, color: C.steel, letterSpacing: 0.5 }, 'Kasin Ito-Sato · kasinitosato.github.io'),
  );
}

// Project and experience pages: title over the cover photo, with a small label
async function projectLayout(page: OgPage) {
  const bg = page.photos[0] ? await photo(page.photos[0].image, W, H, page.photos[0].position) : undefined;
  const titleSize = sizeFor(page.title, [[22, 76], [36, 64], [52, 54], [80, 46]]);
  return el(
    'div',
    {
      width: W, height: H, position: 'relative', fontFamily: 'Work Sans', backgroundColor: C.ink,
      // No photo: the same blueprint grid as the cards on the site
      ...(bg ? {} : {
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }),
    },
    bg && img(bg, W, H, { position: 'absolute', top: 0, left: 0 }),
    bg && el('div', {
      position: 'absolute', top: 0, left: 0, width: W, height: H,
      backgroundImage: 'linear-gradient(180deg, rgba(37,52,71,0.05) 0%, rgba(37,52,71,0.35) 40%, rgba(37,52,71,0.93) 100%)',
    }),
    el(
      'div',
      { position: 'absolute', left: 72, right: 72, bottom: 60, flexDirection: 'column', gap: 18 },
      page.label && el('div', { alignSelf: 'flex-start', padding: '8px 16px', background: C.accent, color: C.ink, fontSize: 20, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', borderRadius: 3 }, page.label),
      el('div', { fontSize: titleSize, fontWeight: 800, color: '#fff', letterSpacing: -1.5, lineHeight: 1.06 }, page.title),
      el('div', { fontSize: 22, fontWeight: 600, color: C.light }, 'Kasin Ito-Sato · Mechanical Engineer'),
    ),
  );
}

export async function renderOgImage(page: OgPage) {
  const tree = page.kind === 'category' ? await categoryLayout(page) : page.kind === 'project' ? await projectLayout(page) : await homeLayout(page);
  const svg = await satori(tree as any, { width: W, height: H, fonts: loadFonts() });
  return sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toBuffer();
}

// Keeps link preview descriptions short enough that apps don't cut them off mid-word
export function shortDescription(text: string, max = 155) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  // Longest run of whole sentences that fits (a period inside "5.5" doesn't count as a sentence end)
  let out = '';
  for (const m of clean.matchAll(/[.!?]["')\]]*(?=\s|$)/g)) {
    const upTo = m.index! + m[0].length;
    if (upTo > max) break;
    out = clean.slice(0, upTo);
  }
  if (out.trim().length >= 70) return out.trim();
  return clean.slice(0, max - 1).replace(/\s+\S*$/, '').replace(/[,;:]$/, '') + '…';
}
