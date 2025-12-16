import { useState, useEffect } from "react";
import { Link } from "react-scroll";

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Track active section on scroll
    useEffect(() => {
        const handleScrollSpy = () => {
            const sections = ["home", "about", "experience", "projects", "contact"];
            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScrollSpy);
        return () => window.removeEventListener("scroll", handleScrollSpy);
    }, []);

    const navLinks = [
        { name: "Home", href: "home" },
        { name: "About", href: "about" },
        { name: "Experience", href: "experience" },
        { name: "Projects", href: "projects" },
        { name: "Contact", href: "contact" },
    ];

    return (
        <>
            {/* FLOATING GLASSMORPHISM NAVBAR - Desktop */}
            <header className="hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl bg-[#0a192f]/70 backdrop-blur-md rounded-full border border-white/10 px-2 py-2 shadow-xl">
                <ul className="flex items-center justify-between w-full px-4">
                    {/* Logo on the left */}
                    <li className="font-bold text-[#64ffda] text-lg mr-auto">
                        <Link
                            to="home"
                            smooth={true}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setActiveSection("home")}
                        >
                            Tanishq Sharma
                        </Link>
                    </li>

                    {/* Navigation Links - Individual Pills */}
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                to={link.href}
                                smooth={true}
                                offset={-100}
                                spy={true}
                                onClick={() => setActiveSection(link.href)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer inline-block ${
                                    activeSection === link.href
                                        ? "bg-[#112240] text-[#64ffda]" // ACTIVE PILL: Dark background + Teal text
                                        : "text-[#8892b0] hover:text-[#64ffda]" // INACTIVE: Gray text, teal on hover
                                }`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </header>

            {/* MOBILE NAVBAR */}
            <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0a192f]/90 backdrop-blur-md border-b border-white/10 px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="home"
                        smooth={true}
                        className="text-lg font-bold text-[#64ffda] cursor-pointer"
                        onClick={() => setActiveSection("home")}
                    >
                        Tanishq Sharma
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        className="text-[#64ffda]"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="border-t border-white/10 mt-3">
                        <ul className="flex flex-col space-y-2 py-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        smooth={true}
                                        offset={-100}
                                        onClick={() => {
                                            setActiveSection(link.href);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer inline-block ${
                                            activeSection === link.href
                                                ? "bg-[#112240] text-[#64ffda]"
                                                : "text-[#8892b0] hover:text-[#64ffda]"
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
