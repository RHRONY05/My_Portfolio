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

## 2. Core Web Vitals (CWV) Performance Standards

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

## 3. Collaboration & Formatting Protocol

- **NO LaTeX in Chat**: Never use LaTeX math syntax (`$`, `$$`, `\text{}`, `\frac{}`) in chat responses. Use plain English, standard arithmetic, or code blocks.
- **Verification**: Always verify changes with `npx tsc --noEmit` before concluding any turn.
- **Deep Reference**: Inspect [`.agents/context.md`](.agents/context.md) for section mechanics, themes (`src/data/themeConfig.ts`), projects (`src/data/projects.ts`), or profile info (`src/data/profile.ts`).
