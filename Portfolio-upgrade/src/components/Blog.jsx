import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import MouseTrackerCard from './MouseTrackerCard';
import LevitatingCard from './LevitatingCard';

const blogs = [
    {
        title: 'The Future of AI Agents in Business Analytics',
        excerpt: 'How autonomous agents are transforming decision-making processes in modern enterprises.',
        date: 'Dec 15, 2025',
        readTime: '5 min read',
        tags: ['AI', 'Analytics', 'Business']
    },
    {
        title: 'Building Scalable RAG Pipelines',
        excerpt: 'A deep dive into optimizing retrieval-augmented generation systems for large-scale data.',
        date: 'Nov 28, 2025',
        readTime: '8 min read',
        tags: ['RAG', 'LLM', 'Engineering']
    },
    {
        title: 'From Data Analyst to AI/ML Engineer',
        excerpt: 'My journey and key learnings transitioning from traditional analytics to machine learning engineering.',
        date: 'Oct 10, 2025',
        readTime: '6 min read',
        tags: ['Career', 'Learning', 'Growth']
    }
];

const Blog = () => {
    return (
        <section id="blog" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Latest Insights</h2>
                    <p className="text-gray-600 dark:text-gray-300">Thoughts on technology, data, and innovation.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <LevitatingCard>
                                <MouseTrackerCard className="group cursor-pointer h-full flex flex-col">
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                <span>{blog.date}</span>
                                <span>{blog.readTime}</span>
                            </div>

                            <h3 className="text-xl font-bold mb-3 group-hover:text-purple-500 transition-colors">{blog.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{blog.excerpt}</p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex gap-2">
                                    {blog.tags.map((tag, i) => (
                                        <span key={i} className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-600 dark:text-purple-300">#{tag}</span>
                                    ))}
                                </div>
                                <ArrowRight size={16} className="text-purple-500 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                            </div>
                                </MouseTrackerCard>
                            </LevitatingCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
