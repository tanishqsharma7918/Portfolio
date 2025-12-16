import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Moon, Sun, X, Menu } from "lucide-react";

const Navbar = () => {
    const [active, setActive] = useState("Home");
    const [isDark, setIsDark] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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

    // Track scroll position for navbar animation
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
            {/* --- DESKTOP NAVBAR --- */}
            <header className={`hidden md:block fixed left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-300 ${scrolled ? 'top-4' : 'top-6'}`}>
                
                {/* GLASS CONTAINER: White in Light Mode / Navy in Dark Mode */}
                <nav className="flex items-center justify-between 
                    bg-white/80 dark:bg-navy/85 
                    backdrop-blur-md 
                    border border-navy/10 dark:border-green/10 
                    px-6 py-3 rounded-full shadow-xl transition-colors duration-300"
                >
                    
                    {/* LOGO: Navy in Light / Teal in Dark */}
                    <Link
                        to="home"
                        smooth={true}
                        className="cursor-pointer font-bold text-xl tracking-tight 
                            text-navy dark:text-green 
                            hover:text-green transition-colors duration-300"
                        onClick={() => setActive("Home")}
                    >
                        Tanishq Sharma
                    </Link>

                    {/* LINKS + TOGGLE */}
                    <div className="flex items-center gap-6">
                        <ul className="flex items-center gap-1">
                            {navLinks.map((link, index) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        smooth={true}
                                        offset={-100}
                                        onClick={() => setActive(link.name)}
                                        className={`
                                            px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer inline-block
                                            ${
                                                active === link.name
                                                    ? "bg-navy/5 text-navy dark:bg-light-navy dark:text-green shadow-sm translate-y-0" // ACTIVE: Subtle Gray in Light / Dark Pill in Dark
                                                    : "text-slate-600 dark:text-slate hover:text-navy dark:hover:text-green hover:bg-navy/5 dark:hover:bg-light-navy/50" // INACTIVE
                                            }
                                        `}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* THEME TOGGLE */}
                        <div className="pl-4 border-l border-navy/10 dark:border-green/20">
                            <button 
                                onClick={toggleTheme}
                                className="p-2 rounded-full transition-all duration-300
                                    text-navy hover:bg-navy/10 
                                    dark:text-green dark:hover:bg-light-navy"
                                aria-label="Toggle theme"
                            >
                                {isDark ? <Moon size={18} /> : <Sun size={18} />}
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* --- MOBILE NAVBAR (Also Fixed) --- */}
            <nav className={`md:hidden fixed w-full z-50 transition-all duration-300 ${isMobileMenuOpen || scrolled ? 'bg-white/90 dark:bg-navy/90 backdrop-blur-md border-b border-navy/10 dark:border-green/10 shadow-lg' : 'bg-transparent'}`}>
                <div className="flex items-center justify-between px-6 py-4">
                    <Link 
                        to="home" 
                        smooth={true} 
                        className="text-xl font-bold text-navy dark:text-green cursor-pointer"
                        onClick={() => setActive("Home")}
                    >
                        TS
                    </Link>
                    
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                        className="text-navy dark:text-green p-1"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMobileMenuOpen && (
                    <div className="px-4 py-4 bg-white/95 dark:bg-navy/95 backdrop-blur-md border-t border-navy/10 dark:border-green/10">
                        <ul className="flex flex-col space-y-2">
                            {navLinks.map((link, index) => (
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
                                            px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer flex items-center
                                            ${
                                                active === link.name
                                                    ? "bg-navy/10 text-navy dark:bg-light-navy dark:text-green"
                                                    : "text-slate-600 dark:text-slate hover:text-navy dark:hover:text-green hover:bg-navy/5 dark:hover:bg-light-navy/50"
                                            }
                                        `}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Theme Toggle */}
                        <div className="mt-4 pt-4 border-t border-navy/10 dark:border-green/10">
                            <button 
                                onClick={toggleTheme}
                                className="w-full px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2
                                    bg-navy/5 text-navy hover:bg-navy/10 
                                    dark:bg-light-navy dark:text-green dark:hover:bg-light-navy/80"
                            >
                                {isDark ? (
                                    <>
                                        <Sun size={18} />
                                        <span className="text-sm font-medium">Light Mode</span>
                                    </>
                                ) : (
                                    <>
                                        <Moon size={18} />
                                        <span className="text-sm font-medium">Dark Mode</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
