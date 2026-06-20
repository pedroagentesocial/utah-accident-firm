/**
 * Trust figures for the "Confianza" section.
 * ⚠️ PLACEHOLDERS — real numbers not yet provided. `verified: false` means the
 * UI renders them as clearly-labeled examples (not presented as fact). Set the
 * real values and flip `verified: true` to show them as real metrics.
 * NEVER present unverified numbers as real. If nothing is verified, the section
 * shows a qualitative trust message instead of fake stats.
 */
export interface TrustStat {
  /** numeric/string value, e.g. '500+', '$2.4M', '37%' */
  value: string;
  label: { en: string; es: string };
}

export const trustVerified = false; // flip to true once real figures are in

export const trustStats: TrustStat[] = [
  { value: '—', label: { en: 'Years helping Utah drivers', es: 'Años ayudando a conductores de Utah' } },
  { value: '—', label: { en: 'Claims handled', es: 'Reclamos gestionados' } },
  { value: '—', label: { en: 'Recovered for clients', es: 'Recuperado para clientes' } },
];

/** Qualitative trust points — always true, no numbers required. */
export const trustPoints = {
  en: [
    'Bilingual help, start to finish, in English and Spanish',
    'We deal with the insurance company so you don’t have to',
    'No upfront cost to talk through your accident',
  ],
  es: [
    'Atención bilingüe de principio a fin, en inglés y español',
    'Hablamos con la aseguradora para que usted no tenga que hacerlo',
    'Sin costo inicial para conversar sobre su accidente',
  ],
};
