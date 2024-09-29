import React from 'react';
import { Container, Button } from 'react-bootstrap'
;
import { useLocation } from 'react-router-dom';
import './Communication.css';
import CommPreview from './CommPreview';

const Communication = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop(); // Extract current page from URL
  const commlinks = [
    { title: 'Le guide de bonnes pratiques éditoriales et éthiques', link: '/savoir-lab/communication-inclusive/guide', page: 'guide' },
    { title: 'Le lexique de communication inclusive des personnes handicapées', link: '/savoir-lab/communication-inclusive/lexique', page: 'lexique' },
    { title: 'La charte nationale pour des médias inclusifs et accessibles aux personnes handicapées en Tunisie', link: '/savoir-lab/communication-inclusive/charte-nationale', page: 'charte-nationale' },
    { title: 'Les recommandations pour les médias et les acteurs médiatiques', link: '/savoir-lab/communication-inclusive/recommandations', page: 'recommendations' },
  ];

  return (
    <div>
      <div className="background-image-Communication">
        <Container fluid className="Communication-container">
          <div className="overlay-text-Communication">
            <h1 className="Communication-titre">Communication inclusive</h1>
            <p className="Communication-description">
              Vous allez trouver dans cette section des informations sur la communication inclusive. Une enquête de terrain menée en 2023 sous la direction du Professeur Sadok Hammmami de l’Institut de Presse et des Sciences de l’information (IPSI), a mis en lumière des tendances alarmantes sur la représentation du handicap dans les médias. Un constat partagé tant par les personnes handicapées que par les journalistes interrogés.
            </p>
            <p className="Communication-description">
              Afin de lutter contre ces pratiques, l’UNESCO a développé plusieurs outils :
            </p>
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
