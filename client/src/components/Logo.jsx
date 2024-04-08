import React from 'react';
import logoImage from "../Images/logo3.png"

const Logo = ({ className }) => {
  return (
    <img src={logoImage} alt="Logo" className={className} />
  );
};

export default Logo; 