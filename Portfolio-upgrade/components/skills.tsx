"use client"

import { motion } from "framer-motion"
import { proficiency, skillGroups } from "@/lib/content"
import { SectionHeading } from "@/components/ui/section-heading"
import { Reveal } from "@/components/ui/reveal"

const GLIDE = [0.16, 1, 0.3, 1] as const

export function Skills() {
    return (
        <section id="skills" className="shell scroll-mt-24 py-24 md:py-32">
            <SectionHeading
                index="04"
                eyebrow="Capabilities"
                lines={["The toolkit,", "and how deep it goes"]}
            />

            <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-2 lg:gap-24">
                {/* Proficiency bars */}
                <div className="flex flex-col gap-9">
                    {proficiency.map((skill, i) => (
                        <Reveal key={skill.name} delay={i * 0.06}>
                            <div className="group">
                                <div className="mb-3 flex items-baseline justify-between">
                                    <span className="text-sm font-medium">{skill.name}</span>
                                    <span className="font-mono text-[11px] tabular-nums text-muted">
                                        {skill.value}%
                                    </span>
                                </div>
                                <div className="h-[3px] w-full overflow-hidden rounded-full bg-fg/10">
                                    <motion.div
                                        className="h-full rounded-full bg-gradient-to-r from-accent to-gold"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: skill.value / 100 }}
                                        viewport={{ once: true, margin: "-15% 0px" }}
                                        transition={{ duration: 1.4, delay: 0.1 + i * 0.08, ease: GLIDE }}
                                        style={{ transformOrigin: "left" }}
                                    />
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Grouped tags */}
                <div className="flex flex-col gap-10">
                    {skillGroups.map((group, i) => (
                        <Reveal key={group.title} delay={i * 0.08}>
                            <div className="border-t border-fg/10 pt-6">
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="font-mono text-eyebrow text-accent">
                                        0{i + 1}
                                    </span>
                                    <span className="text-sm font-medium">{group.title}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-fg/10 bg-fg/[0.02] px-3.5 py-2 text-xs text-muted transition-all duration-500 ease-glide hover:-translate-y-0.5 hover:border-accent/40 hover:text-fg"
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
