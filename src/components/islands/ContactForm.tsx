import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Lang = 'en' | 'es';

interface FormStrings {
  name: string;
  phone: string;
  message: string;
  messagePlaceholder: string;
  consent: string;
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
  required: string;
  consentRequired: string;
}

interface Props {
  t: FormStrings;
  lang: Lang;
  privacyHref: string;
  privacyLink: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactForm({ t, lang, privacyHref, privacyLink }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(data: FormData): Record<string, string> {
    const e: Record<string, string> = {};
    if (!String(data.get('name') ?? '').trim()) e.name = t.required;
    if (!String(data.get('phone') ?? '').trim()) e.phone = t.required;
    if (!data.get('consent')) e.consent = t.consentRequired;
    return e;
  }

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);

    // Honeypot: silently "succeed" without sending.
    if (String(data.get('company') ?? '')) {
      setStatus('success');
      return;
    }

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          phone: data.get('phone'),
          message: data.get('message') || undefined,
          consent: true,
          lang,
        }),
      });
      const json = await res.json().catch(() => ({ ok: res.ok }));
      if (res.ok && json.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const fieldBase =
    'w-full rounded-xl border bg-paper px-4 py-3 text-base text-fg placeholder:text-muted/70 outline-none transition-colors focus:border-brand';

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="rounded-card border border-line bg-paper p-8 text-center shadow-soft"
            role="status"
          >
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/15 text-success">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">{t.successTitle}</h3>
            <p className="mt-2 text-muted">{t.successBody}</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} noValidate initial={false} className="grid gap-4">
            {/* honeypot */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="sr-only"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium text-ink">
                {t.name}
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  className={`${fieldBase} ${errors.name ? 'border-danger' : 'border-line'}`}
                />
                {errors.name && <span className="text-xs font-normal text-danger">{errors.name}</span>}
              </label>

              <label className="grid gap-1.5 text-sm font-medium text-ink">
                {t.phone}
                <input
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  aria-invalid={!!errors.phone}
                  className={`${fieldBase} ${errors.phone ? 'border-danger' : 'border-line'}`}
                />
                {errors.phone && <span className="text-xs font-normal text-danger">{errors.phone}</span>}
              </label>
            </div>

            <label className="grid gap-1.5 text-sm font-medium text-ink">
              {t.message}
              <textarea
                name="message"
                rows={4}
                placeholder={t.messagePlaceholder}
                className={`${fieldBase} resize-y border-line`}
              />
            </label>

            <label className="flex items-start gap-3 text-sm text-muted">
              <input
                name="consent"
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 rounded border-line accent-[oklch(0.46_0.072_201)]"
                aria-invalid={!!errors.consent}
              />
              <span>
                {t.consent}{' '}
                <a href={privacyHref} className="font-medium text-brand underline underline-offset-2 hover:text-brand-deep">
                  {privacyLink}
                </a>
                .
                {errors.consent && <span className="mt-1 block text-xs text-danger">{errors.consent}</span>}
              </span>
            </label>

            {status === 'error' && (
              <div className="rounded-xl border border-danger/40 bg-danger/5 px-4 py-3 text-sm text-danger" role="alert">
                <strong className="font-semibold">{t.errorTitle}</strong> {t.errorBody}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={status === 'submitting'}
              whileTap={{ scale: 0.98 }}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-pill bg-accent px-6 py-3.5 text-base font-semibold text-cream shadow-soft transition-colors hover:bg-accent-deep disabled:opacity-70"
            >
              {status === 'submitting' ? t.sending : t.submit}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
