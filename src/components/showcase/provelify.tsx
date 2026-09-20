import { Btn, Card, TopNav, Wordmark } from './primitives';
import { cn } from '@/lib/utils';

const ACCENT = '#3b3bff';
const stage = { '--accent': ACCENT } as React.CSSProperties;

/* The landing site's mark: a white speech bubble with a blue check badge and two text bars */
const Mark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" className={cn('shrink-0 drop-shadow-[0_1px_2px_rgba(16,15,13,0.3)]', className)} aria-hidden>
    <path d="M9 20 L6.5 26.5 L15 20 Z" fill="#FFFFFF" />
    <rect x="3.5" y="7.5" width="25" height="13.5" rx="6.75" fill="#FFFFFF" />
    <circle cx="10.8" cy="14.2" r="5.6" fill="#0061FE" opacity="0.16" />
    <circle cx="10.8" cy="14.2" r="4.1" fill="#0061FE" />
    <path d="M8.9 14.3 l1.1 1.2 l2.3 -2.6" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="16.5" y="11.6" width="9" height="2.2" rx="1.1" fill="#C9BFB1" />
    <rect x="16.5" y="15.6" width="5.6" height="2.2" rx="1.1" fill="#E0D8CA" />
  </svg>
);

const Brand = () => (
  <Wordmark mark={<Mark className="size-5" />} className="gap-1 text-[11.5px] tracking-[-0.02em]">
    Provelify
  </Wordmark>
);

