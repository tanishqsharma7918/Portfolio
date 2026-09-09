"use client"

import { motion, useInView, type Variants } from "framer-motion"
import { useEffect, useRef, type ReactNode } from "react"

const GLIDE = [0.16, 1, 0.3, 1] as const

/* ------------------------------------------------------------------ */
/*  Reveal — the workhorse. Fades and lifts a block once it enters.     */
/* ------------------------------------------------------------------ */
export function Reveal({
    children,
    delay = 0,
    y = 26,
    className,
    once = true,
}: {
    children: ReactNode
    delay?: number
    y?: number
    className?: string
    once?: boolean
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, margin: "-12% 0px -12% 0px" }}
            transition={{ duration: 0.9, delay, ease: GLIDE }}
        >
            {children}
        </motion.div>
    )
}

/* ------------------------------------------------------------------ */
/*  MaskLines — each line slides up out of its own clipping box.       */
/* ------------------------------------------------------------------ */
export function MaskLines({
    lines,
    className,
    lineClassName,
    delay = 0,
    stagger = 0.09,
    as: Tag = "span",
}: {
    lines: string[]
    className?: string
    lineClassName?: string
    delay?: number
    stagger?: number
    as?: "span" | "div"
}) {
    const ref = useRef<HTMLDivElement | null>(null)
    const inView = useInView(ref, { once: true, margin: "-10% 0px" })

    return (
        <div ref={ref} className={className}>
            {lines.map((line, i) => (
                <span className="line-clip" key={`${line}-${i}`}>
                    <motion.span
                        className={`block ${lineClassName ?? ""}`}
                        initial={{ y: "110%" }}
                        animate={inView ? { y: "0%" } : { y: "110%" }}
                        transition={{
                            duration: 1.05,
                            delay: delay + i * stagger,
                            ease: GLIDE,
                        }}
                    >
                        {line}
                    </motion.span>
                </span>
            ))}
            <Tag className="sr-only">{lines.join(" ")}</Tag>
        </div>
    )
}

/* ------------------------------------------------------------------ */
/*  WordReveal — per-word lift, for body copy that deserves weight.    */
/* ------------------------------------------------------------------ */
export function WordReveal({
    text,
    className,
    delay = 0,
}: {
    text: string
    className?: string
    delay?: number
}) {
    const words = text.split(" ")
    const container: Variants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.018, delayChildren: delay } },
    }
    const word: Variants = {
        hidden: { opacity: 0, y: "0.4em" },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: GLIDE } },
    }

    return (
        <motion.p
            className={className}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-14% 0px" }}
        >
            {words.map((w, i) => (
                <motion.span key={`${w}-${i}`} variants={word} className="inline-block">
                    {w}
                    {i < words.length - 1 ? " " : ""}
                </motion.span>
            ))}
        </motion.p>
    )
}

/* ------------------------------------------------------------------ */
/*  Counter — counts up to a value the first time it is seen.          */
/* ------------------------------------------------------------------ */
export function Counter({
    value,
    prefix = "",
    suffix = "",
    duration = 1.8,
    className,
}: {
    value: number
    prefix?: string
    suffix?: string
    duration?: number
    className?: string
}) {
    const ref = useRef<HTMLSpanElement | null>(null)
    const inView = useInView(ref, { once: true, margin: "-20% 0px" })
    const decimals = Number.isInteger(value) ? 0 : 1

    return (
        <span ref={ref} className={className}>
            {prefix}
            <CountUp to={value} run={inView} duration={duration} decimals={decimals} />
            {suffix}
        </span>
    )
}

function CountUp({
    to,
    run,
    duration,
    decimals,
}: {
    to: number
    run: boolean
    duration: number
    decimals: number
}) {
    const ref = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {
        if (!run) return
        const node = ref.current
        if (!node) return

        // Reduced-motion visitors get the number, not the performance.
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            node.textContent = to.toFixed(decimals)
            return
        }

        let raf = 0
        const start = performance.now()
        const tick = (now: number) => {
            const p = Math.min(1, (now - start) / (duration * 1000))
            // easeOutExpo — fast off the line, long settle
            const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
            node.textContent = (to * eased).toFixed(decimals)
            if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [run, to, duration, decimals])

    return <span ref={ref}>{(0).toFixed(decimals)}</span>
}
