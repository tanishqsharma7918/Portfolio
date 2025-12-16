import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
    const skills = [
        { name: 'Python', level: 95, color: 'from-blue-400 to-blue-600' },
        { name: 'SQL / NoSQL', level: 90, color: 'from-green-400 to-green-600' },
        { name: 'Machine Learning / GenAI', level: 85, color: 'from-purple-400 to-purple-600' },
        { name: 'Power BI / Tableau', level: 90, color: 'from-orange-400 to-orange-600' },
        { name: 'React / JavaScript', level: 80, color: 'from-cyan-400 to-cyan-600' },
        { name: 'PyTorch / TensorFlow', level: 85, color: 'from-red-400 to-red-600' },
    ];

    return (
        <section id="skills" className="py-20 relative">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
                        <span className="text-gradient">Technical Skills</span>
                    </h2>

                    <div className="space-y-6">
                        {skills.map((skill, index) => (
                            <SkillBar
                                key={skill.name}
                                skill={skill}
                                index={index}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const SkillBar = ({ skill, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="space-y-2"
        >
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {skill.name}
                </h3>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {skill.level}%
                </span>
            </div>
            
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Skills;
