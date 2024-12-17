import React from 'react';
import './SuperLoader.css';

const SuperLoader = () => {
  return (
    <div className="super-loader-container">
      <div className="super-loader">
        <img 
          src="https://res.cloudinary.com/devewerw3/image/upload/v1734327732/Icon_Logo_17_qx1b3h.png"
          alt="Loading..."
          className="loader-image"
        />
        <div className="loader-ring"></div>
      </div>
      <div className="loader-text">Loading amazing content...</div>
    </div>
  );
};

export default SuperLoader; 