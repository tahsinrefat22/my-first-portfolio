'use client';

import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring, useReducedMotion } from 'framer-motion';
import { GithubLogo, LinkedinLogo, FacebookLogo, InstagramLogo } from '@phosphor-icons/react';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';

const ICONS = {
  GitHub: GithubLogo,
  LinkedIn: LinkedinLogo,
  Facebook: FacebookLogo,
  Instagram: InstagramLogo,
} as const;

/*
  The signature: a large "Tahsin" under the footer, lit only where the cursor is.
  Pointer values live in motion values, never React state, so tracking costs no renders.
  Under reduced motion the text sits at a quiet fixed opacity with no mask.
*/
export default function Footer() {
  const reduce = useReducedMotion();
  const textRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });
  const glow = useMotionValue(0);
  const glowSpring = useSpring(glow, { stiffness: 200, damping: 30 });

  const mask = useMotionTemplate`radial-gradient(280px circle at ${sx}px ${sy}px, black 25%, transparent 65%)`;

  const entered = useRef(false);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = textRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = e.clientX - r.left;
      const ny = e.clientY - r.top;
      if (!entered.current) {
        // First contact: place the light under the cursor instantly rather than springing in from off-screen
        entered.current = true;
        x.jump(nx);
        y.jump(ny);
        sx.jump(nx);
        sy.jump(ny);
      } else {
        x.set(nx);
        y.set(ny);
      }
      glow.set(1);
    },
    [x, y, sx, sy, glow]
  );

  const onLeave = useCallback(() => {
    glow.set(0);
    entered.current = false;
  }, [glow]);

  return (
    <footer
      className="relative overflow-hidden border-t border-border"
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reduce ? undefined : onLeave}
    >
      <div className="container-page relative z-10 flex flex-col items-center gap-8 py-14 md:py-16">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium text-muted-foreground transition-colors duration-300 ease-out-expo hover:bg-foreground/[0.04] hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-1">
          {SOCIAL_LINKS.map((s) => {
            const Icon = ICONS[s.label];
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-300 ease-out-expo hover:bg-foreground/[0.04] hover:text-foreground"
                >
                  <Icon weight="regular" className="size-5" />
                </a>
              </li>
            );
          })}
        </ul>

        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Tahsin Ahmed Refat
        </p>
      </div>

      <div
        ref={textRef}
        aria-hidden
        className="pointer-events-none relative h-[140px] select-none md:h-[220px] lg:h-[280px]"
      >
        {/* Quiet base layer, always present */}
        <div className="absolute inset-x-0 bottom-0 translate-y-[18%] text-center text-[120px] font-semibold leading-none tracking-[-0.04em] text-foreground/[0.04] md:text-[220px] lg:text-[300px]">
          Tahsin
        </div>
        {/* Lit layer, masked to the cursor */}
        {!reduce && (
          <motion.div
            style={{ maskImage: mask, WebkitMaskImage: mask, opacity: glowSpring }}
            className="absolute inset-x-0 bottom-0 translate-y-[18%] text-center text-[120px] font-semibold leading-none tracking-[-0.04em] text-primary/40 md:text-[220px] lg:text-[300px]"
          >
            Tahsin
          </motion.div>
        )}
      </div>
    </footer>
  );
}
