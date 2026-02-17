import React, { useState, useEffect } from 'react';
import { Award, Briefcase, Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const Experiences = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/experiences/');
            const data = await response.json();
            setExperiences(data);
        } catch (error) {
            console.error('Error fetching experiences:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 px-4 max-w-7xl mx-auto min-h-screen">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-indigo-600 mb-4">
                    Wall of Fame
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Inspiring stories from our students who conquered hackathons and secured top placements.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
                </div>
            ) : (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {experiences.map((exp, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            key={exp.id}
                            className="break-inside-avoid bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center mb-4">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                    {exp.student_name.charAt(0)}
                                </div>
                                <div className="ml-3">
                                    <h3 className="font-bold text-lg">{exp.student_name}</h3>
                                    <span className="flex items-center text-sm text-primary font-medium">
                                        {exp.achievement_type === 'Placement' ? <Briefcase size={14} className="mr-1" /> : <Award size={14} className="mr-1" />}
                                        {exp.achievement_type}
                                    </span>
                                </div>
                            </div>

                            <div className="relative">
                                <Quote size={24} className="absolute -top-2 -left-2 text-gray-200 dark:text-gray-700 transform -scale-x-100" />
                                <p className="text-gray-600 dark:text-gray-300 italic pl-4 mb-4 relative z-10">
                                    {exp.content}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {exp.company_or_event}
                                </span>
                                <div className="flex text-yellow-500">
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {experiences.length === 0 && (
                        <div className="col-span-full text-center py-20">
                            <Award size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-xl font-medium text-gray-500">No experiences yet</h3>
                            <p className="text-gray-400">Be the first to share your success story!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Experiences;
