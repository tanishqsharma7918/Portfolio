"use client"

import Link from "next/link"
import { ArrowUp } from "lucide-react"
import { navLinks, profile } from "@/lib/content"

/**
 * Centred and stacked rather than split left/right. The previous layout put
 * the nav on one side and three separate stacks on the other, so nothing
 * shared a baseline and the copyright sat alone in a row built to space two
 * things apart. A single centred column reads deliberately at every width and
 * needs no separate mobile arrangement — the rows simply wrap.
 */
export function Footer() {
    return (
        <footer className="relative border-t border-fg/10">
            {/* The sign-off, running as a banner. Same technique as the tools
                marquee: two identical tracks as one 200%-wide row translated
                -50%, so the seam falls exactly where the second copy starts
                and the loop needs no measuring. Slower than the tools strip —
                it is a watermark, not a read. */}
            <div aria-hidden="true" className="mask-fade-x flex overflow-hidden pt-14">
                <div className="flex w-max animate-marquee-slow items-center">
                    {Array.from({ length: 8 }, (_, i) => (
                        <span key={i} className="flex items-center">
                            <span className="select-none whitespace-nowrap text-[clamp(2.25rem,7vw,5.5rem)] font-medium leading-none tracking-tight text-fg/[0.06]">
                                {profile.name}
                            </span>
                            <span className="mx-8 h-1.5 w-1.5 shrink-0 rounded-full bg-fg/[0.06] md:mx-12" />
                        </span>
                    ))}
                </div>
            </div>

            <div className="shell flex flex-col items-center gap-9 pb-12 pt-10 md:pb-14">
                <div className="hairline w-full" />

                <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-1 sm:gap-x-9">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="link-underline inline-flex min-h-[44px] items-center text-sm text-muted transition-colors hover:text-fg"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center justify-center gap-5">
                    {[
                        { label: "LinkedIn", href: profile.linkedin },
                        { label: "GitHub", href: profile.github },
                        { label: "Email", href: `mailto:${profile.email}` },
                    ].map((item, i) => (
                        <div key={item.label} className="flex items-center gap-5">
                            {i > 0 ? (
                                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-fg/20" />
                            ) : null}
                            <a
                                href={item.href}
                                target={item.href.startsWith("mailto") ? undefined : "_blank"}
                                rel="noreferrer noopener"
                                className="link-underline inline-flex min-h-[44px] items-center text-sm text-muted transition-colors hover:text-fg"
                            >
                                {item.label}
                            </a>
                        </div>
                    ))}
                </div>

                <Link
                    href="#home"
                    className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full px-5 py-2 text-sm text-muted ring-1 ring-inset ring-fg/10 transition-colors hover:bg-fg/5 hover:text-fg"
                >
                    Back to top
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-fg/5 transition-transform duration-500 ease-glide group-hover:-translate-y-1">
                        <ArrowUp className="h-3.5 w-3.5" />
                    </span>
                </Link>

                <div className="hairline w-full" />

                <p className="text-center text-xs leading-relaxed text-muted">
                    © {new Date().getFullYear()} {profile.name}. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
