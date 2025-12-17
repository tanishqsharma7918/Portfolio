import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('https://formspree.io/f/mrbnnkka', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _replyto: formData.email,
                    _subject: `New Portfolio Contact from ${formData.name}`
                })
            });

            if (response.ok) {
                setStatus({
                    type: 'success',
                    message: 'Message sent successfully! I\'ll get back to you within 24 hours.'
                });
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Failed to send message. Please try emailing me directly at tanishq.822@gmail.com'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                    <a href="mailto:tanishq.822@gmail.com" className="font-semibold hover:text-purple-500 transition-colors">tanishq.822@gmail.com</a>
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
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name" 
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition-all" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Your Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="email@example.com" 
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition-all" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Message</label>
                                <textarea 
                                    rows="4" 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your Message..." 
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 resize-none transition-all" 
                                />
                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    💌 I'll reply within 24 hours!
                                </p>
                            </div>

                            {/* Status Messages */}
                            {status.message && (
                                <div className={`p-4 rounded-xl flex items-center gap-2 ${
                                    status.type === 'success' 
                                        ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' 
                                        : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                                }`}>
                                    {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                    <p className="text-sm">{status.message}</p>
                                </div>
                            )}

                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
