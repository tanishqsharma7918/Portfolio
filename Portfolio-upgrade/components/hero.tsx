"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { profile } from "@/lib/content"
import { GlideLink } from "@/components/ui/glide-button"

const GLIDE = [0.16, 1, 0.3, 1] as const

export function Hero() {
    const ref = useRef<HTMLElement | null>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })

    // The hero recedes as the page moves on, so the galaxy takes over
    const y = useTransform(scrollYProgress, [0, 1], [0, 130])
    const opacity = useTransform(scrollYProgress, [0, 0.72], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

    return (
        <section
            id="home"
            ref={ref}
            className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-32 pt-28"
        >
            <motion.div style={{ y, opacity, scale }} className="shell">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: GLIDE }}
                        className="mb-9 flex items-center gap-3 rounded-full border border-fg/10 bg-fg/[0.03] px-4 py-2 backdrop-blur-md"
                    >
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inset-0 rounded-full bg-emerald-400" />
                            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-400" />
                        </span>
                        <span className="font-mono text-eyebrow uppercase text-muted">
                            {profile.status}
                        </span>
                    </motion.div>

                    {/* One line, one typeface. The premium beat is a slow
                        specular sweep across the letters, not a font swap. */}
                    <h1 className="line-clip w-full">
                        <motion.span
                            className="wordmark"
                            initial={{ y: "112%" }}
                            animate={{ y: "0%" }}
                            transition={{ duration: 1.25, delay: 0.25, ease: GLIDE }}
                        >
                            {profile.name}
                        </motion.span>
                    </h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.7, ease: GLIDE }}
                        className="mt-9 flex flex-col items-center gap-6"
                    >
                        <div className="flex items-center gap-3 text-sm text-muted md:text-base">
                            <span className="h-px w-8 bg-fg/20" />
                            <RoleRotator roles={profile.roles} />
                            <span className="h-px w-8 bg-fg/20" />
                        </div>

                        <p className="max-w-xl text-balance text-base leading-relaxed text-muted md:text-lg">
                            {profile.tagline}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.85, ease: GLIDE }}
                        className="mt-11 flex flex-wrap items-center justify-center gap-3"
                    >
                        <GlideLink href="#work" variant="solid" label="Browse">
                            Selected work
                            <ArrowUpRight className="h-4 w-4" />
                        </GlideLink>
                        <GlideLink href="#contact" variant="outline" label="Say hi">
                            Get in touch
                        </GlideLink>
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom rail: quiet metadata, the way a studio site signs its work */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="shell absolute inset-x-0 bottom-6 grid grid-cols-1 items-end md:grid-cols-3"
            >
                <div className="hidden flex-col gap-1.5 md:flex">
                    <span className="eyebrow">Based in</span>
                    <span className="text-sm">{profile.shortLocation}</span>
                </div>

                <Link
                    href="#about"
                    aria-label="Scroll to about"
                    className="hidden flex-col items-center gap-2 justify-self-center [@media(min-height:680px)]:flex group"
                >
                    <span className="eyebrow">Scroll</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-inset ring-fg/15 transition-colors group-hover:bg-fg/5">
                        <motion.span
                            animate={{ y: [0, 4, 0] }}
                            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowDown className="h-4 w-4" />
                        </motion.span>
                    </span>
                </Link>

            </motion.div>
        </section>
    )
}

/* ------------------------------------------------------------------ */

function RoleRotator({ roles }: { roles: string[] }) {
    const [i, setI] = useState(0)

    useEffect(() => {
        const id = window.setInterval(() => setI((v) => (v + 1) % roles.length), 2600)
        return () => window.clearInterval(id)
    }, [roles.length])

    return (
        // Fixed height so the line above never reflows as words swap
        <span className="relative block h-6 w-[15rem] overflow-hidden md:w-[17rem]">
            {roles.map((role, index) => (
                <motion.span
                    key={role}
                    className="absolute inset-0 flex items-center justify-center whitespace-nowrap font-mono text-eyebrow uppercase text-fg"
                    initial={false}
                    animate={
                        index === i
                            ? { y: "0%", opacity: 1 }
                            : { y: index < i ? "-120%" : "120%", opacity: 0 }
                    }
                    transition={{ duration: 0.75, ease: GLIDE }}
                >
                    {role}
                </motion.span>
            ))}
        </span>
    )
}

