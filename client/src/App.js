import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/authpage/authpage';
import HomePage from './pages/homepage/homepage';
import TradePage from './pages/tradepage/tradepage';
import Navbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };


  const updateLoginStatus = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={!isLoggedIn ? <AuthPage onLoginSuccess={handleLoginSuccess} /> : <Navigate replace to="/home" />} />
        <Route path="/home" element={isLoggedIn ? <HomePage onLogout={() => updateLoginStatus(false)}/> : <Navigate replace to="/" />} />
        <Route path="/trade" element={isLoggedIn ? <TradePage /> : <Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;