# Project Context & Architecture Reference (`context.md`)

> **Executive Knowledge Base**: Comprehensive architectural breakdown, section mechanics, design tokens, personal identity, and asset standards for Muhammad Rony's (RH.RONY) 3D Portfolio.
> AI agents should read this file whenever working on specific sections, modifying profile data, or navigating the codebase.

---

## 1. Identity & Official Branding

* **Full Legal Name**: Muhammad Rony
* **Display / Brand Name**: RH.RONY (`RONY.DEV`)
* **Academic Affiliation**: Chittagong University of Engineering and Technology (CUET), Dept. of Computer Science & Engineering (CSE)
* **Official Professional Title**: **`Software Developer — Web & AI`**
* **Primary Bio**: CSE undergraduate focused on building production-ready web applications and autonomous systems. Experienced in full-stack architecture, agentic workflows, and LLM integrations, with an expanding focus on AI/ML engineering.
* **Domain**: `https://rhrony05.me`
* **Social Profiles**:
  - GitHub: `https://github.com/RHRONY05`
  - LinkedIn: `https://www.linkedin.com/in/md-robiul-hasan-rony-b788a4270/`
  - Twitter / X: `https://x.com/rhrony_05`
  - Facebook: `https://facebook.com/rh.rony.05`

---

## 2. Core Architecture & Tech Stack

* **Framework**: **Next.js 16.2+ (App Router, Turbopack)**
* **Runtime & UI**: **React 19**, **TypeScript 5.x**
* **Styling**: **Tailwind CSS v4** (CSS-first config via `@import "tailwindcss";` and `@theme` in `src/app/globals.css`)
* **3D WebGL Engine**: **Three.js** + **React Three Fiber (`@react-three/fiber`)** + **Drei (`@react-three/drei`)**
* **Animation Library**: **Framer Motion** (`framer-motion`)
* **Iconography**: **Lucide React** (`lucide-react`)
* **Image Processing**: **Sharp** (high-performance node-based image resize and compression)

---

## 3. The 5 Core Sections Breakdown

### Section 01: Hero — "Urban Graffiti Mural & Street Curb Runner"
* **Main Canvas**: `src/components/hero/HeroCinemaCanvas.tsx`
* **Background Asset**: Full-screen street graffiti mural (`/images/Hero/My_graphetti.webp`) with dynamic theme wash and responsive focal alignment.
* **Content**: Headline *"Software Engineer in the Making — Full-Stack & AI"* with CUET CSE narrative and call-to-actions.
* **Easter Egg Game**: `src/components/hero/StreetCurbRunner.tsx` — 2D canvas runner game, dynamically imported and restricted to desktop/tablet (`hidden sm:block`) to eliminate mobile CPU overhead. Clean screenshot mode supported via `?clean=true` or `#clean`.

### Section 02: About — "The 3D Comic Book Dossier"
* **Main Canvas**: `src/components/about/Book3DCanvas.tsx` (wrapped in `LazyViewportMount.tsx`)
* **Mesh & Physics**: `BookMesh.tsx` with procedural paper ridges, glowing bevels, camera zoom rig, and realistic 3D page-flip kinematics.
* **Story Arc**: 5-spread graphic novel chronicle (Current Mission, Field Experience, Academic Roots at CUET, Engineering Philosophy, Back Cover CTA).
* **Narrative Panel**: Synchronized editorial panel updating dynamically as 3D pages turn.

### Section 03: Tech Stack — "Mahoraga Load Balancer & Horizontal Halo"
* **Main Canvas**: `src/components/skills/SkillsLoadBalancer.tsx`
* **Centerpiece**: `MahoragaWheelCanvas.tsx` — 3D eight-spoked Mahoraga Adaptation Wheel floating as a horizontal halo above Rony meditating, orchestrating 6 AI tools with procedural Web Audio ratchet sound.
* **Circuits**: Symmetrical 3-way circuit forks feeding 6 skill realms (Frontend, Backend, AI & Agents, Database, DevOps, Tools).
* **WebGL Deduplication**: Viewport check (`isDesktop`) ensures exactly one WebGL context mounts between desktop and mobile layouts.

### Section 04: Projects — "Interactive Project Deck & Browser Viewports"
* **Main Container**: `src/components/projects/ProjectDeck.tsx`
* **Display Format**: Circular card deck carousel with keyboard navigation (`←` / `→`) and touch swipe gestures.
* **Card Shelf**: Resting bottom shelf housing metadata, category badges, stack pills, and direct action buttons (`[ 👁 VIEW DETAILS ]` and `[ ↗ LIVE DEMO ]`).
* **Case Study Viewport**: `ProjectModal.tsx` — Scrollable browser mockup viewport with macOS-style window chrome, sticky exploration badge, and full feature breakdowns.
* **Data Source**: `src/data/projects.ts` (8 production projects).

