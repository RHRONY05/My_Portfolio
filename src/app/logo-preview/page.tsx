"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Sparkles, Terminal, Shield } from "lucide-react";

interface LogoItem {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  file: string;
  icon: React.ReactNode;
  conceptDescription: string;
  features: string[];
}

const logos: LogoItem[] = [
  {
    id: 1,
    title: "Style A: Precision Tech 'R'",
    subtitle: "Clean Monolithic Typographic Glyph",
    badge: "Option A (Recommended)",
    file: "/images/logo/logo_r_option_a_tech.svg",
    icon: <Shield className="w-5 h-5 text-accent" />,
    conceptDescription:
      "A solid, monolithic vector glyph with true typographic anatomy. Clean horizontal terminals, a flush joint where the bowl meets the stem, and a bold kick leg cut flat at the base. Looks like a premier tech company mark (Linear, Vercel, Stripe).",
    features: [
      "Zero overlapping strokes or pill seams",
      "Mathematically balanced inner bowl counter",
      "Crisp, ultra-sharp readability down to 16px",
    ],
  },
  {
    id: 2,
    title: "Style B: Dynamic Cyber 'R'",
    subtitle: "Aerodynamic Chamfer & Kinetic Kick",
    badge: "Option B (Cyberpunk)",
    file: "/images/logo/logo_r_option_b_cyber.svg",
    icon: <Terminal className="w-5 h-5 text-accent" />,
    conceptDescription:
      "High-energy anime / esports aesthetic. Features a 45-degree chamfered top-left shoulder, an angled dynamic leg, and an aerodynamic inner counter. Feels fast, aggressive, and futuristic.",
    features: [
      "45° chamfered shoulder cut",
      "Dynamic forward-thrusting diagonal leg",
      "Pairs naturally with the Mahoraga adaptation lore",
    ],
  },
  {
    id: 3,
    title: "Style C: Sculpted Luxury 'R'",
    subtitle: "Continuous Curvature & Elegant Flare",
    badge: "Option C (Bespoke)",
    file: "/images/logo/logo_r_option_c_luxury.svg",
    icon: <Sparkles className="w-5 h-5 text-accent" />,
    conceptDescription:
      "Sophisticated bespoke brandmark. The kick leg sweeps outward with a graceful organic curve before settling flat. Combines high-fashion elegance with technical precision.",
    features: [
      "Organic sweeping curvature on the kick leg",
      "Refined balance between soft curves and sharp corners",
      "Distinctive, memorable signature silhouette",
    ],
  },
];

