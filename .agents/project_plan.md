# Rony's 3D Portfolio Rebuild — Project Plan

> **Project Track**: UI-Centric 3D Interactive Portfolio (Next.js 16 + React 19 + Tailwind v4 + Three.js / React Three Fiber)  
> **Target Audience**: High-ticket freelance clients, startup founders, and engineering teams seeking Full-Stack Web Development & Autonomous AI Automations.  
> **Status**: In Planning Phase (Active Section-by-Section Mapping)

---

## 1. System Specification & Core Vision

A high-performance, single-page 3D developer portfolio that replaces traditional static sections with tactile, interactive 3D artifacts inspired by high-end archival editorial designs (e.g., [Panel / Press](https://panelpress.online/)).

### Approved Design System Tokens & Foundations (Strict Zero-Hardcoding Policy)
- **4 Curated Dynamic Themes** (`src/data/themeConfig.ts`, `globals.css`):
  1. **Monolithic Onyx & Graphite Grayscale (DEFAULT)**: `#000000` canvas | `#111111` card | `#E5E5E5` accent
  2. **Celadon & Hunter Forest**: `#111D13` canvas | `#192B1C` card | `#A1CCA5` accent
  3. **Midnight Amethyst & Deep Violet**: `#11001C` canvas | `#1E0030` card | `#C084FC` accent
  4. **Prussian Blue & Space Indigo**: `#0B132B` canvas | `#131C38` card | `#5BC0BE` accent
- **Semantic Tailwind Tokens (MANDATORY across all components)**:
  - `bg-canvas`, `bg-card`, `border-line`, `border-accent`, `text-fg`, `text-muted`, `text-accent`, `text-secondary`, `text-on-accent`
  - Dynamic glows/opacities: `rgba(var(--color-accent-rgb), <alpha>)` or `rgba(var(--color-card-rgb), <alpha>)`
- **4 Curated Dynamic Fonts**:
  1. **Original Surfer (DEFAULT)**: `'Original Surfer', cursive, sans-serif`
  2. **Lusitana**: `'Lusitana', serif`
  3. **Ruwudu**: `'Ruwudu', serif`
  4. **Inter**: `'Inter', sans-serif`
  - **Mono / Telemetry / Code**: `JetBrains Mono` (`font-mono`)

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

### Section 01: Hero — "The Midnight Metropolis & Digital Billboard // Looped Cinemagraph & 3D-Tilted HUD" [LOCKED]
A cinematic, rock-solid opening that pairs a full-viewport nighttime metropolis cinemagraph with an industrial digital billboard hosting Rony's portrait and live 3D-tilted interactive DOM elements.

#### Modular 3-Layer Visual Architecture
- **Layer 0: Looped Background Cinemagraph (Full-Viewport Canvas)**:
  - Deep midnight starry sky with soft glowing clouds and luminous full moon.
  - Distant nighttime city skyline with illuminated skyscrapers.
  - **The Perched Sentinel**: A noble owl perched on a prominent skyscraper ledge / rooftop antenna overlooking the city, blinking and subtly turning its head in a seamless loop.
  - Distant highway along the horizon with subtle streaks of light from moving night traffic.
  - Rendered as a lightweight, hardware-accelerated 2–3s looped video (or cinemagraph) covering the viewport (`object-fit: cover`).
- **Layer 1: The Digital Billboard & Character (High-Resolution Isolated Layer)**:
  - Industrial highway billboard structure with heavy steel trusses, support columns, and overhead warm amber spotlights (`#E5B869`).
  - **Left Side**: Rony's portrait in a crisp black collared shirt with crossed arms, confident expression, and warm amber rim lighting matching the floodlights.
  - **Right Side**: Clean, dark obsidian screen (`#0D1117`) with subtle circuit traces, engineered with open breathing space to host live code.
- **Layer 2: Live 3D-Tilted HTML/React HUD (Interactive DOM)**:
  - Positioned over the right half of the billboard with CSS 3D perspective (`perspective: 1200px; transform: rotateY(-8deg)`) or R3F `<Html transform>`, perfectly matching the billboard's plane.
  - **Live Dispatch Badge**: `● ACTIVE DISPATCH // AVAILABLE FOR SELECT CONTRACTS`
  - **Headline**: **"I Build Scalable Web Apps & AI Automations"** (with warm amber gold `#E5B869` highlight).
  - **Narrative Sub-headline**: *"Full Stack Developer specializing in Next.js, Node.js, and autonomous AI workflow pipelines for high-growth technical teams."*
  - **Action Row**:
    - Primary CTA: `VIEW PROJECTS →` (Solid amber `#E5B869` with bold dark text `#241800`)
    - Ghost CTA: `GET IN TOUCH ↗` (Bordered button with hover wash)
  - **Telemetry Grid**:
    - `NEXT.JS 16` • `NODE.JS` • `n8n AI AGENTS` • `CUET CSE`
- **Transition**: Smooth momentum scroll flowing into `#about` (Section 02: 3D Comic Book Dossier).

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

### Section 03: Tech Stack & Skill Matrix — "The Mahoraga Adaptation Circuit & Load-Balancer" [LOCKED]
Inspired by the load-balancer network topology, the *Jujutsu Kaisen* Mahoraga Dharmachakra Adaptation Wheel, and Rony's personal developer journey.

#### Core Metaphor & Theme
- **The Modern Reality**: Modern full-stack engineering is powered by autonomous AI agent orchestration (Claude, Gemini, ChatGPT, Cursor, DeepSeek). Rather than writing every boilerplate line by hand, Rony summons AI to adapt instantly to any tech stack or codebase challenge.
- **Tagline / Lore**: *"With this sacred treasure, I summon... Full-Stack AI Adaptation."* (Clicking `[ ☸ SPIN / SUMMON ]` spins the wheel with metallic ratchet sound effects and sends amber energy pulses into the circuit bus).
- **Approved Theme**: **Obsidian & Royal Sunburst Amber** (`#0D1117` ground, `#E5B869` gold accent, `#F3C77C` honey secondary).

#### 2.5D Visual Hierarchy & Structure
1. **The Centerpiece — Meditating Rony & 3D Mahoraga Halo Wheel**:
   - **Meditating Character**: High-resolution cutout illustration of Rony seated in meditation with golden sunlight highlights (`/images/skills/meditating_rony.png`). Animates with gentle floating breathing sway.
   - **3D Mahoraga Halo Wheel**: True 3D React Three Fiber canvas floating directly above Rony's head like a divine celestial crown.
     - 8-spoked golden Dharmachakra wheel with rotating AI tool nodes (Claude 3.7, Gemini 2.5, ChatGPT, Cursor, DeepSeek, Antigravity, etc.).
     - Interactive drag-to-spin physics with angular velocity damping and mechanical ratchet audio feedback.
   - **Summon Banner**: Monospace text ribbons flanking the character: *"With this sacred treasure, I summon... Full-Stack AI Adaptation."*
2. **The Data Bus — Responsive SVG Circuit Lines**:
   - Central horizontal bus splitting into 3 branches to the left and 3 branches to the right (inspired by network load balancers).
   - Animated SVG stroke-dasharray traveling amber energy pulses cascading from the central character outward to the nodes.
3. **The 6 Load-Balanced Realm Boxes (Glassmorphic Cyber-Cards)**:
   - **Left Cluster (Core Engineering)**:
     - **01. Frontend Architecture**: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Three.js / R3F.
     - **02. Backend & Distributed Systems**: Node.js, Express, Fastify, Python, REST & GraphQL APIs, WebSockets.
     - **03. Database & Persistence**: PostgreSQL, Redis, Supabase, MongoDB, Prisma ORM.
   - **Right Cluster (Automations & Cloud Ops)**:
     - **04. Autonomous AI Agents**: n8n, Zapier, LangChain / LlamaIndex, Claude & OpenAI API Workflows.
     - **05. DevOps & Cloud Infrastructure**: Docker, Linux / Bash, GitHub Actions CI/CD, Vercel, AWS.
     - **06. Developer Tooling & Testing**: Git, Turbopack, Postman, Cursor AI, Vitest / Jest.
4. **Interactive HUD Tool Popovers / Modals**:
   - Hovering or clicking any of the 6 boxes opens a floating glassmorphic telemetry modal showing the tool logos, proficiency level, and production architectural patterns.
5. **Mobile & Tablet Responsive Flow**:
   - Desktop: Wide 3-Center-3 load-balancer spread.
   - Mobile/Tablet: Pinned Meditating Rony + 3D Halo Wheel at the top, reflowing the 6 realm boxes into an adaptive 2-column or 1-column grid below.

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
