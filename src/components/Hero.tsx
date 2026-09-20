'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowRight, ArrowDown } from '@phosphor-icons/react';
import { Button, ButtonIcon } from '@/components/ui/button';
import { Bezel } from '@/components/bezel';
import { HeroVideo } from '@/components/hero-video';
import { ScrambleText } from '@/components/scramble-text';
import { usePageReady } from '@/components/preloader';
import { CONTACT_MAILTO } from '@/lib/constants';

const HEADLINE = 'I build web products and ERP systems, end to end.';

const EASE = [0.16, 1, 0.3, 1] as const;

/*
  The one authored motion moment on the page: a single staggered entrance.
  Headline, then subtext, then actions, with the portrait settling alongside.
  Under reduced motion everything is simply there.
*/
const stack: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const settle: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 12 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: 0.12 } },
};

export default function Hero() {
  const reduce = useReducedMotion();
  // The entrance waits for the preloader to lift
  const ready = usePageReady();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-28 pb-16 md:pt-24 md:pb-24"
    >
      <HeroVideo />
      <motion.div
        className="container-page relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
        variants={stack}
        initial={reduce ? false : 'hidden'}
        animate={ready || reduce ? 'show' : 'hidden'}
      >
        {/* Copy: drafted from the career data. Replace with your own words. */}
        <div className="order-2 flex max-w-2xl flex-col gap-6 lg:order-1">
          <motion.h1
            variants={rise}
            aria-label={HEADLINE}
            className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl lg:text-6xl"
          >
            {/* Decodes into itself during the entrance; the rise masks the scrambled first frames */}
            <ScrambleText text={HEADLINE} delay={200} duration={1100} active={ready} />
          </motion.h1>

          <motion.p variants={rise} className="prose-measure text-lg text-muted-foreground md:text-xl">
            Software developer at Softwarelify, previously SpaceSoft and Fusion Infotech. Web products,
            GoHighLevel apps and services, and ERP systems.
          </motion.p>

          <motion.div variants={rise} className="mt-2 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <a href={CONTACT_MAILTO}>
                Get in touch
                <ButtonIcon>
                  <ArrowRight weight="bold" />
                </ButtonIcon>
              </a>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="#projects">
                View projects
                <ArrowDown weight="regular" className="opacity-60" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Smaller and square below lg so the headline and actions stay inside the first viewport */}
        <motion.div variants={settle} className="order-1 mx-auto w-full max-w-[280px] md:max-w-sm lg:order-2 lg:max-w-none">
          <Bezel tone="surface">
            <div className="relative aspect-square w-full md:aspect-[4/5]">
              {/* 4:5 crop of the photo; on the square mobile frame the crop trims top and bottom equally, keeping head and arms */}
              <Image
                src="/portrait.jpg"
                alt="Tahsin Ahmed Refat"
                fill
                priority
                sizes="(max-width: 1024px) 384px, 40vw"
                className="object-cover object-center"
              />
            </div>
          </Bezel>
        </motion.div>
      </motion.div>

      <ScrollCue reduce={!!reduce} />
    </section>
  );
}

/*
  Bottom-centre scroll cue: a mouse outline with a rolling wheel and a label, by the
  owner's explicit choice (the design skills ban this pattern). Built as a CSS shape,
  not an SVG, so the wheel can animate. Appears after the entrance finishes, links to
  the next section, fades out over the first 120px of scroll. Reduced motion renders
  the wheel still via the global override.
*/
function ScrollCue({ reduce }: { reduce: boolean }) {
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 120], [1, 0]);

  return (
    <motion.div
      style={{ opacity: reduce ? 1 : scrollOpacity }}
      className="absolute inset-x-0 bottom-8 z-10 hidden justify-center md:flex"
    >
      <motion.a
        href="#expertise"
        aria-label="Scroll to the next section"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
        className="group flex flex-col items-center gap-3 rounded-2xl px-4 py-3 text-muted-foreground outline-none transition-colors duration-300 ease-out-expo hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
      >
        {/* Mouse body */}
        <span className="relative flex h-9 w-[22px] justify-center rounded-full border-[1.5px] border-current/40 pt-2 transition-colors duration-300 group-hover:border-current/70">
          {/* Wheel */}
          <span className="scroll-wheel block h-2 w-1 rounded-full bg-primary" />
        </span>
        <span className="text-xs font-medium">Scroll for more</span>
      </motion.a>
    </motion.div>
  );
}
