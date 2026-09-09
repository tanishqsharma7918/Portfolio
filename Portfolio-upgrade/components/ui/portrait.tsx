"use client"

import Image from "next/image"
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

/**
 * The portrait reacts to two different inputs.
 *
 * Scroll drives an unmask: the frame wipes open from the bottom while the
 * image itself drifts against it, so the photo arrives rather than appearing.
 * Pointer drives a tilt — rotation is derived from cursor position relative
 * to the frame's centre and run through a spring, and a specular highlight
 * tracks the same coordinates so the glass reads as lit from where the cursor
 * is. Both are pure transforms, so nothing here triggers layout.
 */
export function Portrait({ src, alt }: { src: string; alt: string }) {
    const wrap = useRef<HTMLDivElement | null>(null)

    const { scrollYProgress } = useScroll({
        target: wrap,
        offset: ["start end", "end start"],
    })
    const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"])
    const revealY = useTransform(scrollYProgress, [0, 0.32], ["36%", "0%"])
    const revealOpacity = useTransform(scrollYProgress, [0, 0.22], [0, 1])

    // Raw pointer position, 0..1 within the frame
    const px = useMotionValue(0.5)
    const py = useMotionValue(0.5)
    const spring = { stiffness: 150, damping: 20, mass: 0.4 }
    const sx = useSpring(px, spring)
    const sy = useSpring(py, spring)

    const rotateY = useTransform(sx, [0, 1], [7, -7])
    const rotateX = useTransform(sy, [0, 1], [-6, 6])
    const glareX = useTransform(sx, [0, 1], ["12%", "88%"])
    const glareY = useTransform(sy, [0, 1], ["8%", "92%"])

    function onMove(e: React.PointerEvent<HTMLDivElement>) {
        const r = e.currentTarget.getBoundingClientRect()
        px.set((e.clientX - r.left) / r.width)
        py.set((e.clientY - r.top) / r.height)
    }
    function onLeave() {
        px.set(0.5)
        py.set(0.5)
    }

    return (
        <motion.div
            ref={wrap}
            style={{ y: revealY, opacity: revealOpacity, perspective: 1000 }}
            className="relative"
        >
            <motion.div
                onPointerMove={onMove}
                onPointerLeave={onLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-fg/10 will-change-transform"
            >
                <motion.div style={{ y: imageY }} className="absolute -inset-y-[9%] inset-x-0">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="portrait object-cover transition-transform duration-[900ms] ease-glide group-hover:scale-[1.045]"
                        style={{ objectPosition: "center 18%" }}
                    />
                </motion.div>

                {/* Specular highlight, positioned from the same pointer coords */}
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                        background: useTransform(
                            [glareX, glareY],
                            ([x, y]) =>
                                `radial-gradient(38% 32% at ${x} ${y}, rgb(255 255 255 / 0.16), transparent 70%)`
                        ),
                    }}
                />

                {/* Edge shading seats the photo against the page */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_90px_26px_rgb(var(--bg)/0.45)]" />
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-fg/10 transition-colors duration-500 group-hover:ring-accent/30" />
            </motion.div>
        </motion.div>
    )
}
