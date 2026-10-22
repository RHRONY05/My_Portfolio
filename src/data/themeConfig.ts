// Central Design System Configuration: Strictly 4 Curated Themes & 4 Curated Fonts

export interface ThemeColors {
  canvas: string;
  card: string;
  line: string;
  fg: string;
  muted: string;
  accent: string;
  onAccent: string;
  secondary: string;
  accentGlow: string;
}

export interface ThemeItem {
  id: string;
  name: string;
  tagline: string;
  num: string;
  mode?: "dark" | "light";
  colors: ThemeColors;
}

export interface FontItem {
  id: string;
  name: string;
  label: string;
  family: string;
  category: string;
  description: string;
}

// 1. Curated Themes (4 Dark + 4 Light)
export const APPROVED_THEMES: ThemeItem[] = [
  // --- Dark Themes (01 - 04) ---
  {
    id: "monolithic-onyx",
    name: "Monolithic Onyx & Graphite",
    tagline: "Total dark stealth. Absolute black canvas with precision carbon surfaces and titanium white accents.",
    num: "01",
    mode: "dark",
    colors: {
      canvas: "#000000",
      card: "#111111",
      line: "#343434",
      fg: "#F5F5F5",
      muted: "#7A7A7A",
      accent: "#E5E5E5",
      onAccent: "#000000",
      secondary: "#A3A3A3",
      accentGlow: "rgba(229, 229, 229, 0.35)",
    },
  },
  {
    id: "celadon-forest",
    name: "Celadon & Hunter Forest",
    tagline: "Carbon black forest base with hunter-green frames, soothing muted teal, and celadon mint glow.",
    num: "02",
    mode: "dark",
    colors: {
      canvas: "#111D13",
      card: "#192B1C",
      line: "#415D43",
      fg: "#F0FDF4",
      muted: "#709775",
      accent: "#A1CCA5",
      onAccent: "#111D13",
      secondary: "#8FB996",
      accentGlow: "rgba(161, 204, 165, 0.35)",
    },
  },
  {
    id: "midnight-amethyst",
    name: "Midnight Amethyst & Deep Violet",
    tagline: "Deep obsidian violet abyss with neon royal amethyst lines and glowing neon lavender telemetry.",
    num: "03",
    mode: "dark",
    colors: {
      canvas: "#11001C",
      card: "#1E0030",
      line: "#3A015C",
      fg: "#FCE7FE",
      muted: "#9D4EDD",
      accent: "#C084FC",
      onAccent: "#11001C",
      secondary: "#E879F9",
      accentGlow: "rgba(192, 132, 252, 0.35)",
    },
  },
  {
    id: "prussian-blue",
    name: "Prussian Blue & Space Indigo",
    tagline: "Deep cosmos navy with space indigo surfaces, dusk-blue lines, and luminous aqua-cyan glow.",
    num: "04",
    mode: "dark",
    colors: {
      canvas: "#0B132B",
      card: "#131C38",
      line: "#1C2541",
      fg: "#F0F4F8",
      muted: "#8DA0B8",
      accent: "#5BC0BE",
      onAccent: "#0B132B",
      secondary: "#6FFFE9",
      accentGlow: "rgba(91, 192, 190, 0.4)",
    },
  },

  // --- Light Themes (05 - 08) ---
  {
    id: "nordic-frost",
    name: "Nordic Frost & Oceanic Teal",
    tagline: "Crisp porcelain mist canvas with deep obsidian navy typography, rich arctic teal actions, and aqua-cyan glow.",
    num: "05",
    mode: "light",
    colors: {
      canvas: "#F5F7FA",
      card: "#FFFFFF",
      line: "#D9E2EC",
      fg: "#0B132B",
      muted: "#486581",
      accent: "#1F8A87",
      onAccent: "#FFFFFF",
      secondary: "#5BC0BE",
      accentGlow: "rgba(31, 138, 135, 0.28)",
    },
  },
  {
    id: "ivory-sumi",
    name: "Ivory Parchment & Sumi Ink",
    tagline: "Warm archival parchment canvas with jet Sumi ink typography, raw linen dividers, and radiant Kyoto cinnabar accents.",
    num: "06",
    mode: "light",
    colors: {
      canvas: "#F9F6F0",
      card: "#FFFFFF",
      line: "#E7E0D6",
      fg: "#1C1917",
      muted: "#78716C",
      accent: "#C2410C",
      onAccent: "#FFFFFF",
      secondary: "#EA580C",
      accentGlow: "rgba(194, 65, 12, 0.28)",
    },
  },
  {
    id: "studio-cobalt",
    name: "Studio Silver & Electric Cobalt",
    tagline: "Ultra-crisp aerospace silver canvas with pitch carbon typography and laser-precise electric cobalt blue.",
    num: "07",
    mode: "light",
    colors: {
      canvas: "#F8FAFC",
      card: "#FFFFFF",
      line: "#E2E8F0",
      fg: "#0F172A",
      muted: "#64748B",
      accent: "#2563EB",
      onAccent: "#FFFFFF",
      secondary: "#38BDF8",
      accentGlow: "rgba(37, 99, 235, 0.28)",
    },
  },
  {
    id: "matcha-botanical",
    name: "Matcha Botanical & Deep Forest",
    tagline: "Serene morning sage mist canvas with deep evergreen typography, herbal stone frames, and matcha jade accents.",
    num: "08",
    mode: "light",
    colors: {
      canvas: "#F4F7F4",
      card: "#FFFFFF",
      line: "#DCE5DC",
      fg: "#132516",
      muted: "#546C56",
      accent: "#2E7D47",
      onAccent: "#FFFFFF",
      secondary: "#48A868",
      accentGlow: "rgba(46, 125, 71, 0.28)",
    },
  },
];

