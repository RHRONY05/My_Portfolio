# Rony's 3D Portfolio Rebuild — Project Plan

> **Project Track**: UI-Centric 3D Interactive Portfolio (Next.js 16 + React 19 + Tailwind v4 + Three.js / React Three Fiber)  
> **Target Audience**: High-ticket freelance clients, startup founders, and engineering teams seeking Full-Stack Web Development & Autonomous AI Automations.  
> **Status**: In Planning Phase (Active Section-by-Section Mapping)

---

## 1. System Specification & Core Vision

A high-performance, single-page 3D developer portfolio that replaces traditional static sections with tactile, interactive 3D artifacts inspired by high-end archival editorial designs (e.g., [Panel / Press](https://panelpress.online/)).

### Approved Design System Tokens & Foundations
- **Color Theme**: **01. Obsidian & Phosphor Neon (Dark Mode)**
  - `bg-canvas`: `#0D1117` (Deep Terminal Ground)
  - `bg-card` / surfaces: `#161B22` (Obsidian Container)
  - `border-line`: `#30363D` (Hairline Blueprint Datum)
  - `text-fg`: `#F0F6FC` (High-Contrast White)
  - `text-muted`: `#8B949E` (Secondary Telemetry Pewter)
  - `accent` (Primary): `#00FF94` (Electric Phosphor Neon Green)
  - `text-on-accent`: `#00391D` (Deep Forest Green for contrast)
  - `secondary` (Secondary Accent): `#58A6FF` (Blueprint Cyan)
  - `accent-glow`: `rgba(0, 255, 148, 0.35)`
- **Typography Pairing**: **Precision Engineering**
  - **Headings & Display**: `Inter` (700/800 bold, tight letter-spacing)
  - **Body & Editorial Prose**: `Inter` (400/500, generous line-height)
  - **Telemetry, Code, Badges & Labels**: `JetBrains Mono` (500/700 uppercase, wide letter-spacing)

### Approved High-Performance Tech Stack
- **Core Framework**: **Next.js 16** (App Router, Turbopack)
- **UI Runtime & Language**: **React 19**, **TypeScript**
- **Styling**: **Tailwind CSS v4** (CSS-first config in `globals.css`)
- **Smooth Momentum Scrolling**: **Lenis** (`lenis/react`, ~3KB smooth scrolling without breaking browser access)
- **Motion & Parallax Engine**: **Framer Motion** (`framer-motion`, GPU-accelerated transforms: `translate3d`, `opacity`, `scale`)
- **3D Engine**: **Three.js** + **React Three Fiber** (`@react-three/fiber`) + **Drei** (`@react-three/drei`)
- **Sound System**: Lightweight **Web Audio API** / `howler` (tiny asynchronous sound effects with global mute toggle in navbar)
- **Icons**: **Lucide React** (`lucide-react`)

### 4 Anti-Lag & 60-FPS Performance Rules
1. **Dynamic 3D Code-Splitting**: Three.js canvases are loaded dynamically via `next/dynamic(() => import(...), { ssr: false })` wrapped in React `Suspense`. Initial page paint occurs in < 0.5s with zero WebGL overhead.
2. **DPR Capping (`dpr={[1, 1.5]}`)**: Caps device pixel ratio on high-density mobile displays to prevent GPU thermal throttling.
3. **Offscreen WebGL Pause**: Intersection Observers automatically freeze the Three.js render loops whenever the 3D book or Mahoraga wheel are scrolled out of the viewport.
4. **Compressed WebP Textures**: All comic book textures, workstation illustration planes, and sprite assets are compressed WebP with lazy-loading.

---

## 2. Section Architecture & Feature Blueprints

### Section 01: Hero — "The Cockpit // Atmospheric Multi-Layer Parallax" [LOCKED]
Inspired by atmospheric narrative parallax web designs (e.g., Notosan), establishing mood, human identity, and technical authority without 3D fatigue.

#### Visual Architecture & Composition (Hybrid Split View)
- **Overall Canvas**: Deep dark terminal void (`#0D1117`), fine hairline registration grid (`#30363D`), and electric phosphor green accents (`#00FF94`).
- **Left Column (High-Readability Value Proposition)**:
  - Top Dispatch Badge: `● ACTIVE DISPATCH // AVAILABLE FOR SELECT TEAMS`
  - Headline: **"I Build Web Apps & AI Automations"** (with glowing emerald phosphor aura on *AI Automations*).
  - Narrative Sub-headline: *"Full Stack Developer specializing in Next.js, Node.js, and autonomous AI workflow pipelines for high-growth technical teams."*
  - Action Row:
    - Primary CTA: `VIEW PROJECTS →` (Solid emerald `#00FF94` with black bold typography)
    - Ghost CTA: `GET IN TOUCH ↗` (Hairline border with subtle hover wash)
    - Devlog Anchor: `READ DEVLOG (ISSUE NOTES) ↵`
  - Telemetry Stats Grid:
    - `99.9% // PROD UPTIME` • `NEXT.JS 16 // ARCHITECTURE` • `AI AGENTS // RUNTIMES` • `CUET // CSE ALUM`
  - Scroll Cue at Bottom-Left: `SCROLL TO EXPLORE ORIGIN DOSSIER ↓` with coordinate stamp `LAT: 22.4633° N, 91.9712° E`.

- **Right Column & Ambient Background (The Cockpit Parallax Window)**:
  - **The Scene**: A young software engineer (boy seen from behind wearing a sleek dark tech hoodie), seated at an ergonomic chair typing at an ultrawide triple curved monitor setup at midnight.
  - **Monitors & Lighting**: Screens illuminate the desk with emerald code syntax, neural network graphs, and live terminal telemetry (`STREAM: nextjs-agent-runtime.ts // 240 req/s`).
  - **Background Horizon**: A loft window behind the desk revealing a misty midnight metropolis with subtle blueprint grid lines and starfield.
  - **Interactive Multi-Plane Parallax**:
    - Layer 1 (Foreground silhouette): Moves subtly with mouse coordinates (`~5px`).
    - Layer 2 (Midground workstation & monitors): Moves at medium depth (`~15px`).
    - Layer 3 (Background window & city grid): Moves at deepest depth (`~25px`).
  - **Transition**: Smooth scroll transition dollies down into `#about` (Section 02: 3D Comic Book Dossier).

---

### Section 02: About Me — "The Developer Dossier / Comic Chronicle" [LOCKED]
Inspired by the tactile 3D book interaction on `panelpress.online`.

#### Visual & Interaction Blueprint
- **Split Screen Layout**:
  - **Left Viewport (3D Interactive Canvas)**:
    - Sits on a technical blueprint grid background (`FIG. 01 / ORIGIN DOSSIER`).
    - True 3D book model with realistic thickness, hard cover, paper page edges, dynamic lighting, and shadow casting.
    - **Controls**: Mouse/touch click-and-drag rotation (`⟷ DRAG TO ROTATE`), keyboard arrow keys (`←` / `→`), Previous/Next buttons, and `[📖 Open Cover / Flip Page]`.
    - Real-time 3D page flip animation with soft realistic page shadows.
  - **Right Viewport (Synchronized Editorial Narrative)**:
    - Synchronized with the active spread of the 3D book.
    - Features metadata chips (`CHAPTER 01 / 04`, Era/Year, Role/Status), dramatic headlines, detailed narrative prose, key metrics, and action links.

#### Asset & Art Direction
- **Art Style**: Comic Book / Graphic Novel illustration style (ink linework, Ben-Day/halftone dot shading, cinematic lighting).
- **Pipeline**: Original reference photos of Rony processed/generated with AI into cohesive comic panels for the cover and each interior page spread.

#### Book Structure & Page Spreads
1. **Front Cover**:
   - Comic title: *"RONY: ARCHITECT OF CODE & INTELLIGENCE"*, Issue #01, Vol. 1.
   - Stylized comic illustration of Rony, custom title typography, comic code seal & barcode.
   - Editorial Prompt: "Open Dossier to Explore Story".
2. **Spread 01: Current Frontier (Active Operations)**:
   - *Left Page*: Dramatic AI/automation comic artwork + Quote: *"Why repeat human labor when intelligent code can orchestrate the infinite?"*
   - *Right Page*: Current focus — Full-Stack Web Architecture, Autonomous AI Agents, Enterprise Workflow Automations.
   - *Right Editorial Panel*: Live availability status, current freelance contracts focus, tech disciplines.
3. **Spread 02: Field Experience & Battlegrounds**:
   - *Left Page*: Action panel (engineering resilient systems under load) + Quote: *"True engineering isn't just writing lines of code; it's solving real-world friction."*
   - *Right Page*: Professional freelance journey, mission-critical systems deployed, client impact.
   - *Right Editorial Panel*: Delivery track record, client results, production metrics.
4. **Spread 03: The Foundation & Origins**:
   - *Left Page*: Campus & late-night problem-solving comic panel + Quote: *"A solid foundation turns curiosity into relentless craft."*
   - *Right Page*: **CUET** (Chittagong University of Engineering and Technology) Engineering background, college and school foundations.
   - *Right Editorial Panel*: Core computer science foundations, algorithms, analytical problem-solving roots.
5. **Spread 04: Engineering Philosophy & Manifesto**:
   - *Left Page*: High-contrast minimalist panel + Quote: *"Speed, clean architecture, and relentless curiosity."*
   - *Right Page*: How Rony builds — maintainable code, test-driven reliability, zero-bloat mindset.
   - *Right Editorial Panel*: Guiding design & development principles.
6. **Back Cover**:
   - Vintage comic back cover with "To Be Continued...", tech sponsor/badge stickers, and a direct CTA ("Hire Rony for your next mission").

---

### Section 03: Tech Stack & Skill Matrix — "The Mahoraga Adaptation Wheel & Yggdrasil Realm Orbs" [LOCKED]
Inspired by the synergy between the *Jujutsu Kaisen* Mahoraga Dharmachakra Adaptation Wheel and the *Norse Mythology* Yggdrasil World Tree of Realms.

#### Core Metaphor & Theme
- **The Modern Reality**: Modern full-stack engineering is powered by autonomous AI agent orchestration (Claude, Gemini, ChatGPT, Cursor, DeepSeek). Rather than writing every boilerplate line by hand, Rony summons AI to adapt instantly to any tech stack or codebase challenge.
- **Tagline / Lore**: *"With this sacred treasure, I summon... Full-Stack AI Adaptation."* (Wheel spins with metallic ratchet sound: *"Adapted to Legacy Codebase / Complex Cloud Migration / Autonomous Agent Workflows"*).

#### 3D Visual Hierarchy & Structure
1. **The Apex — The 3D Mahoraga Adaptation Wheel (AI Layer)**:
   - High-fidelity 8-spoked Dharmachakra wheel floating above as a luminous halo.
   - Emblems at each spoke: **Claude 3.7**, **Gemini 2.5/Flash**, **ChatGPT / OpenAI**, **Cursor**, **DeepSeek**, **Antigravity / Coding Agents**.
   - Emits an electric neon green phosphor glow (`#00FF94`) and ambient particle arcs.
   - **Interactive Mechanic**: Hover/click or drag to spin the wheel with a mechanical ratchet click sound effect. Clicking a primary `[ ☸️ TRIGGER ADAPTATION ]` button spins the wheel and sends energy pulses cascading down into the trunk and branches.
2. **The Central Pillar — Cyber-Yggdrasil (Mahoraga Core)**:
   - A stylized biomechanical trunk / silhouette with muscular contours and glowing data circuit veins running down like cyber-bark.
   - Routes neural energy pathways from the top Adaptation Wheel outward to the branch nodes.
3. **The Branches — 4 Floating Planetary Realm Orbs (Yggdrasil Engineering Realms)**:
   Transparent 3D glass biospheres / crystal planetary orbs tethered to the branches:
   - **Realm 01: Midgard of Frontend**:
     - *Holographic visual interior*: Floating UI cards, React & Next.js geometric glyphs.
     - *Stack*: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Three.js / R3F.
   - **Realm 02: Asgard of Backend & Architecture**:
     - *Holographic visual interior*: Golden microservices mesh, server racks, API pathways.
     - *Stack*: Node.js, Express, Python, REST & GraphQL APIs, WebSockets, Fastify.
   - **Realm 03: Nidavellir of Database & Persistence**:
     - *Holographic visual interior*: Subterranean obsidian & cyan data cylinder prisms.
     - *Stack*: PostgreSQL, Redis, Supabase, MongoDB, Prisma ORM.
   - **Realm 04: Bifrost of DevOps & Cloud Infrastructure**:
     - *Holographic visual interior*: Shimmering energy aura containing floating Docker containers and CI/CD pipelines.
     - *Stack*: Docker, GitHub Actions CI/CD, Linux, AWS, Vercel.

#### Interactivity & Telemetry Detail
- **Orb Hover / Selection**: Hovering an orb causes it to glow, gently expand, and tilt towards the camera.
- **Deep-Dive Telemetry Drawer**: Clicking any Realm Orb opens an adjacent HUD card detailing:
  - Proficiency metrics & years of production usage.
  - Key architectural patterns (e.g., Server Actions, Docker multi-stage builds, Redis caching).
  - Quick clickable links to projects built with that specific realm.
- **Mobile Responsive Layout**: On mobile viewports, the Adaptation Wheel remains pinned at the top, while the Realm Orbs reflow into an interactive 3D horizontal swipe carousel.

---

### Section 04: Featured Projects & Case Studies (Pending Discussion)
- *Status*: Pending discussion.

---

### Section 05: Contact & Terminal (Pending Discussion)
- *Status*: Pending discussion.

---

## 3. Navigation & Screen Flow Map

```markdown
Landing Page (Single-Page Scroll / Snap Navigation)
├── #hero ──────► 3D Hero Centerpiece & High-Impact Value Proposition
├── #about ─────► 3D Interactive Comic Dossier (Left: 3D Book, Right: Dynamic Editorial Narrative)
│   ├── Page 0: Cover
│   ├── Page 1: Current Frontier (AI Automation & Full-Stack)
│   ├── Page 2: Field Experience & Client Impact
│   ├── Page 3: Academic Origin (CUET Foundations)
│   ├── Page 4: Engineering Philosophy
│   └── Page 5: Back Cover (CTA)
├── #techstack ─► Interactive 3D Skill Deck / Module Rack
├── #projects ──► Interactive Project Showcase & Live Demonstrations
└── #contact ───► Interactive Booking Terminal & Direct Inquiries
```
