"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  RotateCw,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { SKILL_REALMS } from "./skillsData";
import { SkillRealmCard } from "./SkillRealmCard";
import { LazyViewportMount } from "../common/LazyViewportMount";
import {
  ADAPTATION_SCENARIOS,
  type AdaptationScenario,
} from "./adaptationScenarios";

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

interface FlyingToken {
  id: string;
  name: string;
  icon: string;
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
  delay: number;
}

export function SkillsLoadBalancer() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [isSolving, setIsSolving] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [showPulseRing, setShowPulseRing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [flyingTools, setFlyingTools] = useState<FlyingToken[]>([]);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const currentScenario: AdaptationScenario = ADAPTATION_SCENARIOS[scenarioIndex];
  const leftRealms = SKILL_REALMS.filter((r) => r.side === "left");
  const rightRealms = SKILL_REALMS.filter((r) => r.side === "right");

  const isLeftActive = leftRealms.some((r) => r.id === activeCardId);
  const isRightActive = rightRealms.some((r) => r.id === activeCardId);

  // Dismiss open card popovers when tapping or clicking outside
  useEffect(() => {
    if (!activeCardId) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[id^="realm-card-"]')) {
        return;
      }
      setActiveCardId(null);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [activeCardId]);

  const handleSolveProblem = () => {
    if (isSolving) return;

    // 1. Measure the exact center coordinates of the 3D Wheel on the user's screen
    const targetElem = wheelRef.current;
    if (!targetElem) return;

    const wheelRect = targetElem.getBoundingClientRect();
    const targetX = wheelRect.left + wheelRect.width / 2;
    const targetY = wheelRect.top + wheelRect.height / 2;

    // 2. Measure starting positions of the respective cards solving the challenge
    const tokens: FlyingToken[] = currentScenario.toolsUsed.map((tool, idx) => {
      const cardElem = document.getElementById(`realm-card-${tool.realmId}`);
      const cardRect = cardElem?.getBoundingClientRect();

      let startX = window.innerWidth / 2;
      let startY = window.innerHeight / 2;

      if (cardRect) {
        startX = tool.side === "left" ? cardRect.right - 8 : cardRect.left + 8;
        startY = cardRect.top + cardRect.height / 2;
      }

      return {
        id: `${currentScenario.id}-${tool.name}-${idx}-${Date.now()}`,
        name: tool.name,
        icon: tool.icon,
        startX,
        startY,
        deltaX: targetX - startX,
        deltaY: targetY - startY,
        delay: idx * 200,
      };
    });

    setFlyingTools(tokens);
    setIsSolving(true);
    setIsSolved(false);

    // Duration of tool inflow & wheel adaptation
    setTimeout(() => {
      setIsSolving(false);
      setIsSolved(true);
      setFlyingTools([]);
      setShowPulseRing(true);
      setTimeout(() => setShowPulseRing(false), 900);
    }, 1900);
  };

  const handleNextScenario = () => {
    if (isSolving) return;
    setScenarioIndex((prev) => (prev + 1) % ADAPTATION_SCENARIOS.length);
    setIsSolved(false);
  };

  const handlePrevScenario = () => {
    if (isSolving) return;
    setScenarioIndex((prev) =>
      prev === 0 ? ADAPTATION_SCENARIOS.length - 1 : prev - 1
    );
    setIsSolved(false);
  };

  const animDuration = isSolving ? "0.7s" : "1.8s";

  return (
    <section
      className="relative mx-auto max-w-[1360px] px-4 sm:px-6 md:px-8 pt-48 sm:pt-52 lg:pt-60 pb-8 lg:pb-12"
      aria-label="Tech Stack: Load Balancer Architecture"
    >
      {/* 
        Scroll anchor offset: Positions the load balancer stage higher into the viewport
        when clicking "Skills" in the navbar, ensuring all bottom cards and HUD fit in view,
        while preserving all original top spacing for natural scrolling.
      */}
      <div
        id="skills"
        className="absolute top-24 sm:top-28 lg:top-28 scroll-mt-14 pointer-events-none"
        aria-hidden="true"
      />
      <style>{`
        @keyframes cleanPulseIn {
          0% { stroke-dashoffset: 16; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes cleanPulseOut {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -16; }
        }

        /* Mathematically measured flight path directly to the exact center of the 3D Wheel */
        @keyframes dynamicFlightToWheel {
          0% {
            transform: translate(-50%, -50%) scale(0.6);
            opacity: 0;
          }
          18% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.05);
          }
          65% {
            opacity: 0.95;
            transform: translate(
              calc(-50% + var(--dx) * 0.72),
              calc(-50% + var(--dy) * 0.72 - 24px)
            ) scale(0.85);
          }
          100% {
            transform: translate(
              calc(-50% + var(--dx)),
              calc(-50% + var(--dy))
            ) scale(0.18) rotate(130deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* DESKTOP 1:1 LOAD BALANCER STAGE (Hidden on Mobile/Tablet) */}
      <div className={`hidden lg:flex items-center justify-between h-[440px] xl:h-[460px] w-full max-w-[1280px] mx-auto relative select-none transition-all ${
        activeCardId ? "z-40" : "z-20"
      }`}>
        {/* 1. LEFT CLUSTER: 3 Cards */}
        <div className={`w-[215px] xl:w-[240px] h-full flex flex-col justify-between py-1 transition-all ${
          isLeftActive ? "z-50" : "z-20"
        }`}>
          {leftRealms.map((realm) => {
            const isTarget = currentScenario.activeRealmIds.includes(realm.id);
            return (
              <SkillRealmCard
                key={realm.id}
                realm={realm}
                isActiveRouting={isSolving && isTarget}
                isDimmed={isSolving && !isTarget}
                isOpen={activeCardId === realm.id}
                onOpenChange={(open) => setActiveCardId(open ? realm.id : null)}
              />
            );
          })}
        </div>

        {/* 2. LEFT FORK CONNECTOR (Selectively highlights wires leading to active domains) */}
        <div className="w-14 xl:w-20 h-full relative z-10 shrink-0">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 100 440"
            preserveAspectRatio="none"
          >
            {/* Base Wire Tracks */}
            <line x1="0" y1="40" x2="100" y2="220" stroke="var(--color-line)" strokeWidth="1.5" strokeOpacity="0.4" />
            <line x1="0" y1="220" x2="100" y2="220" stroke="var(--color-line)" strokeWidth="1.5" strokeOpacity="0.4" />
            <line x1="0" y1="400" x2="100" y2="220" stroke="var(--color-line)" strokeWidth="1.5" strokeOpacity="0.4" />

            {/* Branch 1 (Frontend): Active only during solving */}
            {isSolving && currentScenario.activeRealmIds.includes("frontend") && (
              <line
                x1="0"
                y1="40"
                x2="100"
                y2="220"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeDasharray="6 8"
                strokeOpacity="1"
                style={{ animation: `cleanPulseIn ${animDuration} linear infinite` }}
              />
            )}

            {/* Branch 2 (Backend): Active only during solving */}
            {isSolving && currentScenario.activeRealmIds.includes("backend") && (
              <line
                x1="0"
                y1="220"
                x2="100"
                y2="220"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeDasharray="6 8"
                strokeOpacity="1"
                style={{ animation: `cleanPulseIn ${animDuration} linear infinite` }}
              />
            )}

            {/* Branch 3 (Database): Active only during solving */}
            {isSolving && currentScenario.activeRealmIds.includes("database") && (
              <line
                x1="0"
                y1="400"
                x2="100"
                y2="220"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeDasharray="6 8"
                strokeOpacity="1"
                style={{ animation: `cleanPulseIn ${animDuration} linear infinite` }}
              />
            )}

            {/* Left Fork Convergence Hub Node */}
            <circle cx="100" cy="220" r="3.5" fill="var(--color-accent)" />
          </svg>
        </div>

        {/* 3. CENTER COLUMN: Straight Line + Rony & Halo + Problem/Solution HUD Box */}
        <div className="flex-1 min-w-[360px] max-w-[580px] xl:max-w-[640px] h-full relative px-2">
          {/* Continuous Straight Horizontal Line running across the center at 50% */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-line z-0"
          />

          {/* Smooth Center Pulse Line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] pointer-events-none z-0">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <line
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                strokeDasharray="6 10"
                strokeOpacity={isSolving ? "0.9" : "0.55"}
                style={{ animation: `cleanPulseIn ${animDuration} linear infinite` }}
              />
            </svg>
          </div>

          {/* RONY & 3D HALO WHEEL & LORE TEXT */}
          <div className="absolute bottom-[50%] left-1/2 -translate-x-1/2 -translate-y-1 flex flex-col items-center z-20 pointer-events-none">
            {/* 3D Horizontal Halo Wheel */}
            <div
              ref={wheelRef}
              className="relative z-30 mb-2 sm:mb-3 pointer-events-auto"
            >
              <LazyViewportMount
                fallback={
                  <div className="flex w-[280px] h-[110px] items-center justify-center">
                    <div className="size-6 animate-spin rounded-full border-2 border-line border-t-accent" />
                  </div>
                }
              >
                {() => (isDesktop ? <MahoragaWheelCanvas isSpinningFast={isSolving} /> : null)}
              </LazyViewportMount>

              {/* Expanding Pulse Ring upon countermeasure completion */}
              {showPulseRing && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-24 rounded-full border-2 border-accent animate-ping pointer-events-none" />
              )}
            </div>

            {/* Character Row with Flanking Lore Text beside Rony's Torso */}
            <div className="relative flex items-center justify-center">
              {/* Left Lore: Level with Rony's torso */}
              <div className="absolute right-[100%] mr-3 xl:mr-5 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">
                <span className="font-mono text-[11px] xl:text-xs font-bold text-accent italic tracking-wide bg-canvas/90 px-2.5 py-1 rounded-lg border border-line/60 shadow-md">
                  &ldquo;With this treasure...&rdquo;
                </span>
              </div>

              {/* Meditating Rony Cutout */}
              <div className="relative z-10 w-[175px] xl:w-[200px] pointer-events-auto transition-transform duration-300 hover:scale-[1.02]">
                <Image
                  src="/images/skills/mediating_rony_final.webp"
                  alt="Rony seated in meditation"
                  width={500}
                  height={400}
                  loading="lazy"
                  className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(var(--color-accent-rgb),0.2)]"
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

          {/* 
            =======================================================================
            PROBLEM-SOLVING HUD CARD
            - Overflow-safe layout
            - Tools only revealed when solution is shown
            =======================================================================
          */}
          <div className="absolute top-[52%] xl:top-[53%] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center w-full max-w-[460px] xl:max-w-[500px] px-2 text-center">
            <div className="w-full rounded-2xl border border-line bg-card/95 backdrop-blur-md p-3.5 sm:p-4 shadow-xl text-left transition-all duration-300">
              {/* Header row: Category / Status + Step + Navigation */}
              <div className="flex items-center justify-between gap-2 pb-2 mb-2.5 border-b border-line/60">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-mono text-[9px] sm:text-[9.5px] font-bold tracking-wider uppercase border ${
                      isSolved
                        ? "border-accent/60 bg-accent/15 text-accent"
                        : isSolving
                        ? "border-accent bg-accent text-on-accent animate-pulse"
                        : "border-line bg-canvas/80 text-secondary"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        isSolved
                          ? "bg-accent"
                          : isSolving
                          ? "bg-on-accent animate-ping"
                          : "bg-accent/70"
                      }`}
                    />
                    {isSolved
                      ? "SOLVED COUNTERMEASURE"
                      : isSolving
                      ? "SOLVING..."
                      : currentScenario.category}
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    {currentScenario.step}
                  </span>
                </div>

                {/* Prev / Next controls */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={handlePrevScenario}
                    disabled={isSolving}
                    aria-label="Previous challenge"
                    className="size-6 rounded-md border border-line/70 bg-canvas/60 hover:bg-canvas hover:border-accent text-muted hover:text-fg flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronLeft className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextScenario}
                    disabled={isSolving}
                    aria-label="Next challenge"
                    className="size-6 rounded-md border border-line/70 bg-canvas/60 hover:bg-canvas hover:border-accent text-muted hover:text-fg flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronRight className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* Body Content */}
              {!isSolved ? (
                /* 1. CHALLENGE STATE: Clean problem statement, no stack preview */
                <div>
                  <h3 className="font-mono text-xs sm:text-[13px] font-bold text-fg flex items-center gap-1.5">
                    <AlertTriangle className="size-3.5 text-accent shrink-0" />
                    <span className="truncate">{currentScenario.problemTitle}</span>
                  </h3>

                  <p className="text-[11px] text-muted leading-relaxed mt-1.5 line-clamp-2">
                    {currentScenario.problemDesc}
                  </p>

                  {/* Clean Action Footer */}
                  <div className="flex items-center justify-end gap-3 mt-3 pt-2.5 border-t border-line/40">
                    <button
                      type="button"
                      onClick={handleSolveProblem}
                      disabled={isSolving}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-mono text-xs font-bold transition-all shadow-md cursor-pointer ${
                        isSolving
                          ? "bg-accent text-on-accent animate-pulse shadow-[0_0_12px_rgba(var(--color-accent-rgb),0.4)]"
                          : "bg-accent text-on-accent hover:opacity-90 active:scale-95 shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.25)]"
                      }`}
                    >
                      <RotateCw className={`size-3.5 ${isSolving ? "animate-spin" : ""}`} />
                      <span>{isSolving ? "SOLVING..." : "SOLVE PROBLEM"}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* 2. SOLVED COUNTERMEASURE STATE: Overflow-proof title & metric */
                <div>
                  <div className="space-y-1">
                    <h3 className="font-mono text-xs sm:text-[13px] font-bold text-fg flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-accent shrink-0" />
                      <span className="truncate">{currentScenario.solutionTitle}</span>
                    </h3>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 font-mono text-[9.5px] px-2 py-0.5 rounded border border-accent/40 bg-accent/10 text-accent font-semibold">
                        ⚡ {currentScenario.metric}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-muted leading-relaxed mt-1.5 line-clamp-2">
                    {currentScenario.solutionDesc}
                  </p>

                  {/* Footer: Tools Orchestrated + Next Challenge CTA */}
                  <div className="flex items-center justify-between gap-3 mt-3 pt-2.5 border-t border-line/40">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-mono text-[9.5px] text-accent font-semibold shrink-0">
                        Orchestrated:
                      </span>
                      <div className="flex items-center gap-1 overflow-hidden">
                        {currentScenario.toolsUsed.map((tool) => (
                          <span
                            key={tool.name}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-accent/40 bg-accent/10 font-mono text-[9px] text-accent font-medium whitespace-nowrap"
                          >
                            <img src={tool.icon} alt="" className="size-2.5 object-contain" />
                            {tool.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={handleSolveProblem}
                        title="Replay Solution"
                        className="size-7 rounded-lg border border-line bg-canvas hover:border-accent text-muted hover:text-accent flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <RotateCw className="size-3" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextScenario}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 font-mono text-[11px] font-bold text-on-accent hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer"
                      >
                        <span>Next ({ADAPTATION_SCENARIOS[(scenarioIndex + 1) % ADAPTATION_SCENARIOS.length].step})</span>
                        <ArrowRight className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. RIGHT FORK CONNECTOR (Selectively highlights wires leading to active domains) */}
        <div className="w-14 xl:w-20 h-full relative z-10 shrink-0">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 100 440"
            preserveAspectRatio="none"
          >
            {/* Right Fork Divergence Node */}
            <circle cx="0" cy="220" r="3.5" fill="var(--color-accent)" />

            {/* Base Wire Tracks */}
            <line x1="0" y1="220" x2="100" y2="40" stroke="var(--color-line)" strokeWidth="1.5" strokeOpacity="0.4" />
            <line x1="0" y1="220" x2="100" y2="220" stroke="var(--color-line)" strokeWidth="1.5" strokeOpacity="0.4" />
            <line x1="0" y1="220" x2="100" y2="400" stroke="var(--color-line)" strokeWidth="1.5" strokeOpacity="0.4" />

            {/* Branch 4 (AI Automations): Active only during solving */}
            {isSolving && currentScenario.activeRealmIds.includes("ai-agents") && (
              <line
                x1="0"
                y1="220"
                x2="100"
                y2="40"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeDasharray="6 8"
                strokeOpacity="1"
                style={{ animation: `cleanPulseOut ${animDuration} linear infinite` }}
              />
            )}

            {/* Branch 5 (DevOps): Active only during solving */}
            {isSolving && currentScenario.activeRealmIds.includes("devops") && (
              <line
                x1="0"
                y1="220"
                x2="100"
                y2="220"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeDasharray="6 8"
                strokeOpacity="1"
                style={{ animation: `cleanPulseOut ${animDuration} linear infinite` }}
              />
            )}

            {/* Branch 6 (Tooling): Active only during solving */}
            {isSolving && currentScenario.activeRealmIds.includes("tooling") && (
              <line
                x1="0"
                y1="220"
                x2="100"
                y2="400"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeDasharray="6 8"
                strokeOpacity="1"
                style={{ animation: `cleanPulseOut ${animDuration} linear infinite` }}
              />
            )}
          </svg>
        </div>

        {/* 5. RIGHT CLUSTER: 3 Cards */}
        <div className={`w-[215px] xl:w-[240px] h-full flex flex-col justify-between py-1 transition-all ${
          isRightActive ? "z-50" : "z-20"
        }`}>
          {rightRealms.map((realm) => {
            const isTarget = currentScenario.activeRealmIds.includes(realm.id);
            return (
              <SkillRealmCard
                key={realm.id}
                realm={realm}
                isActiveRouting={isSolving && isTarget}
                isDimmed={isSolving && !isTarget}
                isOpen={activeCardId === realm.id}
                onOpenChange={(open) => setActiveCardId(open ? realm.id : null)}
              />
            );
          })}
        </div>
      </div>

      {/* MOBILE & TABLET RESPONSIVE FLOW */}
      <div className="flex flex-col lg:hidden space-y-8">
        {/* Pinned Centerpiece on Mobile/Tablet */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* 3D Horizontal Wheel */}
          <div className="relative mb-2">
            <LazyViewportMount
              fallback={
                <div className="flex w-[280px] h-[110px] items-center justify-center">
                  <div className="size-6 animate-spin rounded-full border-2 border-line border-t-accent" />
                </div>
              }
            >
              {() => (!isDesktop ? <MahoragaWheelCanvas isSpinningFast={isSolving} /> : null)}
            </LazyViewportMount>

            {/* Mobile Pulse Ring */}
            {showPulseRing && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full border-2 border-accent animate-ping pointer-events-none" />
            )}
          </div>

          {/* Meditating Character with Lore text */}
          <div className="relative flex items-center justify-center">
            <div className="w-[180px] sm:w-[200px]">
              <Image
                src="/images/skills/mediating_rony_final.webp"
                alt="Rony meditating"
                width={500}
                height={400}
                className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(var(--color-accent-rgb),0.2)]"
              />
            </div>
          </div>

          {/* Manga Lore Subtitle */}
          <div className="text-xs font-mono font-bold text-accent italic mt-2">
            &ldquo;With this treasure, I summon... Full-Stack AI Adaptation&rdquo;
          </div>
        </div>

        {/* Vertical circuit feeder connecting down into load balancer hub */}
        <div className="flex flex-col items-center my-2 z-10 pointer-events-none">
          <div className="w-[1.5px] h-7 bg-gradient-to-b from-accent/80 via-accent to-line" />
        </div>

        {/* MOBILE 1:1 LOAD BALANCER STAGE */}
        <div className={`relative w-full max-w-[430px] mx-auto flex items-center justify-between h-[235px] sm:h-[250px] px-1 select-none transition-all ${
          activeCardId ? "z-40" : "z-20"
        }`}>
          {/* Left Cluster: 3 Compact Cards */}
          <div className={`w-[135px] sm:w-[155px] h-full flex flex-col justify-between py-1 transition-all ${
            isLeftActive ? "z-50" : "z-20"
          }`}>
            {leftRealms.map((realm) => (
              <SkillRealmCard
                key={realm.id}
                realm={realm}
                variant="compact"
                isOpen={activeCardId === realm.id}
                onOpenChange={(open) => setActiveCardId(open ? realm.id : null)}
              />
            ))}
          </div>

          {/* Central Circuit: Symmetrical 3-Way Forks + Active Routing */}
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
                stroke="var(--color-line)"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />

              {/* Clean Smooth Pulse along central horizontal line */}
              <line
                x1="0"
                y1="117.5"
                x2="100"
                y2="117.5"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                strokeOpacity={isSolving ? "0.9" : "0.55"}
                strokeDasharray="5 8"
                style={{
                  animation: `cleanPulseIn ${animDuration} linear infinite`,
                }}
              />

              {/* LEFT 3-WAY FORK CONVERGENCE */}
              <line x1="0" y1="28" x2="35" y2="117.5" stroke="var(--color-line)" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="0" y1="207" x2="35" y2="117.5" stroke="var(--color-line)" strokeWidth="1.5" strokeOpacity="0.4" />

              {isSolving && currentScenario.activeRealmIds.includes("frontend") && (
                <line
                  x1="0"
                  y1="28"
                  x2="35"
                  y2="117.5"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  strokeDasharray="5 8"
                  strokeOpacity="1"
                  style={{ animation: `cleanPulseIn ${animDuration} linear infinite` }}
                />
              )}

              {isSolving && currentScenario.activeRealmIds.includes("database") && (
                <line
                  x1="0"
                  y1="207"
                  x2="35"
                  y2="117.5"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  strokeDasharray="5 8"
                  strokeOpacity="1"
                  style={{ animation: `cleanPulseIn ${animDuration} linear infinite` }}
                />
              )}

              {/* RIGHT 3-WAY FORK DIVERGENCE */}
              <line x1="65" y1="117.5" x2="100" y2="28" stroke="var(--color-line)" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="65" y1="117.5" x2="100" y2="207" stroke="var(--color-line)" strokeWidth="1.5" strokeOpacity="0.4" />

              {isSolving && currentScenario.activeRealmIds.includes("ai-agents") && (
                <line
                  x1="65"
                  y1="117.5"
                  x2="100"
                  y2="28"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  strokeDasharray="5 8"
                  strokeOpacity="1"
                  style={{ animation: `cleanPulseOut ${animDuration} linear infinite` }}
                />
              )}

              {isSolving && currentScenario.activeRealmIds.includes("tooling") && (
                <line
                  x1="65"
                  y1="117.5"
                  x2="100"
                  y2="207"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  strokeDasharray="5 8"
                  strokeOpacity="1"
                  style={{ animation: `cleanPulseOut ${animDuration} linear infinite` }}
                />
              )}

              {/* Node Junctions */}
              <circle cx="35" cy="117.5" r="3" fill="var(--color-accent)" />
              <circle cx="65" cy="117.5" r="3" fill="var(--color-accent)" />
              <circle cx="50" cy="117.5" r="4" fill="var(--color-accent)" />
            </svg>
          </div>

          {/* Right Cluster: 3 Compact Cards */}
          <div className={`w-[135px] sm:w-[155px] h-full flex flex-col justify-between py-1 transition-all ${
            isRightActive ? "z-50" : "z-20"
          }`}>
            {rightRealms.map((realm) => (
              <SkillRealmCard
                key={realm.id}
                realm={realm}
                variant="compact"
                isOpen={activeCardId === realm.id}
                onOpenChange={(open) => setActiveCardId(open ? realm.id : null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 
        =======================================================================
        DYNAMIC MEASURED TOOL TOKENS (Fixed screen portal)
        - Start positions: Measured from card bounding rects
        - Target position: Measured from the 3D Wheel center
        - Absolutely 0% chance of misalignment on any resolution
        =======================================================================
      */}
      {isSolving &&
        flyingTools.map((tool) => (
          <div
            key={tool.id}
            className="fixed z-50 pointer-events-none flex items-center gap-1.5 rounded-full border border-accent bg-card/95 px-2.5 py-1 shadow-[0_0_18px_rgba(var(--color-accent-rgb),0.75)] backdrop-blur-md select-none"
            style={{
              left: `${tool.startX}px`,
              top: `${tool.startY}px`,
              animation: `dynamicFlightToWheel 1.35s cubic-bezier(0.22, 0.9, 0.35, 1) forwards`,
              animationDelay: `${tool.delay}ms`,
              ["--dx" as any]: `${tool.deltaX}px`,
              ["--dy" as any]: `${tool.deltaY}px`,
            }}
          >
            <img src={tool.icon} alt="" className="size-4 object-contain" />
            <span className="font-mono text-[10px] font-bold text-fg whitespace-nowrap">
              {tool.name}
            </span>
          </div>
        ))}
    </section>
  );
}
