/**
 * i18n helpers built on Astro's native routing (/en/, /es/).
 *   getLangFromUrl(url)      -> 'en' | 'es' (defaults to 'en')
 *   useTranslations(lang)    -> the localized string dictionary
 *   useTranslatedPath(lang)  -> build a localized, trailing-slashed path
 *   getAlternatePath(url, l) -> same page in the other locale (for hreflang)
 */
import { ui, defaultLang, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg === 'es' || seg === 'en') return seg;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return ui[lang];
}

/**
 * Build a localized path. `useTranslatedPath('es')('contact')` -> '/es/contact/'.
 * Empty path returns the locale home: '/es/'.
 */
export function useTranslatedPath(lang: Lang) {
  return function translatePath(path = ''): string {
    const clean = path.replace(/^\/+|\/+$/g, '');
    return clean ? `/${lang}/${clean}/` : `/${lang}/`;
  };
}

/**
 * Localized slug pairs for pages whose path differs per locale.
 * Keyed by the path-after-locale in either language.
 */
const SLUG_PAIRS: Record<string, { en: string; es: string }> = {
  privacy: { en: 'privacy', es: 'privacidad' },
  privacidad: { en: 'privacy', es: 'privacidad' },
};

/** Same page in the other locale (used for hreflang + the language switcher). */
export function getAlternatePath(url: URL, target: Lang): string {
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts[0] === 'en' || parts[0] === 'es') parts.shift();
  const slug = parts.join('/');
  const mapped = SLUG_PAIRS[slug]?.[target] ?? slug;
  return mapped ? `/${target}/${mapped}/` : `/${target}/`;
}

export const locales: Lang[] = ['en', 'es'];
