import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const SingleRecommendation = () => {
  const { title } = useParams(); // Extract the title from the URL parameters
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/post-blogs?populate[subcategory][populate]=*&filters[Title][$eq]=${title}`);
        const data = await response.json();
        const fetchedRecommendations = data.data; // Array of recommendations

        if (fetchedRecommendations.length > 0) {
          // Assuming we need to select the first recommendation from the result
          const fetchedRecommendation = fetchedRecommendations[0];
          setRecommendation(fetchedRecommendation);
        } else {
          console.error('Recommendation not found');
        }
      } catch (error) {
        console.error('Error fetching recommendation:', error);
      }
    };

    fetchRecommendation();
  }, [title]);

  if (!recommendation) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container fluid className="Recommandation-container">
      <div className="background-image-Recommandation">
        <div className="p-5 overlay-text-Recommandation">
          <h1 className="Recommandation-titre">{recommendation.attributes.Title}</h1>
        </div>
      </div>
      <Container className="p-5">
        <div
          className="Recommandation-content"
          dangerouslySetInnerHTML={{ __html: recommendation.attributes.content }}
        />
        <Button variant="secondary" href="/savoir-lab/recommandations/adoption">Retour à la liste</Button>
      </Container>
    </Container>
  );
};

export default SingleRecommendation;
