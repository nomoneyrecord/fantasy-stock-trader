import React from 'react';

const Backdrop = ({ show, onClick }) => {
  if(!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5',
        zIndex: 1000
      }}
      onClick={onClick}
    />
  );
};