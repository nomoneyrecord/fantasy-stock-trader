import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import AuthPage from './pages/authpage/authpage';
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

  return (
    <Router>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path='/' element={!isLoggedIn ? <AuthPage onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/home" />} />
        <Route path='/home' element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} />
        <Route path='/trade' element={isLoggedIn ? <TradePage /> : <Navigate to="/" />} />
        {/* other routes as necessary */}
      </Routes>
    </Router>
  );
}


export default App;
