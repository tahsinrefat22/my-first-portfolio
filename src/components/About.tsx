import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Section } from '@/components/section';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { Bezel } from '@/components/bezel';
import { companyData } from '@/data/companyData';
import { ContributionGraph } from '@/components/contribution-graph';

// Most recent first
const CAREER: Array<{ slug: keyof typeof companyData }> = [
  { slug: 'spacesoft' },
  { slug: 'fusion-infotech' },
];

export default function About() {
  return (
    <Section id="about" tinted>
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="mx-auto flex w-full max-w-sm flex-col gap-8 lg:sticky lg:top-28 lg:max-w-none">
          <Reveal>
            <Bezel tone="surface">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/portrait-casual.jpg"
                  alt="Tahsin, off duty"
                  fill
                  sizes="(max-width: 1024px) 384px, 36vw"
                  className="object-cover object-bottom"
                />
              </div>
            </Bezel>
          </Reveal>
          {/* A year of commits from both accounts; fills in left to right the first time it scrolls into view */}
          <ContributionGraph />
        </div>

        <div className="flex flex-col gap-10">
          <SectionHeading title="About me" />

          {/* Copy: drafted from the career data. Replace with your own words. */}
          <Reveal delay={60} className="prose-measure flex flex-col gap-5 text-base text-muted-foreground md:text-lg">
            <p>
              Full-stack developer. I started on ERPNext at Fusion Infotech, and since 2025 I have
              built AI-driven web products at SpaceSoft, now Softwarelify, on Next.js, Fastify, and
              PostgreSQL.
            </p>
            <p>
              I also build GoHighLevel marketplace apps, three of them live, do GHL work for
              agencies, and run the servers it all ships on. I care most about the parts of a
              system that people touch every day.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-sm md:text-base">
              <dt className="text-muted-foreground">Currently</dt>
              <dd className="font-medium">Software Developer, Softwarelify (transferred from SpaceSoft, same group)</dd>
              <dt className="text-muted-foreground">Previously</dt>
              <dd className="font-medium">Junior Full Stack Engineer, Fusion Infotech Ltd</dd>
              <dt className="text-muted-foreground">Focus</dt>
              <dd className="font-medium">Web products, GoHighLevel, ERP systems</dd>
              <dt className="text-muted-foreground">Services</dt>
              <dd className="font-medium">GHL marketplace apps, snapshots, workflow automations, integrations, fixes, and server setup</dd>
            </dl>
          </Reveal>

          <Reveal delay={180} className="flex flex-col">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">Career</h3>
            <ol className="flex flex-col divide-y divide-border border-y border-border">
              {CAREER.map(({ slug }) => {
                const job = companyData[slug];
                return (
                  <li key={slug}>
                    <Link
                      href={`/career?company=${slug}`}
                      className="group flex items-center justify-between gap-6 py-5 transition-colors duration-300 ease-out-expo hover:text-primary"
                    >
                      <div className="flex min-w-0 flex-col gap-0.5 pr-4">
                        <span className="font-medium">{job.name}</span>
                        <span className="text-sm text-muted-foreground">{job.title}</span>
                        {job.noteShort && <span className="text-xs text-muted-foreground/80">{job.noteShort}</span>}
                      </div>
                      <div className="flex shrink-0 items-center gap-4">
                        <span className="font-mono text-xs whitespace-nowrap text-muted-foreground tabular-nums md:text-sm">
                          {job.period}
                        </span>
                        <ArrowUpRight
                          className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                          weight="regular"
                        />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
