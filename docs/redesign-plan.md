# Portfolio redesign plan

Plan only. No source files change until this is approved. Produced 2026-09-20 by applying four installed skills to the current committed code (`2f11b20`): `design-taste-frontend`, `redesign-existing-projects`, `high-end-visual-design`, and `impeccable` (including its rendered anti-pattern detector against the running dev server). Where the skills disagreed, the choice and reason are in section 9.

The brief was one word: elegant. Everything below infers from that word, the codebase, the audience, and what was already rejected (a violet/gold serif direction). Assumptions are stated so they are cheap to redirect.

---

## 1. Design read

**Reading this as:** a full-stack developer portfolio for recruiters and hiring managers scanning in under a minute, with a calm, restrained-premium language, leaning toward Tailwind v4 + shadcn (heavily customised, never in default state) + Geist + Motion with a reduced-motion fallback.

**Mode (impeccable):** Experience. The work leads from the first viewport; the interface recedes. The final section is the one Persuade moment.

**Redesign type:** Overhaul. New visual language on existing content and information architecture. Content, routes, anchor IDs, section order, and nav labels stay. The old look is evidence and anti-reference, not a base to polish.

**Dials:**

| Dial             | Value | Why                                                                                                                            |
| ---------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------ |
| DESIGN_VARIANCE  | 6     | Developer-portfolio preset is 6. Overhaul would push to 8, but "elegant" pulls back toward restraint. Asymmetric, not chaotic. |
| MOTION_INTENSITY | 5     | One choreographed hero entrance, light section reveals, spring physics on interactive elements. Nothing perpetual.             |
| VISUAL_DENSITY   | 3     | Airy. Section padding `py-24 md:py-32`. Let it breathe.                                                                        |

**Colour strategy (impeccable):** Restrained. Cool neutrals plus one accent. Honest note: impeccable warns this is the guessable choice for a developer portfolio. The brief pins "elegant," which binds it. Distinctiveness therefore has to come from execution (type discipline, spacing, the accent choice, one signature interaction), not from palette strategy.

---

## 2. Audit of the current build

### 2.1 Mechanical findings (impeccable detector, rendered)

Run against `http://localhost:3000` and `/career?company=spacesoft`.

| Viewport   | Finding                                                                                                   | Where                             | Severity                                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 390x844    | `body-text-viewport-edge`: three paragraphs bleed 34px past the right edge                                | About section                     | Bug. Must fix.                                                                                                            |
| 390x844    | `content-hidden-at-rest`: 40% of page text (1394 of 3467 chars) at `opacity: 0` after reveal handlers ran | Every `whileInView` section       | Structural. See 6.1.                                                                                                      |
| 390x844    | `body-text-viewport-edge` at -329 / -703 / -1077px                                                        | Testimonial carousel slides       | Expected for a carousel, but the carousel is being replaced anyway.                                                       |
| 1440 + 390 | `low-contrast` 1.1:1 on "Ready to Work Together?" and 3.8:1 on the paragraph                              | CTA                               | Symptom of the section starting at `opacity: 0`. Resolves with 6.1. The stacked gradients underneath are a separate tell. |
| 1440 + 390 | `clipped-overflow-container`                                                                              | About, Footer                     | Footer clip is intentional (signature text). About clip is not needed.                                                    |
| 1440 + 390 | `cramped-padding`: children flush to top of a `bg-background` section                                     | Projects (`pb-16` with no `pt`)   | Minor. Fixed by the section wrapper.                                                                                      |
| all        | `bounce-easing` `cubic-bezier(.5,.85,.25,1.8)`                                                            | `ui/shadcn-io/navbar-03` line 66  | Replace with ease-out-expo.                                                                                               |
| career     | `line-length` ~155 chars per line                                                                         | Career page prose                 | Container is `max-w-screen-2xl` (1536px). Fix with 5.4.                                                                   |
| career     | `image-hover-transform` x3 (advisory)                                                                     | `group-hover:scale-105` on images | Named as a generated-UI signature. Remove.                                                                                |

Static scan of `src/` was otherwise clean. The current code is stock shadcn, which is generic rather than egregious.

### 2.2 Heuristic findings (from the three taste skills)

**Typography**

- Single font (Parkinsans) doing display and body. No hierarchy beyond size and `font-bold`. Only 400 and 700 weights in use.
- Every heading is Title Case ("Recent Projects", "What People Think About Me").
- No `text-wrap: balance` on headings. No `max-w-[65ch]` on prose.

**Colour and surfaces**

- Background is pure white `oklch(1 0 0)` and dark mode is `oklch(0.145 0 0)`. All neutrals have zero chroma. Every skill flags pure white and untinted grey.
- No accent colour at all. `--primary` is near-black.
- CTA section stacks two linear gradients (`from-primary/10 via-primary/5` and `via-primary/10`) plus a 3% overlay. This is the generic-gradient tell.
- Two buttons ("View Github", "My Career") carry the full slop signature in one class string: gradient fill, `before:` shine sweep, `hover:scale-105`, `shadow-primary/20`.
- Cards use border + shadow + white background (Projects, Testimonials) where spacing would do.

