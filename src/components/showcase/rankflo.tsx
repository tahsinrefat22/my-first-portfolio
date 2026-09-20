import { GridBg, Input, Logo, Pill, Spark, TopNav } from './primitives';
import { cn } from '@/lib/utils';

const ACCENT = '#8b1fe0';
const stage = { '--accent': ACCENT } as React.CSSProperties;

const Brand = () => <Logo src="/showcase/rankflo.png" className="h-4" />;

export function RankfloHero() {
  return (
    <div style={stage} className="relative h-full w-full bg-white text-black">
      <GridBg />
      <TopNav brand={<Brand />} links={['Products', 'Resources', 'Pricing']} secondary="Login" cta="Get Started" />
      <div className="relative mt-4 flex flex-col items-center text-center">
        <Pill>The #1 AI Search Visibility Tool for Tracking &amp; Optimizing</Pill>
        <h3 className="mt-3 text-[22px] leading-[1.1] font-medium tracking-[-0.02em]">
          Get Your Brand Mentioned
          <br />
          by <span className="inline-flex items-center gap-1 align-middle"><Logo src="/showcase/chatgpt.png" className="size-4" />ChatGPT</span>
        </h3>
        <p className="mt-2 max-w-[260px] text-[8px] leading-snug text-black/55">
          Boost your brand&apos;s search visibility across leading AI platforms and drive traffic from AI answers.
        </p>
        <Input placeholder="Enter your website URL..." action="✦ Analyze" className="mt-3 w-[240px]" />
      </div>
      {/*
        Top edge of the landing page's interactive dashboard peeking in: sidebar with the
        brand switcher and menu, then the Dashboard header card and the platform stat cards
        (InteractiveDashboard/Component.tsx and tabs/AnalyticsTab.tsx on the site).
      */}
      <div className="absolute inset-x-[70px] top-[248px] h-[100px] overflow-hidden rounded-t-lg bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06]">
        <div className="flex h-full">
          <div className="w-[104px] shrink-0 border-r border-black/[0.06] bg-linear-to-r from-[#eff6ff]/60 via-[#faf5ff]/40 to-[#fdf2f8]/60 p-2.5">
            <div className="text-[7.5px] font-semibold">Rankflo</div>
            <div className="mt-1.5 flex items-center justify-between rounded-[5px] bg-white px-1.5 py-1 text-[5.5px] text-black/60 ring-1 ring-black/[0.08]">
              <span>FieldServicely</span>
              <span className="inline-block size-2 rounded-[2px] bg-(--accent)" />
            </div>
            <ul className="mt-2 space-y-[2px] text-[6px]">
              {['Dashboard', 'Monitors', 'Prompts', 'Crawler Logs', 'Citations', 'Competitors'].map((n, i) => (
                <li key={n} className={i === 0 ? 'relative rounded-[3px] bg-(--accent)/10 px-1.5 py-[2px] font-medium text-(--accent)' : 'px-1.5 py-[2px] text-black/70'}>
                  {i === 0 && <span className="absolute top-1/2 -left-2.5 h-2 w-[2px] -translate-y-1/2 rounded-r-full bg-(--accent)" />}
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <div className="grow p-2">
            <div className="rounded-[6px] bg-linear-to-r from-[#eff6ff]/70 via-[#faf5ff]/50 to-[#fdf2f8]/70 px-3 py-2 ring-1 ring-black/[0.06]">
              <div className="text-[9px] font-bold">Dashboard</div>
              <div className="text-[5.5px] text-black/55">Your brand&apos;s AI visibility performance overview.</div>
            </div>
            <div className="mt-1.5 grid grid-cols-4 gap-1.5">
              {[
                ['ChatGPT', '27'],
                ['Claude', '20'],
                ['Gemini', '18'],
                ['Perplexity', '6'],
              ].map(([n, v]) => (
                <div key={n} className="rounded-[6px] bg-white px-2 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.05]">
                  <div className="flex items-center justify-between">
                    <span className="text-[5.5px] font-semibold">{n}</span>
                    <span className="grid size-2.5 place-items-center rounded-[3px] bg-black/[0.04] text-[4px] font-bold ring-1 ring-black/10">{n[0]}</span>
                  </div>
                  <div className="mt-[2px] text-[9px] leading-none font-bold">{v}</div>
                  <div className="mt-[2px] flex items-center gap-1 text-[4.5px] text-black/50">
                    <span className="rounded-[2px] bg-[#f0f9ff] px-[3px] font-semibold text-[#38bdf8]">+100%</span> from last 30 days
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
  The real app: the brand dashboard at /dashboard/[brand-id]. Sidebar with the brand
  switcher and the app's own sections; a "Dashboard" header with date range; then a
  three-column grid of Brand Visibility Over Time, Top Brands by Visibility, Top Cited
  Domains, Organic Brand Mentions, Platform Usage, Share of Voice.
  Tokens from app/globals.css (secondary hsl(256 100% 69%), DM Sans, radius 0.5rem).
*/
const RT = { bg: '#ffffff', fg: '#1a1a1a', muted: '#4a4a4a', line: '#e5e5e5', mutedBg: '#f5f5f5', violet: '#9966ff', accent: '#42405a' };

function RCard({ title, sub, children, className }: { title: string; sub?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex flex-col', className)} style={{ background: '#fff', border: `1px solid ${RT.line}`, borderRadius: 8 }}>
      <div className="px-2.5 pt-2 pb-1">
        <div className="text-[7.5px] font-semibold" style={{ color: RT.fg }}>{title}</div>
        {sub && <div className="text-[5.5px]" style={{ color: RT.muted }}>{sub}</div>}
      </div>
      <div className="flex grow flex-col px-2.5 pb-2">{children}</div>
    </div>
  );
}

function Bar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[6px]">
      <span className="w-[52px] truncate" style={{ color: RT.muted }}>{label}</span>
      <span className="h-[5px] grow rounded-full" style={{ background: RT.mutedBg }}><span className="block h-full rounded-full" style={{ width: `${pct}%`, background: color }} /></span>
      <span className="w-6 text-right font-mono tabular-nums" style={{ color: RT.fg }}>{pct}%</span>
    </div>
  );
}

export function RankfloDashboard() {
  const nav = ['Dashboard', 'Monitors', 'Prompts', 'Responses', 'Citations', 'Competitors', 'Crawler Analytics', 'Visitor Analytics', 'Personas', 'Brand Book', 'Team Members'];
  return (
    <div style={{ ...stage, background: RT.bg, color: RT.fg }} className="flex h-full w-full">
      <div className="flex w-[108px] shrink-0 flex-col py-2.5 pr-1.5 pl-2.5" style={{ borderRight: `1px solid ${RT.line}` }}>
        <Logo src="/showcase/rankflo.png" className="h-3 self-start" />
        <div className="mt-1.5 flex items-center justify-between rounded-[5px] px-1.5 py-1 text-[6px]" style={{ border: `1px solid ${RT.line}` }}>
          <span className="flex items-center gap-1"><span className="inline-block size-2 rounded-[2px]" style={{ background: RT.accent }} /> FieldServicely</span>
          <span style={{ color: RT.muted }}>⇅</span>
        </div>
        <ul className="mt-2 flex flex-col gap-[1px]">
          {nav.map((n, i) => (
            <li key={n} className="flex items-center gap-1.5 rounded-[5px] px-1.5 py-[3px] text-[6.5px]" style={i === 0 ? { background: 'rgba(153,102,255,0.12)', color: RT.violet, fontWeight: 600 } : { color: RT.muted }}>
              <span className="inline-block size-[5px] rounded-[1px]" style={{ background: i === 0 ? RT.violet : '#d4d4d4' }} />
              {n}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex grow flex-col gap-2 p-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] font-semibold">Dashboard</div>
            <div className="text-[6px]" style={{ color: RT.muted }}>Overview of your project&apos;s performance and AI interactions for FieldServicely.</div>
          </div>
          <span className="rounded-[5px] px-2 py-[3px] text-[6px]" style={{ border: `1px solid ${RT.line}`, color: RT.muted }}>▦ Last 30 days ⌄</span>
        </div>

        <div className="grid grow grid-cols-3 grid-rows-2 gap-2">
          <RCard title="Brand Visibility Over Time" sub="Visibility score">
            <div className="flex grow gap-1">
              <div className="flex flex-col justify-between font-mono text-[4.5px]" style={{ color: RT.muted }}><span>80</span><span>40</span><span>0</span></div>
              <div className="grow"><Spark points={[0.35, 0.42, 0.4, 0.55, 0.6, 0.58, 0.72, 0.78, 0.8]} color={RT.violet} /></div>
            </div>
            <div className="mt-1 flex justify-between font-mono text-[4.5px]" style={{ color: RT.muted }}><span>Dec 15</span><span>Jan 1</span><span>Jan 14</span></div>
            <div className="mt-1 flex items-center gap-1 text-[5.5px]"><span className="inline-block size-1.5 rounded-full" style={{ background: RT.violet }} />FieldServicely <span className="ml-auto font-mono font-semibold" style={{ color: RT.violet }}>↑ 12.4%</span></div>
          </RCard>
          <RCard title="Top Brands by Visibility">
            <div className="flex flex-col gap-1">
              <Bar label="FieldServicely" pct={42} color={RT.violet} />
              <Bar label="Jobber" pct={31} color="#c4b5fd" />
              <Bar label="ServiceTitan" pct={27} color="#c4b5fd" />
              <Bar label="Housecall Pro" pct={19} color="#c4b5fd" />
              <Bar label="Workiz" pct={14} color="#c4b5fd" />
              <Bar label="FieldPulse" pct={11} color="#c4b5fd" />
              <Bar label="Connecteam" pct={8} color="#c4b5fd" />
            </div>
            <div className="mt-auto pt-1 text-[5.5px]" style={{ color: RT.muted }}>366 mentions · 30 days</div>
          </RCard>
          <RCard title="Top Cited Domains" sub="The domains that are most frequently cited">
            <ul className="flex flex-col gap-[3px] text-[6px]">
              {[['g2.com', 48], ['capterra.com', 12], ['reddit.com', 9], ['softwareadvice.com', 6], ['trustpilot.com', 5], ['youtube.com', 4], ['medium.com', 3]].map(([d, n]) => (
                <li key={d as string} className="flex items-center justify-between">
                  <span className="flex items-center gap-1"><span className="inline-block size-2 rounded-full" style={{ background: RT.mutedBg }} />{d}</span>
                  <span className="font-mono tabular-nums" style={{ color: RT.muted }}>{n}</span>
                </li>
              ))}
            </ul>
          </RCard>
          <RCard title="Organic Brand Mentions" sub="Competitor mention frequency in organic responses">
            <div className="flex grow items-end gap-1">
              {[7, 4, 6, 9, 5, 8, 10, 6, 7, 9].map((v, i) => <span key={i} className="grow rounded-[1px]" style={{ height: `${v * 10}%`, background: i % 3 === 0 ? RT.violet : '#ddd6fe' }} />)}
            </div>
            <div className="mt-1 flex justify-between font-mono text-[4.5px]" style={{ color: RT.muted }}><span>FieldServicely</span><span>Jobber</span><span>ServiceTitan</span><span>Other</span></div>
            <div className="mt-1 flex items-center gap-2 text-[5.5px]" style={{ color: RT.muted }}><span className="inline-flex items-center gap-1"><span className="inline-block size-1.5 rounded-[1px]" style={{ background: RT.violet }} />You</span><span className="inline-flex items-center gap-1"><span className="inline-block size-1.5 rounded-[1px]" style={{ background: '#ddd6fe' }} />Competitors</span></div>
          </RCard>
          <RCard title="Platform Usage" sub="Usage by Platform">
            <div className="flex flex-col gap-1">
              <Bar label="ChatGPT" pct={46} color="#111" />
              <Bar label="Gemini" pct={24} color="#4285f4" />
              <Bar label="Claude" pct={18} color="#d97757" />
              <Bar label="Perplexity" pct={12} color="#20808d" />
              <Bar label="Copilot" pct={7} color="#0f6cbd" />
              <Bar label="Grok" pct={4} color="#555" />
            </div>
            <div className="mt-auto pt-1 text-[5.5px]" style={{ color: RT.muted }}>1,204 responses analysed</div>
          </RCard>
          <RCard title="Share of Voice">
            <div className="flex grow items-center gap-3">
              <span className="relative grid size-[58px] shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(${RT.violet} 0 42%, #a78bfa 42% 65%, #c4b5fd 65% 82%, #ede9fe 82% 100%)` }}>
                <span className="grid size-[38px] place-items-center rounded-full bg-white font-mono text-[8px] font-semibold">42%</span>
              </span>
              <ul className="flex flex-col gap-[3px] text-[6px]">
                {[['FieldServicely', '42%', RT.violet], ['Jobber', '23%', '#a78bfa'], ['ServiceTitan', '17%', '#c4b5fd'], ['Others', '18%', '#ede9fe']].map(([n, v, c]) => (
                  <li key={n} className="flex items-center gap-1"><span className="inline-block size-1.5 rounded-full" style={{ background: c }} /><span style={{ color: n === 'FieldServicely' ? RT.fg : RT.muted }}>{n}</span><span className="ml-1 font-mono tabular-nums" style={{ color: RT.muted }}>{v}</span></li>
                ))}
              </ul>
            </div>
          </RCard>
        </div>
      </div>
    </div>
  );
}

export const rankflo = { hero: <RankfloHero />, dashboard: <RankfloDashboard /> };
