"use client"

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { navLinks, profile } from "@/lib/content"
import { Magnetic } from "@/components/ui/magnetic"

const GLIDE = [0.16, 1, 0.3, 1] as const
const sectionIds = navLinks.map((l) => l.href.replace("#", ""))

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [open, setOpen] = useState(false)
    const [activeId, setActiveId] = useState("home")
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (y) => {
        const prev = scrollY.getPrevious() ?? 0
        setScrolled(y > 40)
        // Hide on the way down, reveal the moment the user reverses — the
        // nav should never be in the way of reading.
        setHidden(y > 320 && y > prev)
    })

    /* Active-section tracking drives the sliding pill indicator. */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
                if (visible) setActiveId(visible.target.id)
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
        )
        sectionIds.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
    }, [])

    /* Lock the page while the overlay menu is open. */
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : ""
        return () => {
            document.body.style.overflow = ""
        }
    }, [open])

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    return (
        <>
            <motion.header
                className="fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-4 md:pt-6"
                animate={{ y: hidden && !open ? -110 : 0 }}
                transition={{ duration: 0.6, ease: GLIDE }}
            >
                <motion.nav
                    className={`flex w-full max-w-[1180px] items-center justify-between rounded-full px-3 py-2.5 transition-all duration-700 ease-glide md:px-4 ${
                        scrolled ? "glass-strong shadow-[0_18px_60px_-30px_rgb(0_0_0/0.6)]" : "border border-transparent"
                    }`}
                >
                    <Link
                        href="#home"
                        className="group flex items-center gap-3 pl-2 pr-4"
                        aria-label="Back to top"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inset-0 rounded-full bg-accent" />
                            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
                        </span>
                        <span className="text-sm font-medium tracking-tight">
                            {profile.firstName}
                            <span className="text-muted"> {profile.lastName}</span>
                        </span>
                    </Link>

                    {/* Desktop links with a shared sliding indicator */}
                    <div className="hidden items-center gap-1 lg:flex">
                        {navLinks.map((link) => {
                            const id = link.href.replace("#", "")
                            const isActive = activeId === id
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="relative rounded-full px-4 py-2 text-sm text-muted transition-colors duration-300 hover:text-fg"
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 rounded-full bg-fg/[0.07] ring-1 ring-inset ring-fg/10"
                                            transition={{ type: "spring", stiffness: 380, damping: 34 }}
                                        />
                                    )}
                                    <span
                                        className={`relative z-10 ${isActive ? "text-fg" : ""}`}
                                    >
                                        {link.name}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />

                        <Magnetic strength={0.2} className="hidden lg:block">
                            <Link
                                href="#contact"
                                className="group/cta relative inline-flex items-center overflow-hidden rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg"
                            >
                                <span className="absolute inset-0 translate-y-full rounded-full bg-accent transition-transform duration-700 ease-glide group-hover/cta:translate-y-0" />
                                <span className="relative z-10 transition-colors duration-500 group-hover/cta:text-white">
                                    Let&apos;s talk
                                </span>
                            </Link>
                        </Magnetic>

                        <button
                            onClick={() => setOpen((v) => !v)}
                            aria-label={open ? "Close menu" : "Open menu"}
                            aria-expanded={open}
                            className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-inset ring-fg/10 transition-colors hover:bg-fg/5 lg:hidden"
                        >
                            <span className="relative flex h-3 w-4 flex-col justify-between">
                                <motion.span
                                    className="block h-px w-full bg-fg"
                                    animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.4, ease: GLIDE }}
                                />
                                <motion.span
                                    className="block h-px w-full bg-fg"
                                    animate={open ? { opacity: 0 } : { opacity: 1 }}
                                    transition={{ duration: 0.25 }}
                                />
                                <motion.span
                                    className="block h-px w-full bg-fg"
                                    animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.4, ease: GLIDE }}
                                />
                            </span>
                        </button>
                    </div>
                </motion.nav>
            </motion.header>

            <MobileMenu open={open} onClose={() => setOpen(false)} activeId={activeId} />
        </>
    )
}

/* ------------------------------------------------------------------ */

function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    const isDark = resolvedTheme === "dark"

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full ring-1 ring-inset ring-fg/10 transition-colors hover:bg-fg/5"
        >
            {/* Rendered only after mount so server and client agree */}
            {mounted && (
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={isDark ? "moon" : "sun"}
                        initial={{ y: 14, opacity: 0, rotate: -35 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -14, opacity: 0, rotate: 35 }}
                        transition={{ duration: 0.35, ease: GLIDE }}
                        className="flex"
                    >
                        {isDark ? <Sun className="h-[17px] w-[17px]" /> : <Moon className="h-[17px] w-[17px]" />}
                    </motion.span>
                </AnimatePresence>
            )}
        </button>
    )
}

/* ------------------------------------------------------------------ */

function MobileMenu({
    open,
    onClose,
    activeId,
}: {
    open: boolean
    onClose: () => void
    activeId: string
}) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[95] flex flex-col justify-between bg-bg/90 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
                    initial={{ clipPath: "inset(0 0 100% 0)" }}
                    animate={{ clipPath: "inset(0 0 0% 0)" }}
                    exit={{ clipPath: "inset(0 0 100% 0)" }}
                    transition={{ duration: 0.75, ease: GLIDE }}
                >
                    <nav className="flex flex-col">
                        {navLinks.map((link, i) => {
                            const id = link.href.replace("#", "")
                            return (
                                <div key={link.name} className="line-clip border-b border-fg/10">
                                    <motion.div
                                        initial={{ y: "110%" }}
                                        animate={{ y: "0%" }}
                                        exit={{ y: "110%" }}
                                        transition={{
                                            duration: 0.8,
                                            ease: GLIDE,
                                            delay: open ? 0.12 + i * 0.06 : 0,
                                        }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={onClose}
                                            className="flex items-baseline justify-between py-4"
                                        >
                                            <span
                                                className={`text-[2rem] font-medium tracking-tight transition-colors ${
                                                    activeId === id ? "text-accent" : "text-fg"
                                                }`}
                                            >
                                                {link.name}
                                            </span>
                                            <span className="font-mono text-eyebrow text-muted">
                                                0{i + 1}
                                            </span>
                                        </Link>
                                    </motion.div>
                                </div>
                            )
                        })}
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: GLIDE }}
                        className="flex flex-col gap-4"
                    >
                        <div className="hairline" />
                        <a href={`mailto:${profile.email}`} className="text-sm text-muted">
                            {profile.email}
                        </a>
                        <div className="flex gap-5 text-sm">
                            <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" className="link-underline">
                                LinkedIn
                            </a>
                            <a href={profile.github} target="_blank" rel="noreferrer noopener" className="link-underline">
                                GitHub
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
