import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
    {
        role: 'AI/ML Engineering Analyst Intern',
        company: 'Victoria Solutions',
        period: 'Jul 2025 - Aug 2025',
        description: 'Built production XGBoost churn prediction microservice processing 15K+ daily predictions with 94.2% accuracy. Engineered MLOps pipeline reducing deployment time by 95%.',
        skills: ['FastAPI', 'Docker', 'MLOps', 'MongoDB']
    },
    {
        role: 'Data Analyst Intern',
        company: 'Blackmont Consulting',
        period: 'Jan 2025 - Apr 2025',
        description: 'Led an 8-member analytics team to develop reporting frameworks. Diagnosed data inconsistencies improving reporting accuracy by 25%.',
        skills: ['Tableau', 'Power BI', 'Excel', 'Leadership']
    },
    {
        role: 'Strategic Design Consultant',
        company: 'Turner & Townsend',
        period: 'Jun 2024 - Jul 2024',
        description: 'Conducted customer data analysis to identify process inefficiencies. Partnered with delivery teams to resolve 90% of workflow issues.',
        skills: ['Strategy', 'Data Analysis', 'Stakeholder Management']
    },
    {
        role: 'Software Trainee',
        company: 'Entrepreneurship Cell, IIT Kharagpur',
        period: 'Nov 2021 - Jan 2022',
        description: 'Automated log-file processing reducing manual interventions by 40%. Optimized database stored procedures improving performance by 30%.',
        skills: ['Python', 'SQL', 'Automation']
    }
];

const Experience = () => {
    return (
        <section id="experience" className="py-20 relative">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Experience</h2>
                    <p className="text-gray-600 dark:text-gray-300">My professional journey in tech and analytics.</p>
                </motion.div>

                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card p-6 md:p-8 relative overflow-hidden group hover:bg-white/50 dark:hover:bg-black/50 transition-colors"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gradient-blue">{exp.role}</h3>
                                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">{exp.company}</p>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mt-2 md:mt-0">
                                    <Calendar size={16} className="mr-2" />
                                    {exp.period}
                                </div>
                            </div>

                            <ul className="mb-4 text-gray-600 dark:text-gray-400 list-disc list-inside space-y-2">
                                {/* Splitting description into sentences for bullets if needed, or just 1 paragraph */}
                                <p>{exp.description}</p>
                            </ul>

                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                                {exp.skills.map((skill, i) => (
                                    <span key={i} className="text-xs font-semibold px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-300">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
