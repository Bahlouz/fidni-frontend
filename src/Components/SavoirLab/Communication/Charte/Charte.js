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
  const { t,i18n } = useTranslation();
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const [apiData, setApiData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const BASE_URL = 'https://admin.fidni.tn';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/post-blogs?populate=*`);
        const data = await response.json();

        const extractDescriptionText = (descriptionBlocks) => {
          if (!descriptionBlocks) return '';
          return descriptionBlocks
            .map(block => block.children?.map(child => child.text).join('') || '')
            .join(' ');
        };

        const filteredApiData = data.data
          ?.filter(post =>
            post.attributes?.subcategory?.data?.attributes?.name === 'Communication inclusive' &&
            (extractDescriptionText(post.attributes?.Description || []).includes('<charte>'))
          )
          .map(post => ({
            title: post.attributes?.Title || t('defaultTitle'),
            description: extractDescriptionText(post.attributes?.Description || []).replace(/<[^>]*>/g, ''),
            link: `/savoir-lab/communication-inclusive/charte-nationale/${encodeURIComponent(post.attributes?.Title || 'No Title')}`
          })) || [];

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
  }, [t]); // Ensure translations are updated if the language changes

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
                <span className="droits-button-icon">→</span>
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default Charte;
