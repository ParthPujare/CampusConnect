import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Search, Home, Shield, Sun, Moon } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const [darkMode, setDarkMode] = React.useState(false);

    React.useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/explore', label: 'Explore', icon: Search },
        { path: '/calendar', label: 'Calendar', icon: Calendar },
        { path: '/admin', label: 'Admin', icon: Shield },
    ];

    return (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">C</div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">CampusConnect</span>
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-1 transition-colors duration-200 ${isActive ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-500'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span>{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute bottom-0 h-0.5 bg-indigo-600 w-full"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 ml-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
