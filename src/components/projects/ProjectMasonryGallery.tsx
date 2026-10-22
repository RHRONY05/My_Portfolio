"use client";

import Image from "next/image";
import { Cpu, Terminal, TrendingUp, CheckCircle2, Layers } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectMasonryGalleryProps {
  project: Project;
}

const PROJECT_SNIPPETS: Record<string, { title: string; lang: string; code: string }> = {
  "shopmate-ai": {
    title: "pgvector Semantic Cosine Distance Query",
    lang: "SQL",
    code: `SELECT j.id, j.title, j.base_price,
       1 - (je.embedding <=> $1::vector) AS similarity
FROM jersey_embeddings je
JOIN jerseys j ON j.id = je.jersey_id
ORDER BY je.embedding <=> $1::vector ASC
LIMIT 5;`,
  },
  "vocab-app": {
    title: "Leitner 5-Box Interval & Weakness Scoring",
    lang: "TypeScript",
    code: `const LEITNER_SCHEDULE_DAYS = [1, 3, 7, 14, 30] as const;

function calculateNextReview(box: number, isCorrect: boolean): Date {
  const nextBox = isCorrect ? Math.min(box + 1, 5) : 1;
  const days = LEITNER_SCHEDULE_DAYS[nextBox - 1];
  return new Date(Date.now() + days * 86400000);
}`,
  },
  "movie-booking": {
    title: "ACID Concurrency Row-Level Lock",
    lang: "SQL",
    code: `BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- Lock seat record to prevent dirty checkout race
SELECT id, status FROM seats 
WHERE id = $1 FOR UPDATE;

INSERT INTO reservations (seat_id, user_id, expires_at)
VALUES ($1, $2, NOW() + INTERVAL '10 minutes');
COMMIT;`,
  },
  sabaihealth: {
    title: "Digital NDA Canvas Cryptographic Audit Stamp",
    lang: "TypeScript",
    code: `export function generateAuditSeal(signatureBlob: Blob, meta: SignatureMeta) {
  const payload = \`\${meta.ip}:\${meta.timestamp}:\${meta.partnerId}\`;
  return crypto.subtle.digest("SHA-256", new TextEncoder().encode(payload));
}`,
  },
  portfolio: {
    title: "WebGL Context Deduplication & Lazy Mount",
    lang: "TypeScript",
    code: `// Ensure strict 1 WebGL canvas active across responsive viewports
<LazyViewportMount fallback={<LoadingDossier />}>
  {() => isDesktop ? <Book3DCanvas /> : <MobileDossier />}
</LazyViewportMount>`,
  },
};

