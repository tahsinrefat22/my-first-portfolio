import { cn } from '@/lib/utils';

type BezelProps = React.ComponentProps<'div'> & {
  /** Interactive bezels brighten their ring on hover */
  interactive?: boolean;
  /** Plate colour behind the content */
  tone?: 'card' | 'surface';
};

/*
  One framed container: a hairline ring, a soft tinted shadow, and 6px of plate
  around a concentric clip. The clip has no surface of its own, so this is a
  single card with an inset, never a card inside a card.
  Used only where a container earns its place: project tiles, portraits, photos.
*/
export function Bezel({ interactive = false, tone = 'card', className, children, ...props }: BezelProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-1.5 ring-1 ring-foreground/[0.06] shadow-soft transition-[box-shadow,--tw-ring-color] duration-500 ease-out-expo dark:ring-foreground/[0.10]',
        tone === 'card' ? 'bg-card' : 'bg-surface-1',
        interactive && 'hover:ring-foreground/[0.14] dark:hover:ring-foreground/[0.18]',
        className
      )}
      {...props}
    >
      <div className="relative h-full overflow-hidden rounded-[calc(1rem-0.375rem)]">{children}</div>
    </div>
  );
}
