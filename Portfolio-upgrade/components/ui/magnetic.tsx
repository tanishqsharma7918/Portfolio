"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useRef, type ReactNode } from "react"

/**
 * Pulls its child toward the pointer while hovered, then springs home.
 * `strength` is the fraction of the distance travelled — anything above
 * about 0.4 starts to feel gimmicky rather than expensive.
 */
export function Magnetic({
    children,
    strength = 0.28,
    className,
}: {
    children: ReactNode
    strength?: number
    className?: string
}) {
    const ref = useRef<HTMLDivElement | null>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 })
    const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 })

    function onMove(e: React.PointerEvent<HTMLDivElement>) {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
    }

    function reset() {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onPointerMove={onMove}
            onPointerLeave={reset}
            style={{ x: sx, y: sy }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
