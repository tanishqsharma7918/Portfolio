"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { certifications, education, intro, profile } from "@/lib/content"
import { SectionHeading } from "@/components/ui/section-heading"
import { Reveal, WordReveal } from "@/components/ui/reveal"

export function About() {
    const imageWrap = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({
        target: imageWrap,
        offset: ["start end", "end start"],
    })
    // The portrait drifts slower than the page — a quiet depth cue
    const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

    return (
        <section id="about" className="shell scroll-mt-24 py-24 md:py-36">
            <SectionHeading
                index="01"
                eyebrow="About"
                lines={["Analytics with", "an engineer's hands"]}
            />

            <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
                {/* Portrait */}
                <Reveal y={40}>
                    <div
                        ref={imageWrap}
                        className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-fg/10"
                    >
                        <motion.div style={{ y: imageY }} className="absolute -inset-y-[9%] inset-x-0">
                            <Image
                                src={profile.photo}
                                alt={`${profile.name}, portrait`}
                                fill
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                className="portrait object-cover"
                                style={{ objectPosition: "center 18%" }}
                                priority={false}
                            />
                        </motion.div>

                        {/* Just enough edge shading to seat the photo against the
                            page — no wash across the face, nothing written on it. */}
                        <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_90px_26px_rgb(var(--bg)/0.45)]" />
                        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-fg/10" />
                    </div>
                </Reveal>

                {/* Copy */}
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-6">
                        {intro.lines.map((line, i) => (
                            <WordReveal
                                key={i}
                                text={line}
                                delay={i * 0.05}
                                className={
                                    i === 0
                                        ? "text-pretty text-xl leading-relaxed text-fg md:text-2xl"
                                        : "text-pretty text-base leading-relaxed text-muted md:text-lg"
                                }
                            />
                        ))}
                    </div>

                    <Reveal delay={0.1}>
                        <div className="hairline" />
                    </Reveal>

                    {/* Education */}
                    <div className="flex flex-col gap-8">
                        <Reveal>
                            <span className="eyebrow">Education</span>
                        </Reveal>

                        {education.map((item, i) => (
                            <Reveal key={item.degree} delay={0.06 * i}>
                                <div className="group flex flex-col gap-2 border-t border-fg/10 pt-5 transition-colors hover:border-accent/40">
                                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                                        <h3 className="text-title font-medium">{item.degree}</h3>
                                        <span className="font-mono text-eyebrow text-muted">
                                            {item.period}
                                        </span>
                                    </div>
                                    <p className="text-sm text-fg/80">
                                        {item.school}
                                        <span className="text-muted"> · {item.grade}</span>
                                    </p>
                                    <p className="max-w-lg text-sm leading-relaxed text-muted">
                                        {item.modules}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {/* Certifications */}
                    <div className="flex flex-col gap-5">
                        <Reveal>
                            <span className="eyebrow">Certifications</span>
                        </Reveal>

                        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                            {certifications.map((cert, i) => (
                                <Reveal key={cert.name} delay={0.04 * i}>
                                    <div className="flex flex-col gap-1 border-t border-fg/10 pt-4">
                                        <span className="text-sm font-medium leading-snug">
                                            {cert.name}
                                        </span>
                                        <span className="font-mono text-eyebrow text-muted">
                                            {cert.issuer} · {cert.date}
                                        </span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
