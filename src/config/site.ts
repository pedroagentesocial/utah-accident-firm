/**
 * Global, non-localized site configuration.
 * Business contact details (NAP) live in src/data/business.ts.
 */

export const SITE_URL = 'https://utahaccidentfirm.com';

export const DEFAULT_LOCALE = 'en' as const;
export const LOCALES = ['en', 'es'] as const;

/** BCP-47 / og:locale tags. Spanish is US Latino-neutral — NEVER es-ES. */
export const OG_LOCALE: Record<(typeof LOCALES)[number], string> = {
  en: 'en_US',
  es: 'es_US',
};

export const HREFLANG: Record<(typeof LOCALES)[number], string> = {
  en: 'en-US',
  es: 'es-US',
};
