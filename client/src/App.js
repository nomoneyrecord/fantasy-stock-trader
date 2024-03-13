import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Make sure you've installed jwt-decode
import AuthPage from './pages/authpage/authpage';
import HomePage from './pages/homepage/homepage';
import TradePage from './pages/tradepage/tradepage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [sessionExpired, setSessionExpired] = useState(false);

  // Function to check token validity
  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp > Date.now() / 150000;
    } catch (error) {
      return false;
    }
  };

  // Periodic token validation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!checkToken() && isLoggedIn) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setSessionExpired(true);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setSessionExpired(false); // Reset the session expired flag on logout
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setSessionExpired(false); // Reset the session expired flag on successful login
  };

  return (
    <Router>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={!isLoggedIn ? <AuthPage onLoginSuccess={handleLoginSuccess} sessionExpired={sessionExpired} /> : <Navigate replace to="/home" />} />
        <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate replace to="/" />} />
        <Route path="/trade" element={isLoggedIn ? <TradePage /> : <Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
