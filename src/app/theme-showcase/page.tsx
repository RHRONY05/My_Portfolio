"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Copy,
  Sparkles,
  Layers,
  Type,
  Code2,
  Cpu,
  Flame,
  Terminal,
} from "lucide-react";
import {
  APPROVED_THEMES,
  APPROVED_FONTS,
  ThemeItem,
  FontItem,
  applyThemeToDocument,
  applyFontToDocument,
} from "@/data/themeConfig";

export default function ThemeShowcasePage() {
  const [selectedThemeId, setSelectedThemeId] = useState<string>("monolithic-onyx");
  const [selectedFontId, setSelectedFontId] = useState<string>("original-surfer");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("rony_theme_id");
      if (savedTheme && APPROVED_THEMES.some((t) => t.id === savedTheme)) {
        setSelectedThemeId(savedTheme);
      }
      const savedFont = localStorage.getItem("rony_font_id");
      if (savedFont && APPROVED_FONTS.some((f) => f.id === savedFont)) {
        setSelectedFontId(savedFont);
      }
    } catch {
      // ignore
    }
  }, []);

  const activeTheme =
    APPROVED_THEMES.find((t) => t.id === selectedThemeId) ?? APPROVED_THEMES[0];
  const activeFont =
    APPROVED_FONTS.find((f) => f.id === selectedFontId) ?? APPROVED_FONTS[0];
  const colors = activeTheme.colors;

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const handleApplyGlobally = () => {
    applyThemeToDocument(activeTheme);
    applyFontToDocument(activeFont);
    try {
      localStorage.setItem("rony_theme_id", activeTheme.id);
      localStorage.setItem("rony_theme_active", JSON.stringify(activeTheme.colors));
      localStorage.setItem("rony_font_id", activeFont.id);
      window.dispatchEvent(
        new CustomEvent("rony_theme_change", {
          detail: { themeId: activeTheme.id, fontId: activeFont.id },
        })
      );
      setAppliedNotification(`${activeTheme.name} + ${activeFont.name}`);
      setTimeout(() => setAppliedNotification(null), 3000);
    } catch {
      // ignore
    }
  };

  return (
    <main
      className="min-h-screen transition-colors duration-300 pb-20"
      style={{
        backgroundColor: colors.canvas,
        color: colors.fg,
        fontFamily: activeFont.family,
      }}
    >
      {/* Top Header */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-md px-6 py-4 transition-colors"
        style={{
          borderColor: colors.line,
          backgroundColor: `${colors.canvas}E6`,
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80 font-mono"
              style={{ color: colors.accent }}
            >
              <ArrowLeft className="size-4" /> Back to Portfolio
            </Link>
            <span style={{ color: colors.line }}>|</span>
            <span
              className="text-xs font-mono uppercase tracking-wider px-2.5 py-0.5 rounded border"
              style={{
                borderColor: colors.line,
                color: colors.muted,
                backgroundColor: colors.card,
              }}
            >
              Curated System: 4 Themes &bull; 4 Fonts
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleApplyGlobally}
              className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-mono font-bold transition-all shadow-md active:scale-95 cursor-pointer hover:opacity-90"
              style={{
                backgroundColor: colors.accent,
                color: colors.onAccent,
              }}
              title="Apply this theme and font to the entire website"
            >
              <Sparkles className="size-3.5" />
              {appliedNotification ? "✓ Activated Everywhere!" : "⚡ Apply to Entire Website"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 space-y-12">
        {/* Intro Banner */}
        <div className="space-y-3">
          <div
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full border"
            style={{ borderColor: colors.accent, color: colors.accent }}
          >
            <Sparkles className="size-3.5" /> Design System Control Matrix
          </div>
          <h1
            className="text-3xl md:text-5xl font-black tracking-tight"
            style={{ fontFamily: activeFont.family }}
          >
            Tactical Theme &amp; Font Laboratory
          </h1>
          <p className="text-base max-w-3xl" style={{ color: colors.muted }}>
            Explore the 4 official curated color themes and 4 curated typography systems.
            Selecting any combination updates all live sample surfaces below.
          </p>
        </div>

        {/* CONTROLS: 4 THEMES & 4 FONTS SELECTORS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 1. Theme Selector */}
          <div
            className="p-6 rounded-2xl border space-y-4 shadow-sm"
            style={{ backgroundColor: colors.card, borderColor: colors.line }}
          >
            <div className="flex items-center justify-between">
              <h2
                className="text-lg font-bold flex items-center gap-2"
                style={{ fontFamily: activeFont.family }}
              >
                <Layers className="size-5" style={{ color: colors.accent }} /> 1. Select Color Theme (4 Options)
              </h2>
              <span className="text-xs font-mono text-muted">Click to preview</span>
            </div>

            <div className="space-y-3">
              {APPROVED_THEMES.map((theme) => {
                const isSelected = theme.id === selectedThemeId;
                const c = theme.colors;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => {
                      setSelectedThemeId(theme.id);
                      applyThemeToDocument(theme);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "shadow-lg scale-[1.01]"
                        : "opacity-80 hover:opacity-100 hover:scale-[1.005]"
                    }`}
                    style={{
                      backgroundColor: c.card,
                      borderColor: isSelected ? c.accent : colors.line,
                      boxShadow: isSelected
                        ? `0 0 20px ${c.accentGlow}`
                        : "none",
                    }}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span
                          className="font-mono text-xs px-2 py-0.5 rounded font-bold"
                          style={{
                            backgroundColor: c.canvas,
                            color: c.accent,
                            border: `1px solid ${c.line}`,
                          }}
                        >
                          {theme.num}
                        </span>
                        <span
                          className="font-bold text-base"
                          style={{ color: c.fg, fontFamily: activeFont.family }}
                        >
                          {theme.name}
                        </span>
                        {theme.id === "monolithic-onyx" && (
                          <span
                            className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase"
                            style={{
                              backgroundColor: c.accent,
                              color: c.onAccent,
                            }}
                          >
                            Default
                          </span>
                        )}
                      </div>

                      <p className="text-xs max-w-md line-clamp-1" style={{ color: c.muted }}>
                        {theme.tagline}
                      </p>

                      {/* Swatch Bar */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <span
                          className="h-4 w-7 rounded-sm border border-black/30"
                          style={{ backgroundColor: c.canvas }}
                          title={`Canvas: ${c.canvas}`}
                        />
                        <span
                          className="h-4 w-7 rounded-sm border border-black/30"
                          style={{ backgroundColor: c.card }}
                          title={`Card: ${c.card}`}
                        />
                        <span
                          className="h-4 w-7 rounded-sm border border-black/30"
                          style={{ backgroundColor: c.line }}
                          title={`Line: ${c.line}`}
                        />
                        <span
                          className="h-4 w-7 rounded-sm border border-black/30"
                          style={{ backgroundColor: c.muted }}
                          title={`Muted: ${c.muted}`}
                        />
                        <span
                          className="h-4 w-10 rounded-sm font-mono text-[9px] flex items-center justify-center font-bold shadow-sm"
                          style={{ backgroundColor: c.accent, color: c.onAccent }}
                          title={`Accent: ${c.accent}`}
                        >
                          ACCENT
                        </span>
                        <span
                          className="h-4 w-8 rounded-sm"
                          style={{ backgroundColor: c.secondary }}
                          title={`Secondary: ${c.secondary}`}
                        />
                      </div>
                    </div>

                    <div className="pl-4">
                      {isSelected ? (
                        <div
                          className="size-7 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: c.accent, color: c.onAccent }}
                        >
                          <Check className="size-4 stroke-[3]" />
                        </div>
                      ) : (
                        <div
                          className="size-6 rounded-full border"
                          style={{ borderColor: colors.line }}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Font Selector */}
          <div
            className="p-6 rounded-2xl border space-y-4 shadow-sm"
            style={{ backgroundColor: colors.card, borderColor: colors.line }}
          >
            <div className="flex items-center justify-between">
              <h2
                className="text-lg font-bold flex items-center gap-2"
                style={{ fontFamily: activeFont.family }}
              >
                <Type className="size-5" style={{ color: colors.accent }} /> 2. Select Typography (4 Options)
              </h2>
              <span className="text-xs font-mono text-muted">Inherited globally</span>
            </div>

            <div className="space-y-3">
              {APPROVED_FONTS.map((font) => {
                const isSelected = font.id === selectedFontId;
                return (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => {
                      setSelectedFontId(font.id);
                      applyFontToDocument(font);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "shadow-lg scale-[1.01]"
                        : "opacity-80 hover:opacity-100 hover:scale-[1.005]"
                    }`}
                    style={{
                      backgroundColor: colors.canvas,
                      borderColor: isSelected ? colors.accent : colors.line,
                      boxShadow: isSelected
                        ? `0 0 15px ${colors.accentGlow}`
                        : "none",
                    }}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="text-lg font-semibold"
                          style={{ fontFamily: font.family, color: colors.fg }}
                        >
                          {font.name}
                        </span>
                        {font.id === "original-surfer" && (
                          <span
                            className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase"
                            style={{
                              backgroundColor: colors.accent,
                              color: colors.onAccent,
                            }}
                          >
                            Default
                          </span>
                        )}
                        <span
                          className="text-[11px] font-mono px-2 py-0.5 rounded border"
                          style={{
                            borderColor: colors.line,
                            color: colors.accent,
                            backgroundColor: colors.card,
                          }}
                        >
                          {font.label}
                        </span>
                      </div>

                      <p className="text-xs" style={{ color: colors.muted }}>
                        {font.description}
                      </p>

                      {/* Alphabet Specimen */}
                      <p
                        className="text-sm font-medium tracking-wide pt-1"
                        style={{ fontFamily: font.family, color: colors.fg }}
                      >
                        Sphinx of black quartz, judge my vow. 0123456789
                      </p>
                    </div>

                    <div className="pl-4">
                      {isSelected ? (
                        <div
                          className="size-7 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: colors.accent,
                            color: colors.onAccent,
                          }}
                        >
                          <Check className="size-4 stroke-[3]" />
                        </div>
                      ) : (
                        <div
                          className="size-6 rounded-full border"
                          style={{ borderColor: colors.line }}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ACTIVE PALETTE TOKENS & HEX COPIER */}
        <div
          className="p-6 rounded-2xl border space-y-4"
          style={{ backgroundColor: colors.card, borderColor: colors.line }}
        >
          <div className="flex items-center justify-between">
            <h3
              className="text-base font-bold flex items-center gap-2"
              style={{ fontFamily: activeFont.family }}
            >
              <Code2 className="size-4" style={{ color: colors.accent }} /> Token Dictionary: {activeTheme.name}
            </h3>
            {copiedHex && (
              <span className="text-xs font-mono text-accent">
                ✓ Copied {copiedHex} to clipboard!
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {[
              { label: "Canvas", hex: colors.canvas },
              { label: "Card", hex: colors.card },
              { label: "Line", hex: colors.line },
              { label: "Foreground", hex: colors.fg },
              { label: "Muted", hex: colors.muted },
              { label: "Accent", hex: colors.accent },
              { label: "Secondary", hex: colors.secondary },
              { label: "On-Accent", hex: colors.onAccent },
            ].map((token) => (
              <button
                key={token.label}
                type="button"
                onClick={() => handleCopyHex(token.hex)}
                className="group p-3 rounded-lg border text-left transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: colors.canvas,
                  borderColor: colors.line,
                }}
              >
                <div
                  className="h-8 w-full rounded mb-2 border border-black/30 shadow-inner"
                  style={{ backgroundColor: token.hex }}
                />
                <div className="text-[11px] font-mono text-muted">{token.label}</div>
                <div
                  className="text-xs font-mono font-bold flex items-center justify-between group-hover:text-accent"
                  style={{ color: colors.fg }}
                >
                  <span>{token.hex}</span>
                  <Copy className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* LIVE SIMULATION PREVIEW: HERO & CARD COMPONENTS */}
        <div className="space-y-6">
          <h2
            className="text-2xl font-bold flex items-center gap-2"
            style={{ fontFamily: activeFont.family }}
          >
            <Cpu className="size-6" style={{ color: colors.accent }} /> Live Component Simulation
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Simulation 1: Hero Card Screen */}
            <div
              className="lg:col-span-2 p-8 rounded-2xl border space-y-6 shadow-xl relative overflow-hidden"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.line,
              }}
            >
              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
                style={{ backgroundColor: colors.accent }}
              />

              <div className="flex items-center gap-3">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold border flex items-center gap-1.5"
                  style={{
                    backgroundColor: colors.canvas,
                    borderColor: colors.line,
                    color: colors.accent,
                  }}
                >
                  <Terminal className="size-3" /> Autonomous AI Engineer
                </span>
                <span className="text-xs font-mono" style={{ color: colors.muted }}>
                  RONY.DEV &bull; Chittagong, BD
                </span>
              </div>

              <div className="space-y-3">
                <h3
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                  style={{ fontFamily: activeFont.family, color: colors.fg }}
                >
                  Engineering High-Performance Web Applications &amp; Autonomous AI Systems
                </h3>
                <p className="text-base leading-relaxed" style={{ color: colors.muted }}>
                  Full-stack engineering anchored in Next.js, Node.js, and autonomous multi-agent
                  workflows. Designing tactile, memorable digital realms with WebGL and Three.js.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg transition-transform active:scale-95"
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.onAccent,
                    boxShadow: `0 0 20px ${colors.accentGlow}`,
                  }}
                >
                  Explore Systems
                </button>

                <button
                  type="button"
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all"
                  style={{
                    backgroundColor: colors.canvas,
                    borderColor: colors.line,
                    color: colors.fg,
                  }}
                >
                  Contact Console
                </button>
              </div>
            </div>

            {/* Simulation 2: Project Dossier Card */}
            <div
              className="p-6 rounded-2xl border space-y-4 shadow-lg flex flex-col justify-between"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.line,
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] font-mono px-2 py-0.5 rounded font-bold"
                    style={{
                      backgroundColor: colors.canvas,
                      color: colors.accent,
                      border: `1px solid ${colors.line}`,
                    }}
                  >
                    AI WORKFLOW
                  </span>
                  <Flame className="size-4" style={{ color: colors.accent }} />
                </div>

                <h4
                  className="text-xl font-bold"
                  style={{ fontFamily: activeFont.family, color: colors.fg }}
                >
                  Autonomous Multi-Agent Orchestrator
                </h4>

                <p className="text-xs leading-relaxed" style={{ color: colors.muted }}>
                  LangGraph agentic framework with self-healing feedback loops, PostgreSQL state
                  persistence, and sub-second deterministic tool calling.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {["Next.js", "LangGraph", "FastAPI", "Tailwind"].map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: colors.canvas,
                        color: colors.muted,
                        border: `1px solid ${colors.line}`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="pt-4 mt-4 border-t flex items-center justify-between text-xs font-mono font-bold"
                style={{ borderColor: colors.line }}
              >
                <span style={{ color: colors.muted }}>01 / CASE STUDY</span>
                <span style={{ color: colors.accent }} className="hover:underline cursor-pointer">
                  Inspect Spec &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM GLOBAL ACTIVATION BANNER */}
        <div
          className="p-8 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.accent,
            boxShadow: `0 0 30px ${colors.accentGlow}`,
          }}
        >
          <div className="space-y-1 text-center sm:text-left">
            <h3
              className="text-xl font-bold"
              style={{ fontFamily: activeFont.family, color: colors.fg }}
            >
              Ready to lock in {activeTheme.name} + {activeFont.name}?
            </h3>
            <p className="text-xs font-mono" style={{ color: colors.muted }}>
              Click below to activate these colors and typography across the entire portfolio website.
            </p>
          </div>

          <button
            type="button"
            onClick={handleApplyGlobally}
            className="px-6 py-3 rounded-xl font-bold text-sm shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 font-mono"
            style={{
              backgroundColor: colors.accent,
              color: colors.onAccent,
            }}
          >
            ⚡ Activate Globally Now
          </button>
        </div>
      </div>
    </main>
  );
}
