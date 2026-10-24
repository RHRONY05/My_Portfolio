"use client";

import React from "react";
import Image from "next/image";
import type { SkillPillar } from "./skillsData";

interface SkillRealmCardProps {
  pillar: SkillPillar;
  isHovered?: boolean;
  onHoverChange?: (hovered: boolean) => void;
  className?: string;
}

export function SkillRealmCard({
  pillar,
  isHovered = false,
  onHoverChange,
  className = "",
}: SkillRealmCardProps) {
  const isLeftSide = pillar.side === "left";

  return (
    <div
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className={`group/card relative flex flex-col justify-between rounded-xl border bg-card/90 backdrop-blur-md p-3.5 xl:p-4 transition-all duration-300 select-none shadow-sm overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
        isHovered
          ? "border-[var(--color-card-hover-border)] shadow-[0_12px_32px_var(--color-card-hover-glow)] -translate-y-0.5"
          : "border-line hover:border-[var(--color-card-hover-border)] hover:shadow-[0_12px_32px_var(--color-card-hover-glow)] hover:-translate-y-0.5"
      } ${className}`}
    >
      {/* Circuit Contact Hook Pin at EXACT VERTICAL CENTER of the inner edge */}
      <div
        id={`card-pin-${pillar.id}`}
        className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 size-3.5 rounded-full border border-line bg-card items-center justify-center z-30 transition-all ${
          isLeftSide ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
        }`}
      >
        <div
          className={`size-1.5 rounded-full transition-all duration-300 ${
            isHovered
              ? "bg-[var(--color-card-hover-border)] shadow-[0_0_8px_var(--color-card-hover-border)] scale-125"
              : "bg-muted group-hover/card:bg-[var(--color-card-hover-border)]"
          }`}
        />
      </div>

      {/* Mobile Top Pin */}
      <div className="lg:hidden absolute -top-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full border border-line bg-card flex items-center justify-center">
        <div
          className={`size-1.5 rounded-full transition-all duration-300 ${
            isHovered
              ? "bg-[var(--color-card-hover-border)] shadow-[0_0_8px_var(--color-card-hover-border)] scale-125"
              : "bg-muted"
          }`}
        />
      </div>

      {/* Card Header: Pure Title */}
      <div>
        <h3 className="font-sans text-base xl:text-lg font-bold tracking-tight text-fg transition-colors group-hover/card:text-accent">
          {pillar.title}
        </h3>

        {/* Tools Row: ZERO SCROLLBARS, Circular Downward Puddle Glow */}
        <div className="relative flex items-center gap-2 my-2.5 xl:my-3 flex-nowrap overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {pillar.tools.map((tool) => (
            <div
              key={tool.name}
              className="relative group/tool flex flex-col items-center shrink-0"
            >
              {/* Distinct circular / elliptical glow puddle at the bottom of the icon using project section card glow */}
              <div
                aria-hidden="true"
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-2 rounded-full bg-[radial-gradient(ellipse,var(--color-card-hover-border)_0%,transparent_75%)] opacity-35 group-hover/tool:opacity-90 blur-[2px] transition-all pointer-events-none"
              />

              {/* Squircle Tile (No square box-shadow, purely crisp border) */}
              <div
                title={tool.name}
                className="relative size-8 xl:size-8.5 rounded-lg border border-line bg-canvas/80 flex items-center justify-center p-1.5 transition-all duration-200 hover:border-[var(--color-card-hover-border)] hover:scale-110 cursor-default z-10"
              >
                <Image
                  src={tool.icon}
                  alt={tool.name}
                  width={20}
                  height={20}
                  className="size-4 xl:size-4.5 object-contain filter drop-shadow-xs"
                />
              </div>

              {/* Tooltip on hover */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover/tool:opacity-100 transition-opacity bg-card px-2 py-0.5 rounded border border-line text-[9.5px] font-mono font-bold text-accent whitespace-nowrap pointer-events-none shadow-md z-40">
                {tool.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Produces / Deliverables */}
      <div className="pt-2 border-t border-line/60 overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <span className="block font-mono text-[9px] font-bold tracking-widest text-muted uppercase mb-1.5">
          PRODUCES:
        </span>
        <div className="flex flex-wrap gap-1.5 overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {pillar.produces.map((item) => (
            <span
              key={item}
              className="px-2 py-0.5 rounded-md border border-line bg-canvas/70 font-mono text-[9px] xl:text-[9.5px] text-secondary hover:text-fg hover:border-[var(--color-card-hover-border)] transition-colors whitespace-nowrap"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
