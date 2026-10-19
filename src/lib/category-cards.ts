// Gathers the cards for each skill category page from the `categories:` lists
// in the project, Punahou and experience files. You don't need to edit this
// file to add a project to a category; see src/lib/categories.ts.
import { getCollection, render } from 'astro:content';
import { categories, type CategorySlug } from './categories';
import { punahouSections } from './site';

export type CategoryCard = {
  href: string;
  title: string;
  blurb: string;
  meta: string;
  cover?: ImageMetadata;
  coverAlt: string;
  coverPosition?: string;
  status?: string;
  label: string;
  group: number; // 0 = LMU and WSP, 1 = Punahou (always shown after LMU work)
  order: number;
};

type Source = {
  file: string; // for error messages
  pageHref: string;
  title: string;
  meta: string;
  cover?: ImageMetadata;
  coverAlt: string;
  coverPosition?: string;
  status?: string;
  label: string;
  group: number;
  data: { categories: { category: CategorySlug; order: number; blurb: string; anchor?: string; title?: string; cover?: ImageMetadata; coverAlt?: string }[]; hideFromCategories: boolean };
  ids: () => Promise<Set<string>>; // every anchor id on the page
};

// Heading ids from the Markdown, plus any <div id="..."> anchors written into it
const anchorIds = async (entry: any) => {
  const { headings } = await render(entry);
  const ids = new Set<string>(headings.map((h: { slug: string }) => h.slug));
  for (const m of (entry.body ?? '').matchAll(/\bid="([^"]+)"/g)) ids.add(m[1]);
  return ids;
};

let cache: Promise<Map<CategorySlug, CategoryCard[]>> | undefined;

async function build() {
  const [projects, punahou, experience] = await Promise.all([
    getCollection('projects'),
    getCollection('punahou'),
    getCollection('experience'),
  ]);

  const sources: Source[] = [
    ...projects.map((p) => ({
      file: `src/content/projects/${p.id}/index.md`,
      pageHref: `/projects/${p.id}/`,
      title: p.data.title,
      meta: [p.data.course, p.data.date].filter(Boolean).join(' · '),
      cover: p.data.cover,
      coverAlt: p.data.coverAlt ?? '',
      coverPosition: p.data.coverPosition,
      status: p.data.status,
      label: p.data.course ?? p.data.title,
      group: 0,
      data: p.data,
      ids: () => anchorIds(p),
    })),
    ...experience.map((e) => ({
      file: `src/content/experience/${e.id}/index.md`,
      pageHref: `/experience/${e.id}/`,
      title: `${e.data.title}, ${e.data.organization.replace(/ in the US$/, '')}`,
      meta: `${e.data.organization} · Internship`,
      cover: e.data.cover,
      coverAlt: e.data.coverAlt,
      coverPosition: e.data.coverPosition,
      status: undefined,
      label: e.data.organization,
      group: 0,
      data: e.data,
      ids: () => anchorIds(e),
    })),
    ...punahou
      .filter((p) => !p.data.hidden)
      .map((p) => ({
        file: `src/content/punahou/${p.id}/index.md`,
        pageHref: `/punahou/${p.id}/`,
        title: p.data.title,
        meta: ['Punahou School', punahouSections.find((s) => s.id === p.data.section)?.name].filter(Boolean).join(' · '),
        cover: p.data.cover ?? p.data.banner,
        coverAlt: '',
        coverPosition: undefined,
        status: undefined,
        label: 'Punahou School',
        group: 1,
        data: p.data,
        ids: () => anchorIds(p),
      })),
  ];

  const map = new Map<CategorySlug, CategoryCard[]>(categories.map((c) => [c.slug, []]));
  for (const s of sources) {
    if (s.data.hideFromCategories) continue;
    for (const c of s.data.categories) {
      if (c.anchor && !(await s.ids()).has(c.anchor)) {
        throw new Error(
          `${s.file}: the "${c.category}" category links to #${c.anchor}, but the page has no heading or anchor with that id. ` +
            `Check the spelling, or add <div id="${c.anchor}" class="anchor"></div> above that part of the page.`,
        );
      }
      map.get(c.category)!.push({
        href: c.anchor ? `${s.pageHref}#${c.anchor}` : s.pageHref,
        title: c.title ?? s.title,
        blurb: c.blurb,
        meta: s.meta,
        cover: c.cover ?? s.cover,
        coverAlt: c.coverAlt ?? s.coverAlt,
        coverPosition: c.cover ? undefined : s.coverPosition,
        status: s.status,
        label: s.label,
        group: s.group,
        order: c.order,
      });
    }
  }
  for (const list of map.values()) list.sort((a, b) => a.group - b.group || a.order - b.order);
  return map;
}

export const categoryCards = async (slug: CategorySlug) => {
  // Built once per production build; rebuilt on every page view while previewing, so edits show up
  const all = import.meta.env.DEV ? build() : (cache ??= build());
  return (await all).get(slug) ?? [];
};

// The categories a page belongs to, in site order (for the tags at the top of each page)
export const pageCategories = (data: Source['data']) =>
  data.hideFromCategories ? [] : categories.filter((c) => data.categories.some((e) => e.category === c.slug));
