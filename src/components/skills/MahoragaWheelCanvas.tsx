"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const CIRCLE_COUNT = 6;
const GOLD_COLOR = "#E5B869";
const CARD_BG = "#161B22";

// The 6 AI Tools orchestrated in the horizontal halo
const AI_TOOLS = [
  {
    name: "Claude",
    fullName: "Claude (Anthropic)",
    iconUrl: "/images/skills/tools/claude.svg",
    color: "#D97757",
  },
  {
    name: "Gemini",
    fullName: "Gemini (Google)",
    iconUrl: "/images/skills/tools/gemini.svg",
    color: "#4E88D4",
  },
  {
    name: "ChatGPT",
    fullName: "ChatGPT (OpenAI)",
    iconUrl: "/images/skills/tools/chatgpt.svg",
    color: "#10A37F",
  },
  {
    name: "Antigravity",
    fullName: "Google Antigravity",
    iconUrl: "/images/skills/tools/antigravity.svg",
    color: "#3186FF",
  },
  {
    name: "Cursor",
    fullName: "Cursor AI",
    iconUrl: "/images/skills/tools/cursor.svg",
    color: "#E5B869",
  },
  {
    name: "Ollama",
    fullName: "Ollama (Local LLMs)",
    iconUrl: "/images/skills/tools/ollama.svg",
    color: "#F3C77C",
  },
];

// Lightweight procedural Web Audio ratchet synthesizer (zero external mp3 download)
class RatchetSoundSynthesizer {
  private ctx: AudioContext | null = null;
  private lastClickTime = 0;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  playClick(pitchMultiplier = 1.0) {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Debounce slightly to prevent harsh distortion on ultra-fast frames
      if (now - this.lastClickTime < 0.02) return;
      this.lastClickTime = now;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Metallic high-frequency click transient
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1600 * pitchMultiplier, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.022);

      // Sharp mechanical percussive decay (22ms)
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {
      // Audio not supported or gesture blocked - fail silently
    }
  }
}

const ratchetSynth = new RatchetSoundSynthesizer();

interface DragPhysicsState {
  isDragging: boolean;
  lastX: number;
  lastY: number;
  dragDeltaX: number;
  dragDeltaY: number;
  releaseVelocity: number;
}

const RESTING_PITCH = -0.10; // Default natural tilt angle above head

interface HorizontalHaloRingProps {
  isSpinningFast?: boolean;
  dragPhysicsRef: React.RefObject<DragPhysicsState>;
}

