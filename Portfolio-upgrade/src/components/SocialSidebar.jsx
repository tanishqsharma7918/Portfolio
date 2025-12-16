import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const SocialSidebar = () => {
    const socials = [
        {
            name: 'GitHub',
            icon: <Github size={20} />,
            url: 'https://github.com/tanishqsharma7918',
            color: 'hover:text-purple-400'
        },
        {
            name: 'LinkedIn',
            icon: <Linkedin size={20} />,
            url: 'https://www.linkedin.com/in/tanishq-sharma-/',
            color: 'hover:text-cyan-400'
        },
        {
            name: 'Email',
            icon: <Mail size={20} />,
            url: 'mailto:tanishq.career@gmail.com',
            color: 'hover:text-teal-400'
        }
    ];

    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 z-50">
            {socials.map((social, index) => (
                <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    whileHover={{ scale: 1.2, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 rounded-full glass backdrop-blur-md transition-all text-navy dark:text-lightSlate ${social.color} group`}
                    aria-label={social.name}
                >
                    <div className="transform group-hover:rotate-12 transition-transform">
                        {social.icon}
                    </div>
                </motion.a>
            ))}
            
            {/* Vertical line below icons */}
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="w-0.5 h-24 bg-gradient-to-b from-cyan-500/50 to-transparent mx-auto"
                style={{ transformOrigin: 'top' }}
            />
        </div>
    );
};

export default SocialSidebar;