### Section 05: Contact & Terminal
* **Components**: `src/components/Contact.tsx` & `Footer.tsx`
* **Features**: Direct communication channels, email clipboard utility, social links, and live terminal interaction.

---

## 4. Design System Tokens & Dynamic Switchers

### 4 Curated Dynamic Themes (`src/data/themeConfig.ts` & `src/app/globals.css`):
1. **Monolithic Onyx & Graphite (DEFAULT)**: `#000000` canvas | `#111111` card | `#E5E5E5` accent
2. **Celadon & Hunter Forest**: `#111D13` canvas | `#192B1C` card | `#A1CCA5` accent
3. **Midnight Amethyst & Deep Violet**: `#11001C` canvas | `#1E0030` card | `#C084FC` accent
4. **Prussian Blue & Space Indigo**: `#0B132B` canvas | `#131C38` card | `#5BC0BE` accent

### 4 Curated Dynamic Fonts (`src/data/themeConfig.ts`):
1. **Original Surfer (DEFAULT)**: `'Original Surfer', cursive, sans-serif` (Retro Rebel display)
2. **Lusitana**: `'Lusitana', serif` (Noble Heritage)
3. **Ruwudu**: `'Ruwudu', serif` (Calligraphic Drama)
4. **Inter**: `'Inter', sans-serif` (Precision Standard)
* **Code / Telemetry**: `JetBrains Mono` (`font-mono`)

---

## 5. Performance & Asset Standards

1. **Viewport-Gated 3D Mount (`LazyViewportMount.tsx`)**:
   - Heavy Three.js canvases (`Book3DCanvas`, `MahoragaWheelCanvas`) must use render functions: `{() => <Canvas />}`. This prevents Next.js dynamic chunk loaders and textures from executing during initial page hydration.
2. **WebGL Context Deduplication**:
   - Never mount two concurrent `<Canvas>` elements in JSX. Deduplicate with `isDesktop` viewport states.
3. **Typography Optimization**:
   - Heading font `Original Surfer` is preloaded via `<link rel="preload" as="font">` in `layout.tsx`.
   - `--font-sans` maps to Next.js local `Inter` font for instant body text paint with zero layout shift.
   - Text shadows in the hero use native GPU `[text-shadow]` instead of software filter `drop-shadow`.
4. **Social OpenGraph Standard**:
   - File: `public/images/og-preview.png` (1200 x 630 px, ~550 KB lossless PNG, centered portrait, no text).
   - Description: Capped at 136 characters in `layout.tsx` to prevent truncation across Google, WhatsApp, and X.

---

## 6. Project Directory Map

```
Portfolio/
├── .agents/
│   ├── context.md               # Detailed architectural knowledge base & profile dossier
│   ├── project_progress.md      # Comprehensive progress log and phase retrospectives
│   └── skills/session-start/    # Rapid update & maintenance launcher
├── public/
│   ├── images/
│   │   ├── Hero/                # Mural & street graphics
│   │   ├── about/               # 3D comic book textures & cover art
│   │   ├── skills/              # Meditating illustration & tool SVGs
│   │   ├── projects/            # Full-length project screenshots
│   │   └── og-preview.png       # Standard 1200x630 social preview card (550KB)
│   ├── llms.txt                 # AI search crawler dossier (GPTBot, Claude, Perplexity)
│   └── robots.txt / sitemap.xml # SEO crawlers
├── src/
│   ├── app/
│   │   ├── layout.tsx           # SEO metadata, preloaded fonts, JSON-LD schema
│   │   ├── globals.css          # Tailwind v4 theme tokens & CSS variables
│   │   └── page.tsx             # Root assembly of the 5 sections
│   ├── components/
│   │   ├── Navbar.tsx           # Responsive navigation & theme switchers
│   │   ├── hero/                # HeroCinemaCanvas & StreetCurbRunner
│   │   ├── about/               # Book3DCanvas, BookMesh, & Editorial Narrative
│   │   ├── skills/              # SkillsLoadBalancer & MahoragaWheelCanvas
│   │   ├── projects/            # ProjectDeck & ProjectModal
│   │   └── common/              # LazyViewportMount.tsx (CWV performance wrapper)
│   └── data/
│       ├── profile.ts           # Bio, legal names, social links, and contact
│       ├── themeConfig.ts       # 4 themes & 4 fonts configuration
│       ├── projects.ts          # 8 featured production projects
│       └── skillsData.ts        # 6 skill realms & technology matrix
└── next.config.ts               # Compression, image deviceSizes, and Turbopack config
```

---

## 7. Verified CLI Commands

* **Dev Server**: `npm run dev` (`http://localhost:3000`)
* **TypeScript Typecheck**: `npx tsc --noEmit`
* **Production Static Export Build**: `npm run build`
* **Local Production Server**: `npm run start`
