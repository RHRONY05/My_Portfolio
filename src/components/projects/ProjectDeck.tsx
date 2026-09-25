"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Layers, Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { projects } from "@/data/projects";

export function ProjectDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");

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
    <section
      id="projects"
      className="relative mx-auto flex w-full max-w-full flex-col items-center overflow-x-clip px-4 pt-36 sm:pt-48 lg:pt-60 pb-24 md:pb-32 md:px-8 scroll-mt-0"
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
                onClick={() => setActiveIndex(index)}
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
                className={`absolute top-4 flex h-[500px] w-[320px] cursor-pointer flex-col overflow-hidden rounded-2xl border select-none transition-shadow duration-300 sm:h-[540px] sm:w-[410px] md:h-[580px] md:w-[500px] ${
                  isCenter
                    ? "border-accent bg-card shadow-[0_20px_50px_rgba(var(--color-accent-rgb),0.25)] ring-1 ring-accent/30"
                    : isInnerWing
                    ? "border-line bg-card/95 shadow-2xl hover:border-accent/70"
                    : "border-line/40 bg-card/60 shadow-md hover:border-accent/60"
                }`}
              >
                {/* Comic Issue Header Strip */}
                <div className="flex items-center justify-between border-b border-line bg-canvas/80 px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <span className="rounded bg-accent/15 px-2.5 py-0.5 font-mono text-xs font-bold text-accent">
                      ISSUE #{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[11px] text-muted tracking-widest uppercase">
                      VOL. 1 // ARCHIVE
                    </span>
                  </div>
                  <div className="flex items-center gap-1 opacity-70">
                    <div className="h-3.5 w-0.5 bg-muted/50" />
                    <div className="h-3.5 w-1 bg-muted/80" />
                    <div className="h-3.5 w-0.5 bg-muted/50" />
                    <div className="h-3.5 w-1.5 bg-muted/70" />
                  </div>
                </div>

                {/* Card Interior: Expanded Container for Rich Content */}
                <div className="relative flex flex-1 flex-col p-5 md:p-6">
                  {/* Category Pill & Status */}
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold tracking-widest text-accent uppercase">
                      {project.category}
                    </span>
                    {isCenter ? (
                      <span className="flex items-center gap-1 font-mono text-[10px] text-secondary">
                        <Sparkles className="size-3 text-secondary" />
                        IN FOCUS
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-muted/50 uppercase">
                        {isInnerWing ? "FIELD ACTIVE" : "ARCHIVED"}
                      </span>
                    )}
                  </div>

                  {/* Main Expanded Artwork / Mockup Box (Classic 16:10 or 3:2 Ratio) */}
                  <div className="relative flex h-[210px] sm:h-[235px] md:h-[260px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-line/80 bg-canvas/50 p-4 text-center transition-colors">
                    {/* Dynamic theme blueprint grid background */}
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(var(--color-accent-rgb),0.3)_1px,transparent_1px)] [background-size:14px_14px]"
                    />

                    {/* Placeholder Icon */}
                    <div className="relative z-10 flex size-14 items-center justify-center rounded-2xl border border-line bg-card shadow-inner">
                      <Layers className="size-6 text-accent/80" />
                    </div>

                    {/* Wireframe Placeholder Label */}
                    <span className="relative z-10 mt-3 font-mono text-xs font-semibold tracking-wider text-fg uppercase">
                      [ COVER ART / SCREENSHOT CONTAINER ]
                    </span>
                    <span className="relative z-10 mt-1 font-mono text-[10px] text-muted">
                      GENEROUS ASPECT RATIO • HIGH FLEXIBILITY
                    </span>
                  </div>

                  {/* Project Title Box (Wide Format) */}
                  <div className="mt-4 flex flex-col">
                    <h3 className="line-clamp-1 font-sans text-lg font-bold text-fg md:text-xl">
                      {project.title}
                    </h3>
                    {project.description ? (
                      <p className="mt-1.5 line-clamp-2 text-body text-xs text-muted/80">
                        {project.description}
                      </p>
                    ) : (
                      <p className="mt-1.5 line-clamp-2 text-body text-xs italic text-muted/50">
                        Mission specification & autonomous system architecture payload slot.
                      </p>
                    )}

                    {/* Tech Stack Pill Badges Row */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-line bg-canvas px-2.5 py-0.5 font-mono text-[10px] text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="rounded-md border border-line/60 bg-canvas/60 px-2 py-0.5 font-mono text-[10px] text-muted/60">
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Strip */}
                  <div className="mt-auto flex items-center justify-between border-t border-line/60 pt-3 font-mono text-[11px] text-muted">
                    <span>ID: {project.id.slice(0, 10)}</span>
                    <span className="text-accent font-medium">
                      {isCenter ? "ACTIVE SPOTLIGHT" : "CLICK TO FOCUS"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          MINIMALIST PAGINATION DOTS (Dynamic Theme Tokens)
         ======================================================== */}
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
  );
}
