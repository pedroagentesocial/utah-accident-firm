/**
 * Contact / "start my claim" form endpoint.
 * POST JSON or form-encoded -> Zod validation -> Resend email.
 * Requires explicit consent. Runs server-side only (Vercel function).
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { z } from 'zod';
import {
  RESEND_API_KEY,
  CONTACT_TO_EMAIL,
  CONTACT_FROM_EMAIL,
} from 'astro:env/server';

const ContactSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(100),
  phone: z.string().trim().min(7, 'A valid phone is required').max(30),
  email: z.string().trim().email('A valid email is required').max(150).optional().or(z.literal('')),
  city: z.string().trim().max(80).optional().default(''),
  message: z.string().trim().max(2000).optional().default(''),
  // language of the form, for routing the reply
  lang: z.enum(['en', 'es']).optional().default('en'),
  // explicit consent is REQUIRED to submit
  consent: z.coerce.boolean().refine((v) => v === true, {
    message: 'Consent is required',
  }),
  // honeypot — must stay empty
  company: z.string().max(0).optional(),
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  // Accept both JSON and classic form posts.
  let raw: Record<string, unknown> = {};
  const ct = request.headers.get('content-type') ?? '';
  try {
    if (ct.includes('application/json')) {
      raw = await request.json();
    } else {
      const form = await request.formData();
      raw = Object.fromEntries(form.entries());
    }
  } catch {
    return json({ ok: false, error: 'invalid_body' }, 400);
  }

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    return json(
      { ok: false, error: 'validation', issues: parsed.error.flatten().fieldErrors },
      422,
    );
  }
  const data = parsed.data;

  // Silently accept honeypot hits (pretend success, send nothing).
  if (data.company) return json({ ok: true });

  // If Resend isn't configured yet (e.g. local dev), don't hard-fail.
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.warn('[contact] Resend env not configured — logging submission only.');
    console.info('[contact]', data);
    return json({ ok: true, delivered: false });
  }

  const subject =
    data.lang === 'es'
      ? `Nuevo reclamo: ${data.name}`
      : `New claim inquiry: ${data.name}`;

  const lines = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : null,
    data.city ? `City: ${data.city}` : null,
    `Language: ${data.lang}`,
    '',
    data.message || '(no message)',
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: data.email || undefined,
      subject,
      text: lines,
    });
    if (error) {
      console.error('[contact] Resend error:', error);
      return json({ ok: false, error: 'send_failed' }, 502);
    }
  } catch (err) {
    console.error('[contact] unexpected error:', err);
    return json({ ok: false, error: 'send_failed' }, 502);
  }

  return json({ ok: true, delivered: true });
};
