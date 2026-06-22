/**
 * Testimonials.
 *
 * `testimonials` (REAL) stays empty until we have genuine, consented client
 * reviews. We do NOT publish invented quotes as real. Add real entries here
 * (with consent) and they replace the samples automatically.
 *
 * `sampleTestimonials` are clearly-labeled DEMO content used only to preview the
 * carousel design/animation. The UI shows an "Ejemplo / Sample" badge whenever
 * samples are being displayed, so they are never passed off as real reviews.
 * Flip nothing: as soon as `testimonials` has entries, the samples disappear.
 *
 * Example shape:
 *   { quote: { en: '...', es: '...' }, name: 'Maria G.', city: 'West Valley City',
 *     source: 'Google', rating: 5 }
 */
export interface Testimonial {
  /** If the original review is single-language, repeat it in both fields. */
  quote: { en: string; es: string };
  name: string;
  city?: string;
  source?: 'Google' | 'Facebook' | 'Yelp' | 'Direct';
  rating?: 1 | 2 | 3 | 4 | 5;
}

/** REAL, consented reviews. Empty on purpose — never fabricated. */
export const testimonials: Testimonial[] = [];

/**
 * DEMO ONLY — fictional, for design preview. Never presented as real (the UI
 * tags them as samples). Replace by adding real reviews to `testimonials`.
 */
export const sampleTestimonials: Testimonial[] = [
  {
    quote: {
      en: 'After my accident I was overwhelmed. They handled every call with the insurance and got my car fixed without me lifting a finger.',
      es: 'Después de mi accidente estaba abrumada. Ellos manejaron cada llamada con el seguro y repararon mi auto sin que yo moviera un dedo.',
    },
    name: 'María G.',
    city: 'West Valley City',
    source: 'Google',
    rating: 5,
  },
  {
    quote: {
      en: 'The insurance offered me way less than my claim was worth. They pushed back and I ended up with a fair payout.',
      es: 'El seguro me ofrecía mucho menos de lo que valía mi reclamo. Ellos lo defendieron y terminé con un pago justo.',
    },
    name: 'James T.',
    city: 'Sandy',
    source: 'Google',
    rating: 5,
  },
  {
    quote: {
      en: 'Everything in Spanish, from start to finish. They explained each step and I never felt lost.',
      es: 'Todo en español, de principio a fin. Me explicaron cada paso y nunca me sentí perdida.',
    },
    name: 'Rosa M.',
    city: 'Provo',
    source: 'Facebook',
    rating: 5,
  },
  {
    quote: {
      en: 'Fast, calm, and honest. They told me exactly what to expect and then delivered on it.',
      es: 'Rápidos, tranquilos y honestos. Me dijeron exactamente qué esperar y lo cumplieron.',
    },
    name: 'David K.',
    city: 'Salt Lake City',
    source: 'Google',
    rating: 5,
  },
  {
    quote: {
      en: 'I was worried my claim would be denied because of fault. They walked me through my options and stayed on it until it was resolved.',
      es: 'Temía que negaran mi reclamo por la culpa. Me explicaron mis opciones y siguieron en ello hasta resolverlo.',
    },
    name: 'Ana L.',
    city: 'Ogden',
    source: 'Direct',
    rating: 5,
  },
  {
    quote: {
      en: 'They coordinated the body shop and kept me updated the whole time. My car came back like new.',
      es: 'Coordinaron el taller y me mantuvieron al tanto todo el tiempo. Mi auto quedó como nuevo.',
    },
    name: 'Brandon P.',
    city: 'Lehi',
    source: 'Google',
    rating: 5,
  },
];

export const hasTestimonials = testimonials.length > 0;

/** What the section renders: real reviews if we have them, else demo samples. */
export const displayTestimonials = hasTestimonials ? testimonials : sampleTestimonials;

/** True when the displayed items are demo samples (drives the "Ejemplo" badge). */
export const testimonialsAreSamples = !hasTestimonials;