**Layout**

- Hero uses `h-screen` (iOS Safari jump). Must be `min-h-[100dvh]`.
- Projects is three equal cards in a row. Named as the most generic AI layout by all three skills.
- Expertise runs three infinite marquees. The hard rule is max one per page.
- Career page alternates image-left / image-right three times. The third consecutive zigzag is a fail.
- Container `max-w-screen-2xl` is too wide for prose and causes the career-page line length.
- Testimonials is the "3-card carousel with dots" pattern, named verbatim as banned.

**Motion**

- Hero stacks three perpetual effects: hex-grid background, typewriter, rotating flip-words. None has a stated purpose.
- Navbar scroll-spy uses `window.addEventListener('scroll')`. Banned by two skills; it re-renders on every frame.
- Footer illumination tracks the cursor with `useState`. Banned; continuous pointer values belong in motion values.
- Zero `prefers-reduced-motion` handling anywhere. Mandatory at MOTION 5.
- Easing is `easeOut` everywhere. No spring, no custom curve.

**Content and CTAs**

- Duplicate CTA intent: nav has "Hire Me" and "Download My CV"; the CTA section has "Get In Touch" and "Download My CV". One label per intent.
- Hero copy is the AI default greeting ("Hi! I am ...") followed by "I am [rotating role]".
- About copy is three paragraphs of filler ("passionate", "innovative solutions that make a positive impact", "latest developments in the tech industry").
- Testimonials run 4 to 6 lines. Guideline is 3.
- Two portraits of the same person, both exported from a LinkedIn profile-picture template (the filenames say so). Redundant, and the beige template ring reads as Canva.
- Data inconsistency: one testimonial lists Ashfak at "Singularity Corporation"; `teamLinks.ts` lists him as SpaceSoft Product Manager.

**Icons and assets**

- Lucide throughout. Acceptable because the project already depends on it, but every skill prefers a lighter set.
- 19 skill logos as PNGs of mixed resolution and style. `docs/nextjs-image-sizing.md` already documents the blur problem this causes.
- Asset filenames contain spaces and parentheses.
- `og-image.png` is referenced in metadata but does not exist in `public/`.

**Dead weight**

- `HexagonBackground` will be unused after the hero change. `drizzle-orm` and `drizzle-kit` are installed with zero imports. `SettingsProvider` is written to and never read. `gsap` is used only by the typewriter component. Eleven files in `public/` are unreferenced.

### 2.3 What to preserve

- **The footer signature.** The cursor-illuminated "Tahsin" is the one genuinely distinctive interaction on the site. Keep it, port it to motion values, add a reduced-motion fallback.
- **The "T" monogram.** Simple geometric mark. Brand. Does not change without explicit approval.
- **Information architecture.** Six anchored sections in this order, `/career?company=` route, all `id`s, nav labels.
- **The career page structure.** Header, technologies, role, life-at-company, achievements. Good bones.
- **Real content.** Real colleagues, real companies, real projects, two real GitHub accounts. Nothing here is placeholder, which is rarer than it should be.
- **Theme toggle with View Transitions.** Works well. Keep.
- **`scroll-behavior: smooth`, next/font, `next/image` with `priority` on the hero.** Already right.

---

## 3. Direction contract

Written in impeccable's six-block form so the build has a target it can be reviewed against.

**THESIS.** A developer portfolio that reads like a well-set document rather than a landing page: one voice, one accent, generous space, and nothing moving that does not need to. It refuses the category default of a centred hero over a dark mesh with a rotating job title.

**OWN-WORLD.** Cool off-white ground (dark: cool near-black). One family, Geist, carrying display to body through weight and tracking alone. One accent, a muted teal, used on the brand mark, focus rings, links, and the single primary action per section, never decoratively. Corners: pill for buttons and tags, 16px for containers, 12px for images inside them. Shadows are large, soft, and tinted to the ground. Hairlines at 8 to 12% foreground. Recognisable with all content removed by the type discipline and the spacing.

**STORY.** A hiring manager lands, reads one confident line about what Tahsin builds, sees a real face, and understands the stack in a glance. They scroll into three pieces of work, hear from four colleagues, and are handed one clear way to get in touch. They leave with a name, a competence, and a way to act.

**FIRST VIEWPORT.** Asymmetric split, `min-h-[100dvh]`. Left 55%: headline (max two lines, 600 weight, `tracking-[-0.03em]`), one line of subtext (max 20 words), primary "Get in touch" and secondary "View projects". Right 45%: the portrait in a double-bezel frame with a soft tinted shadow. Floating pill nav above, detached from the top edge. No eyebrow, no background pattern, no rotating words.

*Amendment, owner's request after build:* the Projects section now shows five live products built at Softwarelify (Rankflo, Salestial AI, JSON Parser Pro, Zoom Workflow Actions, Provelify) in a 2 + 3 grid. Each tile holds a miniature of the product's landing hero and its dashboard, built in Tailwind at a fixed 640x320 stage and scaled to the tile, scrolling from one to the other on hover. The skills ban hand-built product UI; these are real, shipping products, so it is treated as the marketing-site convention. The miniatures are `role="img"` and inert, and the detector's structural rules are scoped off for `src/components/showcase/*`.

