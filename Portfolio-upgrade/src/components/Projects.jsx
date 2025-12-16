import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, Folder } from 'lucide-react';

const projects = [
    {
        title: 'Competitor Analysis Engine',
        description: 'AI-powered competitor analysis platform automating market research workflows using multi-step LLM orchestration.',
        features: ['Multi-Step Discovery', 'Live Web Research', 'Strategic Insights', 'Export to PPT/Excel'],
        tech: ['Python', 'Streamlit', 'OpenAI', 'DuckDuckGo'],
        github: 'https://github.com/tanishqsharma7918/Competitor-Analysis-Engine',
        demo: 'https://competitor-analysis-engine.streamlit.app/',
        color: 'from-purple-500 to-indigo-500'
    },
    {
        title: 'Market News Dashboard',
        description: 'Automated AI-powered daily news digest system utilizing multi-agent orchestration to deliver tech headlines.',
        features: ['Multi-Source RSS Hunter', 'AI Summarization', 'Email Automation', 'LangGraph Agents'],
        tech: ['Python', 'LangChain', 'OpenAI', 'SendGrid'],
        github: 'https://github.com/tanishqsharma7918/AI-Daily-Digest',
        demo: null,
        color: 'from-blue-500 to-cyan-500'
    },
    {
        title: 'GitHub Automated Resume Builder',
        description: 'A tool to automatically generate professional resumes based on GitHub profile activity and repositories.',
        features: ['GitHub API Integration', 'Resume Parsing', 'PDF Generation', 'Custom Templates'],
        tech: ['Node.js', 'React', 'Puppeteer', 'GitHub Actions'],
        github: 'https://github.com/tanishqsharma7918',
        demo: null,
        color: 'from-emerald-500 to-teal-500'
    },
    {
        title: 'Python Automation Scripts',
        description: 'A comprehensive collection of utility scripts for automating daily tasks, file management, and data processing.',
        features: ['File Organization', 'Data Scraping', 'Auto-Reporting', 'System Maintenance'],
        tech: ['Python', 'Bash', 'Cron', 'Pandas'],
        github: 'https://github.com/tanishqsharma7918',
        demo: null,
        color: 'from-orange-500 to-red-500'
    }
];

const Projects = () => {
    return (
        <section id="projects" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        A selection of my recent work showcasing data engineering, AI agents, and full-stack development.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-6 flex flex-col h-full hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group"
        >
            {/* Gradient Blob Background for Card */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${project.color} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`} />

            <div className="mb-6 rounded-xl bg-gray-100 dark:bg-gray-800 h-48 flex items-center justify-center overflow-hidden border border-white/10 relative">
                {/* Placeholder for Screenshot */}
                <Folder size={48} className="text-gray-400 opacity-50" />
            </div>

            <h3 className="text-xl font-bold mb-2 group-hover:text-purple-500 transition-colors">{project.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">{project.description}</p>

            <ul className="mb-6 space-y-1">
                {project.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                        {feature}
                    </li>
                ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-4 mt-auto">
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium hover:text-purple-500 transition-colors"
                >
                    <Github size={18} /> Code
                </a>
                {project.demo && (
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium hover:text-purple-500 transition-colors"
                    >
                        <ExternalLink size={18} /> Demo
                    </a>
                )}
            </div>
        </motion.div>
    );
};

export default Projects;
