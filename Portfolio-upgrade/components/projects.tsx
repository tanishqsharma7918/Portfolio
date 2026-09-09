"use client"

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Github, X } from "lucide-react"
import { projects, type Project } from "@/lib/content"
import { useMediaQuery } from "@/lib/use-media-query"
import { SectionHeading } from "@/components/ui/section-heading"
import { Reveal } from "@/components/ui/reveal"

const GLIDE = [0.16, 1, 0.3, 1] as const

export function Projects() {
    const container = useRef<HTMLDivElement | null>(null)
    const [open, setOpen] = useState<Project | null>(null)

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    })

    return (
        <section id="work" className="scroll-mt-24 py-24 md:py-32">
            <div className="shell">
                <SectionHeading
                    index="02"
                    eyebrow="Selected work"
                    lines={["Systems that", "earn their keep"]}
                    lead="Five builds where the measurable outcome mattered more than the demo. Open any card for the full case study."
                />
            </div>

            {/* Each card pins, then the next glides over it — the stack is the
                transition, so there is never a hard cut between projects. */}
            <div ref={container} className="relative mt-10 md:-mt-[12vh]">
                {projects.map((project, i) => (
                    <StackCard
                        key={project.id}
                        project={project}
                        index={i}
                        total={projects.length}
                        progress={scrollYProgress}
                        onOpen={() => setOpen(project)}
                    />
                ))}
            </div>

            <CaseStudy project={open} onClose={() => setOpen(null)} />
        </section>
    )
}

/* ------------------------------------------------------------------ */

