import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
    const [active, setActive] = useState("Home");
    const [isDark, setIsDark] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Initialize dark mode on mount
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    // Toggle dark mode
    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        
        if (newIsDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Track active section on scroll
    useEffect(() => {
        const handleScrollSpy = () => {
            const sections = ["Home", "About", "Experience", "Projects", "Contact"];
            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
                const element = document.getElementById(section.toLowerCase());
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActive(section);
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
            {/* FLOATING GLASS PILL NAVBAR - Desktop */}
            <header className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
                {/* The Glass Container - Now with justify-between for proper spacing */}
                <nav className="flex items-center justify-between gap-4 bg-[#0a192f]/85 backdrop-blur-md border border-[#64ffda]/10 px-6 py-3 rounded-full shadow-2xl">
                    
                    {/* Logo Section - Glowing Teal with Hover Effect */}
                    <div className="font-bold text-lg tracking-tight whitespace-nowrap">
                        <Link
                            to="home"
                            smooth={true}
                            className="cursor-pointer text-[#64ffda] hover:text-[#5de6c4] transition-all duration-300 drop-shadow-[0_0_8px_rgba(100,255,218,0.6)] hover:drop-shadow-[0_0_12px_rgba(93,230,196,0.9)]"
                            onClick={() => setActive("Home")}
                        >
                            Tanishq Sharma
                        </Link>
                    </div>

                    {/* Links */}
                    <ul className="flex items-center gap-2">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.href}
                                    smooth={true}
                                    offset={-100}
                                    onClick={() => setActive(link.name)}
                                    className={`
                                        px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer inline-block whitespace-nowrap
                                        ${
                                            active === link.name
                                                ? "bg-[#112240] text-[#64ffda] shadow-lg shadow-[#64ffda]/20" // The Active 'Pill' with glow
                                                : "text-[#8892b0] hover:text-[#64ffda] hover:bg-[#112240]/50" // The Inactive State
                                        }
                                    `}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Dark Mode Toggle */}
                    <div className="pl-4 pr-2 border-l border-[#64ffda]/10">
                        <button 
                            onClick={toggleTheme}
                            className="p-2.5 text-[#64ffda] hover:bg-[#112240] rounded-full transition-all duration-300"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Moon size={18} /> : <Sun size={18} />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* MOBILE NAVBAR */}
            <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0a192f]/90 backdrop-blur-md border-b border-[#64ffda]/10 px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo - Glowing Teal */}
                    <Link
                        to="home"
                        smooth={true}
                        className="text-lg font-bold text-[#64ffda] cursor-pointer hover:text-[#5de6c4] transition-all duration-300 drop-shadow-[0_0_8px_rgba(100,255,218,0.6)] hover:drop-shadow-[0_0_12px_rgba(93,230,196,0.9)]"
                        onClick={() => setActive("Home")}
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
                    <div className="border-t border-[#64ffda]/10 mt-3">
                        <ul className="flex flex-col space-y-2 py-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        smooth={true}
                                        offset={-100}
                                        onClick={() => {
                                            setActive(link.name);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={`
                                            px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer inline-block
                                            ${
                                                active === link.name
                                                    ? "bg-[#112240] text-[#64ffda] shadow-lg"
                                                    : "text-[#8892b0] hover:text-[#64ffda] hover:bg-[#112240]/50"
                                            }
                                        `}
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
