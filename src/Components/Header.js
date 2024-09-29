import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';


function Header() {
  const { toggleTheme, theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // State for showing the custom alert

  const handleZoomAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false); // Hide the alert after 3 seconds
    }, 3000);
  };

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header id='header' className={`header ${isScrolled ? 'scrolled' : 'visible'} ${theme}`}>
      <div className="header-links">
        <a href="#navbar" onClick={() => handleScrollTo('navbar')} style={{ cursor: 'pointer' }}>Aller au menu </a>
        <a href="#footer" onClick={() => {
          window.scrollTo(0, document.body.scrollHeight);
          handleScrollTo('footer');
        }} style={{ cursor: 'pointer' }}>Aller au pied de page </a>
      </div>
      <div className="header-controls">
        <span onClick={handleZoomAlert} className="alert-trigger">A+/A-</span>
        <span onClick={toggleTheme} style={{ cursor: 'pointer' }}>
        </span>
        <Link to="/accessibility">Accessibilité [4]</Link>
      </div>
      <div className="header-icons">
        <div className="dropdown">
          <select>
            <option value="en">Français</option>
            <option value="fr">عربي</option>
          </select>
        </div>
      </div>
      {/* Custom Alert Banner */}
      {showAlert && (
        <div className="custom-alert">
          Vous pouvez augmenter ou diminuer le zoom de la page en utilisant les raccourcis Ctrl + et Ctrl -
        </div>
      )}
    </header>
  );
}

export default Header;
