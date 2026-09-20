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
* **Approved Theme**: **Obsidian & Phosphor Neon (Dark)**
  - Canvas: `#0D1117` | Card Surfaces: `#161B22` | Hairline Borders: `#30363D`
  - Primary Accent: `#00FF94` (Electric Phosphor Neon Green) | Text on Accent: `#00391D`
  - Secondary Accent: `#58A6FF` (Blueprint Cyan)
  - Typography: **Precision Engineering** (`Inter` display/body + `JetBrains Mono` telemetry/code).
* **Git Branches**:
  - `v1-current-backup` (Safe permanent backup of original site; do NOT modify).
  - `v2-3d-rebuild` (Active development branch).

---

## 2. The 3 Core Sections in Scope

We are building and polishing three tactile, memorable sections:
1. **Section 01: Hero — "The Cockpit"**:
   - Hybrid split layout. High-contrast typography on the left.
   - Right side: Multi-plane parallax illustration of a software engineer (Rony from behind in a tech hoodie) at a curved ultrawide multi-monitor setup at midnight, looking at code streams and neural network graphs.
   - Smooth mouse parallax and scroll transition.
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

## 3. Senior 3D Web Mentor Protocol (Non-Negotiable)

Rony is learning 3D web development, Three.js, WebGL, and Framer Motion for the first time. The agent operates as an **Interactive Mentor & Senior Architect**:

* **Never Code in Silent Bulk**: Do NOT generate massive 3D scenes or multi-stage features in a single unmonitored turn.
* **Explain the "Why", Theory & Mental Models First**:
  - Before writing code, explain the concept in plain visual terms (e.g. the "Movie Set" model: Scene, Camera, Mesh, Material, Light, Render Loop).
  - Explain the history and the problem the tool solves (e.g. why Three.js was invented over raw WebGL shaders).
* **Maintain the Learning Roadmap**:
  - Keep [`.agents/learning_roadmap.md`](file:///d:/Projects/Portfolio/.agents/learning_roadmap.md) updated and check off concepts as they are learned and mastered.
* **Bite-Sized Human Pacing**:
  - Complete one clear component shell or milestone, stop, explain what was built in human design & architectural terms, and verify understanding before proceeding.

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

## 6. Performance & Quality Standards

1. **Zero Hardcoded Colors**: Use Tailwind tokens (`bg-canvas`, `text-accent`, `border-line`).
2. **60-FPS Anti-Lag Rule**:
   - Cap Three.js DPR: `dpr={[1, 1.5]}`.
   - Dynamic lazy-loading for 3D canvases (`next/dynamic` + `ssr: false`).
   - Pause offscreen WebGL render loops with Intersection Observers.
3. **Zero Dummy/Inert Elements**: Every button, tab, and 3D control must have active handlers or feedback states.
