import { cn } from '@/lib/utils';
import { Reveal } from '@/components/reveal';

type SectionHeadingProps = {
  title: string;
  /** One sentence under the title. Keep it under 25 words. */
  lede?: string;
  align?: 'left' | 'center';
  className?: string;
};

/*
  A heading and an optional lede. No eyebrow, ever: the heading carries its own weight.
  Sentence case is enforced by convention at the call site, not here.
*/
export function SectionHeading({ title, lede, align = 'left', className }: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.02em] md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {lede && (
        <p className="prose-measure text-base text-muted-foreground md:text-lg">{lede}</p>
      )}
    </Reveal>
  );
}
