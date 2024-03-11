import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState({
    accountBalance: "",
    stockHoldings: [],
    totalStockValue: 0,
  });
  const [sessionExpired, setSessionExpired] = useState(false);

  console.log("Initial state:", accountData);

  const fetchData = useCallback(async () => {
    console.log("fetchData called");
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    if (!token || sessionExpired) {
      navigate("/");
      return;
    }

    if (!token) {
      console.log("No token, navigating to login");
      navigate("/");
      return;
    }

    try {
      console.log("Fetching account data");
      const accountResponse = await fetch("http://localhost:5000/api/account", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Account response status:", accountResponse.status);

      if (!accountResponse.ok) {
        console.log("Account response not ok. Status:", accountResponse.status);
        if (accountResponse.status === 401) {
          throw new Error("Session expired");
        }
        throw new Error("Network response was not ok");
      }
      const accountData = await accountResponse.json();
      console.log("Account data:", accountData);

      console.log("Fetching holdings data");
      const holdingsResponse = await fetch(
        "http://localhost:5000/api/holdings",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Holdings response status:", holdingsResponse.status);

      if (!holdingsResponse.ok) {
        if (holdingsResponse.status === 401) {
          throw new Error("Session expired");
        }
        throw new Error("Network response was not ok");
      }
      const holdingsData = await holdingsResponse.json();
      console.log("Holdings data:", holdingsData);

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
      if (error.message === "Session expired") {
        console.log("Removing token and navigating to login");
        setSessionExpired(true);
        localStorage.removeItem("token");
        alert("Session has expired, please log in again.");
        console.log("Navigating to login due to expired session");
        navigate("/");
      } else {
        alert(`An error occurred: ${error.message}`);
      }
    }
  }, [navigate, sessionExpired]);

  useEffect(() => {
    console.log("useEffect triggered");
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
            Symbol: {holding.symbol}, Price: $
            {(holding.currentValue / holding.quantity).toFixed(2)}, Quantity:{" "}
            {holding.quantity}, Total Value: ${holding.currentValue.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
