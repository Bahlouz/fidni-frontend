import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Accessibility.css';

const Accessibility = () => {
  const { t ,i18n} = useTranslation();
  const [apiData, setApiData] = useState([]);
  const BASE_URL = 'http://localhost:1338';
    const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
    useEffect(() => {
      const handleLanguageChange = () => {
        window.location.reload();
      };
  
      i18n.on('languageChanged', handleLanguageChange);
  
      // Cleanup on component unmount
      return () => {
        i18n.off('languageChanged', handleLanguageChange);
      };
    }, [i18n]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/accessibilites?populate=*`);
          const data = await response.json();
  
          const apiCardData = data.data.map(post => {
            const titleKey = i18n.language === 'ar' ? post.attributes.Title_arabic : post.attributes.Title_french;
            const descriptionKey = i18n.language === 'ar' ? post.attributes.Description_arabic : post.attributes.Description_french;
            const contentKey = i18n.language === 'ar' ? post.attributes.Content_arabic : post.attributes.Content_french;
  
            return {
              title: titleKey,
              description: descriptionKey, // Ensure safe handling of description
              link: `/savoir-lab/accessibilite/${encodeURIComponent(titleKey)}`
            };
          });
          const cardData = t('accessibilityPage.cardData', { returnObjects: true });
          setApiData([...cardData, ...apiCardData]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [i18n.language]); // Depend on the language change to re-fetch data

  return (
    
    <Container fluid className="Accessibility-container">
      <div className="background-image-Accessibility">
        <div className="p-5 overlay-text-Accessibility" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
          <h1 className="Accessibility-titre">{t('accessibilityPage.title')}</h1>
          <p className="Accessibility-description">
            {t('accessibilityPage.description')}
          </p>
        </div>
      </div>
      <Row className="justify-content-center">
        {apiData.map((card, index) => (
          <Card className="droit-card full-width-card mb-4" key={index}>
            <Card.Body>
              <Card.Title style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }} className="droit-card-title">{card.title}</Card.Title>
              <Card.Text style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }} className="droit-card-description">{card.description}</Card.Text>
              <Button variant="primary" className="droit-card-button" href={card.link}>
                <span className="Accessibility-button-text">{t('lm.lmb')}</span>
                <span className="Accessibility-button-icon">{t('arrow.arrow')}</span>
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default Accessibility;
