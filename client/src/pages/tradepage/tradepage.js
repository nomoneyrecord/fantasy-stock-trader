import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TradePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <p>This is the trade page</p>
  );
};  

export default TradePage;