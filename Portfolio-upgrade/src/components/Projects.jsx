import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, Folder } from 'lucide-react';
import MouseTrackerCard from './MouseTrackerCard';
import LevitatingCard from './LevitatingCard';

const projects = [
    {
        title: 'Competitor Analysis Engine',
        description: 'AI-powered market intelligence platform that transforms 3-5 days of manual research into actionable insights within 5-10 minutes using GPT-4o.',
        features: ['Multi-Step Discovery', 'Live Web Research', 'Strategic Insights', 'Export to PPT/Excel'],
        tech: ['Python', 'Streamlit', 'GPT-4o', 'Plotly'],
        github: 'https://github.com/tanishqsharma7918/Competitor-Analysis-Engine',
        demo: 'https://competitor-analysis-engine.streamlit.app/',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&q=80',
        color: 'from-purple-500 to-indigo-500'
    },
    {
        title: 'AI Daily Digest',
        description: 'Multi-agent newsletter generator that automates fetching, summarizing, and delivering the latest AI and tech headlines as elegant HTML newsletters.',
        features: ['Multi-Source RSS Hunter', 'AI Summarization', 'Email Automation', 'LangGraph Agents'],
        tech: ['Python', 'LangChain', 'GPT-4o', 'SendGrid'],
        github: 'https://github.com/tanishqsharma7918/AI-Daily-Digest',
        demo: null,
        image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=450&fit=crop&q=80',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        title: 'RAG-MCP Chatbot',
        description: 'Contextual AI Assistant for ML queries using Retrieval-Augmented Generation and LangGraph agents for dynamic document retrieval.',
        features: ['RAG Architecture', 'FAISS Vector Store', 'Context Memory', 'Real-time Interaction'],
        tech: ['Python', 'Streamlit', 'LangChain', 'FAISS'],
        github: 'https://github.com/tanishqsharma7918/RAG-MCP-chatbot/tree/main/rag-mcp-app',
        demo: null,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop&q=80',
        color: 'from-emerald-500 to-teal-500'
    },
    {
        title: 'AI Pulse News',
        description: 'Production-ready full-stack intelligence engine that aggregates, clusters, and ranks high-impact AI news from 20+ sources. Features topic clustering, popularity scoring, and automated RSS ingestion.',
        features: ['Topic Clustering', 'Popularity Scoring', 'Automated Ingestion', 'Social Broadcasting'],
        tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'Docker'],
        github: 'https://github.com/tanishqsharma7918/AI-News-Dashboard',
        demo: 'https://ai-news-frontend-d1ld.onrender.com/',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=450&fit=crop&q=80',
        color: 'from-orange-500 to-red-500'
    },
    {
        title: 'NHS Healthcare Dashboards',
        description: 'Built interactive dashboards for Hospital Patient Care Activity and Mental Health trends using NHS and UK Government data sources.',
        features: ['Data Integration', 'Interactive Visualizations', 'Performance Tracking', 'Public Awareness'],
        tech: ['Tableau', 'Power BI', 'Excel', 'SQL'],
        github: 'https://github.com/tanishqsharma7918',
        demo: null,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        color: 'from-pink-500 to-rose-500'
    },
    {
        title: 'Marketing Analytics Segmentation',
        description: 'Full marketing analytics workflow on airline passenger satisfaction with econometric modelling and predictive classification achieving 77.6% accuracy.',
        features: ['Regression Modeling', 'Logistic Classification', 'ROC-AUC Analysis', 'Feature Engineering'],
        tech: ['Python', 'Scikit-learn', 'Pandas', 'Excel'],
        github: 'https://github.com/tanishqsharma7918',
        demo: null,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        color: 'from-violet-500 to-purple-500'
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient">Featured Projects</span>
                    </h2>
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
            className="h-full"
        >
            <LevitatingCard>
                <MouseTrackerCard className="flex flex-col h-full group cursor-pointer p-6">
                {/* Gradient Blob Background for Card */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${project.color} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`} />

            <div className="mb-6 rounded-xl bg-gray-100 dark:bg-gray-800 h-48 flex items-center justify-center overflow-hidden border border-white/10 relative group/image">
                {/* Project Screenshot/Image */}
                {project.image ? (
                    <img 
                        src={project.image} 
                        alt={`${project.title} preview`}
                        className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                {/* Fallback Icon */}
                <div className={`absolute inset-0 flex items-center justify-center ${project.image ? 'hidden' : 'flex'}`}>
                    <Folder size={48} className="text-gray-400 opacity-50" />
                </div>
            </div>

            <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-500 transition-colors">{project.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">{project.description}</p>

            <ul className="mb-6 space-y-1">
                {project.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2" />
                        {feature}
                    </li>
                ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-4 mt-auto">
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium hover:text-cyan-500 transition-colors"
                >
                    <Github size={18} /> Code
                </a>
                {project.demo && (
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium hover:text-cyan-500 transition-colors"
                    >
                        <ExternalLink size={18} /> Demo
                    </a>
                )}
            </div>
                </MouseTrackerCard>
            </LevitatingCard>
        </motion.div>
    );
};

export default Projects;
