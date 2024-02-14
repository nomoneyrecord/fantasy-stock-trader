import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  return (
    <nav className='navbar'>
      <NavLink to='/home'>Home</NavLink>
      <NavLink to='/trade'>Trade</NavLink>
      <button onClick={onLogout}>Logout</button>
    </nav>
  );
};


export default Navbar;