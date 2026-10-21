// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL and BASE_PATH are filled in automatically by the GitHub Actions
// workflow, so the same code works locally and on GitHub Pages.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  // The live address, so link previews always use full https://kasinitosato.github.io/... links
  site: process.env.SITE_URL || 'https://kasinitosato.github.io',
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  markdown: {
    // Each page already has its own big title (h1), so Markdown headings start at h2:
    // whatever level a file's top headings use becomes h2, and the levels below follow in order.
    rehypePlugins: [demoteHeadings, fixLinks],
  },
});

function demoteHeadings() {
  /** @param {any} tree */
  return (tree) => {
    /** @type {any[]} */
    const headings = [];
    /** @param {any} node */
    const walk = (node) => {
      if (node.type === 'element' && /^h[1-6]$/.test(node.tagName)) headings.push(node);
      (node.children || []).forEach(walk);
    };
    walk(tree);
    // The levels this file uses, in order: the first becomes h2, the next h3, and so on.
    // So "# Top" and "## Top" files both start at h2, and a jump like ## to #### closes up.
    const levels = [...new Set(headings.map((h) => Number(h.tagName[1])))].sort((a, b) => a - b);
    for (const h of headings) h.tagName = 'h' + Math.min(6, levels.indexOf(Number(h.tagName[1])) + 2);
  };
}

// Lets Markdown files link to other pages like "/experience/" and still work
// when the site lives in a sub-folder on GitHub Pages. Outside links open in a new tab.
function fixLinks() {
  const prefix = base.replace(/\/$/, '');
  /** @param {any} tree */
  return (tree) => {
    /** @param {any} node */
    const walk = (node) => {
      if (node.type === 'element' && node.tagName === 'a' && typeof node.properties?.href === 'string') {
        const href = node.properties.href;
        if (href.startsWith('/') && !href.startsWith('//')) node.properties.href = prefix + href;
        if (/^https?:/.test(href)) {
          node.properties.target = '_blank';
          node.properties.rel = 'noopener';
        }
      }
      (node.children || []).forEach(walk);
    };
    walk(tree);
  };
}
