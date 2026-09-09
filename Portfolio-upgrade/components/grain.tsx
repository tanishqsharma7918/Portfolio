"use client"

/**
 * A static film grain layer. Inline SVG turbulence means no network request
 * and no image asset, and the fixed position keeps it from scrolling.
 */
export function Grain() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[60] opacity-[0.045] mix-blend-overlay dark:opacity-[0.07]"
            style={{
                backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
        />
    )
}
