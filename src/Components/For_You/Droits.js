import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
import './Droits.css';

const Droits = () => {
  const [apiData, setApiData] = useState([]);

  const cardData = [
    {
      title: "Convention relative aux Droits des Personnes Handicapées (CDPH)",
      description: "La Convention relative aux droits des personnes handicapées (CDPH), adoptée le 13 décembre 2006 par l’Assemblée générale des Nations Unies à New York, a pour objet de « promouvoir, protéger et assurer la pleine et égale jouissance de tous les droits de l’homme et de toutes les libertés fondamentales par les personnes handicapées et de promouvoir le respect de leur dignité intrinsèque ».",
      link: '/services-et-droits/convention'
    },
    {
      title: 'Cadre réglementaire concernant le handicap en Tunisie',
      description: "En ratifiant la Convention relative aux droits des personnes handicapées le 2 avril 2008, la Tunisie affirmait un engagement fort envers la protection et la promotion des droits des personnes en situation de handicap. Des avancées significatives ont ensuite été enregistrées avec l'intégration de ces principes dans la Constitution tunisienne, en 2014 et réaffirmée en 2022, consacrant ainsi la protection des personnes handicapées contre toute forme de discrimination, conformément à l'article 54 qui stipule que « l’État protège les personnes handicapées contre toute discrimination et prend toutes les mesures propres à leur garantir une entière intégration au sein de la société ».",
      link: '/services-et-droits/cadre'
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/post-blogs?populate=*');
        const data = await response.json();

        // Function to extract text content from the nested Description
        const extractDescriptionText = (descriptionBlocks) => {
          return descriptionBlocks
            .map(block => block.children.map(child => child.text).join(''))
            .join(' ');
        };

        // Filter and map the API data to the structure expected by your cards
        const apiCardData = data.data
          .filter(post => post.attributes.subcategory?.data?.attributes?.name === 'Droits')
          .map(post => ({
            title: post.attributes.Title,
            description: extractDescriptionText(post.attributes.Description),
            link: `/services-et-droits/droits/${encodeURIComponent(post.attributes.Title)}`
          }));

        // Combine static cardData with API data
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
        <div className="p-5 overlay-text-droits">
          <h1 className="droits-titre">DROITS ET LEGISLATION</h1>
          <p className="droits-description">Vous allez trouver dans cette section des informations sur les droits des personnes handicapées en Tunisie, à savoir la Convention relative aux Droits des Personnes Handicapées (CDPH) et le cadre légal en Tunisie.</p>
        </div>
      </div>
      <Row className="justify-content-center">
        {apiData.map((card, index) => (
          <Card className="droit-card full-width-card mb-4" key={index}>
            <Card.Body>
              <Card.Title className="droit-card-title">{card.title}</Card.Title>
              <Card.Text className="droit-card-description">{card.description}</Card.Text>
              <Button variant="primary" className="droit-card-button" href={card.link}>
                <span className="droits-button-text">En apprendre plus</span>
                <span className="droits-button-icon"> →</span>
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default Droits;
