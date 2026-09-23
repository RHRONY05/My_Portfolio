"use client";

import React, { useState } from "react";
import { Sparkles, X, ChevronRight, Layers, Cpu, Database, Bot, Terminal, Wrench, type LucideIcon } from "lucide-react";
import { SkillRealm } from "./skillsData";

interface SkillRealmCardProps {
  realm: SkillRealm;
}

const REALM_ICONS: Record<string, LucideIcon> = {
  frontend: Layers,
  backend: Cpu,
  database: Database,
  "ai-agents": Bot,
  devops: Terminal,
  tooling: Wrench,
};

export function SkillRealmCard({ realm }: SkillRealmCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = REALM_ICONS[realm.id] ?? Layers;

  return (
    <div className="relative w-full">
      {/* The Load-Balanced Glass Node Card (Compact Minimal Box) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`group relative w-full text-left rounded-xl border px-3.5 py-2.5 sm:px-4 sm:py-3 transition-all duration-200 ${
          isOpen
            ? "border-accent bg-card shadow-[0_0_20px_rgba(229,184,105,0.22)] scale-[1.02]"
            : "border-line bg-card/70 backdrop-blur-md hover:border-accent hover:bg-card hover:shadow-[0_0_12px_rgba(229,184,105,0.14)]"
        }`}
      >
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
      </button>

      {/* Floating Detailed Telemetry Modal / Popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-accent/60 bg-card p-6 sm:p-7 shadow-[0_0_40px_rgba(229,184,105,0.25)] space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-line/60 pb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-accent font-semibold tracking-wider uppercase mb-1">
                  <Sparkles className="size-3.5" />
                  <span>REALM {realm.number} • {realm.tagline}</span>
                </div>
                <h3 className="text-2xl font-black text-fg tracking-tight">
                  {realm.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
                className="flex size-8 items-center justify-center rounded-lg border border-line bg-canvas text-muted hover:border-accent hover:text-accent transition-all"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Summary Prose */}
            <p className="text-sm leading-relaxed text-muted">
              {realm.summary}
            </p>

            {/* Complete Tools Matrix */}
            <div className="space-y-2">
              <span className="font-mono text-xs font-semibold text-fg tracking-wider uppercase block">
                Production Stack &amp; Frameworks
              </span>
              <div className="flex flex-wrap gap-2">
                {realm.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-xs font-semibold px-3 py-1.5 rounded-lg border border-accent/30 bg-accent/10 text-accent"
                  >
                    {tool}
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
                className="rounded-lg bg-accent px-5 py-2 font-mono text-xs font-bold text-on-accent hover:opacity-90 active:scale-95 transition-all"
              >
                CLOSE TELEMETRY [✕]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
