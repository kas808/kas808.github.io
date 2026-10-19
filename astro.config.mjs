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
    // Demote headings in Markdown by one level (# becomes h2) because each page already has its own big title.
    rehypePlugins: [demoteHeadings, fixLinks],
  },
});

function demoteHeadings() {
  /** @param {any} tree */
  return (tree) => {
    /** @param {any} node */
    const walk = (node) => {
      if (node.type === 'element' && /^h[1-5]$/.test(node.tagName)) {
        node.tagName = 'h' + (Number(node.tagName[1]) + 1);
      }
      (node.children || []).forEach(walk);
    };
    walk(tree);
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
