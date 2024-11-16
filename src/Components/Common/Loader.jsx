import React from 'react';
import './Loader.css';

const Loader = ({ size = 'default' }) => {
  return (
    <div className={`loader-container ${size}`}>
      <div className="book">
        <div className="book__pg-shadow"></div>
        <div className="book__pg"></div>
        <div className="book__pg book__pg--2"></div>
        <div className="book__pg book__pg--3"></div>
        <div className="book__pg book__pg--4"></div>
        <div className="book__pg book__pg--5"></div>
      </div>
      <span className="loading-text">Loading...</span>
    </div>
  );
};

export default Loader; 