*Amendment, owner's request after build:* a scroll cue at bottom centre, `md` and up. The skills ban this pattern; the owner chose to break the rule here, deliberately. Built as a mouse outline with a rolling wheel and a "Scroll for more" label, linking to the next section, fading out over the first 120px of scroll, wheel static under reduced motion.

**FORM.** Editorial split for the hero; asymmetric bento (2+1) for projects; cardless two-column grid for testimonials; centred single-message block for the CTA. Four distinct layout families across seven sections.

**Signature interaction.** The footer illumination, retained and refined. Secondary: the button-in-button arrow that translates diagonally on hover.

**Honest risk.** Restrained neutral-plus-accent is where most developer portfolios land. If the type and spacing are not executed with discipline, this reads as a clean template. The mitigation is the pre-flight in section 12, not more decoration.

---

## 4. Token layer

All values are starting points. Contrast is verified in the build, not assumed here.

### 4.1 Palette

Cool tint on every neutral (hue ~265). One accent (hue ~185). No pure black, no pure white, no second accent.

```css
:root {
  --background: oklch(0.985 0.004 265);
  --foreground: oklch(0.2 0.015 265);
  --surface-1: oklch(0.965 0.005 265); /* section tint bands, outer bezels */
  --card: oklch(0.99 0.003 265);
  --card-foreground: var(--foreground);
  --muted: oklch(0.95 0.006 265);
  --muted-foreground: oklch(
    0.48 0.02 265
  ); /* verify >= 4.5:1 on --background */
  --border: oklch(0.2 0.015 265 / 10%);
  --input: var(--border);
  --primary: oklch(0.52 0.1 185); /* muted teal */
  --primary-foreground: oklch(0.985 0.004 265);
  --ring: var(--primary);
  --accent: oklch(0.52 0.1 185 / 10%);
  --accent-foreground: oklch(0.35 0.09 185);
}

.dark {
  --background: oklch(0.17 0.012 265);
  --foreground: oklch(0.93 0.008 265);
  --surface-1: oklch(0.2 0.014 265);
  --card: oklch(0.21 0.014 265);
  --muted: oklch(0.24 0.014 265);
  --muted-foreground: oklch(0.7 0.015 265);
  --border: oklch(0.93 0.008 265 / 12%);
  --primary: oklch(0.72 0.1 185);
  --primary-foreground: oklch(0.15 0.02 185);
  --accent: oklch(0.72 0.1 185 / 12%);
  --accent-foreground: oklch(0.82 0.08 185);
}
```

Remove the `--chart-*` and `--sidebar-*` tokens. Nothing uses them.

Why teal: it sits outside both AI clusters impeccable names (near-black plus neon, and cream plus terracotta), it is not the blue every developer portfolio uses, it is not the violet already rejected, and it holds contrast in both modes without saturation. Alternates if it does not land: deep rose `oklch(0.50 0.12 10)`, or forest `oklch(0.45 0.09 150)`.

### 4.2 Type

One family. Hierarchy through weight and tracking, not through a second face.

- **Family:** Geist Sans via `next/font/google`, weights 400 / 500 / 600. Geist Mono, weight 400, for the few tabular contexts (dates on the career page). Remove Parkinsans. This is a brand change and needs approval; see section 11.
- **Display (hero h1):** `text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.05] text-balance`
- **Section h2:** `text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] leading-[1.1] text-balance`
- **h3:** `text-xl md:text-2xl font-medium tracking-[-0.01em]`
- **Body:** `text-base md:text-lg leading-relaxed text-pretty max-w-[65ch]`
- **Meta / labels:** `text-sm font-medium text-muted-foreground`. Sentence case. No uppercase-tracked eyebrows.
- **Headings:** sentence case throughout.

Alternative if continuity matters more than the consensus: keep Parkinsans for h1/h2 only, Geist for everything else. Parkinsans is not on any skill's ban list. It is friendlier than it is elegant, which is why it is not the recommendation.

### 4.3 Shape

One documented rule, applied everywhere:

| Element                                      | Radius                                                          |
| -------------------------------------------- | --------------------------------------------------------------- |
| Buttons, tags, pills                         | `rounded-full`                                                  |
| Containers, project tiles, bezel outer shell | `rounded-2xl` (16px)                                            |
| Images inside a bezel                        | `rounded-[calc(1rem-0.375rem)]` (concentric with `p-1.5` shell) |
| Inputs (none currently)                      | `rounded-lg` (8px)                                              |
| Avatars                                      | `rounded-xl` squircle, not a circle                             |

### 4.4 Space

- Sections: `py-24 md:py-32`. Bottom optically larger where a section ends on a heavy element.
- Container: `max-w-6xl` (1152px) with `px-6 md:px-8`. Replaces `max-w-screen-2xl`.
- Prose: `max-w-[65ch]`.
- Nav height: 56 to 64px.

