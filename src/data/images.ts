/**
 * Curated stock imagery (Unsplash), PROVISIONAL until real brand photos exist.
 * URLs verified to resolve (HTTP 200). Alt text is bilingual and part of voice.
 * To swap: drop a real asset in /public and point the slot at it.
 */
function unsplash(id: string, w = 1400, q = 72) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const images = {
  // Hero full-bleed background: a calm Utah mountain road. Local asset (Unsplash,
  // free for commercial use), optimized in /public/img/hero-bg.jpg.
  heroBg: {
    src: '/img/hero-bg.jpg',
    alt: {
      en: 'A scenic mountain road winding through the Utah landscape',
      es: 'Un camino escénico de montaña a través del paisaje de Utah',
    },
  },
  // Hero: a person in their car, calmly making a call after an incident.
  heroCall: {
    src: unsplash('1685893417834-1fb3b2a7121f', 1300),
    alt: {
      en: 'A driver sitting calmly in their car, making a phone call for help',
      es: 'Una conductora sentada con calma en su auto, haciendo una llamada para pedir ayuda',
    },
  },
  // Utah landscape band: Salt Lake valley with the Wasatch range.
  utahRoad: {
    src: unsplash('1669422498933-6e65208f9a02', 1800),
    alt: {
      en: 'Mountains rising over the Salt Lake valley in Utah',
      es: 'Montañas sobre el valle de Salt Lake en Utah',
    },
  },
  // Contact: a real person on a headset, ready to help. Local asset (Unsplash,
  // free for commercial use), optimized in /public/img/support.jpg.
  support: {
    src: '/img/support.jpg',
    alt: {
      en: 'A friendly team member wearing a headset, ready to help by phone',
      es: 'Un miembro del equipo con audífonos, listo para ayudar por teléfono',
    },
  },
} as const;

/** Default Open Graph / Twitter share image (1200x630). PROVISIONAL stock. */
export const OG_IMAGE =
  'https://images.unsplash.com/photo-1685893417834-1fb3b2a7121f?auto=format&fit=crop&w=1200&h=630&q=70';
