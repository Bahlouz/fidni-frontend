import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const SingleCharte = () => {
  const { title } = useParams(); // Extract the title from the URL parameters
  const [charte, setCharte] = useState(null);

  useEffect(() => {
    const fetchCharte = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/post-blogs?populate[subcategory][populate]=*&filters[Title][$eq]=${title}`);
        const data = await response.json();
        const fetchedChartes = data.data; // Array of chartes

        if (fetchedChartes.length > 0) {
          // Assuming we need to select the first charte from the result
          const fetchedCharte = fetchedChartes[0];
          setCharte(fetchedCharte);
        } else {
          console.error('Charte not found');
        }
      } catch (error) {
        console.error('Error fetching charte:', error);
      }
    };

    fetchCharte();
  }, [title]);

  if (!charte) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container fluid className="droits-container">
      <div className="background-image-charte">
        <div className="p-5 overlay-text-droits">
          <h1 className="droits-titre">{charte.attributes.Title}</h1>
        </div>
      </div>
      <Container className="p-5">
        <div
          className="droits-content"
          dangerouslySetInnerHTML={{ __html: charte.attributes.content }}
        />
        <Button variant="secondary" href="/savoir-lab/communication-inclusive/charte-nationale">Retour à la liste</Button>
      </Container>
    </Container>
  );
};

export default SingleCharte;
