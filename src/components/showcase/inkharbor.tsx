import { Btn, Logo, Pill } from './primitives';
import { cn } from '@/lib/utils';

/*
  Inkharbor is an Android app, so its miniature is phones rather than a browser
  window. Colours and layout come from the app itself (constants/colors.ts,
  home-list.tsx, collection/[id].tsx, document-editor.tsx, the comments screen):
  white and #111 grounds, #2563eb blue (#3b82f6 in dark mode), bordered rows
  with 10px corners, Ionicons. Screens are drawn at roughly 1:2.2.
*/
const IH = {
  light: { bg: '#ffffff', surface: '#ffffff', text: '#111111', muted: '#666666', border: '#cccccc', primary: '#2563eb', star: '#d97706', code: '#f3f4f6' },
  dark: { bg: '#111111', surface: '#1f1f23', text: '#eeeeee', muted: '#999999', border: '#444444', primary: '#3b82f6', star: '#fbbf24', code: '#1e1e22' },
};
type Theme = typeof IH.light;

const stage = { '--accent': IH.light.primary } as React.CSSProperties;

/* Line icons after the Ionicons outlines the app uses */
const ICONS = {
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </>
  ),
  back: <path d="M19 12H5m6-6-6 6 6 6" />,
  list: <path d="M9 6h11M9 12h11M9 18h11M4 6h1M4 12h1M4 18h1" />,
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  star: <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z" />,
  more: <path d="M12 5h.01M12 12h.01M12 19h.01" />,
  add: <path d="M12 5v14M5 12h14" />,
  chevron: <path d="m9 6 6 6-6 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  doc: <path d="M7 3h7l4 4v14H7zM10 12h5M10 16h5" />,
  offline: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v8m-3.5-3.5L12 16l3.5-3.5" />
    </>
  ),
  close: (
    <>
      <circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" />
      <path d="m9.5 9.5 5 5m0-5-5 5" stroke="#fff" />
    </>
  ),
  send: <path d="M12 19V5m-6 6 6-6 6 6" />,
  download: <path d="M12 4v11m-5-5 5 5 5-5M5 20h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
} as const;

function Icon({ name, filled = false, className, style }: { name: keyof typeof ICONS; filled?: boolean; className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={name === 'more' ? 4 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('block size-2.5 shrink-0', className)}
      style={style}
      aria-hidden
    >
      {ICONS[name]}
    </svg>
  );
}

