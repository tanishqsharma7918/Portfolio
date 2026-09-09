"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { profile } from "@/lib/content"

const GLIDE = [0.16, 1, 0.3, 1] as const

/**
 * Runs once per browser session. The counter is driven by a decaying step
 * so it accelerates and then hesitates near 100 — the pause is what makes
 * the reveal land instead of merely happening.
 */
export function Preloader() {
    const [done, setDone] = useState(true)
    const [count, setCount] = useState(0)

    useEffect(() => {
        const seen = sessionStorage.getItem("intro-seen")
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (seen || reduced) return

        setDone(false)
        document.body.style.overflow = "hidden"

        const DURATION = 1700
        const start = performance.now()
        let raf = 0
        let settled = false

        const finish = () => {
            if (settled) return
            settled = true
            setCount(100)
            sessionStorage.setItem("intro-seen", "1")
            window.setTimeout(() => {
                setDone(true)
                document.body.style.overflow = ""
            }, 380)
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
            window.clearTimeout(bail)
            document.body.style.overflow = ""
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
                        <span className="eyebrow">{profile.name}</span>
                        <span className="eyebrow">{profile.shortLocation}</span>
                    </div>

                    <div className="flex flex-col items-start">
                        <span className="line-clip">
                            <motion.span
                                className="block text-display font-medium"
                                initial={{ y: "110%" }}
                                animate={{ y: "0%" }}
                                transition={{ duration: 1.1, ease: GLIDE, delay: 0.1 }}
                            >
                                Portfolio
                            </motion.span>
                        </span>
                        <span className="line-clip">
                            <motion.span
                                className="accent-serif block text-display"
                                initial={{ y: "110%" }}
                                animate={{ y: "0%" }}
                                transition={{ duration: 1.1, ease: GLIDE, delay: 0.2 }}
                            >
                                twenty&nbsp;six
                            </motion.span>
                        </span>
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
                </motion.div>
            )}
        </AnimatePresence>
    )
}
