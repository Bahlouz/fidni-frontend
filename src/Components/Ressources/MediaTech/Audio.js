import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './audio.css';
import { useTranslation } from 'react-i18next';

const staticAudioEpisodes = [
  // Add more static episodes here if needed
];

const Audio = () => {
  const { t, i18n } = useTranslation(); // Use translation hook
  const [episodes, setEpisodes] = useState([]);
  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);
  const BASE_URL = 'http://localhost:1338';

  useEffect(() => {
    const handleLanguageChange = () => {
      window.location.reload();
    };

    i18n.on('languageChanged', handleLanguageChange);

    // Cleanup on component unmount
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  useEffect(() => {
    const fetchAudioEpisodes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/audio-and-podcasts?populate=*`);
        const data = await response.json();

        const filteredEpisodes = data.data
          .filter((post) => post.attributes?.Choose === 'Audio') // Filter by "Audio" category
          .map((post) => {
            const lang = i18n.language;

            // Determine appropriate title and description based on language
            const title = lang === 'fr'
              ? post.attributes.Title_french
              : lang === 'ar'
              ? post.attributes.Title_arabic
              : post.attributes.Title;

            const description = lang === 'fr'
              ? post.attributes.Content_french
              : lang === 'ar'
              ? post.attributes.Content_arabic
              : post.attributes.Content;

            const imageUrl = `${BASE_URL}${post.attributes.Image?.data?.attributes?.formats?.medium?.url || post.attributes.Image?.data?.attributes?.url}`;
            const audioUrl = `${BASE_URL}${post.attributes.Audio_File?.data?.attributes?.url}`;

            return {
              id: post.id,
              title,
              date: post.attributes.Date_JJ_MMMM_AA || 'Unknown date',
              description,
              audioUrl,
              downloadUrl: audioUrl,
              imageUrl,
            };
          });

        // Merge fetched episodes with static ones
        setEpisodes([...staticAudioEpisodes, ...filteredEpisodes]);
      } catch (error) {
        console.error('Error fetching audio data:', error);
      }
    };

    fetchAudioEpisodes();
  }, [i18n.language]);

  const toggleDescription = (id) => {
    setExpandedDescriptionId(expandedDescriptionId === id ? null : id);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="podcasts-title">{t('audio.title')}</h1>
        </Col>
      </Row>
      <Row>
        {episodes.map((episode) => (
          <Col md={4} key={episode.id} className="mb-4">
            <Card className="h-100">
              <Card.Img className="podcast-img-card" variant="top" src={episode.imageUrl} alt={episode.title} />
              <Card.Body>
                <Card.Title>{episode.title}</Card.Title>
                
                <Card.Text>
                  {expandedDescriptionId === episode.id ? episode.description : `${episode.description.substring(0, 200)}...`}
                </Card.Text>
                <Button variant="link" onClick={() => toggleDescription(episode.id)}>
                  {expandedDescriptionId === episode.id ? t('audio.showLess') : t('audio.showMore')}
                </Button>
                <audio controls className="audio-player-podcast-audio">
                  <source src={episode.audioUrl} type="audio/mpeg" />
                  {t('audio.audioNotSupported')}
                </audio>
                <Button 
                  variant="primary" 
                  href={episode.downloadUrl}  // Full URL of the file
                  download={episode.downloadUrl.split('/').pop()}  // Ensure download attribute has a filename
                >
                  {t('audio.download')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Audio;