function HorizontalHaloRing({
  isSpinningFast = false,
  dragPhysicsRef,
}: HorizontalHaloRingProps) {
  const ringGroupRef = useRef<THREE.Group>(null);
  const rotationYRef = useRef(0);
  const pitchXRef = useRef(RESTING_PITCH);
  const momentumVelocityRef = useRef(0);
  const lastSectorRef = useRef(0);

  useFrame((_, delta) => {
    if (!ringGroupRef.current) return;
    const physics = dragPhysicsRef.current;
    if (!physics) return;

    if (physics.isDragging) {
      // 1. ACTIVE DIRECT 1:1 DRAG MANIPULATION
      // A) Horizontal Spin (Yaw):
      // Dragging RIGHT (dx > 0) spins forward / clockwise.
      // Dragging LEFT (dx < 0) spins backward / counter-clockwise.
      // Holding still (dx = 0) pauses and freezes the wheel in place.
      const dx = physics.dragDeltaX;
      physics.dragDeltaX = 0;
      rotationYRef.current += dx * 0.007;

      // B) 3D Pitch Tilt (X-Axis):
      // Dragging UP (dy < 0) tilts backward to inspect the top view.
      // Dragging DOWN (dy > 0) tilts forward toward edge-on view.
      const dy = physics.dragDeltaY;
      physics.dragDeltaY = 0;
      pitchXRef.current = THREE.MathUtils.clamp(
        pitchXRef.current - dy * 0.0035,
        -0.40, // Max upward angle (~ -23 deg)
        0.22   // Max downward angle (~ +12 deg)
      );

      // Track flick velocity for smooth inertia on release
      momentumVelocityRef.current = THREE.MathUtils.clamp(
        physics.releaseVelocity,
        -0.07,
        0.07
      );
    } else {
      // 2. RELEASED / COASTING STATE
      if (isSpinningFast) {
        // Fast summon acceleration
        momentumVelocityRef.current = THREE.MathUtils.damp(
          momentumVelocityRef.current,
          0.22,
          4,
          delta
        );
        rotationYRef.current += momentumVelocityRef.current;
      } else {
        // Friction damping of flick momentum towards 0
        momentumVelocityRef.current = THREE.MathUtils.damp(
          momentumVelocityRef.current,
          0,
          2.6,
          delta
        );

        // Peaceful ambient idle spin
        const idleSpeed = 0.005;
        rotationYRef.current += idleSpeed + momentumVelocityRef.current;
      }

      // Smooth spring-back of pitch tilt back to resting angle
      pitchXRef.current = THREE.MathUtils.damp(
        pitchXRef.current,
        RESTING_PITCH,
        3.2,
        delta
      );
    }

    // Apply rotation transforms
    ringGroupRef.current.rotation.y = rotationYRef.current;
    ringGroupRef.current.rotation.x = pitchXRef.current;

    // Trigger mechanical ratchet audio on 60-degree sector threshold crossings
    const currentAngle = rotationYRef.current;
    const sectorAngle = Math.PI / 3; // 60 degrees (6 spokes)
    const currentSector = Math.floor(currentAngle / sectorAngle);

    // Audio triggers on active user drag, release flick, or summon spin
    const isActivelyRotating =
      physics.isDragging ||
      isSpinningFast ||
      Math.abs(momentumVelocityRef.current) > 0.012;

    if (currentSector !== lastSectorRef.current) {
      lastSectorRef.current = currentSector;
      if (isActivelyRotating) {
        ratchetSynth.playClick();
      }
    }
  });

  const RADIUS = 1.76;

  return (
    <group ref={ringGroupRef} position={[0, 0.22, 0]}>
      {/* 6 Floating Circular Discs with AI Tool Logos */}
      {Array.from({ length: CIRCLE_COUNT }).map((_, i) => {
        const angle = (i * Math.PI * 2) / CIRCLE_COUNT;
        const x = RADIUS * Math.sin(angle);
        const z = RADIUS * Math.cos(angle);
        const tool = AI_TOOLS[i];

        return (
          <group key={tool.name} position={[x, 0, z]}>
            {/* Outer Golden Beveled Rim (Refined Sleek Ring) */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.20, 0.016, 16, 32]} />
              <meshStandardMaterial
                color={GOLD_COLOR}
                metalness={0.9}
                roughness={0.2}
                emissive={GOLD_COLOR}
                emissiveIntensity={0.3}
              />
            </mesh>

            {/* Inner Dark Circular Token Face */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.18, 0.18, 0.015, 32]} />
              <meshStandardMaterial
                color={CARD_BG}
                metalness={0.4}
                roughness={0.5}
              />
            </mesh>

            {/* Crisp Compact Vector AI Tool Emblem with Hover Tooltip */}
            <Html
              center
              position={[0, 0.035, 0]}
              distanceFactor={4.6}
              className="pointer-events-auto select-none"
            >
              <div
                title={tool.fullName}
                className="group relative flex size-7 sm:size-8 items-center justify-center rounded-full bg-card/95 border border-line hover:border-accent hover:scale-115 hover:shadow-[0_0_14px_rgba(229,184,105,0.45)] transition-all cursor-pointer p-1 backdrop-blur-sm"
              >
                <img
                  src={tool.iconUrl}
                  alt={tool.name}
                  className="size-4 object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                />
                {/* Sleek Tooltip on hover */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card px-2 py-0.5 rounded border border-line text-[10px] font-mono font-bold text-accent whitespace-nowrap pointer-events-none shadow-lg z-50">
                  {tool.fullName}
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

interface MahoragaWheelCanvasProps {
  isSpinningFast?: boolean;
}

export function MahoragaWheelCanvas({
  isSpinningFast = false,
}: MahoragaWheelCanvasProps) {
  const dragPhysicsRef = useRef<DragPhysicsState>({
    isDragging: false,
    lastX: 0,
    lastY: 0,
    dragDeltaX: 0,
    dragDeltaY: 0,
    releaseVelocity: 0,
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    dragPhysicsRef.current.isDragging = true;
    dragPhysicsRef.current.lastX = e.clientX;
    dragPhysicsRef.current.lastY = e.clientY;
    dragPhysicsRef.current.dragDeltaX = 0;
    dragPhysicsRef.current.dragDeltaY = 0;
    dragPhysicsRef.current.releaseVelocity = 0;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    ratchetSynth.playClick();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragPhysicsRef.current.isDragging) return;
    const dx = e.clientX - dragPhysicsRef.current.lastX;
    const dy = e.clientY - dragPhysicsRef.current.lastY;
    dragPhysicsRef.current.lastX = e.clientX;
    dragPhysicsRef.current.lastY = e.clientY;
    dragPhysicsRef.current.dragDeltaX += dx;
    dragPhysicsRef.current.dragDeltaY += dy;
    // Track smoothed release flick velocity
    dragPhysicsRef.current.releaseVelocity = dx * 0.0025;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    dragPhysicsRef.current.isDragging = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore
    }
  };

  // Trigger click sound when adaptation fast spin is triggered
  useEffect(() => {
    if (isSpinningFast) {
      ratchetSynth.playClick(1.2);
    }
  }, [isSpinningFast]);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-[380px] sm:w-[420px] md:w-[460px] h-[175px] sm:h-[195px] cursor-grab active:cursor-grabbing touch-none select-none"
    >
      <Canvas
        camera={{ position: [0, 3.1, 4.1], fov: 36 }}
        dpr={[1, 1.5]}
        className="size-full pointer-events-auto"
      >
        {/* Studio Lighting for Gilded Brass / Amber Gold */}
        <ambientLight intensity={1.3} />
        <directionalLight position={[3, 6, 4]} intensity={2.2} color="#FFF8E7" />
        <pointLight position={[-3, 3, 2]} intensity={1.6} color="#E5B869" distance={8} />
        <pointLight position={[0, -1, 2]} intensity={0.9} color="#F3C77C" distance={5} />

        <HorizontalHaloRing
          isSpinningFast={isSpinningFast}
          dragPhysicsRef={dragPhysicsRef}
        />
      </Canvas>

      {/* Subtle Ambient Radial Glow Backing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(229,184,105,0.2)_0%,transparent_70%)] blur-md"
      />
    </div>
  );
}
