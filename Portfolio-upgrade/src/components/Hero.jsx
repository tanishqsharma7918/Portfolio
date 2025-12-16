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

    // EXACT PARTICLE CONFIGURATION - Bright stars with twinkling
    const particlesOptions = useMemo(() => ({
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } }, // Important!
        fpsLimit: 120,
        particles: {
            color: { value: "#ffffff" },
            links: { enable: false }, // No connecting lines
            move: {
                enable: true,
                speed: 0.6, // Slow, elegant drift
                direction: "none",
                random: true,
                straight: false,
                outModes: "out",
            },
            number: {
                value: 120,
                density: { enable: true, area: 800 },
            },
            opacity: {
                value: { min: 0.1, max: 1 }, // Twinkling effect (some bright, some dim)
                animation: {
                    enable: true,
                    speed: 1,
                    sync: false,
                },
            },
            shape: { type: "circle" },
            size: {
                value: { min: 1, max: 3 }, // Varied star sizes
            },
        },
    }), []);

    return (
        <section 
            id="home" 
            className="h-screen w-full relative overflow-hidden"
        >
            {/* Layer 1 (Back): Dark Navy Background */}
            <div className="absolute inset-0 bg-[#0a192f]" />
            
            {/* Layer 2 (Middle): Particles Component */}
            <div className="absolute inset-0">
                <Particles
                    id="tsparticles-hero"
                    init={particlesInit}
                    options={particlesOptions}
                />
            </div>
            
            {/* Layer 3 (Overlay): Atmospheric Gradient Glow - THE SECRET LAYER */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-teal-500/20" />
            
            {/* Layer 4 (Front): Hero Content - Must be relative z-10 for clickability */}
            <div className="relative z-10 h-full w-full flex flex-col items-center justify-center gap-6 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center gap-6"
                >
                    <h2 className="text-xl md:text-2xl font-light text-slate-500 dark:text-slate-400">
                        Hello, I'm
                    </h2>
                    
                    {/* Name - Matching Nikhila's size */}
                    <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight leading-none">
                        <span className="bg-gradient-to-r from-teal-200 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            Tanishq Sharma
                        </span>
                    </h1>

                    {/* CONSTANT Subheading - Master's Degree (STATIC, NOT TYPING) */}
                    <div className="text-xl md:text-2xl text-slate-400 dark:text-slate-300 font-medium">
                        MSc in Business Analytics from <span className="text-emerald-400">University of Birmingham</span>
                    </div>

                    {/* DYNAMIC Typewriter - Job Roles (TYPING) */}
                    <div className="text-2xl md:text-3xl font-bold">
                        <TypewriterEffect roles={roles} />
                    </div>

                    {/* Refined CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                        <Link to="projects" smooth={true} offset={-70} duration={500}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-cyan-500 text-white font-semibold shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 transition-all flex items-center gap-2 text-lg"
                            >
                                View Projects <ArrowRight size={20} />
                            </motion.button>
                        </Link>

                        <Link to="contact" smooth={true} offset={-70} duration={500}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm font-semibold hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 text-lg text-slate-300"
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                {displayedText}
            </span>
            <span className="animate-pulse text-emerald-400 ml-1">|</span>
        </div>
    );
};

export default Hero;
