# Project Progress: Rony's 3D Portfolio Rebuild

> **Current Project Status**: 🟢 **Hero Section Asset Pipeline COMPLETE -> Ready for Code Implementation**  
> Active Tracking Branch: `v2-3d-rebuild`  
> Master Plan: [`.agents/project_plan.md`](file:///d:/Projects/Portfolio/.agents/project_plan.md)  
> Learning Roadmap: [`.agents/learning_roadmap.md`](file:///d:/Projects/Portfolio/.agents/learning_roadmap.md)

---

## 🎬 Section 01: Hero — "Urban Graffiti Mural & Developer Stage" (Current Focus)

### 1. Visual & Layout Architecture:
- **Navbar**: Fully responsive, frosted 45% glass (`bg-canvas/45 backdrop-blur-md`), unboxed links (15-16px font), "Hire Me" button with arrow & amber glow, brand **`RH.ROny.`**.
- **Background**: Full-screen street graffiti mural ([`public/images/Hero/My_graphetti.png`](file:///d:/Projects/Portfolio/public/images/Hero/My_graphetti.png)) with uniform 70% Obsidian canvas wash (`#0D1117`).
- **Responsive Focal Framing**:
  - Desktop: `md:object-[right_top]` (no top clipping on ultrawide/big screens, face visible on right).
  - Tablet: `sm:object-[65%_top] md:object-[65%_top]` with text container `md:max-w-lg` (face on right, text on left, zero overlap).
  - Mobile: `object-[74%_top]` (portrait framed on right, open dark wall on left for text).
- **Typography Stage**: Approved Option A headline ("Software Engineer in the Making — Full-Stack & AI") and polished mission copy highlighting CUET CSE, full-stack architecture, agentic workflows, and expanding AI/ML engineering focus.
- **Layout Decision**: Clean and distraction-free.

### 2. Next Session Scope (Interactive Easter Egg / Gamification):
- [ ] **Idea 1: Street Curb Runner / Skater**:
  - Lightweight 2D canvas runner along the street curb.
  - Skater/runner silhouette jumping over `404` errors / bugs.
  - Non-hijacking controls (click/tap, optional key toggle), 60 FPS, <10KB footprint.
- [ ] **Idea 2: Interactive Graffiti Spray Can Tagging**:
  - Particle spray canvas reacting to mouse drag / touch.
  - Golden amber embers/sparks lighting up the concrete texture with soft decay.
  - Performance-optimized (requestAnimationFrame, offscreen canvas, auto-sleep when idle).
- [ ] Compare both in browser and choose the best fit or keep clean.



---

## 🗺️ Overall Project Milestone Checklist

- [x] **Project Scope & Architecture Alignment**: Clarified track, audience, and overall design direction.
- [x] **Hero Section Concept Locked**: The Open-Air Cinema with 2.5D multi-plane parallax centerpiece.
- [x] **Hero 2.5D Layer Asset Stack Finalized**: Layer 0, Layer 1-Canopy, Layer 1-Campsite, Layer 2-Character 100% approved and locked.
- [ ] **Hero Interactive Component Assembly**: `HeroCinemaCanvas.tsx` + `CampfireFX.tsx` + `ProjectorScreenHUD.tsx`.
- [x] **About Section Concept Locked**: 3D Comic Book Dossier (Panel/Press inspired, 5-spread flow, synced editorial narrative).
- [x] **Tech Stack Section Concept Locked**: Mahoraga Adaptation Wheel & Yggdrasil Realm Orbs.
- [ ] **Projects Section Concept**: Define showcase & case study interaction.
- [ ] **Contact Section & Terminal**: Finalize booking & inquiry flow.
- [ ] **Complete Plan Approval**: Final sign-off on `.agents/project_plan.md`.

### Phase 1: Visual Theme & Design System Codification
- [x] Establish design tokens in `src/app/globals.css`: **Obsidian & Royal Sunburst Amber (`#0D1117` / `#E5B869`)**.
- [x] Synchronize 3D book studio lighting with warm sunburst amber rim lights (`#E5B869`).
- [x] Precision Engineering typography scale locked (`Inter` + `JetBrains Mono`).

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
