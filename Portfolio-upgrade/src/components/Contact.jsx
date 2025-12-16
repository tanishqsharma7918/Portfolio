import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                    {/* Left: Info */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Connect</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 glass rounded-full text-purple-600">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Email Me</p>
                                    <a href="mailto:tanishq.career@gmail.com" className="font-semibold hover:text-purple-500 transition-colors">tanishq.career@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 glass rounded-full text-purple-600">
                                    <Linkedin size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</p>
                                    <a href="https://www.linkedin.com/in/tanishq-sharma-/" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-purple-500 transition-colors">Connect on LinkedIn</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 glass rounded-full text-purple-600">
                                    <Github size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">GitHub</p>
                                    <a href="https://github.com/tanishqsharma7918" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-purple-500 transition-colors">Follow my Code</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 glass rounded-full text-purple-600">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                                    <p className="font-semibold">New Delhi, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-card p-8 rounded-2xl"
                    >
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Name</label>
                                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Email</label>
                                <input type="email" placeholder="email@example.com" className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Message</label>
                                <textarea rows="4" placeholder="Your Message..." className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400" />
                            </div>
                            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2">
                                Send Message <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