// 2. The 4 User-Approved Fonts (Original Surfer is default)
export const APPROVED_FONTS: FontItem[] = [
  {
    id: "original-surfer",
    name: "Original Surfer",
    label: "Retro Rebel",
    category: "Display / Comic Flair",
    family: "'Original Surfer', cursive, sans-serif",
    description: "Quirky, offbeat, graphic-novel attitude with lively street art personality.",
  },
  {
    id: "lusitana",
    name: "Lusitana",
    label: "Noble Heritage",
    category: "Classical Monumental Serif",
    family: "'Lusitana', serif",
    description: "Classical Portuguese monumental architecture. Dignified, balanced, and authoritative.",
  },
  {
    id: "ruwudu",
    name: "Ruwudu",
    label: "Calligraphic Drama",
    category: "Expressive Calligraphic Serif",
    family: "'Ruwudu', serif",
    description: "Dramatic stroke modulation and rich narrative punch. Unmistakable graphic novel energy.",
  },
  {
    id: "inter",
    name: "Inter",
    label: "Precision Standard",
    category: "High-Legibility Modern Sans",
    family: "'Inter', sans-serif",
    description: "Silicon Valley benchmark standard (Linear, Vercel). Ultra-clean, modern, and laser-precise.",
  },
];

// Helper: Convert HEX to RGB numbers string ("r, g, b")
export function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "");
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return `${r}, ${g}, ${b}`;
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }
  return "229, 229, 229";
}

// Helper: Check if a hex color is light based on perceived relative luminance
export function isLightColor(hex: string): boolean {
  const clean = hex.replace("#", "");
  let r = 0, g = 0, b = 0;
  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16);
    g = parseInt(clean[1] + clean[1], 16);
    b = parseInt(clean[2] + clean[2], 16);
  } else if (clean.length === 6) {
    r = parseInt(clean.substring(0, 2), 16);
    g = parseInt(clean.substring(2, 4), 16);
    b = parseInt(clean.substring(4, 6), 16);
  } else {
    return false;
  }
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

// Helper: Apply theme colors dynamically to document root and body
export function applyThemeToDocument(theme: ThemeItem) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const c = theme.colors;

  root.style.setProperty("--color-canvas", c.canvas);
  root.style.setProperty("--color-canvas-rgb", hexToRgb(c.canvas));
  root.style.setProperty("--color-card", c.card);
  root.style.setProperty("--color-card-rgb", hexToRgb(c.card));
  root.style.setProperty("--color-line", c.line);
  root.style.setProperty("--color-fg", c.fg);
  root.style.setProperty("--color-muted", c.muted);
  root.style.setProperty("--color-accent", c.accent);
  root.style.setProperty("--color-accent-rgb", hexToRgb(c.accent));
  root.style.setProperty("--color-on-accent", c.onAccent);
  root.style.setProperty("--color-secondary", c.secondary);
  root.style.setProperty("--color-secondary-rgb", hexToRgb(c.secondary));
  root.style.setProperty("--color-footer", c.canvas);

  const isLight = theme.mode === "light" || isLightColor(c.canvas);
  root.style.colorScheme = isLight ? "light" : "dark";
  root.setAttribute("data-theme-mode", isLight ? "light" : "dark");

  // Sync to body
  document.body.style.backgroundColor = c.canvas;
  document.body.style.color = c.fg;
}

// Helper: Apply font to document root (Option 1: entire website inherits)
export function applyFontToDocument(font: FontItem) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--font-primary", font.family);
  root.style.setProperty("--font-heading", font.family);
  root.style.setProperty("--font-sans", font.family);
  document.body.style.fontFamily = font.family;
}
