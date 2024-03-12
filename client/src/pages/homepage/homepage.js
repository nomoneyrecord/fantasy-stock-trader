import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; // Ensure you have installed jwt-decode

const HomePage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState({
    accountBalance: '',
    stockHoldings: [],
    totalStockValue: 0,
  });

  // Function to check if the token is valid
  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  };

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token || !isTokenValid(token)) {
      console.log("Invalid or no token, navigating to login");
      localStorage.removeItem('token');
      onLogout();
      navigate('/');
      return;
    }

    try {
      console.log("Fetching account data");
      const accountResponse = await fetch("http://localhost:5000/api/account", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!accountResponse.ok) {
        throw new Error("Session expired");
      }
      const accountData = await accountResponse.json();

      console.log("Fetching holdings data");
      const holdingsResponse = await fetch("http://localhost:5000/api/holdings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!holdingsResponse.ok) {
        throw new Error("Session expired");
      }
      const holdingsData = await holdingsResponse.json();

      const totalValue = holdingsData.reduce(
        (acc, holding) => acc + holding.currentValue,
        0
      );

      setAccountData({
        accountBalance: accountData.balance.toFixed(2),
        stockHoldings: holdingsData,
        totalStockValue: totalValue,
      });
    } catch (error) {
      console.error("Error occurred:", error);
      if (error.message === "Session expired" || error.message === "Failed to fetch") {
        localStorage.removeItem('token');
        onLogout();
        navigate('/');
      }
    }
  }, [navigate, onLogout]);

  useEffect(() => {
    console.log('useEffect triggered');
    fetchData();
  }, [fetchData]);
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Account Balance: {accountData.accountBalance}</p>
      <p>Total Value of Stocks: {accountData.totalStockValue.toFixed(2)}</p>
      <h2>Your Stock Holdings</h2>
      <ul>
        {accountData.stockHoldings.map((holding, index) => (
          <li key={index}>
            Symbol: {holding.symbol}, Price: ${(holding.currentValue / holding.quantity).toFixed(2)}, Quantity: {holding.quantity}, Total Value: ${holding.currentValue.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
