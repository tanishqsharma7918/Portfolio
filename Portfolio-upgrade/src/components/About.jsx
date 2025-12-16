import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, Database, Brain } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    {/* Left: Profile Photo */}
                    <div className="relative group flex justify-center items-center">
                        <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative h-[500px] w-[380px] mx-auto glass-card flex items-center justify-center overflow-hidden p-6">
                            <img 
                                src="/profile.jpg" 
                                alt="Tanishq Sharma" 
                                className="rounded-2xl border-4 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)] object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            <span className="text-gradient">About Me</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            Data-driven professional with a Computer Science foundation and an <span className="text-cyan-600 dark:text-cyan-400 font-semibold">MSc in Business Analytics from the University of Birmingham</span>.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            I work across the analytics and machine learning stack—transforming and modeling data with <span className="text-purple-600 dark:text-purple-400 font-semibold">SQL, Python, and PySpark</span>, building predictive and anomaly-detection models, and developing secure, production-ready <span className="text-cyan-600 dark:text-cyan-400 font-semibold">LLM and RAG-based systems</span>.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            I have delivered scalable data solutions across <span className="text-emerald-600 dark:text-emerald-400 font-semibold">consulting, healthcare, and technology</span>, enabling trusted metrics, automating intelligence workflows, and supporting data-driven decision-making in production.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <SkillCard icon={<Code size={24} />} title="Development" skills="Python, SQL, React" />
                            <SkillCard icon={<Brain size={24} />} title="AI / ML" skills="PyTorch, OpenAI, RAG" />
                            <SkillCard icon={<Database size={24} />} title="Data" skills="Pandas, Spark, MongoDB" />
                            <SkillCard icon={<User size={24} />} title="Analytics" skills="PowerBI, Tableau, Excel" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const SkillCard = ({ icon, title, skills }) => (
    <div className="p-4 glass rounded-xl hover:bg-white/50 dark:hover:bg-white/10 transition-colors border border-white/20">
        <div className="text-cyan-500 dark:text-cyan-400 mb-2">{icon}</div>
        <h3 className="font-bold mb-1">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">{skills}</p>
    </div>
);

export default About;
