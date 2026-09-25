---
name: session-start
description: Initializes a new conversation/session by inspecting git status, active branch, project specifications (.agents/project_plan.md), progress tracker (.agents/project_progress.md), and the 3D learning roadmap (.agents/learning_roadmap.md). Delivers an immediate context briefing to ensure zero loss of context. Trigger with /session-start, 'session start', 'start session', or at the beginning of any new chat.
---

# Session Start Workflow & Context Restorer

When the user triggers this skill (e.g., typing `/session-start`, `session start`, starting a new chat, or asking "what are we doing?"), execute the following procedure to re-anchor full context:

---

## Step 1: Automatic State & Workspace Audit

Silently execute these inspections:

1. **Git State & Active Branch**:
   - Run `git branch --show-current` and `git status -s`.
   - Verify that the active branch is `v2-3d-rebuild` (and that `v1-current-backup` remains safe).
2. **Current System Spec & Section Blueprints**:
   - Read `.agents/project_plan.md` using `view_file`.
   - Identify the approved theme, typography, tech stack, and the 3 locked sections (Hero, About, Tech Stack).
3. **Milestone Tracker**:
   - Read `.agents/project_progress.md` using `view_file`.
   - Identify the active phase and completed milestones.
4. **Active 3D Learning Module**:
   - Read `.agents/learning_roadmap.md` using `view_file`.
   - Identify which theory/concept is currently up next for Rony to learn.
5. **Dev Server Status**:
   - Verify whether Next.js (`npm run dev`) is currently active.

---

## Step 2: Present the Executive Session Briefing

Deliver a clean, structured briefing to the user following this exact format:

```markdown
### ⚡ Session Briefing: Rony's 3D Portfolio Rebuild

#### 📌 Workspace & Git State:
- **Active Branch**: `v2-3d-rebuild` (Backup safe on `v1-current-backup`)
- **Design Tokens**: 4 Curated Dynamic Themes (`Monolithic Onyx`, `Celadon Forest`, `Midnight Amethyst`, `Prussian Blue`) + 4 Dynamic Fonts (`Original Surfer`, `Lusitana`, `Ruwudu`, `Inter`)
- **Dev Server**: Active (`http://localhost:3000`)
- **Strict Rule**: Zero hardcoded colors/fonts; rely strictly on semantic Tailwind tokens and CSS variables!

#### 🎯 What Was Done (Completed):
- [Summary of locked sections and previous session deliverables]

#### 📍 What We Are Doing Right Now:
- [Current active section and implementation focus]

#### 🧠 Up Next on Your 3D Learning Roadmap:
- **Current Module**: [e.g. Module 1: 2.5D Multi-Plane Parallax & Mouse Physics]
- **Core Concept**: [Brief 1-sentence teaser of the mental model to cover]

#### 🚀 Ready to Proceed:
- [Clear prompt asking the user if they're ready to dive into the next specific step]
```

---

## Step 3: Enforce Mentorship Persona

Remember our master rule in `AGENTS.md`:
* **Never jump straight into bulk coding.**
* Explain the **"Why"**, the **mental model**, and the **vocabulary** first.
* Keep steps bite-sized so Rony learns the architecture alongside the build.
