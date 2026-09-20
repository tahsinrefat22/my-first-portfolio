'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/* Every mini UI is authored at this size, then scaled to the tile */
export const STAGE_W = 640;
export const STAGE_H = 320;

/*
  A fixed-size design surface scaled to fill its container's width.
  The container keeps a 2:1 box; the stage inside is transformed, never reflowed,
  so the mini UI looks identical at every tile size.
*/
export function ScaledStage({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / STAGE_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn('relative aspect-[2/1] w-full overflow-hidden', className)}>
      <div
        style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}
        className="absolute top-0 left-0 font-sans antialiased"
      >
        {children}
      </div>
    </div>
  );
}

type ShowcaseProps = {
  hero: React.ReactNode;
  dashboard: React.ReactNode;
  /** Accessible description of what the picture shows */
  label: string;
  className?: string;
};

/*
  A 2:1 window over two stacked stages, looping on its own: the landing hero holds, the
  column slides up by half to the dashboard, holds, and slides back. The loop only runs
  while the window is on screen. Reduced motion holds the hero.
*/
export function Showcase({ hero, dashboard, label, className }: ShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.3 });

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={cn('relative aspect-[2/1] w-full overflow-hidden', className)}
    >
      {/* The miniature is a picture of the product, not interface: hidden from assistive tech and inert */}
      <div
        aria-hidden
        inert
        className="showcase-loop absolute inset-x-0 top-0 will-change-transform"
        data-play={inView && !reduce ? '' : undefined}
      >
        <ScaledStage>{hero}</ScaledStage>
        <ScaledStage>{dashboard}</ScaledStage>
      </div>
    </div>
  );
}
