'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type ScrambleTextProps = {
  text: string;
  /** ms before the decode starts */
  delay?: number;
  /** The decode waits until this is true (the preloader has lifted) */
  active?: boolean;
  /** ms for the resolve sweep to cross the whole string */
  duration?: number;
  className?: string;
};

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = LOWER.toUpperCase();
const TICK_MS = 42; // how often an unresolved glyph changes; every frame reads as noise

/* A random glyph with the same case as the target, so the line keeps its rhythm while unresolved */
function glyphFor(ch: string) {
  if (ch === ' ' || /[.,'!?]/.test(ch)) return ch;
  const pool = ch === ch.toUpperCase() && /[A-Z]/.test(ch) ? UPPER : LOWER;
  return pool[Math.floor(Math.random() * pool.length)];
}

/*
  Decode effect: the text starts as random letters and resolves into itself from left
  to right. The server renders the final text, so no-JS and crawlers see the headline;
  the scramble only replaces it once mounted. The visible run is aria-hidden; the parent
  heading carries the real string in aria-label, so assistive tech never hears the noise.
  Reduced motion renders the final text, still.
*/
export function ScrambleText({ text, delay = 150, duration = 1100, active = true, className }: ScrambleTextProps) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (reduce || !active) return;
    const chars = [...text];
    const n = chars.length;
    let raf = 0;
    let lastTick = 0;
    let start = 0;
    let cancelled = false;

    const frame = (now: number) => {
      if (cancelled) return;
      if (!start) {
        // First frame: start fully scrambled, never from the final text, so nothing flashes
        start = now;
        setShown(chars.map(glyphFor).join(''));
      }
      const t = now - start;
      if (t < delay) {
        raf = requestAnimationFrame(frame);
        return;
      }
      const p = Math.min(1, (t - delay) / duration);
      // Each character resolves at its own point in the sweep, slightly eased
      const resolvedUpTo = Math.floor(n * (1 - Math.pow(1 - p, 2)));
      const tick = now - lastTick > TICK_MS;
      if (tick) lastTick = now;

      setShown((prev) => {
        const prevChars = [...prev];
        return chars
          .map((ch, i) => (i < resolvedUpTo ? ch : tick || prevChars[i] === undefined ? glyphFor(ch) : prevChars[i]))
          .join('');
      });

      if (p < 1) raf = requestAnimationFrame(frame);
      else setShown(text);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [text, delay, duration, reduce, active]);

  // The parent heading carries aria-label={text}; this run is decoration to assistive tech
  return (
    <span className={className} aria-hidden>
      {shown}
    </span>
  );
}
