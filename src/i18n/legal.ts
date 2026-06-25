/**
 * Privacy Policy content, EN + US Spanish.
 * ⚠️ Reasonable starting template. Have it reviewed and fill the TODO specifics
 * (effective date, data retention period, any analytics/cookie details) before
 * relying on it legally.
 */
import type { Lang } from './ui';

interface Section {
  heading: string;
  body: string[];
}
interface Legal {
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
  seoTitle: string;
  seoDescription: string;
}

export const privacy: Record<Lang, Legal> = {
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: June 2026', // TODO: confirm effective date
    intro:
      'This policy explains what information Utah Accident Firm collects when you contact us, how we use it, and the choices you have. Utah Accident Firm is not a law firm and does not provide legal advice or representation.',
    sections: [
      {
        heading: 'Information we collect',
        body: [
          'When you submit our contact form or reach out by phone or WhatsApp, we collect the details you give us: your name, phone number, and a short description of your accident. We do not require any other information to contact you.',
        ],
      },
      {
        heading: 'How we use your information',
        body: [
          'We use your information only to respond to your inquiry, discuss your situation, and, if you choose to work with us, manage your insurance claim and coordinate your vehicle repair. We contact you using the phone number or channel you provided.',
        ],
      },
      {
        heading: 'Sharing',
        body: [
          'To do the work you ask of us, we may share necessary details with the relevant insurance company and the repair shop on your behalf. We do not sell your personal information.',
        ],
      },
      {
        heading: 'Data retention',
        body: [
          'We keep your information for as long as needed to assist you and to meet our record-keeping obligations, then we dispose of it securely.', // TODO: state a specific retention period
        ],
      },
      {
        heading: 'Your choices',
        body: [
          'You can ask us to update or delete your information, or to stop contacting you, at any time. Just reach out using the contact details below.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          'Questions about this policy? Contact us by phone, WhatsApp, or email using the details in the site footer.',
        ],
      },
    ],
    seoTitle: 'Privacy Policy — Utah Accident Firm',
    seoDescription:
      'How Utah Accident Firm collects, uses, and protects your information when you contact us for help with an auto insurance claim.',
  },

  es: {
    title: 'Política de Privacidad',
    updated: 'Última actualización: junio de 2026', // TODO: confirmar fecha de vigencia
    intro:
      'Esta política explica qué información recopila Utah Accident Firm cuando nos contactas, cómo la usamos y las opciones que tienes. Utah Accident Firm no es un despacho de abogados y no brinda asesoría ni representación legal.',
    sections: [
      {
        heading: 'Información que recopilamos',
        body: [
          'Cuando envías nuestro formulario de contacto o nos escribes por teléfono o WhatsApp, recopilamos los datos que nos das: tu nombre, tu número de teléfono y una breve descripción de tu accidente. No exigimos ninguna otra información para contactarte.',
        ],
      },
      {
        heading: 'Cómo usamos tu información',
        body: [
          'Usamos tu información solo para responder a tu consulta, conversar sobre tu situación y, si decides trabajar con nosotros, gestionar tu reclamo de seguro y coordinar la reparación de tu vehículo. Te contactamos por el teléfono o el canal que nos indicaste.',
        ],
      },
      {
        heading: 'Con quién la compartimos',
        body: [
          'Para hacer el trabajo que nos pides, podemos compartir los datos necesarios con la aseguradora correspondiente y el taller de reparación en tu nombre. No vendemos tu información personal.',
        ],
      },
      {
        heading: 'Conservación de datos',
        body: [
          'Conservamos tu información durante el tiempo necesario para ayudarte y cumplir con nuestras obligaciones de registro, y luego la eliminamos de forma segura.', // TODO: indicar un plazo específico
        ],
      },
      {
        heading: 'Tus opciones',
        body: [
          'Puedes pedirnos que actualicemos o eliminemos tu información, o que dejemos de contactarte, en cualquier momento. Solo escríbenos con los datos de contacto que aparecen abajo.',
        ],
      },
      {
        heading: 'Contacto',
        body: [
          '¿Preguntas sobre esta política? Contáctanos por teléfono, WhatsApp o correo con los datos del pie de página del sitio.',
        ],
      },
    ],
    seoTitle: 'Política de Privacidad — Utah Accident Firm',
    seoDescription:
      'Cómo Utah Accident Firm recopila, usa y protege tu información cuando nos contactas para ayuda con un reclamo de seguro de auto.',
  },
};
