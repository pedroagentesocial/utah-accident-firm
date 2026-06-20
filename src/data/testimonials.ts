/**
 * Real client testimonials.
 * ⚠️ EMPTY ON PURPOSE — no real reviews provided yet. We do NOT invent reviews.
 * Add real entries below (with consent). While this array is empty, the
 * Testimonials section renders an honest "reviews coming" state instead of
 * fabricated quotes.
 *
 * Example shape (do not ship until real & consented):
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

export const testimonials: Testimonial[] = [];

export const hasTestimonials = testimonials.length > 0;
