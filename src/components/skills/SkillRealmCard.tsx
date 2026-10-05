"use client";

import React, { useState } from "react";
import {
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
  isActiveRouting?: boolean;
  isDimmed?: boolean;
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
  isActiveRouting = false,
  isDimmed = false,
}: SkillRealmCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = REALM_ICONS[realm.id] ?? Layers;

  // Determine popover vertical anchor based on card position so it stays cleanly in viewport
  const getAnchorClass = () => {
    if (realm.id === "frontend" || realm.id === "ai-agents") {
      return realm.side === "left"
        ? "top-0 left-0 origin-top-left"
        : "top-0 right-0 origin-top-right";
    }
    if (realm.id === "backend" || realm.id === "devops") {
      return realm.side === "left"
        ? "top-1/2 -translate-y-1/2 left-0 origin-left"
        : "top-1/2 -translate-y-1/2 right-0 origin-right";
    }
    // Bottom cards (database, tooling)
    return realm.side === "left"
      ? "bottom-0 left-0 origin-bottom-left"
      : "bottom-0 right-0 origin-bottom-right";
  };

  return (
    <div
      id={`realm-card-${realm.id}`}
      className="group relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 
        =======================================================================
        BASE CARD FACE
        - Overflow-safe flex layout
        - Highlights dynamically when traffic is actively routed to this realm
        =======================================================================
      */}
      <div
        className={`relative w-full rounded-xl border transition-all duration-300 cursor-default select-none ${
          variant === "compact"
            ? "px-2.5 py-2 sm:px-3 sm:py-2"
            : "px-3 py-2.5 sm:px-3.5 sm:py-3"
        } ${
          isDimmed && !isHovered ? "opacity-40" : "opacity-100"
        } ${
          isHovered
            ? "border-accent bg-card shadow-[0_0_18px_rgba(var(--color-accent-rgb),0.25)] scale-[1.01]"
            : isActiveRouting
            ? "border-accent/90 bg-card/95 shadow-[0_0_16px_rgba(var(--color-accent-rgb),0.22)] ring-1 ring-accent/40"
            : "border-line bg-card/80 backdrop-blur-md hover:border-accent hover:bg-card hover:shadow-[0_0_14px_rgba(var(--color-accent-rgb),0.18)]"
        }`}
      >
        {variant === "compact" ? (
          /* Mobile Compact Face */
          <div className="flex flex-col justify-center min-w-0">
            {/* Header: Number + Short Name + Icon (Safe from overflow) */}
            <div className="flex items-center justify-between gap-1 min-w-0">
              <div className="flex items-center gap-1 min-w-0 flex-1">
                <span className="font-mono text-[11px] sm:text-xs font-bold text-accent shrink-0 flex items-center gap-1">
                  {isActiveRouting && (
                    <span className="size-1 rounded-full bg-accent animate-ping" />
                  )}
                  {realm.number}.
                </span>
                <span className="font-mono text-[11px] sm:text-xs font-bold text-fg group-hover:text-accent transition-colors truncate">
                  {realm.shortName}
                </span>
              </div>
              <div
                className={`flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                  isActiveRouting
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-line/60 bg-canvas/80 text-muted group-hover:border-accent group-hover:text-accent"
                }`}
              >
                <IconComponent className="size-2.5" />
              </div>
            </div>

            {/* Micro Tech Icons row + count */}
            <div className="flex items-center justify-between mt-1.5 gap-1 min-w-0">
              <div className="flex items-center gap-1 overflow-hidden min-w-0">
                {realm.tools.slice(0, 3).map((tool) => (
                  <span
                    key={tool.name}
                    title={tool.name}
                    className="flex size-4.5 shrink-0 items-center justify-center rounded border border-line/60 bg-canvas/70 p-0.5"
                  >
                    {tool.icon ? (
                      <img
                        src={tool.icon}
                        alt=""
                        className="size-3 object-contain"
                      />
                    ) : (
                      <span className="size-1.5 rounded-full bg-accent" />
                    )}
                  </span>
                ))}
              </div>
              <span className="font-mono text-[9px] text-muted shrink-0 whitespace-nowrap">
                +{realm.tools.length - 3}
              </span>
            </div>
          </div>
        ) : (
          /* Desktop Standard Face */
          <>
            {/* Header Row: Number + Short Name + Count Badge + Icon (Safe from overflow) */}
            <div className="flex items-center justify-between gap-1.5 min-w-0">
              <div className="flex items-center gap-1 min-w-0 flex-1">
                <span className="font-mono text-xs font-bold text-accent shrink-0 flex items-center gap-1">
                  {isActiveRouting && (
                    <span className="size-1.5 rounded-full bg-accent animate-ping" />
                  )}
                  {realm.number}.
                </span>
                <span className="font-mono text-xs font-bold text-fg group-hover:text-accent transition-colors truncate">
                  {realm.shortName}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span
                  className={`font-mono text-[9.5px] sm:text-[10px] px-1.5 py-0.5 rounded border transition-colors whitespace-nowrap ${
                    isActiveRouting
                      ? "border-accent/60 bg-accent/15 text-accent font-semibold"
                      : "border-line/60 bg-canvas/60 text-muted group-hover:border-accent/40 group-hover:text-secondary"
                  }`}
                >
                  {realm.tools.length} Tools
                </span>
                <div
                  className={`flex size-5.5 sm:size-6 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    isActiveRouting
                      ? "border-accent bg-accent/20 text-accent shadow-xs"
                      : "border-line/60 bg-canvas/80 text-muted group-hover:border-accent group-hover:text-accent"
                  }`}
                >
                  <IconComponent className="size-2.5 sm:size-3" />
                </div>
              </div>
            </div>

            {/* Micro Tech Icon avatars row with authentic brand colors */}
            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-line/40 min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 overflow-hidden">
                {realm.tools.slice(0, 4).map((tool) => (
                  <span
                    key={tool.name}
                    title={tool.name}
                    className="flex size-5 shrink-0 items-center justify-center rounded border border-line/60 bg-canvas/80 p-0.5 transition-transform group-hover:scale-105"
                  >
                    {tool.icon ? (
                      <img
                        src={tool.icon}
                        alt=""
                        className="size-3.5 object-contain"
                      />
                    ) : (
                      <span className="size-1.5 rounded-full bg-accent" />
                    )}
                  </span>
                ))}
              </div>
              <span className="font-mono text-[9.5px] sm:text-[10px] text-muted group-hover:text-accent transition-colors shrink-0 whitespace-nowrap ml-1">
                [+more]
              </span>
            </div>
          </>
        )}
      </div>

      {/* 
        =======================================================================
        HOVER OVERLAY PANEL: REVEALS ALL TOOLS' NAMES WITH AUTHENTIC BRAND ICONS
        =======================================================================
      */}
      <div
        className={`absolute z-50 ${getAnchorClass()} w-[265px] sm:w-[285px] xl:w-[305px] p-3 sm:p-3.5 rounded-xl border border-accent/80 bg-card/95 backdrop-blur-xl shadow-[0_0_35px_rgba(0,0,0,0.9),0_0_20px_rgba(var(--color-accent-rgb),0.25)] transition-all duration-200 ease-out ${
          isHovered
            ? "opacity-100 visible scale-100 pointer-events-auto"
            : "opacity-0 invisible scale-95 pointer-events-none"
        }`}
      >
        {/* Hover Header: Number + Realm Title + Tool Count Badge */}
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-line/60">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-mono text-xs font-bold text-accent shrink-0">
              {realm.number}.
            </span>
            <span className="font-mono text-xs font-bold text-fg truncate">
              {realm.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-accent/40 bg-accent/10 text-accent font-semibold">
              {realm.tools.length} Tools
            </span>
            <div className="flex size-5 shrink-0 items-center justify-center rounded border border-line/60 bg-canvas/80 text-accent">
              <IconComponent className="size-2.5" />
            </div>
          </div>
        </div>

        {/* Section Tag */}
        <div className="flex items-center justify-between mt-2 mb-1.5">
          <span className="font-mono text-[10px] text-accent tracking-wider uppercase font-semibold">
            All Production Tools
          </span>
          <span className="font-mono text-[9px] text-muted tracking-widest uppercase">
            {realm.tagline}
          </span>
        </div>

        {/* Full Tools Matrix: ALL Tool Names & Authentic Brand Icons rendered */}
        <div className="flex flex-wrap gap-1.5 max-h-[220px] overflow-y-auto custom-scrollbar pr-0.5">
          {realm.tools.map((tool) => (
            <span
              key={tool.name}
              className="inline-flex items-center gap-1.5 font-mono text-[10.5px] px-2 py-1 rounded-md border border-line/70 bg-canvas/90 text-fg hover:border-accent hover:text-accent transition-colors shadow-xs"
            >
              {tool.icon && (
                <img
                  src={tool.icon}
                  alt=""
                  className="size-3.5 object-contain shrink-0"
                />
              )}
              <span>{tool.name}</span>
            </span>
          ))}
        </div>

        {/* Sub-footer: Brief summary preview */}
        <div className="mt-2.5 pt-2 border-t border-line/40 flex items-center justify-between text-[9.5px] font-mono text-muted">
          <span className="truncate max-w-[190px]">{realm.previewTech}</span>
          <span className="text-accent shrink-0">
            {isActiveRouting ? "Active Traffic" : "Ready"}
          </span>
        </div>
      </div>
    </div>
  );
}
