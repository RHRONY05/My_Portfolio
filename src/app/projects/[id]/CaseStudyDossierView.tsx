"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Layers,
  Sparkles,
  Terminal,
  TrendingUp,
  Workflow,
} from "lucide-react";
import type { Project } from "@/data/projects";

interface CaseStudyDossierViewProps {
  project: Project;
  prevProject: Project;
  nextProject: Project;
}

type ChapterId = "all" | "challenge" | "architecture" | "highlights" | "results";

const chapters: { id: ChapterId; num: string; label: string }[] = [
  { id: "all", num: "ALL", label: "Full Dossier" },
  { id: "challenge", num: "01", label: "The Challenge" },
  { id: "architecture", num: "02", label: "Architecture & Build" },
  { id: "highlights", num: "03", label: "Engineering Highlights" },
  { id: "results", num: "04", label: "Results & Impact" },
];

export function CaseStudyDossierView({
  project,
  prevProject,
  nextProject,
}: CaseStudyDossierViewProps) {
  const [activeChapter, setActiveChapter] = useState<ChapterId>("all");

  const cs = project.caseStudy;

  const scrollToChapter = (id: ChapterId) => {
    setActiveChapter(id);
    if (id !== "all") {
      const el = document.getElementById(`chapter-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="w-full">
      {/* Chapter Selection Tabs (Multi-page / Multi-chapter dossier controls) */}
      <div className="sticky top-16 z-30 mb-12 sm:mb-16 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-canvas/90 backdrop-blur-md border-b border-line/60">
        <div className="flex items-center justify-between gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {chapters.map((ch) => {
              const isActive = activeChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => scrollToChapter(ch.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-1.5 font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-accent text-on-accent shadow-sm"
                      : "border border-line/80 bg-card/80 text-muted hover:text-fg hover:border-accent/60"
                  }`}
                >
                  <span className={`text-[10px] ${isActive ? "text-on-accent/70" : "text-accent"}`}>
                    {ch.num}
                  </span>
                  <span>{ch.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3 font-mono text-xs text-muted">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            <span>CASE STUDY DOSSIER // {project.id}</span>
          </div>
        </div>
      </div>

      {/* Hero Showcase Browser Viewport */}
      <div className="mb-14 sm:mb-20 overflow-hidden rounded-2xl sm:rounded-3xl border border-line bg-card shadow-2xl">
        {/* Browser Chrome Header */}
        <div className="flex h-11 items-center justify-between border-b border-line bg-canvas/80 px-4 sm:px-6 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-accent/30" />
            <span className="size-3 rounded-full bg-line" />
            <span className="size-3 rounded-full bg-line" />
            <span className="ml-3 font-mono text-xs text-muted truncate max-w-[220px] sm:max-w-md">
              rhrony05.me/projects/{project.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.status === "live" ? (
              <span className="inline-flex items-center gap-1 rounded bg-accent/15 px-2 py-0.5 font-mono text-[10px] font-bold text-accent">
                <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                VERIFIED PRODUCTION SYSTEM
              </span>
            ) : (
              <span className="rounded border border-line bg-card px-2 py-0.5 font-mono text-[10px] font-bold text-muted">
                PROTOTYPE ARCHITECTURE
              </span>
            )}
          </div>
        </div>

        {/* Viewport Image Area */}
        {project.image ? (
          <div className="relative h-[280px] sm:h-[460px] md:h-[580px] lg:h-[660px] w-full overflow-hidden bg-canvas">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="relative flex h-[340px] sm:h-[420px] w-full flex-col items-center justify-center p-8 text-center bg-canvas">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(rgba(var(--color-accent-rgb),0.25)_1px,transparent_1px)] [background-size:20px_20px]"
            />
            <Terminal className="size-12 text-accent mb-4" />
            <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">
              SYSTEM SCHEMATIC IN PROGRESS
            </span>
            <h3 className="mt-2 font-sans text-2xl font-bold text-fg max-w-md">
              {project.title}
            </h3>
            <p className="mt-2 text-xs text-muted max-w-sm">
              Architecture documentation and benchmark metrics compiled below.
            </p>
          </div>
        )}
      </div>

      {/* Case Study Content Chapters */}
      <div className="space-y-16 sm:space-y-24">
        {/* CHAPTER 01: THE CHALLENGE */}
        {(activeChapter === "all" || activeChapter === "challenge") && (
          <section
            id="chapter-challenge"
            className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-16 pt-6 border-t border-line/60 scroll-mt-28"
          >
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-accent font-bold">
                // 01 CHAPTER
              </span>
              <h3 className="mt-1 font-sans text-2xl sm:text-3xl font-black text-fg">
                The Challenge
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted">
                What problem was being solved, and what were the core bottlenecks?
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-base sm:text-lg text-fg/90 leading-relaxed font-sans">
                {cs.challenge.summary}
              </p>

              {cs.challenge.points.length > 0 && (
                <div className="rounded-2xl border border-line bg-card/60 p-5 sm:p-6 backdrop-blur-sm">
                  <h4 className="font-mono text-xs font-bold text-accent uppercase tracking-wider mb-3">
                    Core Technical Bottlenecks
                  </h4>
                  <ul className="space-y-2.5">
                    {cs.challenge.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted">
                        <span className="mt-1 size-1.5 rounded-full bg-accent shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CHAPTER 02: ARCHITECTURE & BUILD */}
        {(activeChapter === "all" || activeChapter === "architecture") && (
          <section
            id="chapter-architecture"
            className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-16 pt-6 border-t border-line/60 scroll-mt-28"
          >
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-accent font-bold">
                // 02 CHAPTER
              </span>
              <h3 className="mt-1 font-sans text-2xl sm:text-3xl font-black text-fg">
                Architecture & Build
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted">
                Decoupled system architecture, technical design, and core implementation decisions.
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-base sm:text-lg text-fg/90 leading-relaxed font-sans">
                {cs.solution.summary}
              </p>

              {/* Architecture Points Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cs.solution.architecturePoints.map((arch, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between rounded-2xl border border-line bg-card/70 p-5 sm:p-6 backdrop-blur-sm transition-all hover:border-[var(--color-card-hover-border)] hover:shadow-[0_8px_24px_var(--color-card-hover-glow)]"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <Cpu className="size-4 text-accent" />
                        <h4 className="font-sans text-sm sm:text-base font-bold text-fg">
                          {arch.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        {arch.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CHAPTER 03: KEY HIGHLIGHTS */}
        {(activeChapter === "all" || activeChapter === "highlights") && (
          <section
            id="chapter-highlights"
            className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-16 pt-6 border-t border-line/60 scroll-mt-28"
          >
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-accent font-bold">
                // 03 CHAPTER
              </span>
              <h3 className="mt-1 font-sans text-2xl sm:text-3xl font-black text-fg">
                Engineering Highlights
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted">
                Key features, tools, and developer ergonomics engineered into this build.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {project.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-line bg-card/60 p-4"
                  >
                    <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-fg/90 leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {cs.keyHighlights.length > 0 && (
                <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/5 p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="size-4 text-accent" />
                    <h4 className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                      Architectural Takeaways & Decisions
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {cs.keyHighlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted">
                        <span className="font-mono text-accent text-xs">→</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CHAPTER 04: RESULTS & IMPACT */}
        {(activeChapter === "all" || activeChapter === "results") && (
          <section
            id="chapter-results"
            className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-16 pt-6 border-t border-line/60 scroll-mt-28"
          >
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-accent font-bold">
                // 04 CHAPTER
              </span>
              <h3 className="mt-1 font-sans text-2xl sm:text-3xl font-black text-fg">
                Results & Impact
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted">
                Quantified performance metrics, benchmark validations, and operational impact.
              </p>
            </div>

            <div className="space-y-6">
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {cs.stats.map((st, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between rounded-2xl border border-line bg-card/80 p-5 backdrop-blur-sm"
                  >
                    <div className="font-mono text-2xl sm:text-3xl font-black text-accent tracking-tight">
                      {st.value}
                    </div>
                    <div className="mt-2">
                      <div className="font-sans text-xs sm:text-sm font-bold text-fg">
                        {st.label}
                      </div>
                      {st.detail && (
                        <div className="font-mono text-[10px] text-muted mt-0.5">
                          {st.detail}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Outcome Banner */}
              <div className="rounded-2xl border border-line bg-card/50 p-6 flex items-center gap-4">
                <TrendingUp className="size-8 text-accent shrink-0" />
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold">
                    Primary Measured Result
                  </span>
                  <p className="font-sans text-base sm:text-lg font-bold text-fg mt-0.5">
                    {cs.outcome}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Inter-Case Study Navigation (Next / Previous Project) */}
      <div className="mt-20 sm:mt-28 pt-10 border-t border-line/60">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs font-bold text-muted uppercase tracking-widest">
            MORE ARCHITECTURES & CASE STUDIES
          </span>
          <Link
            href="/projects"
            className="font-mono text-xs font-bold text-accent hover:text-secondary inline-flex items-center gap-1"
          >
            <span>All 10 Projects</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Previous Case Study */}
          <Link
            href={`/projects/${prevProject.id}`}
            className="group flex flex-col justify-between rounded-2xl border border-line bg-card/60 p-6 transition-all hover:border-accent hover:bg-card hover:shadow-lg"
          >
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-muted mb-2">
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                <span>PREVIOUS CASE STUDY</span>
              </div>
              <h4 className="font-sans text-lg font-bold text-fg group-hover:text-accent transition-colors line-clamp-1">
                {prevProject.title}
              </h4>
              <p className="mt-1 text-xs text-muted line-clamp-2">
                {prevProject.description}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 font-mono text-[11px] text-accent">
              <span>Read dossier</span>
              <span>←</span>
            </div>
          </Link>

          {/* Next Case Study */}
          <Link
            href={`/projects/${nextProject.id}`}
            className="group flex flex-col justify-between rounded-2xl border border-line bg-card/60 p-6 transition-all hover:border-accent hover:bg-card hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-end gap-2 font-mono text-xs text-muted mb-2">
                <span>NEXT CASE STUDY</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <h4 className="font-sans text-lg font-bold text-fg group-hover:text-accent transition-colors text-right line-clamp-1">
                {nextProject.title}
              </h4>
              <p className="mt-1 text-xs text-muted text-right line-clamp-2">
                {nextProject.description}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-end gap-1.5 font-mono text-[11px] text-accent">
              <span>Read dossier</span>
              <span>→</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
