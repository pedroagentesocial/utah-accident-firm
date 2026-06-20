import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Lang = 'en' | 'es';

interface Item {
  quote: { en: string; es: string };
  name: string;
  city?: string;
  source?: string;
  rating?: number;
}

interface Props {
  items: Item[];
  lang: Lang;
  prevLabel: string;
  nextLabel: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4" viewBox="0 0 24 24" fill={i < n ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} style={{ color: 'oklch(0.80 0.135 72)' }} aria-hidden="true">
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsCarousel({ items, lang, prevLabel, nextLabel }: Props) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  const go = useCallback((n: number) => setI(() => (n + count) % count), [count]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = setInterval(() => setI((p) => (p + 1) % count), 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  if (!count) return null;
  const item = items[i];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-card border border-line bg-paper p-7 shadow-soft sm:p-10">
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease }}
          >
            {item.rating ? <Stars n={item.rating} /> : null}
            <blockquote className="mt-4 font-display text-xl leading-snug text-ink sm:text-2xl">
              “{item.quote[lang]}”
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted">
              <span className="font-semibold text-fg">{item.name}</span>
              {item.city ? `, ${item.city}` : ''}
              {item.source ? ` · ${item.source}` : ''}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-2" role="tablist">
            {items.map((_, n) => (
              <button
                key={n}
                onClick={() => go(n)}
                aria-label={`${n + 1}`}
                aria-selected={n === i}
                role="tab"
                className="h-2 rounded-full transition-all"
                style={{
                  width: n === i ? 24 : 8,
                  backgroundColor: n === i ? 'oklch(0.46 0.072 201)' : 'oklch(0.90 0.014 78)',
                }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => go(i - 1)} aria-label={prevLabel} className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-brand hover:text-brand">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button onClick={() => go(i + 1)} aria-label={nextLabel} className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-brand hover:text-brand">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
