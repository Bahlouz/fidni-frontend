// Preloader.js
import React from 'react';
import './Preloader.css'; // Create a CSS file for styling

const Preloader = () => {
  return (
    <div className="Preloader-container">
      <div className="Preloader"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Preloader;
