"use client";

import React from "react";
import Image from "next/image";
import type { SkillLifecycleStep } from "./skillsData";

interface SkillFlowStepCardProps {
  step: SkillLifecycleStep;
  isActive: boolean;
  onSelect: () => void;
  className?: string;
}

export function SkillFlowStepCard({
  step,
  isActive,
  onSelect,
  className = "",
}: SkillFlowStepCardProps) {
  const isOval = step.shape === "oval";

  return (
    <div
      id={`flow-node-${step.id}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`group relative cursor-pointer transition-transform duration-200 select-none bg-card lg:bg-card/90 lg:backdrop-blur-md transform-gpu ${
        isOval
          ? "rounded-full w-[275px] sm:w-[295px] xl:w-[325px] h-[128px] sm:h-[138px] xl:h-[148px] flex flex-col items-center justify-center px-6 py-4 text-center border-2 border-white/40 hover:border-white shadow-sm lg:shadow-[0_0_20px_rgba(255,255,255,0.18)] lg:hover:shadow-[0_0_32px_rgba(255,255,255,0.4)]"
          : "rounded-2xl w-[275px] sm:w-[295px] xl:w-[325px] h-[138px] sm:h-[148px] xl:h-[158px] p-4 sm:p-5 xl:p-6 flex flex-col justify-between border border-line hover:border-white/80 shadow-sm lg:hover:shadow-[0_0_24px_rgba(255,255,255,0.22)]"
      } ${
        isActive
          ? "border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-[1.02]"
          : "hover:scale-[1.02]"
      } ${className}`}
    >
      {/* Title */}
      <h3
        className={`font-sans font-extrabold text-fg tracking-tight group-hover:text-white transition-colors ${
          isOval ? "text-lg xl:text-xl mb-2.5" : "text-lg xl:text-xl"
        }`}
      >
        {step.title}
      </h3>

      {/* Tools Icons Strip */}
      <div
        className={`flex items-center gap-2.5 xl:gap-3 overflow-hidden ${
          isOval ? "justify-center" : "justify-start"
        }`}
      >
        {step.tools.slice(0, 6).map((tool) => (
          <div
            key={tool.name}
            title={tool.name}
            className={`relative shrink-0 rounded-lg border border-line/60 bg-canvas/70 p-1.5 transition-transform group-hover:scale-110 ${
              isOval ? "size-7 xl:size-8" : "size-8 xl:size-9"
            }`}
          >
            <Image
              src={tool.icon}
              alt={tool.name}
              fill
              sizes="36px"
              className="object-contain"
            />
          </div>
        ))}
        {step.tools.length > 6 && (
          <span className="font-mono text-xs text-muted/70 pl-0.5 font-bold">
            +{step.tools.length - 6}
          </span>
        )}
      </div>
    </div>
  );
}
