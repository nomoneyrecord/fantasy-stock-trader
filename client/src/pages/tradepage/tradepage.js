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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSearch = () => {
    if (!searchSymbol.trim()) {
      alert('Please enter a stock symbol');
      return;
    }

    fetch(`https://financialmodelingprep.com/api/v3/search?query=${searchSymbol}&apikey=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch stock data');
        }
        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
          alert('No stock found with that symbol');
          setSearchResults([]);
        } else {
          setSearchResults(data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching stock data');
      });
  };

  const openBuyModal = () => setShowBuyModal(true);
  const openSellModal = () => setShowSellModal(true);

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

      {searchResults.map((stock, index) => (
        <div>
          <p>Symbol: {stock.symbol}, Name: {stock.name}</p>
          <Button text='Buy' onClick={() => openBuyModal(stock)} />
          <Button text='Sell' onClick={() => openSellModal(stock)} />
        </div>
      ))}

      {showBuyModal && (
        <Modal show={showBuyModal} onClose={() => setShowBuyModal(false)}>
        </Modal>
      )}

      {showBuyModal && (
        <Modal show={showSellModal} onClose={() => setShowSellModal(false)}>
        </Modal>
      )}
    </div>
  );
};  

export default TradePage;