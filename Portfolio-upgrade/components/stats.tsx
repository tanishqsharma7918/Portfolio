"use client"

import { stats } from "@/lib/content"
import { Counter, Reveal } from "@/components/ui/reveal"

/**
 * A measured band rather than four floating numbers. Vertical rules and a
 * shared baseline do the aligning, so the figures read as one set of results
 * instead of four unrelated brags — and the unit sits tight against the
 * numeral instead of drifting away from it at large sizes.
 */
export function Stats() {
    return (
        <section className="shell py-16 md:py-24">
            <div className="panel px-2 py-10 md:px-4 md:py-14">
                <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-y-0">
                    {stats.map((stat, i) => (
                        <Reveal key={stat.label} delay={i * 0.08}>
                            <div
                                className={`group relative flex h-full flex-col items-center px-5 text-center md:px-8 ${
                                    i % 2 === 1 ? "border-l border-fg/10" : ""
                                } ${i > 0 ? "md:border-l md:border-fg/10" : "md:border-l-0"}`}
                            >
                                <span className="flex items-baseline justify-center whitespace-nowrap font-medium leading-none tracking-tight">
                                    <Counter
                                        value={stat.value}
                                        prefix={stat.prefix}
                                        className="text-[3rem] tabular-nums md:text-[3.75rem]"
                                    />
                                    <span className="ml-0.5 text-[1.6rem] text-accent md:text-[2rem]">
                                        {stat.suffix}
                                    </span>
                                </span>

                                <span className="mt-5 text-sm font-medium">{stat.label}</span>

                                <span className="mt-2 max-w-[22ch] text-xs leading-relaxed text-muted">
                                    {stat.note}
                                </span>

                                <span className="mt-5 h-px w-8 origin-center scale-x-0 bg-accent transition-transform duration-700 ease-glide group-hover:scale-x-100" />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
