import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import MouseTrackerCard from './MouseTrackerCard';
import LevitatingCard from './LevitatingCard';

const testimonials = [
    {
        name: 'Juan Yanes',
        role: 'Founder & CEO at Blackmont Consulting',
        initials: 'JY',
        content: 'I had the pleasure of supervising Tanishq during his time at Blackmont Consulting, where he consistently stood out as a highly proactive and dependable team member. From day one, Tanishq demonstrated strong leadership qualities—he not only took full ownership of his responsibilities but also actively supported and guided his peers throughout the project.\n\nHis ability to stay organized, focused, and solution-oriented made a significant impact on our team\'s performance. Tanishq consistently met and exceeded his objectives, delivering high-quality work under tight deadlines. His strategic thinking, initiative, and collaborative spirit contributed to a positive and productive working environment.\n\nTanishq\'s work ethic and professionalism are exemplary, and I\'m confident he will bring tremendous value to any team or organization he joins. It was a real pleasure working with him, and I look forward to seeing all that he accomplishes in the future.',
        color: 'from-purple-500 to-indigo-500'
    },
    {
        name: 'Shahrukh Hasnine',
        role: 'Business Analyst and Market Operation Director at Nagad',
        initials: 'SH',
        content: 'I am thrilled to highly recommend Tanishq, with whom I had the pleasure of collaborating during our MSc—Business Analytics program. Tanishq consistently demonstrated exceptional proactiveness and a remarkable team-player attitude throughout our capstone project.\n\nFrom the outset, Tanishq took the initiative to ensure that our project was well-organized and that every team member was aligned with our objectives. He contributed innovative ideas and encouraged open communication, fostering an environment where everyone felt comfortable sharing their thoughts. His ability to listen and incorporate feedback from all team members significantly impacted the quality of our work.\n\nTanishq\'s strong analytical skills and attention to detail were evident as he quickly tackled complex problems, providing insights that drove our project forward. His enthusiasm for our project and commitment to the team\'s success were inspiring.\n\nI do not doubt that Tanishq will excel in any endeavour he pursues, and I am confident that he will continue to be a valuable asset in any team setting. I wholeheartedly recommend Tanishq for any opportunity that comes his way!',
        color: 'from-emerald-500 to-teal-500'
    }
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient">What People Say</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Recommendations from colleagues and mentors I've worked with
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const TestimonialCard = ({ testimonial, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="h-full"
        >
            <LevitatingCard>
                <MouseTrackerCard className="flex flex-col h-full p-8">
                    {/* Gradient Blob */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${testimonial.color} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                    
                    {/* Quote Icon */}
                    <div className="flex items-start gap-4 mb-6">
                        <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-xl`}>
                            {testimonial.initials}
                        </div>
                        <div className="flex-1">
                            <Quote size={32} className="text-cyan-500/30 dark:text-cyan-400/30 mb-2" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 mb-6">
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">
                            "{testimonial.content}"
                        </p>
                    </div>

                    {/* Author */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h4 className="font-bold text-lg mb-1">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                </MouseTrackerCard>
            </LevitatingCard>
        </motion.div>
    );
};

export default Testimonials;
