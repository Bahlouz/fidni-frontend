import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row } from 'react-bootstrap';
import { ActeurScPlitems } from './ActeurScPlitems';
import { Artistesitems } from './Artistesitems';
import { Chercheursitems } from './Chercheursitems';
import { Entrepreneursitems } from './Entrepreneursitems';
import { Sportifsitems } from './Sportifsitems';
import { ActeurScPlitemsar } from './ActeurScPlitemsar';
import { Artistesitemsar } from './Artistesitemsar';
import { Chercheursitemsar } from './Chercheursitemsar';
import { Entrepreneursitemsar } from './Entrepreneursitemsar';
import { Sportifsitemsar } from './Sportifsitemsar';
import { useTranslation } from 'react-i18next';
import backnavhead from "../../Assets/back navhead.jpg";
import Preloader from '../Preloader';

// Define the categories of static items
const categories = {
  ActeurScPl: ActeurScPlitems,
  Artistes: Artistesitems,
  Chercheurs: Chercheursitems,
  Entrepreneurs: Entrepreneursitems,
  Sportifs: Sportifsitems,
  ActeurScPlar: ActeurScPlitemsar,
  Artistesar: Artistesitemsar,
  Chercheursar: Chercheursitemsar,
  Entrepreneursar: Entrepreneursitemsar,
  Sportifsar: Sportifsitemsar,
};

// Map tags to categories
const tagToCategory = {
  'acteurscpl': 'Acteurs sociaux et politiques',
  'artiste': 'Artistes',
  'chercheur': 'Chercheurs',
  'entrepreneur': 'Entrepreneurs',
  'sportif': 'Sportifs',
};

const SingleWikidi = () => {
  const { t, i18n } = useTranslation(); // Use i18n for language handling
  const [storyItem, setStoryItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = 'http://localhost:1338';
  const { storyTitle: encodedTitle } = useParams(); // Get the encoded title from the URL
  const storyTitle = decodeURIComponent(encodedTitle); // Decode the title

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await fetch(`${BASE_URL}/api/wikiphedias?populate=*`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Check API data structure
        const apiItems = data.data;

        // Find item in the API data by matching title
        const apiItem = apiItems.find(item =>
          i18n.language === 'ar'
            ? (item.attributes?.Title_arabic || '') === storyTitle
            : (item.attributes?.Title_french || '') === storyTitle
        );

        if (apiItem) {
          // Extract the category
          const category = apiItem.attributes.Choose || 'Inconnu';

          // If found in API, set it to state
          setStoryItem({
            title: i18n.language === 'ar' ? apiItem.attributes.Title_arabic : apiItem.attributes.Title_french,
    
            content: i18n.language === 'ar' ? apiItem.attributes.Content_arabic : apiItem.attributes.Content_french,
            imageUrl: apiItem.attributes.Image?.data?.attributes?.formats?.large?.url
              ? `${BASE_URL}${apiItem.attributes.Image.data.attributes.formats.large.url}`
              : '',
            category,
          });
        } else {
          // If not found in API, fallback to static data
          const foundStoryItem = findStoryItem(storyTitle);
          setStoryItem(foundStoryItem);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storyTitle, i18n.language]);

  const findStoryItem = (title) => {
    for (const items of Object.values(categories)) {
      const item = items.find(item => item.title === title);
      if (item) {
        return item;
      }
    }
    return null;
  };

  // Function to format description content
  const formatDescription = (content) => {
    return content
      .replace(/<b>/g, '<strong>')
      .replace(/<\/b>/g, '</strong>')
      .replace(/<br\s*\/?>/g, '<br />');
  };

  if (loading) return <Preloader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!storyItem) return <div>{t('Histoire non trouvée')}</div>;

  return (
    <>
      <Row>
        <img className="backnavhead" src={backnavhead} alt="Background" />
      </Row>
      <Container className="single-wikidi-container mt-4">
        <Card className="mb-4">
          {storyItem.imageUrl && (
            <Card.Img variant="top" src={storyItem.imageUrl} className="single-wikidi" />
          )}
          <Card.Body>
            <Card.Title className="single-wikidi-title">{storyItem.title}</Card.Title>  
            <Card.Text
              className="single-wikidi-content"
              dangerouslySetInnerHTML={{ __html: formatDescription(storyItem.content) }}
            />
            <Card.Footer>
              <small className="text-muted">{t('Catégorie')}: {storyItem.category}</small>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default SingleWikidi;
