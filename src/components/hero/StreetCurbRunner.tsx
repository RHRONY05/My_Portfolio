"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, RotateCcw, X } from "lucide-react";

type GameMode = "IDLE" | "RUNNING" | "PAUSED" | "GAME_OVER";
type ObstacleType = "404" | "BUG" | "NULL";

interface Obstacle {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: ObstacleType;
  speedMultiplier: number;
  damage: number;
  passed: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

// Design system theme tokens mapped for high-performance 2D Canvas rendering
const RUNNER_THEME = {
  accent: "#E5B869",
  accentRgb: "229, 184, 105",
  secondary: "#F3C77C",
  card: "#161B22",
  chassis: "#12171F",
  line: "#30363D",
  fg: "#F0F6FC",
  muted: "#8B949E",
  obsBug: "#FF4444",
  obsBugGlow: "#FF2222",
  obsBugLight: "#FF7777",
  obsNull: "#58A6FF",
} as const;

export function StreetCurbRunner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // React UI states
  const [gameMode, setGameMode] = useState<GameMode>("IDLE");
  const [health, setHealth] = useState(100);
  const [distance, setDistance] = useState(0);
  const [dodgedCount, setDodgedCount] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [isCrashModalDismissed, setIsCrashModalDismissed] = useState(false);

  // 60-FPS loop state in Ref for zero render thrashing
  const stateRef = useRef({
    mode: "IDLE" as GameMode,
    isVisible: true,
    baseSpeed: 2.6,
    distanceAccumulator: 0,
    health: 100,
    dodged: 0,
    highScore: 0,

    skater: {
      x: 340,
      targetBaseX: 340,
      y: 0,
      width: 34,
      height: 40,
      vx: 0,
      vy: 0,
      jumpForce: -7.2,
      gravity: 0.40,
      isGrounded: true,
      boardAngle: 0,
      crashTimer: 0,
      // Wipeout physics
      wipeoutTimer: 0,
      wipeoutSkaterX: 0,
      wipeoutSkaterY: 0,
      wipeoutSkaterRot: 0,
      wipeoutBoardX: 0,
      wipeoutBoardY: 0,
      wipeoutBoardRot: 0,
    },

    roadOffset: 0,
    obstacles: [] as Obstacle[],
    nextObstacleTimer: 140,
    obstacleIdCounter: 1,
    particles: [] as Particle[],
  });

