# Project Progress: Rony's 3D Portfolio Rebuild

> **Current Project Status**: 🟢 **Section 01: Hero COMPLETE & LOCKED (Zero Hardcoded Colors, Full Viewport Responsiveness) -> Ready for Section 04: Featured Projects**  
> Active Tracking Branch: `v2-3d-rebuild`  
> Master Plan: [`.agents/project_plan.md`](file:///d:/Projects/Portfolio/.agents/project_plan.md)  
> Learning Roadmap: [`.agents/learning_roadmap.md`](file:///d:/Projects/Portfolio/.agents/learning_roadmap.md)

---

## 🎬 Section 01: Hero — "Urban Graffiti Mural & Street Curb Runner" [COMPLETE & LOCKED]

### 1. Visual & Layout Architecture:
- **Navbar**: Fully responsive, frosted 45% glass (`bg-canvas/45 backdrop-blur-md`), unboxed links (15-16px font), "Hire Me" button with arrow & amber glow, brand **`RH.ROny.`**.
- **Background**: Full-screen street graffiti mural ([`public/images/Hero/My_graphetti.png`](file:///d:/Projects/Portfolio/public/images/Hero/My_graphetti.png)) with uniform 70% Obsidian canvas wash (`#0D1117`).
- **Responsive Focal Framing**:
  - Desktop: `md:object-[right_top]` (no top clipping on ultrawide/big screens, face visible on right).
  - Tablet: `sm:object-[65%_top] md:object-[65%_top]` with text container `md:max-w-lg` (face on right, text on left, zero overlap).
  - Mobile: `object-[74%_top]` (portrait framed on right, open dark wall on left for text).
- **Typography Stage**: Approved Option A headline ("Software Engineer in the Making — Full-Stack & AI") and polished mission copy highlighting CUET CSE, full-stack architecture, agentic workflows, and expanding AI/ML engineering focus.
- **Layout Decision**: Clean and distraction-free.

### 2. Hero Interactive Easter Egg (Street Curb Runner — POLISHED & FINAL):
- [x] **Idea 1: Street Curb Runner / Skater (Fully Polished & Integrated)**:
  - 100% transparent canvas (`bg-transparent`) with elevated headroom to eliminate any clipping.
  - Positioned to the right of "Let's Connect" button (`37%` screen width) with forward surge momentum on ollie.
  - Game State Machine with `IDLE` (ambient cruise), `RUNNING`, `PAUSED`, and `GAME_OVER` states.
  - Clean tactile controls: `[ ▶ PLAY ]` / `[ ⏸ PAUSE ]` and `[ ↺ REBOOT ]` button.
  - 5-Segment System Integrity Health Bar (100% HP) with exact hit thresholds:
    - `null` (Heavy canister, slow `0.85x` speed): -20% HP (takes 5 hits to crash).
    - `!BUG` (Cyber drone, fast `1.45x` speed): -33.4% HP (takes 3 hits to crash).
    - `404` (Heavy concrete roadblock, `1.15x` speed): -50% HP (takes 2 hits to crash).
  - **Standardized Solid Heavy Obstacles**: All 3 obstacles standardized to identical `44px x 26px` dimensions with solid opaque `#12171F` background, heavy contact shadows, and bold solid color borders.
  - **Dynamic 500m Speed Acceleration**: Base velocity scales up by +18% on every 500m milestone covered (`1 + Math.floor(dist / 500) * 0.18`), intensifying the challenge continuously.
  - Dismissible `SYSTEM CRASHED` notification with top-right `[ X ]` cross button + `localStorage` high score persistence.
  - Fixed Navbar brand logo (`RH.ROny.`) to reliably scroll straight to top of hero on click.
  - **Full Mobile & Tablet Responsiveness**:
    - Adaptive Runway Pocketing: Desktop `width * 0.37` (right of "Let's Connect"), Tablet `width * 0.30`, Mobile `width * 0.22` (min 56px, max 85px) guaranteeing 280px+ forward reaction runway.
    - Zero-Latency Touch Control: `onTouchStart` on entire roadway + `touch-manipulation` for instantaneous mobile taps.
    - Anti-Clipping Jump Kinematics: Tuned `jumpForce = -7.2` & `gravity = 0.40` in `h-32 sm:h-36` canvas with ~30px headroom over 26px obstacles.
    - Responsive Padding & Clearances: `px-3 sm:px-8 md:px-10 lg:px-12` roadway padding + `pb-44 sm:pb-36 lg:py-12` hero content buffer preventing CTA overlap on small phones.
    - Responsive Telemetry Shelf: Compact status badges, auto-hidden labels on mobile (`hidden md:inline` for INTEGRITY, `hidden sm:inline` for BEST), and conditional borders.
    - Centered Responsive Crash Modal: Contained within `w-[90%] max-w-xs` with clean touch dismiss.
- Idea 2 dropped per user decision (Hero Easter Egg finalized with Idea 1).



---

## 🗺️ Overall Project Milestone Checklist

- [x] **Project Scope & Architecture Alignment**: Clarified track, audience, and overall design direction.
- [x] **Hero Interactive Component Assembly**: `HeroCinemaCanvas.tsx` + `StreetCurbRunner.tsx` 100% complete, fully responsive, zero hardcoded colors, locked.
- [x] **About Section Concept Locked**: 3D Comic Book Dossier (Panel/Press inspired, 5-spread flow, synced editorial narrative).
- [x] **Tech Stack Section Concept Locked**: Mahoraga Adaptation Wheel & Yggdrasil Realm Orbs.
- [ ] **Projects Section Concept**: Define showcase & case study interaction.
- [ ] **Contact Section & Terminal**: Finalize booking & inquiry flow.
- [ ] **Complete Plan Approval**: Final sign-off on `.agents/project_plan.md`.

### Phase 1: Visual Theme & Design System Codification [COMPLETE & LOCKED]
- [x] **Strictly 4 Curated Themes & 4 Curated Fonts** (`src/data/themeConfig.ts`):
  - Theme 01 (DEFAULT): **Monolithic Onyx & Graphite Grayscale** (`#000000` canvas, `#111111` card, `#E5E5E5` accent).
  - Theme 02: **Celadon & Hunter Forest** (`#111D13` canvas, `#192B1C` card, `#A1CCA5` accent).
  - Theme 03: **Midnight Amethyst & Deep Violet** (`#11001C` canvas, `#1E0030` card, `#C084FC` accent).
  - Theme 04: **Prussian Blue & Space Indigo** (`#0B132B` canvas, `#131C38` card, `#5BC0BE` accent).
- [x] **Strictly 4 Curated Fonts** (Option 1 Global Inheritance):
  - Font 01 (DEFAULT): **Original Surfer** (`'Original Surfer', cursive, sans-serif` - Retro Rebel).
  - Font 02: **Lusitana** (`'Lusitana', serif` - Noble Heritage).
  - Font 03: **Ruwudu** (`'Ruwudu', serif` - Calligraphic Drama).
  - Font 04: **Inter** (`'Inter', sans-serif` - Precision Standard).
- [x] **Navbar Theme & Font Customizer Dropdown** (`src/components/ThemeFontCustomizer.tsx`):
  - Sleek tactical trigger button on Navbar displaying real-time active color indicator dot and sliders icon.
  - Interactive popover with dual tabs (Colors vs Fonts) showing live 3-color swatches, active checkmarks, and fonts rendered in their authentic font-family.
  - Real-time reactive updates via custom DOM events and persistent `localStorage`.
- [x] **Zero Hardcoded Colors & Glows**:
  - Replaced all legacy gold glows and hardcoded fallbacks across `Hero.tsx`, `HeroCinemaCanvas.tsx`, `HeroArtifactsRack.tsx`, `StreetCurbRunner.tsx`, `BrandLogo.tsx`, and `ProjectDeck.tsx` with dynamic CSS variables.
  - Purged all discarded colors and fonts from `/theme-showcase` and the stylesheet.

### Phase 2: 3D Comic Book Dossier (About Section)
- [x] Front cover (`book_cover.png`) and Back cover (`back_cover.png`) finalized at 1:1 scale (1024x1536) in Obsidian & Champagne Ivory.
- [x] 3D Book rigging with `@react-three/fiber` and `@react-three/drei`: 20% enlarged scale (`2.35` x `3.53`), anti-clipping open centering (`+0.92`), viewport framing (`z: 5.85`).
- [x] **Chapter 01 Spread Integrated**:
  - Left page: Quote & Epigraph (`page_01_left.png`, color-matched `#08090B` solid background, Cormorant Garamond serif).
  - Right page: Workstation cloud architecting illustration + authentic student story (`page_01_right.png`).
- [x] **Chapter 02 Spread Integrated**:
  - Left page: The CUET Paradox quote (`page_02_left.png`, color-matched `#08080A` solid background).
  - Right page: CUET Main Gate illustration + hall life story (`page_02_right.png`).
- [x] **Chapter 03 Spread Integrated**:
  - Left page: SCPSC Days quote (`page_03_left.png`, color-matched `#08090D` solid background).
  - Right page: Savar Cantonment Public School & College illustration + story (`page_03_right.png`).
- [x] **Chapter 04 Spread Integrated**:
  - Left page: The First Spark quote (`page_04_left.png`, color-matched `#08090D` solid background).
  - Right page: School & Voyager artwork + story (`page_04_right.png`).
- [x] **Direct-Click 3D Multi-Leaf Page-Turning System**:
  - Concentric spine hinge system with 3 turning leaves (`leaf1Ref`, `leaf2Ref`, `leaf3Ref`) sharing pivot `[-width/2, 0, pagesBlockThickness/2]`.
  - Realistic fanned page stacking angles (-142.2°, -136.8°, -131.4°, -126.0°) with zero clipping and zero Z-fighting.
  - Clicking right page turns forward (Chapter 1 → 2 → 3 → 4); clicking left page turns backward (Chapter 4 → 3 → 2 → 1).
  - Keyboard ArrowLeft / ArrowRight support and bottom chapter controls fully synchronized across all 4 chapters.
  - Hover pointer feedback (`cursor: pointer`) on active clickable pages.
  - Right-hand editorial narrative panel in `About.tsx` dynamically synchronized in real-time with chapter state.
- [x] **Clean Executive Summary & Spec Sheet on Right Panel**:
  - Replaced redundant wall-of-text narrative with a clean, high-signal developer summary.
  - Headline: **Robiul Hasan Rony** • *Aspiring Software Engineer & AI Automation Builder*.
  - Scannable bulleted spec sheet: Core Focus, Automations, Currently Into (AI engineering & DevOps), Academic Roots (CUET CSE).
  - Dual action CTAs: `[ VIEW RESUME / CV ↗ ]` and `[ LET'S TALK ↵ ]`.
  - Balanced side-by-side with the 3D Comic Book Dossier on the left.
- [x] **Organic Liquid Amoeba Backlight & Theme-Reactive Aura (`Book3DCanvas.tsx`)**:
  - 3-lobe asymmetrical undulating amoeba matching reference (`fluid-blob-1` & `fluid-blob-2` keyframes).
  - Tuned to user-approved 60% opacity (`0.60`) using `var(--color-accent-rgb)` for instant reactivity across all 4 themes.
  - Soft 22px Gaussian feathering with 38px ambient outer falloff.
  - Connected to live `rony_theme_change` custom window events.
- [x] **Option 2B Luxury Metallic Hairline Frame & Default 3/4 Showcase Pose (`BookMesh.tsx`)**:
  - High-precision 3D perimeter bevels (top, bottom, left, right) on both front and back cover slabs shaded in Champagne Ivory (`#F1DCC2`) matching the book's typography.
  - Flush spine realignment eliminating any black border gap on the left edge.
  - Set default closed resting angle to the iconic 3/4 showcase pose (`rotY: -0.68`, `rotX: -0.02`), prominently revealing the realistic page block thickness and paper edge ridges to instantly communicate that it is an interactive 3D book volume.
  - Complete click-through propagation (`onToggleOpen`) across the entire frame.
- [x] **Full-Device Mobile & Tablet Responsiveness**:
  - Calibrated horizontal margins and padding (`px-4 sm:px-6 md:px-8`).
  - Mobile/tablet text container capped at `max-w-2xl mx-auto` to prevent over-extended line lengths when stacked.
  - Adaptive thumb-friendly action buttons (full-width stacked on mobile, inline on desktop).
  - Clean vertical breathing room (`gap-10 sm:gap-12 lg:gap-14`) between the 3D book stage and the text summary.

### Phase 3: Mahoraga Adaptation Circuit & Load Balancer (Section 03: Tech Stack) - [COMPLETE]
- [x] **2.5D Architecture & Layout Blueprint**: Symmetrical 1:1 load-balancer layout with pinned central character, continuous 50% horizontal bus line, and left/right 3-way fork connectors.
- [x] **Tech Stack Data Schema (`skillsData.ts`)**: 6 core engineering realms (Frontend, Backend, Database, Autonomous AI, DevOps, Tooling) with authentic, human copy, standard engineering patterns, and dedicated brand vector icons.
- [x] **3D Mahoraga Halo Wheel (`MahoragaWheelCanvas.tsx`)**:
  - Golden Dharmachakra halo with 6 orbiting AI tool discs (Claude, Gemini, ChatGPT, Antigravity, Cursor, Ollama).
  - Pure white vector emblem for Ollama (`fill="#FFFFFF"`).
  - Calibrated vertical elevation (`mb-2 sm:mb-3`) floating cleanly above Rony's hair.
  - Direct 1:1 turntable physics: click-and-hold to pause, bidirectional spin (left = reverse, right = forward), 3D pitch tilt (drag up/down), and smooth inertial coasting with spring-back restitution.
- [x] **Web Audio Ratchet Synthesizer**: Procedural audio feedback clicking on every 60-degree sector crossed in both directions.
- [x] **Teleported Modal Architecture (`SkillRealmCard.tsx`)**:
  - Mounted via `createPortal` to `document.body` at `z-[9999]` with backdrop blur, scroll locking, and `Escape` key listeners (100% immune to canvas or text ribbon clipping).
  - 36+ authentic brand SVG vectors rendered beside tool names.
- [x] **Mobile Single-Bus Load Balancer (`SkillsLoadBalancer.tsx`)**:
  - Preserves the authentic load balancer architecture on mobile with a single continuous horizontal line and symmetrical 3-way forks.
  - Sized at `h-[235px]` with full cards displaying number prefix, category title, domain icon, and 1-line tech preview.

### Phase 4: Quality Gate & Multi-Viewport Verification
- [ ] Tablet and desktop verified at 60 FPS.
- [ ] Final production build check (`npm run build`).
