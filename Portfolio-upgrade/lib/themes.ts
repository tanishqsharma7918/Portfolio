/**
 * Accent palettes, orthogonal to light/dark. Each one re-tints the accent,
 * the metallic, and both nebula colours, so the whole page — including the
 * galaxy on the canvas — moves together rather than a button changing colour
 * while the background stays put.
 *
 * `swatch` values are only for the picker's dots, which sit on a glass
 * surface in both modes, so they are fixed rather than token-driven.
 */
export type AccentId = "violet" | "ember" | "jade" | "azure" | "rose"

export const accents: { id: AccentId; label: string; swatch: string }[] = [
    { id: "violet", label: "Violet", swatch: "#a78bfa" },
    { id: "ember", label: "Ember", swatch: "#f59e42" },
    { id: "jade", label: "Jade", swatch: "#34d3a6" },
    { id: "azure", label: "Azure", swatch: "#5aa9f8" },
    { id: "rose", label: "Rose", swatch: "#f2789f" },
]

export const DEFAULT_ACCENT: AccentId = "violet"
export const ACCENT_KEY = "accent-theme"
