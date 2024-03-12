import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/authpage/authpage';
import HomePage from './pages/homepage/homepage';
import TradePage from './pages/tradepage/tradepage';
import Navbar from './components/Navbar';
import { jwtDecode } from 'jwt-decode'; // Ensure this is correctly imported

function App() {
  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(checkToken);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(checkToken());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={!isLoggedIn ? <AuthPage onLoginSuccess={handleLoginSuccess} /> : <Navigate replace to="/home" />} />
        <Route path="/home" element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate replace to="/" />} />
        <Route path="/trade" element={isLoggedIn ? <TradePage /> : <Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
