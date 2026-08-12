import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { headlineLines } from '../../lib/typography';

type Lang = 'en' | 'es';

interface ImageSlide {
  type: 'image';
  src: string;
  alt: string;
}
interface VideoSlide {
  type: 'video';
  src: string;
  poster?: string;
  alt: string;
}
export type Slide = ImageSlide | VideoSlide;

interface Copy {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
}

interface Props {
  slides: readonly Slide[];
  copy: readonly Copy[];
  prevLabel: string;
  nextLabel: string;
  lang: Lang;
  children?: ReactNode;
}

const textVariants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function HeroCarousel({ slides, copy, prevLabel, nextLabel, lang, children }: Props) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  // "lite" = reduced-motion OR data-saver / slow network → show the poster, never
  // auto-download or autoplay the hero video (many users arrive on cellular).
  const [lite, setLite] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const count = slides.length;

  useEffect(() => {
    const r = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduce(r);
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slow = Boolean(conn?.saveData) || /(^|-)2g$/.test(conn?.effectiveType ?? '');
    setLite(r || slow);
  }, []);

  const paginate = (d: number) => setI((p) => (p + d + count) % count);
  const goTo = (n: number) => setI(n);

  // Pause the video whenever we navigate away from its slide.
  useEffect(() => {
    const v = videoRef.current;
    if (v && slides[i]?.type !== 'video') v.pause();
  }, [i, slides]);

  // Gentle auto-rotation so both messages are seen; pauses on interaction.
  useEffect(() => {
    if (paused || reduce || count <= 1) return;
    const id = setInterval(() => setI((p) => (p + 1) % count), 7000);
    return () => clearInterval(id);
  }, [paused, reduce, count]);

  if (!count) return null;
  const slide = slides[i];
  const c = copy[i] ?? copy[0];

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <>
      {/* Background media + overlays + controls. Covers the whole hero, so it
          also captures hover (the foreground copy is pointer-events-none). */}
      <div
        className="absolute inset-0"
        aria-roledescription="carousel"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={resume}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.7 }}
            className="absolute inset-0"
          >
            {slide.type === 'image' ? (
              <img
                src={slide.src}
                alt={slide.alt}
                fetchPriority="high"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                src={slide.src}
                poster={slide.poster}
                autoPlay={!lite}
                muted
                loop
                playsInline
                preload={lite ? 'none' : 'metadata'}
                aria-label={slide.alt}
                className="h-full w-full object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dark overlays for legibility, above media */}
        <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(100deg, rgb(11 28 48 / 0.92), rgb(11 28 48 / 0.60) 55%, rgb(11 28 48 / 0.28))' }} />
        <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(0deg, rgb(11 28 48 / 0.66), transparent 45%)' }} />

        {count > 1 && (
          // One control cluster, bottom-left under the copy — clear of the hero
          // text and of the floating contact button (bottom-right) on every size.
          <div className="absolute bottom-6 left-4 z-10 flex items-center gap-3 sm:left-6">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label={prevLabel}
              className="grid h-10 w-10 place-items-center rounded-full bg-cream/15 text-cream ring-1 ring-cream/30 backdrop-blur-sm transition-colors hover:bg-cream/25"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>

            <div className="flex gap-2" role="tablist" aria-label={lang === 'es' ? 'Galería' : 'Gallery'}>
              {slides.map((_, n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => goTo(n)}
                  aria-label={`${n + 1}`}
                  aria-selected={n === i}
                  role="tab"
                  className="h-2 rounded-full bg-cream transition-all duration-300"
                  style={{ width: n === i ? 26 : 8, opacity: n === i ? 1 : 0.45 }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label={nextLabel}
              className="grid h-10 w-10 place-items-center rounded-full bg-cream/15 text-cream ring-1 ring-cream/30 backdrop-blur-sm transition-colors hover:bg-cream/25"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        )}
      </div>

      {/* Foreground copy — changes with the slide. Static CTAs come via children. */}
      <div
        className="pointer-events-none relative z-[1] mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:pb-24 lg:pt-36"
        onFocusCapture={pause}
        onBlurCapture={resume}
      >
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="inline-flex items-center gap-2 rounded-pill bg-cream/12 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-cream ring-1 ring-cream/25 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-200 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-200" />
                </span>
                {c.eyebrow}
              </p>

              <h1 className="mt-5 text-cream text-[clamp(2.1rem,5.2vw,3.6rem)]">
                {headlineLines(c.title).map((l, n) => (
                  <span key={n} className="block">{l}</span>
                ))}
                {headlineLines(c.titleAccent).map((l, n) => (
                  <span key={n} className="block text-brand-200">{l}</span>
                ))}
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">{c.subtitle}</p>
            </motion.div>
          </AnimatePresence>

          {children}
        </div>
      </div>
    </>
  );
}
