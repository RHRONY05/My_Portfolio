"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ArtifactItem {
  id: string;
  name: string;
  tagline: string;
  src: string;
  alt: string;
  heightClass: string;
  widthAspect: string;
}

const ARTIFACTS: ArtifactItem[] = [
  {
    id: "football",
    name: "Size 5 Match Ball",
    tagline: "Drive & Physical Reset",
    src: "/images/Hero/artifacts/football.png",
    alt: "Classic Size 5 Football Match Ball",
    // Small (outer left)
    heightClass: "h-16 sm:h-20 md:h-24 lg:h-28",
    widthAspect: "aspect-square",
  },
  {
    id: "comic_book",
    name: "CyberKnight Vol. 1",
    tagline: "Graphic Lore & Storytelling",
    src: "/images/Hero/artifacts/comic_book.png",
    alt: "CyberKnight Graphic Novel",
    // Medium (inner left)
    heightClass: "h-24 sm:h-32 md:h-40 lg:h-44",
    widthAspect: "aspect-[533/855]",
  },
  {
    id: "laptop",
    name: "M3 Max Workstation",
    tagline: "Next.js, TypeScript & AI Systems",
    src: "/images/Hero/artifacts/laptop.png",
    alt: "Developer Laptop with VS Code and Terminal",
    // Large Apex (center)
    heightClass: "h-36 sm:h-48 md:h-56 lg:h-64",
    widthAspect: "aspect-[890/758]",
  },
  {
    id: "keyboard",
    name: "Custom 75% Mech",
    tagline: "Tactile Input & Speed",
    src: "/images/Hero/artifacts/keyboard.png",
    alt: "Enthusiast 75% Mechanical Keyboard with Amber Keycaps",
    // Medium (inner right)
    heightClass: "h-24 sm:h-32 md:h-40 lg:h-44",
    widthAspect: "aspect-[953/649]",
  },
  {
    id: "watch",
    name: "Royal Oak Chrono",
    tagline: "Precision & Mechanical Craft",
    src: "/images/Hero/artifacts/watch.png",
    alt: "Steel Luxury Sports Watch",
    // Small (outer right)
    heightClass: "h-16 sm:h-20 md:h-24 lg:h-28",
    widthAspect: "aspect-[564/1065]",
  },
];

export function HeroArtifactsRack() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center select-none px-4">
      {/* 1. The 5 Individual Artifacts Sitting Directly Above The Baseline */}
      <div className="flex items-end justify-center gap-3 sm:gap-6 md:gap-10 lg:gap-14 pb-0 z-20">
        {ARTIFACTS.map((item, index) => {
          const isHovered = hoveredId === item.id;

          return (
            <motion.div
              key={item.id}
              className="relative flex flex-col items-center group cursor-pointer"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.12 * index,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              {/* Micro-Interaction Tooltip Badge */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute -top-14 sm:-top-16 z-30 pointer-events-none whitespace-nowrap flex flex-col items-center"
                  >
                    <div className="px-3 py-1.5 rounded-lg border border-line bg-card/95 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.8)] flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-accent animate-ping" />
                      <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-muted hidden sm:inline">
                        — {item.tagline}
                      </span>
                    </div>
                    {/* Tooltip caret */}
                    <div className="w-2 h-2 bg-card border-r border-b border-line rotate-45 -mt-1" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* The Artifact Individual Image */}
              <div
                className={`relative ${item.heightClass} ${item.widthAspect} transition-transform duration-300`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 140px, 320px"
                  className={`object-contain object-bottom transition-all duration-300 drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)] ${
                    isHovered
                      ? "drop-shadow-[0_16px_30px_rgba(229,184,105,0.4)] brightness-110"
                      : "brightness-95 hover:brightness-105"
                  }`}
                  priority
                />
              </div>

              {/* Subtle Floor Contact Shadow right under each artifact */}
              <div
                className={`w-3/4 h-1.5 rounded-full blur-[3px] -mb-1 bg-black/80 transition-all duration-300 ${
                  isHovered ? "opacity-30 scale-75" : "opacity-90 scale-100"
                }`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* 2. The Horizontal Line directly under the bottom part of all images */}
      <div className="w-full relative flex items-center justify-center -mt-[1px] z-10">
        {/* Core Line with subtle golden ambient gradient */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#30363D] via-accent/60 to-transparent" />

        {/* Ambient Glow along the center of the baseline */}
        <div className="absolute w-3/4 h-[3px] bg-accent/20 blur-sm -top-[1px] pointer-events-none" />

        {/* Left Telemetry Marker */}
        <div className="absolute left-4 sm:left-12 -top-1.5 flex items-center gap-2">
          <div className="size-2 rounded-full border border-line bg-card flex items-center justify-center">
            <div className="size-1 rounded-full bg-accent" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted/60 hidden md:inline">
            STAGE // 01 ARTIFACTS
          </span>
        </div>

        {/* Right Telemetry Marker */}
        <div className="absolute right-4 sm:right-12 -top-1.5 flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted/60 hidden md:inline">
            5 NODES ONLINE
          </span>
          <div className="size-2 rounded-full border border-line bg-card flex items-center justify-center">
            <div className="size-1 rounded-full bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
