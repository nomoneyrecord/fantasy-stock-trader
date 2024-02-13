import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import AuthPage from './pages/authpage/authpage';
import TradePage from './pages/tradepage/tradepage';
import Navbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token)
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  


  return (
    <Router>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path='/' element={!isLoggedIn ? <AuthPage /> : <Navigate to='/home' replace />} />
        <Route path='/home' element={isLoggedIn ? <HomePage /> : <Navigate to='/' replace />} />
        <Route path='trade' element={isLoggedIn ? <TradePage /> : <Navigate to='/' replace />} />
        <Route path='*' element={<Navigate to={isLoggedIn ? '/home' : '/'} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
