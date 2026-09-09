"use client"

import { motion, useAnimationFrame, useMotionValue } from "framer-motion"
import { useRef, useState } from "react"
import { Monogram } from "@/components/ui/monogram"

const MIN = 2
const MAX = 5

/** Each shell gets its own radius, period, plane and eccentricity, so they
 *  never lock into a pattern that reads as one rigid object turning. */
const SHELLS = [
    { radius: 19, speed: 0.85, plane: 0, squash: 0.42, phase: 0 },
    { radius: 21, speed: 0.6, plane: 62, squash: 0.34, phase: 2.1 },
    { radius: 17, speed: 1.02, plane: 118, squash: 0.5, phase: 4.0 },
    { radius: 22, speed: 0.48, plane: 25, squash: 0.28, phase: 1.2 },
    { radius: 15.5, speed: 0.72, plane: 88, squash: 0.46, phase: 5.3 },
]

/**
 * The mark with electrons around it. Pressing it reverses the orbit and adds
 * a shell, wrapping back to two after five.
 *
 * The click deliberately does not preventDefault — the mark sits inside the
 * back-to-top link, so a press should still take you home. This rides along.
 */
export function BrandMark() {
    const [count, setCount] = useState(MIN)
    const [dir, setDir] = useState(1)

    function advance() {
        setDir((d) => -d)
        setCount((c) => (c >= MAX ? MIN : c + 1))
    }

    return (
        <span
            onClick={advance}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center"
        >
            {SHELLS.slice(0, count).map((shell, i) => (
                <span key={i} aria-hidden="true" className="pointer-events-none absolute inset-0">
                    {/* Orbit path, barely there — enough to imply the shell */}
                    <span
                        className="absolute rounded-full border border-accent/20"
                        style={{
                            left: "50%",
                            top: "50%",
                            width: shell.radius * 2,
                            height: shell.radius * 2 * shell.squash,
                            marginLeft: -shell.radius,
                            marginTop: -shell.radius * shell.squash,
                            transform: `rotate(${shell.plane}deg)`,
                        }}
                    />
                    <Electron shell={shell} dir={dir} />
                </span>
            ))}

            <Monogram className="relative h-[26px] w-[26px] transition-transform duration-700 ease-glide group-hover:rotate-[9deg] group-hover:scale-105" />
        </span>
    )
}

/**
 * Position is solved on the ellipse and then rotated into the shell's plane,
 * so the dot itself is never scaled and stays round. The angle accumulates
 * per frame rather than being derived from absolute time, which is what lets
 * the direction flip without the electron jumping to a new position.
 */
function Electron({ shell, dir }: { shell: (typeof SHELLS)[number]; dir: number }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const angle = useRef(shell.phase)

    useAnimationFrame((_, delta) => {
        angle.current += dir * (delta / 1000) * shell.speed
        const a = angle.current
        const ex = Math.cos(a) * shell.radius
        const ey = Math.sin(a) * shell.radius * shell.squash
        const p = (shell.plane * Math.PI) / 180
        x.set(ex * Math.cos(p) - ey * Math.sin(p))
        y.set(ex * Math.sin(p) + ey * Math.cos(p))
    })

    return (
        <motion.span
            style={{ x, y }}
            className="absolute left-1/2 top-1/2 h-[3.5px] w-[3.5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        >
            <span className="absolute inset-0 rounded-full bg-accent blur-[2px]" />
        </motion.span>
    )
}
