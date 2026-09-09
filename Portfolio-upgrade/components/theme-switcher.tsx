"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { ACCENT_KEY, RING_KEY, themeRing } from "@/lib/themes"

const GLIDE = [0.16, 1, 0.3, 1] as const

/**
 * One button, one ring. Each click advances to the next stop — accent and
 * mode together — so there is no dialog to open and no second decision to
 * make. The swatch shows where you are; the label flashes briefly so the
 * change is named rather than just felt.
 */
export function ThemeSwitcher() {
    const { setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [index, setIndex] = useState(0)
    const [flash, setFlash] = useState(false)

    useEffect(() => setMounted(true), [])

    // Recover the stop from storage rather than trusting the two keys to agree
    useEffect(() => {
        const stored = Number(localStorage.getItem(RING_KEY))
        if (Number.isInteger(stored) && stored >= 0 && stored < themeRing.length) {
            setIndex(stored)
        }
    }, [])

    useEffect(() => {
        if (!flash) return
        const id = window.setTimeout(() => setFlash(false), 1500)
        return () => window.clearTimeout(id)
    }, [flash])

    function advance() {
        const next = (index + 1) % themeRing.length
        const stop = themeRing[next]
        setIndex(next)
        setFlash(true)
        document.documentElement.dataset.accent = stop.accent
        setTheme(stop.mode)
        localStorage.setItem(RING_KEY, String(next))
        localStorage.setItem(ACCENT_KEY, stop.accent)
    }

    if (!mounted) return <span className="h-10 w-10" aria-hidden="true" />

    const stop = themeRing[index]

    return (
        <div className="relative">
            <button
                onClick={advance}
                aria-label={`Theme: ${stop.label}. Click for the next theme.`}
                className="group relative flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-inset ring-fg/15 transition-colors hover:bg-fg/5"
            >
                {/* Swatch ring — the arc fills round as you travel the ring */}
                <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full -rotate-90">
                    <circle
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        stroke="rgb(var(--accent))"
                        strokeOpacity="0.75"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeDasharray={`${((index + 1) / themeRing.length) * 100.5} 100.5`}
                        className="transition-all duration-700 ease-glide"
                    />
                </svg>

                <AnimatePresence mode="wait">
                    <motion.span
                        key={stop.accent + stop.mode}
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.3, opacity: 0 }}
                        transition={{ duration: 0.32, ease: GLIDE }}
                        className="h-3.5 w-3.5 rounded-full"
                        style={{
                            backgroundColor: "rgb(var(--accent))",
                            boxShadow:
                                stop.mode === "light"
                                    ? "0 0 0 2px rgb(var(--bg)), 0 0 0 3px rgb(var(--accent) / 0.35)"
                                    : "0 0 10px 1px rgb(var(--accent) / 0.6)",
                        }}
                    />
                </AnimatePresence>
            </button>

            <AnimatePresence>
                {flash && (
                    <motion.span
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3, ease: GLIDE }}
                        className="glass-strong pointer-events-none absolute right-0 top-12 whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]"
                    >
                        {stop.label}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    )
}