### 4.5 Surface and depth

- Shadows: `shadow-[0_24px_64px_-24px_oklch(0.20_0.015_265/0.18)]` in light, tint swaps in dark. Never `shadow-md` or untinted black.
- Hairlines: `ring-1 ring-foreground/[0.06]` in light, `/[0.10]` in dark.
- Bezel (project tiles, hero portrait): outer `bg-foreground/[0.03] ring-1 ring-foreground/[0.06] p-1.5 rounded-2xl`; inner `rounded-[calc(1rem-0.375rem)] shadow-[inset_0_1px_0_oklch(1_0_0/0.10)]`.
- Optional grain: a single fixed `pointer-events-none` overlay at 2 to 3%. Only if the flat surfaces feel sterile after the build. Not by default.
- No gradients. No glows. No mesh.

### 4.6 Motion

- Entrance curve: `[0.16, 1, 0.3, 1]` (ease-out-expo family). Durations 500 to 700ms.
- Interactive: springs, `{ type: "spring", stiffness: 260, damping: 24 }`.
- Hover: 200 to 300ms with the same curve. `active:scale-[0.98]`.
- Section reveals: opacity 0 to 1 plus `y: 12`. No blur, no x-translation.
- Every animated component wraps `useReducedMotion()` and degrades to static.
- Animate only `transform` and `opacity`.
- No `window.addEventListener('scroll')`. `useScroll`, `useInView`, or IntersectionObserver only.

### 4.7 Z-index scale

Add to `src/lib/constants.ts` and use nothing else:

```
Z_NAV = 40
Z_POPOVER = 50
Z_MODAL = 60
Z_OVERLAY = 70   /* lightbox, grain if used */
```

---

## 5. Section by section

### 5.1 Navigation

- **Shape:** floating pill, `fixed top-4 left-1/2 -translate-x-1/2`, `rounded-full`, `backdrop-blur-xl` (allowed on fixed elements), `bg-background/70`, hairline ring. 56 to 64px tall. Single line at `lg`.
- **Contents:** T monogram (left), six section links (centre, sentence case), theme toggle plus one CTA (right).
- **CTA:** one only. "Get in touch". Removes "Hire Me" and the nav "Download My CV". CV download lives in the contact section.
- **Scroll-spy:** replace the scroll listener with one `IntersectionObserver` observing the six sections, `rootMargin: "-40% 0px -55% 0px"`. Remove the `setTimeout` double-check hack.
- **Easing:** fix line 66 of `navbar-03` to `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Mobile:** hamburger morphs to an X (two bars rotate 45 / -45), menu is a full-screen `backdrop-blur-3xl` overlay, links stagger in 60ms apart.
- **Active state:** `text-primary` plus a 2px underline that scales from the left. Already close; keep.

### 5.2 Hero

- `h-screen` becomes `min-h-[100dvh]`.
- **Remove:** `HexagonBackground`, `TypingText`, `FlipWords`. Three unmotivated perpetual animations and a decorative grid. Delete the components afterward; nothing else uses them.
- **Stack (max 4 elements, no eyebrow):**
  1. h1, two lines max. Not the name (the name is in the nav and footer). A statement of what he builds. Draft, needs his facts: _"Full-stack developer building web products and ERP systems that people actually use."_
  2. Subtext, one sentence, under 20 words. Draft: _"Currently at SpaceSoft. Previously Fusion Infotech. Next.js, Spring Boot, Django, and Frappe."_
  3. Primary "Get in touch" (mailto) with the button-in-button arrow. Secondary "View projects" (scrolls to `#projects`), ghost style.
- **Layout:** grid `lg:grid-cols-[1.2fr_1fr]`, text left-aligned, portrait right. Collapses to single column, portrait first, on mobile.
- **Portrait:** double-bezel frame per 4.5, `aspect-[4/5]`, `priority`. Needs a clean re-export (section 11). Rename the file to `portrait.jpg`.
- **Motion:** one staggered entrance. Headline at 0ms, subtext at 80ms, CTAs at 160ms, portrait at 120ms with `scale: 0.98 -> 1`. 600ms, expo curve. Reduced motion: instant.
- **No** scroll cue, no background wash, no grid, no parallax.

### 5.3 Expertise

- **Replace three marquees with a static grouped grid.** The section is informational; motion is unmotivated here, and three marquees is a hard fail regardless.
- **Structure:** heading, then three labelled rows (Languages / Frameworks / Data and infrastructure). Each row is a `flex flex-wrap gap-x-8 gap-y-4` of logo-plus-name items. Labels in the meta style, sentence case.
- **Logos:** replace the 19 PNGs with monochrome SVG marks rendered via `currentColor` at `text-muted-foreground`, `hover:text-foreground`. Source from Simple Icons (`simple-icons` npm) or devicon; both skills name these as the correct source for tech logos. This removes the retina-blur problem, the mixed-style problem, and 19 image requests. ERPNext and Frappe may not be on Simple Icons; those two keep a cleaned SVG or PNG.
- **Remove:** `InfiniteSlider`, `ProgressiveBlur`, and the gradient-fade edge divs. Delete the components if nothing else imports them.
- **Heading:** "Stack" or "Tools I work with". Not "My Expertise".
- **Alternative:** if you want motion here, one slow marquee of all 19 marks with the row labels above it. Static is the recommendation.

