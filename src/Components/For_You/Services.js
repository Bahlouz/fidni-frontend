import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Services.css';
import downloadbutton from '../../Assets/downloadimg.png';

export const cardData = [
  { key: 'card1', documentTitleFrench: "Délivrance d'une carte d'handicap", documentTitleArabic: "إسناد بطاقة الإعاقة", previewImage: `${process.env.PUBLIC_URL}/services/Delivrance.png`, pdfLinkFrench: `${process.env.PUBLIC_URL}/services/Délivrance_d'une_carte_d'handicap.docx`, pdfLinkArabic: `${process.env.PUBLIC_URL}/services/إسناد بطاقة الإعاقة.docx` },
  { key: 'card2', documentTitleFrench: "Renouvellement de la carte d'handicap", documentTitleArabic: "تجديد بطاقة الإعاقة", previewImage: `${process.env.PUBLIC_URL}/services/Renouvellement.png`, pdfLinkFrench: `${process.env.PUBLIC_URL}/services/Renouvellement_de_la_carte_d'handicap.docx`, pdfLinkArabic: `${process.env.PUBLIC_URL}/services/تجديد بطاقة الإعاقة.docx` },
  { key: 'card3', documentTitleFrench: "Adresses des services de santé sexuelle et reproductive fournis par l'Office national de la famille", documentTitleArabic: "هياكل الصحة الجنسية و الإنجابية حسب الجهات", previewImage: `${process.env.PUBLIC_URL}/services/Adresses.png`, pdfLinkFrench: `${process.env.PUBLIC_URL}/services/Adresses_des_services_de_santé_sexuelle_et_reproductive_fournis_par_l'Office_national_de_la_famille.docx`, pdfLinkArabic: `${process.env.PUBLIC_URL}/services/هياكل الصحة الجنسية و الإنجابية حسب الجهات.docx` },
  { key: 'card4', documentTitleFrench: "Répertoire des structures œuvrant dans le domaine du handicap en Tunisie", documentTitleArabic: "دليل الهياكل العاملة في مجال الإعاقة في تونس", previewImage: `${process.env.PUBLIC_URL}/services/Repertoire.png`, pdfLinkFrench: `${process.env.PUBLIC_URL}/services/Répertoire_des_structures_œuvrant_dans_le_domaine_du_handicap_en_Tunisie.docx`, pdfLinkArabic: `${process.env.PUBLIC_URL}/services/دليل الهياكل العاملة في مجال الإعاقة في تونس.docx` },
  { key: 'card5', documentTitleFrench: "Guide des services de santé reproductive et sexuelle pour les personnes en situation de handicap", documentTitleArabic: "دﻟﻴﻞ ﺗﻮﺟﻴﻬﻲ ﻟﺨﺪﻣﺎت اﻟﺼﺤﺔ اﻹﻧﺠﺎﺑﻴﺔ واﻟﺠﻨﺴﻴﺔ ﻟﻸﺷﺨﺎص ذوي وذوات اﻹﻋﺎﻗﺔ", previewImage: `${process.env.PUBLIC_URL}/services/ssr.png`, pdfLinkFrench: `${process.env.PUBLIC_URL}/services/Carte_des_Services_de_Santé_Reproductive_et_Sexuelle_Accessibles.docx`, pdfLinkArabic: `${process.env.PUBLIC_URL}/services/Carto_SSR_accessible_ar.docx` }
];

const Services = () => {
  const { t, i18n } = useTranslation();
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const combinedData = [...cardData];

  return (
    <Container fluid className="p-0 services-container" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
      <div className="background-image-services">
        <div className="overlay-text-services" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
          <h1 className="services-titre">{t('services')}</h1>
          <p className="services-description">{t('services_description')}</p>
        </div>
      </div>
      <Row className="justify-content-center">
        {combinedData.map((card, index) => (
          <Col key={index} md={10} className="mb-4">
            <div className="service-card">
              <h2 className="service-card-title">{t(`cardTitles.${card.key}`)}</h2>
              <Row className="justify-content-center preview-row">
                <Col md={5} className="text-center">
                  <a 
                    href={card.pdfLinkFrench} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    download
                  >
                    <div className="preview-row">
                      <div className="document-title">{card.documentTitleFrench}</div>
                      <img 
                        src={downloadbutton}
                        alt="Download"
                        className="service-card-download-icon"
                      />
                      <img src={card.previewImage} alt={`Preview of ${card.title} in French`} className="service-card-image" />
                    </div>
                  </a>
                </Col>
                <Col md={5} className="text-center">
                  <a 
                    href={card.pdfLinkArabic} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    download
                  >
                    <div className="preview-row">
                      <div className="document-title">{card.documentTitleArabic}</div>
                      <img 
                        src={downloadbutton}
                        alt="Download"
                        className="service-card-download-icon"
                      />
                      <img src={card.previewImage} alt={`Preview of ${card.title} in Arabic`} className="service-card-image" />
                    </div>
                  </a>
                </Col>
              </Row>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Services;
