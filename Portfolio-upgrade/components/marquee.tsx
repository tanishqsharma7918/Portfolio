"use client"

import { marqueeItems } from "@/lib/content"

/**
 * Two identical tracks scrolling as one 200%-wide row, translated -50%.
 * The seam lands exactly where the second copy begins, so the loop is
 * invisible without any JS measuring.
 */
export function Marquee() {
    const row = [...marqueeItems, ...marqueeItems]

    return (
        <section
            aria-hidden="true"
            className="relative border-y border-fg/10 py-6 md:py-8"
        >
            <div className="mask-fade-x flex overflow-hidden">
                <div className="flex w-max animate-marquee items-center gap-10 pr-10 md:gap-14 md:pr-14">
                    {row.map((item, i) => (
                        <span key={`${item}-${i}`} className="flex items-center gap-10 md:gap-14">
                            <span className="whitespace-nowrap text-lg font-medium tracking-tight text-muted md:text-2xl">
                                {item}
                            </span>
                            <span className="h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}
