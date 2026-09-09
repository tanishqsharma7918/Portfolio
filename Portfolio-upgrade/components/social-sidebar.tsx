"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { profile } from "@/lib/content"

const socials = [
    { icon: Linkedin, href: profile.linkedin, label: "LinkedIn", external: true },
    { icon: Github, href: profile.github, label: "GitHub", external: true },
    { icon: Mail, href: `mailto:${profile.email}`, label: "Email", external: false },
]

export function SocialSidebar() {
    return (
        <motion.aside
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex"
        >
            {socials.map((social) => (
                <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    data-cursor-label={social.label}
                    {...(social.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                    className="group flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-inset ring-fg/10 backdrop-blur-md transition-all duration-500 ease-glide hover:-translate-y-1 hover:bg-fg/5 hover:ring-accent/40"
                >
                    <social.icon className="h-[17px] w-[17px] text-muted transition-colors group-hover:text-fg" />
                </a>
            ))}

            {/* Rail hints there is more page below without being a scrollbar */}
            <span className="mt-2 h-20 w-px bg-gradient-to-b from-fg/25 to-transparent" />
        </motion.aside>
    )
}
