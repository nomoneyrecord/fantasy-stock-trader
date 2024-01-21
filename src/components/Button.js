import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, onClick, type, className }) => {
  return (
    <button
      type={type}
      className={`btn ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string
};

export default Button;