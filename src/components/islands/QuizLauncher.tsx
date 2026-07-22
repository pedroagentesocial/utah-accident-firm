import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Quiz, { type QuizChrome } from './Quiz';
import { quizzes, type QuizIcon } from '../../data/quizzes';
import type { Lang } from '../../i18n/ui';

function CardIcon({ name }: { name: QuizIcon }) {
  const common = { viewBox: '0 0 24 24', className: 'h-6 w-6', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  if (name === 'shield')
    return (<svg {...common}><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="m9 12 2 2 4-4" /></svg>);
  if (name === 'umbrella')
    return (<svg {...common}><path d="M12 12v7a2 2 0 0 0 4 0" /><path d="M2 12a10 10 0 0 1 20 0Z" /><path d="M12 2v2" /></svg>);
  return (<svg {...common}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9l-3.8 3.8z" /></svg>);
}
function Chevron() {
  return (<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>);
}

/** Three clickable cards; picking one swaps to that quiz. Always captures the lead. */
export default function QuizLauncher({
  lang,
  chrome,
  pickLabel,
  privacyHref,
  callHref,
  waHref,
  callLabel,
  waLabel,
}: {
  lang: Lang;
  chrome: QuizChrome;
  pickLabel: string;
  privacyHref: string;
  callHref: string;
  waHref: string;
  callLabel: string;
  waLabel: string;
}) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<string | null>(null);
  const def = quizzes.find((q) => q.id === selected) ?? null;

  const fade = {
    initial: { opacity: 0, y: reduce ? 0 : 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduce ? 0 : -10 },
    transition: { duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <div className="mx-auto max-w-3xl">
      <AnimatePresence mode="wait">
        {def ? (
          <motion.div key={def.id} {...fade} className="mx-auto max-w-xl">
            <Quiz
              lang={lang}
              steps={def.steps}
              assess={def.assess}
              result={def.result[lang]}
              source={def.id}
              chrome={chrome}
              privacyHref={privacyHref}
              callHref={callHref}
              waHref={waHref}
              callLabel={callLabel}
              waLabel={waLabel}
              onBack={() => setSelected(null)}
            />
          </motion.div>
        ) : (
          <motion.div key="cards" {...fade}>
            <p className="mb-3 text-center text-sm font-semibold text-muted sm:text-left">{pickLabel}</p>
            <ul role="list" className="grid gap-3 sm:grid-cols-3">
              {quizzes.map((q) => (
                <li key={q.id}>
                  <motion.button
                    type="button"
                    onClick={() => setSelected(q.id)}
                    whileHover={reduce ? undefined : { y: -3 }}
                    whileTap={reduce ? undefined : { scale: 0.98 }}
                    className="flex h-full w-full flex-col items-start gap-3 rounded-card border border-line bg-paper p-5 text-left shadow-soft transition-colors hover:border-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-brand-soft text-brand">
                      <CardIcon name={q.icon} />
                    </span>
                    <span>
                      <span className="block font-display font-semibold leading-snug text-ink">{q.card[lang].title}</span>
                      <span className="mt-1 flex items-center gap-1 text-sm leading-snug text-muted">
                        {q.card[lang].desc}
                        <span className="text-brand"><Chevron /></span>
                      </span>
                    </span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
