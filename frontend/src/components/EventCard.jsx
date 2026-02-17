import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
        >
            <div className="h-48 overflow-hidden relative">
                <img
                    src={event.image_url || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                    alt={event.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 uppercase tracking-wide shadow-sm">
                    {event.category}
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center text-sm text-gray-500 mb-2 space-x-4">
                    <div className="flex items-center space-x-1">
                        <Calendar size={14} className="text-pink-500" />
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <MapPin size={14} className="text-pink-500" />
                        <span className="truncate max-w-[100px]">{event.venue}</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">{event.description}</p>

                <Link
                    to={`/event/${event.id}`}
                    className="mt-auto block w-full py-2 text-center rounded-lg bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition-colors"
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    );
};

export default EventCard;
