"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { testimonials } from "@/lib/content"
import { SectionHeading } from "@/components/ui/section-heading"
import { Reveal } from "@/components/ui/reveal"

const GLIDE = [0.16, 1, 0.3, 1] as const

/**
 * Recommendations run long, and a wall of six paragraphs gets skipped. Each
 * one leads with the sentence that carries it, set large enough to read as a
 * pull quote, with the full text one click away — so the section works both
 * for someone skimming and for someone checking the claim.
 */
export function Praise() {
    return (
        <section id="praise" className="shell scroll-mt-24 py-24 md:py-32">
            <SectionHeading
                eyebrow="What people say"
                lines={["Words from people", "I worked alongside"]}
                lead="Unedited recommendations from a supervisor and a project collaborator."
            />

            <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
                {testimonials.map((t, i) => (
                    <Reveal key={t.name} delay={i * 0.1} y={34}>
                        <Card testimonial={t} />
                    </Reveal>
                ))}
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */

function Card({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
    const [expanded, setExpanded] = useState(false)
    const { accent } = testimonial

    return (
        <article className="panel group flex h-full flex-col p-7 transition-colors duration-500 hover:border-accent/25 md:p-9">
            {/* Accent wash keyed to the person, so the two never blur together */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                    background: `radial-gradient(105% 78% at 92% 4%, rgb(${accent} / 0.16), transparent 62%)`,
                }}
            />

            <div className="relative flex flex-1 flex-col">
                <span
                    aria-hidden="true"
                    className="font-serif text-[3.5rem] leading-[0.6] text-fg/15"
                >
                    &ldquo;
                </span>

                <p className="mt-5 text-pretty text-lg leading-relaxed text-fg/90 md:text-xl">
                    {testimonial.pull}
                </p>

                <AnimatePresence initial={false}>
                    {expanded && (
                        <motion.div
                            key="full"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.6, ease: GLIDE }}
                            className="overflow-hidden"
                        >
                            <div className="flex flex-col gap-4 pt-6">
                                {testimonial.body.map((para, i) => (
                                    <p
                                        key={i}
                                        className="text-pretty text-sm leading-relaxed text-muted"
                                    >
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setExpanded((v) => !v)}
                    aria-expanded={expanded}
                    className="link-underline mt-6 w-fit text-sm text-muted transition-colors hover:text-fg"
                >
                    {expanded ? "Show less" : "Read the full recommendation"}
                </button>

                <div className="mt-auto flex items-center gap-4 pt-9">
                    <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-xs tracking-wider"
                        style={{
                            backgroundColor: `rgb(${accent} / 0.14)`,
                            color: `rgb(${accent})`,
                        }}
                    >
                        {testimonial.initials}
                    </span>
                    <div className="min-w-0">
                        <div className="text-sm font-medium">{testimonial.name}</div>
                        <div className="text-pretty text-xs leading-relaxed text-muted">
                            {testimonial.role}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}
