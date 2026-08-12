import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog content. One collection per locale so the entry id IS the URL slug, and
 * a post pair shares the same slug across languages (en/first-72-hours.md ↔
 * es/first-72-hours.md) — that keeps hreflang and the language switcher 1:1.
 *
 * ⚠️ Seed articles are production-shaped but PROVISIONAL: general orientation
 * about insurance claims and repairs, no invented figures, no legal advice.
 * They ship as drafts (dev-only) until someone signs off on the copy.
 */
const schema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  draft: z.boolean().default(false),
});

export const collections = {
  blogEn: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/blog/en' }), schema }),
  blogEs: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/blog/es' }), schema }),
};
