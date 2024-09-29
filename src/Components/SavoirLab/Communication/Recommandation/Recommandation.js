import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
import './Recommandation.css';

const Recommandation = () => {
  const [apiData, setApiData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  const cardData = [
    {
      title: "Accéder aux Recommandations Stratégiques pour l'Inclusion Médiatique des Personnes Handicapées",
      description: "Cette section présente une première feuille de route de recommandations stratégiques développée dans le cadre de la dynamique de développement du Guide « … », qui s’adressent aux acteurs nationaux, aux institutions éducatives, aux organes de régulation, et impliquent la création de partenariats innovants et de programmes de formation adaptés. L'objectif est double : améliorer la représentation des personnes handicapées dans les médias et assurer leur participation active et équitable dans tous les aspects de la vie médiatique.",
      link: '/savoir-lab/recommandations/adoption'
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/post-blogs?populate=*');
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
        setCombinedData([...cardData, ...filteredApiData]);
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
          <h1 className="Recommandation-titre">Les recommandations pour les médias et les acteurs médiatiques</h1>
        </div>
      </div>
      <Row className="justify-content-center">
        <p className="Recommandation-description">
          À mesure que la Tunisie progresse vers une société plus inclusive, l'importance de la communication inclusive des personnes handicapées dans les médias devient primordiale.<br /><br />
          Afin de transformer cette aspiration en réalité, des mesures concrètes doivent être prises à plusieurs niveaux de la société, afin d’instaurer une culture médiatique qui non seulement respecte mais aussi valorise la diversité et les contributions des personnes handicapées.
        </p>
        {combinedData.map((card, index) => (
          <Card className="droit-card full-width-card mb-4" key={index}>
            <Card.Body>
              <Card.Title className="rec-card-title">{card.title}</Card.Title>
              <Card.Text className="droit-card-description">{card.description}</Card.Text>
              <Button variant="primary" className="droit-card-button" href={card.link}> 
                <span className="droits-button-text">En apprendre plus</span>
                <span className="droits-button-icon">→</span>
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default Recommandation;
