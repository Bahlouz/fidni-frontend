import React from 'react';
import './Guide.css';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import downloadimg from '../../../../Assets/download.png';
import guidedoc1 from '../../../../Assets/guidedoc1.png';
const Guide = () => {
  const { t,i18n } = useTranslation();
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  // Ensure that the guideContent is defined
  const guideContent = t('guide', { returnObjects: true }); // Use returnObjects to retrieve nested content

  return (
    <>
      <div className="background-image-Communication"></div>
      <div className="guide-container">
        <div className="overlay-text-Communication" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
          <h1 className="Communication-titre">{guideContent?.title}</h1>
        </div>
        <div className="guide-column">
          <div className="guide-preview">
            <img
              src={guidedoc1}
              alt="Guide Preview"
              className="guide-image"
            />
            <a
              href={`${process.env.PUBLIC_URL}${guideContent?.link}`}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="download-button-guide"
                src={downloadimg}
                alt="Télécharger"
              />
            </a>
          </div>
          <a
            href={`${process.env.PUBLIC_URL}${guideContent?.link}`}
            className="french-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {guideContent?.linkText}
          </a>
        </div>
        <div className="guide-content">
          <h2>{guideContent?.content?.sectionTitle}</h2>
          <h3>{guideContent?.content?.sectionSubtitle}</h3>
          <div className="context-section">
            <h4>{guideContent.contexttitle}</h4>
            {guideContent?.content?.context?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Guide;
