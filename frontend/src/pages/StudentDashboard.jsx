import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, AlertTriangle, BookOpen, Calendar, Bell, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
    const [user, setUser] = useState(null);
    const [timetable, setTimetable] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('student_user');
        if (!storedUser) {
            navigate('/student-login');
            return;
        }
        setUser(JSON.parse(storedUser));
        fetchDashboardData();
    }, [navigate]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [timetableRes, alertsRes] = await Promise.all([
                fetch('http://localhost:8000/timetable/'),
                fetch('http://localhost:8000/alerts/')
            ]);

            const timetableData = await timetableRes.json();
            const alertsData = await alertsRes.json();

            setTimetable(timetableData);
            setAlerts(alertsData);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const shareToWhatsApp = (message) => {
        const text = encodeURIComponent(`🔔 CampusConnect Alert: ${message}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    const shareToLinkedIn = (message) => {
        const text = encodeURIComponent(`CampusConnect Alert: ${message}`);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&summary=${text}`, '_blank');
    };

    return (
        <div className="pt-24 px-4 max-w-7xl mx-auto min-h-screen pb-20">
            {user && (
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Welcome back, <span className="text-primary">{user.full_name}</span>!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">Here's what's happening today.</p>
                </div>
            )}

            {/* Alerts Section */}
            {alerts.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900 dark:text-white">
                        <Bell className="mr-2 text-yellow-500" /> Important Updates
                    </h2>
                    <div className="grid gap-4">
                        {alerts.map((alert) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={alert.id}
                                className={`p-4 rounded-xl border-l-4 shadow-sm ${alert.type === 'cancel' ? 'bg-red-50 dark:bg-red-900/20 border-red-500' :
                                        alert.type === 'reschedule' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500' :
                                            'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start flex-1">
                                        <AlertTriangle size={20} className={`mr-3 mt-0.5 flex-shrink-0 ${alert.type === 'cancel' ? 'text-red-700 dark:text-red-300' :
                                                alert.type === 'reschedule' ? 'text-yellow-700 dark:text-yellow-300' :
                                                    'text-blue-700 dark:text-blue-300'
                                            }`} />
                                        <div className="flex-1">
                                            <p className={`font-semibold ${alert.type === 'cancel' ? 'text-red-700 dark:text-red-300' :
                                                    alert.type === 'reschedule' ? 'text-yellow-700 dark:text-yellow-300' :
                                                        'text-blue-700 dark:text-blue-300'
                                                }`}>{alert.message}</p>
                                            <span className="text-xs opacity-75 mt-1 block">
                                                {new Date(alert.timestamp).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Share Buttons - Show for reschedule and cancel types */}
                                    {(alert.type === 'reschedule' || alert.type === 'cancel') && (
                                        <div className="flex gap-2 ml-4">
                                            <button
                                                onClick={() => shareToWhatsApp(alert.message)}
                                                className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
                                                title="Share on WhatsApp"
                                            >
                                                <Share2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => shareToLinkedIn(alert.message)}
                                                className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                                                title="Share on LinkedIn"
                                            >
                                                <Share2 size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Timetable Section */}
            <div>
                <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                    <Calendar className="mr-2 text-primary" /> Weekly Schedule
                </h2>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {days.map((day) => {
                            const dayClasses = timetable.filter(t => t.day === day);
                            return (
                                <div key={day} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                                    <div className="bg-gray-50 dark:bg-gray-700 p-3 text-center border-b border-gray-100 dark:border-gray-600">
                                        <h3 className="font-bold text-gray-900 dark:text-white">{day}</h3>
                                    </div>
                                    <div className="p-4 space-y-4">
                                        {dayClasses.length > 0 ? (
                                            dayClasses.map((cls) => (
                                                <div key={cls.id} className="relative pl-4 border-l-2 border-primary">
                                                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-white dark:ring-gray-800"></div>
                                                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{cls.subject}</p>
                                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        <Clock size={12} className="mr-1" /> {cls.time}
                                                    </div>
                                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        <MapPin size={12} className="mr-1" /> {cls.room}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8 text-gray-400 text-sm">
                                                No classes
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
