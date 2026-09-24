"use client";

import React, { Suspense, useState, useRef, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { BookMesh } from "./BookMesh";
import { ChevronLeft, ChevronRight, BookOpen, MoveHorizontal } from "lucide-react";

interface Book3DCanvasProps {
  chapter?: number;
  onChapterChange?: (chapter: number) => void;
}

export function Book3DCanvas({
  chapter = 1,
  onChapterChange,
}: Book3DCanvasProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rotationOffset, setRotationOffset] = useState(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const initialOffsetRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [accentColor, setAccentColor] = useState("#E5E5E5");

  useEffect(() => {
    const updateColors = () => {
      const comp = getComputedStyle(document.documentElement);
      const acc = comp.getPropertyValue("--color-accent").trim();
      if (acc) setAccentColor(acc);
    };
    updateColors();
    window.addEventListener("storage", updateColors);
    window.addEventListener("rony_theme_change", updateColors);
    return () => {
      window.removeEventListener("storage", updateColors);
      window.removeEventListener("rony_theme_change", updateColors);
    };
  }, []);

  // Dedicated handler to cleanly toggle open/close cover and reset to chapter 1
  const handleToggleCover = useCallback(() => {
    if (isOpen) {
      onChapterChange?.(1);
      setIsOpen(false);
    } else {
      onChapterChange?.(1);
      setIsOpen(true);
    }
  }, [isOpen, onChapterChange]);

  // Rotate step by ~20 degrees
  const handleRotateLeft = () => setRotationOffset((prev) => prev + 0.35);
  const handleRotateRight = () => setRotationOffset((prev) => prev - 0.35);
  const handleReset = () => setRotationOffset(0);

  // Keyboard navigation matching PanelPress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (isOpen && chapter > 1) {
          onChapterChange?.(chapter - 1);
        } else {
          handleRotateLeft();
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (isOpen && chapter < 5) {
          onChapterChange?.(chapter + 1);
        } else {
          handleRotateRight();
        }
      } else if (e.key === "Enter" || e.key === " ") {
        if (
          containerRef.current?.matches(":hover") ||
          document.activeElement === containerRef.current
        ) {
          e.preventDefault();
          handleToggleCover();
        }
      } else if (e.key === "Home") {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, chapter, onChapterChange, handleToggleCover]);

  // Smooth pointer drag rotation
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    initialOffsetRef.current = rotationOffset;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [rotationOffset]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    setRotationOffset(initialOffsetRef.current + deltaX * 0.008);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore
    }
  }, []);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="relative flex w-full flex-col items-center select-none outline-none"
      aria-label="Interactive 3D Comic Book Dossier. Drag or use arrow keys to rotate. Click pages to flip."
    >
      {/* 3D Canvas Stage: Optimized viewport height so book + controls fit within browser view */}
      <div
        className="relative h-[440px] w-full sm:h-[490px] lg:h-[530px] xl:h-[560px] cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* ========================================================
            Exact 3-Lobe Liquid Morphing Amoeba (Reference Image Match)
            Features defined asymmetrical lobes, pinched waist, and crisp
            feathered glowing contours extending generously past the book.
           ======================================================== */}
        {/* Layer 1: Ambient outer soft glow aura (Theme-reactive) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 w-[370px] sm:w-[440px] lg:w-[500px] h-[420px] sm:h-[490px] lg:h-[540px] animate-fluid-blob-2 opacity-50 transition-colors duration-700"
          style={{
            background:
              "linear-gradient(135deg, rgba(var(--color-accent-rgb, 229, 229, 229), 0.25) 0%, rgba(var(--color-accent-rgb, 229, 229, 229), 0.12) 50%, rgba(var(--color-accent-rgb, 229, 229, 229), 0.20) 100%)",
            filter: "blur(38px)",
          }}
        />

        {/* Layer 2: Primary defined organic blob — Dynamic Theme Reactive (60% Opacity) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 w-[310px] sm:w-[380px] lg:w-[430px] h-[370px] sm:h-[440px] lg:h-[490px] animate-fluid-blob-1 transition-all duration-700"
          style={{
            background:
              "linear-gradient(135deg, rgba(var(--color-accent-rgb, 229, 229, 229), 0.60) 0%, rgba(var(--color-accent-rgb, 229, 229, 229), 0.52) 50%, rgba(var(--color-accent-rgb, 229, 229, 229), 0.58) 100%)",
            border: "1px solid rgba(var(--color-accent-rgb, 229, 229, 229), 0.35)",
            boxShadow:
              "0 0 30px rgba(var(--color-accent-rgb, 229, 229, 229), 0.28), 0 0 60px rgba(var(--color-accent-rgb, 229, 229, 229), 0.15), inset 0 0 20px rgba(var(--color-accent-rgb, 229, 229, 229), 0.20)",
            filter: "blur(22px)",
          }}
        />

        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5.85], fov: 42 }}
          className="h-full w-full pointer-events-none"
        >
          {/* Studio Lights */}
          <ambientLight intensity={1.25} />

          <directionalLight
            position={[4, 7, 5]}
            intensity={1.8}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />

          {/* Left Dynamic Theme Rim Light (Spine & Left Edge) */}
          <pointLight
            position={[-3.5, 2.5, 3]}
            intensity={2.6}
            color={accentColor}
            distance={10}
          />

          {/* Right Dynamic Theme Edge Kicker (Front Cover & Right Trim) */}
          <pointLight
            position={[3.5, 1.5, 2.5]}
            intensity={2.0}
            color={accentColor}
            distance={9}
          />

          <Suspense fallback={null}>
            {/* The 20% Larger 3D Book Actor with Glowing Bevels */}
            <BookMesh
              isOpen={isOpen}
              onToggleOpen={handleToggleCover}
              chapter={chapter}
              onChapterChange={onChapterChange}
              rotationYOffset={rotationOffset}
              accentColor={accentColor}
            />

            {/* Soft contact shadow underneath */}
            <ContactShadows
              position={[isOpen ? 0.92 : 0, -2.0, 0]}
              opacity={0.65}
              scale={8.5}
              blur={2.4}
              far={4.0}
              color="#000000"
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Control Buttons (Snapped snugly beneath the canvas so they fit on screen) */}
      <div className="mt-1 flex flex-col items-center gap-2">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Rotate Left Button */}
          <button
            type="button"
            onClick={handleRotateLeft}
            aria-label="Rotate book left"
            className="flex size-9 items-center justify-center rounded-lg border border-line bg-card/80 text-muted transition-all duration-150 hover:border-accent hover:text-accent active:scale-95"
          >
            <ChevronLeft className="size-4" />
          </button>

          {/* When Open: Prev Chapter Button */}
          {isOpen && (
            <button
              type="button"
              onClick={() => onChapterChange?.(Math.max(1, chapter - 1))}
              disabled={chapter <= 1}
              aria-label="Previous Chapter"
              className={`flex h-9 items-center gap-1.5 rounded-lg border border-line bg-card/80 px-3 text-xs font-medium transition-all duration-150 ${
                chapter <= 1
                  ? "opacity-35 cursor-not-allowed text-muted"
                  : "text-fg hover:border-accent hover:text-accent active:scale-95"
              }`}
            >
              <span>← Chapter {Math.max(1, chapter - 1)}</span>
            </button>
          )}

          {/* Open / Close Cover Button */}
          <button
            type="button"
            onClick={handleToggleCover}
            className="flex h-9 items-center gap-2 rounded-lg border border-line bg-card/80 px-4 text-xs font-medium text-fg transition-all duration-150 hover:border-accent hover:text-accent active:scale-95"
          >
            <BookOpen className="size-3.5 text-accent" />
            <span>{isOpen ? "Close cover" : "Open cover"}</span>
          </button>

          {/* When Open: Next Chapter Button */}
          {isOpen && (
            <button
              type="button"
              onClick={() => onChapterChange?.(Math.min(4, chapter + 1))}
              disabled={chapter >= 4}
              aria-label="Next Chapter"
              className={`flex h-9 items-center gap-1.5 rounded-lg border border-line bg-card/80 px-3 text-xs font-medium transition-all duration-150 ${
                chapter >= 4
                  ? "opacity-35 cursor-not-allowed text-muted"
                  : "text-fg hover:border-accent hover:text-accent active:scale-95"
              }`}
            >
              <span>Chapter {Math.min(4, chapter + 1)} →</span>
            </button>
          )}

          {/* Rotate Right Button */}
          <button
            type="button"
            onClick={handleRotateRight}
            aria-label="Rotate book right"
            className="flex size-9 items-center justify-center rounded-lg border border-line bg-card/80 text-muted transition-all duration-150 hover:border-accent hover:text-accent active:scale-95"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Instruction Caption */}
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted/70 tracking-wider uppercase">
          <MoveHorizontal className="size-3 text-accent/80" />
          <span>
            {isOpen
              ? "CLICK PAGES DIRECTLY TO FLIP • DRAG TO ROTATE"
              : "CLICK COVER TO OPEN • DRAG TO ROTATE"}
          </span>
        </div>
      </div>
    </div>
  );
}
