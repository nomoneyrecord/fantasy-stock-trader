import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState({
    accountBalance: '',
    stockValue: '',
    holdings: []
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/account', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          navigate('/');
        }
        // Handle other responses or errors as needed
        throw new Error('Network response was not ok');
      }
      console.log(response);
      return response.json();
    })
    .then(data => {
      // Set the account data
      setAccountData({
        accountBalance: data.balance,
        // Assume other data like stockValue and holdings are part of the response
        stockValue: data.stockValue,
        holdings: data.holdings
      });
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Account Balance: {accountData.accountBalance}</p>
      <p>Current Value of Stocks: {accountData.stockValue}</p>
      <p>Your Holdings:</p>
      <ul>
        {accountData.holdings.map(stock => (
          <li key={stock}>{stock}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
