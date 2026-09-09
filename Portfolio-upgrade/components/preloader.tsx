"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { loader, profile } from "@/lib/content"
import { lockScroll, unlockScroll } from "@/lib/scroll-lock"

const GLIDE = [0.16, 1, 0.3, 1] as const
const DURATION = 1900

/**
 * Runs once per browser session. The counter is driven by wall-clock time
 * against a decaying curve, so it accelerates then hesitates near 100 — the
 * hesitation is what makes the reveal land instead of merely happening.
 *
 * The copy states the practice rather than announcing the site. A visitor
 * who has just clicked a link already knows whose portfolio this is; the
 * useful thing to tell them in the second before it opens is what kind of
 * work they are about to look at.
 */
export function Preloader() {
    const [done, setDone] = useState(true)
    const [count, setCount] = useState(0)
    const [phase, setPhase] = useState(0)

    useEffect(() => {
        const seen = sessionStorage.getItem("intro-seen")
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (seen || reduced) return

        setDone(false)
        lockScroll()

        const start = performance.now()
        let raf = 0
        let settled = false

        const rotate = window.setInterval(
            () => setPhase((p) => (p + 1) % loader.disciplines.length),
            DURATION / (loader.disciplines.length + 0.5)
        )

        const finish = () => {
            if (settled) return
            settled = true
            setCount(100)
            sessionStorage.setItem("intro-seen", "1")
            window.setTimeout(() => {
                setDone(true)
                unlockScroll()
            }, 400)
        }

        // Wall-clock driven, so a throttled rAF (background tab, low-power
        // mode) can slow the frames but never stall the count.
        const tick = (now: number) => {
            const p = Math.min(1, (now - start) / DURATION)
            const eased = 1 - Math.pow(1 - p, 2.4)
            setCount(Math.round(eased * 100))
            if (p >= 1) {
                finish()
                return
            }
            raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)

        // Belt and braces: nothing keeps the visitor behind a curtain.
        const bail = window.setTimeout(finish, DURATION + 900)

        return () => {
            cancelAnimationFrame(raf)
            window.clearInterval(rotate)
            window.clearTimeout(bail)
            unlockScroll()
        }
    }, [])

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="fixed inset-0 z-[200] flex flex-col justify-between bg-bg px-6 py-10 md:px-10"
                    exit={{ y: "-100%" }}
                    transition={{ duration: 1.1, ease: GLIDE }}
                >
                    <div className="flex items-start justify-between">
                        <span className="eyebrow">{profile.role}</span>
                        <span className="eyebrow">{profile.shortLocation}</span>
                    </div>

                    <div className="flex flex-col items-start">
                        {loader.lines.map((line, i) => (
                            <span key={line} className="line-clip">
                                <motion.span
                                    className={
                                        i === 0
                                            ? "block text-display font-medium"
                                            : "accent-serif block text-display"
                                    }
                                    initial={{ y: "110%" }}
                                    animate={{ y: "0%" }}
                                    transition={{ duration: 1.1, ease: GLIDE, delay: 0.1 + i * 0.1 }}
                                >
                                    {line}
                                </motion.span>
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-col gap-5">
                        {/* Disciplines cycle while the bar fills, so the wait
                            carries information instead of just elapsing. */}
                        <div className="relative h-5 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={phase}
                                    initial={{ y: "110%", opacity: 0 }}
                                    animate={{ y: "0%", opacity: 1 }}
                                    exit={{ y: "-110%", opacity: 0 }}
                                    transition={{ duration: 0.5, ease: GLIDE }}
                                    className="absolute inset-0 font-mono text-eyebrow uppercase text-muted"
                                >
                                    {loader.disciplines[phase]}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        <div className="flex items-end justify-between">
                            <div className="h-px w-full max-w-md overflow-hidden bg-fg/10">
                                <motion.div
                                    className="h-full bg-accent"
                                    style={{ width: `${count}%` }}
                                />
                            </div>
                            <span className="ml-6 font-mono text-3xl tabular-nums md:text-5xl">
                                {String(count).padStart(3, "0")}
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
