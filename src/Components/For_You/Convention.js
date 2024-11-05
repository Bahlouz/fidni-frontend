import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Convention.css';
import conventiondoc from "../../Assets/convention.png";

const Convention = () => {
  const { t ,i18n } = useTranslation();
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  return (
    <>
      <div className="background-image-droits">
        <div className="overlay-text-droits-singlepage" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
          <h1 className="p-5 droits-titre-singlepage">
            {t('convention.title')}
          </h1>
        </div>
      </div>

      <Container className="convention-container" >
        <Row>
          <div className="definitions-convention">
            <h2 style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }} >{t('convention.definitions.header')}</h2>
            <ul style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }} >
              <li>
                <b>{t('convention.definitions.disabled_people')}</b>: {t('convention.definitions.disabled_people_description')}
              </li><br />
              <li>
                <b>{t('convention.definitions.discrimination')}</b>: {t('convention.definitions.discrimination_description')}
              </li><br />
              <li>
                <b>{t('convention.definitions.reasonable_accommodation')}</b>: {t('convention.definitions.reasonable_accommodation_description')}
              </li><br />
            </ul>
            <p>{t('convention.definitions.source')}</p>
          </div>
        </Row>
        <Row>
          <Col>
            <h2 className="convention-title" style={{ marginTop: "2em" }}>
              {t('convention.title')}
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="convention-text">
              {t('convention.introduction')}
            </p>
            <p className="convention-text">
              {t('convention.commitment')}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="convention-subtitle">
              {t('convention.linkage')}
            </h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="convention-text">
              {t('convention.significant_changes.header')}
            </p>
            <ul className="convention-list" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
              {t('convention.significant_changes.points', { returnObjects: true }).map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className='liens-conventions'>
            <h3 className="convention-subtitle">{t('convention.useful_link.header')}</h3>
            <p className="convention-text">
              <a href={t('convention.useful_link.url')} className="convention-link">
                {t('convention.useful_link.text')}
              </a>
            </p>
            <a href={`${process.env.PUBLIC_URL}/pdfs/Convention relative aux droits des personnes handicapées.pdf`} target="_blank" rel="noopener noreferrer">
              <Image src={conventiondoc} fluid className="convention-image" />
            </a>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="convention-subtitle">{t('convention.consult.header')}</h4>
            <p style={{ borderTop: '1px solid' }}>
              <sup>1</sup><small>{t('convention.consult.notes.ra')}</small><br />
              <sup>2</sup><small>{t('convention.consult.notes.rb')}</small>
            </p>
            <ul className="convention-list" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
              {t('convention.consult.links', { returnObjects: true }).map((link, index) => (
                <li key={index}>
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Convention;
