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
          className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 md:p-10"
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
            className="relative flex flex-col max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-card shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-line bg-canvas/60 px-6 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="rounded bg-accent/15 px-2.5 py-0.5 font-mono text-xs font-bold text-accent">
                  DOSSIER // CASE STUDY
                </span>
                <span className="font-mono text-xs text-muted">
                  // {project.category}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="flex size-9 items-center justify-center rounded-lg border border-line bg-card text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable Dossier) */}
            <div className="flex flex-col gap-8 overflow-y-auto p-6 md:p-8">
              {/* Title & Narrative */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-fg md:text-3xl">
                  {project.title}
                </h2>
                <p className="mt-3 text-body leading-relaxed text-muted">
                  {project.description}
                </p>
              </div>

              {/* High-Res Screenshot Showcase */}
              {project.image ? (
                <div className="relative h-[320px] md:h-[400px] w-full overflow-hidden rounded-xl border border-line bg-canvas shadow-inner group">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={3500}
                    sizes="(max-width: 768px) 90vw, 800px"
                    loading="lazy"
                    className="w-full h-auto object-cover object-top transition-transform duration-[8000ms] ease-in-out hover:-translate-y-[calc(100%-360px)]"
                  />
                  <div className="pointer-events-none absolute bottom-3 right-3 rounded bg-canvas/80 px-2 py-1 font-mono text-[10px] text-muted backdrop-blur-md">
                    HOVER TO SCROLL COMPLETE PAGE
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
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {project.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-lg border border-line/60 bg-canvas/40 p-3.5"
                      >
                        <CheckCircle2 className="size-4 shrink-0 text-accent mt-0.5" />
                        <span className="text-sm text-fg/90">{feat}</span>
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
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-line bg-canvas px-3 py-1 font-mono text-xs text-fg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between border-t border-line bg-canvas/60 px-6 py-4 backdrop-blur-sm">
              <span className="font-mono text-xs text-muted">
                PROJECT ID: {project.id}
              </span>

              <div className="flex items-center gap-3">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-line bg-card px-4 py-2 font-mono text-xs font-bold text-fg transition-colors hover:border-accent"
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
                    className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 font-mono text-xs font-bold text-on-accent transition-opacity hover:opacity-90"
                  >
                    <ExternalLink className="size-4" />
                    OPEN LIVE SITE
                  </a>
                ) : null}

                {!project.live && !project.github ? (
                  <span className="flex items-center gap-1.5 rounded-lg border border-line bg-card/60 px-3.5 py-1.5 font-mono text-xs text-muted">
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
