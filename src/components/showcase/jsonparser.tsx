import { Btn, Logo, Pill, TopNav, Wordmark } from './primitives';

const ACCENT = '#1f7a55';
const stage = { '--accent': ACCENT } as React.CSSProperties;

const Brand = () => (
  <Wordmark mark={<Logo src="/showcase/jsonparser.svg" className="size-3.5 rounded-[4px]" />}>
    JSON Parser <span className="rounded-[3px] bg-(--accent)/15 px-1 font-mono text-[6px] text-(--accent)">PRO</span>
  </Wordmark>
);

const JSON_LINES: [string, string?][] = [
  ['{'],
  ['  "event": ', '"order.paid"'],
  ['  "customer": {'],
  ['    "id": ', '"cus_8fJ21"'],
  ['    "email": ', '"dana@northfield.io"'],
  ['  },'],
  ['  "order": {'],
  ['    "total_cents": ', '18400'],
  ['    "items": [{ "sku": ', '"KP-PRO-12"'],
  ['  },'],
  ['  "tracking": ', 'null'],
  ['}'],
];

function CodePanel({ title, className, chips }: { title: string; className?: string; chips?: boolean }) {
  return (
    <div className={className}>
      <div className="flex h-5 items-center gap-2 rounded-t-md bg-[#0d2a20] px-2.5 font-mono text-[6px] text-white/40">
        <span className="flex gap-[3px]">{[0, 1, 2].map((i) => <span key={i} className="inline-block size-[5px] rounded-full bg-white/15" />)}</span>
        {title}
      </div>
      <div className="relative rounded-b-md bg-[#0b1f18] px-3 py-2 font-mono text-[6.5px] leading-[1.55] text-emerald-200/70">
        {JSON_LINES.map(([k, v], i) => (
          <div key={i} className="whitespace-pre">
            <span>{k}</span>
            {v && <span className={v.startsWith('"') || v === '18400' ? 'rounded-[2px] bg-emerald-400/15 px-0.5 text-emerald-300' : 'text-white/50'}>{v}</span>}
          </div>
        ))}
        {chips && (
          <div className="absolute top-8 -right-10 flex flex-col items-end gap-2">
            {['customer.email → "dana@northfield.io"', 'order.total_cents → 18400', 'order.items[0].sku → "KP-PRO-12"'].map((c, i) => (
              <span
                key={c}
                className="rounded-md bg-white px-2 py-1 font-mono text-[6px] text-black/75 shadow-[0_6px_20px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06]"
                style={{ marginRight: i * 14 }}
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function JsonparserHero() {
  return (
    <div style={stage} className="relative h-full w-full overflow-hidden bg-linear-to-br from-[#d7efe4] via-[#f2f8f5] to-white pt-3 text-black">
      <div className="mx-[140px] rounded-xl bg-white/80 shadow-[0_2px_16px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.05]">
        <TopNav brand={<Brand />} links={['Features', 'Compare', 'Pricing']} cta="Sign up →" className="h-8 px-3" />
      </div>
      <div className="mt-6 grid grid-cols-[1fr_1fr] items-center gap-6 px-8">
        <div>
          <Pill className="bg-white/80">⌘ Built for the <b className="font-semibold text-black/80">GoHighLevel Marketplace</b></Pill>
          <h3 className="mt-2.5 text-[26px] leading-[1.02] font-semibold tracking-[-0.035em]">
            Pull any value out
            <br />
            of any JSON
          </h3>
          <p className="mt-2 max-w-[220px] text-[7.5px] leading-snug text-black/60">
            Drop in a webhook payload or API response, point at the keys you need, and use the extracted values anywhere later in your workflow.
          </p>
          <div className="mt-3 flex items-center gap-3">
            <Btn>Get Started Now →</Btn>
            <span className="text-[7.5px] text-black/60">See it inside a workflow</span>
          </div>
          <div className="mt-2.5 font-mono text-[5.5px] text-black/45">Ten values per action · JSONPath &amp; dot notation · Arrays, nesting, null-safe</div>
        </div>
        <div className="pr-6">
          <CodePanel title="inbound_webhook.body" chips />
        </div>
      </div>
    </div>
  );
}

/*
  The real app: a parse-history console rendered inside GoHighLevel.
  Three columns (Nodes, Runs, Run detail), viridian for "found", a green-black
  code inspector. Tokens from apps/web/src/index.css.
*/
const J = { paper: '#f4f7f5', surface2: '#eaefec', line: '#dde5e1', ink: '#0c1512', soft: '#4e5c56', faint: '#5f6e68', accent: '#0e6b4c', accentSoft: '#e3f0ea', codeBg: '#0a1512', codeBar: '#10201a', codeEdge: '#1e3229', codeText: '#cfdcd6', codeFaint: '#86998f', key: '#6fd3a8', num: '#e0a961', str: '#d8e4dc' };

function JPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className} style={{ background: '#fff', border: `1px solid ${J.line}`, borderRadius: 10 }}>{children}</div>;
}

export function JsonparserDashboard() {
  const nodes = [
    { title: 'Parse order webhook', when: '2m ago', runs: 412, unseen: 3, on: true },
    { title: 'Stripe invoice.paid', when: '1h ago', runs: 88 },
    { title: 'Typeform submission', when: 'Yesterday', runs: 27 },
  ];
  const runs = [
    { t: '14:02:11', id: '#8f21', n: 5, ok: true, sel: true },
    { t: '13:58:40', id: '#8f1e', n: 5, ok: true },
    { t: '13:41:07', id: '#8f0a', n: 4, ok: true },
    { t: '12:20:55', id: '#8e9c', n: 0, ok: false },
  ];
  const values = [
    ['customer.email', 'value_1', '"dana@northfield.io"'],
    ['order.total_cents', 'value_2', '18400'],
    ['order.items[0].sku', 'value_3', '"KP-PRO-12"'],
    ['shipping.postcode', 'value_4', '"LS1 4DY"'],
  ];
  const code = [
    ['{'], ['  ', '"event"', ': ', '"order.paid"', ','], ['  ', '"customer"', ': {'], ['    ', '"email"', ': ', '"dana@northfield.io"'], ['  },'],
    ['  ', '"order"', ': { ', '"total_cents"', ': ', '18400', ' }'], ['}'],
  ];
  return (
    <div style={{ ...stage, background: J.paper, color: J.ink }} className="flex h-full w-full flex-col">
      {/* App bar: the account is the heading; no vendor logo inside a white-label platform */}
      <div className="flex h-9 items-center gap-3 px-4" style={{ borderBottom: `1px solid ${J.line}`, background: 'rgba(244,247,245,0.85)' }}>
        <div>
          <div className="text-[9px] font-bold leading-tight">Northfield Agency</div>
          <div className="font-mono text-[6px]" style={{ color: J.faint }}>Parse history</div>
        </div>
        <div className="ml-2 flex gap-[2px] rounded-[7px] p-[2px]" style={{ background: J.surface2 }}>
          <span className="rounded-[5px] bg-white px-2 py-[2px] text-[7px] font-semibold shadow-sm">History</span>
          <span className="px-2 py-[2px] text-[7px] font-semibold" style={{ color: J.soft }}>Path finder</span>
        </div>
        <div className="grow" />
        <span className="font-mono text-[7px] tabular-nums" style={{ color: J.soft }}>1,284 runs</span>
        <span className="flex items-center gap-1 rounded-full px-1.5 py-[2px] font-mono text-[6.5px] font-semibold" style={{ background: J.accentSoft, color: J.accent }}>
          <span className="inline-block size-1 rounded-full" style={{ background: J.accent }} /> 3 new
        </span>
        <span className="rounded-[7px] px-2 py-[3px] text-[7px] font-semibold" style={{ border: `1px solid ${J.line}`, color: J.soft }}>↻ Refresh</span>
      </div>

      <div className="grid grow grid-cols-[124px_112px_1fr] gap-2.5 p-3">
        <div>
          <div className="mb-1 font-mono text-[6px] tracking-[0.1em] uppercase" style={{ color: J.faint }}>Nodes</div>
          <JPanel className="p-1">
            {nodes.map((n) => (
              <div key={n.title} className="rounded-[7px] px-2 py-1.5" style={n.on ? { background: J.accentSoft } : undefined}>
                <div className="flex items-start gap-1.5">
                  <span className="mt-[3px] inline-block size-1 shrink-0 rounded-full" style={{ background: n.on ? J.accent : '#c3cec8' }} />
                  <span className="grow text-[7.5px] leading-snug font-semibold">{n.title}</span>
                  {n.unseen && <span className="rounded-full px-1 font-mono text-[6px] font-semibold text-white" style={{ background: J.accent }}>{n.unseen}</span>}
                </div>
                <div className="mt-[3px] pl-2.5 font-mono text-[6px]" style={{ color: J.faint }}>{n.when} · {n.runs} runs</div>
              </div>
            ))}
          </JPanel>
        </div>

        <div>
          <div className="mb-1 font-mono text-[6px] tracking-[0.1em] uppercase" style={{ color: J.faint }}>Runs</div>
          <JPanel className="p-1">
            {runs.map((r) => (
              <div key={r.id} className="flex items-center gap-1.5 rounded-[7px] px-1.5 py-1" style={r.sel ? { background: J.accentSoft } : undefined}>
                <span className="grid size-4 shrink-0 place-items-center rounded-[5px] text-[8px]" style={{ background: r.ok ? J.accentSoft : '#f8e7e5', color: r.ok ? J.accent : '#a32a21' }}>{r.ok ? '✓' : '✕'}</span>
                <span className="min-w-0 grow">
                  <span className="block font-mono text-[7px] tabular-nums">{r.t}</span>
                  <span className="block font-mono text-[6px]" style={{ color: J.faint }}>{r.id}</span>
                </span>
                <span className="font-mono text-[7px] font-semibold tabular-nums" style={{ color: r.ok ? J.ink : J.faint }}>{r.ok ? r.n : '—'}</span>
              </div>
            ))}
          </JPanel>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <div className="mb-[-4px] font-mono text-[6px] tracking-[0.1em] uppercase" style={{ color: J.faint }}>Parse order webhook · 8f21</div>
          <JPanel>
            <div className="flex items-center justify-between px-2.5 py-1.5" style={{ borderBottom: `1px solid ${J.line}` }}>
              <span className="font-mono text-[6px] tracking-[0.1em] uppercase" style={{ color: J.faint }}>Extracted values</span>
              <span className="font-mono text-[6.5px] tabular-nums" style={{ color: J.soft }}>4/4 matched</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 p-2">
              {values.map(([k, slot, v]) => (
                <div key={slot} className="rounded-[7px] px-2 py-1.5" style={{ border: `1px solid ${J.line}` }}>
                  <div className="flex items-center gap-1 font-mono text-[6px]">
                    <span className="truncate font-semibold" style={{ color: J.soft }}>{k}</span>
                    <span className="ml-auto shrink-0" style={{ color: J.faint }}>{slot}</span>
                  </div>
                  <div className="mt-[3px] font-mono text-[7px] font-medium" style={{ color: J.accent }}>✓ {v}</div>
                </div>
              ))}
            </div>
          </JPanel>
          <div className="overflow-hidden rounded-[9px]" style={{ background: J.codeBg, border: `1px solid ${J.codeEdge}` }}>
            <div className="flex items-center gap-2 px-2.5 py-1 font-mono text-[6px]" style={{ background: J.codeBar, borderBottom: `1px solid ${J.codeEdge}`, color: J.codeFaint }}>
              <span style={{ color: J.codeText }}>▾ Payload</span>
              <span className="ml-auto">7 lines</span>
              <span>⧉ copy</span>
            </div>
            <div className="flex gap-2 px-2.5 py-1.5 font-mono text-[6.2px] leading-[1.5]">
              <div className="text-right select-none" style={{ color: J.codeFaint }}>{code.map((_, i) => <div key={i}>{i + 1}</div>)}</div>
              <pre className="whitespace-pre" style={{ color: J.codeText }}>
                {code.map((parts, i) => (
                  <div key={i}>
                    {parts.map((t, j) => {
                      const isKey = t.startsWith('"') && parts[j + 1]?.startsWith(':');
                      const isStr = t.startsWith('"') && !isKey;
                      const isNum = /^\d+$/.test(t);
                      return <span key={j} style={{ color: isKey ? J.key : isStr ? J.str : isNum ? J.num : J.codeText }}>{t}</span>;
                    })}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const jsonparser = { hero: <JsonparserHero />, dashboard: <JsonparserDashboard /> };
