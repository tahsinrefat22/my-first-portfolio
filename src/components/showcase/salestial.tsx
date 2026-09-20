import { Card, Logo, Pill, Spark, TopNav } from './primitives';

const ACCENT = '#9b00ff';
const stage = { '--accent': ACCENT } as React.CSSProperties;

const Brand = () => <Logo src="/showcase/salestial.png" className="h-3.5" />;

export function SalestialHero() {
  return (
    <div style={stage} className="relative h-full w-full bg-[#fbfafe] pt-4 text-black">
      <div className="mx-6 rounded-full bg-white/80 shadow-[0_2px_16px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.05]">
        <TopNav brand={<Brand />} links={['Sales Solutions ⌄', 'Resources ⌄', 'Pricing']} secondary="WhatsApp" cta="Book a Demo" className="h-8 px-4" />
      </div>
      <div className="mt-7 flex flex-col items-center text-center">
        <Pill>✦ 24/7 AI Support</Pill>
        <h3 className="mt-2 text-[24px] leading-[1.05] font-bold tracking-[-0.03em]">
          Best <span style={{ color: ACCENT }}>Customer Service AI</span>
        </h3>
        <p className="mt-1.5 max-w-[300px] text-[8px] text-black/60">
          Salestial is the all-in-one platform for building &amp; deploying AI support agents for your sales business.
        </p>
      </div>
      {/* The embedded chat widget the real hero leads with */}
      <Card className="absolute inset-x-[150px] top-[186px] h-[124px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2 px-3 pt-2.5">
          <Logo src="/showcase/salestial-mark.png" className="size-4" />
          <div>
            <div className="text-[8px] font-semibold">salestial</div>
            <div className="text-[6px] text-emerald-500">● Online · responds instantly</div>
          </div>
        </div>
        <div className="mx-3 mt-2 w-fit rounded-md bg-black/[0.04] px-2 py-1.5 text-[7px] text-black/70">
          I&apos;m your AI assistant. I can answer questions and book a demo in seconds.
        </div>
        <div className="mt-2.5 flex gap-1.5 px-3">
          {['I would like to get a price quote', 'I want to book a demo', 'Key features'].map((q) => (
            <span key={q} className="rounded-full px-2 py-[3px] text-[6.5px] font-medium ring-1 ring-(--accent)" style={{ color: ACCENT }}>
              {q}
            </span>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 flex h-7 items-center justify-between border-t border-black/[0.05] px-3 text-[7px] text-black/35">
          Type your question...
          <span className="inline-block size-4 rounded-full bg-(--accent)" />
        </div>
      </Card>
    </div>
  );
}

/*
  The real app: the Overview page. Sidebar in three groups (top-level, Agent,
  Workspace), a greeting for a title, four KPIs, Conversation volume beside the
  Lead funnel, then Hot leads beside the Agent leaderboard.
  Tokens from app/globals.css (brand #6062d6, bg #f7f7fa, Inter, radius 10).
*/
const ST = { bg: '#f7f7fa', fg: '#0a0b0c', muted: 'rgba(10,11,12,0.55)', line: 'rgba(10,11,12,0.07)', brand: '#6062d6', brandSoft: 'rgba(96,98,214,0.10)', ok: '#10b981', hot: '#f43f5e', warm: '#f59e0b', cold: '#3b82f6' };

function SCard({ title, action, children, className }: { title: string; action?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className} style={{ background: '#fff', border: `1px solid ${ST.line}`, borderRadius: 10 }}>
      <div className="flex items-center justify-between px-2.5 pt-2 pb-1">
        <span className="text-[7.5px] font-semibold">{title}</span>
        {action && <span className="text-[6px]" style={{ color: ST.muted }}>{action}</span>}
      </div>
      <div className="px-2.5 pb-2">{children}</div>
    </div>
  );
}

export function SalestialDashboard() {
  const groups: [string | null, string[]][] = [
    [null, ['Overview', 'Conversations', 'Leads', 'Analytics', 'Geography']],
    ['Agent', ['Agents', 'Training', 'Chat widget', 'Playground', 'Integrations']],
    ['Workspace', ['Settings', 'Billing']],
  ];
  const kpis = [['Conversations', '1,842'], ['Leads captured', '312'], ['Resolution rate', '91%'], ['Avg response', '1.2s']];
  const funnel = [['Visitors', 100], ['Conversations', 62], ['Leads', 24], ['Meetings', 9]];
  const hot = [['Dana Whitfield', 'northfield.io', 'Hot', ST.hot], ['Marcus Lee', 'acme.co', 'Hot', ST.hot], ['Priya Nair', 'lumen.dev', 'Warm', ST.warm], ['Tom Becker', 'becker.law', 'Warm', ST.warm]];
  const agents = [['Sales assistant', 1204, '94%'], ['Support agent', 638, '89%'], ['Booking bot', 402, '97%'], ['After-hours', 117, '86%'], ['WhatsApp agent', 86, '91%']];
  return (
    <div style={{ ...stage, background: ST.bg, color: ST.fg }} className="flex h-full w-full">
      <div className="flex w-[104px] shrink-0 flex-col px-2 py-2.5" style={{ background: '#fff', borderRight: `1px solid ${ST.line}` }}>
        <div className="px-1"><Logo src="/showcase/salestial.png" className="h-3" /></div>
        {groups.map(([g, items]) => (
          <div key={g ?? 'top'} className="mt-2">
            {g && <div className="px-1.5 pb-[2px] text-[5px] font-semibold tracking-[0.08em] uppercase" style={{ color: ST.muted }}>{g}</div>}
            <ul className="flex flex-col gap-[1px]">
              {items.map((n) => (
                <li key={n} className="flex items-center gap-1.5 rounded-[6px] px-1.5 py-[3px] text-[6.5px]" style={n === 'Overview' ? { background: ST.brandSoft, color: ST.brand, fontWeight: 600 } : { color: ST.muted }}>
                  <span className="inline-block size-[5px] rounded-[1px]" style={{ background: n === 'Overview' ? ST.brand : 'rgba(10,11,12,0.15)' }} />{n}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex grow flex-col">
        <div className="flex h-7 items-center justify-between px-3" style={{ background: '#fff', borderBottom: `1px solid ${ST.line}` }}>
          <span className="rounded-[6px] px-2 py-[2px] text-[6px]" style={{ background: ST.bg, color: ST.muted, border: `1px solid ${ST.line}` }}>⌕ Search… ⌘K</span>
          <div className="flex items-center gap-2 text-[6.5px]" style={{ color: ST.muted }}><span>?</span><span>🔔</span><span className="grid size-4 place-items-center rounded-full text-[5.5px] font-semibold text-white" style={{ background: ST.brand }}>AW</span></div>
        </div>
        <div className="flex grow flex-col gap-2 p-3">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-semibold">Good morning, Ada</div>
            <div className="flex items-center gap-1.5">
              <span className="flex rounded-[6px] p-[2px] text-[6px]" style={{ background: '#fff', border: `1px solid ${ST.line}` }}>
                <span className="rounded-[4px] px-1.5 py-[1px]" style={{ color: ST.muted }}>7d</span><span className="rounded-[4px] px-1.5 py-[1px] font-semibold" style={{ background: ST.brandSoft, color: ST.brand }}>30d</span><span className="rounded-[4px] px-1.5 py-[1px]" style={{ color: ST.muted }}>90d</span>
              </span>
              <span className="rounded-[6px] px-2 py-[3px] text-[6px]" style={{ background: '#fff', border: `1px solid ${ST.line}` }}>⭳ Export</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {kpis.map(([l, v]) => (
              <div key={l} className="rounded-[10px] px-2.5 py-2" style={{ background: '#fff', border: `1px solid ${ST.line}` }}>
                <div className="text-[6px]" style={{ color: ST.muted }}>{l}</div>
                <div className="text-[12px] font-semibold tracking-[-0.02em]">{v}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-[1.6fr_1fr] gap-2">
            <SCard title="Conversation volume">
              <div className="h-[34px]"><Spark points={[0.3, 0.45, 0.4, 0.6, 0.55, 0.7, 0.65, 0.85, 0.8]} color={ST.brand} /></div>
            </SCard>
            <SCard title="Lead funnel">
              <div className="flex flex-col gap-[3px]">
                {funnel.map(([n, p]) => (
                  <div key={n as string} className="flex items-center gap-1.5 text-[6px]">
                    <span className="w-[42px]" style={{ color: ST.muted }}>{n}</span>
                    <span className="h-[5px] grow rounded-full" style={{ background: ST.brandSoft }}><span className="block h-full rounded-full" style={{ width: `${p}%`, background: ST.brand }} /></span>
                    <span className="w-5 text-right font-mono tabular-nums">{p}%</span>
                  </div>
                ))}
              </div>
            </SCard>
          </div>
          <div className="grid grow grid-cols-2 gap-2">
            <SCard title="Hot leads" action="View all →">
              <ul className="flex flex-col gap-[3px]">
                {hot.map(([n, d, t, c]) => (
                  <li key={n} className="flex items-center gap-1.5 text-[6px]">
                    <span className="grid size-3.5 shrink-0 place-items-center rounded-full text-[4.5px] font-semibold text-white" style={{ background: ST.brand }}>{(n as string).split(' ').map((x) => x[0]).join('')}</span>
                    <span className="grow truncate"><span className="font-medium">{n}</span> <span style={{ color: ST.muted }}>· {d}</span></span>
                    <span className="rounded-full px-1.5 py-[1px] text-[5px] font-semibold" style={{ background: `${c}18`, color: c as string }}>{t}</span>
                  </li>
                ))}
              </ul>
            </SCard>
            <SCard title="Agent leaderboard">
              <ul className="flex flex-col gap-[3px]">
                {agents.map(([n, c, r], i) => (
                  <li key={n as string} className="flex items-center gap-1.5 text-[6px]">
                    <span className="w-2 font-mono tabular-nums" style={{ color: ST.muted }}>{i + 1}</span>
                    <span className="inline-block size-3 rounded-[4px]" style={{ background: ST.brand, opacity: 1 - i * 0.2 }} />
                    <span className="grow truncate">{n}</span>
                    <span className="font-mono tabular-nums" style={{ color: ST.muted }}>{c} chats · <span style={{ color: ST.ok }}>{r}</span></span>
                  </li>
                ))}
              </ul>
            </SCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export const salestial = { hero: <SalestialHero />, dashboard: <SalestialDashboard /> };
