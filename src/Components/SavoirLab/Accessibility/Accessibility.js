import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
import './Accessibility.css';

const Accessibility = () => {
  const [apiData, setApiData] = useState([]);

  const cardData = [
    {
      title: 'Accessibilité aux médias et à l’information',
      description: "L’accessibilité des médias pour les personnes handicapées est centrale, non seulement pour leur droit à l’information, mais aussi pour leur capacité à participer pleinement dans la société. De ce fait, les acteurs médiatiques ont un rôle a joué dans le cadre du processus d’accessibilité. En effet, ils se doivent de respecter des normes inclusives et respectueuses des personnes en situation de handicap. Pour ce faire, ils peuvent adopter une série de mesures tels qu’une nouvelle manière de structurer un communiqué de presse pour qu’il soit plus impactant et en faveur de l’inclusion des personnes handicapées ou encore à travers l’organisation d’une conférence de presse pour sensibiliser et mobiliser autour des enjeux des personnes en situation de handicap. Des défis persistent dans la création de contenus médiatiques accessibles. Nous proposons des solutions concrètes pour surmonter ces obstacles garantissant que personne ne soit laissé pour compte.",
      link: '/savoir-lab/Accessibilité aux médias et à l’information'
    },
    {
      title: "Appui des acteurs médiatiques au processus d'accessibilité",
      description: "Le lien entre handicap et accessibilité est indissociable. Comprendre les défis quotidiens des personnes en situation de handicap est essentiel pour saisir le rôle crucial de l’accessibilité. Celle-ci influence de nombreux aspects de la vie quotidienne, incluant l’éducation, la santé, le travail, le transport et la culture. Rendre le monde accessible est une nécessité pour promouvoir l’inclusion des personnes handicapées, un objectif qui bénéficie à l’ensemble de la société, quels que soient les capacités individuelles. L’appui des acteurs médiatiques à ce processus est indispensable, notamment à travers la réalisation de reportage sur des aspects cruciaux de la vie des personnes handicapées, comme l’accès aux espaces publics ou urbains ou à travers une méthodologie journalistique rigoureuse.",
      link: '/savoir-lab/Appui des acteurs médiatiques au processus d accessibilité'
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/post-blogs?populate=*');
        const data = await response.json();
        console.log('API Response:', JSON.stringify(data, null, 2)); // Log detailed API response

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

        console.log('Filtered API Data:', filteredApiData); // Log the filtered data for debugging

        // Combine static cardData with filtered API data
        setApiData([...cardData, ...filteredApiData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid className="Accessibility-container">
      <div className="background-image-Accessibility">
        <div className="p-5 overlay-text-Accessibility">
          <h1 className="Accessibility-titre">Accessibilité</h1>
          <p className="Accessibility-description">
            Vous allez trouver dans cette section des informations sur l’accessibilité des personnes en situation de handicap aux droits et services, mais également aux médias et à l’information.
          </p>
        </div>
      </div>
      <Row className="justify-content-center">
        {apiData.map((card, index) => (
          <Card className="droit-card full-width-card mb-4" key={index}>
            <Card.Body>
              <Card.Title className="droit-card-title">{card.title}</Card.Title>
              <Card.Text className="droit-card-description">{card.description}</Card.Text>
              <Button variant="primary" className="droit-card-button" href={card.link}>
                <span className="Accessibility-button-text">En apprendre plus</span>
                <span className="Accessibility-button-icon">→</span>
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default Accessibility;
