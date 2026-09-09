"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"
import { Check, Moon, Palette, Sun } from "lucide-react"
import { ACCENT_KEY, DEFAULT_ACCENT, accents, type AccentId } from "@/lib/themes"

const GLIDE = [0.16, 1, 0.3, 1] as const

/**
 * One control for both axes: mode (light/dark) and accent. The accent lives
 * on a `data-accent` attribute rather than in React state that components
 * subscribe to — every consumer already reads CSS custom properties, so
 * flipping the attribute re-tints the page and the canvas at once.
 */
export function ThemeSwitcher() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [open, setOpen] = useState(false)
    const [accent, setAccent] = useState<AccentId>(DEFAULT_ACCENT)
    const wrap = useRef<HTMLDivElement | null>(null)

    useEffect(() => setMounted(true), [])

    useEffect(() => {
        const stored = localStorage.getItem(ACCENT_KEY) as AccentId | null
        if (stored && accents.some((a) => a.id === stored)) {
            setAccent(stored)
            document.documentElement.dataset.accent = stored
        }
    }, [])

    useEffect(() => {
        if (!open) return
        const onDown = (e: MouseEvent) => {
            if (!wrap.current?.contains(e.target as Node)) setOpen(false)
        }
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
        document.addEventListener("pointerdown", onDown)
        window.addEventListener("keydown", onKey)
        return () => {
            document.removeEventListener("pointerdown", onDown)
            window.removeEventListener("keydown", onKey)
        }
    }, [open])

    function pick(id: AccentId) {
        setAccent(id)
        document.documentElement.dataset.accent = id
        localStorage.setItem(ACCENT_KEY, id)
    }

    if (!mounted) return <span className="h-10 w-10" aria-hidden="true" />

    const isDark = resolvedTheme === "dark"

    return (
        <div ref={wrap} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Theme options"
                aria-expanded={open}
                className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-inset ring-fg/15 transition-colors hover:bg-fg/5"
            >
                <Palette className="h-[18px] w-[18px]" />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.32, ease: GLIDE }}
                        className="glass-strong absolute right-0 top-12 z-50 w-[15rem] origin-top-right rounded-2xl p-4 shadow-[0_24px_70px_-30px_rgb(0_0_0/0.7)]"
                    >
                        <span className="eyebrow">Mode</span>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            {[
                                { id: "light", label: "Light", Icon: Sun },
                                { id: "dark", label: "Dark", Icon: Moon },
                            ].map(({ id, label, Icon }) => {
                                const active = isDark === (id === "dark")
                                return (
                                    <button
                                        key={id}
                                        onClick={() => setTheme(id)}
                                        className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium transition-colors ${
                                            active
                                                ? "bg-accent/15 text-accent ring-1 ring-inset ring-accent/35"
                                                : "text-muted ring-1 ring-inset ring-fg/10 hover:bg-fg/5"
                                        }`}
                                    >
                                        <Icon className="h-3.5 w-3.5" />
                                        {label}
                                    </button>
                                )
                            })}
                        </div>

                        <span className="eyebrow mt-6 block">Accent</span>
                        <div className="mt-3 flex flex-col gap-1">
                            {accents.map((a) => (
                                <button
                                    key={a.id}
                                    onClick={() => pick(a.id)}
                                    className="flex items-center gap-3 rounded-xl px-2.5 py-2 text-left text-xs transition-colors hover:bg-fg/5"
                                >
                                    <span
                                        className="h-4 w-4 shrink-0 rounded-full ring-1 ring-inset ring-black/15"
                                        style={{ backgroundColor: a.swatch }}
                                    />
                                    <span className={accent === a.id ? "font-medium" : "text-muted"}>
                                        {a.label}
                                    </span>
                                    {accent === a.id ? (
                                        <Check className="ml-auto h-3.5 w-3.5 text-accent" />
                                    ) : null}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
