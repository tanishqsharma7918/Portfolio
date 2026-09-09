/**
 * The theme ring: two dark grounds and two light ones.
 *
 * These are *tones*, not accent swaps — each stop moves the background,
 * surface, text and galaxy colours together, so Obsidian and Umber are
 * genuinely different darks rather than the same dark wearing a different
 * button colour. Each pair is split warm against cool, which is the axis
 * the eye reads fastest.
 */
export type AccentId = "obsidian" | "umber" | "paper" | "porcelain"
export type Mode = "dark" | "light"

export type ThemeStop = {
    accent: AccentId
    mode: Mode
    label: string
    /** Dot colour for the button; fixed, since it sits on glass in both modes. */
    swatch: string
}

export const themeRing: ThemeStop[] = [
    { accent: "obsidian", mode: "dark", label: "Obsidian", swatch: "#a78bfa" },
    { accent: "umber", mode: "dark", label: "Umber", swatch: "#f0a868" },
    { accent: "paper", mode: "light", label: "Paper", swatch: "#6d28d9" },
    { accent: "porcelain", mode: "light", label: "Porcelain", swatch: "#1d6ea8" },
]

export const DEFAULT_ACCENT: AccentId = "obsidian"
export const ACCENT_KEY = "accent-theme"
export const RING_KEY = "theme-stop"
