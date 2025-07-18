import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import AdminLayout from "./pages/AdminDashboard"; // Admin Layout (sidebar + outlet)
import AdminDashboard from "./pages/Dashboard"; // Charts Dashboard Page
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Profile } from "./pages/Profile";
import Users from "./pages/Users";
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("auth") === "true"
  );

  const ProtectedRoute = ({ element, role }) => {
    const isAuth = localStorage.getItem("auth") === "true";
    const currentRole = localStorage.getItem("role");

    if (!isAuth) return <Navigate to="/login" />;
    if (role && currentRole !== role) return <Navigate to="/login" />;

    return element;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<Register />} />

        {/* Admin layout */}
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute role="admin" element={<AdminLayout />} />
          }
        >
          <Route index element={<AdminDashboard />} /> {/* default dashboard */}
          <Route path="users" element={<Users />} />
        </Route>

        {/* User layout */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user" element={<UserDashboard />} />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute role="user" element={<Profile />} />
          }
        />
      </Routes>
    </Router>
  );
}