  // Load High Score from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rony_portfolio_runner_best");
      if (saved) {
        const val = parseInt(saved, 10);
        if (!isNaN(val)) {
          setHighScore(val);
          stateRef.current.highScore = val;
        }
      }
    } catch {
      // Ignore localStorage errors in private mode
    }
  }, []);

  // Jump trigger
  const triggerJump = useCallback(() => {
    const s = stateRef.current.skater;
    const mode = stateRef.current.mode;

    // If IDLE, clicking starts the game and jumps
    if (mode === "IDLE") {
      stateRef.current.mode = "RUNNING";
      setGameMode("RUNNING");
    }

    if (stateRef.current.mode === "RUNNING" && s.isGrounded && s.crashTimer <= 0) {
      s.vy = s.jumpForce;
      s.vx = 3.2; // Forward horizontal surge!
      s.isGrounded = false;
      s.boardAngle = -0.34;

      // Ollie launch sparks behind rear wheel
      for (let i = 0; i < 7; i++) {
        stateRef.current.particles.push({
          x: s.x + 2,
          y: s.y + s.height,
          vx: -stateRef.current.baseSpeed - Math.random() * 2,
          vy: Math.random() * -2.2,
          size: Math.random() * 2.5 + 1.2,
          alpha: 1,
          color: RUNNER_THEME.accent,
        });
      }
    }
  }, []);

  // Play / Pause / Reboot Handlers
  const handleTogglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (gameMode === "RUNNING") {
      stateRef.current.mode = "PAUSED";
      setGameMode("PAUSED");
    } else if (gameMode === "PAUSED" || gameMode === "IDLE") {
      stateRef.current.mode = "RUNNING";
      setGameMode("RUNNING");
    }
  };

  const handleReboot = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const st = stateRef.current;
    st.mode = "RUNNING";
    st.health = 100;
    st.distanceAccumulator = 0;
    st.dodged = 0;
    st.obstacles = [];
    st.particles = [];
    st.nextObstacleTimer = 120;
    st.skater.vx = 0;
    st.skater.vy = 0;
    st.skater.isGrounded = true;
    st.skater.boardAngle = 0;
    st.skater.crashTimer = 0;
    st.skater.wipeoutTimer = 0;

    setHealth(100);
    setDistance(0);
    setDodgedCount(0);
    setIsNewRecord(false);
    setIsCrashModalDismissed(false);
    setGameMode("RUNNING");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const groundMargin = 11; // Compact distance below road line for dashes & wheels

    // Handle high-DPI retina sharpness
    const resizeCanvas = () => {
      if (!container || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      // Adaptive responsive runway calculation based on viewport width:
      // Desktop (>= 1024px): 37% (to the right of "Let's Connect")
      // Tablet (640px - 1023px): 30%
      // Mobile (< 640px): 20% - 22% (min 56px, max 85px) giving forward reaction runway
      let calculatedPocket: number;
      if (width >= 1024) {
        calculatedPocket = Math.min(Math.max(300, width * 0.37), width * 0.46);
      } else if (width >= 640) {
        calculatedPocket = Math.min(Math.max(180, width * 0.30), width * 0.38);
      } else {
        calculatedPocket = Math.max(56, Math.min(width * 0.22, 85));
      }

      stateRef.current.skater.targetBaseX = calculatedPocket;
      if (stateRef.current.skater.isGrounded && stateRef.current.mode !== "GAME_OVER") {
        stateRef.current.skater.x = calculatedPocket;
      }

      stateRef.current.skater.y = height - groundMargin - stateRef.current.skater.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Keyboard listener for Space and ArrowUp
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        if (window.scrollY < window.innerHeight * 0.8) {
          e.preventDefault();
          if (stateRef.current.mode === "GAME_OVER") {
            handleReboot();
          } else {
            triggerJump();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // IntersectionObserver to sleep when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        stateRef.current.isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // The 60-FPS Flipbook Game Loop
    const renderLoop = () => {
      if (!stateRef.current.isVisible) {
        animationFrameId = requestAnimationFrame(renderLoop);
        return;
      }

      const st = stateRef.current;
      const s = st.skater;
      const groundY = height - groundMargin;

      // 1. CLEAR FRAME
      ctx.clearRect(0, 0, width, height);

      // If PAUSED, just draw static scene
      if (st.mode === "PAUSED") {
        drawTrack(ctx, width, groundY, st.roadOffset);
        drawObstacles(ctx, st.obstacles, groundY);
        drawSkater(ctx, s, groundY, st.distanceAccumulator);
        animationFrameId = requestAnimationFrame(renderLoop);
        return;
      }

      // 2. UPDATE PHYSICS (IDLE, RUNNING, or GAME_OVER)
      if (st.mode !== "GAME_OVER") {
        // Dynamic speed tier scaling: every 500m covered increases speed by 18%!
        const speedTier = Math.floor(st.distanceAccumulator / 500);
        const tierMultiplier = 1 + speedTier * 0.18;
        const effectiveSpeed = st.baseSpeed * tierMultiplier;

        // Distance accumulates only when RUNNING
        if (st.mode === "RUNNING") {
          st.distanceAccumulator += effectiveSpeed * 0.05;
          const roundedDist = Math.floor(st.distanceAccumulator);
          setDistance((prev) => (prev !== roundedDist ? roundedDist : prev));
        }

        // Road dashes scrolling
        st.roadOffset = (st.roadOffset + effectiveSpeed) % 40;

        // Skater jumping physics
        if (!s.isGrounded) {
          s.vy += s.gravity;
          s.y += s.vy;
          s.x += s.vx;
          s.vx *= 0.985;
          s.boardAngle = Math.min(0.12, s.boardAngle + 0.016);

          if (s.y >= groundY - s.height) {
            s.y = groundY - s.height;
            s.vy = 0;
            s.vx = 0;
            s.isGrounded = true;
            s.boardAngle = 0;

            // Landing sparks
            for (let i = 0; i < 5; i++) {
              st.particles.push({
                x: s.x + 6 + i * 4,
                y: groundY,
                vx: (Math.random() - 0.7) * 2.5,
                vy: Math.random() * -1.5,
                size: Math.random() * 2.2 + 1,
                alpha: 0.9,
                color: RUNNER_THEME.accent,
              });
            }
          }
        } else {
          // Grounded spring restitution
          const distFromBase = s.targetBaseX - s.x;
          s.x += distFromBase * 0.045;
          const ambientCarve = Math.sin(st.distanceAccumulator * 0.25) * 0.4;
          s.x += ambientCarve;

          // Rolling sparks
          if (Math.random() > 0.65) {
            st.particles.push({
              x: s.x + 4,
              y: groundY - 2,
              vx: -effectiveSpeed * 0.8 - Math.random() * 1.5,
              vy: (Math.random() - 0.7) * 1.2,
              size: Math.random() * 2 + 1,
              alpha: 0.8,
              color: Math.random() > 0.3 ? RUNNER_THEME.accent : RUNNER_THEME.secondary,
            });
          }
        }

        if (s.crashTimer > 0) {
          s.crashTimer -= 1;
        }

        // OBSTACLES: Only spawn and move when in RUNNING mode
        if (st.mode === "RUNNING") {
          st.nextObstacleTimer -= 1;
          if (st.nextObstacleTimer <= 0) {
            const types: ObstacleType[] = ["404", "BUG", "NULL"];
            const chosenType = types[Math.floor(Math.random() * types.length)];

            // Standardized identical heavy dimensions for all obstacles (44x26)
            const obsWidth = 44;
            const obsHeight = 26;
            let speedMult = 1.15;
            let damage = 50; // 404: 2 hits = 100%

            if (chosenType === "BUG") {
              speedMult = 1.45; // Fast!
              damage = 33.4; // BUG: 3 hits = 100%
            } else if (chosenType === "NULL") {
              speedMult = 0.85; // Slow creeping leak!
              damage = 20; // NULL: 5 hits = 100%
            }

            st.obstacles.push({
              id: st.obstacleIdCounter++,
              x: width + 30,
              y: groundY - obsHeight,
              width: obsWidth,
              height: obsHeight,
              type: chosenType,
              speedMultiplier: speedMult,
              damage,
              passed: false,
            });

            // Spawn interval dynamically tightens as speed accelerates
            st.nextObstacleTimer = Math.floor((Math.random() * 90 + 130) / Math.sqrt(tierMultiplier));
          }

          // Update Obstacles & Check Collisions
          for (let i = st.obstacles.length - 1; i >= 0; i--) {
            const obs = st.obstacles[i];
            obs.x -= effectiveSpeed * obs.speedMultiplier;

            // Clear obstacle
            if (!obs.passed && obs.x + obs.width < s.x) {
              obs.passed = true;
              st.dodged += 1;
              setDodgedCount(st.dodged);
            }

            // AABB Collision Check
            const hitMarginX = 6;
            const hitMarginY = 4;
            const isColliding =
              s.x + hitMarginX < obs.x + obs.width &&
              s.x + s.width - hitMarginX > obs.x &&
              s.y + hitMarginY < obs.y + obs.height &&
              s.y + s.height > obs.y + hitMarginY;

            if (isColliding && s.crashTimer <= 0) {
              // Apply obstacle damage
              const newHealth = Math.max(0, Math.round(st.health - obs.damage));
              st.health = newHealth;
              setHealth(newHealth);

              // Burst sparks
              for (let p = 0; p < 14; p++) {
                st.particles.push({
                  x: obs.x + obs.width / 2,
                  y: obs.y + obs.height / 2,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.7) * 5,
                  size: Math.random() * 3 + 1.5,
                  alpha: 1,
                  color: obs.type === "BUG" ? RUNNER_THEME.obsBug : obs.type === "NULL" ? RUNNER_THEME.obsNull : RUNNER_THEME.accent,
                });
              }

              // Check if dead / game over!
              if (newHealth <= 0) {
                st.mode = "GAME_OVER";
                setGameMode("GAME_OVER");
                setIsCrashModalDismissed(false);

                // Initialize wipeout tumble
                s.wipeoutTimer = 80;
                s.wipeoutSkaterX = s.x;
                s.wipeoutSkaterY = s.y;
                s.wipeoutSkaterRot = 0;
                s.wipeoutBoardX = s.x;
                s.wipeoutBoardY = groundY - 4;
                s.wipeoutBoardRot = 0;

                // High score check
                const currentDist = Math.floor(st.distanceAccumulator);
                if (currentDist > st.highScore) {
                  st.highScore = currentDist;
                  setHighScore(currentDist);
                  setIsNewRecord(true);
                  try {
                    localStorage.setItem("rony_portfolio_runner_best", currentDist.toString());
                  } catch {
                    // Ignore storage errors
                  }
                }
              } else {
                s.crashTimer = 45; // Blink recovery
              }

              obs.x = -150; // Shove offscreen
            }

            if (obs.x < -150) {
              st.obstacles.splice(i, 1);
            }
          }
        }
      } else {
        // --- GAME OVER WIPEOUT ANIMATION ---
        if (s.wipeoutTimer > 0) {
          s.wipeoutTimer -= 1;
          // Skater tumbles forward and falls
          s.wipeoutSkaterX += 1.8;
          s.wipeoutSkaterRot += 0.08;
          if (s.wipeoutSkaterY < groundY - 14) {
            s.wipeoutSkaterY += 1.5;
          }
          // Board skids forward with friction sparks
          s.wipeoutBoardX += 2.8;
          s.wipeoutBoardRot += 0.04;
          if (Math.random() > 0.4) {
            st.particles.push({
              x: s.wipeoutBoardX,
              y: groundY - 2,
              vx: -Math.random() * 3,
              vy: -Math.random() * 2,
              size: Math.random() * 2.5 + 1,
              alpha: 0.9,
              color: RUNNER_THEME.accent,
            });
          }
        }
      }

      // Update Particles
      for (let i = st.particles.length - 1; i >= 0; i--) {
        const p = st.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.032;
        if (p.alpha <= 0) {
          st.particles.splice(i, 1);
        }
      }

      // 3. DRAW ENVIRONMENT (Road line & dashes)
      drawTrack(ctx, width, groundY, st.roadOffset);

      // 4. DRAW PARTICLES
      for (const p of st.particles) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. DRAW OBSTACLES (Heavy Sprites)
      drawObstacles(ctx, st.obstacles, groundY);

      // 6. DRAW SKATER OR WIPEOUT
      if (st.mode === "GAME_OVER") {
        drawWipeout(ctx, s, groundY);
      } else {
        drawSkater(ctx, s, groundY, st.distanceAccumulator);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
    };
  }, [triggerJump]);

  return (
    <div
      ref={containerRef}
      onClick={triggerJump}
      onTouchStart={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest("button")) {
          triggerJump();
        }
      }}
      className="group relative w-full bg-transparent select-none cursor-pointer flex flex-col z-30 touch-manipulation"
      aria-label="Interactive Street Skater Mini-Game. Click or tap to jump over code bugs."
    >
      {/* ========================================================================= */}
      {/* 1. THE ROADWAY (Canvas with the Road line, Skater, & Obstacles)           */}
      {/* ========================================================================= */}
      <div className="relative w-full h-32 sm:h-36">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />

        {/* Center Game Over Notification Banner (Dismissible with Cross Button) */}
        {gameMode === "GAME_OVER" && !isCrashModalDismissed && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-auto w-[90%] max-w-xs">
            <div className="w-full relative rounded-xl border border-red-500/50 bg-card/95 backdrop-blur-xl p-4 sm:p-5 pr-8 text-center shadow-[0_0_30px_rgba(255,85,85,0.3)] flex flex-col items-center gap-2">
              {/* Top-Right Cross [X] Dismiss Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCrashModalDismissed(true);
                }}
                className="absolute top-2.5 right-2.5 p-1 rounded-md text-muted hover:text-fg hover:bg-line/40 transition-colors cursor-pointer"
                title="Dismiss Window (You can still reboot from the bottom button)"
              >
                <X className="size-4" />
              </button>

              <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <span className="size-2 rounded-full bg-red-400 animate-ping" />
                SYSTEM CRASHED
              </div>

              <div className="text-xs text-muted font-mono flex items-center gap-3">
                <span>
                  DIST: <strong className="text-fg">{distance}m</strong>
                </span>
                <span>•</span>
                <span>
                  DODGED: <strong className="text-accent">{dodgedCount}</strong>
                </span>
                {isNewRecord && (
                  <span className="text-accent font-bold animate-pulse">★ NEW RECORD!</span>
                )}
              </div>

              <button
                onClick={handleReboot}
                className="mt-1 flex items-center gap-2 rounded-lg bg-accent px-5 py-2 text-xs font-bold text-on-accent transition-all hover:bg-secondary active:scale-95 cursor-pointer shadow-md"
              >
                <RotateCcw className="size-3.5" />
                REBOOT SYSTEM
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. THE TEXT ROW (Positioned closely below the Road with compact spacing)   */}
      {/* ========================================================================= */}
      <div className="relative w-full pt-1 sm:pt-1.5 flex items-center justify-between gap-1.5 sm:gap-4 pointer-events-auto">
        {/* Left: Play/Pause/Reboot & Integrity Bar */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {gameMode !== "GAME_OVER" ? (
            <button
              onClick={handleTogglePlay}
              className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-line bg-card/80 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold text-fg transition-all hover:border-accent hover:text-accent active:scale-95 cursor-pointer shadow-md"
              title={gameMode === "RUNNING" ? "Pause Game" : "Start / Resume Game"}
            >
              {gameMode === "RUNNING" ? (
                <>
                  <Pause className="size-3 sm:size-3.5 fill-current text-accent" />
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="size-3 sm:size-3.5 fill-current text-accent" />
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">PLAY</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleReboot}
              className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-accent bg-accent/20 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-xs font-bold text-accent transition-all hover:bg-accent hover:text-on-accent active:scale-95 cursor-pointer shadow-lg animate-pulse"
              title="Reboot Game"
            >
              <RotateCcw className="size-3 sm:size-3.5" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">REBOOT</span>
            </button>
          )}

          {/* 5-Segment System Stability Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-line/50 bg-card/60 backdrop-blur-md px-2 sm:px-3 py-1">
            <span className="hidden md:inline font-mono text-[10px] uppercase tracking-widest text-muted/80">
              INTEGRITY
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1">
              {[1, 2, 3, 4, 5].map((seg) => {
                const active = health >= seg * 20;
                return (
                  <span
                    key={seg}
                    className={`h-2 sm:h-2.5 w-2 sm:w-3 rounded-[1px] transition-all duration-300 ${
                      active
                        ? health > 40
                          ? "bg-accent shadow-[0_0_6px_rgba(229,184,105,0.6)]"
                          : "bg-red-400 shadow-[0_0_6px_rgba(255,85,85,0.7)]"
                        : "bg-line/40"
                    }`}
                  />
                );
              })}
            </div>
            <span
              className={`font-mono text-[10px] sm:text-[11px] font-bold tabular-nums ${
                health > 40 ? "text-accent" : health > 0 ? "text-red-400" : "text-muted"
              }`}
            >
              {health}%
            </span>
          </div>
        </div>

        {/* Right: Best Score, Distance & Dodged Telemetry */}
        <div className="flex items-center gap-2 sm:gap-4 font-mono text-[10px] sm:text-xs text-muted bg-card/60 backdrop-blur-md border border-line/40 rounded-full px-2.5 sm:px-3.5 py-1">
          {highScore > 0 && (
            <div className="flex items-center gap-1 text-secondary">
              <span className="hidden sm:inline text-[9px] sm:text-[10px] uppercase tracking-wider text-secondary/70">BEST:</span>
              <span className="font-bold text-secondary tabular-nums">{highScore}m</span>
            </div>
          )}
          <div
            className={`flex items-center gap-1 ${
              highScore > 0 ? "border-l border-line/60 pl-2 sm:pl-3" : ""
            }`}
          >
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted/70">DIST:</span>
            <span className="font-semibold text-fg tabular-nums">{distance}m</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 border-l border-line/60 pl-3">
            <span className="text-[10px] uppercase tracking-wider text-accent/80">DODGED:</span>
            <span className="font-semibold text-accent tabular-nums">{dodgedCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------------------
// CANVAS DRAWING SUB-ROUTINES (Optimized 2D Rendering)
// --------------------------------------------------------------------------------------

function drawTrack(
  ctx: CanvasRenderingContext2D,
  width: number,
  groundY: number,
  roadOffset: number
) {
  // 1. The Road Line: Bold, crisp, and clearly visible with subtle edge fade
  const trackGradient = ctx.createLinearGradient(0, 0, width, 0);
  trackGradient.addColorStop(0, `rgba(${RUNNER_THEME.accentRgb}, 0)`);
  trackGradient.addColorStop(0.04, `rgba(${RUNNER_THEME.accentRgb}, 0.7)`); // Sunburst Amber Road Line
  trackGradient.addColorStop(0.96, `rgba(${RUNNER_THEME.accentRgb}, 0.7)`);
  trackGradient.addColorStop(1, `rgba(${RUNNER_THEME.accentRgb}, 0)`);

  ctx.strokeStyle = trackGradient;
  ctx.lineWidth = 2; // Crisp and clearly visible
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(width, groundY);
  ctx.stroke();

  // 2. Scrolling Street Dashes: cleanly positioned beneath the road line
  ctx.save();
  ctx.beginPath();
  ctx.rect(width * 0.03, groundY + 1, width * 0.94, 9);
  ctx.clip();

  ctx.strokeStyle = `rgba(${RUNNER_THEME.accentRgb}, 0.4)`;
  ctx.lineWidth = 2;
  const dashLength = 16;
  const dashGap = 24;
  const step = dashLength + dashGap;
  const startX = -roadOffset;

  ctx.beginPath();
  for (let x = startX; x < width + step; x += step) {
    ctx.moveTo(Math.max(0, x), groundY + 5);
    ctx.lineTo(Math.min(width, x + dashLength), groundY + 5);
  }
  ctx.stroke();
  ctx.restore();
}

function drawObstacles(
  ctx: CanvasRenderingContext2D,
  obstacles: Obstacle[],
  groundY: number
) {
  for (const obs of obstacles) {
    ctx.save();

    // 1. Heavy Contact Shadow under obstacle on asphalt
    ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
    ctx.beginPath();
    ctx.ellipse(obs.x + obs.width / 2, groundY + 1, obs.width * 0.55, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. Base Solid Heavy Chassis (Identical size 44x26 for all)
    ctx.fillStyle = RUNNER_THEME.chassis; // Deep solid dark slate
    ctx.beginPath();
    ctx.roundRect(obs.x, obs.y, obs.width, obs.height, 3.5);
    ctx.fill();

    if (obs.type === "404") {
      // --- SOLID HEAVY ROADBLOCK (404) ---
      ctx.strokeStyle = RUNNER_THEME.accent;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Solid diagonal hazard chevrons (Amber & Dark)
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(obs.x + 1, obs.y + 1, obs.width - 2, 7, [2.5, 2.5, 0, 0]);
      ctx.clip();
      ctx.fillStyle = RUNNER_THEME.accent;
      for (let sx = obs.x - 12; sx < obs.x + obs.width + 12; sx += 8) {
        ctx.beginPath();
        ctx.moveTo(sx, obs.y + 8);
        ctx.lineTo(sx + 5, obs.y);
        ctx.lineTo(sx + 8, obs.y);
        ctx.lineTo(sx + 3, obs.y + 8);
        ctx.fill();
      }
      ctx.restore();

      // Solid gold corner bolts
      ctx.fillStyle = RUNNER_THEME.secondary;
      ctx.fillRect(obs.x + 3, obs.y + obs.height - 5, 2, 2);
      ctx.fillRect(obs.x + obs.width - 5, obs.y + obs.height - 5, 2, 2);

      // Stencil 404
      ctx.fillStyle = RUNNER_THEME.accent;
      ctx.font = "900 11px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("404", obs.x + obs.width / 2, obs.y + obs.height / 2 + 3);
    } else if (obs.type === "BUG") {
      // --- SOLID MECHANICAL CYBER-BEETLE (!BUG) ---
      ctx.strokeStyle = RUNNER_THEME.obsBug;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 4 heavy mechanical walking legs on the asphalt
      ctx.strokeStyle = RUNNER_THEME.muted;
      ctx.lineWidth = 1.8;
      ctx.lineCap = "round";
      const legCycle = Math.sin(obs.x * 0.45) * 3;
      ctx.beginPath();
      ctx.moveTo(obs.x + 6, obs.y + 14);
      ctx.lineTo(obs.x + 2, groundY);
      ctx.moveTo(obs.x + 14, obs.y + 16);
      ctx.lineTo(obs.x + 12 + legCycle, groundY);
      ctx.moveTo(obs.x + obs.width - 14, obs.y + 16);
      ctx.lineTo(obs.x + obs.width - 12 - legCycle, groundY);
      ctx.moveTo(obs.x + obs.width - 6, obs.y + 14);
      ctx.lineTo(obs.x + obs.width - 2, groundY);
      ctx.stroke();

      // Solid crimson top visor band
      ctx.fillStyle = RUNNER_THEME.obsBug;
      ctx.fillRect(obs.x + 2, obs.y + 2, obs.width - 4, 4);

      // Glowing crimson optic eye lens
      ctx.fillStyle = RUNNER_THEME.obsBugGlow;
      ctx.beginPath();
      ctx.arc(obs.x + obs.width - 8, obs.y + 9, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Solid bold !BUG text
      ctx.fillStyle = RUNNER_THEME.obsBugLight;
      ctx.font = "900 10px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("!BUG", obs.x + obs.width / 2 - 2, obs.y + obs.height / 2 + 3);
    } else {
      // --- SOLID HEAVY DATA CANISTER (NULL) ---
      ctx.strokeStyle = RUNNER_THEME.obsNull;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Solid cyan top valve bracket
      ctx.fillStyle = RUNNER_THEME.obsNull;
      ctx.fillRect(obs.x + obs.width / 2 - 5, obs.y - 3, 10, 3);

      // Solid cyan top and bottom reinforce rims
      ctx.fillStyle = RUNNER_THEME.obsNull;
      ctx.fillRect(obs.x + 2, obs.y + 2, obs.width - 4, 3);
      ctx.fillRect(obs.x + 2, obs.y + obs.height - 5, obs.width - 4, 3);

      // Solid cyan core text
      ctx.fillStyle = RUNNER_THEME.obsNull;
      ctx.font = "900 10px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("null", obs.x + obs.width / 2, obs.y + obs.height / 2 + 1);
    }

    ctx.restore();
  }
}

function drawSkater(
  ctx: CanvasRenderingContext2D,
  s: {
    x: number;
    y: number;
    width: number;
    height: number;
    boardAngle: number;
    crashTimer: number;
  },
  groundY: number,
  distAccum: number
) {
  ctx.save();

  // Contact shadow on ground under skateboard
  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.beginPath();
  ctx.ellipse(s.x + s.width / 2, groundY + 1, s.width * 0.6, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Blink if in crash recovery
  if (s.crashTimer > 0 && Math.floor(s.crashTimer / 4) % 2 === 0) {
    ctx.globalAlpha = 0.35;
  }

  // Pivot transform at rear wheel for ollie pop
  const pivotX = s.x + s.width / 2;
  const pivotY = s.y + s.height;
  ctx.translate(pivotX, pivotY);
  ctx.rotate(s.boardAngle);
  ctx.translate(-pivotX, -pivotY);

  const deckY = s.y + s.height - 4;
  const deckW = s.width + 6;
  const deckX = s.x - 3;

  // Board Deck
  ctx.fillStyle = RUNNER_THEME.accent;
  ctx.beginPath();
  ctx.roundRect(deckX, deckY, deckW, 3.2, [2, 2, 2, 2]);
  ctx.fill();

  // Wheels
  const wheelRadius = 3.2;
  const wheelAngle = (distAccum * 0.9) % (Math.PI * 2);

  const drawWheel = (wx: number, wy: number) => {
    ctx.save();
    ctx.translate(wx, wy);
    ctx.rotate(wheelAngle);
    ctx.fillStyle = RUNNER_THEME.card;
    ctx.strokeStyle = RUNNER_THEME.secondary;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, wheelRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = RUNNER_THEME.accent;
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  drawWheel(deckX + 6, deckY + 4);
  drawWheel(deckX + deckW - 6, deckY + 4);

  // Skater Silhouette
  ctx.fillStyle = RUNNER_THEME.fg;

  // Head
  ctx.beginPath();
  ctx.arc(s.x + 19, s.y + 6, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Torso
  ctx.beginPath();
  ctx.moveTo(s.x + 17, s.y + 11);
  ctx.lineTo(s.x + 23, s.y + 21);
  ctx.lineTo(s.x + 15, s.y + 23);
  ctx.lineTo(s.x + 12, s.y + 13);
  ctx.closePath();
  ctx.fill();

  // Arms
  ctx.lineWidth = 2.2;
  ctx.strokeStyle = RUNNER_THEME.fg;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(s.x + 13, s.y + 13);
  ctx.lineTo(s.x + 4, s.y + 9);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(s.x + 19, s.y + 14);
  ctx.lineTo(s.x + 28, s.y + 16);
  ctx.stroke();

  // Legs
  ctx.beginPath();
  ctx.moveTo(s.x + 19, s.y + 22);
  ctx.lineTo(s.x + 24, s.y + 28);
  ctx.lineTo(s.x + 23, deckY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(s.x + 15, s.y + 22);
  ctx.lineTo(s.x + 10, s.y + 27);
  ctx.lineTo(s.x + 9, deckY);
  ctx.stroke();

  ctx.restore();
}

function drawWipeout(
  ctx: CanvasRenderingContext2D,
  s: {
    wipeoutSkaterX: number;
    wipeoutSkaterY: number;
    wipeoutSkaterRot: number;
    wipeoutBoardX: number;
    wipeoutBoardY: number;
    wipeoutBoardRot: number;
  },
  groundY: number
) {
  // 1. Skidding Skateboard
  ctx.save();
  ctx.translate(s.wipeoutBoardX, s.wipeoutBoardY);
  ctx.rotate(s.wipeoutBoardRot);
  ctx.fillStyle = RUNNER_THEME.accent;
  ctx.beginPath();
  ctx.roundRect(-18, -2, 36, 3.2, 2);
  ctx.fill();
  ctx.fillStyle = RUNNER_THEME.card;
  ctx.strokeStyle = RUNNER_THEME.secondary;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(-10, 3, 3, 0, Math.PI * 2);
  ctx.arc(10, 3, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // 2. Tumbled Skater
  ctx.save();
  ctx.translate(s.wipeoutSkaterX, s.wipeoutSkaterY);
  ctx.rotate(s.wipeoutSkaterRot);
  ctx.fillStyle = RUNNER_THEME.fg;
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 2.2;
  ctx.strokeStyle = RUNNER_THEME.fg;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-10, 10);
  ctx.lineTo(0, 0);
  ctx.lineTo(12, 8);
  ctx.moveTo(0, 5);
  ctx.lineTo(-8, 16);
  ctx.stroke();
  ctx.restore();
}
