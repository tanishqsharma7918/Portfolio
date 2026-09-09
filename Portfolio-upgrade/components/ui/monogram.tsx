"use client"

/**
 * The mark. A geometric stem with a flared crossbar — the flare is the same
 * gesture as the serif accent used through the site, so the logo belongs to
 * the same family as the type rather than sitting beside it.
 *
 * Colours come from the theme tokens, so the mark re-tints with the accent
 * the visitor has chosen.
 */
export function Monogram({ className = "h-9 w-9" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 40 40"
            className={className}
            role="img"
            aria-label="Tanishq Sharma"
            fill="none"
        >
            <defs>
                <linearGradient id="mono-stroke" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="rgb(var(--accent))" />
                    <stop offset="100%" stopColor="rgb(var(--gold))" />
                </linearGradient>
                <linearGradient id="mono-fill" gradientUnits="userSpaceOnUse" x1="8" y1="8" x2="32" y2="34">
                    <stop offset="0%" stopColor="rgb(var(--fg))" />
                    <stop offset="72%" stopColor="rgb(var(--fg))" />
                    <stop offset="100%" stopColor="rgb(var(--gold))" />
                </linearGradient>
            </defs>

            {/* Squircle, not a circle — reads as a mark rather than a bullet */}
            <path
                d="M20 1.5c11.6 0 18.5 6.9 18.5 18.5S31.6 38.5 20 38.5 1.5 31.6 1.5 20 8.4 1.5 20 1.5Z"
                stroke="url(#mono-stroke)"
                strokeOpacity="0.55"
                strokeWidth="1.25"
            />

            {/* Crossbar, with the ends flared downward like a serif */}
            <path
                d="M11 13.6h18"
                stroke="url(#mono-fill)"
                strokeWidth="2.6"
                strokeLinecap="round"
            />
            <path
                d="M11 13.6v2.9M29 13.6v2.9"
                stroke="url(#mono-fill)"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeOpacity="0.75"
            />

            {/* Stem, tapering slightly toward the foot */}
            <path
                d="M20 13.6v13.1"
                stroke="url(#mono-fill)"
                strokeWidth="2.9"
                strokeLinecap="round"
            />
            {/* Foot serif */}
            <path
                d="M16.4 27.4h7.2"
                stroke="url(#mono-fill)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeOpacity="0.85"
            />
        </svg>
    )
}
