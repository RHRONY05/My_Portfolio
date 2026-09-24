"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  APPROVED_THEMES,
  APPROVED_FONTS,
  ThemeItem,
  FontItem,
  applyThemeToDocument,
  applyFontToDocument,
} from "@/data/themeConfig";
import { Palette, Type, Check, ChevronDown, Sparkles, Sliders, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeFontCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"theme" | "font">("theme");
  const [currentThemeId, setCurrentThemeId] = useState<string>("monolithic-onyx");
  const [currentFontId, setCurrentFontId] = useState<string>("original-surfer");
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state with localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("rony_theme_id");
      if (savedTheme && APPROVED_THEMES.some((t) => t.id === savedTheme)) {
        setCurrentThemeId(savedTheme);
      }
      const savedFont = localStorage.getItem("rony_font_id");
      if (savedFont && APPROVED_FONTS.some((f) => f.id === savedFont)) {
        setCurrentFontId(savedFont);
      }
    } catch {
      // ignore
    }
  }, []);

  // Close dropdown on outside click or ESC key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectTheme = (theme: ThemeItem) => {
    setCurrentThemeId(theme.id);
    applyThemeToDocument(theme);
    try {
      localStorage.setItem("rony_theme_id", theme.id);
      localStorage.setItem("rony_theme_active", JSON.stringify(theme.colors));
      window.dispatchEvent(
        new CustomEvent("rony_theme_change", { detail: { themeId: theme.id } })
      );
    } catch {
      // ignore
    }
  };

  const handleSelectFont = (font: FontItem) => {
    setCurrentFontId(font.id);
    applyFontToDocument(font);
    try {
      localStorage.setItem("rony_font_id", font.id);
      window.dispatchEvent(
        new CustomEvent("rony_theme_change", { detail: { fontId: font.id } })
      );
    } catch {
      // ignore
    }
  };

  const activeTheme =
    APPROVED_THEMES.find((t) => t.id === currentThemeId) ?? APPROVED_THEMES[0];
  const activeFont =
    APPROVED_FONTS.find((f) => f.id === currentFontId) ?? APPROVED_FONTS[0];

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex items-center gap-2 rounded-lg border border-line/60 bg-card/80 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-mono font-medium text-fg shadow-sm backdrop-blur-md transition-all duration-200 hover:border-accent hover:bg-card hover:text-accent focus:outline-none focus:ring-1 focus:ring-accent"
        aria-expanded={isOpen}
        aria-label="Customize Theme and Font"
        title="Customize Theme & Font"
      >
        {/* Accent Color Dot with glow */}
        <span className="relative flex h-2.5 w-2.5 items-center justify-center">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
            style={{ backgroundColor: activeTheme.colors.accent }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full shadow-[0_0_8px_currentColor]"
            style={{ backgroundColor: activeTheme.colors.accent }}
          />
        </span>

        {/* Icon & Label */}
        <Sliders className="size-3.5 text-accent transition-transform group-hover:rotate-45 duration-300" />
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-fg/90 group-hover:text-accent">
          Theme
        </span>

        <ChevronDown
          className={`size-3 text-muted transition-transform duration-200 group-hover:text-accent ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Mobile Scrim / Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="sm:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Dropdown Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="fixed inset-x-3 top-[62px] mx-auto w-[calc(100vw-24px)] max-w-[340px] sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 sm:w-[340px] sm:max-w-none origin-top rounded-xl border border-line/80 bg-card/95 p-3 shadow-2xl backdrop-blur-2xl ring-1 ring-black/40 z-50 overflow-hidden"
            style={{
              boxShadow:
                "0 20px 35px -5px rgba(0, 0, 0, 0.7), 0 0 20px -3px rgba(var(--color-accent-rgb, 229, 229, 229), 0.15)",
            }}
          >
            {/* Header Tabs: [Palette Themes] vs [Typography Fonts] */}
            <div className="flex items-center justify-between border-b border-line/60 pb-2.5 mb-2.5">
              <div className="flex items-center gap-1 bg-canvas/70 p-1 rounded-lg border border-line/40">
                <button
                  type="button"
                  onClick={() => setActiveTab("theme")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all ${
                    activeTab === "theme"
                      ? "bg-accent text-on-accent shadow-sm"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  <Palette className="size-3" />
                  <span>Colors (4)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("font")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all ${
                    activeTab === "font"
                      ? "bg-accent text-on-accent shadow-sm"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  <Type className="size-3" />
                  <span>Fonts (4)</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-[10px] font-mono text-muted/70 tracking-tight">
                  Live Switch
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="sm:hidden flex size-6 items-center justify-center rounded-md border border-line/60 bg-canvas/80 text-muted hover:text-accent cursor-pointer"
                  aria-label="Close theme customizer"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>

            {/* TAB 1: 4 Approved Themes */}
            {activeTab === "theme" && (
              <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-0.5 custom-scrollbar">
                {APPROVED_THEMES.map((theme) => {
                  const isSelected = theme.id === currentThemeId;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => handleSelectTheme(theme)}
                      className={`w-full text-left rounded-lg p-2.5 transition-all flex items-center justify-between border ${
                        isSelected
                          ? "bg-canvas border-accent shadow-[0_0_12px_rgba(var(--color-accent-rgb,229,229,229),0.12)]"
                          : "border-transparent bg-canvas/40 hover:bg-canvas/80 hover:border-line/70"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* 3-Color Swatch Preview */}
                        <div className="flex -space-x-1.5 shrink-0 items-center">
                          <span
                            className="inline-block h-5 w-5 rounded-full border border-black/40 shadow-sm"
                            style={{ backgroundColor: theme.colors.canvas }}
                            title="Canvas base"
                          />
                          <span
                            className="inline-block h-5 w-5 rounded-full border border-black/40 shadow-sm"
                            style={{ backgroundColor: theme.colors.card }}
                            title="Card surface"
                          />
                          <span
                            className="inline-block h-5 w-5 rounded-full border border-black/40 shadow-sm"
                            style={{
                              backgroundColor: theme.colors.accent,
                              boxShadow: `0 0 8px ${theme.colors.accentGlow}`,
                            }}
                            title="Primary accent"
                          />
                        </div>

                        {/* Theme Info */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-fg tracking-tight truncate">
                              {theme.name}
                            </span>
                            {theme.id === "monolithic-onyx" && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-accent/20 text-accent border border-accent/30 uppercase">
                                Def
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-muted line-clamp-1 font-mono">
                            {theme.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Selected Indicator */}
                      {isSelected ? (
                        <div
                          className="h-5 w-5 rounded-full flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: theme.colors.accent,
                            color: theme.colors.onAccent,
                          }}
                        >
                          <Check className="size-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-line/60 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* TAB 2: 4 Approved Fonts */}
            {activeTab === "font" && (
              <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-0.5 custom-scrollbar">
                {APPROVED_FONTS.map((font) => {
                  const isSelected = font.id === currentFontId;
                  return (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => handleSelectFont(font)}
                      className={`w-full text-left rounded-lg p-2.5 transition-all flex items-center justify-between border ${
                        isSelected
                          ? "bg-canvas border-accent shadow-[0_0_12px_rgba(var(--color-accent-rgb,229,229,229),0.12)]"
                          : "border-transparent bg-canvas/40 hover:bg-canvas/80 hover:border-line/70"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5">
                          {/* Font rendered in its actual font-family! */}
                          <span
                            className="text-sm font-medium text-fg tracking-normal"
                            style={{ fontFamily: font.family }}
                          >
                            {font.name}
                          </span>
                          {font.id === "original-surfer" && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-accent/20 text-accent border border-accent/30 uppercase">
                              Def
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-mono text-accent">
                            {font.label}
                          </span>
                          <span className="text-[10px] text-muted line-clamp-1 font-mono">
                            • {font.category}
                          </span>
                        </div>
                      </div>

                      {/* Selected Indicator */}
                      {isSelected ? (
                        <div className="h-5 w-5 rounded-full bg-accent text-on-accent flex items-center justify-center shrink-0">
                          <Check className="size-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-line/60 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Micro Footer with Active Readout */}
            <div className="mt-2.5 pt-2 border-t border-line/40 flex items-center justify-between text-[10px] font-mono text-muted">
              <span className="truncate">
                Active: <strong className="text-accent">{activeTheme.num}</strong> /{" "}
                <strong className="text-fg">{activeFont.name}</strong>
              </span>
              <a
                href="/theme-showcase"
                className="text-accent hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Lab</span>
                <Sparkles className="size-2.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
