/**
 * Home page content, English + US Spanish (es-US, Latino-neutral).
 * Tone: relief, "we take over", plain language, no legal/insurance jargon.
 * Rules: Spanish uses tú (informal, close; no "vosotros"), dollars, Utah context. No em dashes.
 *
 * NOTE: pricing answers in the FAQ are intentionally generic (we don't invent a
 * fee model). Replace the TODO-marked lines with the client's real terms.
 */
import type { Lang } from './ui';

export const home = {
  en: {
    hero: {
      // Two rotating angles so the hero speaks to different visitors:
      // 1) emotional relief, 2) the payout / bilingual outcome.
      slides: [
        {
          eyebrow: 'Utah · Free, no obligation',
          title: 'Had a car accident?',
          titleAccent: 'We take it|from here.',
          subtitle:
            'Take a breath. We file your insurance claim, push for a fair payout, and get your car repaired, so you can focus on getting back to normal.',
        },
        {
          eyebrow: 'English & Spanish · Same-day reply',
          title: 'Insurance offer|feels low?',
          titleAccent: 'We push for|what’s fair.',
          subtitle:
            'Insurers start low and move fast. We handle the claim, the calls, and the paperwork, and push for what your accident is really worth.',
        },
      ],
      reassurance: 'A real person answers, same day. In English and Spanish.',
    },
    services: {
      kicker: 'What we do for you',
      title: 'Three things off your plate,|starting today',
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
      title: 'Four calm steps,|and we do most of them',
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
      title: 'Going it alone|costs more than it looks',
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
      title: 'If it happened on a Utah road,|we can help',
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
      title: 'Calm, bilingual help|when you need it most',
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
      sampleBadge: 'Sample',
      sampleNote: 'Illustrative examples to preview the layout. Real, consented client reviews will appear here.',
    },
    faq: {
      kicker: 'Questions',
      title: 'Straight answers,|before you decide',
      more: 'Still have a question?',
      moreBody: 'Ask us directly. A real person answers, in English or Spanish, and the first conversation is free.',
      cta: 'Start my claim',
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
      // Dos ángulos que rotan para hablarle a distintos visitantes:
      // 1) alivio emocional, 2) el pago justo / atención bilingüe.
      slides: [
        {
          eyebrow: 'Utah · Gratis y sin compromiso',
          title: '¿Tuviste un choque?',
          titleAccent: 'Nosotros|nos encargamos.',
          subtitle:
            'Respira. Tramitamos tu reclamo de seguro, abogamos por un pago justo y reparamos tu auto, para que te enfoques en volver a la normalidad.',
        },
        {
          eyebrow: 'Español e inglés · Respuesta el mismo día',
          title: '¿La oferta es baja?',
          titleAccent: 'Nosotros buscamos|un pago justo.',
          subtitle:
            'Las aseguradoras ofrecen poco y se mueven rápido. Manejamos el reclamo, las llamadas y el papeleo, y luchamos por lo que tu accidente realmente vale.',
        },
      ],
      reassurance: 'Te contesta una persona real, el mismo día. En inglés y español.',
    },
    services: {
      kicker: 'Qué hacemos por ti',
      title: 'Tres cosas menos de qué preocuparse,|desde hoy',
      intro:
        'Después de un choque hay un montón de llamadas, formularios y decisiones. Nosotros nos encargamos de todo.',
      items: [
        {
          n: '01',
          title: 'Gestionamos tu reclamo',
          desc: 'Tramitamos tu reclamo de seguro de auto de principio a fin: el papeleo, las llamadas, los plazos y los ajustadores, todo resuelto.',
        },
        {
          n: '02',
          title: 'Abogamos por un pago justo',
          desc: 'Las aseguradoras suelen ofrecer poco. Sabemos cuánto vale realmente tu reclamo y lo defendemos, para que no te paguen de menos.',
        },
        {
          n: '03',
          title: 'Coordinamos la reparación',
          desc: 'Conseguimos un taller de confianza, coordinamos el presupuesto y damos seguimiento hasta que tu auto quede reparado y en buenas condiciones.',
        },
      ],
    },
    how: {
      kicker: 'Cómo funciona',
      title: 'Cuatro pasos sencillos,|y casi todos los hacemos nosotros',
      intro: 'Tú te mantienes informado. Nosotros hacemos el trabajo pesado.',
      steps: [
        { title: 'Tú nos contactas', desc: 'Llama, escribe por WhatsApp o envía el formulario. Con un solo mensaje empezamos.' },
        { title: 'Nos cuentas qué pasó', desc: 'Una conversación corta y amable. Escuchamos y te explicamos tus opciones con palabras sencillas.' },
        { title: 'Hablamos con el seguro y el taller', desc: 'Tratamos con la aseguradora y el taller en tu nombre, y te mantenemos al tanto.' },
        { title: 'Recibes tu auto y tu pago', desc: 'Te vas con tu auto reparado y con un pago justo. Seguimos hasta cerrar tu reclamo.' },
      ],
      note: 'Sin términos legales complicados. Sin vueltas. Solo tu reclamo, resuelto.',
    },
    why: {
      kicker: '¿Por qué no hacerlo por ti mismo?',
      title: 'Hacerlo solo sale|más caro de lo que crees',
      intro: 'El proceso del seguro está diseñado para agotarte. Esta es la diferencia.',
      aloneTitle: 'Por ti mismo',
      alone: [
        'Horas en espera con la aseguradora',
        'Es fácil aceptar una oferta baja sin darte cuenta',
        'Una palabra equivocada puede reducir lo que te pagan',
        'Andar tú mismo detrás del taller y el presupuesto',
      ],
      withUsTitle: 'Con nosotros',
      withUs: [
        'Nosotros hacemos las llamadas y el papeleo',
        'Sabemos en qué consiste un pago justo de verdad',
        'Protegemos tu reclamo de errores costosos',
        'Coordinamos la reparación de principio a fin',
      ],
    },
    situations: {
      kicker: 'Situaciones que atendemos',
      title: 'Si pasó en una carretera de Utah,|podemos ayudar',
      intro: '¿No sabes si tu caso aplica? Pregúntanos. Es gratis.',
      items: [
        'Choques por alcance',
        'Accidentes en intersecciones',
        'Accidentes de varios autos',
        'Pérdida total',
        'Choque y fuga',
        'Conductor sin seguro o con seguro insuficiente',
        'Disputas por la culpa',
        'Auto de alquiler y almacenamiento mientras esperas',
      ],
    },
    trust: {
      kicker: 'Por qué confían en nosotros',
      title: 'Te ayudamos con calma,|en español e inglés,|cuando más lo necesitas',
      intro:
        'Sin presión ni términos complicados. Gente con experiencia que trata con aseguradoras todos los días.',
      statsNote: 'Las cifras se muestran una vez verificadas.',
    },
    testimonials: {
      kicker: 'En sus palabras',
      title: 'Lo que dicen los clientes',
      intro: 'Solo publicamos reseñas reales y con consentimiento de clientes reales.',
      emptyTitle: 'Reseñas reales, muy pronto',
      emptyBody:
        'No publicamos testimonios falsos. A medida que los clientes compartan su experiencia, sus palabras aparecerán aquí.',
      sampleBadge: 'Ejemplo',
      sampleNote: 'Ejemplos ilustrativos para previsualizar el diseño. Aquí aparecerán reseñas reales de clientes, con su consentimiento.',
    },
    faq: {
      kicker: 'Preguntas',
      title: 'Respuestas claras,|antes de decidir',
      more: '¿Aún tienes dudas?',
      moreBody: 'Pregúntanos directamente. Te responde una persona real, en inglés o español, y la primera conversación es gratis.',
      cta: 'Iniciar mi reclamo',
      items: [
        {
          q: '¿Cuánto cuesta?',
          a: 'La primera conversación es gratis y sin compromiso. Te explicamos exactamente cómo funciona nuestro servicio, y cualquier costo, antes de que decidas algo.',
        },
        {
          q: '¿Cómo cobran?',
          a: 'Somos claros sobre cómo cobramos antes de que te comprometas, así no hay sorpresas. Conocerás los términos antes de aceptar nada.',
        },
        {
          q: '¿Y si el accidente fue mi culpa?',
          a: 'Es posible que aún puedas recibir compensación por tu vehículo y otros gastos, según tu cobertura. Cuéntanos qué pasó y te explicamos tus opciones.',
        },
        {
          q: '¿Trabajan con mi aseguradora?',
          a: 'Sí. Trabajamos con todas las aseguradoras importantes que operan en Utah y tratamos con ellas directamente en tu nombre.',
        },
        {
          q: '¿Son abogados?',
          a: 'No. Utah Accident Firm no es un despacho de abogados y no brinda asesoría, servicios ni representación legal. Gestionamos tu reclamo de seguro y coordinamos tu reparación. Para asuntos legales, consulta a un abogado con licencia.',
        },
        {
          q: '¿Qué tan rápido pueden empezar?',
          a: 'De inmediato. Cuanto antes nos contactes después del accidente, más podemos hacer. Llama, escribe por WhatsApp o envía el formulario y respondemos rápido.',
        },
        {
          q: '¿Hablan español?',
          a: 'Sí, completamente. Puedes hacer todo con nosotros en inglés o en español.',
        },
      ],
    },
    contact: {
      kicker: 'Inicia tu reclamo',
      title: 'Cuéntanos qué pasó',
      intro:
        'Envíanos algunos datos y te respondemos rápido. ¿Prefieres hablar ahora? Llama o escribe por WhatsApp.',
      orReach: 'O contáctanos directamente',
    },
  },
} as const;

export type HomeContent = (typeof home)[Lang];
