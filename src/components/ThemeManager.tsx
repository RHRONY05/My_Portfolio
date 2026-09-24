"use client";

import { useEffect } from "react";
import {
  APPROVED_THEMES,
  APPROVED_FONTS,
  applyThemeToDocument,
  applyFontToDocument,
} from "@/data/themeConfig";

export function ThemeManager() {
  useEffect(() => {
    try {
      // 1. Resolve Theme
      const savedThemeId = localStorage.getItem("rony_theme_id");
      let activeTheme = APPROVED_THEMES.find((t) => t.id === savedThemeId);

      // Legacy fallback check
      if (!activeTheme) {
        const legacyActive = localStorage.getItem("rony_theme_active");
        if (legacyActive) {
          try {
            const parsed = JSON.parse(legacyActive);
            activeTheme = APPROVED_THEMES.find(
              (t) => t.colors.accent.toLowerCase() === parsed.accent?.toLowerCase()
            );
          } catch {
            // ignore
          }
        }
      }

      // Default to Monolithic Onyx (Item 0)
      if (!activeTheme) {
        activeTheme = APPROVED_THEMES[0];
      }
      applyThemeToDocument(activeTheme);
      localStorage.setItem("rony_theme_id", activeTheme.id);

      // 2. Resolve Font
      const savedFontId = localStorage.getItem("rony_font_id");
      let activeFont = APPROVED_FONTS.find((f) => f.id === savedFontId);

      // Default to Original Surfer (Item 0)
      if (!activeFont) {
        activeFont = APPROVED_FONTS[0];
      }
      applyFontToDocument(activeFont);
      localStorage.setItem("rony_font_id", activeFont.id);

      // 3. Listen for dynamic theme/font custom events
      const handleThemeChange = (e: CustomEvent<{ themeId?: string; fontId?: string }>) => {
        if (e.detail?.themeId) {
          const t = APPROVED_THEMES.find((item) => item.id === e.detail.themeId);
          if (t) applyThemeToDocument(t);
        }
        if (e.detail?.fontId) {
          const f = APPROVED_FONTS.find((item) => item.id === e.detail.fontId);
          if (f) applyFontToDocument(f);
        }
      };

      window.addEventListener("rony_theme_change" as any, handleThemeChange);
      return () => {
        window.removeEventListener("rony_theme_change" as any, handleThemeChange);
      };
    } catch {
      // Ignore in private mode / SSR
    }
  }, []);

  return null;
}
