import { Btn, Card, Logo, TopNav } from './primitives';

const ACCENT = '#1a6dff';
const stage = { '--accent': ACCENT } as React.CSSProperties;

const Brand = () => <Logo src="/showcase/zoom.png" className="h-3.5" />;

function Timeline({ label, time, meta, className }: { label: string; time: string; meta: string; className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between font-mono text-[5.5px] tracking-[0.08em] text-black/40 uppercase">
        <span>{label}</span>
        <span>{meta}</span>
      </div>
      <div className="relative mt-1 h-[26px] border-b border-black/[0.08]">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="absolute top-0 bottom-0 border-l border-dashed border-black/[0.08]" style={{ left: `${i * 25}%` }} />
        ))}
        <span className="absolute top-1 left-[25%] rounded-[4px] bg-black/[0.07] px-1.5 py-[2px] font-mono text-[5.5px] text-black/70">{time}</span>
      </div>
      <div className="mt-[2px] flex justify-between font-mono text-[5px] text-black/35">
        {['09:00', '09:30', '10:00', '10:30', '11:00'].map((t) => <span key={t}>{t}</span>)}
      </div>
    </div>
  );
}

export function ZoomHero() {
  return (
    <div style={stage} className="relative h-full w-full bg-white text-black">
      <TopNav brand={<Brand />} links={['Difference', 'Capabilities', 'Actions', 'Triggers', 'Daily limits']} secondary="Docs" cta="Install app" />
      <div className="grid grid-cols-[1fr_250px] items-start gap-4 px-8 pt-3">
        <div>
          <span className="inline-flex items-center gap-1 rounded-full px-2 py-[3px] font-mono text-[5.5px] tracking-[0.06em] text-black/60 ring-1 ring-black/10">
            <span className="inline-block size-1 rounded-full bg-(--accent)" /> zoom, wired into your workflows
          </span>
          <h3 className="mt-2 text-[27px] leading-[0.98] font-bold tracking-[-0.045em]">
            Zoom calls that
            <br />
            <em className="not-italic" style={{ color: ACCENT }}>book, move</em>
            <br />
            <em className="not-italic" style={{ color: ACCENT }}>and settle</em>
            <br />
            themselves.
          </h3>
          <p className="mt-2 max-w-[230px] text-[7px] leading-snug text-black/60">
            A call is created the moment someone books. Reschedule or cancel from either side and the other follows within seconds.
          </p>
          <div className="mt-2.5 flex gap-2">
            <Btn variant="dark">Add it to your workflows</Btn>
            <Btn variant="ghost">See all 12 actions</Btn>
          </div>
        </div>
        <div className="relative mt-8">
          <Card className="p-3">
            <div className="flex items-center justify-between font-mono text-[5.5px] tracking-[0.08em] text-black/40 uppercase">
              <span>Two-way sync</span>
              <span style={{ color: ACCENT }}>● live</span>
            </div>
            <div className="mt-2 text-[8px] font-semibold">Discovery call</div>
            <Timeline label="" time="09:30 · 30 min" meta="booking" className="mt-1" />
            <Timeline label="Zoom call" time="09:30 · 8412 660 902" meta="personal link sent" className="mt-2" />
            <div className="mt-2 border-t border-black/[0.06] pt-1.5 font-mono text-[5.5px] text-black/60">↓ booked, so the call is created</div>
          </Card>
          <Card className="absolute -right-3 -bottom-4 w-[100px] p-2 shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
            <div className="font-mono text-[5px] tracking-[0.08em] text-black/40 uppercase">Daily create limit</div>
            <div className="text-[12px] font-semibold"><span>37</span> <span className="text-[6px] font-normal text-black/50">left today</span></div>
            <div className="mt-1 h-[3px] rounded-full bg-black/[0.06]"><div className="h-full w-[62%] rounded-full bg-(--accent)" /></div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/*
  The real app, rendered inside a GoHighLevel sub-account: two white sheets on a mist
  ground. Left, the Zoom connection and its facts; right, the Meetings table with
  List/Calendar views and the daily quota. Filled actions are ink, not an accent.
  Tokens from apps/web/src/index.css.
*/
const ZT = { ground: '#f8f9fa', band: '#e9ebf0', bone: '#e8e8e8', sand: '#d4d4d4', ink: '#202020', onyx: '#090c1d', soft: '#646464', faint: '#838383', blue: '#0091ff', emerald: '#00c07a', mint: '#6ee7b7', magenta: '#d1345b' };

function Sheet({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className} style={{ background: '#fff', border: `1px solid ${ZT.bone}`, borderRadius: 12 }}>{children}</div>;
}

function Fact({ k, v, tone }: { k: string; v: string; tone?: string }) {
  return (
    <div className="flex items-baseline justify-between py-[5px]" style={{ borderTop: `1px solid ${ZT.bone}` }}>
      <span className="text-[6.5px]" style={{ color: ZT.faint }}>{k}</span>
      <span className="font-mono text-[6.5px]" style={{ color: tone ?? ZT.ink }}>{v}</span>
    </div>
  );
}

function StatePill({ state }: { state: 'scheduled' | 'done' | 'cancelled' }) {
  const c = state === 'done' ? ZT.emerald : state === 'cancelled' ? ZT.magenta : ZT.blue;
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-1.5 py-[2px] text-[6px] font-medium" style={{ background: `${c}18`, color: c }}>
      <span className="inline-block size-1 rounded-full" style={{ background: c }} />
      {state}
    </span>
  );
}

export function ZoomDashboard() {
  const meetings: { topic: string; id: string; state: 'scheduled' | 'done' | 'cancelled'; when: string; mins: number }[] = [
    { topic: 'Discovery call · Ada Whitfield', id: '841 2660 902', state: 'scheduled', when: 'Tue 09:30', mins: 30 },
    { topic: 'Onboarding · Northfield', id: '839 1104 771', state: 'done', when: 'Mon 14:00', mins: 45 },
    { topic: 'Strategy review', id: '835 0932 118', state: 'cancelled', when: 'Fri 11:00', mins: 60 },
    { topic: 'Q4 planning webinar', id: '842 7710 005', state: 'scheduled', when: 'Thu 16:00', mins: 90 },
    { topic: 'Demo · Ruiz Dental', id: '843 2201 486', state: 'scheduled', when: 'Wed 10:15', mins: 30 },
    { topic: 'Follow-up · Becker Law', id: '838 5567 209', state: 'done', when: 'Mon 09:00', mins: 20 },
    { topic: 'Kickoff · Lumen Dev', id: '844 0198 632', state: 'scheduled', when: 'Thu 13:30', mins: 45 },
    { topic: 'Support call · Acme', id: '837 6620 114', state: 'done', when: 'Fri 15:00', mins: 15 },
    { topic: 'Team sync', id: '840 3345 907', state: 'cancelled', when: 'Tue 17:00', mins: 30 },
  ];
  return (
    <div style={{ ...stage, background: ZT.ground, color: ZT.ink }} className="grid h-full w-full grid-cols-[200px_1fr] gap-2.5 p-3">
      <Sheet className="p-3.5">
        <div className="text-[12px] leading-tight font-bold tracking-[-0.02em]" style={{ color: ZT.onyx }}>
          Welcome, <span style={{ color: ZT.blue }}>Ada</span>
        </div>
        <p className="mt-1 text-[6.5px] leading-snug" style={{ color: ZT.soft }}>Bring Zoom meetings and webinars into this sub-account&apos;s workflows.</p>
        {/* ConnectionChain: HighLevel and Zoom as two dots on a rail, each with its account and state */}
        <div className="mt-3 rounded-[7px] px-2.5 py-2" style={{ background: ZT.band }}>
          <div className="flex items-center">
            <span className="inline-block size-2 rounded-full" style={{ background: ZT.emerald }} />
            <span className="h-px grow" style={{ background: ZT.emerald }} />
            <span className="inline-block size-2 rounded-full" style={{ background: ZT.emerald }} />
          </div>
          <div className="mt-1 flex justify-between text-[6.5px] font-semibold"><span>HighLevel</span><span>Zoom</span></div>
          <div className="flex justify-between text-[5.5px]" style={{ color: ZT.soft }}><span>Northfield Agency</span><span>ada@northfield.io</span></div>
          <div className="flex justify-between text-[5.5px] font-medium" style={{ color: ZT.emerald }}><span>Connected</span><span>Connected</span></div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Logo src="/showcase/zoom.png" className="h-3" />
          <span className="inline-flex items-center gap-1 rounded-full px-1.5 py-[2px] text-[6px] font-medium" style={{ background: `${ZT.emerald}18`, color: ZT.emerald }}>
            <span className="inline-block size-1 rounded-full" style={{ background: ZT.emerald }} /> Connected
          </span>
        </div>
        <div className="mt-2">
          <Fact k="Account email" v="ada@northfield.io" />
          <Fact k="Plan" v="Pro" />
          <Fact k="Webinars" v="Enabled" tone={ZT.emerald} />
        </div>
        {/* The daily quota meter: Zoom allows 100 meeting creations a day per account */}
        <div className="mt-2.5">
          <div className="flex items-center justify-between text-[5.5px]">
            <span className="font-medium uppercase tracking-[0.08em]" style={{ color: ZT.faint }}>Created today</span>
            <span className="font-mono font-semibold tabular-nums">63 of 100</span>
          </div>
          <span className="mt-1 block h-[4px] w-full overflow-hidden rounded-full" style={{ background: ZT.band }}><span className="block h-full rounded-full" style={{ width: '63%', background: ZT.blue }} /></span>
          <div className="mt-[3px] text-[5.5px]" style={{ color: ZT.faint }}>Resets at midnight UTC · 37 left</div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[6.5px] font-medium" style={{ color: ZT.soft }}>↻ Reload</span>
          <span className="rounded-[7px] px-2 py-[3px] text-[6.5px] font-medium" style={{ border: `1px solid ${ZT.magenta}`, color: ZT.magenta }}>Disconnect</span>
        </div>
      </Sheet>

      <Sheet className="flex flex-col p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold">Meetings</span>
          <div className="flex rounded-[7px] p-[2px]" style={{ background: ZT.band }}>
            <span className="rounded-[5px] bg-white px-2 py-[2px] text-[6.5px] font-semibold shadow-sm">List</span>
            <span className="px-2 py-[2px] text-[6.5px] font-medium" style={{ color: ZT.soft }}>Calendar</span>
          </div>
        </div>
        <div className="mt-2.5 grid grid-cols-[10px_1.6fr_0.9fr_0.7fr_0.8fr_20px] gap-2 px-1 font-mono text-[5.5px] tracking-[0.06em] uppercase" style={{ color: ZT.faint }}>
          <span /> <span>Meeting</span> <span>ID</span> <span>Status</span> <span>Scheduled</span> <span />
        </div>
        {meetings.map((m) => (
          <div key={m.id} className="grid grid-cols-[10px_1.6fr_0.9fr_0.7fr_0.8fr_20px] items-center gap-2 px-1 py-[4px] text-[6.5px]" style={{ borderTop: `1px solid ${ZT.bone}` }}>
            <span className="inline-block size-2 rounded-[2px]" style={{ border: `1px solid ${ZT.sand}` }} />
            <span className="truncate font-medium">{m.topic}</span>
            <span className="font-mono text-[6px]" style={{ color: ZT.soft }}>{m.id}</span>
            <StatePill state={m.state} />
            <span className="font-mono text-[6px]" style={{ color: ZT.soft }}>{m.when} <span style={{ color: ZT.faint }}>· {m.mins}m</span></span>
            <span className="text-center text-[6px]" style={{ color: ZT.magenta }}>✕</span>
          </div>
        ))}
        <div className="mt-auto flex items-center justify-between pt-2 font-mono text-[5.5px]" style={{ color: ZT.faint }}>
          <span>9 of 27 meetings</span>
          <span>‹ 1 / 7 ›</span>
        </div>
      </Sheet>
    </div>
  );
}

export const zoom = { hero: <ZoomHero />, dashboard: <ZoomDashboard /> };
