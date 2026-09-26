---
name: session-start
description: Initializes a new conversation/session for Rony's Portfolio. Inspects git state, verifies the completed baseline in context.md, reviews progress tracker (.agents/project_progress.md), and presents a rapid maintenance & evolution briefing so future updates preserve performance and design tokens. Trigger with /session-start, 'session start', 'start session', or at the beginning of any new chat.
---

# Session Start Workflow: Maintenance & Evolution Mode

When Rony triggers this skill (typing `/session-start`, `session start`, starting a new chat, or returning after time away to edit the portfolio), execute this procedure to establish immediate context:

---

## Step 1: Silent Workspace & Git Health Check

Silently perform these checks without verbose logs:

1. **Git State & Active Branch**:
   - Run `git branch --show-current` and `git status -s`.
   - Identify any uncommitted edits or dirty files.
2. **Review Knowledge Base & Guardrails**:
   - Check `.agents/context.md` for current section architecture, stack, and profile links.
   - Re-anchor to `AGENTS.md` core rules (Zero-hardcoded colors/fonts, `LazyViewportMount` render props, no LaTeX).
3. **Verify Build Health (if changes exist)**:
   - If the workspace has uncommitted changes, verify with `npx tsc --noEmit`.

---

## Step 2: Present the Executive Maintenance Briefing

Deliver a concise, structured status report tailored for website updates:

```markdown
### ⚡ Portfolio Status Briefing (Maintenance & Updates)

#### 📌 System State:
- **Baseline**: 🟢 Production-Ready & Locked (99 Desktop / 86+ Mobile Lighthouse)
- **Active Branch**: `[branch-name]` (Status: `[clean / dirty]`)
- **Tokens**: 4 Themes & 4 Fonts (`src/data/themeConfig.ts`)
- **Operating Contract**: Active (`AGENTS.md` zero-hardcoding & render-prop 3D mounting enforced)

#### 🗺️ Quick-Reference Navigation:
- **Add / Edit Projects**: `src/data/projects.ts` (Auto-populates Project Deck & Case Study Modal)
- **Update Skills / Tools**: `src/data/skillsData.ts` (Feeds Mahoraga Wheel & Realm Orbs)
- **Update Bio / Links**: `src/data/profile.ts`
- **Section Code**: `src/components/hero/`, `about/`, `skills/`, `projects/`, `Contact.tsx`
- **Full Dossier**: [`.agents/context.md`](.agents/context.md)

#### 🛠️ What would you like to update or build today?
- [ ] Add or modify a project case study
- [ ] Update tech stack, tools, or skills data
- [ ] Refine 3D canvas animations or interaction
- [ ] Update bio, experience, or copy
- [ ] Performance, SEO, or new feature addition
```

---

## Step 3: Enforce Collaboration Rules for Any Edits

For any updates requested by Rony during this session:
1. **Zero Hardcoded Colors/Fonts**: Always use semantic Tailwind tokens (`bg-canvas`, `bg-card`, `text-fg`, `text-accent`) and existing font variables.
2. **Performance Preservation**: Wrap any new/heavy WebGL components in `LazyViewportMount` using render functions: `{() => <Component />}`.
3. **Verification Before Concluding**: Always run `npx tsc --noEmit` before finishing any task.
4. **No LaTeX**: Never use LaTeX math delimiters in chat.
