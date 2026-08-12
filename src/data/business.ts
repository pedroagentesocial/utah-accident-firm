/**
 * Business identity & NAP (Name / Address / Phone) — single source of truth.
 * Feeds the footer, contact page, JSON-LD LocalBusiness, and tel:/wa.me links.
 *
 * ⚠️  PLACEHOLDER VALUES marked TODO must be confirmed before launch.
 * Phone / WhatsApp / contact emails come from server env when set, with
 * provisional fallbacks here so the site renders during development.
 */
import { PHONE_NUMBER, WHATSAPP_NUMBER, CONTACT_TO_EMAIL } from 'astro:env/server';

/** Digits-only E.164 for tel: / wa.me links. */
const phoneRaw = PHONE_NUMBER ?? '+13855550100'; // TODO: real Utah number (801/385)
const whatsappRaw = WHATSAPP_NUMBER ?? '13855550100'; // TODO: real WhatsApp number

/** Format +1XXXXXXXXXX → (XXX) XXX-XXXX for display. */
function formatUsPhone(e164: string): string {
  const d = e164.replace(/\D/g, '').replace(/^1/, '');
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : e164;
}

export const business = {
  // What the company IS — important for the legal disclaimer & schema.
  name: 'Utah Accident Firm',
  legalName: 'Utah Accident Firm LLC', // TODO: confirm legal entity name
  // NOT a law firm. Insurance claim management & repair coordination.
  serviceType: {
    en: 'Auto insurance claim management & repair coordination',
    es: 'Gestión de reclamos de seguro de auto y coordinación de reparación',
  },

  phone: phoneRaw,
  phoneDisplay: formatUsPhone(phoneRaw),
  whatsapp: whatsappRaw,
  email: CONTACT_TO_EMAIL ?? 'hello@utahaccidentfirm.com', // TODO: confirm inbox

  address: {
    // TODO: confirm full physical address (required for LocalBusiness schema).
    street: '123 Main St, Suite 100',
    city: 'Salt Lake City',
    region: 'UT',
    regionName: 'Utah',
    postalCode: '84101',
    country: 'US',
  },

  // Approximate Salt Lake City coords — TODO: replace with real office geo.
  geo: { lat: 40.7608, lng: -111.891 },

  // Service area across Utah — real cities only.
  areaServed: {
    state: 'Utah',
    cities: [
      'Salt Lake City',
      'West Valley City',
      'West Jordan',
      'Sandy',
      'Murray',
      'Provo',
      'Ogden',
    ],
  },

  // Business hours (24h, local MT). TODO: confirm.
  hours: [
    { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], opens: '08:00', closes: '18:00' },
    { days: ['Sat'], opens: '09:00', closes: '14:00' },
  ],

  /**
   * The FIVE networks the brand always shows, in display order, even before
   * every account exists. An empty `url` renders as a muted "coming soon" mark
   * instead of a link, so we never publish a 404 or point at a handle someone
   * else could squat. Fill the url in and it becomes a real link AND joins the
   * LocalBusiness `sameAs` automatically.
   *
   * Set `showPending: false` to hide the not-yet-created ones.
   */
  social: {
    showPending: true,
    profiles: [
      { key: 'facebook', label: 'Facebook', url: '' },
      { key: 'instagram', label: 'Instagram', url: '' },
      { key: 'tiktok', label: 'TikTok', url: '' },
      { key: 'youtube', label: 'YouTube', url: '' },
      { key: 'linkedin', label: 'LinkedIn', url: '' },
    ],
  },
} as const;

/** Live profile URLs only — what schema.org `sameAs` is allowed to claim. */
export const socialSameAs: string[] = business.social.profiles.filter((p) => p.url).map((p) => p.url);

export type Business = typeof business;
export type SocialKey = (typeof business.social.profiles)[number]['key'];
