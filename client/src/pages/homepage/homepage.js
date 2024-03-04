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
    console.log('API response received with status: ', response.status);
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        alert('Session has expired, please log in again.')
        navigate('/');
        return;
      }
      throw new Error('Network response was not ok');
    }
    return response.json();
  }, [navigate]);

  const handleError = useCallback((error) => {
    console.error('Error occurred: ', error);
    if (error.message === "401") {
      // If the error message is "401", it indicates an unauthorized request
      console.log('Handling 401 error, redirecting to login');
      localStorage.removeItem('token'); // Clear the token from local storage
      navigate('/'); // Redirect to the login page
    } else {
      // Handle other types of errors
      console.error('Error:', error);
      alert(`An error occurred: ${error.message}`);
    }
  }, [navigate]); // Make sure to include 'navigate' in the dependency array
  
  const calculateTotalStockValue = (holdings) => {
    const totalValue = holdings.reduce((acc, holding) => acc + holding.currentValue, 0);
    setAccountData(prevData => ({ ...prevData, totalStockValue: totalValue }));
  }; 

  useEffect(() => {
    console.log('Checking token in HomePage useEffect');
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return; 
    }

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
      calculateTotalStockValue(holdingsData);
    })
    .catch(handleError);

  }, [navigate, handleResponse, handleError]);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Account Balance: {accountData.accountBalance.toFixed(2)}</p>
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
