import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import { useTranslation } from 'react-i18next'; // Import useTranslation

function Header() {
  const { toggleTheme, theme } = useTheme();
  const { i18n, t } = useTranslation(); // Destructure i18n to access changeLanguage
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

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage); // Update the language

    // Set document direction based on selected language
    document.documentElement.dir = selectedLanguage === 'ar' ? 'rtl' : 'ltr';

    // Save selected language to localStorage or a cookie for persistence
    localStorage.setItem('preferredLanguage', selectedLanguage);
  };

  useEffect(() => {
    // Check if there is a preferred language in localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'fr';
    i18n.changeLanguage(savedLanguage);
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
  }, [i18n]);

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
        <a href="#navbar" onClick={() => handleScrollTo('navbar')} style={{ cursor: 'pointer' }}>
          {t('nav.goToMenu')}
        </a>
        <a href="#footer" onClick={() => {
          window.scrollTo(0, document.body.scrollHeight);
          handleScrollTo('footer');
        }} style={{ cursor: 'pointer' }}>
          {t('nav.goToFooter')}
        </a>
      </div>
      <div className="header-controls">
        <span onClick={handleZoomAlert} className="alert-trigger">A+/A-</span>
        <span onClick={toggleTheme} style={{ cursor: 'pointer' }} />
        <Link to="/accessibility">{t('accessibility')} [4]</Link>
      </div>
      <div className="header-icons">
        <div className="dropdown">
          <select onChange={handleLanguageChange} value={i18n.language}>
            <option value="fr">{t('language.french')}</option>
            <option value="ar">{t('language.arabic')}</option>
          </select>
        </div>
      </div>
      {/* Custom Alert Banner */}
      {showAlert && (
        <div className="custom-alert">
          {t('alerts.zoomInfo')}
        </div>
      )}
    </header>
  );
}

export default Header;
