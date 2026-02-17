import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2024, 2)); // March 2024
    const [selectedDate, setSelectedDate] = useState(null);

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const events = [
        { date: 15, title: "Tech Hackathon" },
        { date: 25, title: "Football Finals" },
        { date: 10, title: "AI Workshop" },
        { date: 12, title: "Guest Lecture" },
    ];

    const getEventsForDay = (day) => events.filter(e => e.date === day);

    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 flex items-center justify-between border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h2>
                    <div className="flex space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ChevronLeft size={20} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-px bg-gray-200">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="bg-gray-50 p-4 text-center text-sm font-semibold text-gray-500">
                            {day}
                        </div>
                    ))}

                    {[...Array(firstDayOfMonth)].map((_, i) => (
                        <div key={`empty-${i}`} className="bg-white min-h-[120px]" />
                    ))}

                    {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1;
                        const daysEvents = getEventsForDay(day);
                        return (
                            <div
                                key={day}
                                className={`bg-white min-h-[120px] p-2 border-t border-transparent hover:border-indigo-500 transition-colors cursor-pointer group`}
                                onClick={() => setSelectedDate(day)}
                            >
                                <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${daysEvents.length > 0 ? 'bg-indigo-600 text-white' : 'text-gray-700 group-hover:bg-gray-100'}`}>
                                    {day}
                                </span>
                                <div className="mt-2 space-y-1">
                                    {daysEvents.map((evt, idx) => (
                                        <div key={idx} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded truncate border border-indigo-100">
                                            {evt.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
