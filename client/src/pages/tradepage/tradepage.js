import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

const TradePage = () => {
  const navigate = useNavigate();
  const [searchSymbol, setSearchSymbol] = useState('');
  const [searchResults, setSearchResults] = useState(null); 
  const [showBuyModal, setShowBuyodal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSearch = () => {

  };

  const openBuyModal = () => setShowBuyModal(true);
  const openSellModal = () => setShowSellModal(true);

  return (
    <div>
      <InputField 
        type='text'
        value={searchSymbol}
        onChange={e => setSearchSymbol(e.target.value)}
        placeholder="Enter Stock Symbol"
      />
      <Button text='Search' onClick={handleSearch} />
    </div>>
  );
};  

export default TradePage;