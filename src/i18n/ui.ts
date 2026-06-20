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
    footer: {
      tagline: 'Insurance claim management & vehicle repair coordination across Utah.',
      hours: 'Hours',
      serving: 'Serving',
      contact: 'Contact',
      rights: 'All rights reserved.',
      closed: 'Closed',
      privacy: 'Privacy Policy',
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
      call: 'Llámenos',
      callShort: 'Llamar',
      whatsapp: 'WhatsApp',
      form: 'Enviar mensaje',
      formShort: 'Mensaje',
      available: 'Atendemos en inglés y español',
    },
    form: {
      name: 'Su nombre',
      phone: 'Teléfono',
      email: 'Correo (opcional)',
      city: 'Ciudad',
      message: '¿Qué pasó?',
      messagePlaceholder: 'Unas palabras sobre su accidente…',
      consent: 'Acepto que me contacten sobre mi consulta y acepto la',
      privacyLink: 'Política de Privacidad',
      submit: 'Enviar',
      sending: 'Enviando…',
      successTitle: 'Listo. Le contactaremos muy pronto.',
      successBody: 'Gracias por escribir. Si es urgente, llame o escriba por WhatsApp ahora.',
      errorTitle: 'Algo salió mal.',
      errorBody: 'Inténtelo de nuevo, o contáctenos por llamada o WhatsApp.',
      required: 'Requerido',
      invalidEmail: 'Ingrese un correo válido',
      consentRequired: 'Por favor acepte que le contactemos',
    },
    // ⚠️ LEGAL — debe permanecer visible. No suavizar ni eliminar.
    disclaimer: {
      heading: 'Importante: no somos un despacho de abogados',
      short:
        'Utah Accident Firm no es un despacho de abogados y no brinda asesoría ni representación legal.',
      full:
        'Utah Accident Firm no es un despacho de abogados y no brinda asesoría legal, servicios legales ni representación legal. Somos un servicio de gestión de reclamos de seguro: tramitamos y gestionamos su reclamo de seguro de auto, abogamos por un pago justo y coordinamos la reparación de su vehículo. Para asuntos legales, consulte a un abogado con licencia.',
    },
    footer: {
      tagline: 'Gestión de reclamos de seguro y coordinación de reparación de autos en Utah.',
      hours: 'Horario',
      serving: 'Servimos',
      contact: 'Contacto',
      rights: 'Todos los derechos reservados.',
      closed: 'Cerrado',
      privacy: 'Política de Privacidad',
    },
    weekdays: { Mon: 'Lun', Tue: 'Mar', Wed: 'Mié', Thu: 'Jue', Fri: 'Vie', Sat: 'Sáb', Sun: 'Dom' } as Record<string, string>,
    seo: {
      home: {
        title: 'Utah Accident Firm — Ayuda con Reclamos de Seguro de Auto en Utah',
        description:
          'Tras un accidente de auto en Utah, gestionamos su reclamo de seguro, abogamos por un pago justo y coordinamos la reparación de su vehículo. No somos abogados. Consulta gratis.',
      },
    },
  },
} as const;

export type UI = (typeof ui)[Lang];
