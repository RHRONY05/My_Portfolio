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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
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
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="relative w-full max-w-lg rounded-2xl border border-accent/60 bg-card p-6 sm:p-7 shadow-[0_0_50px_rgba(var(--color-accent-rgb,229,184,105),0.35)] space-y-5 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-line/60 pb-4">
                <div>
                  <div className="font-mono text-xs text-accent font-semibold tracking-wider uppercase mb-1">
                    REALM {realm.number} • {realm.tagline}
                  </div>
                  <h3 className="text-2xl font-black text-fg tracking-tight">
                    {realm.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close modal"
                  className="flex size-8 items-center justify-center rounded-lg border border-line bg-canvas text-muted hover:border-accent hover:text-accent transition-all cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Summary Prose */}
              <p className="text-sm leading-relaxed text-muted">
                {realm.summary}
              </p>

              {/* Complete Tools Matrix with Tech Icons */}
              <div className="space-y-2">
                <span className="font-mono text-xs font-semibold text-fg tracking-wider uppercase block">
                  Production Stack &amp; Frameworks
                </span>
                <div className="flex flex-wrap gap-2">
                  {realm.tools.map((tool) => (
                    <span
                      key={tool.name}
                      className="inline-flex items-center gap-2 font-mono text-xs font-semibold px-3 py-1.5 rounded-lg border border-accent/30 bg-accent/10 text-accent hover:border-accent hover:bg-accent/15 transition-all"
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
                <span className="font-mono text-[11px] font-semibold text-muted tracking-wider uppercase block">
                  Key Architectural Patterns
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {realm.patterns.map((pattern) => (
                    <div
                      key={pattern}
                      className="flex items-center gap-2 text-xs font-mono text-fg/90 bg-canvas/60 px-2.5 py-1.5 rounded border border-line/60"
                    >
                      <span className="size-1.5 rounded-full bg-accent" />
                      <span>{pattern}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Dismiss Action */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-accent px-5 py-2 font-mono text-xs font-bold text-on-accent hover:opacity-90 active:scale-95 transition-all cursor-pointer"
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
