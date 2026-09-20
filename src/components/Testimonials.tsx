import Image from 'next/image';
import { Section } from '@/components/section';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { TESTIMONIALS } from '@/data/testimonials';

/*
  Four quotes, two columns, no cards, no carousel, no read-more.
  Each quote is its full length; the column measure keeps it readable.
*/
export default function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading title="From colleagues" align="center" className="mx-auto" />

      <div className="mt-14 grid grid-cols-1 gap-x-16 gap-y-14 md:mt-20 md:grid-cols-2 md:gap-y-20">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.id} delay={(i % 2) * 80}>
            <figure className="flex h-full flex-col gap-6">
              <blockquote className="max-w-[46ch] text-base leading-relaxed text-foreground/85 md:text-lg">
                <span aria-hidden className="mr-0.5 text-primary">&ldquo;</span>
                {t.quote}
                <span aria-hidden className="ml-0.5 text-primary">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-4">
                <span className="relative size-10 shrink-0 overflow-hidden rounded-xl bg-surface-1 ring-1 ring-foreground/[0.08]">
                  <Image src={t.image} alt="" fill sizes="40px" className="object-cover" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {t.role}
                    <span className="mx-1.5 opacity-50">&middot;</span>
                    {t.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
