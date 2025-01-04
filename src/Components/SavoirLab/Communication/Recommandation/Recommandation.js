import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Recommandation.css';

export const cardData = [
  {
    titleKey: 'recom.cardDataTitle1',
    descriptionKey: "recom.cardDataDescription1",
    link: '/savoir-lab/recommandations/adoption'
  },
];
const Recommandation = () => {
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
            ?.filter(post => post.attributes?.Choose === 'recommendation')
            .map(post => {
              const attributes = post.attributes || {};

            // Get the title and description based on language preference
            const title = i18n.language === 'ar' ? attributes.Title_arabic : attributes.Title_french;
            const description = i18n.language === 'ar' ? attributes.Description_arabic : attributes.Description_french;

            // Return formatted data
            return {
              title,
              description: description.replace(/<[^>]*>/g, ''), // Clean HTML tags
              link: `/savoir-lab/communication-inclusive/recommandations/${encodeURIComponent(title || 'No Title')}`
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
    <Container fluid className="Recommandation-container">
      <div className="background-image-Recommandation">
        <div className="p-5 overlay-text-Recommandation">
          <h1 className="Recommandation-titre" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>{t('recom.recommandationTitle')}</h1>
        </div>
      </div>
      <Row className="justify-content-center">
        <p className="Recommandation-description">
          {t('recom.recommandationDescription')}<br /><br />
          {t('recom.recommandationDescription1')}
        </p>
        {combinedData.map((card, index) => (
          <Card className="droit-card full-width-card mb-4" key={index}>
            <Card.Body>
              <Card.Title className="rec-card-title">{card.title}</Card.Title>
              <Card.Text className="droit-card-description">{card.description}</Card.Text>
              <Button variant="primary" className="droit-card-button" href={card.link}> 
                <span className="droits-button-text">{t('recom.cardButtonText')}</span>
                <span className="droits-button-icon">{t('arrow.arrow')}</span>
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default Recommandation;
