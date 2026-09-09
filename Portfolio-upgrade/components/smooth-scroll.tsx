"use client"

import { useEffect } from "react"
import Lenis from "lenis"

/**
 * Lenis drives every scroll on the page. Anchor links are intercepted so
 * they glide instead of jumping, and reduced-motion users keep the native
 * behaviour untouched.
 */
export function SmoothScroll() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        const lenis = new Lenis({
            duration: 1.15,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.6,
        })

        let raf = 0
        function loop(time: number) {
            lenis.raf(time)
            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)

        function onClick(e: MouseEvent) {
            const el = (e.target as HTMLElement | null)?.closest("a[href^='#']")
            if (!el) return
            const href = el.getAttribute("href")
            if (!href || href === "#") return
            const target = document.querySelector(href)
            if (!target) return
            e.preventDefault()
            lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.4 })
        }

        document.addEventListener("click", onClick)

        // Other components ask for a glide without importing Lenis themselves
        function onScrollTo(e: Event) {
            const detail = (e as CustomEvent<{ target: string | number }>).detail
            if (!detail) return
            lenis.scrollTo(detail.target as never, { offset: -80, duration: 1.4 })
        }
        window.addEventListener("glide-to", onScrollTo)

        return () => {
            cancelAnimationFrame(raf)
            document.removeEventListener("click", onClick)
            window.removeEventListener("glide-to", onScrollTo)
            lenis.destroy()
        }
    }, [])

    return null
}
