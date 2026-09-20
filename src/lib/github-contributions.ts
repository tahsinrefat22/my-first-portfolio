import 'server-only';

export type ContributionDay = { date: string; count: number };

const REVALIDATE_SECONDS = 60 * 60 * 24;

/*
  GitHub contribution calendars for one or more accounts, merged by date.

  Two sources, tried in order:
  1. GitHub's GraphQL API, when GITHUB_TOKEN is set (a token with only read:user).
     The token stays on the server; nothing here ships to the browser.
  2. The public contributions proxy, which needs no token but is a third party.

  Cached for a day. Any failure returns null and the caller renders nothing.
*/
export async function getContributions(usernames: readonly string[]): Promise<ContributionDay[] | null> {
  const perUser = await Promise.all(
    usernames.map(async (u) => (await fromGraphQL(u)) ?? (await fromProxy(u)))
  );
  const days = perUser.filter((d): d is ContributionDay[] => d !== null);
  if (days.length === 0) return null;

  const merged = new Map<string, number>();
  for (const list of days) for (const d of list) merged.set(d.date, (merged.get(d.date) ?? 0) + d.count);
  return [...merged.entries()].sort(([a], [b]) => (a < b ? -1 : 1)).map(([date, count]) => ({ date, count }));
}

async function fromGraphQL(username: string): Promise<ContributionDay[] | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query($login: String!) { user(login: $login) { contributionsCollection { contributionCalendar { weeks { contributionDays { date contributionCount } } } } } }`,
        variables: { login: username },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: { user?: { contributionsCollection?: { contributionCalendar?: { weeks: { contributionDays: { date: string; contributionCount: number }[] }[] } } } };
    };
    const weeks = json.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
    if (!weeks) return null;
    return weeks.flatMap((w) => w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })));
  } catch {
    return null;
  }
}

async function fromProxy(username: string): Promise<ContributionDay[] | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`, {
      headers: { 'User-Agent': 'tahsinahmedrefat.com portfolio' },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { contributions?: { date: string; count: number }[] };
    if (!json.contributions) return null;
    return json.contributions.map((d) => ({ date: d.date, count: d.count }));
  } catch {
    return null;
  }
}
