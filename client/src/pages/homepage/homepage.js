import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState({
    accountBalance: '',
    stockHoldings: [],
    totalStockValue: 0
  });

  const handleResponse = useCallback(response => {
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/');
      }
      throw new Error('Network response was not ok');
    }
    return response.json();
  }, [navigate]);

  const handleError = useCallback(error => {
    console.error('Error:', error);
  }, []);

  useEffect(() => {
    console.log('useEffect triggered in HomePage');
    
    // Fetch account balance
    fetch('http://localhost:5000/api/account', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(handleResponse)
    .then(data => setAccountData(prevData => ({ ...prevData, accountBalance: data.balance })))
    .catch(handleError);

    // Fetch stock holdings
    fetch('http://localhost:5000/api/holdings', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(handleResponse)
    .then(holdingsData => {
      setAccountData(prevData => ({ ...prevData, stockHoldings: holdingsData }));
      //calculateStockValues(holdingsData);
    })
    .catch(handleError);

  }, [navigate, handleResponse, handleError, /*calculateStockValues*/]);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Account Balance: {accountData.accountBalance}</p>
      <p>Total Value of Stocks: {accountData.totalStockValue.toFixed(2)}</p>
      <h2>Your Stock Holdings</h2>
      <ul>
        {accountData.stockHoldings.map((holding, index) => (
          <li key={index}>
            Symbol: {holding.symbol}, Quantity: {holding.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
