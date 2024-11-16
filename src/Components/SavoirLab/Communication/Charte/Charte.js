import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Card, Button } from 'react-bootstrap';
import './Charte.css';

export const cardData = [
  {
    titleKey: 'charte.cardData.title1',
    descriptionKey: 'charte.cardData.description1',
    link: '/savoir-lab/communication-inclusive/charte-nationale/coalition'
  },
];

const Charte = () => {
  
  const { t, i18n } = useTranslation();
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const [apiData, setApiData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const BASE_URL = 'https://admin.fidni.tn';


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
        const response = await fetch(`${BASE_URL}/api/communication-inclusives?populate=*`);
        const data = await response.json();

        // Filter data where 'Choose' attribute is equal to 'charte'
        const filteredApiData = data.data
          ?.filter(post => post.attributes?.Choose === 'charte')
          .map(post => {
            const attributes = post.attributes || {};

            // Get the title and description based on language preference
            const title = i18n.language === 'ar' ? attributes.Title_arabic : attributes.Title_french;
            const description = i18n.language === 'ar' ? attributes.Description_arabic : attributes.Description_french;

            // Return formatted data
            return {
              title,
              description: description.replace(/<[^>]*>/g, ''), // Clean HTML tags
              link: `/savoir-lab/communication-inclusive/charte-nationale/${encodeURIComponent(title || 'No Title')}`
            };
          }) || [];

        // Combine the static card data and fetched API data
        setCombinedData([
          ...cardData.map(card => ({
            title: t(card.titleKey),
            description: t(card.descriptionKey),
            link: card.link
          })),
          ...filteredApiData
        ]);

        setApiData(filteredApiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [t, i18n.language]); // Ensure translations and language are updated

  return (
    <Container fluid className="droits-container">
      <div className="background-image-charte">
        <div className="p-5 overlay-text-droits">
          <h1 className="droits-titre" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
            {t('charte.charteTitle')}
          </h1>
        </div>
      </div>
      <Row className="justify-content-center">
        {combinedData.map((card, index) => (
          <Card className="droit-card full-width-card mb-4" key={index}>
            <Card.Body>
              <Card.Title className="droit-card-title">{card.title}</Card.Title>
              <Card.Text className="droit-card-description">{card.description}</Card.Text>
              <Button variant="primary" className="droit-card-button" href={card.link}>
                <span className="droits-button-text">{t('charte.learnMore')}</span>
                <span className="droits-button-icon">{t('arrow.arrow')}</span>
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default Charte;
