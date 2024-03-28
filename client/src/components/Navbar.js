import React from 'react';
import { NavLink } from 'react-router-dom';
// Import your logo image
import logoImage from '../Images/logo3.png'; 

const Navbar = ({ onLogout }) => {
  return (
    <nav className='navbar'>
      <div className="logo">
        <img src={logoImage} alt="Logo" />
        <span className="navbar-appname">StockLab</span>
      </div>
      <div>
        <NavLink to='/home' activeClassName="active">Home</NavLink>
        <NavLink to='/trade' activeClassName="active">Trade</NavLink>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
