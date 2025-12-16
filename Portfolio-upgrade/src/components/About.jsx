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
                    {/* Left: Image Placeholder */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative h-[400px] w-full glass-card flex items-center justify-center overflow-hidden">
                            <User size={100} className="text-purple-300 opacity-50" />
                            {/* Note: User should replace this with actual image <img src="" /> */}
                            <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500">Profile Image Placeholder</div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">About Me</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            I am a Business Analytics graduate skilled in <span className="text-purple-600 font-semibold">Python, Machine Learning, Data Pipelines, and Automation</span>.
                            I enjoy building data-driven apps and dashboards that transform complex information into actionable insights.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            With a background in Computer Science and a Master's from the University of Birmingham, I bridge the gap between technical engineering and business strategy.
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
    <div className="p-4 glass rounded-xl hover:bg-white/40 transition-colors">
        <div className="text-purple-500 mb-2">{icon}</div>
        <h3 className="font-bold mb-1">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">{skills}</p>
    </div>
);

export default About;
