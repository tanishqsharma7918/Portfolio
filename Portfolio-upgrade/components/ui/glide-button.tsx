"use client"

import Link from "next/link"
import { forwardRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Magnetic } from "./magnetic"

type Variant = "solid" | "outline" | "ghost"

const base =
    "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full " +
    "px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-500 ease-glide " +
    "disabled:pointer-events-none disabled:opacity-50"

const variants: Record<Variant, string> = {
    solid: "bg-fg text-bg",
    outline: "border border-fg/25 text-fg hover:border-fg/50",
    ghost: "text-fg",
}

/**
 * The fill sweeps up from the bottom on hover and, critically, sweeps
 * *out through the top* on leave — so the motion never reverses, which is
 * what makes it read as expensive rather than as a hover state.
 */
function Fill({ variant }: { variant: Variant }) {
    return (
        <span
            aria-hidden="true"
            className={cn(
                "absolute inset-0 -z-0 translate-y-full rounded-full transition-transform duration-700 ease-glide",
                "group-hover/btn:translate-y-0",
                variant === "solid" ? "bg-accent" : "bg-fg"
            )}
        />
    )
}

export const GlideButton = forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: Variant
        magnetic?: boolean
        children: ReactNode
    }
>(function GlideButton(
    { variant = "solid", magnetic = true, className, children, ...props },
    ref
) {
    const inner = (
        <button ref={ref} className={cn(base, variants[variant], className)} {...props}>
            <Fill variant={variant} />
            <span
                className={cn(
                    "relative z-10 flex items-center gap-2.5 transition-colors duration-500 ease-glide",
                    variant === "solid"
                        ? "group-hover/btn:text-white"
                        : "group-hover/btn:text-bg"
                )}
            >
                {children}
            </span>
        </button>
    )
    return magnetic ? <Magnetic className="inline-block">{inner}</Magnetic> : inner
})

export function GlideLink({
    href,
    variant = "outline",
    magnetic = true,
    className,
    children,
    external,
    label,
}: {
    href: string
    variant?: Variant
    magnetic?: boolean
    className?: string
    children: ReactNode
    external?: boolean
    label?: string
}) {
    const inner = (
        <Link
            href={href}
            data-cursor-label={label}
            {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
            className={cn(base, variants[variant], className)}
        >
            <Fill variant={variant} />
            <span
                className={cn(
                    "relative z-10 flex items-center gap-2.5 transition-colors duration-500 ease-glide",
                    variant === "solid"
                        ? "group-hover/btn:text-white"
                        : "group-hover/btn:text-bg"
                )}
            >
                {children}
            </span>
        </Link>
    )
    return magnetic ? <Magnetic className="inline-block">{inner}</Magnetic> : inner
}
