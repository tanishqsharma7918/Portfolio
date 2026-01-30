import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Building2 } from 'lucide-react';

const experiences = [
    {
        role: 'Machine Learning Engineer',
        company: 'Culinda Inc.',
        period: 'Jan 2026 - Present',
        location: 'Hyderabad',
        responsibilities: [
            'Developing and implementing advanced machine learning models to address complex business challenges, ensuring optimal utilization of data resources',
            'Driving research and development initiatives to explore the latest in AI and ML advancements, supporting Culinda\'s goal to remain at the forefront of the industry',
            'Building and deploying deep learning-based models that enhance the efficiency and effectiveness of data-driven decision-making processes'
        ],
        skills: ['LLMs', 'RAG', 'MLOps', 'Scalable ML Systems', 'Model Deployment', 'Inference Optimization & Monitoring']
    },
    {
        role: 'AI/ML Engineering Analyst Intern',
        company: 'Victoria Solutions',
        period: 'Jul 2025 - Aug 2025',
        location: 'Remote',
        responsibilities: [
            'Built production XGBoost churn prediction microservice processing 15K+ daily predictions with 94.2% accuracy',
            'Engineered MLOps pipeline reducing deployment time by 95%',
            'Implemented automated model monitoring and retraining workflows'
        ],
        skills: ['FastAPI', 'Docker', 'MLOps', 'MongoDB', 'XGBoost']
    },
    {
        role: 'Data Analyst Intern',
        company: 'Blackmont Consulting',
        period: 'Jan 2025 - Apr 2025',
        location: 'Remote',
        responsibilities: [
            'Led an 8-member analytics team to develop reporting frameworks',
            'Diagnosed data inconsistencies improving reporting accuracy by 25%',
            'Created interactive dashboards for executive decision-making'
        ],
        skills: ['Tableau', 'Power BI', 'Excel', 'Leadership', 'SQL']
    },
    {
        role: 'Strategic Design Consultant',
        company: 'Turner & Townsend',
        period: 'Jun 2024 - Jul 2024',
        location: 'London, UK',
        responsibilities: [
            'Conducted customer data analysis to identify process inefficiencies',
            'Partnered with delivery teams to resolve 90% of workflow issues',
            'Presented strategic recommendations to senior leadership'
        ],
        skills: ['Strategy', 'Data Analysis', 'Stakeholder Management']
    },
    {
        role: 'Software Trainee',
        company: 'Entrepreneurship Cell, IIT Kharagpur',
        period: 'Nov 2021 - Jan 2022',
        location: 'Kharagpur, India',
        responsibilities: [
            'Automated log-file processing reducing manual interventions by 40%',
            'Optimized database stored procedures improving performance by 30%',
            'Developed data pipelines for business intelligence reporting'
        ],
        skills: ['Python', 'SQL', 'Automation', 'ETL']
    }
];

const Experience = () => {
    return (
        <section id="experience" className="py-20 relative">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        The Route Map
                    </h2>
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-1 w-16 bg-blue-600 dark:bg-blue-400"></div>
                        <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">The Journey</p>
                        <div className="h-1 w-16 bg-blue-600 dark:bg-blue-400"></div>
                    </div>
                </motion.div>

                <div className="relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-blue-600/30 dark:bg-blue-400/30"></div>

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative pl-12"
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 top-6 w-10 h-10 rounded-full bg-white dark:bg-gray-900 border-4 border-blue-600 dark:border-blue-400 flex items-center justify-center shadow-lg">
                                    <div className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></div>
                                </div>

                                {/* Experience Card */}
                                <div className="glass-card p-6 rounded-xl border-2 border-blue-600/30 dark:border-blue-400/30 hover:border-blue-600 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 group">
                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {exp.role}
                                            </h3>
                                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium mb-2">
                                                <Building2 size={18} />
                                                <span className="text-lg">{exp.company}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg whitespace-nowrap">
                                            <Calendar size={16} />
                                            <span className="font-medium">{exp.period}</span>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        <MapPin size={16} />
                                        <span>{exp.location}</span>
                                    </div>

                                    {/* Responsibilities */}
                                    <ul className="space-y-3 mb-6">
                                        {exp.responsibilities.map((resp, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 flex-shrink-0"></span>
                                                <span className="leading-relaxed">{resp}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        {exp.skills.map((skill, i) => (
                                            <span 
                                                key={i} 
                                                className="px-3 py-1.5 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* End of Timeline Marker */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="relative pl-12 mt-8"
                    >
                        <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 flex items-center justify-center shadow-lg">
                            <Briefcase size={20} className="text-white" />
                        </div>
                        <div className="glass-card p-4 rounded-xl border-2 border-dashed border-blue-600/30 dark:border-blue-400/30 text-center">
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                Looking for the next opportunity to make an impact! 🚀
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
