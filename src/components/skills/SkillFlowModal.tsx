"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { SkillLifecycleStep } from "./skillsData";

interface SkillFlowModalProps {
  step: SkillLifecycleStep | null;
  onClose: () => void;
}

export function SkillFlowModal({ step, onClose }: SkillFlowModalProps) {
  useEffect(() => {
    if (!step) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [step, onClose]);

  if (!step) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="flow-modal-title"
      className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Dimmed backdrop with blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Modal Dialog Card (scrollbar hidden completely) */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-3xl border border-white/20 bg-card/95 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(255,255,255,0.15)] text-fg transition-all duration-300">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-line/60">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                Stage {step.stepNumber}
              </span>
              <span className="font-mono text-xs text-muted">Workflow Architecture</span>
            </div>
            <h2 id="flow-modal-title" className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight">
              {step.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-full p-2 text-muted hover:text-fg hover:bg-white/10 transition-colors cursor-pointer shrink-0 mt-1"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Clean Unexaggerated Points Section (Styled matching Case Study Problem & Solution) */}
        <div className="pt-6">
          <ul className="space-y-4">
            {step.workflowBulletPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3.5 group">
                <svg
                  className="size-4.5 text-accent shrink-0 mt-1 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4 3l16 9-16 9 3-9-3-9z" />
                </svg>
                <span className="text-base sm:text-lg text-fg/90 leading-relaxed font-sans">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools & Technologies */}
        <div className="mt-8 pt-6 border-t border-line/60">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-muted mb-3">
            Tools &amp; Stack Active in this Phase
          </div>
          <div className="flex flex-wrap gap-2.5">
            {step.tools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-2 rounded-xl border border-line bg-canvas/80 px-3.5 py-2 shadow-sm transition-all hover:border-white/40 hover:bg-white/5"
              >
                <div className="relative size-4 shrink-0">
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    fill
                    sizes="16px"
                    className="object-contain"
                  />
                </div>
                <span className="font-mono text-xs font-semibold text-fg/90">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