### 5.4 About

- **Fix the 34px mobile overflow.** Diagnose in build. Most likely candidate is the grid child without `min-w-0`. Verify with the detector at 390px after the fix.
- **Drop `overflow-hidden`** on the section. Not needed once nothing is positioned outside it.
- **Second portrait:** replace. Two headshots of the same person is redundant. Options: a candid working photo (not a headshot), or this is the one slot where a 3D object could live (section 10). Either way it is an asset you supply.
- **Copy:** three filler paragraphs become one real paragraph plus a compact facts list. This is a copy change and needs approval. Draft structure:
  - One paragraph, 40 to 60 words, in first person, concrete: what he builds, what he has shipped, what he is learning. He supplies the facts.
  - Facts list, meta style, no bullets: Based in [city]. Currently Software Developer at SpaceSoft. Focus: [two things].
- **Career entry:** replace the "My Career" gradient popover button with an inline two-item timeline directly under the facts. Each item: company, role, dates, arrow, linking to `/career?company=`. Two jobs do not need a dropdown, and this makes the career pages discoverable instead of hidden.
- **Layout:** stays image-left / text-right. This is the second consecutive split after the hero, which is the cap; Projects is a grid so the run breaks there.

### 5.5 Projects

- **Layout:** 2+1 asymmetric bento. Featured project spans `lg:col-span-2` at `aspect-[16/10]`; the other two stack in `lg:col-span-1`. Exactly three cells for three items. On mobile, single column.
- **Remove the carousel branch.** `showCarousel = projects.length > 3` is dead code. Delete the `Carousel` import here. If a fourth project arrives, the grid becomes 2+2.
- **Tiles:** these are the artifact, so a container is justified. Double-bezel per 4.5. Whole tile is the link. Inside: image, then name as h3, then one-line description (trim the current descriptions to 20 to 25 words), then a small "GitHub" text link with an arrow. Remove the full-width "View" button.
- **Remove** `group-hover:scale-105` on images. Hover state is `ring-foreground/[0.12]` on the shell plus the arrow translating.
- **Images:** re-capture all three screenshots at the same aspect ratio (16:10) so `object-cover` works and the letterboxing disappears. Asset task.
- **GitHub popover:** two accounts is a real reason for a popover. Keep the popover, replace the gradient button with the standard secondary style: pill, hairline, "GitHub" with a chevron.
- **Heading:** "Selected work". Not "Recent Projects".

### 5.6 Testimonials

- **Replace the carousel and the cards** with a two-column grid (`md:grid-cols-2 gap-x-12 gap-y-16`), no borders, no shadows, no fixed heights, no read-more.
- **Each quote:** body size, `text-pretty`, real typographic quotation marks, then attribution: squircle avatar (`rounded-xl`, 40px), name in `font-medium`, role and company in meta style on one line separated by a hairline dot (one per line is the ration).
- **Length:** the skills say 3 lines. These are real people's words, so trimming is a content decision. Two options, your call (section 11): trim to a 3-line excerpt with an ellipsis, or keep full length. Two columns at `max-w-[42ch]` per quote makes full length read fine.
- **Remove** the `Carousel`, `Card`, expand state, gradient fade, and the 280px fixed height.
- **Heading:** "From colleagues". Not "What People Think About Me".
- **Data:** fix or confirm Ashfak's company before shipping.

### 5.7 Contact (CTA)

- **Remove** both gradient layers and the 3% overlay. Ground is `--surface-1` as a full-width tint band, or plain `--background` with `py-32`. Elegant is less.
- **Layout:** centred is correct here; the message is the design. Keep.
- **Copy:** heading "Ready to work together?" (sentence case). Body cut to one line, under 20 words. Draft: _"Open to full-time roles and interesting projects. The fastest way to reach me is email."_
- **CTAs:** "Get in touch" primary with the nested arrow; "Download CV" secondary. Same labels as the nav for the same intents.
- **Contrast finding** resolves once the section is not opacity-gated (6.1).

### 5.8 Footer

- **Keep the illumination.** Port from `useState` to `useMotionValue` for x and y and `useMotionTemplate` for the mask. The section keeps `overflow-hidden`; that clip is the point.
- **Reduced motion:** illuminated layer renders at a static `opacity-[0.08]` with no mask.
- **Nav links:** make them real `<a href="#section">` elements instead of `<button>`s. CSS `scroll-behavior: smooth` already handles the scroll. Better semantics, keyboard, and crawlability.
- **Socials:** keep the four. Phosphor equivalents when icons migrate.
- **No** link farm, no legal links (no cookies, no forms, no account; nothing to disclose), no version string.

### 5.9 Career page

