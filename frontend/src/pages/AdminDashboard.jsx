import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Calendar } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: '', description: '', date: '', time: '', venue: '', category: 'Technical', organizer: '', image_url: ''
    });

    useEffect(() => {
        if (!localStorage.getItem('isAdmin')) {
            navigate('/admin');
            return;
        }
        fetchEvents();
    }, [navigate]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/events/');
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await axios.delete(`http://localhost:8000/events/${id}`);
                fetchEvents();
            } catch (error) {
                console.error("Error deleting event", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/events/', newEvent);
            setNewEvent({ title: '', description: '', date: '', time: '', venue: '', category: 'Technical', organizer: '', image_url: '' });
            fetchEvents();
            alert("Event added successfully!");
        } catch (error) {
            console.error("Error adding event", error);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <button
                    onClick={() => { localStorage.removeItem('isAdmin'); navigate('/'); }}
                    className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                >
                    Logout
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Event Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold mb-6 flex items-center">
                            <Plus size={20} className="mr-2 text-indigo-600" /> Add New Event
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                placeholder="Event Title"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Description"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                rows="3"
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    value={newEvent.date}
                                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                    required
                                />
                                <input
                                    type="time"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    value={newEvent.time}
                                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                                    required
                                />
                            </div>
                            <input
                                placeholder="Venue"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                value={newEvent.venue}
                                onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                                required
                            />
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                value={newEvent.category}
                                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                            >
                                <option>Technical</option>
                                <option>Cultural</option>
                                <option>Sports</option>
                                <option>Workshop</option>
                                <option>Guest Lecture</option>
                            </select>
                            <input
                                placeholder="Organizer"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                value={newEvent.organizer}
                                onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Image URL (Optional)"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                value={newEvent.image_url}
                                onChange={(e) => setNewEvent({ ...newEvent, image_url: e.target.value })}
                            />
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex justify-center items-center"
                            >
                                <Plus size={18} className="mr-2" /> Create Event
                            </button>
                        </form>
                    </div>
                </div>

                {/* Event List */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold mb-4">Manage Events ({events.length})</h2>
                    {events.map(event => (
                        <div key={event.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition">
                            <div className="flex items-center space-x-4">
                                <div className="h-12 w-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                    <img src={event.image_url || 'https://via.placeholder.com/150'} alt="" className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{event.title}</h3>
                                    <p className="text-sm text-gray-500 flex items-center">
                                        <Calendar size={14} className="mr-1" /> {event.date} • {event.category}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(event.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                title="Delete Event"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
