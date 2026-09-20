# Tahsin Ahmed Refat, portfolio

Personal site: who I am, what I have built, where I have worked, and how to reach me.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS v4 with a CSS-variable token layer in `src/app/globals.css`
- Motion (`framer-motion`) for the hero entrance, section reveals, and the footer signature
- Phosphor icons, Geist via `next/font`
- shadcn primitives for the popover and button, customised

## Run

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
pnpm lint
```

## Layout

```
src/app/            routes: /, /career?company=<slug>, not-found, generated OG image
src/components/     one file per section, plus section / section-heading / bezel / reveal primitives
src/data/           projects, testimonials, skills, career entries, team links
src/lib/constants   nav, contact, social, z-index scale
docs/               redesign plan and notes
```

## Design

The direction and its rationale are in `docs/redesign-plan.md`. In short: one family (Geist) with weight-driven hierarchy, cool neutrals with one muted teal accent, pill buttons and 16px containers, motion only where it means something, reduced-motion honoured everywhere.

`.impeccable/config.json` records one intentional exception to the design detector: the single-font choice.

## Content that is mine to update

- `src/data/projects.ts`, `testimonials.ts`, `skills.ts`, `companyData.ts`
- Copy in `Hero.tsx`, `About.tsx`, `CTA.tsx`
- `public/portrait.png`, `public/portrait-casual.png`, project screenshots
