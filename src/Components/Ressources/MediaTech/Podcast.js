import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import './Podcast.css';
import backpodcast from "../../../Assets/backaudio1.jpg";
import { podcastEpisodes } from './podcastEpisodes';
import { podcastEpisodesar } from './podcastEpisodesar';

const Podcast = () => {
  const { t, i18n } = useTranslation(); // Use translation hook
  const [episodes, setEpisodes] = useState([]);
  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);
  const BASE_URL = 'https://admin.fidni.tn';

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
    const fetchPodcasts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/audio-and-podcasts?populate=*`);
        const data = await response.json();

        const filteredEpisodes = data.data
          .filter((post) => post.attributes?.Choose === 'Podcast') // Filter by "Audio" category
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

        // Merge fetched episodes with static ones based on language
        const staticEpisodes = i18n.language === 'ar' ? podcastEpisodesar : podcastEpisodes;
        setEpisodes([...staticEpisodes, ...filteredEpisodes]);
      } catch (error) {
        console.error(t('podcast.error'), error); // Use translation for error message
      }
    };

    fetchPodcasts();
  }, [i18n.language]); // Rerun effect when language changes

  const toggleDescription = (id) => {
    setExpandedDescriptionId(expandedDescriptionId === id ? null : id);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      window.location.reload(); // Refresh the page to apply the new language
    });
  };

  return (
    <>
      <div className="audio-image">
        <img src={backpodcast} alt="Podcast Background" />
      </div>
      <Container className="mt-4">
        <Row>
          <Col>
            <h1 className="podcasts-title">{t('podcast.title')}</h1>
          </Col>
        </Row>
        <Row>
          {episodes.map((episode) => (
            <Col md={4} key={episode.id} className="mb-4">
              <Card className="h-100">
                <Card.Img className="podcast-img-card" src={episode.imageUrl} alt={episode.title} />
                <Card.Body>
                  <Card.Title>{episode.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{episode.date}</Card.Subtitle>
                  <Card.Text>
                    {expandedDescriptionId === episode.id ? episode.description : `${episode.description.substring(0, 200)}...`}
                  </Card.Text>
                  <Button variant="link" onClick={() => toggleDescription(episode.id)}>
                    {expandedDescriptionId === episode.id ? t('podcast.showLess') : t('podcast.showMore')}
                  </Button>
                  <audio controls className="audio-player-podcast-audio">
                    <source src={`${episode.audioUrl}`} type="audio/mpeg" />
                    Votre navigateur ne prend pas en charge l'élément audio.
                  </audio>
                  <Button variant="primary" 
                    href={`${episode.downloadUrl}`} 
                    download={`${episode.downloadUrl}`}>
                    {t('podcast.download')}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Podcast;
