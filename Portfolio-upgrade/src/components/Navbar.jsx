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
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                scrolled ? "bg-navy/90 backdrop-blur-sm shadow-lg py-4" : "bg-transparent py-6"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* 1. Logo/Name - Highlighted in Teal */}
                <Link
                    to="home"
                    smooth={true}
                    className="text-green font-bold text-xl tracking-wide cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setActiveSection("home")}
                >
                    Tanishq Sharma
                </Link>

                {/* 2. Navigation Links - Desktop */}
                <nav className="hidden md:flex items-center gap-2">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            smooth={true}
                            offset={-100}
                            spy={true}
                            onClick={() => setActiveSection(link.href)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                                activeSection === link.href
                                    ? "bg-lightNavy text-green" // THE ACTIVE PILL HIGHLIGHT
                                    : "text-slate hover:text-green"
                            }`}
                        >
                            <span className="text-green mr-1.5">0{index + 1}.</span>
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* 3. Mobile Toggle */}
                <button
                    className="md:hidden text-green"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        // X icon
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        // Menu icon
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-navy/95 backdrop-blur-sm border-t border-lightNavy">
                    <nav className="flex flex-col items-center gap-4 py-6">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                smooth={true}
                                offset={-100}
                                onClick={() => {
                                    setActiveSection(link.href);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                                    activeSection === link.href
                                        ? "bg-lightNavy text-green"
                                        : "text-slate hover:text-green"
                                }`}
                            >
                                <span className="text-green mr-1.5">0{index + 1}.</span>
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
