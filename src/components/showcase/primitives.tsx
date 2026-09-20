import { cn } from '@/lib/utils';

/*
  Small building blocks for the 640x320 mini UIs. Each product sets `--accent` on its
  stage; everything here reads it. Sizes are in px because the stage is scaled, never reflowed.
*/

/*
  A product's real logo, served from public/showcase. Sized by height; the width follows.
  Plain img: these are tiny decorative marks inside an inert picture, not content images.
*/
export function Logo({ src, alt = '', className }: { src: string; alt?: string; className?: string }) {
  // In a flex column pass self-start, or the image stretches to the column's width
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} draggable={false} className={cn('block h-3.5 w-auto shrink-0', className)} />;
}

export function Wordmark({ children, mark, className }: { children: React.ReactNode; mark?: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[-0.01em]', className)}>
      {mark ?? <span className="inline-block size-3.5 rounded-[4px] bg-(--accent)" />}
      {children}
    </span>
  );
}

export function TopNav({
  brand,
  links,
  cta,
  secondary,
  className,
}: {
  brand: React.ReactNode;
  links: string[];
  cta: string;
  secondary?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex h-9 items-center justify-between px-6', className)}>
      {brand}
      <div className="flex items-center gap-4 text-[8.5px] text-black/60">
        {links.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {secondary && <span className="text-[8.5px] font-medium text-black/70">{secondary}</span>}
        <Btn>{cta}</Btn>
      </div>
    </div>
  );
}

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-black/[0.05] px-2 py-[3px] text-[7px] font-medium text-black/60',
        className
      )}
    >
      {children}
    </span>
  );
}

export function Btn({
  children,
  variant = 'primary',
  className,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'dark';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1 rounded-full px-3 text-[8px] font-semibold',
        variant === 'primary' && 'bg-(--accent) text-white',
        variant === 'dark' && 'bg-[#111] text-white',
        variant === 'ghost' && 'bg-white text-black/75 ring-1 ring-black/10',
        className
      )}
    >
      {children}
    </span>
  );
}

export function Input({ placeholder, action, className }: { placeholder: string; action?: string; className?: string }) {
  return (
    <span className={cn('inline-flex h-7 items-center justify-between rounded-full bg-white pr-1 pl-3 text-[8px] text-black/40 shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06]', className)}>
      {placeholder}
      {action && <Btn className="h-5 px-2.5 text-[7.5px]">{action}</Btn>}
    </span>
  );
}

export function Sidebar({
  brand,
  items,
  active,
  footer,
  className,
}: {
  brand: React.ReactNode;
  items: string[];
  active: string;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex h-full w-[120px] shrink-0 flex-col border-r border-black/[0.06] bg-white px-2.5 py-3', className)}>
      <div className="px-1">{brand}</div>
      <ul className="mt-3 flex flex-col gap-[3px]">
        {items.map((it) => (
          <li
            key={it}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-2 py-[4px] text-[8px]',
              it === active ? 'bg-(--accent)/10 font-semibold text-(--accent)' : 'text-black/60'
            )}
          >
            <span className={cn('inline-block size-[6px] rounded-[2px]', it === active ? 'bg-(--accent)' : 'bg-black/15')} />
            {it}
          </li>
        ))}
      </ul>
      {footer && <div className="mt-auto">{footer}</div>}
    </div>
  );
}

export function Stat({ label, value, tint, className }: { label: string; value: string; tint?: string; className?: string }) {
  return (
    <div className={cn('rounded-lg bg-white p-2.5 ring-1 ring-black/[0.06]', className)} style={tint ? { borderTop: `2px solid ${tint}` } : undefined}>
      <div className="text-[7px] text-black/50">{label}</div>
      <div className="mt-0.5 text-[13px] font-semibold tracking-[-0.02em]" style={tint ? { color: tint } : undefined}>
        {value}
      </div>
    </div>
  );
}

/* A sparkline: polyline plus soft fill. Points are 0..1 in both axes. */
export function Spark({ points, color, className, fill = true }: { points: number[]; color: string; className?: string; fill?: boolean }) {
  const w = 100;
  const h = 40;
  const pts = points.map((p, i) => [(i / (points.length - 1)) * w, h - p * h * 0.85 - 3] as const);
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={cn('block h-full w-full', className)} aria-hidden>
      {fill && <path d={`${d} L${w},${h} L0,${h} Z`} fill={color} opacity="0.14" />}
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function Row({ cells, header = false, className }: { cells: React.ReactNode[]; header?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        'grid items-center gap-2 px-3 text-[7.5px]',
        header ? 'h-6 text-[6.5px] font-medium tracking-[0.06em] text-black/45 uppercase' : 'h-7 border-t border-black/[0.05] text-black/75',
        className
      )}
    >
      {cells.map((c, i) => (
        <span key={i} className={cn(i > 0 && 'text-right')}>
          {c}
        </span>
      ))}
    </div>
  );
}

export function Card({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={cn('rounded-lg bg-white ring-1 ring-black/[0.06]', className)} style={style}>
      {children}
    </div>
  );
}

/* Faint blueprint grid, used by a couple of the landing heroes */
export function GridBg({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0', className)}
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)',
      }}
    />
  );
}
