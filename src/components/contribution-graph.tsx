import { getContributions, type ContributionDay } from '@/lib/github-contributions';
import { GITHUB_ACCOUNTS } from '@/lib/constants';
import { GraphSpotlight } from '@/components/graph-spotlight';

const CELL = 22;
const GAP = 8;
const PITCH = CELL + GAP;
const ROWS = 7;

/* Five levels: empty, then quartiles of the non-zero days, as GitHub does it */
function levelOf(count: number, quartiles: number[]) {
  if (count <= 0) return 0;
  if (count <= quartiles[0]) return 1;
  if (count <= quartiles[1]) return 2;
  if (count <= quartiles[2]) return 3;
  return 4;
}

function toWeeks(days: ContributionDay[]) {
  // Pad the first week so columns start on Sunday, like the GitHub calendar
  const first = new Date(days[0].date + 'T00:00:00Z').getUTCDay();
  const padded: (ContributionDay | null)[] = [...Array<null>(first).fill(null), ...days];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += ROWS) weeks.push(padded.slice(i, i + ROWS));
  return weeks;
}

function GraphSvg({ weeks, quartiles, bright }: { weeks: (ContributionDay | null)[][]; quartiles: number[]; bright: boolean }) {
  const width = weeks.length * PITCH - GAP;
  const height = ROWS * PITCH - GAP;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={bright ? 'contrib-svg contrib-svg-bright' : 'contrib-svg'}
      aria-hidden
    >
      {weeks.map((week, x) =>
        week.map((day, y) =>
          day === null ? null : (
            <rect
              key={day.date}
              x={x * PITCH}
              y={y * PITCH}
              width={CELL}
              height={CELL}
              rx={5}
              data-level={levelOf(day.count, quartiles)}
              className="contrib-cell"
              style={{ ['--i' as string]: x }}
            />
          )
        )
      )}
    </svg>
  );
}

/*
  A year of commits from both GitHub accounts, merged by date, shown under the About
  portrait. Cells fill in column by column the first time it scrolls into view; a
  spotlight brightens the ones under the cursor. Renders nothing if the data cannot be fetched.
*/
export async function ContributionGraph() {
  const days = await getContributions(GITHUB_ACCOUNTS.map((a) => a.handle));
  if (!days || days.length < 30) return null;

  const nonZero = days.map((d) => d.count).filter((c) => c > 0).sort((a, b) => a - b);
  const q = (p: number) => nonZero[Math.min(nonZero.length - 1, Math.floor(nonZero.length * p))] ?? 0;
  const quartiles = [q(0.25), q(0.5), q(0.75)];
  const weeks = toWeeks(days);
  const total = days.reduce((s, d) => s + d.count, 0);

  const totalLabel = `${total.toLocaleString()} contributions in the last year`;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-sm font-medium">GitHub heatmap</h3>
        <span className="font-mono text-xs text-muted-foreground">{totalLabel}</span>
      </div>
      <GraphSpotlight
        label={`GitHub contribution graph, ${totalLabel}`}
        bright={<GraphSvg weeks={weeks} quartiles={quartiles} bright />}
      >
        <GraphSvg weeks={weeks} quartiles={quartiles} bright={false} />
      </GraphSpotlight>
    </div>
  );
}
