import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Accessibility.css'; // Ensure this file includes styles for your component

const SingleAccessibility = () => {
  const { t ,i18n} = useTranslation();
  const { title } = useParams(); // Extract the title from the URL parameters
  const [post, setPost] = useState(null);
  const BASE_URL = 'http://localhost:1338';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const decodedTitle = decodeURIComponent(title);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null); // Reset error state

      try {
        // Fetch data from the API based on the decoded title
        const response = await fetch(`${BASE_URL}/api/accessibilites?populate=*`);
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
          // Add your fallback static data logic here
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

  // Check if post is loaded
  if (!post) {
    return <Container>{t('postNotFound')}</Container>;
  }

  return (
    <Container fluid className="Accessibility-container">
      <div className="background-image-Accessibility">
        <div className="p-5 overlay-text-Accessibility">
          <h1 className="Accessibility-title" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>{post.title}</h1>
        </div>
      </div>
      <Container className="p-5">
        <div
        style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}
          className="Accessibility-content"
          dangerouslySetInnerHTML={{ __html: post.content }} // Render HTML content safely
        />
        <Button variant="secondary" href="/savoir-lab/accessibilite">
          {t('retour')}
        </Button>
      </Container>
    </Container>
  );
};

export default SingleAccessibility;
