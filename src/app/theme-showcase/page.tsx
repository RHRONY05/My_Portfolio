"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Moon, Sun, Sparkles, Code2, Layers, Cpu } from "lucide-react";

// --- Curated Theme Palettes ---
export interface ThemeConfig {
  id: string;
  name: string;
  tagline: string;
  dark: {
    canvas: string;
    card: string;
    line: string;
    fg: string;
    muted: string;
    accent: string;
    onAccent: string;
    secondary: string;
    accentGlow: string;
  };
  light: {
    canvas: string;
    card: string;
    line: string;
    fg: string;
    muted: string;
    accent: string;
    onAccent: string;
    secondary: string;
    accentGlow: string;
  };
}

export const themes: ThemeConfig[] = [
  {
    id: "obsidian-phosphor",
    name: "01. Obsidian & Phosphor Neon",
    tagline: "High-tech terminal, cyberpunk authority, and developer console clarity",
    dark: {
      canvas: "#0D1117",
      card: "#161B22",
      line: "#30363D",
      fg: "#F0F6FC",
      muted: "#8B949E",
      accent: "#00FF94",
      onAccent: "#00391D",
      secondary: "#58A6FF",
      accentGlow: "rgba(0, 255, 148, 0.35)",
    },
    light: {
      canvas: "#F6F8FA",
      card: "#FFFFFF",
      line: "#D0D7DE",
      fg: "#1F2328",
      muted: "#656D76",
      accent: "#09924E",
      onAccent: "#FFFFFF",
      secondary: "#0969DA",
      accentGlow: "rgba(9, 146, 78, 0.2)",
    },
  },
  {
    id: "deep-space",
    name: "02. Deep Space & Ice Titanium",
    tagline: "Linear & Vercel inspired: ultra-clean, minimalist, subtle glassmorphism",
    dark: {
      canvas: "#08090C",
      card: "#111318",
      line: "#222630",
      fg: "#F1F5F9",
      muted: "#94A3B8",
      accent: "#38BDF8",
      onAccent: "#082F49",
      secondary: "#818CF8",
      accentGlow: "rgba(56, 189, 248, 0.35)",
    },
    light: {
      canvas: "#F8FAFC",
      card: "#FFFFFF",
      line: "#E2E8F0",
      fg: "#0F172A",
      muted: "#64748B",
      accent: "#0284C7",
      onAccent: "#FFFFFF",
      secondary: "#6366F1",
      accentGlow: "rgba(2, 132, 199, 0.2)",
    },
  },
  {
    id: "editorial-archive",
    name: "03. Editorial Archive & Champagne Gold",
    tagline: "Panel / Press inspired: tactile graphic novel, luxury print paper & ink",
    dark: {
      canvas: "#121115",
      card: "#1A1820",
      line: "#2E2A38",
      fg: "#F5F3EF",
      muted: "#9691A4",
      accent: "#E5C07B",
      onAccent: "#241A04",
      secondary: "#E06C75",
      accentGlow: "rgba(229, 192, 123, 0.35)",
    },
    light: {
      canvas: "#F4F1EA",
      card: "#FFFFFF",
      line: "#DDD7CA",
      fg: "#1C1917",
      muted: "#78716C",
      accent: "#B45309",
      onAccent: "#FFFFFF",
      secondary: "#BE123C",
      accentGlow: "rgba(180, 83, 9, 0.2)",
    },
  },
];

// --- Font Pairings ---
export interface FontPairing {
  id: string;
  name: string;
  category: string;
  headingFamily: string;
  bodyFamily: string;
  monoFamily: string;
  description: string;
  cssImport: string;
}

export const fontPairings: FontPairing[] = [
  {
    id: "precision-inter",
    name: "Precision Engineering",
    category: "Sans + Mono",
    headingFamily: "'Inter', sans-serif",
    bodyFamily: "'Inter', sans-serif",
    monoFamily: "'JetBrains Mono', monospace",
    description: "Industry benchmark used by Linear, Vercel, and Stripe. Unmatched readability and technical authority.",
    cssImport: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap",
  },
  {
    id: "space-grotesk",
    name: "Futuristic & Expressive",
    category: "Geometric Display + Sans",
    headingFamily: "'Space Grotesk', sans-serif",
    bodyFamily: "'Inter', sans-serif",
    monoFamily: "'JetBrains Mono', monospace",
    description: "Distinctive geometric ink-traps for headlines giving authentic cyberpunk/comic flair, paired with clean Inter prose.",
    cssImport: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap",
  },
  {
    id: "outfit-modern",
    name: "Polished Tech Editorial",
    category: "Modern Grotesk + Sans",
    headingFamily: "'Outfit', sans-serif",
    bodyFamily: "'Plus Jakarta Sans', sans-serif",
    monoFamily: "'JetBrains Mono', monospace",
    description: "Clean, high-end, contemporary editorial warmth. Crisp display headlines with high-density readable text.",
    cssImport: "https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap",
  },
];

