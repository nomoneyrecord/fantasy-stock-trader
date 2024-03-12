import React from "react";

const SessionExpiredModal = ({ onClose }) => {
  return (
    <div className="modal">
      <p>Your session has expired. Please log in again.</p>
      <button onClick={onClose}>OK</button>
    </div>
  );
};

export default SessionExpiredModal; 