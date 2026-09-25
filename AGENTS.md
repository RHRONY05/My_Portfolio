<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Rony's 3D Portfolio Rebuild (`AGENTS.md`)

> **Operating Contract**: Master guidelines for any AI agent collaborating on this project. Follow unconditionally.

---

## 1. Project Overview & Architecture

High-performance, single-page 3D developer portfolio for **Rony (RONY.DEV)** — Full-Stack Engineer & Autonomous AI Automation Specialist.

* **Stack**: **Next.js 16 (App Router, Turbopack)**, React 19, TypeScript, Tailwind CSS v4 (CSS-first config), Framer Motion, Three.js / React Three Fiber (`@react-three/fiber` + `@react-three/drei`), Lenis Smooth Scroll.
* **Design Token System**: **4 Curated Dynamic Themes & 4 Curated Fonts** (`src/data/themeConfig.ts`, `globals.css`):
  - **Dynamic Theme Switcher**: Users can switch between 4 themes live from the Navbar or system preference:
    1. **Monolithic Onyx & Graphite Grayscale (DEFAULT)**: `#000000` canvas | `#111111` card | `#E5E5E5` accent
    2. **Celadon & Hunter Forest**: `#111D13` canvas | `#192B1C` card | `#A1CCA5` accent
    3. **Midnight Amethyst & Deep Violet**: `#11001C` canvas | `#1E0030` card | `#C084FC` accent
    4. **Prussian Blue & Space Indigo**: `#0B132B` canvas | `#131C38` card | `#5BC0BE` accent
  - **Dynamic Typography Switcher**: Users can switch between 4 fonts live:
    1. **Original Surfer (DEFAULT)**: `'Original Surfer', cursive, sans-serif` (Retro Rebel)
    2. **Lusitana**: `'Lusitana', serif` (Noble Heritage)
    3. **Ruwudu**: `'Ruwudu', serif` (Calligraphic Drama)
    4. **Inter**: `'Inter', sans-serif` (Precision Standard)
  - **Mono / Telemetry / Code**: `JetBrains Mono` (`font-mono`)
* **Git Branches**:
  - `v1-current-backup` (Safe permanent backup of original site; do NOT modify).
  - `v2-3d-rebuild` (Active development branch).

---

## 2. The 3 Core Sections in Scope

We are building and polishing three tactile, memorable sections:
1. **Section 01: Hero — "The Open-Air Cinema"**:
   - Full-screen immersive nature setting at night under a moonlit, starry sky (inspired by Notosan VISITE).
   - Center-left: An outdoor portable projector screen on tripod stands planted on the ground, projecting Rony's live HTML/React headline, mission copy, and CTAs.
   - Right side: Graphic novel / comic illustration of Rony (the lad seen from behind/profile) relaxed by a cozy living campfire with animated embers floating into the night.
   - Multi-plane 2.5D mouse parallax and smooth scroll transition.
2. **Section 02: About — "The 3D Comic Book Dossier"**:
   - Inspired by `panelpress.online`.
   - Left side: Interactive 3D volume with realistic thickness, hard cover, spine, and 3D page-flip physics (`[📖 Open Dossier]`, keyboard navigation, drag to rotate).
   - 5-spread graphic novel chronicle (Current Mission, Field Experience, Academic Roots at CUET, Engineering Philosophy, Back Cover CTA).
   - Right side: Synchronized editorial narrative panel updating in real-time as pages turn.
3. **Section 03: Tech Stack — "Mahoraga Adaptation Wheel & Yggdrasil Realm Orbs"**:
   - Apex: 3D eight-spoked Mahoraga Adaptation Wheel (AI drivers: Claude, Gemini, ChatGPT, Cursor, DeepSeek) that spins with a metallic ratchet sound effect.
   - Central Pillar: Biomechanical cyber-trunk with glowing data veins.
   - Branches: 4 floating glass planetary biospheres (Frontend, Backend, Database, DevOps) with hover tilt and interactive telemetry drawers.

---

## 3. Senior 3D Web Mentor & Collaboration Protocol (Non-Negotiable)

Rony is learning 3D web development, Three.js, WebGL, and Framer Motion for the first time. This project is a hands-on mentorship and collaborative build—NOT an automated bulk-generation factory. The agent must strictly adhere to this 4-step workflow:

### Step 1: Teach & Explore the Concept First
- **Zero Premature Coding**: Never touch code, generate assets, or edit files at the start of a topic or section.
- **Explain the Concept & Mental Model**: Explain what we are about to do, the problem it solves, and how the underlying technology works using plain, intuitive analogies.
- **Strict Formatting Rule — NO LaTeX**: Never use LaTeX math delimiters (`$`, `$$`, `\text{}`, `\frac{}`, etc.) in chat. The chat UI does not render LaTeX; it turns into messy, unreadable syntax. Use plain English, standard arithmetic (`relX = (clientX - left) / width`), or clean code blocks.

### Step 2: Discuss & Align on the UI Vision
- **Never Assume the UI**: The agent must NEVER invent or unilaterally push a design without discovering Rony's exact mental image first.
- **Interactive UI Discussion**: Ask Rony how he envisions the section (layout, vibe, elements, references, behavior). Compare ideas, propose wireframe layouts in simple ASCII/markdown, and get Rony's explicit approval before writing a single line of code.

### Step 3: Bite-Sized Paced Implementation
- Once (and only once) Rony explicitly approves a design concept and says to build it, implement ONLY that specific bite-sized piece.
- Stop immediately after, explain what was constructed, and invite testing and feedback.

