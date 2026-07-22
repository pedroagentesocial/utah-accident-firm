import type { Lang } from '../i18n/ui';

/**
 * Three short lead-capture quizzes for the claim/repair service (NOT a law firm).
 * One question per screen. Smart behavior: `hint` guides a question, a per-option
 * `tip` reassures/explains on concerning answers (shown before advancing), and
 * `when` skips a step that doesn't apply. Each option has an `icon` (rendered by
 * Quiz.tsx). All three capture the lead the same way (name + phone + consent →
 * Resend) and NEVER promise an outcome, a payout amount, or legal advice.
 * Voice: es-US "tú", warm and plain.
 */
export type QuizIcon = 'shield' | 'umbrella' | 'wrench';
export type Answers = Record<string, string>;

export interface QuizOption {
  value: string;
  label: Record<Lang, string>;
  icon?: string;
  tip?: Record<Lang, string>;
}
export interface QuizStep {
  id: string;
  question: Record<Lang, string>;
  hint?: Record<Lang, string>;
  when?: (a: Answers) => boolean;
  options: QuizOption[];
}
export interface QuizResult {
  qualifyTitle: string;
  qualifyText: string;
  reviewTitle: string;
  reviewText: string;
}
export interface QuizDef {
  id: string;
  icon: QuizIcon;
  card: Record<Lang, { title: string; desc: string }>;
  steps: QuizStep[];
  result: Record<Lang, QuizResult>;
  assess: (a: Answers) => 'qualifies' | 'review';
}

