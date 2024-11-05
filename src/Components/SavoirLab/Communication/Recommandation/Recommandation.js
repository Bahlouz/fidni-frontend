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
  const [apiData, setApiData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const BASE_URL = 'https://admin.fidni.tn';
  const { t,i18n } = useTranslation();
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/post-blogs?populate=*`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        console.log('Fetched data:', data); // Debugging

        // Function to extract text content from the nested Description
        const extractDescriptionText = (descriptionBlocks) => {
          if (!descriptionBlocks) return ''; // Check if descriptionBlocks is null or undefined
          return descriptionBlocks
            .map(block => block.children?.map(child => child.text).join('') || '')
            .join(' ');
        };

        // Filter API data by subcategory name "Recommandations" and specific tags
        const filteredApiData = (data.data || [])
          .filter(post =>
            post.attributes?.subcategory?.data?.attributes?.name === 'Communication inclusive' &&
            extractDescriptionText(post.attributes?.Description || []).includes('<recommendation>')
          )
          .map(post => ({
            title: post.attributes?.Title || 'No Title',
            description: extractDescriptionText(post.attributes?.Description || []).replace(/<[^>]*>/g, ''), // Clean up the description text
            link: `/savoir-lab/communication-inclusive/recommandations/${encodeURIComponent(post.attributes?.Title || 'No Title')}`
          }));

        console.log('Filtered API data:', filteredApiData); // Debugging

        // Combine static data with API data
        setCombinedData([...cardData.map(card => ({
          title: t(card.titleKey),
          description: t(card.descriptionKey),
          link: card.link
        })), ...filteredApiData]);
        setApiData(filteredApiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
