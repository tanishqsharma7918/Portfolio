import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, Mail } from 'lucide-react';

const Hero = () => {
    const skills = ['Tech', 'Data', 'AI', 'Analytics'];

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative">
            <div className="text-center z-10 px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-2xl md:text-3xl font-light mb-4">Hello, I'm</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        <span className="text-gradient">Tanishq Sharma</span>
                    </h1>

                    <h3 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium mb-8">
                        Master's in Business Analytics Student
                    </h3>

                    <div className="h-8 mb-10 overflow-hidden text-xl md:text-2xl font-mono text-purple-600 dark:text-purple-400">
                        {/* Simple CSS animation or just static for now, upgrading to Framer Motion loop */}
                        <SkillRotator skills={skills} />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="projects" smooth={true} offset={-70}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2"
                            >
                                View Projects <ArrowRight size={18} />
                            </motion.button>
                        </Link>

                        <Link to="contact" smooth={true} offset={-70}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-full glass font-semibold hover:bg-white/50 dark:hover:bg-white/10 transition-all flex items-center gap-2"
                            >
                                Get In Touch <Mail size={18} />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const SkillRotator = ({ skills }) => {
    return (
        <div className="relative h-full flex justify-center items-center">
            <TypewriterText text={skills.join(' | ')} />
        </div>
    );
};

const TypewriterText = ({ text }) => {
    // Simple fade-in for now, or use complex hook if user wants real typing
    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        >
            {text}
        </motion.span>
    )
}

export default Hero;