### Step 4: Maintain Tracking & Check for Understanding
- Keep [`.agents/learning_roadmap.md`](file:///d:/Projects/Portfolio/.agents/learning_roadmap.md) and [`.agents/project_progress.md`](file:///d:/Projects/Portfolio/.agents/project_progress.md) synchronized only when concepts and steps are genuinely completed and confirmed by Rony.

---

## 4. Session Start Protocol (`/session-start`)

At the beginning of any new conversation or session, the agent must run the **`session-start`** skill:
1. Inspect git branch (`v2-3d-rebuild`) and uncommitted status.
2. Read `.agents/project_plan.md`, `.agents/project_progress.md`, and `.agents/learning_roadmap.md`.
3. Check dev server status (`http://localhost:3000`).
4. Present an immediate **Session Briefing** (State, What was done, What we are doing, Next learning topic, and Ready-to-proceed prompt).

---

## 5. Standard Progress Reporting Format

In every response, communicate using this design & learning focused structure:

```markdown
### 🎨 Progress & Learning Update: [Feature / Section Name]

#### 🧠 Theory & Mental Model Covered:
- **The Concept:** [What it is in plain English]
- **The Problem It Solves:** [Why we use it instead of old/raw methods]
- **The Analogy:** [Visual mental model, e.g. camera lens, movie set, spring physics]

#### ✅ What was completed in this step:
- [Item 1 created/modified]
- [Item 2 created/modified]

#### 🔍 How to preview / What to test:
- [Where to view in browser and what interaction to test]

#### 💬 Check for Understanding / Your Feedback:
- [Question checking if the concept is clear or gathering your design preference]

#### 🔜 Next planned step:
- [Next bite-sized milestone to be tackled upon your confirmation]
```

---

## 6. Strict Zero-Hardcoding Policy & Standards (NON-NEGOTIABLE)

Every AI agent collaborating on this codebase MUST strictly follow these token rules without exception:

### 1. Zero Hardcoded Colors in HTML/Tailwind
- **NEVER** write raw hex colors (e.g. `#000000`, `#0D1117`, `#161B22`, `#E5B869`, `#E5E5E5`, `#30363D`, `#00FF94`) in JSX classNames or inline styles.
- **ALWAYS** use semantic Tailwind design tokens:
  - Backgrounds: `bg-canvas`, `bg-card`
  - Borders: `border-line`, `border-accent`, `hover:border-accent`
  - Typography: `text-fg`, `text-muted`, `text-accent`, `text-secondary`, `text-on-accent`
  - Accents on Badges & Buttons: `bg-accent`, `text-on-accent`, `hover:bg-secondary`
- **Dynamic Opacities & Glows**:
  - Always use the RGB CSS variable: `rgba(var(--color-accent-rgb), 0.35)` or `rgba(var(--color-card-rgb), 0.80)`
  - Example drop-shadow: `shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.25)]`
  - Example backdrop glow: `bg-[radial-gradient(ellipse_at_center,rgba(var(--color-accent-rgb),0.2)_0%,transparent_70%)]`

### 2. Zero Hardcoded Colors in Three.js / WebGL / Canvas
- In 3D Canvas scenes (R3F), materials, lights, and wireframes must dynamically react to the active theme.
- **Pattern**: Read colors from the live DOM computed style and listen to the window event `rony_theme_change`:
  ```tsx
  const [accentColor, setAccentColor] = useState("#E5E5E5");
  useEffect(() => {
    const updateColors = () => {
      const comp = getComputedStyle(document.documentElement);
      const acc = comp.getPropertyValue("--color-accent").trim();
      if (acc) setAccentColor(acc);
    };
    updateColors();
    window.addEventListener("storage", updateColors);
    window.addEventListener("rony_theme_change", updateColors);
    return () => {
      window.removeEventListener("storage", updateColors);
      window.removeEventListener("rony_theme_change", updateColors);
    };
  }, []);
  ```
- Use `accentColor` for 3D point lights, rims, glowing materials, and halo accents.

### 3. Zero Hardcoded Typography
- **NEVER** hardcode font family inline styles (e.g. `fontFamily: "Inter"`) or arbitrary Tailwind font classes (e.g. `font-['Inter']`).
- **Headings & Display**: Rely on `globals.css` element defaults (`h1..h6`) or `font-heading`.
- **Prose & Body**: Rely on `globals.css` `html, body` inheritance (`var(--font-primary, var(--font-sans))`).
- **Telemetry, Badges, Labels, Metadata**: Use `font-mono` (`var(--font-jetbrains-mono)`).

### 4. Drei `<Html>` Z-Index & Modal Stacking Rule
- Any `<Html>` component from `@react-three/drei` MUST have `zIndexRange={[5, 0]}` to prevent Drei from setting an astronomical z-index (16.7 million) that breaks modals.
- All high-priority modals rendered via React Portals must use `style={{ zIndex: 2147483647 }}` (maximum 32-bit integer) and dispatch `rony_modal_state` so 3D overlays unmount when modals are open.

### 5. Performance & Quality Standards
- **60-FPS Anti-Lag Rule**: Cap Three.js DPR (`dpr={[1, 1.5]}`), dynamic lazy-load 3D canvases (`next/dynamic` + `ssr: false`), pause offscreen render loops.
- **Zero Horizontal Scrolling**: Enforce `overflow-x: clip; max-width: 100vw;` on `html, body` and clip wide animated backdrops with `overflow-hidden`.
- **Zero Inert Elements**: Every button, tab, and 3D control must have active handlers or feedback states.
