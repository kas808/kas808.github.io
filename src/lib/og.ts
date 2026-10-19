// The text and photos for every page's link preview picture.
// The pictures themselves are drawn in src/lib/og-image.ts and saved at
// /og/<page>.jpg when the site builds (for example /og/projects--thermal.jpg).
//
// To change a preview:
//   - Project pages use the project's title, course and cover photo.
//   - Skill filter pages use the category name and intro from src/lib/categories.ts,
//     over a photo from one of its projects (`shareFrom` picks which one).
//   - The home page and the plain pages use the three photos in `strip` below.
import { getCollection } from 'astro:content';
import { categories } from './categories';
import { categoryCards } from './category-cards';
import { featured } from './featured';

type Photo = { image: ImageMetadata; position?: string };
export type OgPage = {
  key: string; // the page's address without slashes, '' for home
  kind: 'home' | 'plain' | 'category' | 'project';
  title: string;
  label?: string; // small label (course, "Punahou School") or the line under a plain page's title
  intro?: string;
  photos: Photo[];
};

// The three photos along the bottom of the home page preview (and the plain pages)
const strip: Photo[] = featured.slice(0, 3).map((f) => ({ image: f.image, position: f.position }));

// The image file for a page address like '/projects/thermal/'
export const ogFile = (key: string) => `${key.replace(/^\/+|\/+$/g, '').replace(/\//g, '--') || 'home'}.jpg`;

let cache: Promise<OgPage[]> | undefined;

async function build(): Promise<OgPage[]> {
  const [projects, punahou, experience] = await Promise.all([getCollection('projects'), getCollection('punahou'), getCollection('experience')]);
  const plain = (key: string, title: string, label?: string): OgPage => ({ key, kind: 'plain', title, label, photos: strip });

  const pages: OgPage[] = [
    { key: '', kind: 'home', title: 'Kasin Ito-Sato', photos: strip },
    plain('projects', 'Projects', 'LMU and Punahou School'),
    plain('punahou', 'Punahou School', 'Engineering projects from Honolulu'),
    plain('experience', 'Experience', 'WSP internship and robotics teaching'),
    plain('resume', 'Resume'),
    plain('contact', 'Contact'),
    plain('404', 'Page not found'),
  ];

  for (const c of categories) {
    const cards = await categoryCards(c.slug);
    const pick = (c.shareFrom && cards.find((k) => k.href.startsWith(c.shareFrom!) && k.cover)) || cards.find((k) => k.cover);
    pages.push({
      key: `projects/${c.slug}`,
      kind: 'category',
      title: c.name,
      intro: c.intro,
      photos: pick?.cover ? [{ image: pick.cover, position: pick.coverPosition }] : [],
    });
  }

  for (const p of projects) {
    pages.push({
      key: `projects/${p.id}`,
      kind: 'project',
      title: p.data.title,
      label: p.data.course ?? 'LMU',
      photos: p.data.cover ? [{ image: p.data.cover, position: p.data.coverPosition }] : [],
    });
  }

  for (const p of punahou) {
    // A real project photo when there is one (the banners are often generic header photos)
    const image = p.data.categories.find((c) => c.cover)?.cover ?? p.data.cover ?? p.data.banner;
    pages.push({ key: `punahou/${p.id}`, kind: 'project', title: p.data.title, label: 'Punahou School', photos: image ? [{ image }] : [] });
  }

  for (const e of experience) {
    pages.push({
      key: `experience/${e.id}`,
      kind: 'project',
      title: e.data.title,
      label: e.data.organization,
      photos: [{ image: e.data.cover, position: e.data.coverPosition }],
    });
  }
  return pages;
}

export const ogPages = () => (cache ??= build());
