import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'motion/react';

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

const amber = 'oklch(0.80 0.135 72)';
const brand = 'oklch(0.46 0.072 201)';
const line = 'oklch(0.90 0.014 78)';

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4" viewBox="0 0 24 24" fill={i < n ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} style={{ color: amber }} aria-hidden="true">
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 70 : -70, rotate: dir > 0 ? 3 : -3, scale: 0.96 }),
  center: { opacity: 1, x: 0, rotate: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -70 : 70, rotate: dir > 0 ? -3 : 3, scale: 0.96 }),
};

export default function TestimonialsCarousel({ items, lang, prevLabel, nextLabel }: Props) {
  const [[i, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const count = items.length;

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const paginate = (d: number) => setState(([p]) => [(p + d + count) % count, d]);
  const goTo = (n: number) => setState(([p]) => [n, n > p ? 1 : -1]);

  useEffect(() => {
    if (paused || reduce || count <= 1) return;
    const id = setInterval(() => setState(([p]) => [(p + 1) % count, 1]), 6000);
    return () => clearInterval(id);
  }, [paused, reduce, count]);

  if (!count) return null;
  const item = items[i];

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -70) paginate(1);
    else if (swipe > 70) paginate(-1);
  };

  return (
    <div
      className="relative"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Stacked-deck: two cards peek behind the active one for depth. */}
      <div className="relative min-h-[14rem]" style={{ perspective: 1200 }}>
        <div aria-hidden className="absolute inset-0 translate-y-3 scale-[0.965] rounded-card border bg-paper opacity-70" style={{ borderColor: line }} />
        <div aria-hidden className="absolute inset-0 translate-y-6 scale-[0.93] rounded-card border bg-paper opacity-40" style={{ borderColor: line }} />

        <AnimatePresence initial={false} mode="wait" custom={dir}>
          <motion.figure
            key={i}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 32 }}
            drag={reduce || count <= 1 ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={onDragEnd}
            className="relative flex min-h-[14rem] cursor-grab flex-col justify-center rounded-card border border-line bg-paper p-7 shadow-lift active:cursor-grabbing sm:p-10"
          >
            <svg className="absolute right-6 top-5 h-10 w-10 opacity-10" viewBox="0 0 24 24" fill="currentColor" style={{ color: brand }} aria-hidden="true">
              <path d="M7.5 6C5 6 3 8 3 10.5S5 15 7.5 15c0 2-1 3.5-3 4.5L5 21c3.5-1.5 5.5-4.5 5.5-8.5V10.5C10.5 8 8.5 6 7.5 6Zm9 0C14 6 12 8 12 10.5S14 15 16.5 15c0 2-1 3.5-3 4.5l.5 1.5c3.5-1.5 5.5-4.5 5.5-8.5V10.5C19.5 8 17.5 6 16.5 6Z" />
            </svg>

            {item.rating ? <Stars n={item.rating} /> : null}
            <blockquote className="mt-4 font-display text-lg leading-snug text-ink sm:text-2xl">
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
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2" role="tablist" aria-label="Testimonials">
            {items.map((_, n) => (
              <button
                key={n}
                onClick={() => goTo(n)}
                aria-label={`${n + 1}`}
                aria-selected={n === i}
                role="tab"
                className="h-2 rounded-full transition-all duration-300"
                style={{ width: n === i ? 26 : 8, backgroundColor: n === i ? brand : line }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => paginate(-1)} aria-label={prevLabel} className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-brand hover:text-brand">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button onClick={() => paginate(1)} aria-label={nextLabel} className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-brand hover:text-brand">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
