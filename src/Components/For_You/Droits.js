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
  const { t ,i18n} = useTranslation();
  const [apiData, setApiData] = useState([]);
  const BASE_URL = 'https://admin.fidni.tn';
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/post-blogs?populate=*`);
        const data = await response.json();

        const extractDescriptionText = (descriptionBlocks) => {
          return descriptionBlocks
            .map(block => block.children.map(child => child.text).join(''))
            .join(' ');
        };

        const apiCardData = data.data
          .filter(post => post.attributes.subcategory?.data?.attributes?.name === 'Droits')
          .map(post => ({
            title: post.attributes.Title,
            description: extractDescriptionText(post.attributes.Description),
            link: `/services-et-droits/droits/${encodeURIComponent(post.attributes.Title)}`
          }));

        setApiData([...cardData, ...apiCardData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
              <Card.Title className="droit-card-title">{t(card.titleKey)}</Card.Title>
              <Card.Text className="droit-card-description">{t(card.descriptionKey)}</Card.Text>
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
