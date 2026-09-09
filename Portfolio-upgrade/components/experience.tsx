"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { experience } from "@/lib/content"
import { SectionHeading } from "@/components/ui/section-heading"
import { Reveal } from "@/components/ui/reveal"

export function Experience() {
    const track = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({
        target: track,
        offset: ["start 65%", "end 65%"],
    })
    // The spine fills as you read — progress you can feel
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

    return (
        <section id="experience" className="shell scroll-mt-24 py-24 md:py-32">
            <SectionHeading
                index="03"
                eyebrow="Experience"
                lines={["Where the work", "actually happened"]}
            />

            <div ref={track} className="relative mt-16 md:mt-24">
                {/* Spine */}
                <div className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-fg/10 md:block">
                    <motion.div
                        className="h-full w-full origin-top bg-gradient-to-b from-accent via-accent/70 to-gold"
                        style={{ scaleY: lineScale }}
                    />
                </div>

                <div className="flex flex-col gap-14 md:gap-20 md:pl-14">
                    {experience.map((job, i) => (
                        <Reveal key={`${job.company}-${i}`} y={34}>
                            <div className="group relative">
                                {/* Node */}
                                <span className="absolute -left-14 top-2 hidden h-4 w-4 items-center justify-center md:flex">
                                    <span className={`h-2 w-2 rounded-full ring-4 ring-bg transition-all duration-500 ease-glide group-hover:scale-150 group-hover:bg-accent ${job.current ? "bg-accent" : "bg-fg/25"}`} />
                                </span>

                                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                                    <h3 className="text-title font-medium">{job.role}</h3>
                                    <span className="flex items-center gap-3 font-mono text-eyebrow text-muted">
                                        {job.current ? (
                                            <span className="flex items-center gap-1.5 text-accent">
                                                <span className="relative flex h-1.5 w-1.5">
                                                    <span className="absolute inset-0 rounded-full bg-accent" />
                                                    <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
                                                </span>
                                                Current
                                            </span>
                                        ) : null}
                                        {job.period}
                                    </span>
                                </div>

                                <p className="mt-2 text-base">
                                    <span className="text-accent">{job.company}</span>
                                    <span className="text-muted"> — {job.location}</span>
                                </p>

                                <ul className="mt-6 flex flex-col gap-3.5">
                                    {job.points.map((point, j) => (
                                        <li key={j} className="flex gap-3.5">
                                            <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                                            <span className="text-pretty text-sm leading-relaxed text-muted md:text-[0.95rem]">
                                                {point}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {job.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-fg/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted transition-colors group-hover:border-accent/30"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
