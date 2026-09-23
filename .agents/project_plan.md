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

### Section 01: Hero — "The Open-Air Cinema // Starry Night Multi-Plane Parallax" [LOCKED]
Inspired by atmospheric narrative parallax web designs (e.g., Notosan VISITE), establishing mood, human identity, and cinematic storytelling through a calm outdoor setting under the stars.

#### Visual Architecture & Composition (Full-Screen Immersive Canvas)
- **Overall Canvas**: Full-viewport immersive nature setting at night. No boxed cards. The entire screen is the outdoor world.
- **Background Plane (Layer 0 - Deepest Depth)**:
  - Deep dark twilight/midnight sky with glowing moon, gentle starfield, and distant silhouetted hills/trees.
  - Moves subtly with mouse coordinates (~5px) to give the illusion of infinite distance.
- **Midground Plane (Layer 1 - The Projection Ground)**:
  - Outdoor clearing with natural ground and foliage framing.
  - **The Centerpiece — Outdoor Projector Screen**:
    - A clean, portable outdoor movie projector screen on tripod stands planted on the ground (based on reference specification).
    - **Live HTML / React Content on the Screen**:
      - Top Dispatch Badge: `● ACTIVE DISPATCH // AVAILABLE FOR SELECT TEAMS`
      - Headline: **"I Build Web Apps & AI Automations"** (with glowing emerald phosphor emphasis).
      - Narrative Sub-headline: *"Full Stack Developer specializing in Next.js, Node.js, and autonomous AI workflow pipelines for high-growth technical teams."*
      - Action Row:
        - Primary CTA: `VIEW PROJECTS →` (Solid emerald `#00FF94` with bold typography)
        - Ghost CTA: `GET IN TOUCH ↗` (Clean bordered button with subtle hover wash)
        - Devlog Anchor: `READ DEVLOG (ISSUE NOTES) ↵`
      - Telemetry Stats Grid:
        - `99.9% // PROD UPTIME` • `NEXT.JS 16 // ARCHITECTURE` • `AI AGENTS // RUNTIMES` • `CUET // CSE ALUM`
- **Foreground Plane (Layer 2 - The Human Anchor & Living Campfire)**:
  - **The Subject (Rony)**: Positioned on the right side in graphic novel / comic illustration style, seen from behind/profile, relaxed and watching the projector screen (matching the visual weight of the wanderer in Notosan).
  - **The Living Campfire**: Beside Rony, a cozy campfire with an animated flickering flame and tiny glowing embers floating up into the night sky (lightweight particle/CSS loop, giving a cinemagraph "living photo" feel).
  - Shifts with responsive spring-damped parallax (~25px), creating tangible physical depth between the viewer, the character, and the screen.
- **Transition**: Smooth momentum scroll transition flowing into `#about` (Section 02: 3D Comic Book Dossier).

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
