/**
 * WhatsApp redirect. 302 to wa.me using the number from a SERVER env var
 * (WHATSAPP_NUMBER, never PUBLIC_) so the number never appears in page HTML
 * (anti-scraping / anti-spam). Click-triggered only; we never auto-open.
 *   GET /api/wa?lang=es  ->  302  https://wa.me/<number>?text=<prefilled>
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { WHATSAPP_NUMBER } from 'astro:env/server';

const messages = {
  en: 'Hi, I just had a car accident in Utah and need help with my insurance claim.',
  es: 'Hola, tuve un accidente de auto en Utah y necesito ayuda con mi reclamo de seguro.',
} as const;

export const GET: APIRoute = ({ url }) => {
  const lang = url.searchParams.get('lang') === 'es' ? 'es' : 'en';
  const number = (WHATSAPP_NUMBER ?? '13855550100').replace(/\D/g, ''); // TODO: real number
  const text = encodeURIComponent(messages[lang]);
  const target = `https://wa.me/${number}?text=${text}`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: target,
      'Cache-Control': 'no-store',
      'Referrer-Policy': 'no-referrer',
    },
  });
};
