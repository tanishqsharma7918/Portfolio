import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, Mail } from 'lucide-react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const Hero = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    
    // Updated roles sequence to match reference
    const roles = [
        'AI/ML Engineer',
        'Data Analyst',
        'Master\'s in Business Analytics'
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

    // Particles configuration - Exact physics to match reference
    const particlesOptions = useMemo(() => ({
        background: {
            color: { value: "transparent" }, // Crucial: No background color here, let CSS handle it
        },
        fpsLimit: 120,
        particles: {
            color: { 
                value: isDarkMode ? "#ffffff" : "#64748b" // White in dark mode, slate-gray in light mode
            },
            move: {
                enable: true,
                direction: "none",      // Random drifting
                outModes: { default: "out" }, // Particles flow off-screen seamlessly
                random: true,
                speed: 1.2,             // Faster visible movement (matching reference video)
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 1200,           // High area = Lower density (creates "Deep Space" feel)
                },
                value: 80,              // Keep count low. Too many stars ruins the depth.
            },
            opacity: {
                animation: {
                    enable: true,
                    speed: 0.5,           // Slow twinkling
                    sync: false,
                },
                value: { min: 0.1, max: 0.6 }, // Varying opacity creates "Distance/3D" effect
            },
            shape: { type: "circle" },
            size: {
                value: { min: 1, max: 3 }, // Tiny dots, not big blobs
            },
        },
        detectRetina: true,
    }), [isDarkMode]);

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Layer 1: Flowing Starfield (Deep Space) - Seamless on solid background */}
            <div className="absolute inset-0" style={{ zIndex: 0 }}>
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={particlesOptions}
                />
            </div>
            
            {/* Layer 2: Nebula Glow (Behind the Name) */}
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
                style={{
                    zIndex: 1,
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
                    filter: 'blur(100px)',
                    opacity: 0.4,
                }}
            />
            
            <div className="text-center px-4 max-w-5xl mx-auto relative" style={{ zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-xl md:text-2xl font-light mb-6 text-slate-500 dark:text-slate-400">
                        Hello, I'm
                    </h2>
                    
                    {/* Refined elegant name - Lighter, tighter, more refined */}
                    <h1 className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tight leading-none">
                        <span className="bg-gradient-to-r from-teal-200 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            Tanishq Sharma
                        </span>
                    </h1>

                    {/* Typewriter Effect with accent color */}
                    <div className="h-12 mb-12 flex items-center justify-center">
                        <TypewriterEffect roles={roles} />
                    </div>

                    {/* Refined CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
        <div className="flex items-center justify-center gap-2 min-h-[2rem]">
            <span className="text-lg md:text-xl text-gray-500 dark:text-gray-400">I am a</span>
            <span className="text-xl md:text-2xl font-medium text-teal-500 dark:text-teal-400">
                {displayedText}
            </span>
            <span className="animate-pulse text-teal-500">|</span>
        </div>
    );
};

export default Hero;
