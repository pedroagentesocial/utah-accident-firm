import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import type { QuizStep, QuizResult, Answers } from '../../data/quizzes';
import type { Lang } from '../../i18n/ui';

export interface QuizChrome {
  progress: string;
  back: string;
  chooseAnother: string;
  continueLabel: string;
  summary: string;
  contactHeading: string;
  contactSub: string;
  name: string;
  phone: string;
  email: string;
  consent: string;
  privacyLink: string;
  consentAfter: string;
  submit: string;
  submitting: string;
  captured: string;
  error: string;
  disclaimer: string;
  errors: { name: string; phone: string; consent: string };
}

type Phase = 'quiz' | 'contact' | 'result';
type Status = 'idle' | 'sending' | 'error';

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function ArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5m7-7-7 7 7 7" />
    </svg>
  );
}
function Bulb() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" />
    </svg>
  );
}
function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
function OptIcon({ name }: { name?: string }) {
  switch (name) {
    case 'car':
      return (<Svg><path d="M5 11l1.6-4.3A2 2 0 0 1 8.5 5h7a2 2 0 0 1 1.9 1.7L19 11M5 11h14M5 11a2 2 0 0 0-2 2v3h3m14-5a2 2 0 0 1 2 2v3h-3M7 16h10" /><circle cx="7.5" cy="16.5" r="1.5" /><circle cx="16.5" cy="16.5" r="1.5" /></Svg>);
    case 'walk':
      return (<Svg><circle cx="12" cy="4.5" r="1.3" /><path d="m9 20 3-6 3 6M6 8l6 2 6-2M12 10v4" /></Svg>);
    case 'alert':
      return (<Svg><path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z" /><path d="M12 9v4M12 17h.01" /></Svg>);
    case 'x':
      return (<Svg><path d="M18 6 6 18M6 6l12 12" /></Svg>);
    case 'help':
      return (<Svg><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" /></Svg>);
    case 'clock':
      return (<Svg><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></Svg>);
    case 'calendar':
      return (<Svg><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18M8 2v4M16 2v4" /></Svg>);
    case 'receipt':
      return (<Svg><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M8 7h8M8 11h8M8 15h5" /></Svg>);
    case 'user':
      return (<Svg><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Svg>);
    case 'shield':
      return (<Svg><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="m9 12 2 2 4-4" /></Svg>);
    case 'wrench':
      return (<Svg><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9l-3.8 3.8z" /></Svg>);
    case 'check':
    default:
      return (<Svg><path d="M20 6 9 17l-5-5" /></Svg>);
  }
}

export default function Quiz({
  lang,
  steps,
  assess,
  result,
  source,
  chrome,
  privacyHref,
  callHref,
  waHref,
  callLabel,
  waLabel,
  onBack,
}: {
  lang: Lang;
  steps: QuizStep[];
  assess: (a: Answers) => 'qualifies' | 'review';
  result: QuizResult;
  source: string;
  chrome: QuizChrome;
  privacyHref: string;
  callHref: string;
  waHref: string;
  callLabel: string;
  waLabel: string;
  onBack: () => void;
}) {
  const reduce = useReducedMotion();

  const [answers, setAnswers] = useState<Answers>({});
  const [history, setHistory] = useState<string[]>([steps[0].id]);
  const [phase, setPhase] = useState<Phase>('quiz');
  const [status, setStatus] = useState<Status>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [tone, setTone] = useState<'qualifies' | 'review'>('review');
  const [dir, setDir] = useState(1);
  const [pending, setPending] = useState<{ value: string; tip: string } | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  const activeFor = (a: Answers) => steps.filter((s) => !s.when || s.when(a));
  const currentId = history[history.length - 1];
  const currentStep = steps.find((s) => s.id === currentId) ?? steps[0];

  const active = activeFor(answers);
  const stepPos = Math.max(0, active.findIndex((s) => s.id === currentId));
  const barSteps = active.length + 1;
  const positionNumber = phase === 'quiz' ? stepPos + 1 : barSteps;
  const pct = phase === 'result' ? 100 : Math.round((positionNumber / barSteps) * 100);

  const answeredChips = steps
    .filter((s) => answers[s.id])
    .map((s) => s.options.find((o) => o.value === answers[s.id])?.label[lang])
    .filter((x): x is string => Boolean(x));

  const headingRef = useRef<HTMLHeadingElement>(null);
  const viewKey = phase === 'quiz' ? currentId : phase;
  useEffect(() => {
    headingRef.current?.focus();
  }, [viewKey]);

  function advance(value: string) {
    const ans = { ...answers, [currentId]: value };
    setAnswers(ans);
    setPending(null);
    setPicked(null);
    setDir(1);
    const nextActive = activeFor(ans);
    const pos = nextActive.findIndex((s) => s.id === currentId);
    const next = nextActive[pos + 1];
    if (next) setHistory((h) => [...h, next.id]);
    else setPhase('contact');
  }
  function select(opt: QuizStep['options'][number]) {
    if (picked) return;
    if (opt.tip) {
      setDir(1);
      setPending({ value: opt.value, tip: opt.tip[lang] });
    } else {
      setPicked(opt.value);
      advanceTimer.current = setTimeout(() => advance(opt.value), 340);
    }
  }
  function back() {
    clearTimeout(advanceTimer.current);
    setPicked(null);
    if (pending) {
      setPending(null);
      return;
    }
    setDir(-1);
    if (phase === 'contact') {
      setPhase('quiz');
    } else if (history.length > 1) {
      setHistory((h) => h.slice(0, -1));
    } else {
      onBack();
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setFieldErrors({});
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const eligibility = assess(answers);
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, consent: true, lang, source: `quiz:${source}`, answers: { ...answers, eligibility } }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setTone(eligibility);
        setDir(1);
        setPhase('result');
        setStatus('idle');
        return;
      }
      if (res.status === 422 && data.issues) {
        const flat: Record<string, string> = {};
        for (const k of Object.keys(data.issues)) flat[k] = data.issues[k]?.[0] ?? '';
        setFieldErrors(flat);
        setStatus('idle');
        const first = ['name', 'phone', 'consent'].find((k) => flat[k]);
        if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
        return;
      }
      setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  const inputCls = (err?: string) =>
    'w-full rounded-xl border bg-paper px-4 py-3 text-base text-fg outline-none transition-colors focus:border-brand ' +
    (err ? 'border-danger' : 'border-line');

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 28 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -28 }),
  };
  const transition = { duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] as const };

  const backLabel = pending ? chrome.back : phase === 'quiz' && history.length === 1 ? chrome.chooseAnother : chrome.back;

  return (
    <div className="rounded-card bg-brand-band p-6 text-left text-cream shadow-lift sm:p-8">
      {phase !== 'result' && (
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-cream/80">
            <span id="quiz-progress">{chrome.progress.replace('{n}', String(positionNumber)).replace('{total}', String(barSteps))}</span>
            <button type="button" onClick={back} className="-my-1.5 -mr-1 inline-flex items-center gap-1 rounded px-1 py-1.5 text-cream/80 transition-colors hover:text-cream">
              <ArrowLeft />
              {backLabel}
            </button>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-pill bg-cream/20" role="progressbar" aria-labelledby="quiz-progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
            <div className="h-full w-full origin-left rounded-pill bg-cream transition-transform duration-500 ease-[var(--ease-out-quint)] motion-reduce:transition-none" style={{ transform: `scaleX(${pct / 100})` }} />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.div key={viewKey} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={transition}>
          {phase === 'quiz' && (
            <div role="group" aria-labelledby="quiz-q">
              <h3 id="quiz-q" ref={headingRef} tabIndex={-1} className="text-xl font-semibold tracking-tight text-cream outline-none sm:text-2xl">
                {currentStep.question[lang]}
              </h3>
              {currentStep.hint && <p className="mt-2 text-sm text-cream/75">{currentStep.hint[lang]}</p>}

              <div className="mt-5 grid gap-2.5">
                {currentStep.options.map((opt) => {
                  const isSel = picked === opt.value || pending?.value === opt.value;
                  return (
                    <motion.button
                      key={opt.value}
                      type="button"
                      onClick={() => select(opt)}
                      whileTap={reduce ? undefined : { scale: 0.985 }}
                      className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-base font-medium text-cream transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream ${isSel ? 'border-cream bg-cream/20' : 'border-cream/20 bg-cream/10 hover:border-cream/45 hover:bg-cream/15'}`}
                    >
                      <span
                        className={`grid h-9 w-9 flex-none place-items-center rounded-lg transition-colors ${isSel ? 'bg-cream text-brand' : 'bg-cream/10 text-cream/85'}`}
                        aria-hidden="true"
                      >
                        <OptIcon name={opt.icon} />
                      </span>
                      <span className="flex-1">{opt.label[lang]}</span>
                      <span
                        className={`grid h-5 w-5 flex-none place-items-center rounded-full border-2 transition-colors ${isSel ? 'border-cream bg-cream text-brand' : 'border-cream/50'}`}
                        aria-hidden="true"
                      >
                        {isSel && (
                          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {pending && (
                <motion.div
                  role="status"
                  initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 rounded-xl bg-cream/10 p-4"
                >
                  <p className="flex items-start gap-2.5 text-sm leading-relaxed text-cream/90">
                    <span className="mt-0.5 flex-none text-cream"><Bulb /></span>
                    <span>{pending.tip}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => pending && advance(pending.value)}
                    className="mt-3 w-full rounded-pill bg-cream px-5 py-3 text-sm font-semibold text-brand transition-colors hover:bg-paper active:scale-[.98]"
                  >
                    {chrome.continueLabel}
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {phase === 'contact' && (
            <div>
              <h3 ref={headingRef} tabIndex={-1} className="text-xl font-semibold tracking-tight text-cream outline-none sm:text-2xl">
                {chrome.contactHeading}
              </h3>
              <p className="mt-2 text-sm text-cream/80">{chrome.contactSub}</p>
              {answeredChips.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-cream/75">{chrome.summary}</span>
                  {answeredChips.map((label, i) => (
                    <span key={i} className="rounded-pill bg-cream/10 px-3 py-1 text-xs font-medium text-cream/90">
                      {label}
                    </span>
                  ))}
                </div>
              )}
              <form onSubmit={onSubmit} className="mt-5 grid gap-3.5" noValidate>
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
                <div>
                  <label className="mb-1 block text-sm font-medium text-cream/85" htmlFor="q-name">{chrome.name}</label>
                  <input id="q-name" name="name" required autoComplete="name" className={inputCls(fieldErrors.name)} aria-invalid={fieldErrors.name ? true : undefined} aria-describedby={fieldErrors.name ? 'q-name-error' : undefined} />
                  {fieldErrors.name && <p id="q-name-error" className="mt-1 text-xs text-danger-200">{chrome.errors.name}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-cream/85" htmlFor="q-phone">{chrome.phone}</label>
                  <input id="q-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" className={inputCls(fieldErrors.phone)} aria-invalid={fieldErrors.phone ? true : undefined} aria-describedby={fieldErrors.phone ? 'q-phone-error' : undefined} />
                  {fieldErrors.phone && <p id="q-phone-error" className="mt-1 text-xs text-danger-200">{chrome.errors.phone}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-cream/85" htmlFor="q-email">{chrome.email}</label>
                  <input id="q-email" name="email" type="email" autoComplete="email" className={inputCls()} />
                </div>
                <label className="flex items-start gap-2.5 text-xs leading-relaxed text-cream/80">
                  <input type="checkbox" name="consent" value="true" required className="mt-0.5 h-4 w-4 shrink-0 accent-accent" aria-invalid={fieldErrors.consent ? true : undefined} aria-describedby={fieldErrors.consent ? 'q-consent-error' : undefined} />
                  <span>
                    {chrome.consent}{' '}
                    <a href={privacyHref} className="font-semibold text-cream underline underline-offset-2">{chrome.privacyLink}</a>
                    {chrome.consentAfter}
                  </span>
                </label>
                {fieldErrors.consent && <p id="q-consent-error" className="text-xs text-danger-200">{chrome.errors.consent}</p>}
                {status === 'error' && <p role="alert" className="text-sm text-danger-200">{chrome.error}</p>}
                <button type="submit" disabled={status === 'sending'} className="mt-1 w-full rounded-pill bg-cream px-5 py-3.5 text-base font-semibold text-brand shadow-soft transition-colors hover:bg-paper active:scale-[.98] disabled:opacity-70">
                  {status === 'sending' ? chrome.submitting : chrome.submit}
                </button>
                <p className="text-center text-xs text-cream/70">{chrome.disclaimer}</p>
              </form>
            </div>
          )}

          {phase === 'result' && (
            <div className="text-center" role="status">
              <span className={`mx-auto grid h-12 w-12 place-items-center rounded-full ${tone === 'qualifies' ? 'bg-cream/20 text-cream' : 'bg-cream/10 text-cream'}`}>
                <Check />
              </span>
              <h3 ref={headingRef} tabIndex={-1} className="mt-4 text-2xl font-semibold tracking-tight text-cream outline-none">
                {tone === 'qualifies' ? result.qualifyTitle : result.reviewTitle}
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-cream/85">{tone === 'qualifies' ? result.qualifyText : result.reviewText}</p>
              <p className="mt-6 text-sm font-medium text-cream/75">{chrome.captured}</p>
              <div className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                <a href={callHref} className="inline-flex items-center justify-center rounded-pill bg-cream px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper">{callLabel}</a>
                <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'var(--color-wa)' }} className="inline-flex items-center justify-center rounded-pill px-5 py-3 text-sm font-semibold text-cream transition-opacity hover:opacity-90">{waLabel}</a>
              </div>
              <button type="button" onClick={onBack} className="mt-4 inline-block px-2 py-1.5 text-sm font-semibold text-cream/75 underline underline-offset-2 transition-colors hover:text-cream">
                {chrome.chooseAnother}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
