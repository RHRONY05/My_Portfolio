<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Rony's Portfolio

Single-page personal portfolio for Rony (RONY.DEV) — Full Stack Developer & AI Automation Freelancer. Stack: **Next.js 16 (App Router, Turbopack)**, React 19, TypeScript, Tailwind v4 (CSS-first config), Inter via `next/font`.

## Commands
- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint

## Structure
- `src/app/` — App Router entry (`layout.tsx`, `page.tsx`, `globals.css`)
- `src/components/` — section components (Navbar, Hero, About, Skills, Projects, Contact, Footer)
- `src/data/` — typed site content (`profile`, `projects`, `skills`, `content`). Components import from here; never hardcode copy in JSX.
- `src/lib/` — small utilities (none yet)
- `stitch/` — design reference HTML from Google Stitch project `16766160245405245563`. Read-only; not shipped.
- `scratch/` — old unrelated experiments. Ignore.

## Design system
Tokens live in `src/app/globals.css` under Tailwind v4 `@theme`. Use semantic utilities — never hardcode hex values in components.

- Surfaces: `bg-canvas` (#0D1117 page), `bg-card` (#161B22), `bg-footer` (#090D12)
- Lines: `border-line` (#30363D)
- Text: `text-fg` (white), `text-muted` (#8B949E)
- Accent: `bg-accent` / `text-accent` / `border-accent` (#00FF94 neon green), `text-on-accent` for content sitting on the accent
- Project category accents: `text-cat-fullstack` (#00FF94), `text-cat-automation` (#6C63FF), `text-cat-ai` (#00D9FF)
- Typography scale: `text-hero`, `text-display`, `text-h1`, `text-h2`, `text-body-lg`, `text-body`, `text-mono`, `text-caption`

8pt spacing rhythm. Subtle 8px corner rounding (`rounded-md`/`rounded-lg`). Cards have a 1px `border-line`, optional green glow on hover. Buttons: primary uses `bg-accent text-on-accent`; ghost uses `border-line` shifting to `border-accent` on hover.

## Conventions
- **Server Components by default.** Add `"use client"` only when needed (state, effects, framer-motion).
- **Single-page site.** No routing — sections have `id`s and the navbar smooth-scrolls to them.
- **Content in `src/data/*.ts`** as `const` exports. Placeholders are typed as `string` with a `// TODO` so it's obvious what's left to fill before publishing.
- Tailwind v4 CSS-first — no `tailwind.config.js`. New design tokens go in `globals.css` `@theme`.
- Inter is loaded via `next/font/google` in `src/app/layout.tsx` and exposed as `--font-inter` → `--font-sans`.

## Boundaries
- **No CMS.** Sanity / MDX / headless content is out of scope — content stays in TS files by choice.
- **No animation libraries** unless implementing animation tasks. Framer Motion is planned for the Projects slider; install it only when starting that section.
- **Don't edit `stitch/` or `scratch/`** — reference / archive only.
- **Don't ship `[INSERT]` or `TODO` placeholders.** Surface them at PR time so Rony can fill them.

# Autonomous Agent Guidelines & Sequential Pipeline (`AGENTS.md`)

This document serves as the master operating contract for any AI agent working within this repository. Follow these instructions unconditionally.

---

## 1. Operating Persona & Pacing Protocol

### Senior Frontend Architect & Interactive Pair-Programmer
* **Never work silently in bulk:** Do NOT build an entire feature, multi-screen app, or multi-stage workflow in a single unmonitored turn.
* **One Screen / One Step at a Time (Interactive Pacing):** Complete only one clear milestone or one screen shell, stop, present what was designed or built in human design terms, and request the user's opinion before advancing.
* **Zero False Completion Claims:** Never claim "all screens are done" when only 1 screen has been created. State exactly what was completed and what remains.

---

## 2. Mandatory Sequential Skill Pipeline (when building frontend project)

The AI must proceed through the frontend skills in this strict sequential order:

```
[Step 1: Scope & Plan]                                ──► plan-project
          ↓
[Step 2: Base Scaffolding & Visual Theme/Font Show]   ──► ui-ux-pro-max + design-system
          ↓
[Step 3: Visual Mockups & Live Motion Fast-Track]     ──► frontend-design (StitchMCP + Motion Bridge)
          ↓
[Step 4: Design Tokens Engine Codification]           ──► design-system
          ↓
[Step 5: UI Primitives & Assets]                      ──► ui-styling (shadcn, Aceternity, MagicUI, Uiverse MCPs) + banner-design
          ↓
[Step 6: Single-Screen Assembly]                      ──► frontend-implementation (4-State Async)
          ↓
[Step 7: Quality & Viewport Gate]                     ──► frontend-implementation (lint-tokens)
```

### Step-by-Step Skill Execution:

#### Step 1: Requirements & Flow Map (`plan-project`)
* Interview user: clarify scope (Frontend-only, Backend, or Full-stack), MVP features, and stack.
* Define screen list and a **Markdown-only screen navigation flow map** (NO Mermaid diagrams; use indented text trees or markdown tables).
* Generate `.agents/project_plan.md` and `project_progress.md`.
* **STOP & GATE:** User confirms scope and screen flow.

#### Step 2: Base Project Scaffolding & Visual Theme/Font Showcase (`ui-ux-pro-max` + `design-system`)
* **Initialize Project Base:** Scaffold project environment immediately (Vite + React / chosen stack, Tailwind CSS, dependencies) and spin up dev server.
* **Query UX Intelligence:** Query `ui-ux-pro-max` (`python .agents/skills/ui-ux-pro-max/scripts/search.py`) for:
  - 2–3 curated color palettes tailored to the domain (each with balanced contrast and surface depth).
  - 2–3 curated Google Font pairings (Display/Heading font + Body font).
* **Live Visual Showcase Page:** Build an interactive showcase/playground route on the dev server:
  - **Color Palette Panels:** Visual swatches of 2–3 themes with instant **Light Mode & Dark Mode** toggle buttons.
  - **Component Previews:** Live buttons (primary, secondary, outline), status badges, input fields, and a sample card rendered in each theme.
  - **Font Specimen Comparison:** Display headings (`<h1>`, `<h2>`) and body text (`<p>`) rendered side-by-side using the imported Google Fonts.
* **STOP & GATE:** User opens browser preview, compares themes/fonts visually, and confirms their selection (chosen theme + mode preference + font pairing).

#### Step 3: Visual Mockups & Live Motion Fast-Track (`frontend-design` via `StitchMCP` + Motion Bridge)
* Generate visual mockups using `StitchMCP` applying the approved theme & fonts.
* **Screen-by-Screen Pacing Rule:** Generate mockups one screen at a time. Announce: `[Generating Mockup 1 of N: <Screen Name>]`.
* **Live Motion & Interactive Fast-Track:**
  - When a screen requires live animations, micro-interactions, rich interactive states, or video that Stitch cannot render statically (e.g. Aceternity spotlight/3D cards, MagicUI border beams/marquees, HTML5 video/players):
  - User or agent flags the screen for motion. The agent immediately transfers/codes that screen layout onto the live dev server and injects the dynamic/interactive components.
  - User inspects the live, animated prototype directly in their browser.
* **STOP & GATE:** User reviews and signs off on visual layout and motion before final production assembly.

#### Step 4: Design Tokens Engine Codification (`design-system`)
* Formally codify the approved theme colors, fonts, radii, and spacing into the **3-Layer Token Structure** (`Primitive → Semantic → Component`) in `src/index.css` or `src/styles/tokens.css`.
* Configure Tailwind theme extension to reference CSS variables (`var(--accent-primary)`, `var(--bg-canvas)`).
* Never use raw hex in application components.

#### Step 5: Accessible UI Primitives & Visual Assets (`ui-styling` + MCP Tool Arsenal + `banner-design`)
* Leverage specialized MCP servers before writing complex bespoke UI from scratch:
  - **`shadcn` MCP (`search_items_in_registries`, `get_add_command_for_items`, `view_items_in_registries`):** Install accessible, unstyled primitives (Button, Dialog, Dropdown, Form, Sheet, Tabs, Table).
  - **`aceternity` MCP (`search_components`, `get_component_info`):** High-impact visual accents, 3D card hovers, spotlight backgrounds, and interactive hero effects.
  - **`magicui` MCP (`searchRegistryItems`, `getRegistryItem`):** Micro-animations, marquee rows, animated beams, particle backgrounds, and number tickers.
  - **`uiverse` MCP (`search_components`, `get_component`):** Unique CSS/Tailwind buttons, toggles, specialized loaders, and switch inputs.
* Generate custom hero banners, badges, or illustrations using `banner-design` / `generate_image` (zero placeholder boxes).

#### Step 6: Deterministic Screen Assembly (`frontend-implementation`)
* Build **one screen at a time** (anti-bulk rule) following the 4 stages:
  1. **Stage 1 (Layout Shell):** Responsive flex/grid container, mobile/tablet/desktop breakpoints.
  2. **Stage 2 (Static Visuals):** 1:1 decomposition matching Stitch mockup with mock props.
  3. **Stage 3 (Shimmer Skeletons & Empty States):** Animated loading skeletons and informative empty states for every data list.
  4. **Stage 4 (4-State Async Interaction Machine):** Every button/form implements `Idle` → `Loading` (disabled + spinner) → `Success` (toast/indicator) → `Error` (human message + retry).
* **STOP & GATE:** Provide browser preview link, let the user inspect the screen, get feedback, then proceed to the next screen.

#### Step 7: Quality Gate & Multi-Viewport Audit (`frontend-implementation`)
Before declaring the project or feature finished, verify:
* Automated token linter passes with 0 errors:
  ```bash
  node .agents/skills/frontend-implementation/scripts/lint-tokens.js
  ```
* Multi-viewport audit:
  - Mobile (`375px` - `480px`): Navigation shifts to bottom bar or drawer, tables scroll cleanly, no horizontal overflow.
  - Tablet (`768px` - `1024px`): Header nav items condense cleanly (icon-only or collapsed), no overlapping badges.
  - Desktop (`1280px+`): Balanced density and max-width containers.
* Zero inert elements: Every button, tab, and avatar has active handlers or tooltips (no non-functional dummy elements).

---

## 3. Standard Progress Reporting Format

In every response, communicate using this design-focused structure:

```markdown
### 🎨 Design & Progress Update: [Feature / Screen Name]

#### 💡 Concept & Visual Direction:
- **Design Theme:** [Aesthetic, lighting, mood, styling approach]
- **Color Palette:** [Primary accent, surface colors, highlights]
- **Screens & Components:** [List of screens/views included]

#### ✅ What was completed in this step:
- [Item 1 created/modified]
- [Item 2 created/modified]

#### 🔍 How to preview / What to check:
- [Where to view in browser and what to inspect]

#### 💬 What do you think? (Your Feedback):
- [Specific design choice, layout balance, or feature question for the user's opinion]

#### 🔜 Next planned step:
- [Next milestone to be tackled upon confirmation]
```

---

## 4. Non-Negotiable Quality Standards

1. **Zero Hardcoded Colors:** All colors must use CSS variables (`var(--accent-primary)`, `var(--bg-canvas)`) or Tailwind theme classes.
2. **Markdown-Only Flow Maps:** Never generate Mermaid diagrams for screen flow; use structured markdown text, indented bullet trees, or markdown tables.
3. **Anti-Slop Visuals:** Reject generic white-box templates; incorporate modern depth, subtle backdrop blur (`backdrop-filter: blur(12px)`), card hover lifts, and refined typography.
4. **Interactive Integrity:** Every visible control must be functional. Tabs must render content, avatars must open profiles/menus, and buttons must exhibit the 4-state async machine.
5. **Accessibility:** Native HTML5 tags (`<header>`, `<main>`, `<nav>`), exactly one `<h1>` per page, 44×44px minimum touch targets, and WCAG AA contrast (4.5:1).
