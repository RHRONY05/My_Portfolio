"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { SKILL_PILLARS, type SkillPillar } from "./skillsData";
import { SkillRealmCard } from "./SkillRealmCard";
import { LazyViewportMount } from "../common/LazyViewportMount";

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

// Lightweight procedural mechanical ratchet click via shared Web Audio API
let sharedAudioCtx: AudioContext | null = null;

function playRatchetClick() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;

    if (!sharedAudioCtx || sharedAudioCtx.state === "closed") {
      sharedAudioCtx = new AudioContextClass();
    }
    if (sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume().catch(() => {});
    }

    const ctx = sharedAudioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // AudioContext blocked or unsupported in current environment
  }
}

interface CircuitPoints {
  p1: { x: number; y: number };
  p2: { x: number; y: number };
  p3: { x: number; y: number };
  p4: { x: number; y: number };
  hubLeftX: number;
  hubRightX: number;
  centerY: number;
  width: number;
  height: number;
}

export function SkillsLoadBalancer() {
  const [activePillarId, setActivePillarId] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<CircuitPoints | null>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Measure EXACT sub-pixel positions of card center pins and center fork hubs
  const measurePoints = () => {
    if (!stageRef.current) return;
    const sRect = stageRef.current.getBoundingClientRect();
    if (sRect.width === 0 || sRect.height === 0) return;

    const getCoord = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - sRect.left,
        y: r.top + r.height / 2 - sRect.top,
      };
    };

    const p1 = getCoord("card-pin-strategy-architecture");
    const p2 = getCoord("card-pin-backend-systems");
    const p3 = getCoord("card-pin-autonomous-ai-agents");
    const p4 = getCoord("card-pin-cloud-devops-dx");

    const centerX = sRect.width / 2;
    const centerY = sRect.height / 2;

    // Longer straight horizontal line: hubOffset between 190px and 240px
    const hubOffset = Math.min(240, Math.max(180, sRect.width * 0.17));
    const hubLeftX = centerX - hubOffset;
    const hubRightX = centerX + hubOffset;

    if (p1 && p2 && p3 && p4) {
      setPoints({
        p1,
        p2,
        p3,
        p4,
        hubLeftX,
        hubRightX,
        centerY,
        width: sRect.width,
        height: sRect.height,
      });
    }
  };

  useLayoutEffect(() => {
    measurePoints();
  }, [isDesktop]);

  useEffect(() => {
    const handleResize = () => measurePoints();
    window.addEventListener("resize", handleResize);
    const t1 = setTimeout(measurePoints, 60);
    const t2 = setTimeout(measurePoints, 250);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handlePillarHover = (pillarId: string | null) => {
    if (pillarId && pillarId !== activePillarId) {
      playRatchetClick();
    }
    setActivePillarId(pillarId);
  };

  const leftPillars = SKILL_PILLARS.filter((p) => p.side === "left");
  const rightPillars = SKILL_PILLARS.filter((p) => p.side === "right");

  return (
    <section
      id="skills"
      aria-label="Technical Skills and Planning Architecture"
      className="relative w-full pt-20 sm:pt-28 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 bg-canvas overflow-hidden"
    >
      {/* Background Subtle Blueprint Grid Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Flowing Dotted Red Pipeline Keyframes */}
      <style jsx>{`
        @keyframes dottedFlow {
          0% {
            stroke-dashoffset: 32;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      <div className="relative mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            DESKTOP BALANCED LOAD BALANCER STAGE (Hidden on Mobile/Tablet)
            Left (2 Cards + Gap) <-> Center Straight Line (Rony Seated On Top) <-> Right (2 Cards + Gap)
            ========================================================================= */}
        <div
          ref={stageRef}
          className="hidden lg:flex items-center justify-between h-[480px] xl:h-[510px] w-full relative select-none"
        >
          {/* 1. LEFT CLUSTER: 2 Sleek Cards with Clear Vertical Gap */}
          <div className="w-[280px] xl:w-[320px] h-full flex flex-col justify-center gap-12 xl:gap-16 z-20 shrink-0">
            {leftPillars.map((pillar) => (
              <SkillRealmCard
                key={pillar.id}
                pillar={pillar}
                isHovered={activePillarId === pillar.id}
                onHoverChange={(hovered) =>
                  handlePillarHover(hovered ? pillar.id : null)
                }
              />
            ))}
          </div>

          {/* 2. CENTER COLUMN: RONY SEATED DIRECTLY ON CONTINUOUS BASELINE */}
          <div className="flex-1 h-full relative flex flex-col items-center justify-center z-20 px-4">
            {/* RONY & 3D HALO WHEEL & LORE TEXT (Seated Directly ON the Baseline at bottom-[50%]) */}
            <div className="absolute bottom-[50%] left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none">
              {/* 3D Horizontal Halo Wheel */}
              <div className="relative z-30 mb-2 pointer-events-auto">
                <LazyViewportMount
                  fallback={
                    <div className="flex w-[280px] h-[110px] items-center justify-center">
                      <div className="size-6 animate-spin rounded-full border-2 border-line border-t-accent" />
                    </div>
                  }
                >
                  {() =>
                    isDesktop ? (
                      <div onClick={playRatchetClick}>
                        <MahoragaWheelCanvas
                          isSpinningFast={activePillarId !== null}
                        />
                      </div>
                    ) : null
                  }
                </LazyViewportMount>
              </div>

              {/* Character Row with Flanking Lore Badges */}
              <div className="relative flex items-center justify-center">
                {/* Left Lore Badge */}
                <div className="absolute right-[100%] mr-4 xl:mr-6 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">
                  <span className="font-mono text-[11px] xl:text-xs font-semibold text-secondary italic tracking-wide bg-card/90 px-3 py-1.5 rounded-xl border border-line shadow-sm">
                    &ldquo;Analyze &amp; formulate&rdquo;
                  </span>
                </div>

                {/* Meditating Rony Cutout (Directly seated on top of the straight line) */}
                <div className="relative z-10 w-[155px] xl:w-[185px] pointer-events-auto transition-transform duration-300 hover:scale-[1.02]">
                  <Image
                    src="/images/skills/mediating_rony_final.webp"
                    alt="Rony seated in meditation planning architecture"
                    width={500}
                    height={400}
                    loading="lazy"
                    className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(var(--color-accent-rgb),0.18)]"
                  />
                </div>

                {/* Right Lore Badge */}
                <div className="absolute left-[100%] ml-4 xl:ml-6 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">
                  <span className="font-mono text-[11px] xl:text-xs font-semibold text-secondary italic tracking-wide bg-card/90 px-3 py-1.5 rounded-xl border border-line shadow-sm">
                    &ldquo;...Execute with precision&rdquo;
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. RIGHT CLUSTER: 2 Sleek Cards with Clear Vertical Gap */}
          <div className="w-[280px] xl:w-[320px] h-full flex flex-col justify-center gap-12 xl:gap-16 z-20 shrink-0">
            {rightPillars.map((pillar) => (
              <SkillRealmCard
                key={pillar.id}
                pillar={pillar}
                isHovered={activePillarId === pillar.id}
                onHoverChange={(hovered) =>
                  handlePillarHover(hovered ? pillar.id : null)
                }
              />
            ))}
          </div>

          {/* =========================================================================
              4. UNIFIED DOTTED FLOWING BURNT ORANGE PIPELINE SVG
              Underlying neutral baseline track + animated flowing dotted burnt orange pipeline
              ========================================================================= */}
          {points && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
              viewBox={`0 0 ${points.width} ${points.height}`}
            >
              {/* Underlying Structural Baseline Track (Subtle passive line) */}
              <g
                stroke="var(--color-line)"
                strokeWidth="1.5"
                strokeOpacity="0.35"
                strokeLinecap="round"
              >
                {/* Center Baseline under Rony */}
                <line
                  x1={points.hubLeftX}
                  y1={points.centerY}
                  x2={points.hubRightX}
                  y2={points.centerY}
                />
                {/* Left Top Diagonal */}
                <line
                  x1={points.p1.x}
                  y1={points.p1.y}
                  x2={points.hubLeftX}
                  y2={points.centerY}
                />
                {/* Left Bottom Diagonal */}
                <line
                  x1={points.p2.x}
                  y1={points.p2.y}
                  x2={points.hubLeftX}
                  y2={points.centerY}
                />
                {/* Right Top Diagonal */}
                <line
                  x1={points.hubRightX}
                  y1={points.centerY}
                  x2={points.p3.x}
                  y2={points.p3.y}
                />
                {/* Right Bottom Diagonal */}
                <line
                  x1={points.hubRightX}
                  y1={points.centerY}
                  x2={points.p4.x}
                  y2={points.p4.y}
                />
              </g>

              {/* Active Flowing Dotted Burnt Orange Pipeline */}
              <g
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeDasharray="6 10"
                strokeLinecap="round"
                style={{
                  animation: "dottedFlow 1.6s linear infinite",
                }}
              >
                {/* Left Top Diagonal: Card 1 -> Left Hub */}
                <line
                  x1={points.p1.x}
                  y1={points.p1.y}
                  x2={points.hubLeftX}
                  y2={points.centerY}
                  strokeWidth={
                    activePillarId === "strategy-architecture" ? "2.6" : "2"
                  }
                />

                {/* Left Bottom Diagonal: Card 2 -> Left Hub */}
                <line
                  x1={points.p2.x}
                  y1={points.p2.y}
                  x2={points.hubLeftX}
                  y2={points.centerY}
                  strokeWidth={
                    activePillarId === "backend-systems" ? "2.6" : "2"
                  }
                />

                {/* Center Baseline under Rony: Left Hub -> Right Hub */}
                <line
                  x1={points.hubLeftX}
                  y1={points.centerY}
                  x2={points.hubRightX}
                  y2={points.centerY}
                  strokeWidth="2"
                />

                {/* Right Top Diagonal: Right Hub -> Card 3 */}
                <line
                  x1={points.hubRightX}
                  y1={points.centerY}
                  x2={points.p3.x}
                  y2={points.p3.y}
                  strokeWidth={
                    activePillarId === "autonomous-ai-agents" ? "2.6" : "2"
                  }
                />

                {/* Right Bottom Diagonal: Right Hub -> Card 4 */}
                <line
                  x1={points.hubRightX}
                  y1={points.centerY}
                  x2={points.p4.x}
                  y2={points.p4.y}
                  strokeWidth={
                    activePillarId === "cloud-devops-dx" ? "2.6" : "2"
                  }
                />
              </g>

              {/* Node Junctions & Contact Pins */}
              <g fill="var(--color-accent)">
                {/* Left Hub Convergence Node */}
                <circle
                  cx={points.hubLeftX}
                  cy={points.centerY}
                  r="3.5"
                  className="drop-shadow-[0_0_6px_rgba(var(--color-accent-rgb),0.8)]"
                />
                {/* Right Hub Divergence Node */}
                <circle
                  cx={points.hubRightX}
                  cy={points.centerY}
                  r="3.5"
                  className="drop-shadow-[0_0_6px_rgba(var(--color-accent-rgb),0.8)]"
                />
                {/* Center Power Hub Node under Rony */}
                <circle
                  cx={(points.hubLeftX + points.hubRightX) / 2}
                  cy={points.centerY}
                  r="4"
                  className="drop-shadow-[0_0_8px_rgba(var(--color-accent-rgb),0.9)]"
                />

                {/* Contact Pin Dots at Card Edges */}
                <circle
                  cx={points.p1.x}
                  cy={points.p1.y}
                  r="3"
                  fill={
                    activePillarId === "strategy-architecture"
                      ? "var(--color-card-hover-border)"
                      : "var(--color-accent)"
                  }
                />
                <circle
                  cx={points.p2.x}
                  cy={points.p2.y}
                  r="3"
                  fill={
                    activePillarId === "backend-systems"
                      ? "var(--color-card-hover-border)"
                      : "var(--color-accent)"
                  }
                />
                <circle
                  cx={points.p3.x}
                  cy={points.p3.y}
                  r="3"
                  fill={
                    activePillarId === "autonomous-ai-agents"
                      ? "var(--color-card-hover-border)"
                      : "var(--color-accent)"
                  }
                />
                <circle
                  cx={points.p4.x}
                  cy={points.p4.y}
                  r="3"
                  fill={
                    activePillarId === "cloud-devops-dx"
                      ? "var(--color-card-hover-border)"
                      : "var(--color-accent)"
                  }
                />
              </g>
            </svg>
          )}
        </div>

        {/* =========================================================================
            MOBILE / TABLET STACK (< 1024px)
            3D Wheel Available on ALL Devices (Zero WebGL context duplication)
            ========================================================================= */}
        <div className="lg:hidden flex flex-col items-center">
          {/* Top Character + 3D Mahoraga Wheel on Mobile */}
          <div className="relative flex flex-col items-center mb-8">
            {/* 3D Wheel on Mobile/Tablet */}
            <div className="relative z-30 mb-2 pointer-events-auto">
              <LazyViewportMount
                fallback={
                  <div className="flex w-[260px] h-[95px] items-center justify-center">
                    <div className="size-5 animate-spin rounded-full border-2 border-line border-t-accent" />
                  </div>
                }
              >
                {() =>
                  !isDesktop ? (
                    <div onClick={playRatchetClick}>
                      <MahoragaWheelCanvas
                        isSpinningFast={activePillarId !== null}
                      />
                    </div>
                  ) : null
                }
              </LazyViewportMount>
            </div>

            {/* Meditating Rony on Mobile */}
            <div className="relative z-10 w-[140px] sm:w-[165px]">
              <Image
                src="/images/skills/mediating_rony_final.webp"
                alt="Rony seated in meditation planning architecture"
                width={500}
                height={400}
                loading="lazy"
                className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(var(--color-accent-rgb),0.18)]"
              />
            </div>
          </div>

          {/* Flowing Dotted Burnt Orange Connector Stem on Mobile */}
          <div className="w-4 h-10 mb-6 flex justify-center">
            <svg className="w-4 h-full overflow-visible" viewBox="0 0 16 40">
              <line
                x1="8"
                y1="0"
                x2="8"
                y2="40"
                stroke="var(--color-line)"
                strokeWidth="1.5"
                strokeOpacity="0.35"
              />
              <line
                x1="8"
                y1="0"
                x2="8"
                y2="40"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeDasharray="6 8"
                style={{ animation: "dottedFlow 1.6s linear infinite" }}
              />
              <circle cx="8" cy="40" r="3" fill="var(--color-accent)" />
            </svg>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {SKILL_PILLARS.map((pillar) => (
              <SkillRealmCard
                key={pillar.id}
                pillar={pillar}
                isHovered={activePillarId === pillar.id}
                onHoverChange={(hovered) =>
                  handlePillarHover(hovered ? pillar.id : null)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
