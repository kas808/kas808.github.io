// This file describes the fields each content file can have.
// If you make a typo in a project file (like a missing title), the build
// will stop and tell you exactly which file and field to fix.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const folderId = ({ entry }: { entry: string }) => entry.replace(/\/index\.md$/, '');

const projects = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/projects', generateId: folderId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(), // one or two sentences shown on the project card
      course: z.string().optional(),
      date: z.string(),
      team: z.string().optional(),
      role: z.string(),
      tools: z.array(z.string()),
      status: z.enum(['complete', 'in progress']).default('complete'),
      featured: z.boolean().default(false), // true = shows on the home page
      size: z.enum(['large', 'small']).default('large'), // card size on the Projects page
      order: z.number().default(100), // lower numbers show first
      cover: image().optional(), // card and header photo (optional)
      coverAlt: z.string().optional(),
      // Which part of the photo to keep when it's cropped into a card: '50% 0%' = top, '50% 50%' = middle
      coverPosition: z.string().optional(),
      // Optional video: file lives in public/media/<project-folder>/
      video: z
        .object({ file: z.string(), poster: z.string().optional(), caption: z.string().optional() })
        .optional(),
      // Photo galleries: images live next to index.md in the project folder
      gallery: z
        .array(
          z.object({
            title: z.string().optional(),
            images: z.array(z.object({ src: image(), caption: z.string() })),
          }),
        )
        .default([]),
      // PDFs: files live in public/media/<project-folder>/. embed: true shows it on the page.
      documents: z
        .array(z.object({ title: z.string(), file: z.string(), embed: z.boolean().default(false) }))
        .default([]),
    }),
});

const punahou = defineCollection({
  loader: glob({ pattern: '*/*/index.md', base: './src/content/punahou', generateId: folderId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      section: z.enum([
        'ke-kilohana',
        'gsd',
        'lanakila-express',
        'engineering-iii',
        'extra-work',
        'competency-tests',
      ]),
      order: z.number().default(100),
      banner: image().optional(),
      cover: image().optional(), // card photo; falls back to the banner
      youtube: z.array(z.object({ url: z.string(), title: z.string() })).default([]),
      links: z.array(z.object({ title: z.string(), url: z.string() })).default([]),
    }),
});

const experience = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/experience', generateId: folderId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      organization: z.string(),
      location: z.string(),
      dates: z.string(),
      order: z.number().default(100),
      summary: z.string(), // shown on the Experience overview and home page
      cover: image(), // big header photo
      coverAlt: z.string(),
      coverPosition: z.string().optional(),
      highlights: z.array(z.string()),
      tools: z.array(z.string()).default([]),
      related: z.object({ title: z.string(), href: z.string() }).optional(),
      gallery: z.array(z.object({ src: image(), caption: z.string() })).default([]),
      documents: z
        .array(z.object({ title: z.string(), file: z.string(), embed: z.boolean().default(false) }))
        .default([]),
    }),
});

export const collections = { projects, punahou, experience };