- **Container** to `max-w-6xl`, prose to `max-w-[65ch]`. Fixes the 155-char line length.
- **Remove** `group-hover:scale-105` on the three images.
- **Break the zigzag.** Item 2 of `lifeAtCompany` becomes full-width: image at `aspect-[21/9]` with the paragraph below it. Items 1 and 3 keep their splits. Two splits with a full-width break between them is under the cap.
- **Headings:** sentence case. "Technologies used", "About my role", "Life at SpaceSoft", "Key achievements".
- **Technologies:** pill tags stay; they match the shape rule.
- **Achievements:** seven items in a `md:grid-cols-2` with `gap-x-8 gap-y-3` and no bullet glyph, instead of a single bulleted column.
- **Lightbox:** keep. Add reduced-motion (no scale on open). Move `z-50`/`z-60` to the scale in 4.7.
- **Back link:** keep. It is the required "way back".
- **Empty state:** "Company not found" stays as the empty state for a bad slug.

---

## 6. Cross-cutting fixes

### 6.1 Content gating and reduced motion

The detector found 40% of text at `opacity: 0` because every section opens with `initial={{ opacity: 0 }}` and reveals on `whileInView`. Motion sets those styles in JS, so a no-JS visitor sees everything; the real problems are the volume of gated content and the absence of a reduced-motion path.

- Wrap every animated component with `useReducedMotion()`. When true, `initial={false}` so nothing is ever hidden.
- Reveal on `viewport={{ once: true, amount: 0.2 }}`, not `margin: '-100px'`.
- Section-level fades come off. Reveal the heading and the first content block of each section; let the rest render.
- Nothing inside a carousel, popover, or collapsed state animates on view.

### 6.2 Structural

- `h-screen` to `min-h-[100dvh]` (hero).
- `window.addEventListener('scroll')` to `IntersectionObserver` (navbar).
- Footer pointer tracking to motion values.
- `<main>` wrapper around the sections in `page.tsx` and `career/page.tsx`.
- Skip-to-content link as the first child of `<body>`, visible on focus.
- `text-balance` on all headings, `text-pretty` on all paragraphs.

### 6.3 Missing pages and assets

- `src/app/not-found.tsx`: branded 404 with a link home. Does not exist.
- `public/og-image.png` at 1200x630. Referenced in `layout.tsx` and `career/layout.tsx`, does not exist, so every social share has a broken preview.
- Favicon: check it is the T monogram and not the Next.js default.

### 6.4 Cleanup

- Remove `drizzle-orm`, `drizzle-kit` (zero imports).
- Remove `gsap` once `TypingText` is deleted (its only consumer).
- Remove `SettingsProvider`, `settingsContext.tsx`, `useSettings.ts`. `ThemeToggle` uses `next-themes` directly.
- Delete `HexagonBackground`, `TypingText`, `FlipWords`, `InfiniteSlider`, `ProgressiveBlur` after their consumers are gone.
- Delete unreferenced public files: `Project1-3.png`, `About Me.png`, `Group 11 1.png`, `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`, and `C#.png` after the SVG migration.
- Rename `Beige Simple Circle Shaped LinkedIn Profile Picture (1).png` and `(2).png` to `portrait.jpg` and whatever replaces the second image.
- Remove `README.md` boilerplate and describe the actual project.

### 6.5 Icons

Migrate `lucide-react` to `@phosphor-icons/react` with `weight="regular"` set once. Every skill prefers it; one says Lucide is acceptable only because the project already has it. Phase 4, not blocking. About 15 icons in use.

---

## 7. Sequencing

Ordered by the fix-priority the skills share: highest visual lift per unit of risk first, and correctness before taste.

**Phase 0: correctness (half a day).** Nothing visible changes yet.

- 6.1 reduced-motion wrapper and initial-state audit
- 6.2 structural: `min-h-[100dvh]`, IntersectionObserver scroll-spy, motion values in footer, `<main>`, skip link
- 5.4 mobile overflow bug
- 5.9 container width and line length
- 2.1 navbar easing
- Verify: detector at 390 / 768 / 1440 on both routes shows only findings this plan intends to fix later.

**Phase 1: tokens (half a day).** The biggest visual change, in two files.

- 4.1 palette in `globals.css`
- 4.2 Geist in `layout.tsx`, remove Parkinsans (after approval)
- 4.3 to 4.7 radius, spacing, shadow, motion, z-index constants
- Verify: both themes, contrast on every text-on-ground pair.

**Phase 2: component system (one day).**

- Button variants: primary pill with nested arrow, secondary hairline pill, ghost text link. Replace the two slop buttons.
- `Section` wrapper with the padding and container rules.
- `Bezel` frame component.
- `SectionHeading` with no eyebrow, sentence case, `text-balance`.
- Verify: every section uses the wrapper and heading; no ad-hoc padding.

**Phase 3: recomposition (two days).**

