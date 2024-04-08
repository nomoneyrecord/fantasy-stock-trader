import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation";


const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [accountData, setAccountData] = useState({
    accountBalance: "",
    stockHoldings: [],
    totalStockValue: 0,
  });

  const handleResponse = useCallback(
    (response) => {
      console.log("API response received with status: ", response.status);
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          alert("Session has expired, please log in again.");
          navigate("/");
          return;
        }
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    [navigate]
  );

  const handleError = useCallback(
    (error) => {
      console.error("Error occurred: ", error);
      if (error.message === "401") {
        // If the error message is "401", it indicates an unauthorized request
        console.log("Handling 401 error, redirecting to login");
        localStorage.removeItem("token"); // Clear the token from local storage
        navigate("/"); // Redirect to the login page
      } else {
        // Handle other types of errors
        console.error("Error:", error);
        alert(`An error occurred: ${error.message}`);
      }
    },
    [navigate]
  ); // Make sure to include 'navigate' in the dependency array

  const calculateTotalStockValue = (holdings) => {
    const totalValue = holdings.reduce(
      (acc, holding) => acc + holding.currentValue,
      0
    );
    setAccountData((prevData) => ({
      ...prevData,
      totalStockValue: totalValue,
    }));
  };

  useEffect(() => {
    console.log("Checking token in HomePage useEffect");
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    // Fetch account balance
    fetch("http://localhost:5000/api/account", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(handleResponse)
      .then((data) =>
        setAccountData((prevData) => ({
          ...prevData,
          accountBalance: data.balance.toFixed(2),
        }))
      )
      .catch(handleError);

    // Fetch stock holdings
    fetch("http://localhost:5000/api/holdings", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(handleResponse)
      .then((holdingsData) => {
        setAccountData((prevData) => ({
          ...prevData,
          stockHoldings: holdingsData,
        }));
        calculateTotalStockValue(holdingsData);
        setIsLoading(false);
      })
      .catch(handleError);
  }, [navigate, handleResponse, handleError]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="background-container-homepage">
    
      <div className="account-content">
        <h1 className="portfolio-header">Portfolio</h1>
        <p>Account Balance: {accountData.accountBalance}</p>
        <p>Total Value of Stocks: {accountData.totalStockValue.toFixed(2)}</p>
        <div className="holdings-section">
          <h2 className="holdings-header">Your Stock Holdings</h2>
          <table className="holdings-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {accountData.stockHoldings.map((holding, index) => (
                <tr key={index}>
                  <td>{holding.symbol}</td>
                  <td>
                    ${(holding.currentValue / holding.quantity).toFixed(2)}
                  </td>
                  <td>{holding.quantity}</td>
                  <td>${holding.currentValue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
