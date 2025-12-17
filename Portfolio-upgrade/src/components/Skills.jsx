import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Brain } from 'lucide-react';
import MouseTrackerCard from './MouseTrackerCard';
import LevitatingCard from './LevitatingCard';

const skillsData = [
    {
        category: 'Programming Languages',
        icon: Code,
        count: '4+',
        skills: [
            { name: 'Python', level: 95 },
            { name: 'SQL', level: 90 },
            { name: 'JavaScript', level: 85 },
            { name: 'R', level: 80 }
        ]
    },
    {
        category: 'Analytics Tools',
        icon: Database,
        count: '6+',
        skills: [
            { name: 'Power BI', level: 92 },
            { name: 'Tableau', level: 90 },
            { name: 'Excel', level: 95 },
            { name: 'PySpark', level: 85 },
            { name: 'Pandas', level: 93 },
            { name: 'NumPy', level: 90 }
        ]
    },
    {
        category: 'Machine Learning',
        icon: Brain,
        count: '8+',
        skills: [
            { name: 'Scikit-learn', level: 90 },
            { name: 'TensorFlow', level: 85 },
            { name: 'PyTorch', level: 82 },
            { name: 'LangChain', level: 88 },
            { name: 'OpenAI API', level: 90 },
            { name: 'FAISS', level: 85 },
            { name: 'XGBoost', level: 87 },
            { name: 'MLOps', level: 80 }
        ]
    }
];

const Skills = () => {
    return (
        <section id="skills" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient">Technical Skills</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Proficient in modern data science, analytics, and machine learning technologies
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillsData.map((category, index) => (
                        <SkillCard key={category.category} category={category} index={index} />
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center text-gray-500 dark:text-gray-400 mt-12"
                >
                    Also proficient in Git, REST APIs, Docker, FastAPI, Streamlit, and Agile methodologies
                </motion.p>
            </div>
        </section>
    );
};

const SkillCard = ({ category, index }) => {
    const Icon = category.icon;
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="h-full"
        >
            <LevitatingCard>
                <MouseTrackerCard className="group cursor-pointer h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                                <Icon size={24} className="text-cyan-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                {category.category}
                            </h3>
                        </div>
                        <span className="text-sm font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                            {category.count}
                        </span>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-4 flex-grow">
                        {category.skills.map((skill, idx) => (
                            <SkillBar key={skill.name} skill={skill} index={idx} />
                        ))}
                    </div>
                </MouseTrackerCard>
            </LevitatingCard>
        </motion.div>
    );
};

const SkillBar = ({ skill, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="space-y-2"
        >
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skill.name}
                </span>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {skill.level}%
                </span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 bg-gray-200 dark:bg-gray-700/50 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.05 + 0.2, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full relative"
                >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Skills;
