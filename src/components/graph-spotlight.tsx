'use client';

import { useRef } from 'react';
import { motion, useInView, useMotionValue, useMotionTemplate, useSpring, useReducedMotion } from 'framer-motion';

type GraphSpotlightProps = {
  children: React.ReactNode;
  /** A brighter copy of the same graph, revealed only under the cursor */
  bright: React.ReactNode;
  label: string;
};

/*
  Holds the contribution graph in flow and does two things to it.

  Reveal: the cells stay hidden until the graph first scrolls into view, then fill in
  column by column (the animation lives in CSS, keyed off data-in). Once only.

  Spotlight: a bright copy sits over the dim graph, masked to a soft circle that follows
  the pointer. Pointer values live in motion values, so this costs no renders. Touch and
  reduced motion get the dim graph only.
*/
export function GraphSpotlight({ children, bright, label }: GraphSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 320, damping: 32, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 320, damping: 32, mass: 0.5 });
  const mask = useMotionTemplate`radial-gradient(110px circle at ${sx}px ${sy}px, black 30%, transparent 70%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };
  const onLeave = () => {
    x.set(-1000);
    y.set(-1000);
  };

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className="contrib-graph"
      data-in={inView || reduce ? '' : undefined}
      onPointerMove={reduce ? undefined : onMove}
      onPointerLeave={reduce ? undefined : onLeave}
    >
      <div aria-hidden>{children}</div>
      {!reduce && (
        <motion.div aria-hidden className="contrib-bright" style={{ maskImage: mask, WebkitMaskImage: mask }}>
          {bright}
        </motion.div>
      )}
    </div>
  );
}
