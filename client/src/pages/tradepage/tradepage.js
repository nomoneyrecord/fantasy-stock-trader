import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

const TradePage = () => {
  const navigate = useNavigate();
  const [searchSymbol, setSearchSymbol] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [sellQuantity, setSellQuantity] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSearch = () => {
    const searchQuery = searchSymbol.trim();
    if (!searchQuery) {
      alert('Please enter a stock symbol or name');
      return;
    }
  
    fetch(`https://financialmodelingprep.com/api/v3/stock/list?apikey=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch stock data');
        }
        return response.json();
      })
      .then(data => {
        const filteredResults = data.filter(stock => 
          stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
          stock.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
  
        if (filteredResults.length === 0) {
          alert('No stock found with that symbol or name');
          setSearchResults([]);
        } else {
          setSearchResults(filteredResults);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching stock data');
      });
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
    setBuyQuantity(e.target.value);
  };
  
  const handleSellChange = (e) => {
    setSellQuantity(e.target.value);
  };
  
  const confirmPurchase = () => {
    try{
      
    }
  };
  
  const confirmSale = () => {
    // Implement sell logic here
    // - Validate if the user has enough shares to sell
    // - Update user's stock holdings and account balance
    // - Close the modal and refresh the data
  };
  

  return (
    <div>
      <InputField
        type='text'
        name='searchSymbol'
        value={searchSymbol}
        onChange={e => setSearchSymbol(e.target.value)}
        placeholder="Enter Stock Symbol"
      />
      <Button text='Search' onClick={handleSearch} />

      {showBuyModal && (
        <Modal show={showBuyModal} onClose={() => setShowBuyModal(false)}>
          <h2>Buy {selectedStock?.symbol}</h2>
          <p>Price: {/* Display current price here */}</p>
          <InputField
            type='number'
            name='buyQuantity'
            value={buyQuantity}
            onChange={handleBuyChange}
            placeholder="Enter quantity"
          />
          <Button text='Confirm Purchase' onClick={confirmPurchase} />
        </Modal>
      )}

      {showSellModal && (
        <Modal show={showSellModal} onClose={() => setShowSellModal(false)}>
          <h2>Sell {selectedStock?.symbol}</h2>
          <p>Price: {/* Display current price here */}</p>
          <p>Owned Shares: {/* Display owned shares here */}</p>
          <InputField
            type='number'
            name='sellQuantity'
            value={sellQuantity}
            onChange={handleSellChange}
            placeholder="Enter quantity"
          // Add change handler
          />
          <Button text='Confirm Sale' onClick={confirmSale} />
        </Modal>
      )}

    </div>
  );
};

export default TradePage;