- 5.2 Hero
- 5.3 Expertise grid and SVG marks
- 5.5 Projects bento
- 5.6 Testimonials grid
- 5.4 About timeline and copy
- 5.7 Contact cleanup
- 5.1 Floating nav
- 5.9 Career zigzag break
- Verify: detector clean at three viewports; taste-skill layout checks (four families, no third zigzag, one marquee or none, three cells for three projects).

**Phase 4: polish (one day).**

- 6.5 Phosphor migration
- 5.8 Footer refinement
- 6.3 404, og-image
- 6.4 cleanup
- Verify: no unused imports or assets, `pnpm build` clean.

**Phase 5: verification (half a day).**

- Section 12 in full.

Roughly five to six working days. Phases 0 and 1 are worth doing even if nothing else ships.

---

## 8. Files touched

| File                                                                   | Phases  |
| ---------------------------------------------------------------------- | ------- |
| `src/app/globals.css`                                                  | 1       |
| `src/app/layout.tsx`                                                   | 1, 4    |
| `src/app/page.tsx`                                                     | 0, 3    |
| `src/app/not-found.tsx` (new)                                          | 4       |
| `src/app/career/page.tsx`                                              | 0, 3, 4 |
| `src/lib/constants.ts`                                                 | 1       |
| `src/components/Navbar.tsx`                                            | 0, 3    |
| `src/components/Hero.tsx`                                              | 0, 3    |
| `src/components/Expertise.tsx`                                         | 3       |
| `src/components/About.tsx`                                             | 0, 3    |
| `src/components/Projects.tsx`                                          | 3       |
| `src/components/Testimonials.tsx`                                      | 3       |
| `src/components/CTA.tsx`                                               | 3       |
| `src/components/Footer.tsx`                                            | 0, 4    |
| `src/components/ThemeToggle.tsx`                                       | 4       |
| `src/components/ui/button.tsx`                                         | 2       |
| `src/components/ui/shadcn-io/navbar-03/index.tsx`                      | 0, 3    |
| `src/components/section.tsx`, `bezel.tsx`, `section-heading.tsx` (new) | 2       |
| `src/data/projects.ts`, `testimonials.ts` (new, extracted)             | 3       |
| `package.json`                                                         | 1, 4    |
| `public/`                                                              | 3, 4    |

Deleted: `contexts/settingsContext.tsx`, `hooks/useSettings.ts`, `ui/shadcn-io/hexagon-background`, `ui/shadcn-io/typing-text`, `ui/shadcn-io/flip-words`, `motion-primitives/infinite-slider`, `motion-primitives/progressive-blur`, `ui/carousel.tsx` if no consumer remains.

---

## 9. Where the skills disagreed

Nine conflicts. Each was decided, not averaged.

| Topic           | Positions                                                                                                                                                                                                | Decision                                                                                      | Why                                                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Eyebrow labels  | `high-end` wants a pill badge above every h2. `design-taste` allows max one per three sections.                                                                                                          | **Zero eyebrows.**                                                                            | `design-taste` calls this the most-violated rule in production tests. Seven sections would allow two; using none is cleaner.           |
| Serif display   | `redesign` suggests serif heading plus sans body for creative work. `design-taste` discourages serif by default and bans Fraunces. `impeccable` lists Fraunces, Playfair, Cormorant and others as spent. | **Sans only.**                                                                                | A developer portfolio for recruiters is not editorial or luxury. The serif direction was also already rejected.                        |
| Body font       | `design-taste` and `high-end` offer Geist, Outfit, Cabinet Grotesk, Satoshi, Plus Jakarta. `impeccable` lists Outfit, Plus Jakarta, IBM Plex, DM Sans, Space Grotesk as defaults to avoid.               | **Geist.**                                                                                    | The only face all four bless or leave alone. On Google Fonts, so no self-hosting.                                                      |
| Cards           | `high-end` wants double-bezel containers on every card. `design-taste` wants cards only where elevation means hierarchy.                                                                                 | **Bezels on project tiles and the hero portrait only.**                                       | Projects are the artifact in Experience mode. Testimonials, About, and Contact go cardless.                                            |
| Navigation      | `high-end` bans edge-to-edge sticky bars and wants a floating pill. `design-taste` only caps height and requires one line.                                                                               | **Floating pill, 56 to 64px.**                                                                | Fits "elegant". Satisfies both.                                                                                                        |
| Section padding | `high-end` says `py-24` to `py-40`. `design-taste` at density 3 to 4 says `py-16` to `py-24`.                                                                                                            | **`py-24 md:py-32`.**                                                                         | Density dial is 3.                                                                                                                     |
| Reveal motion   | `high-end` wants 800ms blur-fade-up on everything entering. `design-taste` wants every animation motivated. `impeccable` flagged 40% hidden text.                                                        | **One hero choreography; light opacity-plus-12px reveals on section headings only; no blur.** | Motivated, reduced-motion safe, and the detector finding goes away.                                                                    |
| Colour strategy | `impeccable` warns Restrained is the guessable pick for this category and licenses bolder strategies for Experience surfaces. Brief says "elegant".                                                      | **Restrained.**                                                                               | A brief-pinned direction beats the roll. Distinctiveness is carried by execution and the accent choice. Stated as a risk in section 3. |
| Icons           | `high-end` bans Lucide. `design-taste` allows it when already installed. `redesign` prefers Phosphor.                                                                                                    | **Migrate to Phosphor in Phase 4.**                                                           | Not blocking; every skill prefers it.                                                                                                  |

