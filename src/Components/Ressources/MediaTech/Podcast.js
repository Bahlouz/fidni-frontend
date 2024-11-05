import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import './Podcast.css';
import backpodcast from "../../../Assets/backaudio1.jpg";
import { podcastEpisodes } from './podcastEpisodes';
import { podcastEpisodesar } from './podcastEpisodesar';

const Podcast = () => {
  const { t, i18n } = useTranslation(); // Use useTranslation hook
  const [episodes, setEpisodes] = useState([]);
  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);
  const BASE_URL = 'https://admin.fidni.tn';

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const lang = i18n.language === 'fr' ? '' : 'ar'; // Determine language
        const response = await fetch(`${BASE_URL}/api/post-blogs?populate=*`);
        const data = await response.json();

        const filteredEpisodes = data.data
          .filter((post) => {
            const subcategory = post.attributes?.subcategory?.data?.attributes?.name;
            const description = post.attributes?.Description?.[0]?.children?.[0]?.text;
            return subcategory === 'Audio & Podcast' && description?.includes('<podcast>');
          })
          .map((post) => {
            const mediafiles = post.attributes.Mediafiles?.data || [];
            const audioFile = mediafiles.find(file => file.attributes.mime.startsWith('audio'));
            const imageFile = mediafiles.find(file => file.attributes.mime.startsWith('image'));

            const imageUrl = imageFile 
              ? `${BASE_URL}${imageFile.attributes.formats.large.url}` : '';
              
            const audioUrl = audioFile ? `${BASE_URL}${audioFile.attributes.url}` : '';
            const downloadUrl = audioUrl ? `${BASE_URL}${audioFile.attributes.url}` : '';
            
            return {
              id: post.id,
              title: post.attributes.Title,
              date: post.attributes.Description?.[1]?.children?.[0]?.text || 'Unknown date',
              description: post.attributes.content,
              audioUrl,
              downloadUrl,
              imageUrl,
            };
          });

        // Merge fetched episodes with static ones based on language
        const staticEpisodes = lang === 'ar' ? podcastEpisodesar : podcastEpisodes;
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
