"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { RotateCw } from "lucide-react";
import { SKILL_REALMS } from "./skillsData";
import { SkillRealmCard } from "./SkillRealmCard";

// Dynamic import with ssr: false for the 3D horizontal halo ring
const MahoragaWheelCanvas = dynamic(
  () => import("./MahoragaWheelCanvas").then((mod) => mod.MahoragaWheelCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex w-[280px] h-[110px] items-center justify-center">
        <div className="size-6 animate-spin rounded-full border-2 border-line border-t-accent" />
      </div>
    ),
  }
);

export function SkillsLoadBalancer() {
  const [isSpinningFast, setIsSpinningFast] = useState(false);

  const leftRealms = SKILL_REALMS.filter((r) => r.side === "left");
  const rightRealms = SKILL_REALMS.filter((r) => r.side === "right");

  const handleTriggerAdaptation = () => {
    setIsSpinningFast(true);
    setTimeout(() => {
      setIsSpinningFast(false);
    }, 2400);
  };

  return (
    <section
      id="skills"
      className="relative mx-auto max-w-[1360px] px-4 sm:px-6 md:px-8 pt-48 sm:pt-52 lg:pt-60 pb-8 lg:pb-12 scroll-mt-0"
      aria-label="Tech Stack: Load Balancer Architecture"
    >
      {/* DESKTOP 1:1 LOAD BALANCER STAGE (Hidden on Mobile/Tablet) */}
      <div className="hidden lg:flex items-center justify-between h-[380px] xl:h-[400px] w-full max-w-[1240px] mx-auto relative select-none">
        
        {/* 1. LEFT CLUSTER: 3 Compact Cards with EQUAL SPACING */}
        <div className="w-[190px] xl:w-[220px] h-full flex flex-col justify-between py-1 z-20">
          {leftRealms.map((realm) => (
            <SkillRealmCard key={realm.id} realm={realm} />
          ))}
        </div>

        {/* 2. LEFT FORK CONNECTOR (SVG Branch Lines meeting at 50% = 190px) */}
        <div className="w-16 xl:w-24 h-full relative z-10 shrink-0">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 100 380"
            preserveAspectRatio="none"
          >
            {/* Top Branch to Card 1 */}
            <line
              x1="0"
              y1="35"
              x2="100"
              y2="190"
              stroke="#30363D"
              strokeWidth="2"
            />
            {/* Middle Branch to Card 2 (Straight Horizontal at 190px) */}
            <line
              x1="0"
              y1="190"
              x2="100"
              y2="190"
              stroke="#30363D"
              strokeWidth="2"
            />
            {/* Bottom Branch to Card 3 */}
            <line
              x1="0"
              y1="345"
              x2="100"
              y2="190"
              stroke="#30363D"
              strokeWidth="2"
            />

            {/* Glowing Amber Pulse on Branches */}
            <line
              x1="0"
              y1="190"
              x2="100"
              y2="190"
              stroke="#E5B869"
              strokeWidth="2"
              strokeOpacity="0.7"
              strokeDasharray="8 12"
              className="animate-pulse"
            />

            {/* Left Fork Convergence Node */}
            <circle
              cx="100"
              cy="190"
              r="4"
              fill="#E5B869"
              className="drop-shadow-[0_0_8px_rgba(229,184,105,0.8)]"
            />
          </svg>
        </div>

        {/* 3. CENTER COLUMN: Straight Line at 50% + Rony & Wheel + Flanking Lore Text */}
        <div className="flex-1 min-w-[320px] max-w-[540px] h-full relative px-2">
          {/* Continuous Straight Horizontal Line running across the center at 50% */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-line via-accent to-line shadow-[0_0_12px_rgba(229,184,105,0.35)] z-0"
          />

          {/* 
            =======================================================================
            RONY & 3D HALO WHEEL & LORE TEXT:
            - 'bottom-[50%]' anchors the bottom edge of this container directly on 
              the central horizontal circuit line (50%).
            - TWEAKING GUIDE: 
              Change '-translate-y-1' below to raise (-translate-y-3) or lower (translate-y-0).
            =======================================================================
          */}
          <div className="absolute bottom-[50%] left-1/2 -translate-x-1/2 -translate-y-1 flex flex-col items-center z-20 pointer-events-none">
            {/* 3D Horizontal Halo Wheel (Floats strictly above Rony's head) */}
            <div className="relative z-30 mb-2 sm:mb-3 pointer-events-auto">
              <MahoragaWheelCanvas isSpinningFast={isSpinningFast} />
            </div>

            {/* Character Row with Flanking Lore Text beside Rony's Torso */}
            <div className="relative flex items-center justify-center">
              {/* Left Lore: Level with Rony's torso */}
              <div className="absolute right-[100%] mr-3 xl:mr-5 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">
                <span className="font-mono text-[11px] xl:text-xs font-bold text-accent italic tracking-wide bg-canvas/90 px-2.5 py-1 rounded-lg border border-line/60 shadow-md">
                  &ldquo;With this treasure...&rdquo;
                </span>
              </div>

              {/* Meditating Rony Cutout (Base rests directly on top of the horizontal line) */}
              <div className="relative z-10 w-[185px] xl:w-[215px] pointer-events-auto transition-transform duration-300 hover:scale-[1.02]">
                <Image
                  src="/images/skills/mediating_rony_final.png"
                  alt="Rony seated in meditation"
                  width={500}
                  height={400}
                  priority
                  className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(229,184,105,0.25)]"
                />
              </div>

              {/* Right Lore: Level with Rony's torso */}
              <div className="absolute left-[100%] ml-3 xl:ml-5 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">
                <span className="font-mono text-[11px] xl:text-xs font-bold text-accent italic tracking-wide bg-canvas/90 px-2.5 py-1 rounded-lg border border-line/60 shadow-md">
                  &ldquo;...I summon AI adaptation&rdquo;
                </span>
              </div>
            </div>
          </div>

          {/* Trigger Button below the straight line */}
          <div className="absolute top-[56%] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5">
            <button
              type="button"
              onClick={handleTriggerAdaptation}
              disabled={isSpinningFast}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-bold transition-all duration-200 active:scale-95 shadow-md ${
                isSpinningFast
                  ? "bg-accent text-on-accent shadow-[0_0_20px_rgba(229,184,105,0.6)] animate-pulse"
                  : "bg-accent text-on-accent hover:opacity-90 hover:shadow-[0_0_16px_rgba(229,184,105,0.35)]"
              }`}
            >
              <RotateCw
                className={`size-3.5 ${isSpinningFast ? "animate-spin" : ""}`}
              />
              <span>{isSpinningFast ? "ADAPTING..." : "☸ TRIGGER ADAPTATION"}</span>
            </button>
            <span className="text-[10px] font-mono text-muted/70 tracking-widest uppercase">
              DRAG HORIZONTALLY TO SPIN
            </span>
          </div>
        </div>

        {/* 4. RIGHT FORK CONNECTOR (SVG Branch Lines starting at 50% = 190px) */}
        <div className="w-16 xl:w-24 h-full relative z-10 shrink-0">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 100 380"
            preserveAspectRatio="none"
          >
            {/* Right Fork Divergence Node */}
            <circle
              cx="0"
              cy="190"
              r="4"
              fill="#E5B869"
              className="drop-shadow-[0_0_8px_rgba(229,184,105,0.8)]"
            />

            {/* Top Branch to Card 4 */}
            <line
              x1="0"
              y1="190"
              x2="100"
              y2="35"
              stroke="#30363D"
              strokeWidth="2"
            />
            {/* Middle Branch to Card 5 (Straight Horizontal at 190px) */}
            <line
              x1="0"
              y1="190"
              x2="100"
              y2="190"
              stroke="#30363D"
              strokeWidth="2"
            />
            {/* Bottom Branch to Card 6 */}
            <line
              x1="0"
              y1="190"
              x2="100"
              y2="345"
              stroke="#30363D"
              strokeWidth="2"
            />

            {/* Glowing Amber Pulse on Branches */}
            <line
              x1="0"
              y1="190"
              x2="100"
              y2="190"
              stroke="#E5B869"
              strokeWidth="2"
              strokeOpacity="0.7"
              strokeDasharray="8 12"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* 5. RIGHT CLUSTER: 3 Compact Cards with EQUAL SPACING */}
        <div className="w-[190px] xl:w-[220px] h-full flex flex-col justify-between py-1 z-20">
          {rightRealms.map((realm) => (
            <SkillRealmCard key={realm.id} realm={realm} />
          ))}
        </div>
      </div>

      {/* MOBILE & TABLET RESPONSIVE FLOW (Vertical Centerpiece + 2-Col Grid) */}
      <div className="flex flex-col lg:hidden space-y-8">
        {/* Pinned Centerpiece on Mobile/Tablet */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* 3D Horizontal Wheel */}
          <div className="mb-2">
            <MahoragaWheelCanvas isSpinningFast={isSpinningFast} />
          </div>

          {/* Meditating Character with Lore text */}
          <div className="relative flex items-center justify-center">
            <div className="w-[180px] sm:w-[200px]">
              <Image
                src="/images/skills/mediating_rony_final.png"
                alt="Rony meditating"
                width={500}
                height={400}
                className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(229,184,105,0.2)]"
              />
            </div>
          </div>

          {/* Manga Lore Subtitle */}
          <div className="text-xs font-mono font-bold text-accent italic mt-2">
            &ldquo;With this treasure, I summon... Full-Stack AI Adaptation&rdquo;
          </div>

          {/* Adaptation CTA */}
          <div className="mt-3 flex flex-col items-center gap-1.5">
            <button
              type="button"
              onClick={handleTriggerAdaptation}
              disabled={isSpinningFast}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 font-mono text-xs font-bold text-on-accent shadow-md transition-all active:scale-95"
            >
              <RotateCw
                className={`size-3.5 ${isSpinningFast ? "animate-spin" : ""}`}
              />
              <span>{isSpinningFast ? "ADAPTING..." : "☸ TRIGGER ADAPTATION"}</span>
            </button>
          </div>
        </div>

        {/* Vertical circuit feeder connecting CTA down into load balancer hub */}
        <div className="flex flex-col items-center -my-3 z-10 pointer-events-none">
          <div className="w-[2px] h-6 bg-gradient-to-b from-accent/80 via-accent to-line shadow-[0_0_8px_rgba(229,184,105,0.5)]" />
        </div>

        {/* MOBILE 1:1 LOAD BALANCER STAGE (Single Horizontal Bus Architecture) */}
        <div className="relative w-full max-w-[430px] mx-auto flex items-center justify-between h-[235px] sm:h-[250px] px-1 select-none">
          {/* Left Cluster: 3 Compact Cards */}
          <div className="w-[135px] sm:w-[155px] h-full flex flex-col justify-between py-1 z-20">
            {leftRealms.map((realm) => (
              <SkillRealmCard key={realm.id} realm={realm} variant="compact" />
            ))}
          </div>

          {/* Central Circuit: Symmetrical 3-Way Forks + Single Horizontal Bus Line */}
          <div className="flex-1 h-full relative z-10 mx-1">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 100 235"
              preserveAspectRatio="none"
            >
              {/* Single Continuous Horizontal Line at 50% (Y = 117.5) */}
              <line
                x1="0"
                y1="117.5"
                x2="100"
                y2="117.5"
                stroke="#30363D"
                strokeWidth="2"
              />

              {/* Glowing Amber Pulse along the central horizontal line */}
              <line
                x1="0"
                y1="117.5"
                x2="100"
                y2="117.5"
                stroke="#E5B869"
                strokeWidth="2"
                strokeOpacity="0.75"
                strokeDasharray="6 8"
                className="animate-pulse"
              />

              {/* LEFT 3-WAY FORK CONVERGENCE (Meeting at (35, 117.5)) */}
              {/* Top Branch (Card 1: Frontend) */}
              <line
                x1="0"
                y1="28"
                x2="35"
                y2="117.5"
                stroke="#30363D"
                strokeWidth="1.5"
              />
              {/* Bottom Branch (Card 3: Database) */}
              <line
                x1="0"
                y1="207"
                x2="35"
                y2="117.5"
                stroke="#30363D"
                strokeWidth="1.5"
              />

              {/* RIGHT 3-WAY FORK DIVERGENCE (Starting from (65, 117.5)) */}
              {/* Top Branch (Card 4: AI Agents) */}
              <line
                x1="65"
                y1="117.5"
                x2="100"
                y2="28"
                stroke="#30363D"
                strokeWidth="1.5"
              />
              {/* Bottom Branch (Card 6: Tooling) */}
              <line
                x1="65"
                y1="117.5"
                x2="100"
                y2="207"
                stroke="#30363D"
                strokeWidth="1.5"
              />

              {/* Left & Right Convergence Nodes */}
              <circle
                cx="35"
                cy="117.5"
                r="3.5"
                fill="#E5B869"
                className="drop-shadow-[0_0_6px_rgba(229,184,105,0.8)]"
              />
              <circle
                cx="65"
                cy="117.5"
                r="3.5"
                fill="#E5B869"
                className="drop-shadow-[0_0_6px_rgba(229,184,105,0.8)]"
              />

              {/* Center Main Power Hub Node */}
              <circle
                cx="50"
                cy="117.5"
                r="4.5"
                fill="#E5B869"
                className="drop-shadow-[0_0_8px_rgba(229,184,105,0.9)] animate-pulse"
              />
            </svg>
          </div>

          {/* Right Cluster: 3 Compact Cards */}
          <div className="w-[135px] sm:w-[155px] h-full flex flex-col justify-between py-1 z-20">
            {rightRealms.map((realm) => (
              <SkillRealmCard key={realm.id} realm={realm} variant="compact" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
