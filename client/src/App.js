import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import AuthPage from './pages/authpage/authpage';
import TradePage from './pages/tradepage/tradepage';
import Navbar from './components/Navbar';

function App() {
  const isLoggedIn = localStorage.getItem('token'); // Check for token to determine login status

  useEffect (() => {
    console.log('isLoggedIn status:', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    console.log('Logout initiated');
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <Router>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path='/' element={<AuthPage />} />
        {isLoggedIn ? (
          <>
            <Route path='/home' element={<HomePage />} />
            <Route path='/trade' element={<TradePage />} />
          </>
        ) : (
          <Route path='*' element={<Navigate to='/' replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
