import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import coalitiondoc from '../../../../../Assets/coalition1.png';
import downloadimg from '../../../../../Assets/download.png';
import { useTranslation } from 'react-i18next';
import './Coalition.css';

const Coalition = () => {
  const { t,i18n } = useTranslation();
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  return (
    <Container fluid className="droits-container">
      <div className="background-image-coalition" >
        <div className="p-5 overlay-text-droits" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
          <h1 className="droits-titre">{t('coalition.coalitionTitle')}</h1>
        </div>
      </div>
      <div>
        <div className="coalition-description">
          <Container className="convention-container">
            <Row>
              <Col>
                <p className="convention-text">{t('coalition.coalitionDescription1')}</p>
                <p className="convention-text">{t('coalition.coalitionDescription2')}</p>
                <p>{t('coalition.coalitionDescription3')}</p>
                <p>{t('coalition.coalitionDescription4')}</p>
              </Col>
            </Row>
            <Row>
              <Col className='liens-conventions'>
                <h3 className="convention-subtitle">{t('coalition.usefulLink')}</h3>
                <div className="guide-preview">
                  <img 
                    src={coalitiondoc}
                    alt="Guide Preview" 
                    className="guide-image" 
                  />
                  <a 
                    href={`${process.env.PUBLIC_URL}/pdfs/نهاىي  الميثاق الاعلامي الدامج للاشخاص ذوي الاعاقة .docx`}
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
                  href={`${process.env.PUBLIC_URL}/pdfs/نهاىي  الميثاق الاعلامي الدامج للاشخاص ذوي الاعاقة .docx`}
                  className="french-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('coalition.accessCharterArabic')}
                </a>
              </Col>
            </Row>
          </Container>
        </div>  
      </div>
    </Container>
  );
};

export default Coalition;
