import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

const TradePage = () => {
  const navigate = useNavigate();
  const [searchSymbol, setSearchSymbol] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [sellQuantity, setSellQuantity] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleError = useCallback(
    (error) => {
      if (error.message === "401") {
        console.error(
          "Session expired or unauthorized access. Redirecting to login."
        );
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error("Error:", error);
        alert(`An error occurred: ${error.message}`);
      }
    },
    [navigate]
  );

  const handleResponse = useCallback((response) => {
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("401");
      }
      throw new Error("Network response was not ok");
    }
    return response.json();
  }, []);

  const handleSearch = () => {
    const searchQuery = searchSymbol.trim();
    if (!searchQuery) {
      alert("Please enter a stock symbol or name");
      return;
    }

    // Use your backend endpoint to search for stocks
    fetch(`http://localhost:5000/api/search_stocks?query=${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(handleResponse)
      .then((data) => {
        if (data.length === 0) {
          alert("No stock found with that symbol or name");
          setSearchResults([]);
        } else {
          setSearchResults(data);
        }
      })
      .catch(handleError);
  };

  const openBuyModal = (stock) => {
    setSelectedStock(stock);
    setShowBuyModal(true);
  };
  const openSellModal = (stock) => {
    setSelectedStock(stock);
    setShowSellModal(true);
  };

  const handleBuyChange = (e) => {
    setBuyQuantity(Number(e.target.value));
  };

  const handleSellChange = (e) => {
    setSellQuantity(Number(e.target.value));
  };

  const confirmPurchase = () => {
    const quantityNumber = Number(buyQuantity);
    console.log("Selected Stock:", selectedStock);
    console.log("Buy Quantity:", quantityNumber);

    // Fetch user's current account balance
    fetch("http://localhost:5000/api/account", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch account data");
        }
        return response.json();
      })
      .then((accountData) => {
        const userAccountBalance = accountData.balance;
        console.log("User Account Balance:", userAccountBalance);

        const totalCost = selectedStock.price * quantityNumber;
        console.log("Total Cost:", totalCost);

        if (totalCost > userAccountBalance) {
          alert("Insufficient funds to complete the purchase.");
          return;
        }

        fetch("http://localhost:5000/api/buy_stock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            symbol: selectedStock.symbol,
            quantity: quantityNumber,
            price: selectedStock.price,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Purchase failed");
            }
            return response.json();
          })
          .then((data) => {
            alert(data.msg);
            setShowBuyModal(false);
            // Optionally, refresh account and holdings data here
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred while purchasing stock");
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while fetching account data");
      });
  };

  const confirmSale = () => {
    fetch("http://localhost:5000/api/sell_stock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        symbol: selectedStock.symbol,
        quantity: sellQuantity,
        price: selectedStock.price,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sale failed");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.msg);
        setShowSellModal(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occured while selling stock");
      });
  };

  return (
    <div>
      <InputField
        type="text"
        name="searchSymbol"
        value={searchSymbol}
        onChange={(e) => setSearchSymbol(e.target.value)}
        placeholder="Enter Stock Symbol"
      />
      <Button text="Search" onClick={handleSearch} />

      {searchResults.map((stock) => (
        <div key={stock.symbol}>
          <p>
            Symbol: {stock.symbol}, Name: {stock.name}
          </p>
          <Button text="Buy" onClick={() => openBuyModal(stock)} />
          <Button text="Sell" onClick={() => openSellModal(stock)} />
        </div>
      ))}

      {showBuyModal && (
        <Modal show={showBuyModal} onClose={() => setShowBuyModal(false)}>
          <h2>Buy {selectedStock?.symbol}</h2>
          <p>Price: {selectedStock?.price}</p>
          <InputField
            type="number"
            name="buyQuantity"
            value={buyQuantity.toString()}
            onChange={handleBuyChange}
            placeholder="Enter quantity"
          />
          <Button text="Confirm Purchase" onClick={confirmPurchase} />
        </Modal>
      )}

      {showSellModal && (
        <Modal show={showSellModal} onClose={() => setShowSellModal(false)}>
          <h2>Sell {selectedStock?.symbol}</h2>
          <p>Price: {/* Display current price here */}</p>
          <p>Owned Shares: {/* Display owned shares here */}</p>
          <InputField
            type="number"
            name="sellQuantity"
            value={sellQuantity.toString()}
            onChange={handleSellChange}
            placeholder="Enter quantity"
            // Add change handler
          />
          <Button text="Confirm Sale" onClick={confirmSale} />
        </Modal>
      )}
    </div>
  );
};

export default TradePage;
