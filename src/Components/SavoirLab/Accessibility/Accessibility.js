import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Accessibility.css';

const Accessibility = () => {
  const { t ,i18n} = useTranslation();
  const [apiData, setApiData] = useState([]);
  const BASE_URL = 'https://admin.fidni.tn';
    const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/post-blogs?populate=*`);
        const data = await response.json();
        console.log('API Response:', JSON.stringify(data, null, 2));

        // Function to extract text content from the nested Description
        const extractDescriptionText = (descriptionBlocks) => {
          if (!descriptionBlocks) return '';
          return descriptionBlocks
            .map(block => block.children?.map(child => child.text).join('') || '')
            .join(' ');
        };

        // Filter API data by subcategory name "Accessibilité"
        const filteredApiData = data.data
          ?.filter(post =>
            post.attributes?.subcategory?.data?.attributes?.name === 'Accessibilité'
          )
          .map(post => ({
            title: post.attributes?.Title || 'No Title',
            description: extractDescriptionText(post.attributes?.Description || []),
            link: `/savoir-lab/accessibilite/${encodeURIComponent(post.attributes?.Title || 'No Title')}`
          })) || [];

        console.log('Filtered API Data:', filteredApiData);

        // Combine static cardData with filtered API data
        const cardData = t('accessibilityPage.cardData', { returnObjects: true });
        setApiData([...cardData, ...filteredApiData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [t]); // Added t as a dependency

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
