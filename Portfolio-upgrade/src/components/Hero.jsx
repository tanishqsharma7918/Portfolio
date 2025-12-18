import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, Mail } from 'lucide-react';
import CosmicBackground from './CosmicBackground';

const Hero = () => {
    // Dynamic job roles for typewriter (NOT the degree)
    const roles = [
        'AI/ML Engineer',
        'Data Analyst',
        'Problem Solver'
    ];

    return (
        <section 
            id="home" 
            className="relative w-full h-screen flex items-center justify-center overflow-hidden"
        >
            {/* COSMIC NEBULA BACKGROUND */}
            <CosmicBackground />

            {/* LAYER 3: CONTENT */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center gap-6"
                >
                    {/* 1. 'Hello, I'm' - Same font as name */}
                    <p className="text-5xl md:text-7xl font-bold tracking-tight mb-2">
                        <span className="animate-gradient-x bg-gradient-to-r from-navy via-purple-600 to-navy dark:from-[#64ffda] dark:via-[#bd34fe] dark:to-[#64ffda] bg-[length:200%_auto] bg-clip-text text-transparent">
                            Hello, I&apos;m
                        </span>
                    </p>

                    {/* 2. Main Name Title (Animated Gradient - Theme Aware) */}
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                        <span className="animate-gradient-x bg-gradient-to-r from-navy via-purple-600 to-navy dark:from-[#64ffda] dark:via-[#bd34fe] dark:to-[#64ffda] bg-[length:200%_auto] bg-clip-text text-transparent">
                            Tanishq Sharma
                        </span>
                    </h1>

                    {/* 3. Subheading - Smaller, no highlight */}
                    <h2 className="text-lg md:text-xl font-light mb-6 text-navy dark:text-lightSlate max-w-2xl mx-auto">
                        Master&apos;s in Business Analytics from University of Birmingham
                    </h2>

                    {/* 4. Typing Effect - Theme Aware */}
                    <div className="text-2xl md:text-3xl font-bold mb-8">
                        <TypewriterEffect roles={roles} />
                    </div>

                    {/* 5. Buttons - Fixed Visibility */}
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-4">
                        {/* Primary Button (Filled) */}
                        <Link to="projects" smooth={true} offset={-70} duration={500}>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg
                                    bg-navy text-white hover:bg-light-navy
                                    dark:bg-green dark:text-navy dark:hover:bg-[#5de6c4]
                                    flex items-center gap-2"
                            >
                                View Projects <ArrowRight size={20} />
                            </motion.button>
                        </Link>

                        {/* Secondary Button (Outline) - THE FIX IS HERE */}
                        <Link to="contact" smooth={true} offset={-70} duration={500}>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-full font-medium transition-all duration-300 border
                                    border-navy text-navy hover:bg-navy/5
                                    dark:border-green dark:text-green dark:hover:bg-green/10
                                    flex items-center gap-2"
                            >
                                Get In Touch <Mail size={20} />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Typewriter Effect Component
const TypewriterEffect = ({ roles }) => {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[currentRoleIndex];
        const typingSpeed = isDeleting ? 50 : 100;
        const pauseBeforeDelete = 2000;
        const pauseBeforeType = 500;

        if (!isDeleting && displayedText === currentRole) {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
            return;
        }

        if (isDeleting && displayedText === '') {
            // Move to next role
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
            setTimeout(() => {}, pauseBeforeType);
            return;
        }

        const timeout = setTimeout(() => {
            setDisplayedText(prev => {
                if (isDeleting) {
                    return currentRole.substring(0, prev.length - 1);
                } else {
                    return currentRole.substring(0, prev.length + 1);
                }
            });
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, currentRoleIndex, roles]);

    return (
        <div className="flex items-center justify-center min-h-[3rem]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-navy dark:from-emerald-400 dark:to-cyan-500">
                {displayedText}
            </span>
            <span className="animate-pulse text-navy dark:text-emerald-400 ml-1">|</span>
        </div>
    );
};

export default Hero;
