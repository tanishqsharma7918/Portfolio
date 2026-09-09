"use client"

import type { ReactNode } from "react"
import { MaskLines, Reveal } from "./reveal"

export function SectionHeading({
    index,
    eyebrow,
    lines,
    lead,
    align = "left",
    action,
}: {
    index: string
    eyebrow: string
    lines: string[]
    lead?: string
    align?: "left" | "center"
    action?: ReactNode
}) {
    const centered = align === "center"

    return (
        <div
            className={
                centered
                    ? "flex flex-col items-center text-center"
                    : "flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
            }
        >
            <div className={centered ? "max-w-2xl" : "max-w-3xl"}>
                <Reveal>
                    <div
                        className={`mb-6 flex items-center gap-3 ${centered ? "justify-center" : ""}`}
                    >
                        <span className="font-mono text-eyebrow uppercase text-accent">{index}</span>
                        <span className="h-px w-8 bg-fg/25" />
                        <span className="eyebrow">{eyebrow}</span>
                    </div>
                </Reveal>

                <MaskLines
                    lines={lines}
                    className="text-headline font-medium"
                    delay={0.05}
                />

                {lead ? (
                    <Reveal delay={0.15}>
                        <p
                            className={`mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg ${centered ? "mx-auto" : ""}`}
                        >
                            {lead}
                        </p>
                    </Reveal>
                ) : null}
            </div>

            {action ? <Reveal delay={0.2}>{action}</Reveal> : null}
        </div>
    )
}