function StackCard({
    project,
    index,
    total,
    progress,
    onOpen,
}: {
    project: Project
    index: number
    total: number
    progress: ReturnType<typeof useScroll>["scrollYProgress"]
    onOpen: () => void
}) {
    // Cards shrink as they are buried, so the stack reads as depth
    const targetScale = 1 - (total - index) * 0.035
    const scale = useTransform(progress, [index / total, 1], [1, targetScale])

    // The stack only works while a card is shorter than the viewport. On
    // phones the cards are taller than the screen, so they run as a normal
    // column instead of pinning and clipping each other.
    const stacked = useMediaQuery("(min-width: 768px) and (min-height: 640px)")

    return (
        <div
            className={
                stacked
                    ? "sticky top-0 flex h-[100svh] items-center justify-center px-4 md:px-8"
                    : "flex justify-center px-4 pb-6"
            }
        >
            <motion.article
                style={stacked ? { scale, top: `calc(-2vh + ${index * 18}px)` } : undefined}
                className="panel relative w-full max-w-[1100px] origin-top"
            >
                {/* Per-project accent wash keeps the stack from feeling uniform */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-70"
                    style={{
                        background: `radial-gradient(120% 90% at 88% 6%, rgb(${project.accent} / 0.22), transparent 58%)`,
                    }}
                />

                <div className="relative grid gap-8 p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] md:gap-12 md:p-12">
                    <div className="flex flex-col">
                        <div className="mb-7 flex items-center gap-4">
                            <span
                                className="font-mono text-eyebrow"
                                style={{ color: `rgb(${project.accent})` }}
                            >
                                {project.index}
                            </span>
                            <span className="h-px w-10 bg-fg/20" />
                            <span className="eyebrow">{project.year}</span>
                        </div>

                        <h3 className="text-[1.9rem] font-medium leading-[1.05] tracking-tight md:text-[2.9rem]">
                            {project.title}
                        </h3>
                        <p className="accent-serif mt-2 text-lg md:text-xl">{project.subtitle}</p>

                        <p className="mt-6 max-w-lg text-pretty text-sm leading-relaxed text-muted md:text-base">
                            {project.summary}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-2">
                            {project.stack.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-fg/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="mt-9 flex flex-wrap items-center gap-3">
                            <button
                                onClick={onOpen}
                                data-cursor-label="Open"
                                className="group/open relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg"
                            >
                                <span className="absolute inset-0 translate-y-full bg-accent transition-transform duration-700 ease-glide group-hover/open:translate-y-0" />
                                <span className="relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover/open:text-white">
                                    Case study
                                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-glide group-hover/open:translate-x-0.5 group-hover/open:-translate-y-0.5" />
                                </span>
                            </button>

                            {project.repo ? (
                                <a
                                    href={project.repo}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-inset ring-fg/15 transition-colors hover:bg-fg/5"
                                    aria-label={`${project.title} on GitHub`}
                                    data-cursor-label="Code"
                                >
                                    <Github className="h-4 w-4" />
                                </a>
                            ) : null}

                            {project.live ? (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="link-underline text-sm text-muted transition-colors hover:text-fg"
                                    data-cursor-label="Live"
                                >
                                    Live demo
                                </a>
                            ) : null}
                        </div>
                    </div>

                    {/* Metric board — the proof, not a screenshot placeholder */}
                    <div className="flex flex-col justify-between gap-6 rounded-2xl border border-fg/10 bg-fg/[0.02] p-6 md:p-8">
                        <span className="eyebrow">Outcome</span>
                        <div className="flex flex-col gap-7">
                            {project.metrics.map((metric) => (
                                <div key={metric.label} className="flex flex-col gap-1">
                                    <span
                                        className="text-[2rem] font-medium leading-none tracking-tight md:text-[2.6rem]"
                                        style={{ color: `rgb(${project.accent})` }}
                                    >
                                        {metric.value}
                                    </span>
                                    <span className="text-xs uppercase tracking-[0.14em] text-muted">
                                        {metric.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.article>
        </div>
    )
}

/* ------------------------------------------------------------------ */

function CaseStudy({ project, onClose }: { project: Project | null; onClose: () => void }) {
    useEffect(() => {
        if (!project) return
        document.body.style.overflow = "hidden"
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
        window.addEventListener("keydown", onKey)
        return () => {
            document.body.style.overflow = ""
            window.removeEventListener("keydown", onKey)
        }
    }, [project, onClose])

    return (
        <AnimatePresence>
            {project && (
                <>
                    <motion.div
                        className="fixed inset-0 z-[150] bg-bg/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={onClose}
                    />

                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${project.title} case study`}
                        className="fixed inset-x-0 bottom-0 z-[160] max-h-[92svh] overflow-y-auto rounded-t-[2rem] border-t border-fg/10 bg-bg"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.7, ease: GLIDE }}
                    >
                        {/* Drag handle — signals the sheet came from below */}
                        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-fg/10 bg-bg/90 px-6 py-4 backdrop-blur-xl md:px-12">
                            <div className="flex items-center gap-4">
                                <span
                                    className="font-mono text-eyebrow"
                                    style={{ color: `rgb(${project.accent})` }}
                                >
                                    {project.index}
                                </span>
                                <span className="text-sm font-medium">{project.title}</span>
                            </div>
                            <button
                                onClick={onClose}
                                aria-label="Close case study"
                                className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-inset ring-fg/15 transition-colors hover:bg-fg/5"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="mx-auto w-full max-w-[900px] px-6 pb-20 pt-10 md:px-12">
                            <h2 className="text-headline font-medium">{project.title}</h2>
                            <p className="accent-serif mt-3 text-xl md:text-2xl">{project.subtitle}</p>

                            <p className="mt-8 text-pretty text-lg leading-relaxed text-muted">
                                {project.summary}
                            </p>

                            <div className="mt-10 grid grid-cols-3 gap-4">
                                {project.metrics.map((metric) => (
                                    <div
                                        key={metric.label}
                                        className="rounded-2xl border border-fg/10 bg-fg/[0.02] p-5"
                                    >
                                        <div
                                            className="text-2xl font-medium tracking-tight md:text-3xl"
                                            style={{ color: `rgb(${project.accent})` }}
                                        >
                                            {metric.value}
                                        </div>
                                        <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted">
                                            {metric.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12">
                                <span className="eyebrow">What I built</span>
                                <ul className="mt-6 flex flex-col gap-5">
                                    {project.highlights.map((point, i) => (
                                        <li key={i} className="flex gap-4 border-t border-fg/10 pt-5">
                                            <span className="mt-1 font-mono text-eyebrow text-muted">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span className="text-pretty text-base leading-relaxed text-fg/85">
                                                {point}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-12">
                                <span className="eyebrow">Stack</span>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {project.stack.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-fg/10 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {(project.repo || project.live) && (
                                <div className="mt-12 flex flex-wrap gap-3">
                                    {project.repo ? (
                                        <a
                                            href={project.repo}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85"
                                        >
                                            <Github className="h-4 w-4" />
                                            View repository
                                        </a>
                                    ) : null}
                                    {project.live ? (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="inline-flex items-center gap-2 rounded-full ring-1 ring-inset ring-fg/20 px-6 py-3 text-sm font-medium transition-colors hover:bg-fg/5"
                                        >
                                            Open live demo
                                            <ArrowUpRight className="h-4 w-4" />
                                        </a>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
