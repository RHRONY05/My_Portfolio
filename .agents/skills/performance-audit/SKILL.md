---
name: performance-audit
description: Stack-agnostic Core Web Vitals (CWV) & Lighthouse performance auditing skill. Runs production mobile and desktop audits on any web project, diagnoses bottlenecks (TBT, LCP, CLS, render-blocking assets, uncompressed media), applies framework-appropriate optimizations, and re-verifies score improvements. Trigger with /performance-audit, 'audit performance', 'lighthouse audit', or 'optimize cwv'.
---

# Universal Web Performance & Core Web Vitals Audit Standard

Use this skill on **any web project** (Next.js, Vite/React, Vue, Nuxt, Astro, Svelte, or vanilla HTML/JS) to audit performance, diagnose bottlenecks, and optimize Core Web Vitals before deployment.

---

## The Evaluator / Critic Loop

Execute this 5-step loop autonomously:

```
[ Step 1: Detect Stack & Build Production Bundle ]
                        │
                        ▼
[ Step 2: Baseline Lighthouse Audit (Desktop & Mobile) ]
                        │
                        ▼
[ Step 3: Diagnostic Root-Cause Analysis ]
                        │
                        ▼
[ Step 4: Apply Stack-Appropriate Architectural Fixes ]
                        │
                        ▼
[ Step 5: Verification Re-Audit & Score Delta Report ]
```

---

## Step 1: Detect Stack, Build & Launch Production Server

Never audit development servers (e.g. `npm run dev`)—development bundles contain HMR runtimes, unminified code, and source maps that distort telemetry.

1. **Detect Build & Preview Commands from `package.json`**:
   - **Vite (React / Vue / Svelte)**: `npm run build` ──► `npm run preview` (default port: `4173`)
   - **Next.js**: `npm run build` ──► `npm run start` (default port: `3000`)
   - **Astro**: `npm run build` ──► `npm run preview` (default port: `4321`)
   - **Nuxt**: `npm run build` ──► `npm run preview` (default port: `3000`)
   - **Static HTML / Single-Page Apps**: Build to output directory (e.g. `dist/` or `build/`), then serve:
     ```bash
     npx serve dist -l 3000
     ```
2. **Typecheck & Lint (if configured)**:
   Ensure zero compiler errors before auditing (`npx tsc --noEmit` if TypeScript is used).

---

## Step 2: Baseline Lighthouse Audit

Identify the active local port and execute headless Lighthouse for both form factors:

```bash
# Mobile Audit (Simulated 4x CPU Slowdown & 4G Network)
npx lighthouse http://localhost:<PORT> --output=json --output-path=./lighthouse-mobile.json --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --chrome-flags="--headless"

# Desktop Audit
npx lighthouse http://localhost:<PORT> --output=json --output-path=./lighthouse-desktop.json --form-factor=desktop --screenEmulation.mobile=false --chrome-flags="--headless"
```

Extract the 5 primary metrics:
* **Performance Score** (Target: 90+ Desktop, 80+ Mobile)
* **First Contentful Paint (FCP)** (Target: < 1.8s)
* **Largest Contentful Paint (LCP)** (Target: < 2.5s)
* **Total Blocking Time (TBT)** (Target: < 200ms)
* **Cumulative Layout Shift (CLS)** (Target: < 0.1, ideal 0.000)

---

## Step 3: Diagnostic Root-Cause Analysis

Cross-reference audit findings against the 5 universal web bottlenecks:

| Metric Bottleneck | Telemetry Indicator | Common Root Cause |
| :--- | :--- | :--- |
| **High TBT / INP (> 300ms)** | Long tasks, heavy main-thread execution during hydration | Heavy below-the-fold modules (charts, 3D canvases, interactive widgets, heavy editors) evaluated on initial load rather than deferred until viewport intersection. |
| **High LCP (> 2.5s)** | Delayed hero image paint or late webfont swap | Hero element lacking `fetchpriority="high"`; critical font loaded late via external CSS; hero background image uncompressed. |
| **High CLS (> 0.1)** | Elements jumping during asset load | Images, embeds, or canvas containers lacking explicit dimensions (`aspect-ratio` or `width`/`height`); late font swapping altering element heights. |
| **High FCP (> 2.0s)** | Render-blocking resources | Synchronous scripts in `<head>`; heavy CPU software filter effects (`filter: drop-shadow(...)`). |
| **Asset Bloat** | Payloads > 500KB | Static images served in legacy uncompressed formats (raw PNG/JPEG) or oversized pixel dimensions. |

---

## Step 4: Apply Stack-Appropriate Architectural Fixes

### 1. Viewport-Deferred Loading (TBT Reduction)
* **Rule**: Heavy below-the-fold modules must **never** execute on initial page load.
* Defer loading using framework-appropriate dynamic imports and Intersection Observers:
  - **React / Next.js**: Use dynamic imports with viewport intersection wrappers that pass children as render functions (`() => <HeavyComponent />`) to avoid premature chunk evaluation during hydration.
  - **Vue / Nuxt**: Use `defineAsyncComponent` combined with `v-if="isInView"`.
  - **Vanilla / Static**: Use dynamic `import()` triggered by `IntersectionObserver`.

### 2. Critical Asset Prioritization (LCP Optimization)
* Preload the primary above-the-fold display font directly in the document `<head>`:
  ```html
  <link rel="preload" href="/fonts/primary-display.woff2" as="font" type="font/woff2" crossorigin />
  ```
* For the primary hero LCP image:
  - Add `fetchpriority="high"` and ensure `loading="eager"`.
  - For all below-the-fold images: set `loading="lazy"`.

### 3. Layout Stability & Aspect Ratios (CLS Elimination)
* Always define explicit `aspect-ratio` (or `width` and `height`) on image containers, video players, and canvas wrappers so the browser reserves layout space before assets load.
* Ensure font-display strategies (`font-display: swap` or local system font fallbacks) have matching line-heights to eliminate reflow.

### 4. GPU Hardware Acceleration (FCP & Speed Index)
* Replace CPU software filters (`filter: drop-shadow(...)`) on large headlines or repeating cards with native GPU-accelerated shadows (`text-shadow` or `box-shadow`).

### 5. Automated Asset Compression & Downscaling
* For any static image exceeding 500KB:
  - Downscale dimensions to actual maximum display requirements (e.g. Social OpenGraph: `1200 × 630` px).
  - Convert to modern WebP or optimized compressed formats using Sharp or project asset pipelines:
    ```javascript
    await sharp(input)
      .resize(targetWidth, targetHeight, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(output);
    ```

---

## Step 5: Verification & Benchmark Report

1. Re-compile the production build.
2. Re-run Lighthouse mobile and desktop audits.
3. Present a clear before-and-after benchmark summary:

```markdown
### 🚀 Core Web Vitals Optimization Benchmark

| Metric | Baseline (Mobile) | Optimized (Mobile) | Delta | Target |
| :--- | :--- | :--- | :--- | :--- |
| **Performance Score** | `XX` | **`YY`** | 🟢 +pts | 80+ (Mobile) / 90+ (Desktop) |
| **First Contentful Paint (FCP)** | `X.Xs` | **`Y.Ys`** | 🟢 -Xs | < 1.8s |
| **Largest Contentful Paint (LCP)** | `X.Xs` | **`Y.Ys`** | 🟢 -Xs | < 2.5s |
| **Total Blocking Time (TBT)** | `XXXms` | **`YYms`** | 🟢 -% | < 200ms |
| **Cumulative Layout Shift (CLS)** | `X.XXX` | **`0.000`** | 🟢 0.000 | < 0.1 |

#### Fixes Applied:
- [x] Viewport-deferred heavy below-the-fold components.
- [x] Preloaded critical above-the-fold webfonts.
- [x] Optimized and downscaled oversized media assets.
- [x] Stabilized container aspect ratios to eliminate layout shifts.
```