export function ProvelifyHero() {
  return (
    <div style={stage} className="relative flex h-full w-full flex-col overflow-hidden bg-[#f7f7fa] text-black">
      <TopNav brand={<Brand />} links={['Proof Types ⌄', 'Use Cases', 'Pricing', 'Resources ⌄']} cta="Get started ↗" />
      {/* The hero fills the rest of the stage and centres its two columns in it */}
      <div className="grid grow grid-cols-[1fr_230px] items-center gap-6 px-8 pb-2">
        <div>
          <div className="flex items-center gap-2 font-mono text-[5.5px] tracking-[0.14em] uppercase" style={{ color: ACCENT }}>
            <span className="inline-block h-px w-4 bg-current" /> Live proof for your funnels
          </div>
          <h3 className="mt-2 text-[27px] leading-[1.02] font-bold tracking-[-0.04em]">
            Where Visitors
            <br />
            Become <span style={{ color: ACCENT }}>Customers</span>.
          </h3>
          <p className="mt-2 max-w-[250px] font-serif text-[7px] leading-snug text-black/65">
            Real activity from your funnels, turned into live notifications that build trust and convert, replaying on every visit.
          </p>
          <div className="mt-2.5 flex gap-2">
            <Btn>Install free ↗</Btn>
            <Btn variant="ghost">▷ See it live</Btn>
          </div>
          <div className="mt-2 flex gap-3 font-serif text-[6px] text-black/55">
            {['Built for your funnels', 'Real-time under 500ms', 'No code, no credit card'].map((t) => (
              <span key={t}><span style={{ color: ACCENT }}>✓</span> {t}</span>
            ))}
          </div>
        </div>
        {/* A funnel page with the proof popup laid over it */}
        <div className="relative">
          <Card className="h-[150px] overflow-hidden bg-linear-to-br from-[#eef9f2] to-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            <div className="text-[9px] leading-tight font-bold tracking-[-0.02em] text-black/70">Scale Your Business<br />to <span className="text-emerald-500">7 Figures</span></div>
            <div className="mt-1 h-1 w-24 rounded bg-black/[0.08]" />
            <div className="mt-1 h-1 w-20 rounded bg-black/[0.06]" />
            <Card className="absolute top-3 right-3 w-[92px] p-1.5 text-[5px]">
              <div className="font-semibold">Book Your <span className="text-amber-500">Free</span> Strategy Call</div>
              <div className="mt-1 grid grid-cols-7 gap-[2px]">
                {Array.from({ length: 21 }).map((_, i) => (
                  <span key={i} className={`h-[6px] rounded-[1px] ${i === 10 ? 'bg-(--accent)' : 'bg-black/[0.05]'}`} />
                ))}
              </div>
            </Card>
          </Card>
          <Card className="absolute bottom-3 -left-4 flex w-[150px] items-center gap-2 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.14)]">
            <span className="inline-block size-7 shrink-0 rounded-md bg-linear-to-br from-amber-100 to-rose-200" />
            <div>
              <div className="text-[7px] font-semibold">Sarah, Mike &amp; 12 others</div>
              <div className="text-[6px] text-black/60">signed up in the last 24 hours</div>
              <div className="flex items-center gap-0.5 text-[5px] font-semibold" style={{ color: ACCENT }}><Mark className="size-2.5" /> Provelify</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/*
  The real app dashboard (apps/web/src/pages/Dashboard.tsx + AppLayout.tsx): warm
  paper ground, brand-blue accent, sidebar with the workspace switcher, Performance
  stat cards, a 24-hour event-frequency bar chart, and Recent activity.
  Tokens from apps/web/tailwind.config.js.
*/
const PT = { paper: '#F4F1EA', cloud: '#FBF9F5', ink: '#100F0D', mute: '#78716C', faint: '#A8A29E', line: '#E9E3D8', brand: '#0061FE', brand50: '#EBF2FF', brand100: '#D1E4FF', brand700: '#0040A8', gray200: '#E4E4E7', gray400: '#A1A1AA', gray900: '#18181B' };

const BARS = [2, 3, 5, 4, 6, 9, 12, 15, 14, 18, 22, 20, 24, 21, 19, 23, 17, 13, 11, 9, 7, 6, 4, 3];

export function ProvelifyDashboard() {
  const nav = ['Dashboard', 'Campaigns', 'Analytics', 'Integrations', 'Connected Sites', 'Billing', 'Settings'];
  const stats = [
    ['Impressions', '14.2K', '◉'],
    ['Unique visitors', '6,841', '⚇'],
    ['Clicks', '912', '↖'],
    ['Conv. rate', '6.4%', '↗'],
  ];
  // EventsTable rows: type dot + label, person, city, label chip, time
  const events: [string, string, string, string, string, string][] = [
    ['#22C55E', 'Form submission', 'Sarah', 'Austin', 'Free consultation', '2m ago'],
    ['#3B82F6', 'Appointment booked', 'James', 'Denver', 'Strategy call', '14m ago'],
    ['#A855F7', 'Payment received', 'Ava', 'Toronto', 'Growth plan', '1h ago'],
    ['#22C55E', 'Form submission', 'Noah', 'Seattle', 'Free consultation', '2h ago'],
  ];
  const max = Math.max(...BARS);
  return (
    <div style={{ ...stage, background: PT.paper, color: PT.gray900 }} className="flex h-full w-full">
      <div className="flex w-[120px] shrink-0 flex-col p-2.5" style={{ background: '#fff', borderRight: `1px solid ${PT.line}` }}>
        <div className="flex items-center gap-1 px-1 text-[8.5px] font-semibold">
          <Mark className="size-4" /> Provelify
        </div>
        <ul className="mt-3 flex flex-col gap-[2px]">
          {nav.map((n, i) => (
            <li key={n} className="flex items-center gap-1.5 rounded-md px-2 py-[4px] text-[7px]" style={i === 0 ? { background: PT.brand50, color: PT.brand700, fontWeight: 600 } : { color: PT.mute }}>
              <span className="inline-block size-[6px] rounded-[2px]" style={{ background: i === 0 ? PT.brand : PT.gray200 }} />
              {n}
            </li>
          ))}
        </ul>
        <div className="mt-auto rounded-lg p-2" style={{ background: '#FAFAFA' }}>
          <div className="flex items-center gap-1.5">
            <span className="grid size-5 shrink-0 place-items-center rounded-full text-[6px] font-semibold" style={{ background: PT.brand100, color: PT.brand700 }}>FS</span>
            <div className="min-w-0">
              <div className="truncate text-[6.5px] font-medium">Fitness Studio</div>
              <div className="text-[5.5px]" style={{ color: PT.gray400 }}>Growth plan</div>
            </div>
            <span className="ml-auto text-[6px]" style={{ color: PT.gray400 }}>⇅</span>
          </div>
        </div>
      </div>

      {/*
        The app's Dashboard page (apps/web/src/pages/Dashboard.tsx): title and subtitle,
        Performance stat cards, the full-width Event frequency chart, then Recent activity
        as the EventsTable (Type, Person, City, Label, Time).
      */}
      <div className="flex grow flex-col p-3">
        <div className="text-[11px] font-semibold tracking-[-0.02em]">Dashboard</div>
        <div className="text-[6px]" style={{ color: PT.gray400 }}>Here&apos;s what&apos;s happening with your Provelify notifications today.</div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[6.5px] font-semibold">Performance</span>
          <span className="text-[5.5px] font-medium" style={{ color: PT.brand }}>View full analytics →</span>
        </div>
        <div className="mt-1 grid grid-cols-4 gap-2">
          {stats.map(([label, value, icon]) => (
            <div key={label} className="rounded-lg px-2 py-1.5" style={{ background: '#fff', border: `1px solid ${PT.gray200}` }}>
              <div className="flex items-center justify-between">
                <span className="text-[6px]" style={{ color: PT.mute }}>{label} ⓘ</span>
                <span className="grid size-4 place-items-center rounded-[5px] text-[7px]" style={{ background: PT.brand50, color: PT.brand }}>{icon}</span>
              </div>
              <div className="mt-0.5 text-[12px] font-semibold tracking-[-0.02em]">{value}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 rounded-lg px-2 py-1.5" style={{ background: '#fff', border: `1px solid ${PT.gray200}` }}>
          <div className="flex items-center justify-between">
            <span className="text-[6.5px] font-semibold">Event frequency — last 24 hours</span>
            <span className="text-[5.5px]" style={{ color: PT.gray400 }}>⚡ 1.4s to first proof · 132 events</span>
          </div>
          <div className="mt-1.5 flex h-[34px] items-end gap-[2px]">
            {BARS.map((b, i) => (
              <span key={i} className="grow rounded-[1px]" style={{ height: `${Math.max(4, (b / max) * 100)}%`, background: b > 0 ? PT.brand : PT.gray200, opacity: b > 0 ? 1 : 0.4 }} />
            ))}
          </div>
          <div className="mt-0.5 flex justify-between text-[5px]" style={{ color: PT.gray400 }}><span>24h ago</span><span>now</span></div>
        </div>
        <div className="mt-2 flex grow flex-col overflow-hidden rounded-lg" style={{ background: '#fff', border: `1px solid ${PT.gray200}` }}>
          <div className="flex items-center justify-between px-2 py-1.5" style={{ borderBottom: `1px solid ${PT.line}` }}>
            <span className="text-[6.5px] font-semibold">Recent activity</span>
            <span className="text-[5.5px] font-medium" style={{ color: PT.brand }}>View all →</span>
          </div>
          <table className="w-full text-left text-[5.5px]">
            <thead>
              <tr className="text-[5px] uppercase tracking-[0.06em]" style={{ color: PT.gray400, background: '#FAFAFA' }}>
                {['Type', 'Person', 'City', 'Label', 'Time'].map((h) => (
                  <th key={h} className="px-2 py-[3px] font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map(([color, type, person, city, label, when]) => (
                <tr key={person} style={{ borderTop: `1px solid ${PT.line}` }}>
                  <td className="px-2 py-[3px]"><span className="flex items-center gap-1"><span className="inline-block size-[5px] rounded-full" style={{ background: color }} />{type}</span></td>
                  <td className="px-2 py-[3px] font-medium">{person}</td>
                  <td className="px-2 py-[3px]" style={{ color: PT.mute }}>{city}</td>
                  <td className="px-2 py-[3px]"><span className="rounded-full px-1.5 py-[1px] text-[5px] font-medium" style={{ background: PT.brand50, color: PT.brand700 }}>{label}</span></td>
                  <td className="px-2 py-[3px]" style={{ color: PT.gray400 }}>{when}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-auto px-2 py-1 text-[5px]" style={{ borderTop: `1px solid ${PT.line}`, color: PT.gray400 }}>Showing last 8 events</div>
        </div>
      </div>
    </div>
  );
}

export const provelify = { hero: <ProvelifyHero />, dashboard: <ProvelifyDashboard /> };
