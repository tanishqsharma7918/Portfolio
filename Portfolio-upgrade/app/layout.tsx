import type { Metadata, Viewport } from "next"
import {
    Bricolage_Grotesque,
    Inter,
    Instrument_Serif,
    JetBrains_Mono,
} from "next/font/google"
import "./globals.css"

import { MotionProvider } from "@/components/motion-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Cursor } from "@/components/cursor"
import { Grain } from "@/components/grain"
import { Preloader } from "@/components/preloader"
import { Galaxy } from "@/components/galaxy"
import { profile } from "@/lib/content"

const sans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
})

// Display face for the wordmark. Bricolage carries a real optical-size
// axis, so at 100+ it tightens and sharpens rather than just scaling up.
const display = Bricolage_Grotesque({
    subsets: ["latin"],
    axes: ["opsz"],
    variable: "--font-display",
    display: "swap",
})

const serif = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
    variable: "--font-serif",
    display: "swap",
})

const mono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
})

export const metadata: Metadata = {
    metadataBase: new URL("https://tanishqsharma.vercel.app"),
    title: {
        default: `${profile.name} — ${profile.role}`,
        template: `%s — ${profile.name}`,
    },
    description: profile.metaDescription,
    keywords: [
        "Tanishq Sharma",
        "Business Analytics",
        "Data Scientist",
        "Machine Learning Engineer",
        "LLM",
        "RAG",
        "Power BI",
        "Portfolio",
    ],
    authors: [{ name: profile.name, url: profile.linkedin }],
    creator: profile.name,
    openGraph: {
        type: "website",
        title: `${profile.name} — ${profile.role}`,
        description: profile.metaDescription,
        siteName: `${profile.name} Portfolio`,
        images: [{ url: profile.photo, width: 1200, height: 630, alt: profile.name }],
    },
    twitter: {
        card: "summary_large_image",
        title: `${profile.name} — ${profile.role}`,
        description: profile.metaDescription,
    },
    robots: { index: true, follow: true },
}

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f3f1ec" },
        { media: "(prefers-color-scheme: dark)", color: "#090b12" },
    ],
    width: "device-width",
    initialScale: 1,
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${sans.variable} ${display.variable} ${serif.variable} ${mono.variable} font-sans antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <a
                        href="#work"
                        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-fg focus:px-5 focus:py-3 focus:text-sm focus:text-bg"
                    >
                        Skip to content
                    </a>

                    <MotionProvider>
                        <Preloader />
                        <SmoothScroll />
                        <Galaxy />
                        <Grain />
                        <Cursor />

                        {children}
                    </MotionProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
