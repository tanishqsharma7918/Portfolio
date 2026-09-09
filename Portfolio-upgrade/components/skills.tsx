"use client"

import { motion } from "framer-motion"
import { proficiency, skillGroups } from "@/lib/content"
import { SectionHeading } from "@/components/ui/section-heading"
import { Reveal } from "@/components/ui/reveal"

const GLIDE = [0.16, 1, 0.3, 1] as const

/**
 * A 3px bar and a bare percentage said almost nothing — a number with no
 * unit is not evidence. Each capability now carries how often it is actually
 * used and one line on what that means in practice, and the meter is a
 * segmented track so the level is legible at a glance rather than needing
 * the label read alongside it.
 */
export function Skills() {
    return (
        <section id="skills" className="shell scroll-mt-24 py-24 md:py-32">
            <SectionHeading
                eyebrow="Capabilities"
                lines={["The toolkit,", "and how deep it goes"]}
                lead="What I reach for daily, and what each of these actually buys in production."
            />

            <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
                {/* Depth */}
                <div className="flex flex-col">
                    <Reveal>
                        <div className="mb-8 flex items-baseline justify-between border-b border-fg/10 pb-4">
                            <span className="eyebrow">Depth</span>
                            <span className="eyebrow">Cadence</span>
                        </div>
                    </Reveal>

                    <div className="flex flex-col gap-8">
                        {proficiency.map((skill, i) => (
                            <Reveal key={skill.name} delay={i * 0.06}>
                                <div className="group">
                                    <div className="flex items-baseline justify-between gap-6">
                                        <h3 className="text-[0.98rem] font-medium">{skill.name}</h3>
                                        <span
                                            className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${
                                                skill.level === "Daily"
                                                    ? "bg-accent/12 text-accent"
                                                    : "bg-fg/[0.06] text-muted"
                                            }`}
                                        >
                                            {skill.level}
                                        </span>
                                    </div>

                                    <Meter value={skill.value} delay={0.1 + i * 0.07} />

                                    <p className="mt-3 max-w-lg text-pretty text-[0.83rem] leading-relaxed text-muted">
                                        {skill.note}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* Tooling */}
                <div className="flex flex-col gap-5">
                    <Reveal>
                        <div className="mb-3 flex items-baseline justify-between border-b border-fg/10 pb-4">
                            <span className="eyebrow">Tooling</span>
                            <span className="eyebrow">
                                {skillGroups.reduce((n, g) => n + g.items.length, 0)} tools
                            </span>
                        </div>
                    </Reveal>

                    {skillGroups.map((group, i) => (
                        <Reveal key={group.title} delay={i * 0.07}>
                            <div className="panel p-6 transition-colors duration-500 hover:border-accent/25">
                                <h3 className="text-[0.98rem] font-medium">{group.title}</h3>
                                <p className="mt-1.5 text-pretty text-[0.83rem] leading-relaxed text-muted">
                                    {group.blurb}
                                </p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {group.items.map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-fg/10 bg-fg/[0.03] px-3 py-1.5 text-xs text-muted transition-all duration-500 ease-glide hover:-translate-y-0.5 hover:border-accent/40 hover:text-fg"
                                        >
                                            {item}
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

/* ------------------------------------------------------------------ */

const SEGMENTS = 20

/** Segmented track — reads as a level, not as a loading bar. */
function Meter({ value, delay }: { value: number; delay: number }) {
    const filled = Math.round((value / 100) * SEGMENTS)

    return (
        <div className="mt-4 flex gap-[3px]" aria-hidden="true">
            {Array.from({ length: SEGMENTS }, (_, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0.4, scaleY: 0.55 }}
                    whileInView={{
                        opacity: i < filled ? 1 : 0.4,
                        scaleY: i < filled ? 1 : 0.55,
                    }}
                    viewport={{ once: true, margin: "-12% 0px" }}
                    transition={{ duration: 0.45, delay: delay + i * 0.022, ease: GLIDE }}
                    className={`h-2.5 flex-1 rounded-full ${
                        i < filled
                            ? "bg-gradient-to-b from-accent to-accent/60"
                            : "bg-fg/30"
                    }`}
                />
            ))}
        </div>
    )
}
