"use client";

import Image from "next/image";
import { Cpu, Terminal, TrendingUp, CheckCircle2, Layers, Smartphone } from "lucide-react";
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

export function ProjectMasonryGallery({ project }: ProjectMasonryGalleryProps) {
  const cs = project.caseStudy;
  const stat1 = cs.stats[0];
  const stat2 = cs.stats[1];
  const snippet = PROJECT_SNIPPETS[project.id];
  const gallery = project.gallery || [];

  // Separate mobile screenshots from desktop/feature screenshots to avoid duplicates
  const mobileScreenshot = gallery.find((g) => g.type === "mobile");
  const nonMobileScreenshots = gallery.filter((g) => g !== mobileScreenshot);

  const screenshot2 = nonMobileScreenshots[0];
  const screenshot4 = nonMobileScreenshots[1];
  const screenshot5 = nonMobileScreenshots[2];
  const screenshot6 = nonMobileScreenshots[3] || (!mobileScreenshot ? gallery[4] : undefined);
  const remainingScreenshots = nonMobileScreenshots.slice(mobileScreenshot ? 4 : 5);

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
            <div className="group relative overflow-hidden rounded-2xl border border-line bg-card shadow-lg transition-all duration-300 hover:border-accent hover:shadow-[0_12px_32px_rgba(var(--color-accent-rgb),0.15)]">
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
                <span className="font-mono text-[9px] uppercase tracking-wider text-accent font-bold">
                  PRIMARY INTERFACE
                </span>
              </div>

              {/* Viewport Image */}
              <div className="relative h-[280px] sm:h-[340px] md:h-[360px] w-full overflow-hidden bg-canvas">
                <Image
                  src={project.image}
                  alt={`${project.title} Primary UI`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          )}

          {/* Bottom Split Row: Screenshot 5 + Metric Card 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Screenshot 5 or Code Snippet */}
            {screenshot5 ? (
              <div className="group relative overflow-hidden rounded-2xl border border-line bg-card p-2 flex flex-col justify-between">
                <div className="relative h-[160px] w-full overflow-hidden rounded-xl bg-canvas">
                  <Image
                    src={screenshot5.src}
                    alt={screenshot5.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
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
              <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-card p-5 transition-all hover:border-accent">
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
          {/* Screenshot 2 (Sub-feature / Catalog) */}
          {screenshot2 ? (
            <div className="group relative overflow-hidden rounded-2xl border border-line bg-card p-2 flex flex-col">
              <div className="relative h-[220px] sm:h-[240px] w-full overflow-hidden rounded-xl bg-canvas">
                <Image
                  src={screenshot2.src}
                  alt={screenshot2.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
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

          {/* Screenshot 4 (Architecture Flow or Architecture Nodes) */}
          {screenshot4 ? (
            <div className="group relative overflow-hidden rounded-2xl border border-line bg-card p-2 flex flex-col">
              <div className="relative h-[220px] sm:h-[240px] w-full overflow-hidden rounded-xl bg-canvas">
                <Image
                  src={screenshot4.src}
                  alt={screenshot4.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
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
            <div className="group relative overflow-hidden rounded-2xl border border-line bg-card p-3 flex flex-col items-center">
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted mb-2 self-start uppercase">
                <Smartphone className="size-3 text-accent" />
                <span>Mobile UI View</span>
              </div>
              {/* Phone Mockup Frame */}
              <div className="relative h-[280px] sm:h-[300px] w-full max-w-[210px] overflow-hidden rounded-2xl border border-line/80 bg-canvas shadow-inner">
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
            <div className="group relative overflow-hidden rounded-2xl border border-line bg-card p-2 flex flex-col">
              <div className="relative h-[180px] sm:h-[200px] w-full overflow-hidden rounded-xl bg-canvas">
                <Image
                  src={screenshot6.src}
                  alt={screenshot6.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
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
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-card p-5 transition-all hover:border-accent">
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

      {/* Optional remaining screenshots row if project has > 6 images */}
      {remainingScreenshots.length > 0 && (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {remainingScreenshots.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-line bg-card p-2 flex flex-col"
            >
              <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-canvas">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="pt-2 px-1">
                <span className="font-mono text-[10px] text-accent block line-clamp-1">
                  {item.title}
                </span>
                {item.caption && (
                  <span className="font-sans text-[11px] text-muted line-clamp-1">
                    {item.caption}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
