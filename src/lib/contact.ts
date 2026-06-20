/** Contact link builders shared across the site. */
import { business } from '../data/business';
import type { Lang } from '../i18n/ui';

export const telHref = `tel:${business.phone}`;

/**
 * WhatsApp link points at our own /api/wa redirect, NOT directly at wa.me, so
 * the phone number stays server-side (out of the HTML). The redirect adds the
 * prefilled message. Click-triggered only.
 */
export function whatsappHref(lang: Lang): string {
  return `/api/wa/?lang=${lang}`;
}

/** Localized Privacy Policy path (slug differs per locale). */
export function privacyHref(lang: Lang): string {
  return lang === 'es' ? '/es/privacidad/' : '/en/privacy/';
}