export default function LogoPreviewPage() {
  const [selectedLogo, setSelectedLogo] = useState<number>(1);

  const activeLogo = logos.find((l) => l.id === selectedLogo) || logos[0];

  return (
    <main className="min-h-screen bg-canvas text-fg px-4 py-12 md:py-16 selection:bg-accent selection:text-canvas">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line/40 pb-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-3"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-fg flex items-center gap-3">
              Brand Identity Lab <span className="text-accent">Rh.rony</span>
            </h1>
            <p className="text-muted text-sm md:text-base mt-1">
              Side-by-side comparison of Concept 1, Concept 3, and Concept 5 as Favicons and Navbar Logos.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border border-line/50 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            Theme: Obsidian & Royal Sunburst Amber
          </div>
        </div>

        {/* Live Navbar Simulation */}
        <section className="bg-card/70 border border-line rounded-xl p-6 md:p-8 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-muted">
              Live Mockup: Top Navbar Header Simulation (28px)
            </span>
            <span className="text-xs text-accent font-mono">Currently Previewing: Concept {activeLogo.id}</span>
          </div>

          <div className="bg-card/90 border border-line/60 rounded-lg p-4 flex items-center justify-between backdrop-blur-md shadow-inner">
            {/* The Brand Mark in Navbar */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-8 h-8 relative transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(229,184,105,0.35)]">
                <Image
                  src={activeLogo.file}
                  alt={activeLogo.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-mono text-xl font-black tracking-tight text-accent transition-colors group-hover:text-secondary">
                RH.RONY
              </span>
            </div>

            {/* Mock Navigation links */}
            <div className="hidden sm:flex items-center gap-6 text-sm font-semibold text-fg/80">
              <span className="hover:text-accent transition-colors">About</span>
              <span className="hover:text-accent transition-colors">Skills</span>
              <span className="hover:text-accent transition-colors">Projects</span>
              <span className="hover:text-accent transition-colors">Contact</span>
            </div>
          </div>
        </section>

        {/* 3 Cards: Concept 1, 3, 5 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {logos.map((logo) => {
            const isSelected = selectedLogo === logo.id;

            return (
              <div
                key={logo.id}
                onClick={() => setSelectedLogo(logo.id)}
                className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between relative group ${
                  isSelected
                    ? "bg-card border-accent shadow-[0_0_24px_rgba(229,184,105,0.18)]"
                    : "bg-card/40 border-line/60 hover:border-line hover:bg-card/70"
                }`}
              >
                {/* Active Indicator Badge */}
                {isSelected && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-accent/15 text-accent text-xs font-mono font-bold px-2.5 py-1 rounded-full border border-accent/30">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                  </div>
                )}

                <div className="space-y-6">
                  {/* Badge & Title */}
                  <div>
                    <span className="text-xs font-mono tracking-widest uppercase text-accent font-bold">
                      {logo.badge}
                    </span>
                    <h3 className="text-xl font-bold mt-1 text-fg flex items-center gap-2">
                      {logo.title}
                    </h3>
                    <p className="text-xs text-muted font-mono mt-0.5">{logo.subtitle}</p>
                  </div>

                  {/* Large Logo Render Canvas (160x160) */}
                  <div className="h-44 w-full bg-canvas rounded-xl border border-line/40 flex items-center justify-center relative overflow-hidden group-hover:border-accent/40 transition-colors">
                    <div className="absolute inset-0 bg-[radial-gradient(var(--color-line)_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />
                    <div className="w-28 h-28 relative transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_0_16px_rgba(229,184,105,0.25)]">
                      <Image
                        src={logo.file}
                        alt={logo.title}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  {/* Concept Story */}
                  <p className="text-xs md:text-sm text-fg/80 leading-relaxed">
                    {logo.conceptDescription}
                  </p>

                  {/* Key Features */}
                  <ul className="space-y-1.5 border-t border-line/40 pt-4">
                    {logo.features.map((feat, idx) => (
                      <li key={idx} className="text-xs text-muted flex items-start gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select Button */}
                <button
                  type="button"
                  className={`mt-6 w-full py-2.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    isSelected
                      ? "bg-accent text-on-accent shadow-md shadow-accent/20"
                      : "bg-canvas text-fg/80 border border-line hover:border-accent/50"
                  }`}
                >
                  {isSelected ? "Active in Preview" : "Preview This Concept"}
                </button>
              </div>
            );
          })}
        </section>

        {/* Favicon & Multi-Scale Stress Test */}
        <section className="bg-card/60 border border-line rounded-xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line/40 pb-4">
            <div>
              <h2 className="text-xl font-bold text-fg">Multi-Scale "16px Squint Test"</h2>
              <p className="text-xs text-muted">
                How each logo holds its clarity across actual browser tab and device icon resolutions.
              </p>
            </div>
            <div className="text-xs font-mono text-accent">Simulating: Concept {activeLogo.id}</div>
          </div>

          {/* Browser Tab Simulation */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-muted">Browser Tab Mockup (Actual 16x16px)</span>
            <div className="bg-card border border-line rounded-t-lg p-2 max-w-sm flex items-center gap-2 shadow-md">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-canvas rounded-md border border-line/50 max-w-xs text-xs font-sans text-fg/90 flex-1 truncate">
                <div className="w-4 h-4 min-w-[16px] relative">
                  <Image src={activeLogo.file} alt="Favicon 16px" fill className="object-contain" />
                </div>
                <span className="truncate text-xs font-mono">Rh.rony — Full-Stack & AI Engineer</span>
                <span className="ml-auto text-muted text-[10px] pl-2 cursor-pointer hover:text-fg">×</span>
              </div>
            </div>
          </div>

          {/* Grid of Sizes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {[
              { size: 16, label: "16×16px (Browser Tab Favicon)" },
              { size: 32, label: "32×32px (Retina Favicon)" },
              { size: 48, label: "48×48px (Taskbar / PWA Icon)" },
              { size: 64, label: "64×64px (Apple Touch / App Icon)" },
            ].map((scale) => (
              <div
                key={scale.size}
                className="bg-canvas border border-line/50 rounded-lg p-4 flex flex-col items-center justify-center gap-3 text-center"
              >
                <div
                  style={{ width: `${scale.size}px`, height: `${scale.size}px` }}
                  className="relative flex items-center justify-center transition-transform hover:scale-125"
                >
                  <Image
                    src={activeLogo.file}
                    alt={`${scale.size}px preview`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-mono font-bold text-accent">{scale.size}×{scale.size}</div>
                  <div className="text-[11px] text-muted leading-tight">{scale.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
