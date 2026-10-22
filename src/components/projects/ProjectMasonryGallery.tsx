"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Cpu,
  TrendingUp,
  CheckCircle2,
  Layers,
  Smartphone,
  Maximize2,
  X,
} from "lucide-react";
import type { Project, ProjectScreenshot } from "@/data/projects";

interface ProjectMasonryGalleryProps {
  project: Project;
}

const PROJECT_SNIPPETS: Record<string, { title: string; lang: string; code: string }> = {
  "shopmate-ai": {
    title: "pgvector Cosine Query",
    lang: "SQL",
    code: `SELECT j.id, j.title,
       1 - (je.embedding <=> $1) AS similarity
FROM jersey_embeddings je
ORDER BY similarity DESC LIMIT 5;`,
  },
  "vocab-app": {
    title: "Leitner 5-Box Cognitive Engine",
    lang: "TypeScript",
    code: `const SCHEDULE = [1, 3, 7, 14, 30]; // Days
const nextReview = Date.now() + SCHEDULE[box - 1] * 86400000;`,
  },
  "movie-booking": {
    title: "ACID Concurrency Row-Level Lock",
    lang: "SQL",
    code: `SELECT id, status FROM seats 
WHERE id = $1 FOR UPDATE;
INSERT INTO bookings (seat_id, user_id) 
VALUES ($1, $2);`,
  },
  sabaihealth: {
    title: "Digital NDA SHA-256 Audit Seal",
    lang: "TypeScript",
    code: `const payload = \`\${meta.ip}:\${meta.timestamp}:\${meta.partnerId}\`;
const seal = crypto.subtle.digest("SHA-256", new TextEncoder().encode(payload));`,
  },
};

/**
 * Helper to compute an appropriate Tailwind aspect class or inline style
 * based on the natural shape of the screenshot (wide, tall, square, or mobile)
 */
function getImageAspectStyle(screenshot?: ProjectScreenshot): React.CSSProperties {
  if (!screenshot) return { aspectRatio: "16/9" };
  if (screenshot.aspectRatio) {
    return { aspectRatio: screenshot.aspectRatio };
  }
  if (screenshot.width && screenshot.height) {
    return { aspectRatio: `${screenshot.width} / ${screenshot.height}` };
  }
  if (screenshot.type === "mobile") {
    return { aspectRatio: "9 / 18" };
  }
  return { aspectRatio: "16 / 9" };
}