export const quizzes: QuizDef[] = [
  // ── 1) Manage the claim ──────────────────────────────────────────────────
  {
    id: 'claim',
    icon: 'shield',
    card: {
      en: { title: 'Can we help with your claim?', desc: 'Free review' },
      es: { title: '¿Podemos ayudar con tu reclamo?', desc: 'Revisión gratis' },
    },
    steps: [
      {
        id: 'accident',
        question: { en: 'What kind of car accident was it?', es: '¿Qué tipo de accidente de auto tuviste?' },
        hint: { en: 'Pick the closest.', es: 'Elige la más parecida.' },
        options: [
          { value: 'rearEnd', icon: 'car', label: { en: 'Rear-ended', es: 'Me chocaron por detrás' } },
          { value: 'intersection', icon: 'car', label: { en: 'At an intersection', es: 'En una intersección' } },
          { value: 'pedestrian', icon: 'walk', label: { en: 'Pedestrian or bike', es: 'Peatón o bicicleta' } },
          { value: 'hitRun', icon: 'alert', label: { en: 'The other driver fled', es: 'El otro se dio a la fuga' } },
          { value: 'other', icon: 'help', label: { en: 'Another kind', es: 'Otro tipo' } },
        ],
      },
      {
        id: 'thirdParty',
        question: { en: 'Was another driver at fault?', es: '¿Fue culpa de otro conductor?' },
        options: [
          { value: 'yes', icon: 'check', label: { en: 'Yes', es: 'Sí' } },
          {
            value: 'no',
            icon: 'x',
            label: { en: 'No', es: 'No' },
            tip: {
              en: 'That is okay. Even if you share the blame, your own coverage (PIP or collision) can still pay part. We review it at no cost.',
              es: 'Tranquilo. Aun si compartes la culpa, tu propio seguro (PIP o colisión) puede pagar parte. Lo revisamos sin costo.',
            },
          },
          {
            value: 'unsure',
            icon: 'help',
            label: { en: 'Not sure', es: 'No estoy seguro' },
            tip: {
              en: 'Very common. Sorting out who pays is part of what we handle, no pressure.',
              es: 'Muy común. Aclarar quién paga es parte de lo que hacemos, sin presión.',
            },
          },
        ],
      },
      {
        id: 'medicalCare',
        question: { en: 'Did you get any medical care?', es: '¿Recibiste atención médica?' },
        options: [
          { value: 'yes', icon: 'check', label: { en: 'Yes', es: 'Sí' } },
          { value: 'soon', icon: 'clock', label: { en: 'Not yet, but soon', es: 'Todavía no, pronto' } },
          {
            value: 'no',
            icon: 'x',
            label: { en: 'No', es: 'No' },
            tip: {
              en: 'Getting checked matters, and those bills can be part of your claim. We can point you the right way.',
              es: 'Atenderte importa, y esas facturas pueden formar parte de tu reclamo. Te orientamos.',
            },
          },
        ],
      },
      {
        id: 'lawyer',
        question: { en: 'Do you already have a lawyer?', es: '¿Ya tienes un abogado?' },
        options: [
          { value: 'no', icon: 'check', label: { en: 'No', es: 'No' } },
          {
            value: 'yes',
            icon: 'user',
            label: { en: 'Yes', es: 'Sí' },
            tip: {
              en: 'Great. We handle the insurance claim and the repair, which works alongside your lawyer, we do not replace them.',
              es: 'Perfecto. Nosotros nos encargamos del reclamo de seguro y la reparación; eso funciona junto a tu abogado, sin reemplazarlo.',
            },
          },
        ],
      },
    ],
    result: {
      en: {
        qualifyTitle: 'It sounds like we can help.',
        qualifyText: 'We can file and manage your insurance claim and coordinate the repair. Leave your number and we will walk you through it, at no cost.',
        reviewTitle: 'Let us take a look together.',
        reviewText: 'Every accident is different. Tell us your number and we will review your situation and point you the right way.',
      },
      es: {
        qualifyTitle: 'Suena a que podemos ayudarte.',
        qualifyText: 'Podemos tramitar y gestionar tu reclamo de seguro y coordinar la reparación. Déjanos tu número y te explicamos paso a paso, sin costo.',
        reviewTitle: 'Veámoslo juntos.',
        reviewText: 'Cada accidente es distinto. Déjanos tu número y revisamos tu situación para orientarte.',
      },
    },
    assess: (a) => (a.thirdParty === 'yes' || a.medicalCare === 'yes' || a.thirdParty === 'unsure' ? 'qualifies' : 'review'),
  },

  // ── 2) Fight for a fair payout (insurance & coverage) ────────────────────
  {
    id: 'coverage',
    icon: 'umbrella',
    card: {
      en: { title: 'Insurance & coverage', desc: 'Who pays for your damages?' },
      es: { title: 'Seguro y cobertura', desc: '¿Quién paga tus daños?' },
    },
    steps: [
      {
        id: 'otherInsured',
        question: { en: 'Did the other driver have insurance?', es: '¿El otro conductor tenía seguro?' },
        options: [
          { value: 'yes', icon: 'check', label: { en: 'Yes', es: 'Sí' } },
          {
            value: 'no',
            icon: 'x',
            label: { en: 'No', es: 'No' },
            tip: {
              en: 'Your own uninsured motorist (UM) coverage may pay for your damages. We find it and handle it for you.',
              es: 'Tu cobertura de motorista sin seguro (UM) podría pagar tus daños. La buscamos y la gestionamos por ti.',
            },
          },
          {
            value: 'hitRun',
            icon: 'alert',
            label: { en: 'They fled the scene', es: 'Se dio a la fuga' },
            tip: {
              en: 'Even in a hit-and-run, your uninsured motorist (UM) coverage often applies. We help you use it.',
              es: 'Aun si se dio a la fuga, tu cobertura de motorista sin seguro (UM) suele aplicar. Te ayudamos a usarla.',
            },
          },
          { value: 'unsure', icon: 'help', label: { en: 'Not sure', es: 'No estoy seguro' } },
        ],
      },
      {
        id: 'ownInsurance',
        question: { en: 'Do you have your own auto insurance?', es: '¿Tienes seguro de auto propio?' },
        options: [
          { value: 'yes', icon: 'check', label: { en: 'Yes', es: 'Sí' } },
          { value: 'no', icon: 'x', label: { en: 'No', es: 'No' } },
          { value: 'unsure', icon: 'help', label: { en: 'Not sure', es: 'No estoy seguro' } },
        ],
      },
      {
        id: 'pip',
        question: { en: 'Do you have PIP or medical coverage?', es: '¿Tienes cobertura PIP o de gastos médicos?' },
        hint: { en: 'In Utah, most policies include it.', es: 'En Utah, casi todas las pólizas la incluyen.' },
        options: [
          { value: 'yes', icon: 'shield', label: { en: 'Yes', es: 'Sí' } },
          { value: 'no', icon: 'x', label: { en: 'No', es: 'No' } },
          {
            value: 'unsure',
            icon: 'help',
            label: { en: 'Not sure', es: 'No estoy seguro' },
            tip: {
              en: 'In Utah, PIP is required and pays the first medical bills no matter who was at fault. We make sure it is used.',
              es: 'En Utah el PIP es obligatorio y paga las primeras facturas médicas sin importar la culpa. Nos aseguramos de que se use.',
            },
          },
        ],
      },
      {
        // Skipped when the other driver fled: there is no at-fault insurer to have made an offer.
        id: 'settlement',
        question: { en: 'Has an insurer offered you a settlement?', es: '¿La aseguradora ya te ofreció un acuerdo?' },
        when: (a) => a.otherInsured !== 'hitRun',
        options: [
          {
            value: 'yes',
            icon: 'receipt',
            label: { en: 'Yes', es: 'Sí' },
            tip: {
              en: 'Do not sign before we review it. First offers are often low. We advocate for a fair payout.',
              es: 'No firmes antes de que lo revisemos: las primeras ofertas suelen quedarse cortas. Abogamos por un pago justo.',
            },
          },
          { value: 'no', icon: 'x', label: { en: 'No', es: 'No' } },
          { value: 'notYet', icon: 'clock', label: { en: 'They have not contacted me', es: 'Aún no me contactan' } },
        ],
      },
    ],
    result: {
      en: {
        qualifyTitle: 'There is likely coverage to work with.',
        qualifyText: 'We find the coverage that applies and manage the claim so you get a fair payout. Leave your number and we will handle it.',
        reviewTitle: 'There may still be a way.',
        reviewText: 'Coverage is not always obvious. Leave your number and we will check what applies to your case.',
      },
      es: {
        qualifyTitle: 'Es probable que haya cobertura para trabajar.',
        qualifyText: 'Encontramos la cobertura que aplica y gestionamos el reclamo para que recibas un pago justo. Déjanos tu número y lo manejamos.',
        reviewTitle: 'Aún puede haber una vía.',
        reviewText: 'La cobertura no siempre es obvia. Déjanos tu número y revisamos qué aplica a tu caso.',
      },
    },
    assess: (a) =>
      a.otherInsured === 'yes' || a.otherInsured === 'hitRun' || a.ownInsurance === 'yes' || a.pip === 'yes'
        ? 'qualifies'
        : 'review',
  },

  // ── 3) Coordinate the repair ─────────────────────────────────────────────
  {
    id: 'repair',
    icon: 'wrench',
    card: {
      en: { title: 'Your car & repair', desc: 'We coordinate the fix' },
      es: { title: 'Tu auto y tu reparación', desc: 'Coordinamos el arreglo' },
    },
    steps: [
      {
        id: 'damage',
        question: { en: 'How badly is your car damaged?', es: '¿Qué tan dañado quedó tu auto?' },
        options: [
          { value: 'drivable', icon: 'car', label: { en: 'Still drivable', es: 'Se puede manejar' } },
          { value: 'notDrivable', icon: 'wrench', label: { en: 'Not drivable', es: 'No se puede manejar' } },
          {
            value: 'totaled',
            icon: 'alert',
            label: { en: 'Totaled', es: 'Pérdida total' },
            tip: {
              en: 'If it is a total loss, we make sure the insurer pays what your car is really worth.',
              es: 'Si es pérdida total, nos aseguramos de que la aseguradora pague lo que tu auto realmente vale.',
            },
          },
        ],
      },
      {
        // A total loss has no repair to estimate; skip the shop question.
        id: 'shopEstimate',
        question: { en: 'Do you have a shop or an estimate yet?', es: '¿Ya tienes taller o estimado?' },
        when: (a) => a.damage !== 'totaled',
        options: [
          { value: 'yes', icon: 'check', label: { en: 'Yes', es: 'Sí' } },
          {
            value: 'no',
            icon: 'wrench',
            label: { en: 'No', es: 'No' },
            tip: {
              en: 'We coordinate the repair with a trusted shop and push back on the insurer’s estimate.',
              es: 'Coordinamos la reparación con un taller de confianza y peleamos el estimado con la aseguradora.',
            },
          },
        ],
      },
      {
        id: 'rental',
        question: { en: 'Do you need a car while yours is fixed?', es: '¿Necesitas auto mientras reparan el tuyo?' },
        options: [
          {
            value: 'yes',
            icon: 'car',
            label: { en: 'Yes', es: 'Sí' },
            tip: {
              en: 'Many policies cover a rental car. We arrange it for you.',
              es: 'Muchas pólizas cubren un auto de reemplazo. Lo gestionamos por ti.',
            },
          },
          { value: 'no', icon: 'x', label: { en: 'No', es: 'No' } },
        ],
      },
      {
        id: 'when',
        question: { en: 'When did the accident happen?', es: '¿Cuándo fue el accidente?' },
        options: [
          { value: 'thisWeek', icon: 'clock', label: { en: 'This week', es: 'Esta semana' } },
          { value: 'thisMonth', icon: 'calendar', label: { en: 'This month', es: 'Este mes' } },
          {
            value: 'longer',
            icon: 'calendar',
            label: { en: 'Longer ago', es: 'Hace más tiempo' },
            tip: {
              en: 'It is never too late to check. Reach out and we will tell you where you stand.',
              es: 'Nunca es tarde para revisar. Contáctanos y te decimos cómo estás.',
            },
          },
        ],
      },
    ],
    result: {
      en: {
        qualifyTitle: 'We can coordinate your repair.',
        qualifyText: 'We line up a trusted shop, handle the insurer, and can arrange a rental. Leave your number and we will get it moving.',
        reviewTitle: 'Let us help with your car.',
        reviewText: 'Tell us your number and we will look at the repair and what your policy covers, at no cost.',
      },
      es: {
        qualifyTitle: 'Podemos coordinar tu reparación.',
        qualifyText: 'Buscamos un taller de confianza, tratamos con la aseguradora y podemos gestionar un auto de reemplazo. Déjanos tu número y lo ponemos en marcha.',
        reviewTitle: 'Déjanos ayudarte con tu auto.',
        reviewText: 'Déjanos tu número y revisamos la reparación y lo que cubre tu póliza, sin costo.',
      },
    },
    assess: () => 'qualifies',
  },
];
