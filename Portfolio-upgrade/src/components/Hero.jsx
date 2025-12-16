import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, Mail } from 'lucide-react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const Hero = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    
    // Dynamic job roles for typewriter (NOT the degree)
    const roles = [
        'AI/ML Engineer',
        'Data Analyst',
        'Problem Solver'
    ];

    // Detect dark mode
    useEffect(() => {
        const checkDarkMode = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkMode(isDark);
        };
        
        checkDarkMode();
        
        // Watch for dark mode changes
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        return () => observer.disconnect();
    }, []);

    // Initialize tsparticles
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    // HYPER-SPACE STARFIELD - Dense, Fast, 3D Parallax Effect
    const particlesOptions = useMemo(() => ({
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        particles: {
            // COLOR: Teal/White in Dark Mode, Navy in Light Mode
            color: {
                value: isDarkMode ? ["#ffffff", "#64ffda"] : ["#0a192f", "#112240"],
            },
            links: { enable: false }, // No lines, just stars
            move: {
                enable: true,
                speed: 3, // FAST speed for hyperspace feel
                direction: "none", // Chaos direction
                random: true,
                straight: false,
                outModes: "out", // Stars flow off screen smoothly
            },
            number: {
                value: 250, // Optimized density - Balanced starfield
                density: { enable: true, area: 800 },
            },
            // OPACITY: Varying opacity creates "Distance"
            opacity: {
                value: { 
                    min: 0.1, 
                    max: isDarkMode ? 1.0 : 0.4 
                },
                animation: {
                    enable: true,
                    speed: 3,
                    sync: false,
                },
            },
            shape: { type: "circle" },
            // SIZE: Wide range creates 3D Parallax (Small = Far, Big = Close)
            size: {
                value: { min: 0.5, max: 3 }, 
            },
        },
        detectRetina: true,
    }), [isDarkMode]);

    return (
        <section 
            id="home" 
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-navy transition-colors duration-300"
        >
            {/* LAYER 1: STARS (Visible in both modes with theme-aware styling) */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={particlesOptions}
                className="absolute inset-0 h-full w-full z-0"
            />

            {/* LAYER 2: ATMOSPHERE GLOW (Subtle Gray in Light Mode, Blue in Dark Mode) */}
            <div className="absolute inset-0 z-[1] pointer-events-none 
                bg-gradient-to-br from-indigo-50/50 via-transparent to-teal-50/50 
                dark:from-indigo-500/20 dark:via-transparent dark:to-teal-500/20 
                transition-all duration-500" 
            />

            {/* LAYER 3: CONTENT */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center gap-6"
                >
                    {/* 1. 'Hello, I'm' - Fixed Visibility */}
                    <p className="text-navy dark:text-green font-mono text-lg mb-2">
                        Hello, I'm
                    </p>

                    {/* 2. Main Name Title (Animated Gradient - Theme Aware) */}
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                        <span className="animate-gradient-x bg-gradient-to-r from-navy via-purple-600 to-navy dark:from-[#64ffda] dark:via-[#bd34fe] dark:to-[#64ffda] bg-[length:200%_auto] bg-clip-text text-transparent">
                            Tanishq Sharma
                        </span>
                    </h1>

                    {/* 3. Subheading - Fixed Visibility */}
                    <h2 className="text-xl md:text-2xl font-light mb-6 text-navy dark:text-lightSlate max-w-2xl mx-auto">
                        MSc in Business Analytics from <span className="text-purple-600 dark:text-green font-semibold">University of Birmingham</span>
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
