/**
 * The theme ring. Mode and accent are cycled together as a single ordered
 * list rather than exposed as two controls, so one button walks the whole
 * space. Dark variants come first — the site is dark-first — and each
 * accent is visited in both modes before the ring closes.
 */
export type AccentId = "violet" | "ember" | "jade" | "azure" | "rose"
export type Mode = "dark" | "light"

export type ThemeStop = {
    accent: AccentId
    mode: Mode
    label: string
    /** Dot colour for the button; fixed, since it sits on glass in both modes. */
    swatch: string
}

export const themeRing: ThemeStop[] = [
    { accent: "violet", mode: "dark", label: "Violet night", swatch: "#a78bfa" },
    { accent: "jade", mode: "dark", label: "Jade night", swatch: "#34d3a6" },
    { accent: "azure", mode: "dark", label: "Azure night", swatch: "#5aa9f8" },
    { accent: "ember", mode: "dark", label: "Ember night", swatch: "#f59e42" },
    { accent: "rose", mode: "dark", label: "Rose night", swatch: "#f2789f" },
    { accent: "violet", mode: "light", label: "Violet paper", swatch: "#6d28d9" },
    { accent: "jade", mode: "light", label: "Jade paper", swatch: "#0f7660" },
    { accent: "azure", mode: "light", label: "Azure paper", swatch: "#1d4ebe" },
    { accent: "ember", mode: "light", label: "Ember paper", swatch: "#b45315" },
    { accent: "rose", mode: "light", label: "Rose paper", swatch: "#b02860" },
]

export const DEFAULT_ACCENT: AccentId = "violet"
export const ACCENT_KEY = "accent-theme"
export const RING_KEY = "theme-stop"
