import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ children, show, onClose, className }) => {
  if (!show) {
    return null;
  }

  return (
    <div className='modal' onClick={onClose}>
      <div className={`modal-content ${className}`} onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <button className="modal-close-button" onClick={onClose}>&times;</button>
        </div>
        <div className='modal-body'>
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default Modal;
