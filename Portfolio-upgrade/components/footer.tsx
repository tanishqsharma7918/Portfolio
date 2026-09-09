"use client"

import Link from "next/link"
import { ArrowUp } from "lucide-react"
import { navLinks, profile } from "@/lib/content"

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

            <div className="shell flex flex-col gap-10 py-12">
                <div className="hairline" />

                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium">{profile.name}</span>
                        <span className="text-sm text-muted">{profile.role}</span>
                        <a
                            href={`mailto:${profile.email}`}
                            className="link-underline mt-2 w-fit text-sm text-muted"
                        >
                            {profile.email}
                        </a>
                    </div>

                    <nav className="flex flex-wrap gap-x-8 gap-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="link-underline text-sm text-muted transition-colors hover:text-fg"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex flex-col gap-3 md:items-end">
                        <div className="flex gap-6">
                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="link-underline text-sm text-muted transition-colors hover:text-fg"
                            >
                                LinkedIn
                            </a>
                            <a
                                href={profile.github}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="link-underline text-sm text-muted transition-colors hover:text-fg"
                            >
                                GitHub
                            </a>
                        </div>
                        <Link
                            href="#home"
                            className="group mt-2 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                        >
                            Back to top
                            <span className="flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-inset ring-fg/15 transition-transform duration-500 ease-glide group-hover:-translate-y-1">
                                <ArrowUp className="h-3.5 w-3.5" />
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-fg/10 pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
                    <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
                    <span className="font-mono uppercase tracking-[0.14em]">
                        Designed &amp; built in {profile.shortLocation.split(",")[0]}
                    </span>
                </div>
            </div>
        </footer>
    )
}
