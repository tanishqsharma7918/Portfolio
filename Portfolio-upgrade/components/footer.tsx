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
            {/* Oversized wordmark — the sign-off, not a nav element */}
            <div className="mask-fade-x overflow-hidden pt-16">
                <div
                    aria-hidden="true"
                    className="select-none whitespace-nowrap text-center text-[clamp(3.5rem,15vw,13rem)] font-medium leading-none tracking-tighter text-fg/[0.06]"
                >
                    {profile.name}
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
