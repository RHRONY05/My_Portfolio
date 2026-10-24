"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SKILL_STEPS, type SkillLifecycleStep } from "./skillsData";
import { SkillFlowStepCard } from "./SkillFlowStepCard";
import { SkillFlowModal } from "./SkillFlowModal";
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

interface FlowConnectorPoints {
  // Step 01 -> Step 02 (Vertical down)
  p1_bottom: { x: number; y: number };
  p2_top: { x: number; y: number };

  // Step 02 -> Step 03 (L-bend down and right into Step 03 left)
  p2_bottom: { x: number; y: number };
  p3_left: { x: number; y: number };

  // Step 03 <-> Step 04 (Horizontal bidirectional double arrow)
  p3_right: { x: number; y: number };
  p4_left: { x: number; y: number };

  // Step 04 -> Step 05 (L-bend right and up into Step 05 bottom)
  p4_right: { x: number; y: number };
  p5_bottom: { x: number; y: number };

  // Step 05 -> Step 06 (Vertical up)
  p5_top: { x: number; y: number };
  p6_bottom: { x: number; y: number };

  width: number;
  height: number;
}

export function SkillsLoadBalancer() {
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const [modalStep, setModalStep] = useState<SkillLifecycleStep | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [flowPoints, setFlowPoints] = useState<FlowConnectorPoints | null>(null);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Continuous auto-moving train loop on mobile (< 1024px)
  useEffect(() => {
    if (isDesktop) return;
    const track = carouselRef.current;
    if (!track) return;

    let animId: number;
    let lastTime = performance.now();

    const trainLoop = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Glide continuously like a train when not actively being dragged/touched and modal is closed
      if (!isInteractingRef.current && track && !modalStep) {
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0) {
          track.scrollLeft += 36 * delta; // 36px/sec smooth train glide

          if (track.scrollLeft >= halfWidth) {
            track.scrollLeft -= halfWidth;
          }
        }
      }
      animId = requestAnimationFrame(trainLoop);
    };

    animId = requestAnimationFrame(trainLoop);
    return () => cancelAnimationFrame(animId);
  }, [isDesktop, modalStep]);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const track = carouselRef.current;
    const halfWidth = track.scrollWidth / 2;
    if (halfWidth <= 0) return;

    // Seamless wrap-around boundary for infinite bidirectional dragging
    if (track.scrollLeft >= halfWidth * 1.8) {
      track.scrollLeft -= halfWidth;
    } else if (track.scrollLeft <= 4) {
      track.scrollLeft += halfWidth;
    }

    const singleStepWidth = halfWidth / SKILL_STEPS.length;
    const normalizedScroll = track.scrollLeft % halfWidth;
    const idx = Math.min(
      SKILL_STEPS.length - 1,
      Math.max(0, Math.floor((normalizedScroll + singleStepWidth / 2) / singleStepWidth))
    );
    setActiveCarouselIndex(idx);
  };

  const handleUserInteractStart = () => {
    isInteractingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleUserInteractEnd = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 1400);
  };

  const scrollToStep = (index: number) => {
    if (!carouselRef.current) return;
    const track = carouselRef.current;
    const halfWidth = track.scrollWidth / 2;
    const singleStepWidth = halfWidth / SKILL_STEPS.length;
    const targetScroll = index * singleStepWidth;
    track.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
    setActiveCarouselIndex(index);
    playRatchetClick();
    handleUserInteractStart();
    handleUserInteractEnd();
  };

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const measureFlowPoints = () => {
    if (!stageRef.current) return;
    const sRect = stageRef.current.getBoundingClientRect();
    if (sRect.width === 0 || sRect.height === 0) return;

    const getEdges = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        top: { x: r.left + r.width / 2 - sRect.left, y: r.top - sRect.top },
        bottom: { x: r.left + r.width / 2 - sRect.left, y: r.bottom - sRect.top },
        left: { x: r.left - sRect.left, y: r.top + r.height / 2 - sRect.top },
        right: { x: r.right - sRect.left, y: r.top + r.height / 2 - sRect.top },
      };
    };

    const node1 = getEdges("flow-node-ai-planning");
    const node2 = getEdges("flow-node-tools-environment");
    const node3 = getEdges("flow-node-frontend-engineering");
    const node4 = getEdges("flow-node-backend-data");
    const node5 = getEdges("flow-node-testing-validation");
    const node6 = getEdges("flow-node-deployment-monitoring");

    if (node1 && node2 && node3 && node4 && node5 && node6) {
      setFlowPoints({
        p1_bottom: node1.bottom,
        p2_top: node2.top,
        p2_bottom: node2.bottom,
        p3_left: node3.left,
        p3_right: node3.right,
        p4_left: node4.left,
        p4_right: node4.right,
        p5_bottom: node5.bottom,
        p5_top: node5.top,
        p6_bottom: node6.bottom,
        width: sRect.width,
        height: sRect.height,
      });
    }
  };

  useLayoutEffect(() => {
    measureFlowPoints();
    const handleResize = () => measureFlowPoints();
    window.addEventListener("resize", handleResize);

    const timer1 = setTimeout(measureFlowPoints, 80);
    const timer2 = setTimeout(measureFlowPoints, 350);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleSelectStep = (step: SkillLifecycleStep) => {
    setActiveStepId(step.id);
    setModalStep(step);
    playRatchetClick();
  };

  const step1 = SKILL_STEPS[0];
  const step2 = SKILL_STEPS[1];
  const step3 = SKILL_STEPS[2];
  const step4 = SKILL_STEPS[3];
  const step5 = SKILL_STEPS[4];
  const step6 = SKILL_STEPS[5];

  return (
    <section
      id="skills"
      aria-label="Engineering Lifecycle and Skill Architecture"
      className="relative w-full pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 bg-canvas overflow-hidden"
    >
      {/* Background Subtle Dot-Grid Pattern */}
      <div
        aria-hidden="true"
        className="dot-grid absolute inset-0 pointer-events-none opacity-40"
      />

      {/* Luminescent White Cyber Circuit Keyframes */}
      <style jsx>{`
        @keyframes whiteFlow {
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
            DESKTOP STAGGERED U-CURVE FLOWCHART STAGE (>= 1024px)
            Level 1 (Top): Left Oval (Step 1) & Right Oval (Step 6)
            Level 2 (Mid): Left Box (Step 2) & Right Box (Step 5)
            Level 3 (Bottom): Center-Left Box (Step 3) <-> Center-Right Box (Step 4)
            Upper-Center: Meditating Rony + 3D Mahoraga Wheel (seated directly ABOVE the two middle boxes!)
            ========================================================================= */}
        <div
          ref={stageRef}
          className="hidden lg:block relative w-full h-[570px] xl:h-[610px] select-none"
        >
          {/* LEVEL 1: TOP-LEFT OVAL (Step 01) */}
          <div className="absolute top-1 left-2 xl:left-6 z-20">
            <SkillFlowStepCard
              step={step1}
              isActive={activeStepId === step1.id}
              onSelect={() => handleSelectStep(step1)}
            />
          </div>

          {/* LEVEL 2: MID-LEFT BOX (Step 02 - positioned midway down with ~55px distance from Step 1) */}
          <div className="absolute top-[198px] xl:top-[212px] left-2 xl:left-6 z-20">
            <SkillFlowStepCard
              step={step2}
              isActive={activeStepId === step2.id}
              onSelect={() => handleSelectStep(step2)}
            />
          </div>

          {/* UPPER-CENTER: MEDITATING RONY + 3D MAHORAGA WHEEL */}
          <div className="absolute top-[32px] xl:top-[42px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
            {/* 3D Horizontal Halo Wheel */}
            <div className="relative z-30 mb-1 pointer-events-auto">
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
                        isSpinningFast={activeStepId !== null}
                      />
                    </div>
                  ) : null
                }
              </LazyViewportMount>
            </div>

            {/* Meditating Rony Cutout */}
            <div className="relative z-10 w-[145px] xl:w-[165px] pointer-events-auto transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src="/images/skills/mediating_rony_final.webp"
                alt="Rony seated in meditation planning architecture"
                width={500}
                height={400}
                priority
                className="w-full h-auto object-contain drop-shadow-[0_16px_36px_rgba(255,255,255,0.35)]"
              />
            </div>
          </div>

          {/* LEVEL 3: TWO BOXES SIDE-BY-SIDE IN THE MIDDLE (Directly under Rony with identical ~55px distance from Step 2!) */}
          <div className="absolute top-[402px] xl:top-[428px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-16 xl:gap-20 z-20">
            {/* Step 03: Frontend Box */}
            <SkillFlowStepCard
              step={step3}
              isActive={activeStepId === step3.id}
              onSelect={() => handleSelectStep(step3)}
            />

            {/* Step 04: Backend & Data Box */}
            <SkillFlowStepCard
              step={step4}
              isActive={activeStepId === step4.id}
              onSelect={() => handleSelectStep(step4)}
            />
          </div>

          {/* LEVEL 2: MID-RIGHT BOX (Step 05 - positioned midway down with ~55px distance from Step 6) */}
          <div className="absolute top-[198px] xl:top-[212px] right-2 xl:right-6 z-20">
            <SkillFlowStepCard
              step={step5}
              isActive={activeStepId === step5.id}
              onSelect={() => handleSelectStep(step5)}
            />
          </div>

          {/* LEVEL 1: TOP-RIGHT OVAL (Step 06) */}
          <div className="absolute top-1 right-2 xl:right-6 z-20">
            <SkillFlowStepCard
              step={step6}
              isActive={activeStepId === step6.id}
              onSelect={() => handleSelectStep(step6)}
            />
          </div>

          {/* =========================================================================
              WHITE GLOWING CYBER PIPELINE SVG (True U-Curve Connectors)
              Pure white circuits with luminescent white glow + animated current
              ========================================================================= */}
          {flowPoints && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
              viewBox={`0 0 ${flowPoints.width} ${flowPoints.height}`}
            >
              <defs>
                {/* Crisp White Arrowhead marker (Pointing Forward) */}
                <marker
                  id="flow-arrow-white"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path
                    d="M 0 1.5 L 8 5 L 0 8.5 z"
                    fill="rgba(255, 255, 255, 0.95)"
                  />
                </marker>

                {/* Crisp White Arrowhead marker (Pointing Backward for Bidirectional Bridge) */}
                <marker
                  id="flow-arrow-white-start"
                  viewBox="0 0 10 10"
                  refX="4"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path
                    d="M 8 1.5 L 0 5 L 8 8.5 z"
                    fill="rgba(255, 255, 255, 0.95)"
                  />
                </marker>
              </defs>

              {/* -------------------------------------------------------------
                  PASSIVE BASELINE UNDERLAYER (Subtle White Glow Foundation)
                 ------------------------------------------------------------- */}
              <g
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              >
                {/* 1. Step 01 -> Step 02: Vertical Down */}
                <path
                  d={`M ${flowPoints.p1_bottom.x} ${flowPoints.p1_bottom.y + 4} V ${flowPoints.p2_top.y - 8}`}
                />

                {/* 2. Step 02 -> Step 03: L-bend Down and Right into Step 03 Left */}
                <path
                  d={`M ${flowPoints.p2_bottom.x} ${flowPoints.p2_bottom.y + 4} V ${flowPoints.p3_left.y} H ${flowPoints.p3_left.x - 8}`}
                />

                {/* 3. Step 03 <-> Step 04: Horizontal Bidirectional Data Bridge */}
                <path
                  d={`M ${flowPoints.p3_right.x + 8} ${flowPoints.p3_right.y} H ${flowPoints.p4_left.x - 8}`}
                />

                {/* 4. Step 04 -> Step 05: L-bend Right and Up into Step 05 Bottom */}
                <path
                  d={`M ${flowPoints.p4_right.x + 4} ${flowPoints.p4_right.y} H ${flowPoints.p5_bottom.x} V ${flowPoints.p5_bottom.y + 8}`}
                />

                {/* 5. Step 05 -> Step 06: Vertical Up */}
                <path
                  d={`M ${flowPoints.p5_top.x} ${flowPoints.p5_top.y - 4} V ${flowPoints.p6_bottom.y + 8}`}
                />
              </g>

              {/* -------------------------------------------------------------
                  ACTIVE FLOWING LUMINESCENT WHITE NEON PIPELINE
                 ------------------------------------------------------------- */}
              <g
                stroke="rgba(255, 255, 255, 0.95)"
                strokeWidth="2.2"
                strokeDasharray="6 10"
                strokeLinecap="round"
                fill="none"
                className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                style={{
                  animation: "whiteFlow 1.6s linear infinite",
                }}
              >
                {/* 1. Step 01 -> Step 02 (Vertical down into Step 02) */}
                <path
                  d={`M ${flowPoints.p1_bottom.x} ${flowPoints.p1_bottom.y + 4} V ${flowPoints.p2_top.y - 8}`}
                  markerEnd="url(#flow-arrow-white)"
                />

                {/* 2. Step 02 -> Step 03 (L-bend down and right into Step 03) */}
                <path
                  d={`M ${flowPoints.p2_bottom.x} ${flowPoints.p2_bottom.y + 4} V ${flowPoints.p3_left.y} H ${flowPoints.p3_left.x - 8}`}
                  markerEnd="url(#flow-arrow-white)"
                />

                {/* 3. Step 03 <-> Step 04 (Horizontal bidirectional double arrowheads) */}
                <path
                  d={`M ${flowPoints.p3_right.x + 8} ${flowPoints.p3_right.y} H ${flowPoints.p4_left.x - 8}`}
                  markerStart="url(#flow-arrow-white-start)"
                  markerEnd="url(#flow-arrow-white)"
                />

                {/* 4. Step 04 -> Step 05 (L-bend right and up into Step 05) */}
                <path
                  d={`M ${flowPoints.p4_right.x + 4} ${flowPoints.p4_right.y} H ${flowPoints.p5_bottom.x} V ${flowPoints.p5_bottom.y + 8}`}
                  markerEnd="url(#flow-arrow-white)"
                />

                {/* 5. Step 05 -> Step 06 (Vertical up into Step 06) */}
                <path
                  d={`M ${flowPoints.p5_top.x} ${flowPoints.p5_top.y - 4} V ${flowPoints.p6_bottom.y + 8}`}
                  markerEnd="url(#flow-arrow-white)"
                />
              </g>

              {/* -------------------------------------------------------------
                  GLOWING WHITE TERMINAL CONTACT PIN DOTS
                 ------------------------------------------------------------- */}
              <g fill="#ffffff" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.95)]">
                {/* Outflow dot at Step 1 */}
                <circle cx={flowPoints.p1_bottom.x} cy={flowPoints.p1_bottom.y + 4} r="3" />
                {/* Outflow dot at Step 2 */}
                <circle cx={flowPoints.p2_bottom.x} cy={flowPoints.p2_bottom.y + 4} r="3" />
                {/* Outflow dot at Step 4 */}
                <circle cx={flowPoints.p4_right.x + 4} cy={flowPoints.p4_right.y} r="3" />
                {/* Outflow dot at Step 5 */}
                <circle cx={flowPoints.p5_top.x} cy={flowPoints.p5_top.y - 4} r="3" />
              </g>
            </svg>
          )}
        </div>

        {/* =========================================================================
            MOBILE / TABLET HORIZONTAL SNAP CAROUSEL (< 1024px)
            Single WebGL context, touch-pan-x kinetic swiping with step dots
            ========================================================================= */}
        <div className="lg:hidden flex flex-col items-center w-full">
          {/* Top Character + 3D Wheel */}
          <div className="flex flex-col items-center mb-6 pointer-events-none">
            <div className="relative z-30 mb-1 pointer-events-auto">
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
                        isSpinningFast={activeStepId !== null}
                      />
                    </div>
                  ) : null
                }
              </LazyViewportMount>
            </div>

            <div className="relative z-10 w-[140px] sm:w-[155px] pointer-events-auto">
              <Image
                src="/images/skills/mediating_rony_final.webp"
                alt="Rony seated in meditation planning architecture"
                width={500}
                height={400}
                loading="lazy"
                className="w-full h-auto object-contain drop-shadow-[0_12px_28px_rgba(255,255,255,0.3)]"
              />
            </div>
          </div>

          {/* Swipeable Continuous Train Carousel Stage */}
          <div className="relative w-full">
            {/* Horizontal Continuous Scroll Track */}
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              onTouchStart={handleUserInteractStart}
              onTouchEnd={handleUserInteractEnd}
              onPointerDown={handleUserInteractStart}
              onPointerUp={handleUserInteractEnd}
              className="flex w-full items-center overflow-x-auto gap-4 px-6 sm:px-10 touch-pan-x select-none cursor-grab active:cursor-grabbing py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {[...SKILL_STEPS, ...SKILL_STEPS].map((step, idx) => {
                const isStepActive = (idx % SKILL_STEPS.length) === activeCarouselIndex;
                return (
                  <div
                    key={`${step.id}-train-${idx}`}
                    className="shrink-0 flex justify-center py-1"
                  >
                    <SkillFlowStepCard
                      step={step}
                      isActive={activeStepId === step.id || isStepActive}
                      onSelect={() => handleSelectStep(step)}
                    />
                  </div>
                );
              })}
            </div>

            {/* Stage Counter & Swipe Indicator Bar */}
            <div className="flex items-center justify-between px-6 sm:px-12 mt-4">
              {/* Left Chevron */}
              <button
                type="button"
                onClick={() => scrollToStep(Math.max(0, activeCarouselIndex - 1))}
                disabled={activeCarouselIndex === 0}
                aria-label="Previous lifecycle phase"
                className="rounded-full p-2 border border-line bg-card/80 text-muted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronLeft className="size-4" />
              </button>

              {/* Progress Dots */}
              <div className="flex items-center gap-2">
                {SKILL_STEPS.map((step, idx) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => scrollToStep(idx)}
                    aria-label={`Go to phase ${idx + 1}: ${step.title}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      activeCarouselIndex === idx
                        ? "w-6 h-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                        : "size-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Right Chevron */}
              <button
                type="button"
                onClick={() => scrollToStep(Math.min(SKILL_STEPS.length - 1, activeCarouselIndex + 1))}
                disabled={activeCarouselIndex === SKILL_STEPS.length - 1}
                aria-label="Next lifecycle phase"
                className="rounded-full p-2 border border-line bg-card/80 text-muted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            {/* Phase Title Badge */}
            <div className="flex items-center justify-center gap-2 mt-2.5">
              <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-muted">
                Phase {activeCarouselIndex + 1} of 6
              </span>
              <span className="text-white/40">•</span>
              <span className="font-sans text-[12px] font-medium text-white/90">
                {SKILL_STEPS[activeCarouselIndex]?.title}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Deep-Dive Modal */}
      <SkillFlowModal
        step={modalStep}
        onClose={() => {
          setModalStep(null);
          setActiveStepId(null);
        }}
      />
    </section>
  );
}
