'use client';

import { useRef, useSyncExternalStore } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Section } from '@/components/section';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { GithubMenu } from '@/components/github-menu';
import { Button } from '@/components/ui/button';
import { Showcase } from '@/components/showcase/stage';
import { SHOWCASES } from '@/components/showcase';
import { PROJECTS, type Project } from '@/data/projects';
import { cn } from '@/lib/utils';

const LEDE =
  'Five live products built with one team across SpaceSoft and Softwarelify, three of them GoHighLevel marketplace apps. Each one plays from its landing page into the app.';

type Edge = 'top' | 'right' | 'bottom' | 'left';

/* The first product is on stage from the start; each next one arrives from the next edge in this cycle */
const EDGES: Edge[] = ['left', 'right', 'bottom', 'top'];

/*
  Scroll progress windows. Each arrival takes DUR of the track; the rest is hold time, so
  a product sits still long enough to be looked at before the next one lands.
*/
const LEAD = 0.06;
const STEP = 0.22;
const DUR = 0.14;
const arrival = (i: number): [number, number] => [LEAD + (i - 1) * STEP, LEAD + (i - 1) * STEP + DUR];

/* Start and end share a unit so the interpolation stays in viewport units */
const OFFSET: Record<Edge, { axis: 'x' | 'y'; from: string; to: string }> = {
  top: { axis: 'y', from: '-110vh', to: '0vh' },
  bottom: { axis: 'y', from: '110vh', to: '0vh' },
  left: { axis: 'x', from: '-110vw', to: '0vw' },
  right: { axis: 'x', from: '110vw', to: '0vw' },
};

const LG = '(min-width: 1024px)';
const subscribeLg = (cb: () => void) => {
  const mq = window.matchMedia(LG);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const getLg = () => window.matchMedia(LG).matches;

/*
  The products section as a scroll-driven stage. One product at a time fills the stage,
  the looping miniature above and its description below. Scrolling
  brings the next one in over the current one from the left, then the right, then the
  bottom, then the top. Below lg, and under reduced motion, it is a plain stacked list.
*/
export function ProjectsStage() {
  const reduce = useReducedMotion();
  const lg = useSyncExternalStore(subscribeLg, getLg, () => false);

  if (!lg || reduce) return <ProjectsList />;
  return <PinnedStage />;
}

function Header() {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <SectionHeading title="Products I have worked on" lede={LEDE} />
      <Reveal delay={80} className="shrink-0">
        <GithubMenu />
      </Reveal>
    </div>
  );
}

function ProjectsList() {
  return (
    <Section id="projects">
      <Header />
      <div className="mt-14 flex flex-col gap-6 md:mt-16">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.id}>
            <ProductSlide project={project} index={i} onStage={false} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function PinnedStage() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });

  return (
    <section id="projects" className="pt-24 md:pt-32">
      <div className="container-page">
        <Header />
      </div>
      {/* Five screens of scroll; the stage inside stays pinned for the middle of it */}
      <div ref={track} className="relative h-[500vh]">
        <div className="sticky top-0 h-dvh overflow-hidden pt-24 pb-6">
          <div className="container-page h-full">
            {/* The stacked slides fill this box, inside the page gutters, top to bottom */}
            <div className="relative h-full">
              {PROJECTS.map((project, i) => (
                <StageSlide key={project.id} progress={scrollYProgress} index={i} last={i === PROJECTS.length - 1}>
                  <ProductSlide project={project} index={i} onStage />
                </StageSlide>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
  Positions one slide on the stage. The first sits in flow and sets the stage height; the
  others are stacked over it. Each arrives along its edge during its window, and the one
  underneath recedes a little while it is being covered.
*/
function StageSlide({
  progress,
  index,
  last,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  last: boolean;
  children: React.ReactNode;
}) {
  const edge = EDGES[(index - 1 + EDGES.length) % EDGES.length];
  const { axis, from, to } = OFFSET[edge];
  // The first slide never travels: a window it can never reach leaves it at rest
  const arrive = index === 0 ? ([-2, -1] as [number, number]) : arrival(index);
  const covered = last ? ([2, 3] as [number, number]) : arrival(index + 1);

  const travel = useTransform(progress, arrive, [from, to]);
  // The cards are transparent, so the one being replaced recedes and fades out as the next arrives
  const scale = useTransform(progress, covered, [1, 0.94]);
  const opacity = useTransform(progress, covered, [1, 0]);

  return (
    <motion.div
      className={index === 0 ? 'relative h-full' : 'absolute inset-0'}
      style={{ [axis]: travel, scale, opacity, zIndex: index }}
    >
      {children}
    </motion.div>
  );
}

/*
  One product, no frame: the looping miniature across the full width, then the name,
  description, stack, and the link button beneath it. On the stage the slide fills the
  viewport height and the miniature is capped by that height (a 2:1 window can be no
  taller than what is left under the navbar once the text has its room), so on short
  screens it narrows and stays centred instead of pushing the text out of view.
*/
function ProductSlide({ project, index, onStage }: { project: Project; index: number; onStage: boolean }) {
  const showcase = SHOWCASES[project.showcase];

  return (
    <article className={cn('flex flex-col gap-6 md:gap-8', onStage && 'h-full justify-center')}>
      <div
        className={cn(
          'mx-auto w-full overflow-hidden rounded-xl ring-1 ring-foreground/[0.06]',
          onStage && 'max-w-[calc((100dvh-22rem)*2)]'
        )}
      >
        <Showcase hero={showcase.hero} dashboard={showcase.dashboard} label={`${project.name}: landing page, then dashboard`} />
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs text-muted-foreground">
            {String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
          </span>
          <h3 className="text-2xl font-medium tracking-[-0.01em] md:text-3xl">{project.name}</h3>
          <p className="prose-measure text-muted-foreground md:text-lg">{project.summary}</p>
          <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
            {project.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <Button size="lg" variant="secondary" asChild className="shrink-0">
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            Visit {project.name}
            <ArrowUpRight weight="regular" className="opacity-60" />
          </a>
        </Button>
      </div>
    </article>
  );
}
