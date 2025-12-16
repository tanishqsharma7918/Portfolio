import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, Mail } from 'lucide-react';
import Starfield from './Starfield';

const Hero = () => {
    const roles = [
        'MSc Business Analytics',
        'AI Engineer',
        'Data Strategist'
    ];

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative">
            {/* Starfield Background */}
            <Starfield />
            
            <div className="text-center z-10 px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-xl md:text-2xl font-light mb-6 text-slate-600 dark:text-slate-400">
                        Hello, I'm
                    </h2>
                    
                    {/* Large elegant name */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight leading-none">
                        <span className="text-gradient">Tanishq Sharma</span>
                    </h1>

                    {/* Subtitle */}
                    <h3 className="text-xl md:text-3xl text-gray-700 dark:text-gray-200 font-medium mb-4">
                        Master's in Computer Science Student
                    </h3>

                    {/* Typewriter Effect */}
                    <div className="h-10 mb-12 flex items-center justify-center">
                        <TypewriterEffect roles={roles} />
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="projects" smooth={true} offset={-70} duration={500}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 via-cyan-500 to-purple-600 text-white font-semibold shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center gap-2 text-lg"
                            >
                                View Projects <ArrowRight size={20} />
                            </motion.button>
                        </Link>

                        <Link to="contact" smooth={true} offset={-70} duration={500}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full glass font-semibold hover:bg-white/50 dark:hover:bg-white/10 transition-all flex items-center gap-2 text-lg backdrop-blur-md border-2 border-white/30 dark:border-white/20"
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
        <div className="text-xl md:text-2xl font-mono text-cyan-600 dark:text-cyan-400 min-h-[2rem] flex items-center justify-center">
            <span>{displayedText}</span>
            <span className="animate-pulse ml-1 text-cyan-500">|</span>
        </div>
    );
};

export default Hero;
