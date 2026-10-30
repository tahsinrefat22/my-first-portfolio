export interface Contribution {
  id: string;
  /** owner/name on GitHub */
  repo: string;
  number: number;
  url: string;
  /** What it changed, in plain words */
  title: string;
  /** The pull request's own title */
  prTitle: string;
  summary: string;
  /** Opened, merged, released */
  timeline: { label: string; date: string; detail?: string }[];
  diff: { additions: number; deletions: number; files: number; commits: number };
  links: { label: string; href: string }[];
  /** Cases from the merged tests, shown beside the story */
  cases?: { value: string; accepted: boolean; reason: string }[];
}

export interface MaintainedProject {
  name: string;
  url: string;
  description: string;
  role: string;
  license: string;
}

/*
  Pull requests merged into other people's projects. Dates, numbers and test cases
  come from GitHub, not memory: the PR, its diff, and the release it shipped in.
*/
export const CONTRIBUTIONS: Contribution[] = [
  {
    id: 'outline-13945',
    repo: 'outline/outline',
    number: 13945,
    url: 'https://github.com/outline/outline/pull/13945',
    title: 'Native app sign-in for Outline',
    prTitle: 'fix: Allow private-use URI schemes for OAuth redirect URIs',
    summary:
      'Outline only accepted web addresses as OAuth redirect URIs, so a phone app had nowhere to receive its sign-in. My change accepts the private-use schemes native apps register, as RFC 8252 describes, and still refuses schemes that can run or embed content. Outline 1.11.0 shipped it and credits me as a new contributor.',
    timeline: [
      { label: 'Opened', date: '4 Oct 2026' },
      { label: 'Merged', date: '8 Oct 2026', detail: 'by @tommoor' },
      { label: 'Released', date: '12 Oct 2026', detail: 'Outline 1.11.0' },
    ],
    diff: { additions: 234, deletions: 6, files: 7, commits: 3 },
    links: [
      { label: 'View pull request', href: 'https://github.com/outline/outline/pull/13945' },
      { label: 'Release notes', href: 'https://github.com/outline/outline/releases/tag/v1.11.0' },
    ],
    // From server/models/validators/IsUrlList.test.ts in the PR
    cases: [
      { value: 'com.example.app:/oauth2redirect', accepted: true, reason: 'Native app, RFC 8252' },
      { value: 'myapp://callback', accepted: true, reason: 'Native app' },
      { value: 'https://example.com/callback', accepted: true, reason: 'Web app, as before' },
      { value: 'javascript:alert(1)', accepted: false, reason: 'Can run code' },
      { value: 'data:text/html,hi', accepted: false, reason: 'Can embed content' },
      { value: 'callback', accepted: false, reason: 'No scheme' },
    ],
  },
];

/* Projects Tahsin started and looks after */
export const MAINTAINED: MaintainedProject[] = [
  {
    name: 'Inkharbor',
    url: 'https://github.com/tahsinrefat22/inkharbor',
    description: 'An unofficial Android app for Outline, and the reason for the fix above.',
    role: 'Author and maintainer',
    license: 'MIT',
  },
];
