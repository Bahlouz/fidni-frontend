import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
import './Charte.css';

const Charte = () => {
  const [apiData, setApiData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  const cardData = [
    {
      title: "Découvrez la Charte pour l'Inclusion et l'Accessibilité des Personnes Handicapées dans les Médias Tunisiens",
      description: "Adoptée par la « Coalition nationale pour des médias inclusifs et accessibles aux personnes handicapées », la charte vise à promouvoir l'inclusion et l'accessibilité des personnes handicapées dans les médias tunisiens. Les principaux acteurs de cette initiative comprennent des institutions de recherche et de formation, des organisations professionnelles, des organismes de régulation et d'autorégulation des médias, des associations de défense des droits des personnes handicapées, des organisations internationales et de nombreux médias tunisiens, ainsi que des personnalités médiatiques et des membres de l'Assemblée des représentants du peuple. Avec pour objectifs clés la création d'un comité de suivi du traitement médiatique des questions liées au handicap, l'organisation de campagnes de plaidoyer régulières et l'institution d'un prix professionnel annuel, le 'Prix de l'accessibilité et de l'inclusion', pour honorer les initiatives médiatiques exemplaires.",
      link: '/savoir-lab/communication-inclusive/charte-nationale/coalition'
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

        // Filter API data by subcategory name "Communication inclusive" and specific tags
        const filteredApiData = data.data
          ?.filter(post =>
            post.attributes?.subcategory?.data?.attributes?.name === 'Communication inclusive' &&
            (extractDescriptionText(post.attributes?.Description || []).includes('<charte>'))
          )
          .map(post => ({
            title: post.attributes?.Title || 'No Title',
            description: extractDescriptionText(post.attributes?.Description || []).replace(/<[^>]*>/g, ''), // Clean up the description text
            link: `/savoir-lab/communication-inclusive/charte-nationale/${encodeURIComponent(post.attributes?.Title || 'No Title')}`
          })) || [];

        console.log('Filtered API Data:', filteredApiData); // Log the filtered data for debugging

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
    <Container fluid className="droits-container">
      <div className="background-image-charte">
        <div className="p-5 overlay-text-droits">
          <h1 className="droits-titre">
            La charte nationale pour des médias inclusifs et accessibles aux personnes handicapées en Tunisie
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

export default Charte;
