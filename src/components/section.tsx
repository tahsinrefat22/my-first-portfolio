import { cn } from '@/lib/utils';

type SectionProps = React.ComponentProps<'section'> & {
  /** Tint the section with the surface-1 band */
  tinted?: boolean;
  /** Skip the inner page container (for full-bleed children) */
  bare?: boolean;
};

/*
  Every section gets the same vertical rhythm and page container.
  The density dial is 3: py-24 on mobile, py-32 from md.
*/
export function Section({ tinted = false, bare = false, className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn('py-24 md:py-32', tinted && 'bg-surface-1', className)}
      {...props}
    >
      {bare ? children : <div className="container-page">{children}</div>}
    </section>
  );
}
