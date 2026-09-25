"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Code2, ExternalLink, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { type Project } from "@/data/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (project) {
      window.dispatchEvent(
        new CustomEvent("rony_modal_state", { detail: { open: true } })
      );
      document.body.style.overflow = "hidden";

      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKey);
      return () => {
        window.removeEventListener("keydown", handleKey);
        document.body.style.overflow = "";
        window.dispatchEvent(
          new CustomEvent("rony_modal_state", { detail: { open: false } })
        );
      };
    }
  }, [project, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          style={{ zIndex: 2147483647 }}
          className="fixed inset-0 flex items-center justify-center p-2.5 sm:p-4 md:p-8"
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-canvas/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative flex flex-col max-h-[92vh] sm:max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-card shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-line bg-canvas/80 px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-sm">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="rounded bg-accent/15 px-2.5 py-0.5 font-mono text-[11px] sm:text-xs font-bold text-accent">
                  DOSSIER // CASE STUDY
                </span>
                <span className="font-mono text-[11px] sm:text-xs text-muted">
                  // {project.category}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-card text-muted transition-colors hover:border-accent hover:text-accent cursor-pointer active:scale-95"
              >
                <X className="size-4 sm:size-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable Dossier with hidden scrollbar) */}
            <div className="flex-1 flex flex-col gap-6 sm:gap-8 overflow-y-auto p-4 sm:p-6 md:p-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {/* Title & Narrative */}
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-fg">
                  {project.title}
                </h2>
                <p className="mt-2.5 text-xs sm:text-sm md:text-base leading-relaxed text-muted">
                  {project.description}
                </p>
              </div>

              {/* High-Res Screenshot Showcase with Browser Window Header & Scrollable Viewport */}
              {project.image ? (
                <div className="flex flex-col shrink-0 w-full overflow-hidden rounded-xl border border-line bg-canvas shadow-xl">
                  {/* Browser Mockup Header */}
                  <div className="flex h-8 shrink-0 items-center justify-between border-b border-line bg-card/90 px-3.5 backdrop-blur-sm select-none">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full bg-[#FF5F56]/80" />
                      <span className="size-2.5 rounded-full bg-[#FFBD2E]/80" />
                      <span className="size-2.5 rounded-full bg-[#27C93F]/80" />
                      <span className="ml-2 font-mono text-[10px] text-muted truncate max-w-[170px] sm:max-w-[280px]">
                        {project.live ? project.live.replace(/^https?:\/\//, "") : `${project.id}.dev`}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 font-mono text-[9px] text-accent/80 font-semibold tracking-wider uppercase">
                      <Sparkles className="size-2.5 text-secondary" />
                      FULL PREVIEW
                    </span>
                  </div>

                  {/* Scrollable Page Screenshot Viewport */}
                  <div className="relative h-[220px] sm:h-[300px] md:h-[380px] w-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-y group">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1200}
                      height={3500}
                      sizes="(max-width: 768px) 95vw, 850px"
                      loading="lazy"
                      className="w-full h-auto object-cover object-top"
                    />

                    {/* Subtle Scroll Indicator Badge */}
                    <div className="pointer-events-none sticky bottom-3 right-3 float-right mr-3 rounded-full border border-line/80 bg-canvas/85 px-3 py-1 font-mono text-[10px] font-medium text-fg shadow-lg backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity">
                      ↕ SCROLL TO EXPLORE
                    </div>
                  </div>
                </div>
              ) : null}

              {/* What was Architected / Built */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent">
                    <Sparkles className="size-4 text-accent" />
                    Engineering Architecture & Systems Built
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                    {project.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-xl border border-line/60 bg-canvas/40 p-3 sm:p-3.5"
                      >
                        <CheckCircle2 className="size-4 shrink-0 text-accent mt-0.5" />
                        <span className="text-xs sm:text-sm text-fg/90">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Tech Stack Tags */}
              {project.stack && project.stack.length > 0 && (
                <div>
                  <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-muted">
                    Full Tech Stack & Infrastructure
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-line bg-canvas px-2.5 py-1 font-mono text-[11px] sm:text-xs text-fg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="flex shrink-0 flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-line bg-canvas/80 px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-sm">
              <span className="font-mono text-[11px] sm:text-xs text-muted text-center sm:text-left">
                PROJECT ID: {project.id}
              </span>

              <div className="flex items-center gap-2 sm:gap-3 justify-end">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-lg border border-line bg-card px-3.5 py-2 font-mono text-xs font-bold text-fg transition-colors hover:border-accent cursor-pointer active:scale-95"
                  >
                    <Code2 className="size-4" />
                    SOURCE CODE
                  </a>
                ) : null}

                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2 font-mono text-xs font-bold text-on-accent transition-opacity hover:opacity-90 shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.3)] cursor-pointer active:scale-95"
                  >
                    <ExternalLink className="size-4" />
                    OPEN LIVE SITE
                  </a>
                ) : null}

                {!project.live && !project.github ? (
                  <span className="flex items-center justify-center gap-1.5 rounded-lg border border-line bg-card/60 px-3.5 py-1.5 font-mono text-xs text-muted">
                    <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                    IN DEVELOPMENT // COMING SOON
                  </span>
                ) : null}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
