import React from 'react';
import { Navlink } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  return (
    <nav className='navbar'>
      <Navlink to='/home' activeClassName='active'>Home</Navlink>
      <Navlink too='/trade' activeClassName='active'>Trade</Navlink>
      <button onClick={onLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;