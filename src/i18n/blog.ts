/**
 * Blog UI strings, EN + US Spanish. The blog is linked ONLY from the footer:
 * the home page keeps a single conversion path, and these articles exist to be
 * found in search, not to pull visitors out of the funnel.
 */
import type { Lang } from './ui';

interface BlogUi {
  title: string;
  heading: string;
  intro: string;
  readMore: string;
  allPosts: string;
  backHome: string;
  published: string;
  updated: string;
  empty: string;
  seoTitle: string;
  seoDescription: string;
}

export const blog: Record<Lang, BlogUi> = {
  en: {
    title: 'Blog',
    heading: 'Claims and repairs,|explained in plain language',
    intro:
      'Plain-language guides on insurance claims, payouts and vehicle repair after a car accident in Utah.',
    readMore: 'Read article',
    allPosts: 'All articles',
    backHome: 'Back to home',
    published: 'Published',
    updated: 'Updated',
    empty: 'New articles coming soon.',
    seoTitle: 'Blog — Auto insurance claims and repairs in Utah | Utah Accident Firm',
    seoDescription:
      'Guides on what to do after a car accident in Utah: the claim, the payout, the adjuster and getting your vehicle repaired.',
  },
  es: {
    title: 'Blog',
    heading: 'Reclamos y reparaciones,|explicados en palabras simples',
    intro:
      'Guías claras sobre reclamos de seguro, pagos y reparación de tu vehículo después de un accidente de auto en Utah.',
    readMore: 'Leer artículo',
    allPosts: 'Todos los artículos',
    backHome: 'Volver al inicio',
    published: 'Publicado',
    updated: 'Actualizado',
    empty: 'Pronto publicaremos nuevos artículos.',
    seoTitle: 'Blog — Reclamos de seguro y reparación en Utah | Utah Accident Firm',
    seoDescription:
      'Guías sobre qué hacer tras un accidente de auto en Utah: el reclamo, el pago, el ajustador y la reparación de tu vehículo.',
  },
};
