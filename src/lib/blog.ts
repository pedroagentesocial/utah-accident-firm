import { getCollection, type CollectionEntry } from 'astro:content';
import { HREFLANG } from '../config/site';
import type { Lang } from '../i18n/ui';

/** A blog entry in either locale (both collections share one schema). */
export type BlogPost = CollectionEntry<'blogEn'> | CollectionEntry<'blogEs'>;

/**
 * Published posts for a locale, newest first. Drafts are visible in dev only,
 * so an unfinished article can be previewed without ever reaching production.
 */
export async function getPosts(lang: Lang): Promise<BlogPost[]> {
  const posts: BlogPost[] = lang === 'es' ? await getCollection('blogEs') : await getCollection('blogEn');
  return posts
    .filter((p) => !p.data.draft || import.meta.env.DEV)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Blog index path for a locale. Both locales are prefixed on this site. */
export function blogPath(lang: Lang): string {
  return `/${lang}/blog/`;
}

/** Post slugs are shared across locales, so the pair maps one to one. */
export function blogPostPath(lang: Lang, slug: string): string {
  return `${blogPath(lang)}${slug}/`;
}

/** Long date in the reader's locale (es-US, not es-ES). */
export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(HREFLANG[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
