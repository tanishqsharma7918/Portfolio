/**
 * Lenis intercepts wheel events at the window, so the usual
 * `body { overflow: hidden }` does nothing to stop the page moving behind a
 * modal — and worse, Lenis keeps swallowing wheel events that belong to the
 * modal's own scroll container. Both halves have to be handled: pause the
 * instance, and mark the scrollable element with `data-lenis-prevent` so
 * Lenis leaves events inside it alone.
 */
type LenisLike = { stop: () => void; start: () => void }

declare global {
    interface Window {
        __lenis?: LenisLike
    }
}

export function lockScroll() {
    if (typeof window === "undefined") return
    window.__lenis?.stop()
    document.body.style.overflow = "hidden"
}

export function unlockScroll() {
    if (typeof window === "undefined") return
    document.body.style.overflow = ""
    window.__lenis?.start()
}
