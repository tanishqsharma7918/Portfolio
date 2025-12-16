import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(true); // Default to dark mode

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Initialize dark mode on mount
        document.documentElement.classList.add('dark');

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        
        if (newIsDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const navLinks = [
        { name: 'Home', to: 'home' },
        { name: 'About', to: 'about' },
        { name: 'Experience', to: 'experience' },
        { name: 'Projects', to: 'projects' },
        { name: 'Blog', to: 'blog' },
        { name: 'Contact', to: 'contact' },
    ];

    return (
        <>
            {/* FLOATING PILL-SHAPED NAVBAR - Desktop */}
            <header className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl bg-opacity-30 backdrop-blur-md bg-[#0a192f] border border-white/10 rounded-full px-6 py-3 shadow-lg">
                <nav className="flex items-center justify-between">
                    {/* Logo/Name */}
                    <Link
                        to="home"
                        smooth={true}
                        className="text-xl font-bold text-[#64ffda] cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        Tanishq Sharma
                    </Link>

                    {/* Navigation Links */}
                    <ul className="flex items-center gap-8 text-sm font-medium text-gray-300">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.to}
                                    smooth={true}
                                    offset={-100}
                                    className="hover:text-[#64ffda] transition-colors cursor-pointer"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? <Moon size={18} className="text-gray-300" /> : <Sun size={18} className="text-yellow-400" />}
                    </button>
                </nav>
            </header>

            {/* MOBILE NAVBAR - Full Width (Fallback) */}
            <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0a192f]/90 backdrop-blur-md border-b border-white/10 px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="home"
                        smooth={true}
                        className="text-lg font-bold text-[#64ffda] cursor-pointer"
                    >
                        Tanishq Sharma
                    </Link>

                    {/* Mobile Controls */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                            {isDark ? <Moon size={18} /> : <Sun size={18} />}
                        </button>
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X size={24} className="text-gray-300" /> : <Menu size={24} className="text-gray-300" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t border-white/10 mt-3"
                        >
                            <div className="flex flex-col space-y-4 py-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.to}
                                        smooth={true}
                                        offset={-70}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="cursor-pointer text-base font-medium text-gray-300 hover:text-[#64ffda] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;
