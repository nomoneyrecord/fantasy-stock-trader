import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ type, name, value, onChange, placeholder, required, min}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="form-control"
      min={min}
    />
  );
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  min: PropTypes.string
};

export default InputField; 