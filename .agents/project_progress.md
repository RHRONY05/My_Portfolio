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

### 3. Immediate Next Steps for Next Session (Start Directly with Code):
- [ ] **Step 1**: Create `src/components/hero/HeroCinemaCanvas.tsx` with Framer Motion spring physics (`useMotionValue`, `useSpring`, `useTransform`) for 2.5D multi-plane mouse parallax.
- [ ] **Step 2**: Add CSS keyframe wind-sway animation to `layer1-canopy.png`.
- [ ] **Step 3**: Build `src/components/hero/CampfireFX.tsx` (HTML5 Canvas particle emitter for rising glowing embers + radial amber light flicker).
- [ ] **Step 4**: Mount `src/components/hero/ProjectorScreenHUD.tsx` onto the projector screen frame with live React HTML/typography, status badge, and CTA buttons (`VIEW PROJECTS →`, `GET IN TOUCH ↗`).

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
- [ ] Establish design tokens (colors, typography, spacing, surface tiers) in `src/app/globals.css`.
- [ ] Set up blueprint grid utilities and editorial typography scale (`Inter` + `JetBrains Mono`).

### Phase 2: 3D Comic Book Dossier (About Section)
- [ ] Prototype 3D Book rigging and page-flip physics with React Three Fiber / Drei.
- [ ] Connect synced editorial narrative drawer on right.

### Phase 3: Mahoraga Adaptation Wheel & Tech Stack
- [ ] 3D Mahoraga wheel with ratchet sound effect and rotating AI icons.
- [ ] 4 floating glass realm biospheres.

### Phase 4: Quality Gate & Multi-Viewport Verification
- [ ] Tablet and desktop verified at 60 FPS.
- [ ] Final production build check (`npm run build`).
