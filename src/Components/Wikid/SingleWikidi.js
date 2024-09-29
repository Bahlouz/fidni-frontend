import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row } from 'react-bootstrap';
import { ActeurScPlitems } from './ActeurScPlitems';
import { Artistesitems } from './Artistesitems';
import { Chercheursitems } from './Chercheursitems';
import { Entrepreneursitems } from './Entrepreneursitems';
import { Sportifsitems } from './Sportifsitems';
import backnavhead from "../../Assets/back navhead.jpg";
import Preloader from '../Preloader';
// Define the categories of static items
const categories = {
  ActeurScPl: ActeurScPlitems,
  Artistes: Artistesitems,
  Chercheurs: Chercheursitems,
  Entrepreneurs: Entrepreneursitems,
  Sportifs: Sportifsitems,
};

// Define the base URL for images


// Map tags to categories
const tagToCategory = {
  'acteurscpl': 'Acteurs sociaux et politiques',
  'artiste': 'Artistes',
  'chercheur': 'Chercheurs',
  'entrepreneur': 'Entrepreneurs',
  'sportif': 'Sportifs',
};

const SingleWikidi = () => {
  const { storyTitle } = useParams();  // Get the title from the URL
  const [storyItem, setStoryItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await fetch(`/api/post-blogs?populate=*`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Check API data structure
        const apiItems = data.data;

        // Find item in the API data by matching title
        const apiItem = apiItems.find(item =>
          item.attributes?.Title?.toLowerCase() === storyTitle.toLowerCase()
        );

        if (apiItem) {
          // Extract the tag from the description
          const descriptionText = apiItem.attributes.Description
            .flatMap(part => part.children.map(child => child.text))
            .join(' ');
          const tag = Object.keys(tagToCategory).find(t => descriptionText.includes(`<${t}>`));
          
          const category = tagToCategory[tag] || "Inconnu";

          // If found in API, set it to state
          setStoryItem({
            title: apiItem.attributes.Title,
            date: new Date(apiItem.attributes.publishedAt).toLocaleDateString('fr-FR'),
            content: apiItem.attributes.content,
            imageUrl: apiItem.attributes.Mediafiles?.data?.[0]?.attributes?.formats?.large?.url
              ? `${apiItem.attributes.Mediafiles.data[0].attributes.formats.large.url}`
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
  }, [storyTitle]);

  // Function to find the story item in the static categories
  const normalizeTitle = (title) => {
    return title
      .replace(/-/g, ' ')         // Replace dashes with spaces
      .replace(/:/g, '')          // Remove colons
      .toLowerCase()
      .trim();                    // Trim any extra spaces
  };
  
  const findStoryItem = (title) => {
    const normalizedTitle = normalizeTitle(title);  // Normalize the title from the URL
    console.log('Finding normalized story:', normalizedTitle);  // Log normalized title
    
    for (const [category, items] of Object.entries(categories)) {
      console.log('Checking category:', category);  // Log each category being checked
      const item = items.find(item => {
        const normalizedItemTitle = normalizeTitle(item.title);  // Normalize the item title
        console.log('Comparing:', normalizedItemTitle, 'with', normalizedTitle);  // Log the comparison
        return normalizedItemTitle === normalizedTitle;
      });
      if (item) {
        console.log('Story found in category:', category);  // Log if a story is found
        return {
          ...item,
          category,
        };
      }
    }
    
    console.log('Story not found');  // Log if no story is found
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
  if (!storyItem) return <div>Histoire non trouvée</div>;

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
            <Card.Subtitle className="mb-2 text-muted">{storyItem.date}</Card.Subtitle>
            <Card.Text
              className="single-wikidi-content"
              dangerouslySetInnerHTML={{ __html: formatDescription(storyItem.content) }}
            />
            <Card.Footer>
              <small className="text-muted">Catégorie: {storyItem.category}</small>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default SingleWikidi;
