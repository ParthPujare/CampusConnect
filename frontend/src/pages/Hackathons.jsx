import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Trophy, Globe } from 'lucide-react';

const Hackathons = () => {
    const [hackathons, setHackathons] = useState([]);
    const [sponsoredOnly, setSponsoredOnly] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHackathons();
    }, [sponsoredOnly]);

    const fetchHackathons = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/hackathons/?sponsored=${sponsoredOnly}`);
            const data = await response.json();
            setHackathons(data);
        } catch (error) {
            console.error('Error fetching hackathons:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 px-4 max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">
                        Hackathons
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Compete, Create, and Conquer. Join the best hackathons.
                    </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <span className={`mr-3 text-sm font-medium ${!sponsoredOnly ? 'text-primary' : 'text-gray-500'}`}>All</span>
                    <button
                        onClick={() => setSponsoredOnly(!sponsoredOnly)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${sponsoredOnly ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'}`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${sponsoredOnly ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                    </button>
                    <span className={`ml-3 text-sm font-medium ${sponsoredOnly ? 'text-primary' : 'text-gray-500'}`}>Sponsored Only</span>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hackathons.map((hackathon) => (
                        <div key={hackathon.id} className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                            <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
                                {hackathon.image_url ? (
                                    <img src={hackathon.image_url} alt={hackathon.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-white/20">
                                        <Code size={64} />
                                    </div>
                                )}
                                {hackathon.is_sponsored === 1 && (
                                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-sm">
                                        <Trophy size={12} className="mr-1" /> SPONSORED
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{hackathon.title}</h3>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-4">
                                    <div className="flex items-center">
                                        <Calendar size={14} className="mr-1" />
                                        {hackathon.date}
                                    </div>
                                    <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
                                        <Trophy size={14} className="mr-1" />
                                        {hackathon.prize_pool}
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 text-sm">
                                    {hackathon.description}
                                </p>
                                <button className="w-full py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-medium hover:bg-primary hover:text-white transition-all duration-300">
                                    Register Now
                                </button>
                            </div>
                        </div>
                    ))}
                    {hackathons.length === 0 && (
                        <div className="col-span-full text-center py-20">
                            <Code size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-xl font-medium text-gray-500">No hackathons found</h3>
                            <p className="text-gray-400">Try adjusting your filters.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Hackathons;
