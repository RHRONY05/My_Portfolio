# Project Progress: Rony's 3D Portfolio Rebuild

> **Current Project Status**: 🟢 **Hero Section Asset Pipeline COMPLETE -> Ready for Code Implementation**  
> Active Tracking Branch: `v2-3d-rebuild`  
> Master Plan: [`.agents/project_plan.md`](file:///d:/Projects/Portfolio/.agents/project_plan.md)  
> Learning Roadmap: [`.agents/learning_roadmap.md`](file:///d:/Projects/Portfolio/.agents/learning_roadmap.md)

---

## 🎬 Section 01: Hero — "The Open-Air Cinema" (Current Focus)

### 1. Finalized 4-Layer Asset Stack (100% Locked in `public/images/`):
All assets are verified, high-resolution (1080p), and tested. **DO NOT re-generate or re-cut these images:**

| Layer | File Path | Resolution | Visual Content & Animation Role |
| :--- | :--- | :--- | :--- |
| **Layer 0** | [`public/images/layer0-sky.jpg`](file:///d:/Projects/Portfolio/public/images/layer0-sky.jpg) | 1920 × 1080 | Deep starry night sky, crescent moon, milky way, and rolling mountain silhouettes. Slowest parallax speed (0.02). |
| **Layer 1-Canopy** | [`public/images/layer1-canopy.png`](file:///d:/Projects/Portfolio/public/images/layer1-canopy.png) | 1920 × 1080 | Transparent PNG. Isolated hanging palm fronds at the top. Animated with subtle CSS keyframe wind-sway (`transform-origin: top center`). |
| **Layer 1-Campsite** | [`public/images/layer1-campsite.png`](file:///d:/Projects/Portfolio/public/images/layer1-campsite.png) | 1920 × 1080 | Transparent PNG. Sandy ground, outdoor cinema projector screen on black tripods, beach bungalow with glowing amber lanterns, and campfire pit with warm wood logs. |
| **Layer 2-Character** | [`public/images/layer2-character.png`](file:///d:/Projects/Portfolio/public/images/layer2-character.png) | 447 × 447 | Transparent PNG. Rony seated on sturdy 4-legged folding black metal camping stool in **RH.RONY #5** dark teal & crimson jersey. Rear three-quarter view, light neat stubble, both feet firmly planted on sand. Fastest parallax speed (0.14). |
| **Master Reference** | [`public/images/final-scene-composite.jpg`](file:///d:/Projects/Portfolio/public/images/final-scene-composite.jpg) | 1920 × 1080 | Reference composite showing all 4 layers perfectly aligned with character at approved Option B distance. |

### 2. Key Architecture Decisions Confirmed:
1. **Multi-Screen Strategy**: Tablet (iPad) through 4K Desktop share the **same unified 16:9 Aspect-Ratio Safe Stage** (`object-fit: cover`, `object-position: center bottom`, `scale: 1.06` overscan buffer to prevent edge-clipping during mouse tilt, GPU hardware acceleration with `translate3d`). Mobile UI design is deferred until Tablet/Desktop is live.
2. **Campfire "Hybrid Core" Technique**: The base wood logs and warm glowing core live in `layer1-campsite.png`. Live code (`CampfireFX.tsx`) will render active dancing upper flame tips, rising spark particles floating into the starry sky, and pulsating radial amber light.
3. **Character Seating Distance**: Character sits at **Option B (Relaxed Natural Distance)** with open sandy breathing room between the stool and fire pit (`x: 1410, y: 565` in 1080p frame).

### 3. Hero Implementation Milestones:
- [x] **Living Video Hero**: Activated full-bleed 1080p animated video (`Flames_ignite_and_flicker_1080p_20260921024320.mp4`) with dancing campfire flames, glowing porch lantern, and animated night atmosphere.
- [x] **Transparent Navbar**: Updated `Navbar.tsx` to be 100% transparent over the hero, automatically transitioning to `bg-canvas/80 backdrop-blur-md border-b border-line` when scrolling down past 40px.
- [ ] **Projector Screen Live HUD**: Mount `ProjectorScreenHUD.tsx` positioned precisely over the outdoor movie screen (live dispatch badge, "I Build Web Apps & AI Automations" headline, CTA buttons, and telemetry stats).
- [ ] **Production Polish**: Video pre-load state with smooth loading spinner / reveal transition once video is buffered and ready.



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

### Phase 3: Mahoraga Adaptation Wheel & Tech Stack
- [ ] 3D Mahoraga wheel with ratchet sound effect and rotating AI icons.
- [ ] 4 floating glass realm biospheres.

### Phase 4: Quality Gate & Multi-Viewport Verification
- [ ] Tablet and desktop verified at 60 FPS.
- [ ] Final production build check (`npm run build`).