function Phone({ theme, className, children }: { theme: Theme; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('absolute w-[134px] rounded-[20px] bg-[#0c0c0d] p-[3px] shadow-[0_18px_40px_-14px_rgba(0,0,0,0.4)]', className)}>
      <div className="relative flex h-[284px] flex-col overflow-hidden rounded-[17px]" style={{ background: theme.bg, color: theme.text }}>
        <div className="relative flex h-[14px] shrink-0 items-center justify-between px-3 text-[5.5px] font-semibold">
          <span>9:41</span>
          <span className="absolute top-[4px] left-1/2 size-[5px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
          <span className="flex items-center gap-[3px]">
            <span className="h-[4px] w-[6px] rounded-t-full" style={{ background: theme.text }} />
            <span className="flex h-[4px] w-[8px] items-center rounded-[1px] p-[0.5px] ring-[0.5px]" style={{ ['--tw-ring-color' as string]: theme.text }}>
              <span className="h-full w-[70%] rounded-[0.5px]" style={{ background: theme.text }} />
            </span>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

/* The stack header: back, title, and the screen's own actions */
function Header({ title, back = false, children }: { title: string; back?: boolean; children?: React.ReactNode }) {
  return (
    <div className="flex h-[24px] shrink-0 items-center gap-1.5 px-2.5">
      {back && <Icon name="back" className="size-[9px]" />}
      <span className="grow truncate text-[8px] font-semibold">{title}</span>
      {children && <span className="flex shrink-0 items-center gap-[5px]">{children}</span>}
    </div>
  );
}

function Avatar({ initials, color, size = 13 }: { initials: string; color: string; size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full text-[4.5px] font-semibold text-white"
      style={{ background: color, width: size, height: size }}
    >
      {initials}
    </span>
  );
}

/* A collection or document icon: its emoji, or a coloured square with a letter */
function ItemIcon({ emoji, color, label }: { emoji?: string; color?: string; label: string }) {
  if (emoji) return <span className="w-[13px] text-center text-[9px] leading-none">{emoji}</span>;
  return (
    <span className="grid size-[13px] shrink-0 place-items-center rounded-[3px] text-[6px] font-bold text-white" style={{ background: color }}>
      {label[0]}
    </span>
  );
}

function SearchBox({ theme, query }: { theme: Theme; query?: string }) {
  return (
    <div className="mx-2.5 mt-1 flex h-[20px] shrink-0 items-center gap-1.5 rounded-[5px] border px-2 text-[6.5px]" style={{ borderColor: theme.border }}>
      <Icon name="search" className="size-[8px]" style={{ color: theme.muted }} />
      {query ? <span className="grow">{query}</span> : <span className="grow" style={{ color: theme.muted }}>Search all documents</span>}
      {query && <Icon name="close" className="size-[8px]" style={{ color: theme.muted }} />}
    </div>
  );
}

function Tabs({ theme, tabs, active }: { theme: Theme; tabs: string[]; active: number }) {
  return (
    <div className="relative mx-2.5 mt-1 flex shrink-0 border-b" style={{ borderColor: `${theme.border}99` }}>
      {tabs.map((tab, i) => (
        <span key={tab} className="flex-1 py-[5px] text-center text-[6.5px] font-semibold" style={{ color: i === active ? theme.text : theme.muted }}>
          {tab}
        </span>
      ))}
      <span
        className="absolute bottom-[-1px] h-[1.5px] rounded-full"
        style={{ background: theme.primary, width: `${100 / tabs.length}%`, left: `${(100 / tabs.length) * active}%` }}
      />
    </div>
  );
}

function HomeScreen() {
  const t = IH.light;
  const collections: [string, string | undefined, string | undefined][] = [
    ['Engineering', '🛠️', undefined],
    ['Handbook', undefined, '#4f46e5'],
    ['Product', '🧭', undefined],
    ['Design', '🎨', undefined],
    ['Support', undefined, '#0d9488'],
    ['Marketing', '📣', undefined],
  ];
  return (
    <>
      <Header title="Acme Docs">
        <Avatar initials="AL" color="#7c3aed" />
      </Header>
      <SearchBox theme={t} />
      <Tabs theme={t} tabs={['Collections', 'Recent', 'Starred']} active={0} />
      <ul className="flex flex-col gap-[5px] px-2.5 pt-2">
        {collections.map(([name, emoji, color]) => (
          <li key={name} className="flex items-center gap-2 rounded-[5px] border px-2 py-[7px]" style={{ borderColor: t.border }}>
            <ItemIcon emoji={emoji} color={color} label={name} />
            <span className="text-[7.5px] font-medium">{name}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/* A collection's document tree, in dark mode: chevrons fold, children indent */
function CollectionScreen() {
  const t = IH.dark;
  const rows: [string, number, 'open' | 'closed' | null, string | undefined][] = [
    ['Architecture', 0, 'open', '🏛️'],
    ['API conventions', 1, null, undefined],
    ['Auth and sessions', 1, null, undefined],
    ['Deployment guide', 0, null, '📦'],
    ['Release checklist', 0, null, '🚀'],
    ['Runbooks', 0, 'closed', undefined],
    ['Onboarding', 0, 'open', '👋'],
    ['First week', 1, null, undefined],
    ['Local setup', 1, null, undefined],
    ['Code review', 0, null, undefined],
  ];
  return (
    <>
      <Header title="Engineering" back>
        <Icon name="add" className="size-[10px]" />
        <Icon name="star" filled className="size-[9px]" style={{ color: t.star }} />
      </Header>
      <ul className="flex flex-col pt-1">
        {rows.map(([title, depth, fold, emoji]) => (
          <li key={title} className="flex items-center border-b pr-2.5" style={{ paddingLeft: 4 + depth * 10, borderColor: `${t.border}aa` }}>
            <span className="grid w-[14px] place-items-center py-[7px]" style={{ color: t.muted }}>
              {fold && <Icon name={fold === 'open' ? 'chevronDown' : 'chevron'} className="size-[7px]" />}
            </span>
            <span className="flex grow items-center gap-1.5 py-[7px]">
              {emoji && <span className="text-[7.5px] leading-none">{emoji}</span>}
              <span className="text-[7px]">{title}</span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export function InkharborHero() {
  return (
    <div style={stage} className="relative h-full w-full overflow-hidden bg-white text-black">
      <div
        aria-hidden
        className="absolute -top-16 -right-8 size-[420px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.10), transparent 65%)' }}
      />
      <div className="absolute top-[46px] left-[44px] w-[300px]">
        <div className="flex items-center gap-2">
          <Logo src="/showcase/inkharbor.svg" className="size-6 rounded-[6px]" />
          <span className="text-[12px] font-semibold tracking-[-0.01em]">Inkharbor</span>
        </div>
        <Pill className="mt-4">Unofficial · Open source · MIT</Pill>
        <h3 className="mt-2.5 text-[25px] leading-[1.05] font-semibold tracking-[-0.03em]">
          Your Outline wiki,
          <br />
          on Android
        </h3>
        <p className="mt-2 max-w-[250px] text-[8px] leading-snug text-black/55">
          An unofficial, open-source app for reading and editing Outline on your phone, made mainly for self-hosted servers.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Btn>
            <Icon name="download" className="size-[8px]" />
            Download APK
          </Btn>
          <Btn variant="ghost">View on GitHub</Btn>
        </div>
        <div className="mt-3 text-[6.5px] text-black/45">Android 7.0+ · Outline 1.11.0+ · Offline reading · Several servers</div>
      </div>
      {/* Side by side rather than overlapped, so neither screen is cut through its text */}
      <Phone theme={IH.dark} className="top-[44px] left-[488px]">
        <CollectionScreen />
      </Phone>
      <Phone theme={IH.light} className="top-[22px] left-[340px]">
        <HomeScreen />
      </Phone>
    </div>
  );
}

function Checkbox({ theme, checked }: { theme: Theme; checked: boolean }) {
  return (
    <span
      className="mt-[1px] grid size-[7px] shrink-0 place-items-center rounded-[2px] border text-white"
      style={checked ? { background: theme.primary, borderColor: theme.primary } : { borderColor: theme.muted }}
    >
      {checked && <Icon name="check" className="size-[6px]" />}
    </span>
  );
}

function ReaderScreen() {
  const t = IH.light;
  const checks: [string, boolean][] = [
    ['Bump the version in app.json', true],
    ['Update the README', true],
    ['Build the preview APK', false],
    ['Write the release notes', false],
  ];
  return (
    <>
      <Header title="Release checklist" back>
        <Icon name="list" className="size-[9px]" />
        <span className="relative">
          <Icon name="chat" filled className="size-[9px]" />
          <span className="absolute -top-[3px] -right-[4px] grid size-[7px] place-items-center rounded-full text-[4.5px] font-bold text-white" style={{ background: t.primary }}>
            2
          </span>
        </span>
        <Icon name="star" filled className="size-[9px]" style={{ color: t.star }} />
        <Icon name="more" className="size-[9px]" />
      </Header>
      <div className="relative flex flex-col gap-[5px] px-2.5 pt-1">
        <div className="flex items-center gap-1">
          <span className="text-[10px] leading-none">🚀</span>
          <span className="text-[11px] leading-tight font-bold">Release checklist</span>
        </div>
        <div className="-mt-[2px] text-[5.5px]" style={{ color: t.muted }}>
          Updated 18 Oct 2026 by Ada Lovelace
        </div>
        <div className="mt-1 text-[8px] font-semibold">Before tagging</div>
        <ul className="flex flex-col gap-[4px]">
          {checks.map(([text, checked]) => (
            <li key={text} className="flex items-start gap-1.5 text-[6.5px] leading-snug" style={checked ? { color: t.muted } : undefined}>
              <Checkbox theme={t} checked={checked} />
              {text}
            </li>
          ))}
        </ul>
        <div className="mt-0.5 flex gap-1.5 rounded-[4px] px-2 py-1.5 text-[6px] leading-snug" style={{ background: '#eff6ff', color: '#1e3a8a' }}>
          <span>ℹ︎</span>
          Release builds only include 64-bit ARM.
        </div>
        <div className="mt-1 text-[8px] font-semibold">Build</div>
        <p className="text-[6.5px] leading-snug">The release APK comes from the preview profile, signed with the same key.</p>
        <pre className="rounded-[4px] px-2 py-1.5 font-mono text-[5.5px] leading-relaxed" style={{ background: t.code, color: '#1f2937' }}>
          {'bunx eas-cli build \\\n  --profile preview \\\n  --platform android'}
        </pre>
      </div>
      {/* The draggable scroll handle on the right edge */}
      <span className="absolute top-[96px] right-[3px] h-[24px] w-[3px] rounded-full" style={{ background: `${t.muted}88` }} />
    </>
  );
}

function EditorScreen() {
  const t = IH.light;
  const tools: [string, boolean][] = [['🖼', false], ['↶', false], ['↷', false], ['B', true], ['I', false], ['S', false], ['</>', false]];
  const keys = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  return (
    <>
      <Header title="Weekly sync" back>
        <Icon name="list" className="size-[9px]" />
        <Icon name="chat" className="size-[9px]" />
        <Icon name="star" className="size-[9px]" />
        <Icon name="more" className="size-[9px]" />
      </Header>
      <div className="shrink-0 border-b px-2.5 py-[4px] text-[5.5px] leading-snug" style={{ borderColor: t.border, color: t.muted }}>
        Offline. Your changes are kept on this phone and saved when you&apos;re back online.
      </div>
      <div className="flex grow flex-col gap-[5px] px-2.5 pt-1.5">
        <span className="text-[11px] leading-tight font-bold">Weekly sync</span>
        <div className="-mt-[2px] text-[5.5px]" style={{ color: t.muted }}>
          Updated 16 Oct 2026 by Sam Rivera
        </div>
        <div className="mt-0.5 text-[8px] font-semibold">Agenda</div>
        <ul className="flex flex-col gap-[3px] pl-1.5 text-[6.5px] leading-snug">
          {['Comments and reactions are in', 'Offline edits sync on reconnect', 'Tables stay read-only for now'].map((item) => (
            <li key={item} className="flex gap-1.5">
              <span>•</span>
              {item}
            </li>
          ))}
        </ul>
        {/* The block with the cursor, with its drag handle beside it */}
        <div className="relative text-[6.5px] leading-snug">
          <span className="absolute top-0 -left-[8px] text-[6px] leading-snug" style={{ color: t.muted }}>
            ⠿
          </span>
          Ship the editor to everyone on <strong>Friday</strong>
          <span className="ml-[1px] inline-block h-[7px] w-[1px] translate-y-[1px]" style={{ background: t.primary }} />
        </div>
      </div>
      <div className="flex shrink-0 items-center border-t" style={{ borderColor: t.border }}>
        <div className="flex grow items-center gap-[1px] overflow-hidden px-1 py-[3px]">
          {tools.map(([label, on]) => (
            <span
              key={label}
              className="grid h-[14px] min-w-[13px] place-items-center rounded-[3px] px-[2px] text-[6.5px] font-semibold"
              style={on ? { background: t.primary, color: '#fff' } : undefined}
            >
              {label}
            </span>
          ))}
        </div>
        <span className="border-l px-2 text-[6.5px] font-semibold" style={{ borderColor: t.border, color: t.primary }}>
          Done
        </span>
      </div>
      <div className="flex shrink-0 flex-col gap-[3px] bg-[#e8eaed] px-[3px] pt-[4px] pb-[6px]">
        {keys.map((row) => (
          <div key={row} className="flex justify-center gap-[2px]">
            {[...row].map((k) => (
              <span key={k} className="grid h-[13px] w-[10px] place-items-center rounded-[2px] bg-white text-[5px] text-black/70">
                {k}
              </span>
            ))}
          </div>
        ))}
        <div className="flex justify-center gap-[2px]">
          <span className="h-[13px] w-[18px] rounded-[2px] bg-[#cfd3d8]" />
          <span className="h-[13px] w-[62px] rounded-[2px] bg-white" />
          <span className="h-[13px] w-[18px] rounded-[2px]" style={{ background: t.primary }} />
        </div>
      </div>
    </>
  );
}

function Reaction({ theme, emoji, count, mine = false }: { theme: Theme; emoji: string; count: number; mine?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-[2px] rounded-full border px-[4px] py-[1px] text-[5.5px] font-semibold"
      style={mine ? { borderColor: theme.primary, background: `${theme.primary}26` } : { borderColor: theme.border }}
    >
      {emoji} {count}
    </span>
  );
}

function CommentsScreen() {
  const t = IH.dark;
  return (
    <>
      <Header title="Comments" back />
      <Tabs theme={t} tabs={['Open', 'Resolved']} active={0} />
      <div className="flex flex-col gap-1.5 px-2 pt-2">
        <div className="flex flex-col gap-1.5 rounded-[6px] border p-2" style={{ borderColor: t.border, background: t.surface }}>
          <div className="border-l-[1.5px] pl-1.5 text-[5.5px] italic" style={{ borderColor: t.primary, color: t.muted }}>
            Build the preview APK
          </div>
          <div className="flex items-center gap-1">
            <Avatar initials="SR" color="#db2777" size={11} />
            <span className="text-[6px] font-semibold">Sam Rivera</span>
            <span className="text-[5.5px]" style={{ color: t.muted }}>
              5 min ago
            </span>
          </div>
          <p className="text-[6.5px] leading-snug">Can we drop 32-bit builds? The APK would be a lot smaller.</p>
          <div className="flex gap-1">
            <Reaction theme={t} emoji="👍" count={2} mine />
            <Reaction theme={t} emoji="🎉" count={1} />
            <span className="inline-flex items-center rounded-full border px-[4px] py-[1px] text-[5.5px]" style={{ borderColor: t.border, color: t.muted }}>
              ☺︎+
            </span>
          </div>
          <div className="ml-2 flex flex-col gap-1 border-l pl-1.5" style={{ borderColor: t.border }}>
            <div className="flex items-center gap-1">
              <Avatar initials="AL" color="#7c3aed" size={11} />
              <span className="text-[6px] font-semibold">Ada Lovelace</span>
              <span className="text-[5.5px]" style={{ color: t.muted }}>
                now
              </span>
            </div>
            <p className="text-[6.5px] leading-snug">Done, release builds are arm64 only.</p>
          </div>
          <div className="flex gap-3 text-[6px] font-semibold" style={{ color: t.primary }}>
            <span>↩ Reply</span>
            <span>✓ Resolve</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 rounded-[6px] border p-2" style={{ borderColor: t.border, background: t.surface }}>
          <div className="border-l-[1.5px] pl-1.5 text-[5.5px] italic" style={{ borderColor: t.primary, color: t.muted }}>
            Write the release notes
          </div>
          <div className="flex items-center gap-1">
            <Avatar initials="JK" color="#0891b2" size={11} />
            <span className="text-[6px] font-semibold">Jo Kim</span>
            <span className="text-[5.5px]" style={{ color: t.muted }}>
              1 h ago
            </span>
          </div>
          <p className="text-[6.5px] leading-snug">I can take these if nobody has started.</p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 border-t px-2 py-1.5" style={{ borderColor: t.border, background: t.bg }}>
        <span className="flex h-[15px] grow items-center rounded-full border px-2 text-[6px]" style={{ borderColor: t.border, color: t.muted }}>
          Add a comment…
        </span>
        <span className="grid size-[15px] place-items-center rounded-full text-white" style={{ background: t.primary }}>
          <Icon name="send" className="size-[8px]" />
        </span>
      </div>
    </>
  );
}

function SearchScreen() {
  const t = IH.light;
  const results: [string, string | undefined, string, [string, string, string], boolean][] = [
    ['Deployment guide', '📦', 'Engineering', ['Run the ', 'deploy', ' script from the repo root, then check the health page.'], true],
    ['Release checklist', '🚀', 'Engineering', ['Bump the version before you ', 'deploy', ' a preview build to testers.'], true],
    ['Server setup', undefined, 'Handbook', ['Nginx sits in front of every ', 'deploy', 'ment; certificates renew on their own.'], false],
    ['Incident log', '🧯', 'Support', ['Rolled back the Friday ', 'deploy', ' after the sign-in loop was reported.'], false],
  ];
  return (
    <>
      <Header title="Acme Docs">
        <Avatar initials="AL" color="#7c3aed" />
      </Header>
      <SearchBox theme={t} query="deploy" />
      <ul className="flex flex-col gap-[5px] px-2.5 pt-2">
        {results.map(([title, emoji, collection, [before, match, after], offline]) => (
          <li key={title} className="flex flex-col gap-[2px] rounded-[5px] border p-[6px]" style={{ borderColor: t.border }}>
            <span className="flex items-center gap-1">
              {emoji && <span className="text-[7.5px] leading-none">{emoji}</span>}
              <span className="grow text-[7.5px] font-semibold">{title}</span>
              {offline && <Icon name="offline" className="size-[7px]" style={{ color: t.muted }} />}
            </span>
            <span className="text-[5.5px]" style={{ color: t.muted }}>
              {collection}
            </span>
            <span className="text-[6px] leading-snug" style={{ color: t.muted }}>
              {before}
              <b style={{ color: t.text }}>{match}</b>
              {after}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

/* The app's main screens side by side: reading, editing offline, comments in dark mode, search */
export function InkharborDashboard() {
  return (
    <div style={{ ...stage, background: '#eef0f3' }} className="relative h-full w-full overflow-hidden">
      <Phone theme={IH.light} className="top-[15px] left-[22px]">
        <ReaderScreen />
      </Phone>
      <Phone theme={IH.light} className="top-[15px] left-[176px]">
        <EditorScreen />
      </Phone>
      <Phone theme={IH.dark} className="top-[15px] left-[330px]">
        <CommentsScreen />
      </Phone>
      <Phone theme={IH.light} className="top-[15px] left-[484px]">
        <SearchScreen />
      </Phone>
    </div>
  );
}

export const inkharbor = { hero: <InkharborHero />, dashboard: <InkharborDashboard /> };
