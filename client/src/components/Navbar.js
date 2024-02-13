import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  }

  const getNavLinkClass = (isActive) => {
    return isActive ? 'active' : '';
  };

  return (
    <nav className='navbar'>
      <NavLink to='/home' className={({ isActive }) => getNavLinkClass(isActive)}>Home</NavLink>
      <NavLink to='/trade' className={({ isActive }) => getNavLinkClass(isActive)}>Trade</NavLink>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;