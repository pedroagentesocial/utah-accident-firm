/**
 * Localized UI strings. English + US Spanish (es-US, Latino-neutral).
 * RULES: no "vosotros", no peninsular spellings, dollars, Utah context.
 *
 * Page-level marketing copy will be added per section as we build. This file
 * currently holds the shared chrome (nav, footer, CTAs) and the MANDATORY
 * legal disclaimer.
 */

export const languages = { en: 'English', es: 'Español' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    nav: {
      home: 'Home',
      how: 'How it works',
      services: 'What we do',
      areas: 'Areas we serve',
      situations: 'Situations',
      faq: 'FAQ',
      contact: 'Contact',
      call: 'Call',
      whatsapp: 'WhatsApp',
      getStarted: 'Start my claim',
      menu: 'Menu',
      close: 'Close',
    },
    common: {
      skipToContent: 'Skip to content',
      langLabel: 'Language',
      free: 'Free, no obligation',
      respond: 'We respond fast',
    },
    channels: {
      call: 'Call us',
      callShort: 'Call',
      whatsapp: 'WhatsApp',
      form: 'Send a message',
      formShort: 'Message',
      available: 'We answer in English and Spanish',
    },
    form: {
      name: 'Your name',
      phone: 'Phone',
      email: 'Email (optional)',
      city: 'City',
      message: 'What happened?',
      messagePlaceholder: 'A few words about your accident…',
      consent: 'I agree to be contacted about my inquiry and accept the',
      privacyLink: 'Privacy Policy',
      submit: 'Send',
      sending: 'Sending…',
      successTitle: 'Got it. We will be in touch shortly.',
      successBody: 'Thanks for reaching out. If it is urgent, call or WhatsApp us now.',
      errorTitle: 'Something went wrong.',
      errorBody: 'Please try again, or call or WhatsApp us directly.',
      required: 'Required',
      invalidEmail: 'Enter a valid email',
      consentRequired: 'Please agree to be contacted',
    },
    // ⚠️ LEGAL — must stay visible. Do not soften or remove.
    disclaimer: {
      heading: 'Important: we are not a law firm',
      short:
        'Utah Accident Firm is not a law firm and does not provide legal advice or representation.',
      full:
        'Utah Accident Firm is not a law firm and does not provide legal advice, legal services, or legal representation. We are an insurance claim management service: we file and manage your auto insurance claim, advocate for a fair payout, and coordinate the repair of your vehicle. For legal matters, please consult a licensed attorney.',
    },
    quiz: {
      kicker: 'Free, no obligation',
      title: 'See how we can help, in about a minute',
      intro: 'Answer a few quick questions and we will tell you where you stand. No cost, no legal jargon.',
      pick: 'What do you need help with?',
      progress: 'Step {n} of {total}',
      back: 'Back',
      chooseAnother: 'Choose another',
      continueLabel: 'Continue',
      summary: 'Your answers:',
      contactHeading: 'Where can we reach you?',
      contactSub: 'Leave your number and we will call you back, usually the same day.',
      name: 'Your name',
      phone: 'Phone',
      email: 'Email (optional)',
      consent: 'I agree to be contacted about my accident and accept the',
      privacyLink: 'Privacy Policy',
      consentAfter: '.',
      submit: 'See my result',
      submitting: 'Sending…',
      captured: 'Got it, we have your info.',
      error: 'Something went wrong. Please call or WhatsApp us.',
      disclaimer: 'Utah Accident Firm is not a law firm and does not give legal advice.',
      errors: {
        name: 'Please enter your name',
        phone: 'Please enter a phone number',
        consent: 'Please agree to be contacted',
      },
    },
    footer: {
      tagline: 'Insurance claim management & vehicle repair coordination across Utah.',
      hours: 'Hours',
      serving: 'Serving',
      contact: 'Contact',
      rights: 'All rights reserved.',
      closed: 'Closed',
      privacy: 'Privacy Policy',
      follow: 'Follow us',
      // Shown on the social marks whose account does not exist yet.
      comingSoon: 'Coming soon',
    },
    weekdays: { Mon: 'Mon', Tue: 'Tue', Wed: 'Wed', Thu: 'Thu', Fri: 'Fri', Sat: 'Sat', Sun: 'Sun' } as Record<string, string>,
    seo: {
      home: {
        title: 'Utah Accident Firm — Auto Insurance Claim Help in Utah',
        description:
          'After a car accident in Utah, we handle your insurance claim, fight for a fair payout, and coordinate your vehicle repair. Not a law firm. Free consultation.',
      },
    },
  },

  es: {
    nav: {
      home: 'Inicio',
      how: 'Cómo funciona',
      services: 'Qué hacemos',
      areas: 'Áreas que servimos',
      situations: 'Situaciones',
      faq: 'Preguntas',
      contact: 'Contacto',
      call: 'Llamar',
      whatsapp: 'WhatsApp',
      getStarted: 'Iniciar mi reclamo',
      menu: 'Menú',
      close: 'Cerrar',
    },
    common: {
      skipToContent: 'Saltar al contenido',
      langLabel: 'Idioma',
      free: 'Gratis y sin compromiso',
      respond: 'Respondemos rápido',
    },
    channels: {
      call: 'Llámanos',
      callShort: 'Llamar',
      whatsapp: 'WhatsApp',
      form: 'Enviar mensaje',
      formShort: 'Mensaje',
      available: 'Atendemos en inglés y español',
    },
    form: {
      name: 'Tu nombre',
      phone: 'Teléfono',
      email: 'Correo (opcional)',
      city: 'Ciudad',
      message: '¿Qué pasó?',
      messagePlaceholder: 'Unas palabras sobre tu accidente…',
      consent: 'Acepto que me contacten sobre mi consulta y acepto la',
      privacyLink: 'Política de Privacidad',
      submit: 'Enviar',
      sending: 'Enviando…',
      successTitle: 'Listo. Te contactaremos muy pronto.',
      successBody: 'Gracias por escribir. Si es urgente, llama o escribe por WhatsApp ahora.',
      errorTitle: 'Algo salió mal.',
      errorBody: 'Inténtalo de nuevo, o contáctanos por llamada o WhatsApp.',
      required: 'Requerido',
      invalidEmail: 'Ingresa un correo válido',
      consentRequired: 'Por favor acepta que te contactemos',
    },
    // ⚠️ LEGAL — debe permanecer visible. No suavizar ni eliminar.
    disclaimer: {
      heading: 'Importante: no somos un despacho de abogados',
      short:
        'Utah Accident Firm no es un despacho de abogados y no brinda asesoría ni representación legal.',
      full:
        'Utah Accident Firm no es un despacho de abogados y no brinda asesoría legal, servicios legales ni representación legal. Somos un servicio de gestión de reclamos de seguro: tramitamos y gestionamos tu reclamo de seguro de auto, abogamos por un pago justo y coordinamos la reparación de tu vehículo. Para asuntos legales, consulta a un abogado con licencia.',
    },
    quiz: {
      kicker: 'Gratis y sin compromiso',
      title: 'Descubre cómo podemos ayudarte, en un minuto',
      intro: 'Responde unas preguntas rápidas y te decimos cómo estás. Sin costo y sin jerga legal.',
      pick: '¿Con qué necesitas ayuda?',
      progress: 'Paso {n} de {total}',
      back: 'Atrás',
      chooseAnother: 'Elegir otro',
      continueLabel: 'Continuar',
      summary: 'Tus respuestas:',
      contactHeading: '¿Dónde te contactamos?',
      contactSub: 'Déjanos tu número y te llamamos, normalmente el mismo día.',
      name: 'Tu nombre',
      phone: 'Teléfono',
      email: 'Correo (opcional)',
      consent: 'Acepto que me contacten sobre mi accidente y acepto la',
      privacyLink: 'Política de Privacidad',
      consentAfter: '.',
      submit: 'Ver mi resultado',
      submitting: 'Enviando…',
      captured: 'Listo, tenemos tus datos.',
      error: 'Algo salió mal. Llámanos o escríbenos por WhatsApp.',
      disclaimer: 'Utah Accident Firm no es un despacho de abogados y no da asesoría legal.',
      errors: {
        name: 'Ingresa tu nombre',
        phone: 'Ingresa un teléfono',
        consent: 'Acepta que te contactemos',
      },
    },
    footer: {
      tagline: 'Gestión de reclamos de seguro y coordinación de reparación de autos en Utah.',
      hours: 'Horario',
      serving: 'Servimos',
      contact: 'Contacto',
      rights: 'Todos los derechos reservados.',
      closed: 'Cerrado',
      privacy: 'Política de Privacidad',
      follow: 'Síguenos',
      comingSoon: 'Próximamente',
    },
    weekdays: { Mon: 'Lun', Tue: 'Mar', Wed: 'Mié', Thu: 'Jue', Fri: 'Vie', Sat: 'Sáb', Sun: 'Dom' } as Record<string, string>,
    seo: {
      home: {
        title: 'Utah Accident Firm — Ayuda con Reclamos de Seguro de Auto en Utah',
        description:
          'Después de un accidente de auto en Utah, gestionamos tu reclamo de seguro, abogamos por un pago justo y coordinamos la reparación de tu vehículo. No somos abogados. Consulta gratis.',
      },
    },
  },
} as const;

export type UI = (typeof ui)[Lang];
