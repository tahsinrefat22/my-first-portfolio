'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CustomLogo } from '@/components/CustomLogo';
import { Z } from '@/lib/constants';

const EASE = [0.16, 1, 0.3, 1] as const;

/* The count never sits still: in the first MIN_MS it climbs to FLOOR_MAX regardless, then the real signals take it to 100 */
const MIN_MS = 1400;
const MAX_MS = 4500;
const FLOOR_MAX = 88;

const LoadingContext = createContext(false);
/** True once the preloader has started to lift; the hero's entrance waits for this */
export const usePageReady = () => useContext(LoadingContext);

/*
  Full-screen loader over the first paint: the monogram, a count from 0 to 100, and a
  hairline bar. The count is real. It weighs the things the hero actually needs (fonts,
  the footage's first frames, the portrait, the window load event) and only reads 100
  once they are in, with a floor so it never stalls and a ceiling so a slow connection
  cannot hold the page hostage. On 100 the sheet lifts and the hero's entrance begins.
*/
export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);
  const shown = useRef(0);

  useEffect(() => {
    const started = performance.now();
    const signals = { fonts: 0, video: 0, portrait: 0, load: 0 };
    const weights = { fonts: 0.2, video: 0.4, portrait: 0.2, load: 0.2 };
    const mark = (k: keyof typeof signals) => (signals[k] = 1);

    document.fonts.ready.then(() => mark('fonts'));
    if (document.readyState === 'complete') mark('load');
    else window.addEventListener('load', () => mark('load'), { once: true });

    const video = document.querySelector<HTMLVideoElement>('.hero-video video');
    if (!video) mark('video');
    else if (video.readyState >= 2) mark('video');
    else {
      video.addEventListener('loadeddata', () => mark('video'), { once: true });
      video.addEventListener('error', () => mark('video'), { once: true });
    }

    const portrait = document.querySelector<HTMLImageElement>('#hero img');
    if (!portrait || portrait.complete) mark('portrait');
    else {
      portrait.addEventListener('load', () => mark('portrait'), { once: true });
      portrait.addEventListener('error', () => mark('portrait'), { once: true });
    }

    document.documentElement.style.overflow = 'hidden';

    let raf = 0;
    const frame = (now: number) => {
      const elapsed = now - started;
      const real = (Object.keys(weights) as (keyof typeof weights)[]).reduce((s, k) => s + weights[k] * signals[k], 0);
      const complete = real >= 1 || elapsed >= MAX_MS;
      const floor = Math.min(FLOOR_MAX, (elapsed / MIN_MS) * FLOOR_MAX);
      const target = complete && elapsed >= MIN_MS ? 100 : Math.max(floor, Math.min(96, real * 100));
      shown.current += (target - shown.current) * (target === 100 ? 0.16 : 0.08);
      const next = Math.min(100, Math.round(shown.current));
      setCount(next);
      if (target === 100 && shown.current > 99.5) {
        setCount(100);
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, []);

  // A beat on 100, then lift the sheet and let the page in
  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => {
      setReady(true);
      document.documentElement.style.overflow = '';
    }, reduce ? 0 : 250);
    return () => window.clearTimeout(t);
  }, [done, reduce]);

  return (
    <LoadingContext.Provider value={ready}>
      {children}
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="preloader"
            role="status"
            aria-live="polite"
            aria-label={`Loading, ${count} percent`}
            className="preloader fixed inset-0 flex items-center justify-center bg-background text-foreground"
            style={{ zIndex: Z.overlay, clipPath: 'inset(0 0 0% 0)' }}
            initial={false}
            exit={reduce ? { opacity: 0, transition: { duration: 0.2 } } : { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.9, ease: EASE } }}
          >
            <motion.div
              className="flex flex-col items-center gap-6"
              exit={{ opacity: 0, y: -12, transition: { duration: 0.3, ease: EASE } }}
            >
              <CustomLogo className="size-10" aria-hidden />
              <div className="font-mono text-6xl font-medium tabular-nums tracking-[-0.04em] md:text-7xl" aria-hidden>
                {count}
                <span className="text-muted-foreground">%</span>
              </div>
              <div className="h-px w-40 overflow-hidden rounded-full bg-foreground/10" aria-hidden>
                <div className="h-full bg-foreground transition-[width] duration-150 ease-linear" style={{ width: `${count}%` }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
}
