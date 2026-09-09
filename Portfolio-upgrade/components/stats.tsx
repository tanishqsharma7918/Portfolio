"use client"

import { stats } from "@/lib/content"
import { Counter, Reveal } from "@/components/ui/reveal"

export function Stats() {
    return (
        <section className="shell py-20 md:py-28">
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-10">
                {stats.map((stat, i) => (
                    <Reveal key={stat.label} delay={i * 0.08}>
                        <div className="group relative flex flex-col gap-2">
                            <span className="font-mono text-eyebrow text-accent">
                                0{i + 1}
                            </span>
                            <Counter
                                value={stat.value}
                                prefix={stat.prefix}
                                suffix={stat.suffix}
                                className="text-[2.6rem] font-medium leading-none tracking-tight tabular-nums md:text-[3.4rem]"
                            />
                            <span className="mt-1 text-sm font-medium">{stat.label}</span>
                            <span className="text-xs leading-relaxed text-muted">{stat.note}</span>
                            <span className="mt-4 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-glide group-hover:scale-x-100" />
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}
