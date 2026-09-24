"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Layers,
  Cpu,
  Database,
  Bot,
  Terminal,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SkillRealm } from "./skillsData";

interface SkillRealmCardProps {
  realm: SkillRealm;
  variant?: "default" | "compact";
}

const REALM_ICONS: Record<string, LucideIcon> = {
  frontend: Layers,
  backend: Cpu,
  database: Database,
  "ai-agents": Bot,
  devops: Terminal,
  tooling: Wrench,
};

export function SkillRealmCard({
  realm,
  variant = "default",
}: SkillRealmCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const IconComponent = REALM_ICONS[realm.id] ?? Layers;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Notify other components (like 3D Mahoraga wheel) that a modal is open
    window.dispatchEvent(
      new CustomEvent("rony_modal_state", { detail: { open: true } })
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.dispatchEvent(
        new CustomEvent("rony_modal_state", { detail: { open: false } })
      );
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full">
      {/* The Load-Balanced Glass Node Card */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`group relative w-full text-left rounded-xl border transition-all duration-200 cursor-pointer ${
          variant === "compact"
            ? "px-2.5 py-2 sm:px-3 sm:py-2.5"
            : "px-3.5 py-2.5 sm:px-4 sm:py-3"
        } ${
          isOpen
            ? "border-accent bg-card shadow-[0_0_20px_rgba(var(--color-accent-rgb,229,184,105),0.25)] scale-[1.02]"
            : "border-line bg-card/75 backdrop-blur-md hover:border-accent hover:bg-card hover:shadow-[0_0_12px_rgba(var(--color-accent-rgb,229,184,105),0.18)]"
        }`}
      >
        {variant === "compact" ? (
          /* Mobile Compact Node: Number + Icon + Title + Tech Preview */
          <div className="flex flex-col justify-center">
            {/* Header: Number + Short Name + Icon */}
            <div className="flex items-center justify-between gap-1">
              <span className="font-mono text-[11px] sm:text-xs font-bold text-fg group-hover:text-accent transition-colors truncate">
                <span className="text-accent mr-1">{realm.number}.</span>
                {realm.shortName}
              </span>
              <div className="flex size-5 shrink-0 items-center justify-center rounded-md border border-line/60 bg-canvas/80 text-muted group-hover:border-accent group-hover:text-accent transition-colors">
                <IconComponent className="size-2.5" />
              </div>
            </div>
            {/* Minimal Tech Summary */}
            <p className="font-mono text-[9px] sm:text-[10px] text-muted truncate mt-1">
              {realm.previewTech}
            </p>
          </div>
        ) : (
          /* Desktop Standard Card */
          <>
            {/* Header Row: Number + Short Name + Icon */}
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs font-bold text-fg group-hover:text-accent transition-colors">
                <span className="text-accent mr-1.5">{realm.number}.</span>
                {realm.shortName}
              </span>
              <div className="flex size-6 shrink-0 items-center justify-center rounded-md border border-line/60 bg-canvas/80 text-muted group-hover:border-accent group-hover:text-accent transition-colors">
                <IconComponent className="size-3" />
              </div>
            </div>

            {/* Minimal Tech Summary */}
            <p className="font-mono text-[11px] text-muted truncate mt-1">
              {realm.previewTech}
            </p>
          </>
        )}
      </button>

      {/* 
        Teleported Telemetry Modal via React Portal:
        Renders directly into document.body with z-[9999] so it is guaranteed
        to sit above Three.js canvases, text ribbons, and load-balancer circuits.
      */}
      {mounted &&
        isOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            style={{ zIndex: 2147483647 }}
            className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          >
            <div
              style={{ zIndex: 2147483647 }}
              className="relative w-full max-w-[480px] max-h-[85dvh] sm:max-h-[85vh] flex flex-col rounded-2xl border border-accent/60 bg-card shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_30px_rgba(var(--color-accent-rgb,229,184,105),0.25)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Header: Always pinned & visible on mobile */}
              <div className="shrink-0 flex items-start justify-between gap-3 p-4 sm:p-6 pb-3 border-b border-line/60 bg-card">
                <div>
                  <div className="font-mono text-[10px] sm:text-xs text-accent font-semibold tracking-wider uppercase mb-0.5 sm:mb-1">
                    REALM {realm.number} • {realm.tagline}
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black text-fg tracking-tight">
                    {realm.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close modal"
                  className="flex size-9 sm:size-8 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas text-muted hover:border-accent hover:text-accent active:scale-95 transition-all cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Scrollable Modal Body */}
              <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4 custom-scrollbar">
                {/* Summary Prose */}
                <p className="text-xs sm:text-sm leading-relaxed text-muted">
                  {realm.summary}
                </p>

                {/* Complete Tools Matrix with Tech Icons */}
                <div className="space-y-2">
                  <span className="font-mono text-[11px] sm:text-xs font-semibold text-fg tracking-wider uppercase block">
                    Production Stack &amp; Frameworks
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {realm.tools.map((tool) => (
                      <span
                        key={tool.name}
                        className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-accent/30 bg-accent/10 text-accent hover:border-accent hover:bg-accent/15 transition-all"
                      >
                        {tool.icon && (
                          <img
                            src={tool.icon}
                            alt=""
                            className="size-3.5 object-contain"
                          />
                        )}
                        <span>{tool.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architectural Patterns */}
                <div className="space-y-2 pt-2 border-t border-line/40">
                  <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-muted tracking-wider uppercase block">
                    Key Architectural Patterns
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                    {realm.patterns.map((pattern) => (
                      <div
                        key={pattern}
                        className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-fg/90 bg-canvas/60 px-2.5 py-1.5 rounded border border-line/60"
                      >
                        <span className="size-1.5 rounded-full bg-accent shrink-0" />
                        <span className="leading-snug">{pattern}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sticky Footer Dismiss Action */}
              <div className="shrink-0 p-3 sm:p-4 pt-2 border-t border-line/40 bg-card flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full sm:w-auto rounded-lg bg-accent py-2.5 sm:py-2 px-5 font-mono text-xs font-bold text-on-accent hover:opacity-90 active:scale-95 transition-all cursor-pointer text-center"
                >
                  CLOSE TELEMETRY [✕]
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
