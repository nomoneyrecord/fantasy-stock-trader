import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import AuthPage from './pages/authpage/authpage';

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  );
}

export default App;
