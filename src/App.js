import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Users from './pages/Users';
import Services from './pages/Services';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import { Contact } from './pages/Contact';
import { Profile } from './pages/Profile';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('auth') === 'true'
  );

  const ProtectedRoute = ({ element, role }) => {
    const isAuth = localStorage.getItem('auth') === 'true';
    const currentRole = localStorage.getItem('role');

    if (!isAuth) return <Navigate to="/login" />;
    if (role && currentRole !== role) return <Navigate to="/login" />;

    return element;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route path="/admin-dashboard" element={<ProtectedRoute role="admin" element={<AdminDashboard setIsAuthenticated={setIsAuthenticated} />} />} />
        <Route path="/users" element={<ProtectedRoute role="admin" element={<Users setIsAuthenticated={setIsAuthenticated} />} />} />
        <Route path="/services" element={<ProtectedRoute role="admin" element={<Services setIsAuthenticated={setIsAuthenticated} />} />} />
        <Route path="/reports" element={<ProtectedRoute role="admin" element={<Reports setIsAuthenticated={setIsAuthenticated} />} />} />
        <Route path="/settings" element={<ProtectedRoute role="admin" element={<Settings setIsAuthenticated={setIsAuthenticated} />} />} />

        {/* User routes */}
        <Route path="/user-dashboard" element={<ProtectedRoute role="user" element={<UserDashboard setIsAuthenticated={setIsAuthenticated} />} />} />
        <Route path="/contact" element={<ProtectedRoute role="user" element={<Contact setIsAuthenticated={setIsAuthenticated} />} />} />
        <Route path="/profile" element={<ProtectedRoute role="user" element={<Profile setIsAuthenticated={setIsAuthenticated} />} />} />
      </Routes>
    </Router>
  );
}
