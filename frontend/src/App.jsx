import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Calendar from './pages/Calendar';
import EventDetail from './pages/EventDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Hackathons from './pages/Hackathons';
import Experiences from './pages/Experiences';
import StudentLogin from './pages/StudentLogin';
import StudentDashboard from './pages/StudentDashboard';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/admin';

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/hackathons" element={<Hackathons />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
