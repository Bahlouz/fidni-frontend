// src/QuoteComponent.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import "./Quote.css";
import unescoImage from './eric.jpg';
import ibsarImage from './masnouri.jpg';
import beforefooter from "../../Assets/beforefooter.svg";

function QuoteComponent() {
  const { t, i18n } = useTranslation();

  // Determine alignment and direction based on current language
  const textAlignment = i18n.language === 'ar' ? 'text-right' : 'text-left';
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  return (
    <Container fluid className='p-0 testimony-container d-flex flex-column align-items-center justify-content-center' style={{ direction }}>
      <Container fluid className="quote-container">
        <Row>
          <Col xs={12} className={`text-center ${textAlignment}`}>
            <h2 className="quote-text">{t('quote.title')}</h2>
          </Col>
        </Row>
        <Row className="align-items-center justify-content-center">
          <Col md={4} className="quote-container-left text-center">
            <div className="quote-author">
              <div className="quote-mot">
                {t('quote.ericFalt.title')}
              </div>
              {t('quote.ericFalt.role')}
            </div>
            <img src={unescoImage} alt="Eric Falt" className="unesco-logo" aria-label="Image d'Eric Falt" />
          </Col>
          <Col md={6} className="quote-content text-center">
            <div className="quote-body">
              <p>{t('quote.ericFalt.text')}</p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className="quote-container">
        <Row className="align-items-center justify-content-center">
          <Col md={6} className="quote-content text-center">
            <div className="quote-body">
              <p>{t('quote.mohammedMansouri.text')}</p>
            </div>
          </Col>
          <Col md={4} className="quote-container-left text-center">
            <div className="quote-author">
              <div className="quote-mot">
                {t('quote.mohammedMansouri.title')}
              </div>
              {t('quote.mohammedMansouri.role')}
            </div>
            <img src={ibsarImage} alt="Mohammed Mansouri" className="unesco-logo" aria-label="Image de Mohammed Mansouri" />
          </Col>
        </Row>
      </Container>

      <img src={beforefooter} className="beforefooter" alt="Before Footer Graphic" />
    </Container>
  );
}

export default QuoteComponent;
