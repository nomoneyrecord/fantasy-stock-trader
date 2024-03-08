import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Backdrop from "../../components/Backdrop";


const TradePage = () => {
  const navigate = useNavigate();
  const [searchSymbol, setSearchSymbol] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [sellQuantity, setSellQuantity] = useState(0);
  const [userHoldings, setUserHoldings] = useState([]);

  const fetchHoldings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/holdings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user holdings");
      }
      const holdingsData = await response.json();
      setUserHoldings(holdingsData);
    } catch (error) {
      console.error("Error fetching user holdings:", error);
    }
  };

  useEffect(() => {
    fetchHoldings();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const body = document.body;
    const hasModalOpen = showBuyModal || showSellModal;

    if (hasModalOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }

    return () => {
      body.style.overflow = "auto";
    };
  }, [showBuyModal, showSellModal]);

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
    // Close sell modal if open
    setShowSellModal(false);

    // Find owned quantity and open buy modal
    const ownedQuantity =
      userHoldings.find((holding) => holding.symbol === stock.symbol)
        ?.quantity || 0;
    setSelectedStock({ ...stock, ownedQuantity });
    setShowBuyModal(true);
  };

  const openSellModal = (stock) => {
    // Close buy modal if open
    setShowBuyModal(false);

    // Find owned quantity and open sell modal
    const ownedQuantity =
      userHoldings.find((holding) => holding.symbol === stock.symbol)
        ?.quantity || 0;
    setSelectedStock({ ...stock, ownedQuantity });
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

    if(quantityNumber <= 0) {
      alert("Please enter a quantity greater than 0");
      return; 
    }

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
          alert("Insufficient funds to complete the transaction.");
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
            fetchHoldings();
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
    const quantityNumber = Number(sellQuantity);

    if (quantityNumber <= 0) {
      alert("Please enter a quantity greater than 0");
      return; 
    }

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
      .then(handleResponse)
      .then((data) => {
        alert(data.msg);
        setShowSellModal(false);

        fetchHoldings();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error.message);
      });
  };

  const disableInteractionClass =
    showBuyModal || showSellModal ? "disable-interaction" : "";

  return (
    <div>
      {showBuyModal ||
        (showSellModal && (
          <Backdrop
            onClick={() => {
              setShowBuyModal(false);
              setShowSellModal(false);
            }}
          />
        ))}

      <div className={disableInteractionClass}>
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
      </div>

      {showBuyModal && (
        <Modal show={showBuyModal} onClose={() => setShowBuyModal(false)}>
          <h2>Buy {selectedStock?.symbol}</h2>
          <p>Price: {selectedStock?.price}</p>
          <p>Owned Shares: {selectedStock?.ownedQuantity}</p>
          <InputField
            type="number"
            name="buyQuantity"
            value={buyQuantity.toString()}
            onChange={handleBuyChange}
            placeholder="Enter quantity"
            min="0"
          />
          <Button text="Confirm Purchase" onClick={confirmPurchase} />
        </Modal>
      )}

      {showSellModal && (
        <Modal show={showSellModal} onClose={() => setShowSellModal(false)}>
          <h2>Sell {selectedStock?.symbol}</h2>
          <p>Price: {selectedStock?.price}</p>
          <p>Owned Shares: {selectedStock?.ownedQuantity}</p>
          <InputField
            type="number"
            name="sellQuantity"
            value={sellQuantity.toString()}
            onChange={handleSellChange}
            placeholder="Enter quantity"
            min="0"
          />
          <Button text="Confirm Sale" onClick={confirmSale} />
        </Modal>
      )}
    </div>
  );
};

export default TradePage;
