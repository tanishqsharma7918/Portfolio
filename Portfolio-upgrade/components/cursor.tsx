"use client"

import { useEffect, useRef } from "react"

const INTERACTIVE =
    "a, button, [role='button'], input, textarea, select, [data-cursor-label], [data-cursor='hover']"

/**
 * A two-part cursor: a dot pinned exactly to the pointer, and a ring that
 * trails it on a spring.
 *
 * Everything here is deliberately kept out of React's render path. The dot
 * is positioned inside the pointermove handler itself rather than on the
 * next animation frame, so it lands on the same pixel the OS cursor would
 * have — a frame of latency is the difference between "precise" and
 * "swimming". Hover state comes from pointerover/pointerout, which fire
 * only when the target actually changes, instead of walking up the tree on
 * every move.
 */
export function Cursor() {
    const rootRef = useRef<HTMLDivElement | null>(null)
    const dotRef = useRef<HTMLDivElement | null>(null)
    const ringRef = useRef<HTMLDivElement | null>(null)
    const labelRef = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {
        const root = rootRef.current
        const dot = dotRef.current
        const ring = ringRef.current
        const labelEl = labelRef.current
        if (!root || !dot || !ring || !labelEl) return

        const fine = window.matchMedia("(pointer: fine)")
        const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)")
        if (!fine.matches || !motionOk.matches) return

        document.documentElement.dataset.cursor = "on"

        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
        const trail = { x: pos.x, y: pos.y }
        let scale = 1
        let targetScale = 1
        let pressed = false
        let shown = false
        let raf = 0

        const showOnce = () => {
            if (shown) return
            shown = true
            root.style.opacity = "1"
        }

        function place(e: PointerEvent) {
            pos.x = e.clientX
            pos.y = e.clientY
            // Written synchronously — the dot must not wait for rAF.
            dot!.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) translate(-50%,-50%)`
            showOnce()
        }

        function onOver(e: PointerEvent) {
            const el = (e.target as Element | null)?.closest<HTMLElement>(INTERACTIVE)
            if (!el) return
            const text = el.dataset.cursorLabel ?? ""
            labelEl!.textContent = text
            targetScale = text ? 3.1 : 2
            ring!.style.backgroundColor = "rgba(127,127,127,0.22)"
        }

        function onOut(e: PointerEvent) {
            const from = (e.target as Element | null)?.closest<HTMLElement>(INTERACTIVE)
            if (!from) return
            const to = (e.relatedTarget as Element | null)?.closest<HTMLElement>(INTERACTIVE)
            if (to) return
            labelEl!.textContent = ""
            targetScale = 1
            ring!.style.backgroundColor = "transparent"
        }

        function onDown() {
            pressed = true
        }
        function onUp() {
            pressed = false
        }
        function onLeave() {
            shown = false
            root!.style.opacity = "0"
        }

        function loop() {
            raf = requestAnimationFrame(loop)
            // Snappy enough to feel attached, slow enough to read as a trail.
            trail.x += (pos.x - trail.x) * 0.3
            trail.y += (pos.y - trail.y) * 0.3
            const want = pressed ? targetScale * 0.8 : targetScale
            scale += (want - scale) * 0.2
            ring!.style.transform = `translate3d(${trail.x}px,${trail.y}px,0) translate(-50%,-50%) scale(${scale.toFixed(3)})`
        }
        raf = requestAnimationFrame(loop)

        // pointerrawupdate delivers coalesced moves ahead of pointermove where
        // it exists, shaving a few ms off the dot's latency.
        const moveEvent = "onpointerrawupdate" in window ? "pointerrawupdate" : "pointermove"
        window.addEventListener(moveEvent, place as EventListener, { passive: true })
        window.addEventListener("pointerover", onOver, { passive: true })
        window.addEventListener("pointerout", onOut, { passive: true })
        window.addEventListener("pointerdown", onDown, { passive: true })
        window.addEventListener("pointerup", onUp, { passive: true })
        document.addEventListener("pointerleave", onLeave)

        return () => {
            cancelAnimationFrame(raf)
            delete document.documentElement.dataset.cursor
            window.removeEventListener(moveEvent, place as EventListener)
            window.removeEventListener("pointerover", onOver)
            window.removeEventListener("pointerout", onOut)
            window.removeEventListener("pointerdown", onDown)
            window.removeEventListener("pointerup", onUp)
            document.removeEventListener("pointerleave", onLeave)
        }
    }, [])

    return (
        <div
            ref={rootRef}
            className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block"
            aria-hidden="true"
            style={{ opacity: 0, transition: "opacity 200ms ease" }}
        >
            {/* Blend is scoped to the two small elements. On a full-viewport
                layer it forces the compositor to re-blend the whole page every
                frame, which is what made this lag. */}
            <div
                ref={ringRef}
                className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 mix-blend-difference will-change-transform"
                style={{ transform: "translate3d(-100px,-100px,0)" }}
            >
                <span
                    ref={labelRef}
                    className="whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.18em] text-white"
                />
            </div>
            <div
                ref={dotRef}
                className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white mix-blend-difference will-change-transform"
                style={{ transform: "translate3d(-100px,-100px,0)" }}
            />
        </div>
    )
}