One non-conflict worth naming: `design-taste`, `redesign`, and `impeccable` all independently flag the three-equal-cards project layout, the three marquees, the `h-screen` hero, the scroll listener, and the missing reduced-motion path. When three sources with different authors converge, that is signal.

---

## 10. On a 3D asset (img2threejs)

**Recommendation: no, by default.** Three reasons.

1. The skills require every motion element to answer "what does this communicate?" in one sentence. For a developer portfolio aiming at elegant, a rotating procedural object communicates "I found a 3D tool," which is about the tool, not the person.
2. The hero already has the correct real visual: a face. Replacing or crowding it is a downgrade.
3. Three.js is large. It contradicts the restraint the rest of this plan depends on, and it would be the single heaviest thing on the page.

**The one placement that could work, if you want it:** the About section, replacing the second portrait (5.4), which needs replacing regardless. Conditions:

- The object is something you actually own and that says something about you. A specific mechanical keyboard, a chess piece, a camera, an instrument. Not a laptop, not a rocket, not an abstract blob.
- Rendered monochrome in the foreground colour with a single soft light, so it belongs to the palette rather than sitting on top of it.
- Slow idle rotation, `prefers-reduced-motion` collapses it to a static render.
- Lazy-loaded; it is below the fold, so it costs nothing on first paint.
- You supply a reference photo. img2threejs rebuilds from that.

If that object exists and you like the idea, we do it together after Phase 3, as its own step. If not, a candid working photo in that slot does the same job with zero bundle cost, and that is the default.

---

## 11. Decisions needed before Phase 1

The plan proceeds on the assumptions in section 1 unless you say otherwise. These are the ones I cannot make for you.

1. **Font.** Approve retiring Parkinsans for Geist (4.2), or keep Parkinsans for h1/h2 only.
2. **Accent.** Teal as proposed, or one of the two alternates in 4.1.
3. **Copy.** Approve rewriting the hero headline, hero subtext, About paragraph, and Contact line. I draft; you supply the facts I do not have (city, what you want to be known for, what you are learning).
4. **Testimonials.** Trim to 3-line excerpts, or keep full length.
5. **Assets you supply:** a clean portrait re-export (square or 4:5, no template ring); a replacement for the second portrait (candid photo, or a reference photo for a 3D object); three project screenshots at the same aspect ratio; an og-image, or approval for me to compose one from the T monogram and the name.
6. **Nav.** Floating pill as proposed, or a cleaned-up full-width bar.
7. **Data.** Ashfak's company: Singularity Corporation or SpaceSoft.
8. **Two GitHub accounts.** Keep the popover, or pick one as canonical for the site.

Impeccable's own gate for a build is a `PRODUCT.md` interview (`/impeccable init`). Questions 3 and 5 cover most of what it asks. If you want the full interview, run it before Phase 1; it writes the file and nothing else.

---

## 12. Done criteria

Not done until every line passes.

**Mechanical**

- `impeccable detect` at 390x844, 768x1024, 1440x900 on `/` and `/career?company=spacesoft` and `/career?company=fusion-infotech`: zero primary findings.
- `pnpm build` clean. `pnpm lint` clean.
- Lighthouse on `/`: LCP under 2.5s, CLS under 0.1, accessibility 100.

**Both modes, both motion settings**

- Light and dark viewed side by side on every section.
- `prefers-reduced-motion: reduce` viewed on every section; nothing hidden, nothing moving.
- Keyboard: tab through the whole page; every focusable element has a visible ring; skip link works.

**Taste-skill pre-flight (the subset that applies)**

- Zero em-dashes in visible text.
- One theme per page; no section inverts.
- One accent, used identically everywhere.
- One radius rule, applied everywhere.
- Every CTA readable against its ground; no CTA label wraps at desktop; one label per intent.
- Hero: h1 two lines max, subtext under 20 words, CTAs visible without scroll, max four text elements, no eyebrow, no scroll cue.
- Eyebrow count across all components: 0.
- No third consecutive image-plus-text split anywhere.
- At least four layout families across the seven home sections.
- Marquee count: 0 or 1.
- Three project cells for three projects.
- Quotes: within the length you chose in 11.4, attribution is name plus role plus company.
- Every animation answers "what does this communicate?"; reduced motion honoured everywhere.
- No `h-screen`, no scroll listener, no pointer values in React state.
- No hand-drawn decorative SVG, no gradient text, no glow, no pure black or white.
- Copy re-read end to end: no filler verbs, no AI phrasing, sentence case headings.

**Impeccable finish**

- Run the `impeccable:impeccable-finish-reviewer` agent against the direction contract in section 3. Fix what it returns in one batch, confirm once, stop.
- Run `impeccable document` to write `DESIGN.md` from the built result, not from this plan.
