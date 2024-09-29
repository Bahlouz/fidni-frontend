import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './audio.css';



const staticAudioEpisodes = [

  // Add more static episodes here
];

const Audio = () => {
  const [episodes, setEpisodes] = useState([]);
  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);

  useEffect(() => {
    const fetchAudioEpisodes = async () => {
      try {
        const response = await fetch(`/api/post-blogs?populate=*`);
        const data = await response.json();

        const filteredEpisodes = data.data
          .filter((post) => {
            const subcategory = post.attributes?.subcategory?.data?.attributes?.name;
            const description = post.attributes?.Description?.[0]?.children?.[0]?.text;
            return subcategory === 'Audio & Podcast' && description?.includes('<audio>');
          })
          .map((post) => {
            const mediafiles = post.attributes.Mediafiles?.data || [];
            const audioFile = mediafiles.find(file => file.attributes.mime.startsWith('audio'));
            const imageFile = mediafiles.find(file => file.attributes.mime.startsWith('image'));

            return {
              id: post.id,
              title: post.attributes.Title,
              date: post.attributes.Description?.[1]?.children?.[0]?.text || 'Unknown date',
              description: post.attributes.content,
              audioUrl: audioFile ? `${audioFile.attributes.url}` : '',
              downloadUrl: audioFile ? `${audioFile.attributes.url}` : '', // Ensure the URL is correct
              imageUrl: imageFile && imageFile.attributes.formats?.large
                        ? `${imageFile.attributes.formats.large.url}`
                        : `${process.env.PUBLIC_URL}/audios/default.jpg`,
            };
          });

        // Merge fetched episodes with static ones
        setEpisodes([...staticAudioEpisodes, ...filteredEpisodes]);
      } catch (error) {
        console.error("Error fetching audio data:", error);
      }
    };

    fetchAudioEpisodes();
  }, []);

  const toggleDescription = (id) => {
    setExpandedDescriptionId(expandedDescriptionId === id ? null : id);
  };

  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col>
            <h1 className="podcasts-title">Derniers Épisodes d'audios</h1>
          </Col>
        </Row>
        <Row>
          {episodes.map((episode) => (
            <Col md={4} key={episode.id} className="mb-4">
              <Card className="h-100">
                <Card.Img className="podcast-img-card" variant="top" src={episode.imageUrl} alt={episode.title} />
                <Card.Body>
                  <Card.Title>{episode.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{episode.date}</Card.Subtitle>
                  <Card.Text>
                    {expandedDescriptionId === episode.id ? episode.description : `${episode.description.substring(0, 200)}...`}
                  </Card.Text>
                  <Button variant="link" onClick={() => toggleDescription(episode.id)}>
                    {expandedDescriptionId === episode.id ? 'Afficher moins' : 'Afficher plus'}
                  </Button>
                  <audio controls className="audio-player-podcast-audio">
                    <source src={episode.audioUrl} type="audio/mpeg" />
                    Votre navigateur ne prend pas en charge l'élément audio.
                  </audio>
                  <Button 
                    variant="primary" 
                    href={episode.downloadUrl} 
                    download
                    target="_blank"
                  >
                    Télécharger
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

export default Audio;
