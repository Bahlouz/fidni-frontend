
import React from 'react';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oups ! Page non trouvée</h2>
        <p className="not-found-description">
        La page que vous recherchez peut avoir été supprimée, avoir changé de nom ou être temporairement indisponible.
        </p>
        <a href="/" className="not-found-home-link">Aller à l'accueil</a>
      </div>
    </div>
  );
};

export default NotFound;
