import React from 'react';

const Button = ({ onClick, className = "", children, type = "button", disabled = false }) => {
  return (
    <button
      type={type} 
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;