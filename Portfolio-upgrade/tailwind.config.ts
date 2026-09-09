import type { Config } from "tailwindcss"

const config = {
    darkMode: "class",
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "1.5rem",
            screens: { "2xl": "1400px" },
        },
        extend: {
            colors: {
                bg: "rgb(var(--bg) / <alpha-value>)",
                surface: "rgb(var(--surface) / <alpha-value>)",
                fg: "rgb(var(--fg) / <alpha-value>)",
                muted: "rgb(var(--muted) / <alpha-value>)",
                line: "rgb(var(--line) / <alpha-value>)",
                accent: "rgb(var(--accent) / <alpha-value>)",
                gold: "rgb(var(--gold) / <alpha-value>)",
            },
            fontFamily: {
                sans: ["var(--font-sans)", "system-ui", "sans-serif"],
                serif: ["var(--font-serif)", "Georgia", "serif"],
                mono: ["var(--font-mono)", "ui-monospace", "monospace"],
            },
            fontSize: {
                "display": ["clamp(2.75rem, 9vw, 9rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
                "headline": ["clamp(2rem, 5.2vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
                "title": ["clamp(1.35rem, 2.4vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
                "eyebrow": ["0.6875rem", { lineHeight: "1", letterSpacing: "0.22em" }],
            },
            borderRadius: {
                xl: "1rem",
                "2xl": "1.5rem",
                "3xl": "2rem",
                "4xl": "2.75rem",
            },
            transitionTimingFunction: {
                glide: "cubic-bezier(0.16, 1, 0.3, 1)",
                swift: "cubic-bezier(0.22, 1, 0.36, 1)",
            },
            keyframes: {
                marquee: {
                    from: { transform: "translate3d(0,0,0)" },
                    to: { transform: "translate3d(-50%,0,0)" },
                },
                "fade-up": {
                    from: { opacity: "0", transform: "translateY(14px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "200% 0" },
                    "100%": { backgroundPosition: "-200% 0" },
                },
                "pulse-ring": {
                    "0%": { transform: "scale(0.9)", opacity: "0.7" },
                    "100%": { transform: "scale(1.6)", opacity: "0" },
                },
            },
            animation: {
                marquee: "marquee 42s linear infinite",
                "marquee-slow": "marquee 70s linear infinite",
                "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
                shimmer: "shimmer 6s linear infinite",
                "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.16,1,0.3,1) infinite",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
