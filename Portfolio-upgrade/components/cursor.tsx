"use client"

import { useEffect, useRef, useState } from "react"

/**
 * A two-part cursor: a solid dot that tracks precisely, and a ring that
 * lags behind on a spring. The ring swells over anything interactive and
 * can carry a label supplied via `data-cursor-label`.
 */
export function Cursor() {
    const dotRef = useRef<HTMLDivElement | null>(null)
    const ringRef = useRef<HTMLDivElement | null>(null)
    const [label, setLabel] = useState("")
    const [active, setActive] = useState(false)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const fine = window.matchMedia("(pointer: fine)").matches
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (!fine || reduced) return

        document.documentElement.dataset.cursor = "on"

        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
        const ring = { x: pos.x, y: pos.y }
        let raf = 0
        let scale = 1
        let targetScale = 1

        function onMove(e: PointerEvent) {
            pos.x = e.clientX
            pos.y = e.clientY
            setVisible(true)

            const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
                "a, button, [role='button'], input, textarea, select, [data-cursor-label], [data-cursor='hover']"
            )
            if (el) {
                setActive(true)
                targetScale = el.dataset.cursorLabel ? 3.2 : 2.1
                setLabel(el.dataset.cursorLabel ?? "")
            } else {
                setActive(false)
                targetScale = 1
                setLabel("")
            }
        }

        function onDown() {
            targetScale *= 0.72
        }
        function onUp() {
            targetScale = active ? 2.1 : 1
        }
        function onLeave() {
            setVisible(false)
        }

        function loop() {
            raf = requestAnimationFrame(loop)
            ring.x += (pos.x - ring.x) * 0.16
            ring.y += (pos.y - ring.y) * 0.16
            scale += (targetScale - scale) * 0.16

            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`
            }
        }
        raf = requestAnimationFrame(loop)

        window.addEventListener("pointermove", onMove, { passive: true })
        window.addEventListener("pointerdown", onDown)
        window.addEventListener("pointerup", onUp)
        document.addEventListener("pointerleave", onLeave)

        return () => {
            cancelAnimationFrame(raf)
            delete document.documentElement.dataset.cursor
            window.removeEventListener("pointermove", onMove)
            window.removeEventListener("pointerdown", onDown)
            window.removeEventListener("pointerup", onUp)
            document.removeEventListener("pointerleave", onLeave)
        }
        // `active` is only read inside handlers for a cosmetic bounce-back
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            className="pointer-events-none fixed inset-0 z-[9999] hidden mix-blend-difference lg:block"
            aria-hidden="true"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 260ms ease" }}
        >
            <div
                ref={ringRef}
                className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 will-change-transform"
                style={{ backgroundColor: active ? "rgba(255,255,255,0.10)" : "transparent" }}
            >
                {label ? (
                    <span className="whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.18em] text-white">
                        {label}
                    </span>
                ) : null}
            </div>
            <div
                ref={dotRef}
                className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white will-change-transform"
                style={{ opacity: active ? 0 : 1, transition: "opacity 200ms ease" }}
            />
        </div>
    )
}
