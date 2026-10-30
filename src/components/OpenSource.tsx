import { ArrowUpRight, Check, GitMerge, X } from '@phosphor-icons/react/dist/ssr';
import { Section } from '@/components/section';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { Bezel } from '@/components/bezel';
import { Button } from '@/components/ui/button';
import { CONTRIBUTIONS, MAINTAINED, type Contribution } from '@/data/openSource';
import { cn } from '@/lib/utils';

/*
  Work given back, then work looked after. A merged pull request reads as a short
  story (what was wrong, what changed, when it shipped) beside the cases from its own
  tests, so the change makes sense without opening GitHub. Maintained projects are a
  compact list, the same shape as the career timeline in About.
*/
export default function OpenSource() {
  return (
    <Section id="open-source" tinted>
      <SectionHeading
        title="Open source"
        lede="A fix I got merged into Outline, and the open-source app I wrote it for."
      />

      <div className="mt-14 flex flex-col gap-16 md:mt-16 md:gap-20">
        {CONTRIBUTIONS.map((c) => (
          <ContributionEntry key={c.id} contribution={c} />
        ))}

        <Reveal className="flex flex-col">
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">Maintained</h3>
          <ul className="flex flex-col divide-y divide-border border-y border-border">
            {MAINTAINED.map((p) => (
              <li key={p.name}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 py-5 transition-colors duration-300 ease-out-expo hover:text-primary"
                >
                  <div className="flex min-w-0 flex-col gap-0.5 pr-4">
                    <span className="font-medium">{p.name}</span>
                    <span className="text-sm text-muted-foreground">{p.description}</span>
                    <span className="text-xs text-muted-foreground/80">{p.role}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-4">
                    <span className="font-mono text-xs text-muted-foreground md:text-sm">{p.license}</span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      weight="regular"
                    />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

function ContributionEntry({ contribution: c }: { contribution: Contribution }) {
  const [primary, ...rest] = c.links;
  return (
    <article className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
      <Reveal className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-sm text-muted-foreground">
            {c.repo} <span className="text-foreground">#{c.number}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
            <GitMerge weight="bold" className="size-3.5" />
            Merged
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-medium tracking-[-0.01em] md:text-3xl">{c.title}</h3>
          <p className="font-mono text-xs text-muted-foreground">{c.prTitle}</p>
        </div>

        <p className="prose-measure text-muted-foreground md:text-lg">{c.summary}</p>

        {/* Opened, merged, released: dots on one hairline, the last one in the accent */}
        <ol className="mt-2 grid grid-cols-3 gap-4 border-t border-border pt-4">
          {c.timeline.map((step, i) => (
            <li key={step.label} className="relative flex flex-col gap-0.5">
              <span
                aria-hidden
                className={cn(
                  'absolute -top-[21px] left-0 size-2.5 rounded-full ring-4 ring-surface-1',
                  i === c.timeline.length - 1 ? 'bg-primary' : 'bg-foreground/25'
                )}
              />
              <span className="text-xs text-muted-foreground">{step.label}</span>
              <span className="font-mono text-sm tabular-nums">{step.date}</span>
              {step.detail && <span className="text-xs text-muted-foreground">{step.detail}</span>}
            </li>
          ))}
        </ol>

        <p className="font-mono text-xs text-muted-foreground tabular-nums">
          <span className="text-primary">+{c.diff.additions}</span> &minus;{c.diff.deletions}
          <span className="mx-1.5 opacity-50">&middot;</span>
          {c.diff.files} files
          <span className="mx-1.5 opacity-50">&middot;</span>
          {c.diff.commits} commits, tests included
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" asChild>
            <a href={primary.href} target="_blank" rel="noopener noreferrer">
              {primary.label}
              <ArrowUpRight weight="regular" className="opacity-60" />
            </a>
          </Button>
          {rest.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
                <ArrowUpRight weight="regular" className="opacity-60" />
              </a>
            </Button>
          ))}
        </div>
      </Reveal>

      {c.cases && (
        <Reveal delay={80}>
          <Bezel>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border px-5 py-4">
              <span className="text-sm font-medium">Redirect URIs a client can register</span>
              <span className="font-mono text-xs text-muted-foreground">from the merged tests</span>
            </div>
            <ul className="flex flex-col divide-y divide-border">
              {c.cases.map((item) => (
                <li
                  key={item.value}
                  className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span
                      aria-hidden
                      className={cn(
                        'grid size-5 shrink-0 place-items-center rounded-full',
                        item.accepted ? 'bg-accent text-primary' : 'bg-foreground/[0.06] text-muted-foreground'
                      )}
                    >
                      {item.accepted ? <Check weight="bold" className="size-3" /> : <X weight="bold" className="size-3" />}
                    </span>
                    <span className="sr-only">{item.accepted ? 'Accepted:' : 'Refused:'}</span>
                    {/* Wraps rather than truncates: the URI is the point of the row */}
                    <code className={cn('font-mono text-[13px] break-all sm:text-sm', !item.accepted && 'text-muted-foreground')}>
                      {item.value}
                    </code>
                  </span>
                  <span className="pl-8 text-sm text-muted-foreground sm:shrink-0 sm:pl-0 sm:text-right">{item.reason}</span>
                </li>
              ))}
            </ul>
          </Bezel>
        </Reveal>
      )}
    </article>
  );
}
