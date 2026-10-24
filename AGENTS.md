# Rony's 3D Portfolio (`AGENTS.md`)

> **Master Operating Contract**: High-priority behavioral constraints and design rules.
> For deep architecture, 5-section breakdown, directory maps, and profile data, read [`.agents/context.md`](.agents/context.md).

---

## 1. Non-Negotiable Zero-Hardcoding Rules

1. **Colors in JSX / Tailwind**:
   - **NEVER** write raw hex colors (e.g. `#000`, `#111`, `#E5E5E5`).
   - **ALWAYS** use semantic tokens: `bg-canvas`, `bg-card`, `border-line`, `border-accent`, `text-fg`, `text-muted`, `text-accent`, `text-secondary`, `text-on-accent`, `bg-accent`.
   - **Dynamic glows & opacities**: Use `rgba(var(--color-accent-rgb), <alpha>)` or `rgba(var(--color-card-rgb), <alpha>)`.
2. **Colors in Three.js / Canvas**:
   - Canvas materials and lights MUST react dynamically to the active theme.
   - Read from `getComputedStyle(document.documentElement).getPropertyValue("--color-accent")` and listen to `window.addEventListener("rony_theme_change", updateColors)`.
3. **Typography**:
   - **NEVER** write inline `fontFamily` or arbitrary classes like `font-['Inter']`.
   - Headings rely on `globals.css` defaults or `font-heading`.
   - Body prose relies on `font-sans` (`var(--font-inter)`). Telemetry and code use `font-mono`.

---

## 2. Inviolable Section Color Contracts (The Custom Portfolio Theme)

The site features a bespoke, multi-identity design system. Future agents MUST NEVER flatten or homogenize these section boundaries:
1. **Hero Section (`#hero`)**:
   - Strictly locked to **Monochrome Stealth**: pure black canvas (`#000000`) and titanium white (`#e5e5e5`).
   - The headline (*"Full-Stack & AI"*), *"agentic workflows"*, CTAs, and `StreetCurbRunner` mini-game UI are ALWAYS white/monochrome.
2. **Navbar (`<Navbar />`)**:
   - Transparent dark at top (`bg-black/60`).
   - On scroll (`isPastHero`): background transitions to dark obsidian slate-green (`rgba(21, 24, 23, 0.85)`).
   - Text links, brand mark, and "Hire Me" button MUST remain **pure white** (`#f5f5f5` / `#e5e5e5`), NEVER turning burnt orange.
3. **Skills Section (`#skills`)**:
   - Strictly locked to a **Pure White Glow**: Mahoraga 3D wheel halo (`#FFFFFF`, `rgba(255, 255, 255, 0.22)`), workflow cards (`border-white/40`, white shadows), and flow arrows (`rgba(255, 255, 255, 0.95)`).
4. **Projects Section (`#projects` & `/projects`)**:
   - Card hover border & glow are strictly **Pine Green**: `--color-card-hover-border: #59c7a6` and `--color-card-hover-glow: rgba(89, 199, 166, 0.18)`.
   - Badges, status chips, and view links use burnt orange (`#ff7857` / `#ff9175`).
5. **Contact Section (`#contact`)**:
   - The **"Send Message" button** is strictly **Pure White** (`bg-white text-black` with white luminescent glow).
   - Form inputs and contact cards have pine green hover/focus borders (`#59c7a6`).
6. **Default Base Theme (`obsidian-burnt-orange`)**:
   - Canvas: Obsidian slate-green `#151817`
   - Cards: `#1e2220`
   - Lines: `#424843`
   - Accent: Burnt orange `#ff7857`

---

## 3. Core Web Vitals (CWV) Performance Standards

The site maintains **99 Desktop / 86+ Mobile** on Lighthouse. Future changes must preserve these rules:
1. **Lazy Viewport 3D Mounting**: Heavy 3D canvases (`Book3DCanvas`, `MahoragaWheelCanvas`) MUST be wrapped in `LazyViewportMount` with a **render function**:
   ```tsx
   <LazyViewportMount fallback={<LoadingSkeleton />}>
     {() => <Book3DCanvas chapter={chapter} onChapterChange={setChapter} />}
   </LazyViewportMount>
   ```
   *Never pass raw JSX element children*, which forces Next.js dynamic chunk and texture execution on page load.
2. **WebGL Deduplication**: Never mount two `<Canvas>` elements concurrently (e.g. desktop + mobile hidden by CSS). Use `isDesktop` viewport states so only 1 WebGL context exists.
3. **Mobile GPU & Game Scoping**:
   - Interactive games (`StreetCurbRunner`) are desktop/tablet only (`hidden sm:block`) and dynamically imported.
   - Use GPU-accelerated `[text-shadow]` instead of CPU software filter `drop-shadow`.
4. **Drei Html Z-Index**: `<Html>` components from Drei must have `zIndexRange={[5, 0]}`. High-priority modals use `style={{ zIndex: 2147483647 }}`.

---

## 4. Collaboration & Formatting Protocol

- **NO LaTeX in Chat**: Never use LaTeX math syntax (`$`, `$$`, `\text{}`, `\frac{}`) in chat responses. Use plain English, standard arithmetic, or code blocks.
- **Verification**: Always verify changes with `npx tsc --noEmit` before concluding any turn.
- **Deep Reference**: Inspect [`.agents/context.md`](.agents/context.md) for section mechanics, themes (`src/data/themeConfig.ts`), projects (`src/data/projects.ts`), or profile info (`src/data/profile.ts`).
