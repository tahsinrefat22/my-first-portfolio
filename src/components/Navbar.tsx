'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, DownloadSimple } from '@phosphor-icons/react';
import { Button, ButtonIcon } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { CustomLogo } from '@/components/CustomLogo';
import { NAV_LINKS, NAVIGATION_SECTIONS, CONTACT_MAILTO, CV_PDF_PATH, CV_FILENAME, Z } from '@/lib/constants';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;
/*
  Mobile menu: gap between one item and the next. The panel starts to leave while the
  last item (the first link) is still fading, since the ease-out has it visibly gone
  well before its 0.3s ends; waiting for the full duration read as a pause.
*/
const STAGGER = 0.05;
const EXIT_PANEL_DELAY = NAV_LINKS.length * STAGGER + 0.1;

/*
  Scroll-spy through one IntersectionObserver. The active section is whichever
  crosses a band around 40% from the top of the viewport. No scroll listener.
*/
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string>('hero');

  useEffect(() => {
    if (!enabled) return;
    const els = NAVIGATION_SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);

  return active;
}

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const reduce = useReducedMotion();
  const active = useActiveSection(onHome);
  const [open, setOpen] = useState(false);

  /*
    Lock scroll while the mobile menu is open. The lock lifts only once the close
    animation has finished (see onExitComplete), otherwise the scrollbar returns
    under a still-fading overlay and the page shifts behind it.
  */
  const lockScroll = useCallback((lock: boolean) => {
    document.documentElement.style.overflow = lock ? 'hidden' : '';
  }, []);
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      lockScroll(true);
      return;
    }
    // Belt and braces after a close: never leave the page unscrollable if the exit callback is missed.
    // Only after a real close, or this would lift the preloader's own lock on first mount.
    if (!wasOpen.current) return;
    const t = window.setTimeout(() => lockScroll(false), 1200);
    return () => window.clearTimeout(t);
  }, [open, lockScroll]);
  // Only if the navbar itself unmounts mid-menu
  useEffect(() => () => lockScroll(false), [lockScroll]);

  const close = useCallback(() => setOpen(false), []);

  const hrefFor = (hash: string) => (onHome ? hash : `/${hash}`);

  return (
    <>
      {/* Same container as the page, so the pill's edges land exactly on the content's edges */}
      <header className="pointer-events-none fixed inset-x-0 top-4" style={{ zIndex: Z.nav }}>
        <div className="container-page">
          <nav
            aria-label="Primary"
            className="pointer-events-auto flex h-14 w-full items-center justify-between gap-2 rounded-full bg-background/70 pl-2 pr-2 ring-1 ring-foreground/[0.08] shadow-soft-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 dark:ring-foreground/[0.12]"
          >
          <Link
            href="/"
            aria-label="Home"
            onClick={close}
            className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors duration-300 ease-out-expo hover:bg-foreground/[0.04]"
          >
            <CustomLogo className="size-6" />
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => {
              const id = link.href.slice(1);
              const isActive = onHome && active === id;
              return (
                <li key={link.href}>
                  <a
                    href={hrefFor(link.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-300 ease-out-expo',
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.05] dark:bg-foreground/[0.08]"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            {/* Below lg the CV lives in the bar, since the mobile menu has room for one action only */}
            <Button size="sm" variant="secondary" asChild className="lg:hidden">
              <a href={CV_PDF_PATH} download={CV_FILENAME} aria-label="Download CV">
                CV
                <DownloadSimple weight="regular" className="opacity-60" />
              </a>
            </Button>
            <ThemeToggle />
            <Button size="sm" asChild className="hidden sm:inline-flex">
              <a href={CONTACT_MAILTO}>
                Get in touch
                <ButtonIcon className="size-6 [&_svg]:size-3">
                  <ArrowRight weight="bold" />
                </ButtonIcon>
              </a>
            </Button>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative flex size-10 items-center justify-center rounded-full text-foreground transition-colors duration-300 ease-out-expo hover:bg-foreground/[0.04] lg:hidden"
            >
              <span
                className={cn(
                  'absolute h-px w-4 bg-current transition-transform duration-300 ease-out-expo',
                  open ? 'rotate-45' : '-translate-y-[3px]'
                )}
              />
              <span
                className={cn(
                  'absolute h-px w-4 bg-current transition-transform duration-300 ease-out-expo',
                  open ? '-rotate-45' : 'translate-y-[3px]'
                )}
              />
            </button>
          </div>
          </nav>
        </div>
      </header>

      {/*
        Opening: the panel fades and blurs in, then the items rise into view top to bottom.
        Closing is the exact mirror: the items drop out bottom to top, and only once the
        last one has gone does the panel fade and its blur clear. The blur is animated
        rather than a static class, so it cannot pop off before the fade ends.
      */}
      <AnimatePresence onExitComplete={() => lockScroll(false)}>
        {open && (
          <motion.div
            key="menu"
            initial={reduce ? false : { opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(40px)', transition: { duration: 0.35, ease: EASE } }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)', transition: { duration: 0.35, delay: EXIT_PANEL_DELAY, ease: EASE } }}
            className="fixed inset-0 flex flex-col bg-background/85 lg:hidden"
            style={{ zIndex: Z.nav - 1, WebkitBackdropFilter: 'blur(40px)' }}
          >
            <nav aria-label="Mobile" className="container-page flex grow flex-col justify-center gap-2 pt-24 pb-16">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={hrefFor(link.href)}
                  onClick={close}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: STAGGER + i * STAGGER, ease: EASE } }}
                  exit={{ opacity: 0, y: 16, transition: { duration: 0.3, delay: (NAV_LINKS.length - i) * STAGGER, ease: EASE } }}
                  className={cn(
                    'py-2 text-4xl font-semibold tracking-[-0.03em] transition-colors',
                    onHome && active === link.href.slice(1) ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: STAGGER + NAV_LINKS.length * STAGGER, ease: EASE } }}
                exit={{ opacity: 0, y: 16, transition: { duration: 0.3, delay: 0, ease: EASE } }}
                className="mt-8"
              >
                <Button size="lg" asChild>
                  <a href={CONTACT_MAILTO}>
                    Get in touch
                    <ButtonIcon>
                      <ArrowRight weight="bold" />
                    </ButtonIcon>
                  </a>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
