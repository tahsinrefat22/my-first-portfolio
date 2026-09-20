import type { ShowcaseId } from '@/components/showcase';

export interface Project {
  id: string;
  name: string;
  url: string;
  /** One line, under 25 words, in the product's own terms */
  summary: string;
  stack: string[];
  /** Key into the markup showcases (src/components/showcase): landing hero, then dashboard */
  showcase: ShowcaseId;
  /** What Tahsin did on it. Fill in per product. */
  role?: string;
}

/*
  All five are live products built with the same team at SpaceSoft and then Softwarelify.
  Summaries come from each product's own README or landing copy, not invented.
  TODO(owner): set `role` per product; the career data only names Rankflo and Salestial explicitly.
*/
export const PROJECTS: Project[] = [
  {
    id: 'rankflo',
    name: 'Rankflo',
    url: 'https://rankflo.ai/',
    summary:
      'Tracks how often a brand is mentioned in answers from ChatGPT, Gemini, Claude, and Perplexity, with sentiment, crawler logs, and competitor comparison. Also shipped as a Shopify app.',
    stack: ['Next.js', 'Fastify', 'tRPC', 'Drizzle', 'PostgreSQL', 'Clerk', 'Shopify'],
    showcase: 'rankflo',
    role: 'APIs and dashboard',
  },
  {
    id: 'salestial',
    name: 'Salestial AI',
    url: 'https://salestial.ai/',
    summary:
      'AI sales agents for any website, trained on your own docs and URLs. Text and voice, lead capture, meeting booking, one dashboard.',
    stack: ['Next.js', 'Supabase', 'OpenAI', 'RAG'],
    showcase: 'salestial',
    role: 'RAG chatbot and APIs',
  },
  {
    id: 'jsonparser',
    name: 'JSON Parser Pro',
    url: 'https://jsonparser.appexpertly.com/',
    summary:
      'A GoHighLevel workflow action that pulls any value out of a JSON payload and exposes it as a workflow variable. Paths, arrays, nesting, null-safe.',
    stack: ['FastAPI', 'Python', 'PostgreSQL', 'React'],
    showcase: 'jsonparser',
  },
  {
    id: 'zoom',
    name: 'Zoom Workflow Actions',
    url: 'https://zoomworkflow.appexpertly.com/',
    summary:
      'Zoom calls created, moved, cancelled, and attendance-tracked from GoHighLevel workflows. Two-way sync and a personal join link per attendee.',
    stack: ['React', 'Astro', 'Node', 'Drizzle', 'PostgreSQL'],
    showcase: 'zoom',
  },
  {
    id: 'provelify',
    name: 'Provelify',
    url: 'https://provelify.com/',
    summary:
      'Live social-proof notifications for GoHighLevel funnels. Install once per agency; every sub-account runs its own campaigns from a dashboard.',
    stack: ['React', 'Next.js', 'Prisma', 'PostgreSQL'],
    showcase: 'provelify',
  },
];
