"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, CheckCircle2, ArrowRight, Sparkles, Terminal } from "lucide-react";
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

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-card/95 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(255,255,255,0.15)] text-fg transition-all duration-300">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-line/60">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                Workflow Stage
              </span>
              <span className="font-mono text-xs text-muted">Architecture & Tooling</span>
            </div>
            <h2 id="flow-modal-title" className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight">
              {step.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-full p-2 text-muted hover:text-fg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Action Tagline */}
        <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10 text-white/90 text-sm sm:text-base font-sans italic leading-relaxed">
          &ldquo;{step.actionTagline}&rdquo;
        </div>

        {/* Narrative Section */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-muted">
            <Sparkles className="size-3.5 text-accent" />
            <span>How I Approach This Phase</span>
          </div>
          <p className="text-sm sm:text-base text-fg/90 leading-relaxed font-sans">
            {step.detailedDescription}
          </p>
        </div>

        {/* Key Workflow Practices */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-muted">
            <Terminal className="size-3.5 text-white/80" />
            <span>Workflow & Engineering Standards</span>
          </div>
          <ul className="space-y-2.5">
            {step.workflowBulletPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-fg/80 leading-normal">
                <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools & Technologies */}
        <div className="mt-6 space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
            Tools &amp; Stack Active in this Phase
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {step.tools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-2 rounded-xl border border-line bg-canvas/80 px-3 py-1.5 shadow-sm transition-all hover:border-white/40 hover:bg-white/5"
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

        {/* Deliverables */}
        <div className="mt-6 pt-4 border-t border-line/60 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-mono text-muted uppercase tracking-wider">
            Primary Deliverables
          </span>
          <div className="flex flex-wrap gap-1.5">
            {step.deliverables.map((del) => (
              <span
                key={del}
                className="font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/80"
              >
                {del}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
