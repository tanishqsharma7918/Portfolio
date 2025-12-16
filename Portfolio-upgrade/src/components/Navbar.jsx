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
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg py-3' 
                    : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-center items-center relative">
                {/* Logo - Positioned Left */}
                <Link
                    to="home"
                    smooth={true}
                    className="absolute left-6 cursor-pointer font-bold text-xl tracking-wide text-gray-900 dark:text-white hover:opacity-80 transition-all hover:-translate-y-1 duration-200"
                >
                    Tanishq Sharma
                </Link>

                {/* Desktop Nav - Centered */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            smooth={true}
                            offset={-70}
                            className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-all hover:-translate-y-1 hover:scale-105 duration-200"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Theme Toggle - Positioned Right */}
                <button
                    onClick={toggleTheme}
                    className="absolute right-6 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all hover:-translate-y-1 hover:scale-110 duration-200"
                    aria-label="Toggle Theme"
                >
                    {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
                </button>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                        className="md:hidden overflow-hidden glass border-t border-white/20"
                    >
                        <div className="flex flex-col space-y-4 p-6 items-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    smooth={true}
                                    offset={-70}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="cursor-pointer text-lg font-medium hover:text-purple-500 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
