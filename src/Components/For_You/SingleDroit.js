import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SingleDroits = () => {
  const { title } = useParams(); // Extract the encoded title from the URL parameters
  const { t, i18n } = useTranslation();
  const [post, setPost] = useState(null);
  const BASE_URL = 'http://localhost:1338';
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Decode the title parameter
  const decodedTitle = decodeURIComponent(title);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null); // Reset error state

      try {
        // Fetch data from the API based on the decoded title
        const response = await fetch(`${BASE_URL}/api/droits?populate=*`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Find the post in the API data
        const apiPost = data.data.find(item => item.attributes.Title_french === decodedTitle || item.attributes.Title_arabic === decodedTitle);

        if (apiPost) {
          const { Title_french, Title_arabic, Description_french, Description_arabic, Content_french, Content_arabic } = apiPost.attributes;
          
          // Extract data based on language preference
          const titleKey = i18n.language === 'ar' ? Title_arabic : Title_french;
          const descriptionKey = i18n.language === 'ar' ? Description_arabic : Description_french;
          const contentKey = i18n.language === 'ar' ? Content_arabic : Content_french;

          setPost({
            title: titleKey,
            description: descriptionKey,
            content: contentKey
          });
        } else {
          // If not found in API, use static data (for fallback purposes)
  
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [decodedTitle, i18n.language]);

  // Loading, error, or post not found UI
  if (loading) return <Container>{t('loading')}</Container>;
  if (error) return <Container>{t('error')}: {error}</Container>;

  return (
    <Container fluid className="droits-container">
      <div className="background-image-droits">
        <div
          className="p-5 overlay-text-droits"
          style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}
        >
          <h1 className="droits-titre">{post.title}</h1>
        </div>
      </div>
      <Container className="p-5">
        <div
        style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}
          className="droits-content"
          dangerouslySetInnerHTML={{ __html: post.content }} // Render HTML content safely
        />
        <Button variant="secondary" href="/savoir-lab/accessibilite">
          {t('retour')}
        </Button> 
      </Container>
    </Container>
  );
};

export default SingleDroits;
