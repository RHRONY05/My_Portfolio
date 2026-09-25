"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  Layers,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { projects, type Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";

export function ProjectDeck() {
  const defaultIndex = projects.findIndex((p) => p.id === "sabaihealth");
  const [activeIndex, setActiveIndex] = useState(defaultIndex >= 0 ? defaultIndex : 0);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const total = projects.length;

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("mobile");
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Helper to calculate shortest circular distance between any card and active card
  const getOffset = (index: number) => {
    let diff = index - activeIndex;
    while (diff > total / 2) diff -= total;
    while (diff < -total / 2) diff += total;
    return diff;
  };

  // Horizontal spacing calibrated for 500px desktop card
  const getTranslateX = (offset: number) => {
    const sign = Math.sign(offset);
    const abs = Math.abs(offset);
    if (abs === 0) return 0;
    if (screenSize === "mobile") {
      return abs === 1 ? sign * 145 : sign * 215;
    }
    if (screenSize === "tablet") {
      return abs === 1 ? sign * 220 : sign * 330;
    }
    // Desktop: inner cards reveal ~62%, outer cards tuck behind
    return abs === 1 ? sign * 300 : sign * 430;
  };

  return (
    <>
      <section
        id="projects"
        className="relative z-10 isolate mx-auto flex w-full max-w-full flex-col items-center overflow-x-clip px-4 pt-36 sm:pt-48 lg:pt-60 pb-24 md:pb-32 md:px-8 scroll-mt-0"
      >
        {/* Dynamic theme ambient backdrop glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(var(--color-accent-rgb),0.12)_0%,transparent_70%)] blur-[120px]"
        />

        {/* ========================================================
            THE FANNED DECK STAGE WITH FLOATING CHEVRON CONTROLS
           ======================================================== */}
        <div className="relative flex h-[640px] sm:h-[690px] md:h-[740px] lg:h-[770px] w-full max-w-[1360px] items-center justify-center overflow-visible">
          {/* Floating Left Arrow */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous project"
            className="absolute left-2 sm:left-4 lg:left-8 z-50 flex size-12 items-center justify-center rounded-full border border-line bg-card/90 text-muted backdrop-blur-md transition-all hover:scale-110 hover:border-accent hover:text-accent shadow-xl"
          >
            <ChevronLeft className="size-6" />
          </button>

          {/* Floating Right Arrow */}
          <button
            type="button"
            onClick={next}
            aria-label="Next project"
            className="absolute right-2 sm:right-4 lg:right-8 z-50 flex size-12 items-center justify-center rounded-full border border-line bg-card/90 text-muted backdrop-blur-md transition-all hover:scale-110 hover:border-accent hover:text-accent shadow-xl"
          >
            <ChevronRight className="size-6" />
          </button>

          {/* Card Stage Container */}
          <div className="relative flex h-full w-full items-center justify-center">
            {projects.map((project, index) => {
              const offset = getOffset(index);
              const isCenter = offset === 0;
              const isInnerWing = Math.abs(offset) === 1;
              const isOuterWing = Math.abs(offset) === 2;
              const isVisible = Math.abs(offset) <= 2;

              // Geometry calculations
              const x = getTranslateX(offset);
              const y = isCenter ? -14 : isInnerWing ? 20 : 46;
              const rotateZ = isCenter ? 0 : isInnerWing ? offset * 5.5 : offset * 10;
              const scale = isCenter ? 1.05 : isInnerWing ? 0.94 : 0.8;
              const opacity = isCenter ? 1 : isInnerWing ? 0.92 : isOuterWing ? 0.22 : 0;
              const zIndex = isCenter ? 40 : 30 - Math.abs(offset) * 5;

              return (
                <motion.div
                  key={project.id}
                  onClick={() => {
                    if (!isCenter) setActiveIndex(index);
                  }}
                  initial={false}
                  animate={{
                    x,
                    y,
                    rotateZ,
                    scale,
                    opacity,
                  }}
                  whileHover={{
                    y: isCenter ? -20 : y - 24,
                    rotateZ: offset * 2,
                    scale: scale * 1.03,
                    opacity: isOuterWing ? 0.85 : 1,
                    zIndex: 50,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 24,
                    mass: 0.8,
                  }}
                  style={{
                    transformOrigin: "bottom center",
                    willChange: "transform, opacity",
                    zIndex,
                    pointerEvents: isVisible ? "auto" : "none",
                  }}
                  className={`group/card absolute top-4 flex h-[500px] w-[320px] cursor-pointer flex-col overflow-hidden rounded-2xl border select-none transition-shadow duration-300 sm:h-[540px] sm:w-[410px] md:h-[580px] md:w-[500px] ${
                    isCenter
                      ? "border-accent bg-card shadow-[0_20px_50px_rgba(var(--color-accent-rgb),0.25)] ring-1 ring-accent/30"
                      : isInnerWing
                      ? "border-line bg-card/95 shadow-2xl hover:border-accent/70"
                      : "border-line/40 bg-card/60 shadow-md hover:border-accent/60"
                  }`}
                >
                  {/* Top Minimal Browser Frame Bar */}
                  <div className="flex h-10 shrink-0 items-center border-b border-line bg-canvas/90 px-4 backdrop-blur-sm z-20">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full bg-[#FF5F56]/80" />
                      <span className="size-2.5 rounded-full bg-[#FFBD2E]/80" />
                      <span className="size-2.5 rounded-full bg-[#27C93F]/80" />
                      <span className="ml-2.5 font-mono text-[10px] text-muted truncate max-w-[220px] sm:max-w-[300px]">
                        rhrony05/projects/{project.id}
                      </span>
                    </div>
                  </div>

                  {/* Main Full-Height Viewport */}
                  <div className="relative flex-1 w-full overflow-hidden bg-canvas">
                    {project.image ? (
                      <>
                        {/* Full Page Long Screenshot: Smoothly scrolls on hover */}
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={1200}
                          height={3500}
                          sizes="(max-width: 640px) 320px, (max-width: 1024px) 410px, 500px"
                          loading="lazy"
                          className="w-full h-auto object-cover object-top transition-transform duration-[7500ms] ease-in-out group-hover/card:-translate-y-[calc(100%-520px)]"
                        />

                        {/* Resting Bottom Gradient Bar (Shows title & tags when not hovered) */}
                        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-canvas via-canvas/80 to-transparent p-5 pt-12 transition-opacity duration-300 group-hover/card:opacity-0 pointer-events-none">
                          <span className="font-mono text-[10px] font-bold tracking-widest text-accent uppercase">
                            {project.category}
                          </span>
                          <h3 className="line-clamp-1 font-sans text-lg font-bold text-fg md:text-xl">
                            {project.title}
                          </h3>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {project.stack.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="rounded border border-line bg-card/90 px-2 py-0.5 font-mono text-[9px] text-muted"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* ON-HOVER CENTERED FROSTED GLASS ACTION CARD (Only for live projects with screenshots) */}
                        <div className="absolute inset-0 flex items-center justify-center p-4 bg-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 pointer-events-none group-hover/card:pointer-events-auto">
                          <div className="flex flex-col items-center text-center rounded-2xl border border-[rgba(var(--color-accent-rgb),0.25)] bg-[rgba(var(--color-card-rgb),0.4)] p-5 sm:p-6 shadow-[0_16px_36px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-md max-w-[90%] sm:max-w-[82%] transition-all">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="rounded-full border border-[rgba(var(--color-accent-rgb),0.3)] bg-[rgba(var(--color-accent-rgb),0.15)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-accent shadow-sm backdrop-blur-sm">
                                {project.category}
                              </span>
                              <span className="flex items-center gap-1 font-mono text-[10px] text-secondary drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                <Sparkles className="size-3 text-secondary" />
                                DEPLOYED
                              </span>
                            </div>

                            <h4 className="text-base font-bold text-fg sm:text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                              {project.title}
                            </h4>

                            <p className="mt-1.5 line-clamp-2 text-xs text-fg/85 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                              {project.description}
                            </p>

                            <div className="my-3 flex flex-wrap justify-center gap-1">
                              {project.stack.slice(0, 4).map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded border border-line/60 bg-[rgba(var(--color-canvas-rgb),0.5)] px-2 py-0.5 font-mono text-[9px] text-fg/90 shadow-sm backdrop-blur-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Action Buttons Row */}
                            <div className="mt-1 flex w-full items-center justify-center gap-2.5">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProject(project);
                                }}
                                className="flex items-center gap-1.5 rounded-lg border border-[rgba(var(--color-accent-rgb),0.3)] bg-[rgba(var(--color-card-rgb),0.6)] px-3.5 py-2 font-mono text-xs font-bold text-fg transition-all hover:bg-[rgba(var(--color-card-rgb),0.9)] hover:border-accent hover:text-accent shadow-md backdrop-blur-sm"
                              >
                                <Eye className="size-3.5" />
                                VIEW DETAILS
                              </button>

                              {project.live ? (
                                <a
                                  href={project.live}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 font-mono text-xs font-bold text-on-accent transition-all hover:opacity-90 shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.3)]"
                                >
                                  <ExternalLink className="size-3.5" />
                                  LIVE DEMO
                                </a>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Clean Single-Layer Coming Soon UI (Zero layer overflow) */
                      <div className="relative flex h-full w-full flex-col items-center justify-center p-6 sm:p-8 text-center select-none">
                        {/* Subtle blueprint dot grid */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(rgba(var(--color-accent-rgb),0.25)_1px,transparent_1px)] [background-size:16px_16px]"
                        />

                        {/* Category tag */}
                        <span className="relative z-10 mb-4 rounded-full border border-line/80 bg-card/90 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-accent uppercase shadow-sm">
                          {project.category}
                        </span>

                        {/* Bold & Big Project Title */}
                        <h3 className="relative z-10 font-sans text-2xl sm:text-3xl font-black tracking-tight text-fg max-w-[340px] leading-snug drop-shadow-sm">
                          {project.title}
                        </h3>

                        {/* Bold and Big COMING SOON Text */}
                        <div className="relative z-10 mt-6 flex items-center gap-2.5 rounded-xl border border-line/90 bg-card/95 px-6 py-3 shadow-xl backdrop-blur-sm">
                          <span className="size-2.5 rounded-full bg-accent animate-pulse" />
                          <span className="font-mono text-base sm:text-lg font-black tracking-widest text-accent uppercase">
                            COMING SOON
                          </span>
                        </div>

                        {/* Click to inspect planned specs */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="relative z-10 mt-6 flex items-center gap-2 rounded-lg border border-line/60 bg-card/60 px-4 py-2 font-mono text-xs font-semibold text-muted transition-all hover:border-accent hover:text-accent hover:bg-card shadow-sm cursor-pointer"
                        >
                          <Eye className="size-3.5" />
                          VIEW SPECS
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Minimalist Pagination Dots */}
        <div className="mt-6 flex items-center justify-center gap-2.5 z-40">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Jump to issue ${i + 1}`}
              className={`h-2 transition-all rounded-full ${
                i === activeIndex
                  ? "w-8 bg-accent shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.5)]"
                  : "w-2 bg-line hover:bg-muted"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Case Study Dossier Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
