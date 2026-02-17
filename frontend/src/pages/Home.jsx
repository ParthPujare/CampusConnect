import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EventCard from '../components/EventCard';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [featuredEvents, setFeaturedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Fetch first 3 events as featured
                const response = await axios.get('http://localhost:8000/events/?limit=3');
                setFeaturedEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="min-h-screen pt-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white mb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6"
                    >
                        Discover Campus <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">Experiences</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-xl text-gray-500 mb-10"
                    >
                        The ultimate hub for all college events. Join workshops, cultural fests, hackathons, and more. Never miss out again.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex justify-center space-x-4"
                    >
                        <Link to="/explore" className="px-8 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30 flex items-center">
                            Explore Events <ArrowRight size={18} className="ml-2" />
                        </Link>
                        <Link to="/calendar" className="px-8 py-3 rounded-full bg-white text-gray-700 border border-gray-200 font-medium hover:bg-gray-50 transition shadow-sm">
                            View Calendar
                        </Link>
                    </motion.div>
                </div>

                {/* Abstract Background Element */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -z-10 w-full h-full opacity-30 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>
            </section>

            {/* Featured Events */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
                        <p className="text-gray-500 mt-2">Handpicked events you can't miss</p>
                    </div>
                    <Link to="/explore" className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center group">
                        View all <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-20">Loading amazing events...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
