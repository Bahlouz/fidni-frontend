import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import rec1 from "../../../../../Assets/rec1.png";
import rec2 from "../../../../../Assets/rec2.png";
import rec3 from "../../../../../Assets/rec3.png";
import { useTranslation } from 'react-i18next';
import "./Adoption.css";

const RecommendationsComponent = () => {
  const { t,i18n } = useTranslation();
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';

  return (
    <>
      <div className="background-image-Recommandation">
        <div className="p-5 overlay-text-Recommandation">
          <h1 className="Recommandation-titre" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>{t('recomcomp.title')}</h1>
        </div>
      </div>
      <Container className="mt-4">
        <Row>
          <Col xs={2}>
            <Image src={rec1} alt="Regulation" fluid />
          </Col>
          <Col xs={10}>
            <p><b>{t('recomcomp.recommendation_a')}</b></p>
            <p><b>{t('recomcomp.recommendation_ai')}</b></p>
            {t('recomcomp.recommendation_ai_text', { returnObjects: true }).map((text, index) => (
              <p key={index}>{text}</p>
            ))}
            <p><b>{t('recomcomp.recommendation_aii')}</b></p>
            {t('recomcomp.recommendation_aii_text', { returnObjects: true }).map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <Image src={rec2} alt="Training" fluid />
          </Col>
          <Col xs={10}>
            <p><b>{t('recomcomp.recommendation_b')}</b></p>
            <p><b>{t('recomcomp.recommendation_bi')}</b></p>
            {t('recomcomp.recommendation_bi_text', { returnObjects: true }).map((text, index) => (
              <p key={index}>{text}</p>
            ))}
            <p><b>{t('recomcomp.recommendation_bii')}</b></p>
            {t('recomcomp.recommendation_bii_text', { returnObjects: true }).map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <Image src={rec3} alt="National Level" fluid />
          </Col>
          <Col xs={10}>
            <p><b>{t('recomcomp.recommendation_c')}</b></p>
            {t('recomcomp.recommendation_c_text', { returnObjects: true }).map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ul>
              {t('recomcomp.mission_list', { returnObjects: true }).map((mission, index) => (
                <li key={index} style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>{mission}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RecommendationsComponent;
