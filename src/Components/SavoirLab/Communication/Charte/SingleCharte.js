import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SingleCharte = () => {
  const [post, setPost] = useState(null);
  
  const { title } = useParams(); // Extract the title from the URL parameters
  const [charte, setCharte] = useState(null); // Track the charte data
  const BASE_URL = 'http://localhost:1338';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();
  const decodedTitle = decodeURIComponent(title);
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null); // Reset error state

      try {
        // Fetch data from the API based on the decoded title
        const response = await fetch(`${BASE_URL}/api/communication-inclusives?populate=*`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Find the post in the API data
        const apiPost = data.data.find(item => item.attributes.Title_french === decodedTitle || item.attributes.Title_arabic === decodedTitle);

        if (apiPost) {
          // Extract the data for both languages
          const { Title_french, Title_arabic, Description_french, Description_arabic, Content_french, Content_arabic } = apiPost.attributes;
          
          // Set post state with the selected language's data
          const titleKey = i18n.language === 'ar' ? Title_arabic : Title_french;
          const descriptionKey = i18n.language === 'ar' ? Description_arabic : Description_french;
          const contentKey = i18n.language === 'ar' ? Content_arabic : Content_french;

          setPost({
            title: titleKey,
            description: descriptionKey,
            content: contentKey
          });

          // Set charte state with attributes directly for easier access
          setCharte(apiPost.attributes);
        } else {
          // If not found in API, handle accordingly (you can set a fallback state if needed)
          setCharte(null);
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

  // Ensure charte is available before rendering
  if (!charte) return <Container>{t('charte_not_found')}</Container>;

  return (
    <Container fluid className="droits-container">
      <div className="background-image-charte">
        <div className="p-5 overlay-text-droits"   style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
          <h1 className="droits-titre">{i18n.language === 'ar' ? charte.Title_arabic : charte.Title_french}</h1>
        </div>
      </div>
      <Container className="p-5">
        <div
            style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}
          className="droits-content"
          dangerouslySetInnerHTML={{ __html: i18n.language === 'ar' ? charte.Content_arabic : charte.Content_french }}
        />
        <Button variant="secondary" href="/savoir-lab/communication-inclusive/charte-nationale">{t('retour')}</Button>
      </Container>
    </Container>
  );
};

export default SingleCharte;
