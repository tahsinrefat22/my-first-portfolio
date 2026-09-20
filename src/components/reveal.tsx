'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = HTMLMotionProps<'div'> & {
  /** Stagger offset in ms */
  delay?: number;
};

/*
  The one section-reveal used everywhere: opacity plus a 12px rise, on entering the
  viewport, once. Under reduced motion nothing is ever hidden. Content is visible by
  default when JS is off, because Motion applies the initial style at runtime.
*/
export function Reveal({ delay = 0, children, ...props }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
