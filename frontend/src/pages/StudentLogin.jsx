import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentLogin = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        full_name: '' // Only for signup
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Because our backend "Login" endpoint auto-creates users if they don't exist (Hackathon shortcut),
            // we can use the login endpoint for both. 
            // In a real app, we'd have separate register/login endpoints.

            // However, to support capturing "full_name" on first login (registration), we might need to adjust logic slightly
            // or just pass full_name if available.
            // Our backend login/create currently only takes username/password in schema for creation if we use "AdminCreate".
            // BUT wait, I created a specific `student_login` endpoint that takes `StudentCreate` which has `full_name`?
            // Let's check schema: StudentCreate has `password`, `username`, `full_name`.
            // Yes!

            const endpoint = 'http://localhost:8000/students/login';

            const payload = {
                username: formData.username,
                password: formData.password,
                full_name: formData.full_name || "Student" // Default if logging in
            };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.detail || 'Authentication failed');
            }

            const data = await response.json();

            // Store auth info
            localStorage.setItem('student_user', JSON.stringify({
                username: data.username,
                full_name: data.full_name
            }));

            navigate('/student-dashboard');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900 bg-grid-pattern">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
                    <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <User size={32} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Student Zone</h2>
                    <p className="text-indigo-100">Access your dashboard, timetable, and alerts.</p>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Toggle header */}
                        <div className="flex justify-center mb-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                            <button
                                type="button"
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-all ${isLogin ? 'bg-white dark:bg-gray-800 text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-all ${!isLogin ? 'bg-white dark:bg-gray-800 text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                            >
                                Register
                            </button>
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserPlus size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-primary focus:border-primary transition-colors"
                                        placeholder="John Doe"
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-primary focus:border-primary transition-colors"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-primary focus:border-primary transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <span className="flex items-center">
                                    {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} className="ml-2" />
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-xs text-gray-500">
                        By continuing, you agree to our Terms of Service and Privacy Policy.
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default StudentLogin;