export function ProjectMasonryGallery({ project }: ProjectMasonryGalleryProps) {
  const [activeLightbox, setActiveLightbox] = useState<ProjectScreenshot | null>(null);

  const cs = project.caseStudy;
  const stat1 = cs.stats[0];
  const stat2 = cs.stats[1];
  const snippet = PROJECT_SNIPPETS[project.id];
  const gallery = project.gallery || [];

  // Separate mobile screenshots from desktop/feature screenshots to preserve phone mockups
  const mobileScreenshot = gallery.find((g) => g.type === "mobile");
  const nonMobileScreenshots = gallery.filter((g) => g !== mobileScreenshot);

  const screenshot2 = nonMobileScreenshots[0];
  const screenshot4 = nonMobileScreenshots[1];
  const screenshot5 = nonMobileScreenshots[2];
  const screenshot6 = nonMobileScreenshots[3] || (!mobileScreenshot ? gallery[4] : undefined);
  const remainingScreenshots = nonMobileScreenshots.slice(mobileScreenshot ? 4 : 5);

  // Keyboard navigation for lightbox
  const closeLightbox = useCallback(() => setActiveLightbox(null), []);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    if (activeLightbox) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeLightbox, closeLightbox]);

  return (
    <div className="w-full my-8 sm:my-12">
      {/* 
        ========================================================================
        PINTEREST / BENTO GALLERY
        Left: Wide 6 cols (Primary UI 1 on top, Screenshot 5 + Metric Card below)
        Middle: 3 cols (Screenshot 2 on top, Architecture / Flow below)
        Right: 3 cols (Screenshot 3 Mobile UI on top, Screenshot 6 / Metric 2 below)
        ========================================================================
      */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        
        {/* =======================================================
            COLUMN 1 (WIDE LEFT: 6 COLS)
            Primary UI Screenshot 1 + [Screenshot 5 & Metric Card 1]
           ======================================================= */}
        <div className="md:col-span-12 lg:col-span-6 flex flex-col gap-5">
          {/* Primary UI Screenshot 1 (Wide Browser Frame) */}
          {project.image && (
            <div
              onClick={() =>
                setActiveLightbox({
                  title: `${project.title} Primary UI`,
                  src: project.image!,
                  caption: "Primary production interface overview",
                  type: "desktop",
                  aspectRatio: "1894 / 917",
                })
              }
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card shadow-lg transition-all duration-300 hover:border-accent hover:shadow-[0_12px_32px_rgba(var(--color-accent-rgb),0.15)]"
            >
              {/* Browser Window Chrome */}
              <div className="flex h-9 items-center justify-between border-b border-line bg-canvas/90 px-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-accent/40" />
                  <span className="size-2 rounded-full bg-line" />
                  <span className="size-2 rounded-full bg-line" />
                  <span className="ml-2 font-mono text-[10px] text-muted truncate max-w-[200px]">
                    rhrony05.me/projects/{project.id}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-accent font-bold">
                    PRIMARY INTERFACE
                  </span>
                  <Maximize2 className="size-3 text-muted group-hover:text-accent transition-colors" />
                </div>
              </div>

              {/* Viewport Image - Natural desktop landscape aspect ratio */}
              <div
                className="relative w-full overflow-hidden bg-canvas aspect-[16/9] sm:aspect-[2/1]"
                style={{ aspectRatio: "1894 / 917" }}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} Primary UI`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-102"
                />
              </div>
            </div>
          )}

          {/* Bottom Split Row: Screenshot 5 + Metric Card 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
            {/* Screenshot 5 or Code Snippet */}
            {screenshot5 ? (
              <div
                onClick={() => setActiveLightbox(screenshot5)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card p-2 flex flex-col justify-between transition-all duration-300 hover:border-accent hover:shadow-md"
              >
                <div
                  className="relative w-full overflow-hidden rounded-xl bg-canvas"
                  style={getImageAspectStyle(screenshot5)}
                >
                  <Image
                    src={screenshot5.src}
                    alt={screenshot5.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain sm:object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 rounded-md bg-canvas/80 p-1 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="size-3 text-accent" />
                  </div>
                </div>
                <div className="pt-2 px-1">
                  <span className="font-mono text-[10px] text-accent block line-clamp-1">
                    {screenshot5.title}
                  </span>
                  {screenshot5.caption && (
                    <span className="font-sans text-[11px] text-muted line-clamp-1">
                      {screenshot5.caption}
                    </span>
                  )}
                </div>
              </div>
            ) : snippet ? (
              <div className="relative overflow-hidden rounded-2xl border border-line bg-card p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-line/60">
                  <span className="font-mono text-[11px] font-bold text-accent truncate">
                    {snippet.title}
                  </span>
                  <span className="font-mono text-[9px] text-muted uppercase">
                    {snippet.lang}
                  </span>
                </div>
                <pre className="font-mono text-[10px] text-muted overflow-x-auto p-2.5 rounded-lg bg-canvas/70 leading-relaxed [scrollbar-width:none]">
                  <code>{snippet.code}</code>
                </pre>
              </div>
            ) : null}

            {/* Metric Card 1 */}
            {stat1 && (
              <div className="relative flex flex-col justify-between min-h-[160px] overflow-hidden rounded-2xl border border-line bg-card p-5 transition-all hover:border-accent">
                <div className="flex items-center justify-between text-muted mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
                    PRIMARY METRIC
                  </span>
                  <TrendingUp className="size-4 text-accent" />
                </div>
                <div>
                  <div className="font-mono text-3xl sm:text-4xl font-black text-fg tracking-tight">
                    {stat1.value}
                  </div>
                  <div className="mt-1 font-sans text-xs font-bold text-fg">
                    {stat1.label}
                  </div>
                  {stat1.detail && (
                    <div className="font-mono text-[10px] text-muted mt-0.5">
                      {stat1.detail}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =======================================================
            COLUMN 2 (MIDDLE: 3 COLS)
            Screenshot 2 (Sub-feature) + Screenshot 4 (Architecture / Flow)
           ======================================================= */}
        <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-5">
          {/* Screenshot 2 (Sub-feature / Wide Desktop View) */}
          {screenshot2 ? (
            <div
              onClick={() => setActiveLightbox(screenshot2)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card p-2 flex flex-col transition-all duration-300 hover:border-accent hover:shadow-md"
            >
              <div
                className="relative w-full overflow-hidden rounded-xl bg-canvas"
                style={getImageAspectStyle(screenshot2)}
              >
                <Image
                  src={screenshot2.src}
                  alt={screenshot2.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 rounded-md bg-canvas/80 p-1 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="size-3 text-accent" />
                </div>
              </div>
              <div className="pt-2 px-1">
                <span className="font-mono text-[10px] text-accent block line-clamp-1">
                  {screenshot2.title}
                </span>
                {screenshot2.caption && (
                  <span className="font-sans text-[11px] text-muted line-clamp-1">
                    {screenshot2.caption}
                  </span>
                )}
              </div>
            </div>
          ) : (
            /* Fallback Sub-Feature Highlights */
            <div className="relative overflow-hidden rounded-2xl border border-line bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="size-4 text-accent" />
                <h4 className="font-mono text-xs font-bold text-fg uppercase">
                  Sub-Features
                </h4>
              </div>
              <div className="space-y-2">
                {project.features.slice(0, 2).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-muted">
                    <CheckCircle2 className="size-3 text-accent shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Screenshot 4 (Architecture Flow or Tall Feature Form) */}
          {screenshot4 ? (
            <div
              onClick={() => setActiveLightbox(screenshot4)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card p-2 flex flex-col transition-all duration-300 hover:border-accent hover:shadow-md"
            >
              <div
                className="relative w-full overflow-hidden rounded-xl bg-canvas"
                style={getImageAspectStyle(screenshot4)}
              >
                <Image
                  src={screenshot4.src}
                  alt={screenshot4.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-contain sm:object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 rounded-md bg-canvas/80 p-1 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="size-3 text-accent" />
                </div>
              </div>
              <div className="pt-2 px-1">
                <span className="font-mono text-[10px] text-accent block line-clamp-1">
                  {screenshot4.title}
                </span>
                {screenshot4.caption && (
                  <span className="font-sans text-[11px] text-muted line-clamp-1">
                    {screenshot4.caption}
                  </span>
                )}
              </div>
            </div>
          ) : (
            /* Fallback Architecture Flow Nodes */
            <div className="relative overflow-hidden rounded-2xl border border-line bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="size-4 text-accent" />
                <h4 className="font-mono text-xs font-bold text-fg uppercase">
                  Architecture Flow
                </h4>
              </div>
              <div className="space-y-2.5">
                {cs.solution.architecturePoints.slice(0, 2).map((tier, i) => (
                  <div key={i} className="rounded-lg border border-line/60 bg-canvas/40 p-2.5">
                    <span className="font-mono text-[10px] font-bold text-accent block">
                      0{i + 1}. {tier.title}
                    </span>
                    <p className="text-[11px] text-muted line-clamp-2 mt-0.5">
                      {tier.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* =======================================================
            COLUMN 3 (RIGHT: 3 COLS)
            Screenshot 3 (Mobile UI) + Screenshot 6 / Metric Card 2
           ======================================================= */}
        <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-5">
          {/* Screenshot 3 (Mobile UI with Phone Viewport Frame) */}
          {mobileScreenshot ? (
            <div
              onClick={() => setActiveLightbox(mobileScreenshot)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card p-3 flex flex-col items-center transition-all duration-300 hover:border-accent hover:shadow-md"
            >
              <div className="flex items-center justify-between w-full font-mono text-[9px] text-muted mb-2 px-1 uppercase">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="size-3 text-accent" />
                  <span>Mobile UI View</span>
                </div>
                <Maximize2 className="size-3 opacity-0 group-hover:opacity-100 text-accent transition-opacity" />
              </div>
              {/* Phone Mockup Frame - Authentic 9:18 Mobile Shape */}
              <div
                className="relative w-full max-w-[210px] overflow-hidden rounded-2xl border border-line/80 bg-canvas shadow-inner"
                style={getImageAspectStyle(mobileScreenshot)}
              >
                <Image
                  src={mobileScreenshot.src}
                  alt={mobileScreenshot.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 20vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="pt-2 px-1 text-center w-full">
                <span className="font-mono text-[10px] text-accent block line-clamp-1">
                  {mobileScreenshot.title}
                </span>
                {mobileScreenshot.caption && (
                  <span className="font-sans text-[11px] text-muted line-clamp-1">
                    {mobileScreenshot.caption}
                  </span>
                )}
              </div>
            </div>
          ) : (
            /* Fallback Architecture Card */
            <div className="relative overflow-hidden rounded-2xl border border-line bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="size-4 text-accent" />
                <h4 className="font-mono text-xs font-bold text-fg uppercase">
                  Core Engine
                </h4>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                {cs.solution.summary}
              </p>
            </div>
          )}

          {/* Screenshot 6 or Fallback Metric Card 2 */}
          {screenshot6 ? (
            <div
              onClick={() => setActiveLightbox(screenshot6)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card p-2 flex flex-col transition-all duration-300 hover:border-accent hover:shadow-md"
            >
              <div
                className="relative w-full overflow-hidden rounded-xl bg-canvas"
                style={getImageAspectStyle(screenshot6)}
              >
                <Image
                  src={screenshot6.src}
                  alt={screenshot6.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-contain sm:object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 rounded-md bg-canvas/80 p-1 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="size-3 text-accent" />
                </div>
              </div>
              <div className="pt-2 px-1">
                <span className="font-mono text-[10px] text-accent block line-clamp-1">
                  {screenshot6.title}
                </span>
                {screenshot6.caption && (
                  <span className="font-sans text-[11px] text-muted line-clamp-1">
                    {screenshot6.caption}
                  </span>
                )}
              </div>
            </div>
          ) : stat2 ? (
            <div className="relative flex flex-col justify-between min-h-[160px] overflow-hidden rounded-2xl border border-line bg-card p-5 transition-all hover:border-accent">
              <div className="flex items-center justify-between text-muted mb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
                  VERIFIED IMPACT
                </span>
                <TrendingUp className="size-4 text-accent" />
              </div>
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-black text-fg tracking-tight">
                  {stat2.value}
                </div>
                <div className="mt-1 font-sans text-xs font-bold text-fg">
                  {stat2.label}
                </div>
                {stat2.detail && (
                  <div className="font-mono text-[10px] text-muted mt-0.5">
                    {stat2.detail}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Extended Showcase Row for Remaining Screenshots (e.g. Article View, etc.) */}
      {remainingScreenshots.length > 0 && (
        <div className="mt-6 pt-6 border-t border-line/60">
          <div className="flex items-center gap-2 mb-4 font-mono text-[11px] text-muted uppercase tracking-wider">
            <Layers className="size-3.5 text-accent" />
            <span>Additional Feature Interfaces & Deep Dive Views</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {remainingScreenshots.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveLightbox(item)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-card p-3 flex flex-col transition-all duration-300 hover:border-accent hover:shadow-lg"
              >
                <div
                  className="relative w-full overflow-hidden rounded-xl bg-canvas"
                  style={getImageAspectStyle(item)}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute top-2.5 right-2.5 rounded-md bg-canvas/80 p-1.5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="size-3.5 text-accent" />
                  </div>
                </div>
                <div className="pt-3 px-1 flex items-baseline justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-accent block">
                      {item.title}
                    </span>
                    {item.caption && (
                      <span className="font-sans text-xs text-muted mt-0.5 block">
                        {item.caption}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[10px] text-muted uppercase shrink-0">
                    {item.type || "View"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =======================================================
          INTERACTIVE FULLSCREEN LIGHTBOX MODAL
          Preserves 100% natural shape, aspect ratio, and resolution
         ======================================================= */}
      {activeLightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLightbox.title}
          onClick={closeLightbox}
          className="fixed inset-0 bg-canvas/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          style={{ zIndex: 2147483647 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col rounded-2xl border border-line bg-card shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex h-11 items-center justify-between border-b border-line bg-canvas/90 px-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-fg">
                  {activeLightbox.title}
                </span>
                {activeLightbox.type && (
                  <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent uppercase font-bold">
                    {activeLightbox.type}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="rounded-lg p-1 text-muted hover:text-fg hover:bg-line/40 transition-colors"
                aria-label="Close image modal"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Image Viewport - Full Natural Aspect Ratio with object-contain */}
            <div className="relative w-full flex-1 min-h-[300px] max-h-[75vh] bg-canvas flex items-center justify-center p-2 sm:p-4">
              <div
                className="relative w-full h-full max-h-[70vh]"
                style={getImageAspectStyle(activeLightbox)}
              >
                <Image
                  src={activeLightbox.src}
                  alt={activeLightbox.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Modal Caption Footer */}
            {activeLightbox.caption && (
              <div className="border-t border-line bg-card px-4 py-2.5 flex items-center justify-between text-xs text-muted">
                <span className="font-sans">{activeLightbox.caption}</span>
                <span className="font-mono text-[10px] text-accent">ESC to close</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
