import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Communication.css';
import CommPreview from './CommPreview';

const Communication = () => {
  const { t,i18n } = useTranslation();
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop(); // Extract current page from URL
  const commlinks = [
    { title: t('communication.links.guide'), link: '/savoir-lab/communication-inclusive/guide', page: 'guide' },
    { title: t('communication.links.lexique'), link: '/savoir-lab/communication-inclusive/lexique', page: 'lexique' },
    { title: t('communication.links.charte'), link: '/savoir-lab/communication-inclusive/charte-nationale', page: 'charte-nationale' },
    { title: t('communication.links.recommendations'), link: '/savoir-lab/communication-inclusive/recommandations', page: 'recommendations' },
  ];

  return (
    <div>
      <div className="background-image-Communication">
        <Container fluid className="Communication-container">
          <div className="overlay-text-Communication" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
            <h1 className="Communication-titre">{t('communication.title')}</h1>
            <p className="Communication-description">{t('communication.description')}</p>
            <p className="Communication-description">{t('communication.tools')}</p>
          </div>
        </Container>
      </div>

      {/* Button container */}
      <div className="button-container-comm">
        {commlinks.map((item, index) => (
          <Button
            key={index}
            className={`wikid-button-comm ${currentPath === item.page ? 'active' : ''}`}
            href={item.link} // Navigate to the new page
          >
            {item.title}
          </Button>
        ))}
      </div>
      <CommPreview />

      {/* Links container */}
      <div className="links-container">
        {commlinks.map((item, index) => (
          <button
            key={index}
            className="link-item-comm"
            onClick={() => window.location.href = item.link}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Communication;
