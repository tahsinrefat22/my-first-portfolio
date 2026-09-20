'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, CaretLeft, CaretRight, X } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/reveal';
import { Bezel } from '@/components/bezel';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { companyData } from '@/data/companyData';
import { TEAM_LINKS } from '@/data/teamLinks';
import { Z } from '@/lib/constants';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

/* Wrap any team member's name in the prose with a link to their profile */
function renderTextWithLinks(text: string) {
  let result: (string | React.ReactElement)[] = [text];
  TEAM_LINKS.forEach((link) => {
    const next: (string | React.ReactElement)[] = [];
    result.forEach((part) => {
      if (typeof part !== 'string') return next.push(part);
      const parts = part.split(link.text);
      parts.forEach((p, idx) => {
        if (p) next.push(p);
        if (idx < parts.length - 1) {
          next.push(
            <a
              key={`${link.text}-${idx}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline decoration-primary/40 underline-offset-[0.2em] transition-colors hover:decoration-primary"
            >
              {link.text}
            </a>
          );
        }
      });
    });
    result = next;
  });
  return result;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{children}</h2>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-[100dvh]">
        {children}
      </main>
      <Footer />
    </>
  );
}

function CareerContent() {
  const searchParams = useSearchParams();
  const company = searchParams.get('company');
  const data = company ? companyData[company] : null;
  const reduce = useReducedMotion();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = useMemo(
    () => data?.lifeAtCompany?.flatMap((item) => (item.image ? [item.image] : [])) ?? [],
    [data]
  );

  const next = useCallback(() => setIndex((i) => (i + 1) % Math.max(images.length, 1)), [images.length]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % Math.max(images.length, 1)),
    [images.length]
  );
  const open = useCallback((i: number) => {
    setIndex(i);
    setLightboxOpen(true);
  }, []);
  const close = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, next, prev, close]);

  if (!data) {
    return (
      <Shell>
        <div className="container-page flex min-h-[70dvh] flex-col items-start justify-center gap-6 pt-28">
          <h1 className="text-4xl font-semibold tracking-[-0.03em] md:text-5xl">Company not found</h1>
          <p className="prose-measure text-muted-foreground">
            There is no career entry at this address. The two that exist are SpaceSoft and Fusion Infotech.
          </p>
          <Button variant="secondary" asChild>
            <Link href="/#about">
              <ArrowLeft weight="regular" />
              Back to about
            </Link>
          </Button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <article className="container-page pt-28 pb-24 md:pt-36 md:pb-32">
        <Reveal>
          <Button variant="ghost" size="sm" asChild className="-ml-3">
            <Link href="/#about">
              <ArrowLeft weight="regular" />
              Back to about
            </Link>
          </Button>
        </Reveal>

        <Reveal delay={40} className="mt-8 flex flex-col gap-3">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl lg:text-6xl">
            {data.linkedinUrl ? (
              <a
                href={data.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-baseline gap-2 transition-colors hover:text-primary"
              >
                {data.name}
                <ArrowUpRight
                  weight="regular"
                  className="size-6 self-center text-muted-foreground transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary md:size-8"
                />
              </a>
            ) : (
              data.name
            )}
          </h1>
          <p className="flex flex-wrap items-baseline gap-x-3 text-lg text-muted-foreground md:text-xl">
            <span className="font-medium text-foreground">{data.title}</span>
            <span className="font-mono text-sm tabular-nums md:text-base">{data.period}</span>
          </p>
          {data.note && <p className="prose-measure text-sm text-muted-foreground">{data.note}</p>}
        </Reveal>

        {data.technologies && (
          <Reveal delay={80} className="mt-12 flex flex-col gap-5 md:mt-16">
            <SectionTitle>Technologies used</SectionTitle>
            <ul className="flex flex-wrap gap-2">
              {data.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-foreground/[0.04] px-3.5 py-1.5 text-sm font-medium ring-1 ring-foreground/[0.06] dark:bg-foreground/[0.06]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal delay={120} className="mt-14 flex flex-col gap-5 md:mt-20">
          <SectionTitle>About my role</SectionTitle>
          <div className="prose-measure flex flex-col gap-4 text-base text-muted-foreground md:text-lg">
            {data.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        {data.lifeAtCompany && (
          <div className="mt-14 flex flex-col gap-6 md:mt-20">
            <Reveal>
              <SectionTitle>Life at {data.name}</SectionTitle>
            </Reveal>
            <div className="flex flex-col gap-14 md:gap-20">
              {data.lifeAtCompany.map((item, i) => {
                const imgIndex = item.image ? images.indexOf(item.image) : -1;
                /* Item 2 goes full width to break the image/text alternation */
                const layout: 'left' | 'right' | 'full' = i === 1 ? 'full' : i % 2 === 0 ? 'left' : 'right';

                const image = item.image && (
                  <button
                    type="button"
                    onClick={() => imgIndex >= 0 && open(imgIndex)}
                    aria-label={`Open photo ${imgIndex + 1} of ${images.length}`}
                    className="group block w-full cursor-zoom-in rounded-2xl text-left outline-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4"
                  >
                    <Bezel interactive>
                      <div className={cn('relative w-full', layout === 'full' ? 'aspect-[21/9]' : 'aspect-[4/3]')}>
                        <Image
                          src={item.image}
                          alt={`Life at ${data.name}, photo ${i + 1}`}
                          fill
                          sizes={layout === 'full' ? '(max-width: 1152px) 100vw, 1152px' : '(max-width: 768px) 100vw, 50vw'}
                          className="object-cover"
                        />
                      </div>
                    </Bezel>
                  </button>
                );

                const text = (
                  <p className={cn('text-base leading-relaxed text-muted-foreground md:text-lg', layout === 'full' ? 'prose-measure' : 'max-w-[46ch]')}>
                    {renderTextWithLinks(item.text)}
                  </p>
                );

                if (layout === 'full') {
                  return (
                    <Reveal key={i} className="flex flex-col gap-6">
                      {image}
                      {text}
                    </Reveal>
                  );
                }

                return (
                  <Reveal
                    key={i}
                    className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12"
                  >
                    <div className={cn(layout === 'right' && 'md:order-2')}>{image}</div>
                    <div className={cn(layout === 'right' && 'md:order-1')}>{text}</div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        )}

        {data.achievements && (
          <Reveal className="mt-14 flex flex-col gap-6 md:mt-20">
            <SectionTitle>Key achievements</SectionTitle>
            <ul className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
              {data.achievements.map((a, i) => (
                <li key={i} className="border-t border-border pt-4 text-base leading-relaxed text-muted-foreground">
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </article>

      <AnimatePresence>
        {lightboxOpen && images.length > 0 && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 flex items-center justify-center bg-background/90 p-4 backdrop-blur-xl md:p-10"
            style={{ zIndex: Z.overlay }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/[0.06]"
            >
              <X weight="regular" className="size-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  aria-label="Previous photo"
                  className="absolute top-1/2 left-4 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground ring-1 ring-foreground/[0.1] transition-colors hover:bg-background"
                >
                  <CaretLeft weight="bold" className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  aria-label="Next photo"
                  className="absolute top-1/2 right-4 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground ring-1 ring-foreground/[0.1] transition-colors hover:bg-background"
                >
                  <CaretRight weight="bold" className="size-5" />
                </button>
                <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 font-mono text-xs text-muted-foreground tabular-nums ring-1 ring-foreground/[0.08]">
                  {index + 1} / {images.length}
                </p>
              </>
            )}

            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88dvh] w-full max-w-6xl"
            >
              <Image
                src={images[index]}
                alt={`Life at ${data.name}, photo ${index + 1}`}
                width={1920}
                height={1080}
                priority
                className="mx-auto max-h-[88dvh] w-auto rounded-2xl object-contain shadow-soft"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Shell>
  );
}

export default function CareerPage() {
  return (
    <Suspense
      fallback={
        <Shell>
          <div className="container-page flex min-h-[70dvh] items-center justify-center pt-28">
            <p className="text-sm text-muted-foreground">Loading</p>
          </div>
        </Shell>
      }
    >
      <CareerContent />
    </Suspense>
  );
}
