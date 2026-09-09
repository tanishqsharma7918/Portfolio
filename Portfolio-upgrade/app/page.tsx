import { Navbar } from "@/components/navbar"
import { SocialSidebar } from "@/components/social-sidebar"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { Stats } from "@/components/stats"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Praise } from "@/components/praise"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
    return (
        <>
            <Navbar />
            <SocialSidebar />

            <main className="relative">
                <Hero />
                <Marquee />
                <Stats />
                <About />
                <Projects />
                <Experience />
                <Skills />
                <Praise />
                <Contact />
            </main>

            <Footer />
        </>
    )
}
