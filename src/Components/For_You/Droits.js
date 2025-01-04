import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Droits.css';

export const cardData = [
  {
    titleKey: "droits.title1",
    descriptionKey: "droits.description1",
    link: '/services-et-droits/convention'
  },
  {
    titleKey: "droits.title2",
    descriptionKey: "droits.description2",
    link: '/services-et-droits/cadre'
  },
];

const Droits = () => {
  const { t, i18n } = useTranslation();
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
        const response = await fetch(`${BASE_URL}/api/droits?populate=*`);
        const data = await response.json();

        const apiCardData = data.data.map(post => {
          const titleKey = i18n.language === 'ar' ? post.attributes.Title_arabic : post.attributes.Title_french;
          const descriptionKey = i18n.language === 'ar' ? post.attributes.Description_arabic : post.attributes.Description_french;
          const contentKey = i18n.language === 'ar' ? post.attributes.Content_arabic : post.attributes.Content_french;

          return {
            title: titleKey,
            description: descriptionKey, // Ensure safe handling of description
            link: `/services-et-droits/droits/${encodeURIComponent(titleKey)}`
          };
        });

        setApiData([...cardData.map(post => ({
          title:t(post.titleKey),
          description:t(post.descriptionKey),
          link:post.link
        })), ...apiCardData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [i18n.language]); // Depend on the language change to re-fetch data

  return (
    <Container fluid className="droits-container">
      <div className="background-image-droits">
        <div className="p-5 overlay-text-droits" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
          <h1 className="droits-titre">{t('droits.header')}</h1>
          <p className="droits-description">{t('droits.description')}</p>
        </div>
      </div>
      <Row className="justify-content-center">
        {apiData.map((card, index) => (
          <Card className="droit-card full-width-card mb-4" key={index}>
            <Card.Body>
              <Card.Title className="droit-card-title">{card.title}</Card.Title>
              <Card.Text className="droit-card-description">{card.description}</Card.Text>
              <Button variant="primary" className="droit-card-button" href={card.link}>
                <span className="droits-button-text">{t('lm.lmb')}</span>
                <span className="droits-button-icon">{t('arrow.arrow')}</span>
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default Droits;
