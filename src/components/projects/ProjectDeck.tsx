"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { Layers, Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { projects } from "@/data/projects";

// The 5 balanced slots: 2 on the left, 1 in center, 2 on the right
const SLOTS = [-2, -1, 0, 1, 2] as const;

export function ProjectDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
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
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlot = (slot: number) => {
    if (slot === 0) return;
    setDirection(slot > 0 ? 1 : -1);
    setActiveIndex((prev) => (prev + slot + total * 100) % total);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Drag handler for swipe/flick
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 40;
    if (info.offset.x < -threshold) {
      next();
    } else if (info.offset.x > threshold) {
      prev();
    }
  };

  const activeProject = projects[activeIndex];

  // Build the 5 visible cards for the balanced slots:
  const visibleCards = SLOTS.map((slot) => {
    const projectIndex = (activeIndex + slot + total * 100) % total;
    return {
      slot,
      project: projects[projectIndex],
      projectIndex,
    };
  });

  // Balanced horizontal spacing scaled proportionately for:
  // Desktop: 500px card width (inner: ±310px reveals ~62%, outer: ±440px peeks out by ~130px)
  // Tablet: 410px card width (inner: ±220px, outer: ±330px)
  // Mobile: 320px card width (inner: ±145px, outer: ±215px)
  const getTranslateX = (slot: number) => {
    const sign = Math.sign(slot);
    const abs = Math.abs(slot);
    if (abs === 0) return 0;
    if (screenSize === "mobile") {
      return abs === 1 ? sign * 145 : sign * 215;
    }
    if (screenSize === "tablet") {
      return abs === 1 ? sign * 220 : sign * 330;
    }
    return abs === 1 ? sign * 310 : sign * 440;
  };

  const offscreenX = screenSize === "mobile" ? 280 : screenSize === "tablet" ? 420 : 560;

  return (
    <section
      id="projects"
      className="relative mx-auto flex w-full max-w-full flex-col items-center overflow-x-clip px-4 pt-36 sm:pt-48 lg:pt-60 pb-24 md:pb-32 md:px-8 scroll-mt-0"
    >
      {/* Background ambient gold glow behind active centerpiece */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-accent/5 blur-[160px]"
      />

      {/* ========================================================
          THE FANNED DECK STAGE (Deeply Tucked Outer Wings)
         ======================================================== */}
      <div className="relative flex h-[640px] sm:h-[690px] md:h-[740px] lg:h-[770px] w-full max-w-[1360px] items-center justify-center overflow-visible">
        <div className="relative flex h-full w-full items-center justify-center">
          <AnimatePresence mode="sync" custom={direction}>
            {visibleCards.map(({ slot, project, projectIndex }) => {
              const isCenter = slot === 0;
              const isInnerWing = Math.abs(slot) === 1;
              const isOuterWing = Math.abs(slot) === 2;

              // Arc geometry values
              const rotateZ = isCenter ? 0 : isInnerWing ? slot * 5.5 : slot * 10;
              const translateX = getTranslateX(slot);
              const translateY = isCenter ? 0 : isInnerWing ? 20 : 48;
              // Outer wings are smaller and tucked into the background
              const scale = isCenter ? 1.05 : isInnerWing ? 0.94 : 0.8;
              // Outer wings are significantly hidden with low opacity (0.2)
              const opacity = isCenter ? 1 : isInnerWing ? 0.92 : 0.2;
              const zIndex = isCenter ? 35 : isInnerWing ? 25 : 10;

              return (
                <motion.div
                  key={project.id}
                  custom={direction}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  onDragEnd={handleDragEnd}
                  onClick={() => goToSlot(slot)}
                  initial={{
                    x: direction > 0 ? offscreenX : -offscreenX,
                    opacity: 0,
                    scale: 0.7,
                    rotateZ: direction > 0 ? 15 : -15,
                  }}
                  animate={{
                    x: translateX,
                    y: translateY,
                    rotateZ,
                    scale,
                    opacity,
                    zIndex,
                  }}
                  exit={{
                    x: direction > 0 ? -offscreenX : offscreenX,
                    opacity: 0,
                    scale: 0.7,
                    rotateZ: direction > 0 ? -15 : 15,
                  }}
                  whileHover={{
                    y: isCenter ? -14 : translateY - 25,
                    rotateZ: slot * 2,
                    scale: scale * 1.04,
                    opacity: isOuterWing ? 0.8 : 1,
                    zIndex: 50,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    mass: 0.75,
                  }}
                  style={{
                    transformOrigin: "bottom center",
                  }}
                  className={`absolute top-4 flex h-[500px] w-[320px] cursor-pointer flex-col overflow-hidden rounded-2xl border select-none transition-shadow duration-300 sm:h-[540px] sm:w-[410px] md:h-[580px] md:w-[500px] ${
                    isCenter
                      ? "border-accent bg-card shadow-[0_18px_45px_rgba(229,184,105,0.26)] ring-1 ring-accent/40"
                      : isInnerWing
                      ? "border-line bg-card/95 shadow-2xl hover:border-accent/70"
                      : "border-line/40 bg-card/60 shadow-md hover:border-accent/60"
                  }`}
                >
                  {/* Comic Issue Header Strip */}
                  <div className="flex items-center justify-between border-b border-line bg-[#0E1218] px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="rounded bg-accent/15 px-2.5 py-0.5 font-mono text-xs font-bold text-accent">
                        ISSUE #{String(projectIndex + 1).padStart(2, "0")}
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
                    <div className="relative flex h-[210px] sm:h-[235px] md:h-[260px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-line/80 bg-[#0B0F14] p-4 text-center transition-colors">
                      {/* Subtle blueprint grid background */}
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(229,184,105,0.4)_1px,transparent_1px)] [background-size:14px_14px]"
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
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}
