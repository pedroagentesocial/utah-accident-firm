// @ts-check
import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync, readFileSync } from 'node:fs';

// Mientras todos los artículos sean borradores, el índice del blog lleva noindex;
// tampoco debe ir en el sitemap (señales contradictorias para Google).
const blogDir = new URL('./src/content/blog/', import.meta.url);
const hasPublishedPosts = ['en', 'es'].some((l) =>
  readdirSync(new URL(`${l}/`, blogDir)).some((f) => !/^draft:\s*true/m.test(readFileSync(new URL(`${l}/${f}`, blogDir), 'utf8'))),
);

// https://astro.build/config
export default defineConfig({
  // Canonical production origin. Used for SEO (canonical/hreflang), sitemap, JSON-LD.
  site: 'https://www.utahaccidentfirm.com',
  trailingSlash: 'always',

  // Native Astro i18n. Both locales are prefixed (/en/, /es/); "/" redirects to /en/.
  // Spanish is es-US (Latino-neutral), never es-ES.
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  redirects: {
    '/': '/en/',
  },

  integrations: [
    react(),
    sitemap({
      filter: (page) => hasPublishedPosts || !/\/blog\/$/.test(page),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', es: 'es-US' },
      },
    }),
    // GA4 runs off the main thread via Partytown.
    partytown({ config: { forward: ['dataLayer.push', 'gtag'] } }),
  ],

  adapter: vercel(),

  // Type-safe environment variables (astro:env). Secrets stay server-only.
  env: {
    schema: {
      // --- Contact form (Resend) — server secrets, never shipped to the client ---
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_TO_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_FROM_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      // WhatsApp + phone are server-side (rendered into HTML at build), not PUBLIC_.
      WHATSAPP_NUMBER: envField.string({ context: 'server', access: 'secret', optional: true }),
      PHONE_NUMBER: envField.string({ context: 'server', access: 'secret', optional: true }),
      // --- Analytics — public, exposed to the client for the GA4 snippet ---
      PUBLIC_GA4_ID: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
