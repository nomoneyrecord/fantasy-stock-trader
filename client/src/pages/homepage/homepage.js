import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      navigate('/');
    }
  }, [navigate]);

  const accountBalance = '100,000';
  const stockValue = '50,000';
  const holdings = ['Stock A', 'Stock B', 'Stock C'];

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Account Balance: {accountBalance}</p>
      <p>Current Value of Stocks: {stockValue}</p>
      <p>Your Holdings:</p>
      <ul>
        {holdings.map(stock => (
          <li key={stock}>{stock}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;