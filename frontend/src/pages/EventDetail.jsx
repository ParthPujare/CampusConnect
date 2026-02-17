import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, MapPin, User, Tag, Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/events/${id}`);
                setEvent(response.data);
            } catch (error) {
                console.error("Error fetching event:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleRegister = () => {
        // Mock registration
        setShowModal(true);
        setTimeout(() => {
            setIsRegistered(true);
            setShowModal(false);
        }, 2000);
    };

    if (loading) return <div className="pt-24 text-center">Loading...</div>;
    if (!event) return <div className="pt-24 text-center">Event not found</div>;

    return (
        <div className="min-h-screen pt-20 pb-12 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/explore" className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-6 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Explore
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="h-64 sm:h-96 relative">
                        <img
                            src={event.image_url || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent flex items-end">
                            <div className="p-8 text-white">
                                <span className="bg-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                                    {event.category}
                                </span>
                                <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
                                <div className="flex flex-wrap gap-4 text-sm font-medium opacity-90">
                                    <span className="flex items-center"><Calendar size={16} className="mr-1" /> {event.date}</span>
                                    <span className="flex items-center"><Clock size={16} className="mr-1" /> {event.time}</span>
                                    <span className="flex items-center"><MapPin size={16} className="mr-1" /> {event.venue}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Event</h2>
                                <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
                                    {event.description}
                                </p>

                                <h3 className="text-lg font-bold text-gray-900 mb-2">Organizer</h3>
                                <div className="flex items-center text-gray-700 mb-6">
                                    <User size={20} className="mr-2 text-indigo-600" />
                                    {event.organizer}
                                </div>
                            </div>

                            <div className="md:w-80 shrink-0">
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Registration</h3>
                                    {!isRegistered ? (
                                        <button
                                            onClick={handleRegister}
                                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30 flex justify-center items-center"
                                        >
                                            Register Now
                                        </button>
                                    ) : (
                                        <div className="w-full bg-green-100 text-green-700 py-3 rounded-lg font-semibold flex justify-center items-center border border-green-200">
                                            <CheckCircle size={20} className="mr-2" /> Registered
                                        </div>
                                    )}
                                    <p className="text-xs text-center text-gray-500 mt-3">
                                        Limited seats available. First come, first served.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Registration Mock Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-xl p-8 max-w-sm w-full text-center"
                        >
                            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Processing...</h3>
                            <p className="text-gray-500">Confirming your spot.</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EventDetail;
