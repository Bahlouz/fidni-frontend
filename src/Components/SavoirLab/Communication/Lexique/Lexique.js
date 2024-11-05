import React from 'react';
import './Lexique.css';
import lexiquedoc1 from "../../../../Assets/lexiquedoc1.png";
import tableaudoc from "../../../../Assets/tableau.png";
import downloadimg from '../../../../Assets/download.png';
import { useTranslation } from 'react-i18next'; // Import useTranslation
const Lexique = () => {
  const { t,i18n } = useTranslation();
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  return (
    <>
      <div className="background-image-Communication"></div>
      <div className="lexique-container">
        <div className="overlay-text-Communication" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
          <h1 className="Communication-titre">{t('lexique.title')}</h1>
        </div>
        <div className="lexique-column">
          <div className="lexique-preview">
            <img 
              src={tableaudoc}
              alt="lexique Preview" 
              className="lexique-image" 
            />
            <a 
              href={t('lexique.linkGuidelines')}
              download
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                className="download-button-guide" 
                src={downloadimg} 
                alt="Télécharger" 
                rel="noopener noreferrer"
              />
            </a>
          </div>
          <a 
            href={t('lexique.linkLexique')}
            className="french-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('AppuiActeurs.fr.accederLexiqueFrancais')}
          </a>
          <a 
            href={t('lexique.arabicLink')}
            className="french-link"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginBottom: "3em" }}
          >
             {t('AppuiActeurs.fr.accederLexiqueArabe')}
          </a>
          <div className="lexique-preview">
            <img 
              src={lexiquedoc1}
              alt="lexique Preview" 
              className="lexique-image" 
            />
            <a 
              href={t('lexique.linkGuidelines')}
              download
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                className="download-button-guide" 
                src={downloadimg} 
                alt="Télécharger" 
                rel="noopener noreferrer"
              />
            </a>
          </div>
          <a 
            href={t('lexique.linkGuidelines')}
            className="french-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('lexique.guidelinesTitle')}
          </a>
        </div>
        
        <div className="lexique-content">
          <h2>{t('lexique.guidelinesTitle')}</h2>
          <div className="context-section">
            <h4>{t('guide.contexttitle')}</h4>
            {t('lexique.context', { returnObjects: true }).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Lexique;