export function ProjectMasonryGallery({ project }: ProjectMasonryGalleryProps) {
  const cs = project.caseStudy;
  const stat1 = cs.stats[0];
  const stat2 = cs.stats[1];
  const stat3 = cs.stats[2];
  const snippet = PROJECT_SNIPPETS[project.id];

  return (
    <div className="w-full my-8 sm:my-12">
      {/* Native CSS Column Masonry for butter-smooth Pinterest layout */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [&>*]:break-inside-avoid [&>*]:mb-5">
        {/* 1. PRIMARY UI SCREENSHOT (Wide Browser Frame) */}
        {project.image && (
          <div className="group relative overflow-hidden rounded-2xl border border-line bg-card shadow-lg transition-all duration-300 hover:border-accent hover:shadow-[0_12px_32px_rgba(var(--color-accent-rgb),0.15)]">
            {/* Browser Window Header */}
            <div className="flex h-9 items-center justify-between border-b border-line bg-canvas/90 px-3.5 backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#FF5F56]/80" />
                <span className="size-2 rounded-full bg-[#FFBD2E]/80" />
                <span className="size-2 rounded-full bg-[#27C93F]/80" />
                <span className="ml-2 font-mono text-[10px] text-muted truncate max-w-[180px]">
                  rhrony05.me/projects/{project.id}
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-accent font-bold">
                PRIMARY UI
              </span>
            </div>

            {/* Viewport Image */}
            <div className="relative h-[280px] sm:h-[340px] w-full overflow-hidden bg-canvas">
              <Image
                src={project.image}
                alt={`${project.title} Primary UI Screenshot`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        )}

        {/* 2. ARCHITECTURE / SYSTEM FLOW CARD */}
        {cs.solution.architecturePoints.length > 0 && (
          <div className="relative overflow-hidden rounded-2xl border border-line bg-card p-5 sm:p-6 transition-all hover:border-accent">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="size-4 text-accent" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-fg">
                  System Architecture
                </h3>
              </div>
              <span className="font-mono text-[10px] text-muted">
                {cs.solution.architecturePoints.length} NODES
              </span>
            </div>

            <div className="space-y-3">
              {cs.solution.architecturePoints.slice(0, 3).map((tier, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-line/60 bg-canvas/40 p-3.5"
                >
                  <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-accent">
                    <span>0{idx + 1}.</span>
                    <span>{tier.title}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-3">
                    {tier.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. KEY METRIC CARD 1 */}
        {stat1 && (
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-card p-6 transition-all hover:border-accent hover:shadow-[0_10px_25px_rgba(var(--color-accent-rgb),0.1)]">
            <div className="flex items-center justify-between text-muted mb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
                KEY METRIC // 01
              </span>
              <TrendingUp className="size-4 text-accent" />
            </div>

            <div className="my-2">
              <div className="font-mono text-4xl sm:text-5xl font-black text-fg tracking-tight">
                {stat1.value}
              </div>
              <div className="mt-2 font-sans text-sm font-bold text-fg">
                {stat1.label}
              </div>
              {stat1.detail && (
                <div className="mt-1 font-mono text-xs text-muted">
                  {stat1.detail}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. CODE / ENGINE CONTRACT CARD */}
        {snippet ? (
          <div className="relative overflow-hidden rounded-2xl border border-line bg-card p-4 sm:p-5">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-line/60">
              <div className="flex items-center gap-2">
                <Terminal className="size-3.5 text-accent" />
                <span className="font-mono text-xs font-bold text-fg">
                  {snippet.title}
                </span>
              </div>
              <span className="font-mono text-[10px] rounded border border-line px-1.5 py-0.5 text-muted">
                {snippet.lang}
              </span>
            </div>

            <pre className="font-mono text-[11px] text-muted overflow-x-auto p-3 rounded-xl bg-canvas/70 leading-relaxed [scrollbar-width:none]">
              <code>{snippet.code}</code>
            </pre>
          </div>
        ) : stat2 ? (
          /* Fallback Metric Card 2 */
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-card p-6 transition-all hover:border-accent">
            <div className="flex items-center justify-between text-muted mb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
                KEY METRIC // 02
              </span>
              <TrendingUp className="size-4 text-accent" />
            </div>

            <div className="my-2">
              <div className="font-mono text-4xl sm:text-5xl font-black text-fg tracking-tight">
                {stat2.value}
              </div>
              <div className="mt-2 font-sans text-sm font-bold text-fg">
                {stat2.label}
              </div>
              {stat2.detail && (
                <div className="mt-1 font-mono text-xs text-muted">
                  {stat2.detail}
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* 5. SUB-FEATURE HIGHLIGHTS CARD */}
        {project.features.length > 0 && (
          <div className="relative overflow-hidden rounded-2xl border border-line bg-card p-5 sm:p-6 transition-all hover:border-accent">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="size-4 text-accent" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-fg">
                  Core Sub-Features
                </h3>
              </div>
              <span className="font-mono text-[10px] text-muted">HIGHLIGHTS</span>
            </div>

            <div className="space-y-2.5">
              {project.features.slice(0, 3).map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 rounded-xl border border-line/50 bg-canvas/40 p-3"
                >
                  <CheckCircle2 className="size-3.5 text-accent shrink-0 mt-0.5" />
                  <span className="text-xs text-fg/90 leading-relaxed">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. SECONDARY METRIC CARD 3 */}
        {stat3 && (
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-card p-6 transition-all hover:border-accent">
            <div className="flex items-center justify-between text-muted mb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
                KEY METRIC // 03
              </span>
              <TrendingUp className="size-4 text-accent" />
            </div>

            <div className="my-2">
              <div className="font-mono text-4xl sm:text-5xl font-black text-fg tracking-tight">
                {stat3.value}
              </div>
              <div className="mt-2 font-sans text-sm font-bold text-fg">
                {stat3.label}
              </div>
              {stat3.detail && (
                <div className="mt-1 font-mono text-xs text-muted">
                  {stat3.detail}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
