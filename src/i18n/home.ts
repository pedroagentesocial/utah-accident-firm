/**
 * Home page content, English + US Spanish (es-US, Latino-neutral).
 * Tone: relief, "we take over", plain language, no legal/insurance jargon.
 * Rules: usted (no "vosotros"), dollars, Utah context. No em dashes.
 *
 * NOTE: pricing answers in the FAQ are intentionally generic (we don't invent a
 * fee model). Replace the TODO-marked lines with the client's real terms.
 */
import type { Lang } from './ui';

export const home = {
  en: {
    hero: {
      eyebrow: 'Utah · Free, no obligation',
      title: 'Had a car accident?',
      titleAccent: 'We take it from here.',
      subtitle:
        'Take a breath. We file your insurance claim, push for a fair payout, and get your car repaired, so you can focus on getting back to normal.',
      reassurance: 'A real person answers, same day. In English and Spanish.',
    },
    services: {
      kicker: 'What we do for you',
      title: 'Three things off your plate, starting today',
      intro:
        'After a crash there is a pile of calls, forms, and decisions. We handle all of it.',
      items: [
        {
          n: '01',
          title: 'Manage your claim',
          desc: 'We file and manage your auto insurance claim end to end. The paperwork, the phone calls, the deadlines, the adjusters: all handled.',
        },
        {
          n: '02',
          title: 'Fight for a fair payout',
          desc: 'Insurers tend to offer low. We know what your claim is really worth and push back, so you are not shortchanged.',
        },
        {
          n: '03',
          title: 'Coordinate the repair',
          desc: 'We line up a trusted shop, coordinate the estimate, and keep your repair moving until your car is back and right.',
        },
      ],
    },
    how: {
      kicker: 'How it works',
      title: 'Four calm steps, and we do most of them',
      intro: 'You stay in the loop. We do the heavy lifting.',
      steps: [
        { title: 'You reach out', desc: 'Call, WhatsApp, or send the form. One message is enough to start.' },
        { title: 'You tell us what happened', desc: 'A short, friendly conversation. We listen and explain your options in plain language.' },
        { title: 'We handle insurance and the shop', desc: 'We deal with the insurance company and the repair shop on your behalf, and keep you updated.' },
        { title: 'You get your car and your payout', desc: 'You drive away repaired and paid fairly. We stay on it until your claim is closed.' },
      ],
      note: 'No legal jargon. No runaround. Just your claim, handled.',
    },
    why: {
      kicker: 'Why not just do it yourself',
      title: 'Going it alone costs more than it looks',
      intro: 'The insurance process is built to wear you down. Here is the difference.',
      aloneTitle: 'On your own',
      alone: [
        'Hours on hold with the insurance company',
        'Easy to accept a lowball offer without realizing it',
        'One wrong word can reduce what you are paid',
        'Chasing the body shop and the estimate yourself',
      ],
      withUsTitle: 'With us',
      withUs: [
        'We make the calls and handle the paperwork',
        'We know what a fair payout actually looks like',
        'We protect your claim from costly mistakes',
        'We coordinate the repair from start to finish',
      ],
    },
    situations: {
      kicker: 'Situations we handle',
      title: 'If it happened on a Utah road, we can help',
      intro: 'Not sure if your case fits? Reach out and ask. It is free.',
      items: [
        'Rear-end collisions',
        'Intersection crashes',
        'Multi-car accidents',
        'Total loss',
        'Hit and run',
        'Uninsured or underinsured driver',
        'Disputed fault',
        'Rental and storage while you wait',
      ],
    },
    trust: {
      kicker: 'Why drivers trust us',
      title: 'Calm, bilingual help when you need it most',
      intro:
        'No pressure, no jargon. Just steady people who deal with insurance companies every day.',
      statsNote: 'Figures shown once verified.',
    },
    testimonials: {
      kicker: 'In their words',
      title: 'What clients say',
      intro: 'We only publish real, consented reviews from real clients.',
      emptyTitle: 'Real reviews, coming soon',
      emptyBody:
        'We will not post fake testimonials. As clients share their experience, their words will appear here.',
    },
    faq: {
      kicker: 'Questions',
      title: 'Straight answers, before you decide',
      items: [
        {
          q: 'How much does it cost?',
          // TODO: replace with the client's real terms.
          a: 'Your first conversation is free and there is no obligation. We will explain exactly how our service works, and any cost, before you decide anything.',
        },
        {
          q: 'How do you get paid?',
          // TODO: replace with the client's real fee model.
          a: 'We are upfront about how we are paid before you commit, so there are no surprises. You will know the terms before you agree to anything.',
        },
        {
          q: 'What if the accident was my fault?',
          a: 'You may still be able to recover for your vehicle and other costs, depending on your coverage. Tell us what happened and we will walk you through your options.',
        },
        {
          q: 'Do you work with my insurance company?',
          a: 'Yes. We work with all major insurers operating in Utah and deal with them directly on your behalf.',
        },
        {
          q: 'Are you a law firm or attorneys?',
          a: 'No. Utah Accident Firm is not a law firm and does not provide legal advice, services, or representation. We manage your insurance claim and coordinate your repair. For legal matters, please consult a licensed attorney.',
        },
        {
          q: 'How fast can you start?',
          a: 'Right away. The sooner you reach out after an accident, the more we can do. Call, WhatsApp, or send the form and we will respond fast.',
        },
        {
          q: 'Do you speak Spanish?',
          a: 'Yes, completely. You can do everything with us in English or Spanish.',
        },
      ],
    },
    contact: {
      kicker: 'Start your claim',
      title: 'Tell us what happened',
      intro:
        'Send a few details and we will get back to you fast. Prefer to talk now? Call or WhatsApp.',
      orReach: 'Or reach us directly',
    },
  },

  es: {
    hero: {
      eyebrow: 'Utah · Gratis y sin compromiso',
      title: '¿Tuviste un accidente de auto?',
      titleAccent: 'Nosotros nos encargamos.',
      subtitle:
        'Respira. Tramitamos su reclamo de seguro, abogamos por un pago justo y reparamos su auto, para que usted se enfoque en volver a la normalidad.',
      reassurance: 'Le contesta una persona real, el mismo día. En inglés y español.',
    },
    services: {
      kicker: 'Qué hacemos por usted',
      title: 'Tres cosas menos de qué preocuparse, desde hoy',
      intro:
        'Tras un choque hay un montón de llamadas, formularios y decisiones. Nosotros nos encargamos de todo.',
      items: [
        {
          n: '01',
          title: 'Gestionamos su reclamo',
          desc: 'Tramitamos y gestionamos su reclamo de seguro de auto de principio a fin. El papeleo, las llamadas, los plazos, los ajustadores: todo resuelto.',
        },
        {
          n: '02',
          title: 'Abogamos por un pago justo',
          desc: 'Las aseguradoras suelen ofrecer poco. Sabemos cuánto vale realmente su reclamo y lo defendemos, para que no le paguen de menos.',
        },
        {
          n: '03',
          title: 'Coordinamos la reparación',
          desc: 'Conseguimos un taller de confianza, coordinamos el presupuesto y damos seguimiento hasta que su auto esté reparado y bien.',
        },
      ],
    },
    how: {
      kicker: 'Cómo funciona',
      title: 'Cuatro pasos tranquilos, y casi todos los hacemos nosotros',
      intro: 'Usted se mantiene informado. Nosotros hacemos el trabajo pesado.',
      steps: [
        { title: 'Usted nos contacta', desc: 'Llame, escriba por WhatsApp o envíe el formulario. Con un solo mensaje empezamos.' },
        { title: 'Nos cuenta qué pasó', desc: 'Una conversación corta y amable. Escuchamos y le explicamos sus opciones en palabras claras.' },
        { title: 'Hablamos con el seguro y el taller', desc: 'Tratamos con la aseguradora y el taller en su nombre, y lo mantenemos al tanto.' },
        { title: 'Recibe su auto y su pago', desc: 'Se va con el auto reparado y pagado de forma justa. Seguimos hasta cerrar su reclamo.' },
      ],
      note: 'Sin jerga legal. Sin vueltas. Solo su reclamo, resuelto.',
    },
    why: {
      kicker: 'Por qué no hacerlo solo',
      title: 'Hacerlo solo cuesta más de lo que parece',
      intro: 'El proceso del seguro está hecho para cansarlo. Esta es la diferencia.',
      aloneTitle: 'Por su cuenta',
      alone: [
        'Horas en espera con la aseguradora',
        'Es fácil aceptar una oferta baja sin darse cuenta',
        'Una palabra equivocada puede reducir lo que le pagan',
        'Perseguir usted mismo al taller y el presupuesto',
      ],
      withUsTitle: 'Con nosotros',
      withUs: [
        'Nosotros hacemos las llamadas y el papeleo',
        'Sabemos cómo se ve realmente un pago justo',
        'Protegemos su reclamo de errores costosos',
        'Coordinamos la reparación de principio a fin',
      ],
    },
    situations: {
      kicker: 'Situaciones que atendemos',
      title: 'Si pasó en una carretera de Utah, podemos ayudar',
      intro: '¿No sabe si su caso aplica? Pregúntenos. Es gratis.',
      items: [
        'Choques por alcance',
        'Accidentes en intersecciones',
        'Accidentes de varios autos',
        'Pérdida total',
        'Choque y fuga',
        'Conductor sin seguro o con seguro insuficiente',
        'Culpa en disputa',
        'Auto de alquiler y almacenamiento mientras espera',
      ],
    },
    trust: {
      kicker: 'Por qué confían en nosotros',
      title: 'Ayuda tranquila y bilingüe cuando más la necesita',
      intro:
        'Sin presión y sin jerga. Gente firme que trata con aseguradoras todos los días.',
      statsNote: 'Las cifras se muestran una vez verificadas.',
    },
    testimonials: {
      kicker: 'En sus palabras',
      title: 'Lo que dicen los clientes',
      intro: 'Solo publicamos reseñas reales y con consentimiento de clientes reales.',
      emptyTitle: 'Reseñas reales, muy pronto',
      emptyBody:
        'No publicamos testimonios falsos. A medida que los clientes compartan su experiencia, sus palabras aparecerán aquí.',
    },
    faq: {
      kicker: 'Preguntas',
      title: 'Respuestas claras, antes de decidir',
      items: [
        {
          q: '¿Cuánto cuesta?',
          a: 'La primera conversación es gratis y sin compromiso. Le explicamos exactamente cómo funciona nuestro servicio, y cualquier costo, antes de que usted decida algo.',
        },
        {
          q: '¿Cómo cobran?',
          a: 'Somos claros sobre cómo cobramos antes de que usted se comprometa, así no hay sorpresas. Conocerá los términos antes de aceptar nada.',
        },
        {
          q: '¿Y si el accidente fue mi culpa?',
          a: 'Es posible que aún pueda recuperar por su vehículo y otros gastos, según su cobertura. Cuéntenos qué pasó y le explicamos sus opciones.',
        },
        {
          q: '¿Trabajan con mi aseguradora?',
          a: 'Sí. Trabajamos con todas las aseguradoras importantes que operan en Utah y tratamos con ellas directamente en su nombre.',
        },
        {
          q: '¿Son abogados?',
          a: 'No. Utah Accident Firm no es un despacho de abogados y no brinda asesoría, servicios ni representación legal. Gestionamos su reclamo de seguro y coordinamos su reparación. Para asuntos legales, consulte a un abogado con licencia.',
        },
        {
          q: '¿Qué tan rápido pueden empezar?',
          a: 'De inmediato. Mientras antes nos contacte tras el accidente, más podemos hacer. Llame, escriba por WhatsApp o envíe el formulario y respondemos rápido.',
        },
        {
          q: '¿Hablan español?',
          a: 'Sí, completamente. Puede hacer todo con nosotros en inglés o en español.',
        },
      ],
    },
    contact: {
      kicker: 'Inicie su reclamo',
      title: 'Cuéntenos qué pasó',
      intro:
        'Envíe unos datos y le respondemos rápido. ¿Prefiere hablar ahora? Llame o escriba por WhatsApp.',
      orReach: 'O contáctenos directamente',
    },
  },
} as const;

export type HomeContent = (typeof home)[Lang];