export default function ThemeShowcasePage() {
  const [selectedThemeId, setSelectedThemeId] = useState<string>("obsidian-phosphor");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [selectedFontId, setSelectedFontId] = useState<string>("precision-inter");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const activeTheme = themes.find((t) => t.id === selectedThemeId) ?? themes[0];
  const activeColors = isDarkMode ? activeTheme.dark : activeTheme.light;
  const activeFont = fontPairings.find((f) => f.id === selectedFontId) ?? fontPairings[0];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: activeColors.canvas,
        color: activeColors.fg,
        fontFamily: activeFont.bodyFamily,
      }}
    >
      {/* External font stylesheet injection */}
      <link rel="stylesheet" href={activeFont.cssImport} />

      {/* Top Header */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-md px-6 py-4 transition-colors"
        style={{
          borderColor: activeColors.line,
          backgroundColor: `${activeColors.canvas}CC`,
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ color: activeColors.accent }}
            >
              <ArrowLeft className="size-4" /> Back to Portfolio
            </Link>
            <span style={{ color: activeColors.line }}>|</span>
            <span
              className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded border"
              style={{
                borderColor: activeColors.line,
                color: activeColors.muted,
                backgroundColor: activeColors.card,
              }}
            >
              Interactive Theme & Font Showcase
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
              style={{
                borderColor: activeColors.line,
                backgroundColor: activeColors.card,
                color: activeColors.fg,
              }}
            >
              {isDarkMode ? (
                <>
                  <Moon className="size-3.5" style={{ color: activeColors.accent }} /> Dark Mode
                </>
              ) : (
                <>
                  <Sun className="size-3.5" style={{ color: activeColors.accent }} /> Light Mode
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 space-y-12">
        {/* Intro */}
        <div className="space-y-3">
          <div
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full border"
            style={{ borderColor: activeColors.accent, color: activeColors.accent }}
          >
            <Sparkles className="size-3.5" /> Stage 2 Visual Theme & Font Gate
          </div>
          <h1
            className="text-4xl md:text-5xl font-black tracking-tight"
            style={{ fontFamily: activeFont.headingFamily }}
          >
            Interactive Design System Playground
          </h1>
          <p className="text-base max-w-3xl" style={{ color: activeColors.muted }}>
            Compare curated color palettes, dark/light modes, and Google Font pairings side-by-side in real time. Switch options below to see how buttons, cards, badges, and typography react instantly.
          </p>
        </div>

        {/* CONTROLS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Theme Selector */}
          <div
            className="p-6 rounded-xl border space-y-4 shadow-sm"
            style={{ backgroundColor: activeColors.card, borderColor: activeColors.line }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2" style={{ fontFamily: activeFont.headingFamily }}>
                <Layers className="size-4" style={{ color: activeColors.accent }} /> 1. Select Color Theme
              </h2>
              <span className="text-xs font-mono" style={{ color: activeColors.muted }}>
                3 Options
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {themes.map((theme) => {
                const isSelected = theme.id === selectedThemeId;
                const palette = isDarkMode ? theme.dark : theme.light;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedThemeId(theme.id)}
                    className="w-full text-left p-4 rounded-lg border transition-all relative overflow-hidden group hover:scale-[1.01]"
                    style={{
                      borderColor: isSelected ? activeColors.accent : activeColors.line,
                      backgroundColor: isSelected ? `${activeColors.accent}10` : "transparent",
                    }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm">{theme.name}</span>
                      {isSelected && (
                        <span
                          className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: activeColors.accent, color: activeColors.onAccent }}
                        >
                          <Check className="size-3" /> Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs mb-3" style={{ color: activeColors.muted }}>
                      {theme.tagline}
                    </p>
                    {/* Swatch row */}
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded border" style={{ backgroundColor: palette.canvas, borderColor: palette.line }} title="Canvas" />
                      <div className="size-6 rounded border" style={{ backgroundColor: palette.card, borderColor: palette.line }} title="Card Surface" />
                      <div className="size-6 rounded" style={{ backgroundColor: palette.accent }} title="Accent" />
                      <div className="size-6 rounded" style={{ backgroundColor: palette.secondary }} title="Secondary" />
                      <div className="size-6 rounded border" style={{ backgroundColor: palette.fg, borderColor: palette.line }} title="Text" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Pairing Selector */}
          <div
            className="p-6 rounded-xl border space-y-4 shadow-sm"
            style={{ backgroundColor: activeColors.card, borderColor: activeColors.line }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2" style={{ fontFamily: activeFont.headingFamily }}>
                <Code2 className="size-4" style={{ color: activeColors.accent }} /> 2. Select Font Pairing
              </h2>
              <span className="text-xs font-mono" style={{ color: activeColors.muted }}>
                3 Pairings
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {fontPairings.map((pairing) => {
                const isSelected = pairing.id === selectedFontId;
                return (
                  <button
                    key={pairing.id}
                    onClick={() => setSelectedFontId(pairing.id)}
                    className="w-full text-left p-4 rounded-lg border transition-all group hover:scale-[1.01]"
                    style={{
                      borderColor: isSelected ? activeColors.accent : activeColors.line,
                      backgroundColor: isSelected ? `${activeColors.accent}10` : "transparent",
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm" style={{ fontFamily: pairing.headingFamily }}>
                        {pairing.name}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded border" style={{ borderColor: activeColors.line, color: activeColors.muted }}>
                        {pairing.category}
                      </span>
                    </div>
                    <p className="text-xs mb-2" style={{ color: activeColors.muted }}>
                      {pairing.description}
                    </p>
                    <div className="text-xs font-mono" style={{ color: activeColors.accent }}>
                      Heading: {pairing.headingFamily.split(",")[0]} • Body: {pairing.bodyFamily.split(",")[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* LIVE COMPONENT PREVIEW GALLERY */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: activeColors.line }}>
            <div>
              <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: activeFont.headingFamily }}>
                Live Component Sandbox
              </h2>
              <p className="text-sm" style={{ color: activeColors.muted }}>
                Previewing: <strong style={{ color: activeColors.fg }}>{activeTheme.name}</strong> in{" "}
                <strong style={{ color: activeColors.accent }}>{isDarkMode ? "Dark Mode" : "Light Mode"}</strong> with font{" "}
                <strong style={{ color: activeColors.fg }}>{activeFont.name}</strong>
              </p>
            </div>
          </div>

          {/* Color Swatch Inspection Matrix */}
          <div
            className="p-6 rounded-xl border space-y-4"
            style={{ backgroundColor: activeColors.card, borderColor: activeColors.line }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono" style={{ color: activeColors.muted }}>
              Active Palette Swatches (Click to Copy Hex)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {[
                { name: "Canvas", hex: activeColors.canvas },
                { name: "Card Surface", hex: activeColors.card },
                { name: "Border Line", hex: activeColors.line },
                { name: "Primary Accent", hex: activeColors.accent },
                { name: "Secondary", hex: activeColors.secondary },
                { name: "Text / Foreground", hex: activeColors.fg },
              ].map((swatch) => (
                <button
                  key={swatch.name}
                  onClick={() => handleCopyHex(swatch.hex)}
                  className="p-3 rounded-lg border text-left transition-all hover:scale-105 active:scale-95 group"
                  style={{ borderColor: activeColors.line, backgroundColor: activeColors.canvas }}
                >
                  <div
                    className="w-full h-10 rounded mb-2 border shadow-inner"
                    style={{ backgroundColor: swatch.hex, borderColor: activeColors.line }}
                  />
                  <div className="text-xs font-semibold truncate">{swatch.name}</div>
                  <div className="text-xs font-mono flex items-center justify-between" style={{ color: activeColors.muted }}>
                    <span>{swatch.hex}</span>
                    {copiedHex === swatch.hex ? (
                      <Check className="size-3 text-emerald-400" />
                    ) : (
                      <Copy className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Component Row: Buttons, Badges, Inputs, and Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Interactive Buttons */}
            <div
              className="p-6 rounded-xl border space-y-4 flex flex-col justify-between"
              style={{ backgroundColor: activeColors.card, borderColor: activeColors.line }}
            >
              <div>
                <h3 className="text-base font-bold mb-1" style={{ fontFamily: activeFont.headingFamily }}>
                  Buttons & Actions
                </h3>
                <p className="text-xs mb-4" style={{ color: activeColors.muted }}>
                  Primary, secondary, and ghost button states
                </p>
                <div className="space-y-3">
                  <button
                    className="w-full py-3 px-5 rounded-lg font-bold text-sm transition-all hover:opacity-90 active:scale-95 shadow-lg"
                    style={{
                      backgroundColor: activeColors.accent,
                      color: activeColors.onAccent,
                      boxShadow: `0 0 20px ${activeColors.accentGlow}`,
                    }}
                  >
                    Primary Action Button →
                  </button>

                  <button
                    className="w-full py-3 px-5 rounded-lg font-semibold text-sm border transition-all hover:opacity-80 active:scale-95"
                    style={{
                      borderColor: activeColors.line,
                      backgroundColor: activeColors.canvas,
                      color: activeColors.fg,
                    }}
                  >
                    Secondary Action Button
                  </button>

                  <button
                    className="w-full py-2.5 px-4 rounded-lg font-medium text-xs border border-dashed transition-all hover:opacity-80"
                    style={{
                      borderColor: activeColors.accent,
                      color: activeColors.accent,
                      backgroundColor: "transparent",
                    }}
                  >
                    Ghost / Outline Accent
                  </button>
                </div>
              </div>

              {/* Status Badges */}
              <div className="pt-4 border-t space-y-2" style={{ borderColor: activeColors.line }}>
                <div className="text-xs font-mono uppercase" style={{ color: activeColors.muted }}>
                  Telemetry Badges
                </div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${activeColors.accent}20`,
                      color: activeColors.accent,
                      border: `1px solid ${activeColors.accent}40`,
                    }}
                  >
                    <span className="size-2 rounded-full animate-pulse" style={{ backgroundColor: activeColors.accent }} />
                    AVAILABLE FOR CONTRACTS
                  </span>
                  <span
                    className="px-2.5 py-1 rounded text-xs font-mono font-semibold"
                    style={{
                      backgroundColor: `${activeColors.secondary}20`,
                      color: activeColors.secondary,
                      border: `1px solid ${activeColors.secondary}40`,
                    }}
                  >
                    NEXT.JS 16
                  </span>
                </div>
              </div>
            </div>

            {/* Input & Form Elements */}
            <div
              className="p-6 rounded-xl border space-y-4 flex flex-col justify-between"
              style={{ backgroundColor: activeColors.card, borderColor: activeColors.line }}
            >
              <div>
                <h3 className="text-base font-bold mb-1" style={{ fontFamily: activeFont.headingFamily }}>
                  Form Controls & Terminal Input
                </h3>
                <p className="text-xs mb-4" style={{ color: activeColors.muted }}>
                  Command line, inputs, and feedback indicators
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono uppercase mb-1.5" style={{ color: activeColors.muted }}>
                      Your Email / Dispatch Route
                    </label>
                    <input
                      type="text"
                      defaultValue="client@innovative-startup.com"
                      className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-all"
                      style={{
                        backgroundColor: activeColors.canvas,
                        borderColor: activeColors.line,
                        color: activeColors.fg,
                      }}
                    />
                  </div>

                  {/* Terminal CLI box */}
                  <div
                    className="p-3.5 rounded-lg border font-mono text-xs space-y-1.5"
                    style={{ backgroundColor: activeColors.canvas, borderColor: activeColors.line }}
                  >
                    <div className="flex items-center justify-between text-[10px]" style={{ color: activeColors.muted }}>
                      <span>TERMINAL // BASH</span>
                      <span style={{ color: activeColors.accent }}>● RUNNING</span>
                    </div>
                    <div className="text-xs" style={{ color: activeColors.accent }}>
                      $ rony.adapt --stack=fullstack-ai
                    </div>
                    <div className="text-xs" style={{ color: activeColors.muted }}>
                      [✓] Autonomous workflow initiated in 12ms.
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t" style={{ borderColor: activeColors.line }}>
                <div className="text-xs" style={{ color: activeColors.muted }}>
                  Font applied: <strong style={{ color: activeColors.fg }}>{activeFont.bodyFamily}</strong>
                </div>
              </div>
            </div>

            {/* Sample Feature Card */}
            <div
              className="p-6 rounded-xl border space-y-4 flex flex-col justify-between md:col-span-2 lg:col-span-1 shadow-md"
              style={{ backgroundColor: activeColors.card, borderColor: activeColors.line }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${activeColors.accent}20`, color: activeColors.accent }}
                  >
                    FEATURED SPEC
                  </span>
                  <Cpu className="size-4" style={{ color: activeColors.accent }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: activeFont.headingFamily }}>
                  Autonomous Agent Workflow System
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: activeColors.muted }}>
                  Enterprise-grade multi-agent pipeline replacing 40 hours of manual operational triage with intelligent deterministic code.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["Next.js 16", "TypeScript", "LangChain", "PostgreSQL"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded border"
                      style={{ borderColor: activeColors.line, color: activeColors.muted }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: activeColors.line }}>
                <span className="text-xs font-mono" style={{ color: activeColors.muted }}>
                  METRIC: 99.98% UPTIME
                </span>
                <span className="text-xs font-bold transition-transform group-hover:translate-x-1" style={{ color: activeColors.accent }}>
                  Case Study →
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* TYPOGRAPHY SPECIMEN COMPARISON */}
        <section
          className="p-8 rounded-xl border space-y-6"
          style={{ backgroundColor: activeColors.card, borderColor: activeColors.line }}
        >
          <div className="border-b pb-4" style={{ borderColor: activeColors.line }}>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: activeFont.headingFamily }}>
              Typography Hierarchy Specimen
            </h2>
            <p className="text-sm" style={{ color: activeColors.muted }}>
              Displaying headings in <strong style={{ color: activeColors.accent }}>{activeFont.headingFamily}</strong> and body prose in <strong style={{ color: activeColors.accent }}>{activeFont.bodyFamily}</strong>
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider block mb-1" style={{ color: activeColors.muted }}>
                Display Hero (72px / Bold)
              </span>
              <div
                className="text-4xl sm:text-6xl font-black tracking-tight"
                style={{ fontFamily: activeFont.headingFamily }}
              >
                I Build Web Apps &{" "}
                <span style={{ color: activeColors.accent }}>AI Automations</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider block mb-1" style={{ color: activeColors.muted }}>
                Heading 1 (36px / Semibold)
              </span>
              <div
                className="text-2xl sm:text-3xl font-bold tracking-tight"
                style={{ fontFamily: activeFont.headingFamily }}
              >
                The Developer Dossier: Chronicles of an Engineer
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider block mb-1" style={{ color: activeColors.muted }}>
                Body Lead (18px / Regular)
              </span>
              <p className="text-lg max-w-3xl leading-relaxed" style={{ color: activeColors.muted }}>
                Behind the terminal, an engineer dedicated to turning high-friction workflows into seamless autonomous operations. Bridging production Next.js & Node.js architecture with modern AI agent pipelines.
              </p>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider block mb-1" style={{ color: activeColors.muted }}>
                Monospace Telemetry (13px / Medium)
              </span>
              <div className="font-mono text-xs space-x-6" style={{ color: activeColors.accent }}>
                <span>// LAT: 22.4633° N, 91.9712° E</span>
                <span>CUET BASE</span>
                <span>STATUS: NOMINAL</span>
                <span>ADAPTATION: 100%</span>
              </div>
            </div>
          </div>
        </section>

        {/* DECISION SUMMARY & NEXT STEP */}
        <div
          className="p-6 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            backgroundColor: `${activeColors.accent}12`,
            borderColor: activeColors.accent,
          }}
        >
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-sm font-bold flex items-center justify-center sm:justify-start gap-2">
              <Check className="size-4" style={{ color: activeColors.accent }} /> Your Current Live Selection:
            </div>
            <div className="text-xs font-mono" style={{ color: activeColors.fg }}>
              Theme: <strong>{activeTheme.name}</strong> • Mode: <strong>{isDarkMode ? "Dark" : "Light"}</strong> • Fonts: <strong>{activeFont.name}</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const choice = `Theme: ${activeTheme.name} (${isDarkMode ? "Dark" : "Light"}), Fonts: ${activeFont.name}`;
                navigator.clipboard.writeText(choice);
                alert(`Selection copied to clipboard:\n\n${choice}`);
              }}
              className="px-5 py-2.5 rounded-lg text-xs font-bold transition-all hover:opacity-90 active:scale-95 shadow"
              style={{ backgroundColor: activeColors.accent, color: activeColors.onAccent }}
            >
              Copy My Decision
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
