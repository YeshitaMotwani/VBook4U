import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Booking from "./pages/Booking";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import SeatSelection from "./components/SeatSelection";
import Payment from "./pages/Payment";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const [auth, setAuth] = useState(null);

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const ProtectedRoute = ({ children, isAllowed }) => {
    const token = localStorage.getItem("authToken");

    if (!token || !isAllowed) {
      return (
        <Navigate
          to={auth?.role === "admin" ? "/admin-dashboard" : "/user-dashboard"}
        />
      );
    }

    return children;
  };

  return (
    <Router>
      <Navbar
        isAuthenticated={!!auth}
        userRole={auth?.role}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Home isAuthenticated={!!auth} />} />
        <Route path="/about" element={<About></About>} />
        <Route path="/bookings/:id" element={<Booking />} /> 
        {/* /bookings or /booking ->*/}
        <Route path="/bookings/seat-selection/:id" element={<SeatSelection />} />
        
        <Route path="/payment" element={<Payment />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/logout" element={<Logout setAuth={setAuth} />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute isAllowed={auth?.role === "user"}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute isAllowed={auth?.role === "admin"}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
