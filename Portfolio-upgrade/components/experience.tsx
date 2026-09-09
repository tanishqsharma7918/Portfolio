"use client"

import { AnimatePresence, motion, useMotionValue, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Plus } from "lucide-react"
import { experience } from "@/lib/content"
import { SectionHeading } from "@/components/ui/section-heading"
import { Reveal } from "@/components/ui/reveal"

const GLIDE = [0.16, 1, 0.3, 1] as const

/**
 * Full-bleed rows that open in place, rather than a grid of cards. Each row
 * is its own surface — a spotlight tracks the pointer across it and the rule
 * above it draws itself in on hover — so the section still feels physical
 * without chopping the history into tiles. The current role starts open;
 * the rest toggle independently, so nothing a reader has opened closes
 * itself again while they are reading it.
 */
export function Experience() {
    const track = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({
        target: track,
        offset: ["start 70%", "end 70%"],
    })
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

    const [open, setOpen] = useState<number[]>(() =>
        experience.map((job, i) => (job.current ? i : -1)).filter((i) => i >= 0)
    )

    const toggle = (i: number) =>
        setOpen((prev) => (prev.includes(i) ? prev.filter((v) => v !== i) : [...prev, i]))

    return (
        <section id="experience" className="scroll-mt-24 py-24 md:py-32">
            <div className="shell">
                <SectionHeading
                    eyebrow="Experience"
                    lines={["Where the work", "actually happened"]}
                    lead="Four roles, most recent first. Open any one for what the work actually involved."
                />
            </div>

            <div ref={track} className="shell relative mt-14 md:mt-20">
                {/* Spine fills as you read — progress you can feel */}
                <div className="pointer-events-none absolute left-6 top-0 hidden h-full w-px bg-fg/10 md:left-10 md:block">
                    <motion.div
                        className="h-full w-full origin-top bg-gradient-to-b from-accent via-accent/60 to-gold"
                        style={{ scaleY: lineScale }}
                    />
                </div>

                <div className="flex flex-col">
                    {experience.map((job, i) => (
                        <Row
                            key={`${job.company}-${i}`}
                            job={job}
                            index={i}
                            isOpen={open.includes(i)}
                            onToggle={() => toggle(i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */

function Row({
    job,
    index,
    isOpen,
    onToggle,
}: {
    job: (typeof experience)[number]
    index: number
    isOpen: boolean
    onToggle: () => void
}) {
    const mx = useMotionValue(-999)
    const my = useMotionValue(-999)

    function onMove(e: React.PointerEvent<HTMLDivElement>) {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(e.clientX - r.left)
        my.set(e.clientY - r.top)
    }
    function onLeave() {
        mx.set(-999)
        my.set(-999)
    }

    const spotlight = useTransform(
        [mx, my],
        ([x, y]) =>
            `radial-gradient(420px 260px at ${x}px ${y}px, rgb(var(--accent) / 0.10), transparent 72%)`
    )

    return (
        <Reveal y={26} delay={index * 0.05}>
            <div
                onPointerMove={onMove}
                onPointerLeave={onLeave}
                className="group relative border-t border-fg/10"
            >
                {/* Pointer spotlight */}
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: spotlight }}
                />

                {/* The rule above the row draws itself in on hover */}
                <span
                    aria-hidden="true"
                    className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-accent to-transparent transition-transform duration-[900ms] ease-glide group-hover:scale-x-100"
                />

                <button
                    onClick={onToggle}
                    aria-expanded={isOpen}
                    className="relative flex w-full items-start gap-6 py-8 pl-0 pr-1 text-left md:gap-10 md:py-10 md:pl-9"
                >
                    {/* Node on the spine */}
                    <span
                        aria-hidden="true"
                        className={`absolute left-0 top-[2.85rem] hidden h-2 w-2 -translate-x-1/2 rounded-full ring-4 ring-bg transition-all duration-500 ease-glide group-hover:scale-150 md:block ${
                            job.current ? "bg-accent" : "bg-fg/25 group-hover:bg-accent"
                        }`}
                    />

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                            <h3 className="text-title font-medium">{job.role}</h3>
                            {job.current ? (
                                <span className="flex items-center gap-1.5 font-mono text-eyebrow uppercase text-accent">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="absolute inset-0 rounded-full bg-accent" />
                                        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
                                    </span>
                                    Current
                                </span>
                            ) : null}
                        </div>

                        <p className="mt-2 text-sm md:text-base">
                            <span className="text-accent">{job.company}</span>
                            <span className="text-muted"> — {job.location}</span>
                        </p>

                        {/* Tags stay visible closed, so a skim still lands */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {job.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-fg/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted transition-colors group-hover:border-accent/30"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-4">
                        <span className="whitespace-nowrap font-mono text-eyebrow text-muted">
                            {job.period}
                        </span>
                        <span
                            className={`flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-inset ring-fg/15 transition-all duration-500 ease-glide group-hover:ring-accent/50 ${
                                isOpen ? "rotate-45 bg-accent/10" : ""
                            }`}
                        >
                            <Plus className="h-4 w-4" />
                        </span>
                    </div>
                </button>

                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            key="body"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.65, ease: GLIDE }}
                            className="relative overflow-hidden"
                        >
                            <ul className="flex flex-col gap-4 pb-10 md:max-w-4xl md:pl-9">
                                {job.points.map((point, j) => (
                                    <motion.li
                                        key={j}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.12 + j * 0.06, duration: 0.5, ease: GLIDE }}
                                        className="flex gap-3.5"
                                    >
                                        <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                                        <span className="text-pretty text-sm leading-relaxed text-muted md:text-[0.95rem]">
                                            {point}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Reveal>
    )
}
