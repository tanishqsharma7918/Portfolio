"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowUpRight, Copy, Check } from "lucide-react"
import { profile } from "@/lib/content"
import { MaskLines, Reveal } from "@/components/ui/reveal"
import { Magnetic } from "@/components/ui/magnetic"

const GLIDE = [0.16, 1, 0.3, 1] as const

export function Contact() {
    return (
        <section id="contact" className="shell scroll-mt-24 py-24 md:py-36">
            <div className="flex flex-col items-center text-center">
                <Reveal>
                    <div className="mb-8 flex items-center gap-3">
                        <span className="h-px w-8 bg-accent/50" />
                        <span className="eyebrow">Contact</span>
                    </div>
                </Reveal>

                <MaskLines
                    lines={["Let's build something"]}
                    className="text-display font-medium"
                />
                <MaskLines
                    lines={["worth measuring"]}
                    className="accent-serif mt-1 text-display md:mt-2"
                    delay={0.08}
                />

                <Reveal delay={0.18}>
                    <p className="mt-8 max-w-lg text-balance text-base leading-relaxed text-muted md:text-lg">
                        Open to data science, ML engineering and analytics roles — and to
                        conversations that have no agenda yet.
                    </p>
                </Reveal>

                <Reveal delay={0.26}>
                    <Magnetic strength={0.22} className="mt-12 inline-block">
                        <a
                            href={`mailto:${profile.email}`}
                            data-cursor-label="Email"
                            className="group/mail relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-fg px-8 py-5 text-base font-medium text-bg md:px-11 md:py-6 md:text-lg"
                        >
                            <span className="absolute inset-0 translate-y-full bg-accent transition-transform duration-700 ease-glide group-hover/mail:translate-y-0" />
                            <span className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover/mail:text-white">
                                {profile.email}
                                <ArrowUpRight className="h-5 w-5 transition-transform duration-500 ease-glide group-hover/mail:translate-x-1 group-hover/mail:-translate-y-1" />
                            </span>
                        </a>
                    </Magnetic>
                </Reveal>

                <Reveal delay={0.32}>
                    <CopyEmail />
                </Reveal>
            </div>

            <div className="mt-24 grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
                <div className="flex flex-col gap-8">
                    <Reveal>
                        <div className="flex flex-col gap-1.5 border-t border-fg/10 pt-5">
                            <span className="eyebrow">Location</span>
                            <span className="text-base">{profile.location}</span>
                        </div>
                    </Reveal>
                    <Reveal delay={0.06}>
                        <div className="flex flex-col gap-1.5 border-t border-fg/10 pt-5">
                            <span className="eyebrow">Phone</span>
                            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="link-underline inline-flex min-h-[44px] w-fit items-center text-base">
                                {profile.phone}
                            </a>
                        </div>
                    </Reveal>
                    <Reveal delay={0.12}>
                        <div className="flex flex-col gap-3 border-t border-fg/10 pt-5">
                            <span className="eyebrow">Elsewhere</span>
                            <div className="flex flex-col gap-2">
                                <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" className="link-underline inline-flex min-h-[44px] w-fit items-center text-base">
                                    LinkedIn
                                </a>
                                <a href={profile.github} target="_blank" rel="noreferrer noopener" className="link-underline inline-flex min-h-[44px] w-fit items-center text-base">
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <Reveal y={34}>
                    <ContactForm />
                </Reveal>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */

function CopyEmail() {
    const [copied, setCopied] = useState(false)

    async function copy() {
        try {
            await navigator.clipboard.writeText(profile.email)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 2000)
        } catch {
            // Clipboard can be blocked by permissions — the mailto link above
            // is the primary path, so failing quietly is correct here.
        }
    }

    return (
        <button
            onClick={copy}
            className="mt-4 inline-flex min-h-[44px] items-center gap-2 font-mono text-eyebrow uppercase text-muted transition-colors hover:text-fg"
        >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy address"}
        </button>
    )
}

/* ------------------------------------------------------------------ */

/**
 * The site is a static export, so there is no server to post to. Rather
 * than fake a submission, the form composes a properly formatted mail
 * draft and hands it to the visitor's own client.
 */
function ContactForm() {
    const [form, setForm] = useState({ name: "", email: "", message: "" })
    const [touched, setTouched] = useState(false)

    const valid =
        form.name.trim().length > 1 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
        form.message.trim().length > 4

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setTouched(true)
        if (!valid) return

        const subject = encodeURIComponent(`Portfolio enquiry — ${form.name.trim()}`)
        const body = encodeURIComponent(
            `${form.message.trim()}\n\n—\n${form.name.trim()}\n${form.email.trim()}`
        )
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    }

    const field =
        "w-full rounded-2xl border border-fg/10 bg-fg/[0.02] px-4 py-3.5 text-sm text-fg placeholder:text-muted/70 " +
        "transition-colors duration-300 focus:border-accent/50 focus:outline-none focus:ring-0"

    return (
        <form onSubmit={onSubmit} className="panel flex flex-col gap-5 p-6 md:p-9">
            <div className="relative z-10 flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                        <span className="eyebrow">Name</span>
                        <input
                            className={field}
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Your name"
                            autoComplete="name"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="eyebrow">Email</span>
                        <input
                            className={field}
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="you@company.com"
                            autoComplete="email"
                        />
                    </label>
                </div>

                <label className="flex flex-col gap-2">
                    <span className="eyebrow">Message</span>
                    <textarea
                        className={`${field} min-h-[140px] resize-y`}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="What are you working on?"
                    />
                </label>

                {touched && !valid ? (
                    <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: GLIDE }}
                        className="text-xs text-muted"
                    >
                        Add a name, a valid email and a line or two, then this will open your mail app.
                    </motion.p>
                ) : null}

                <button
                    type="submit"
                    className="group/send relative mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-fg px-7 py-4 text-sm font-medium text-bg"
                >
                    <span className="absolute inset-0 translate-y-full bg-accent transition-transform duration-700 ease-glide group-hover/send:translate-y-0" />
                    <span className="relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover/send:text-white">
                        Compose message
                        <ArrowUpRight className="h-4 w-4" />
                    </span>
                </button>

                <p className="text-center text-[11px] text-muted">
                    Opens in your own mail client — nothing is stored here.
                </p>
            </div>
        </form>
    )
}
