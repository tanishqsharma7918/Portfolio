"use client"

import { MotionConfig } from "framer-motion"
import type { ReactNode } from "react"

/**
 * CSS `prefers-reduced-motion` overrides cannot reach Framer's JS-driven
 * animations. `reducedMotion="user"` makes it skip transform and layout
 * animation for those visitors while still fading content in, so nothing
 * ends up stranded off-screen.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
