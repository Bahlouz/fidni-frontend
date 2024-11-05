import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Sportifsitems } from './Sportifsitems'; // Import static data
import { Sportifsitemsar } from './Sportifsitemsar'; // Import static data
import { useTranslation } from 'react-i18next';
import "./Wikid.css";
import "./Sportifs.css";

// Function to extract the first line of HTML content
const getFirstLine = (htmlContent) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const firstLine = tempDiv.textContent.split('\n')[0];
    return firstLine;
};

// Function to format date
const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
};

// Function to check if the description contains the <sportif> tag
const containsSportifTag = (description) => {
    return description.some(paragraph => 
        paragraph.children.some(child => child.text === '<sportif>')
    );
};

// Function to encode the title for URL
const encodeTitleForURL = (title) => {
    return encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'));
};



const Sportifs = () => {
    const { t ,i18n} = useTranslation(); // Hook for translations
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();
  
    const [apiItems, setApiItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = 'https://admin.fidni.tn';
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/post-blogs?populate=*`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          const filteredItems = data.data.filter(item => 
            item.attributes?.subcategory?.data?.attributes?.name === 'WikiPhédia' &&
            containsSportifTag(item.attributes?.Description || [])
          );
  
          const itemsWithImages = filteredItems.map(item => {
            const mediaFiles = item.attributes?.Mediafiles?.data || [];
            return {
              ...item,
              attributes: {
                ...item.attributes,
                mediaFiles: mediaFiles.map(file => file.attributes?.url || ''),
                imageUrl: mediaFiles[0]?.attributes?.url ? `${BASE_URL}${mediaFiles[0].attributes.url}` : ''
              }
            };
          });
  
          setApiItems(itemsWithImages);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    const Staticitems = i18n.language === 'ar' ? Sportifsitemsar : Sportifsitems;
    const combinedItems = [...Staticitems, ...apiItems];
    const sortedItems = combinedItems.sort((a, b) => 
      new Date(b.attributes?.publishedAt || b.attributes?.publishedAt) - new Date(a.attributes?.publishedAt || b.attributes?.publishedAt)
    );
  
    const latestStory = sortedItems[0] || {};
  
    const wikidlinks = [
        { title: t('wiki.actorSocialAndPolitical'), link: '/savoir-lab/wikiphedia/acteurs-sociaux-politiques', page: 'acteurs-sociaux-politiques' },
        { title: t('wiki.artists'), link: '/savoir-lab/wikiphedia/artistes', page: 'artistes' },
        { title: t('wiki.researchers'), link: '/savoir-lab/wikiphedia/chercheurs', page: 'chercheurs' },
        { title: t('wiki.entrepreneurs'), link: '/savoir-lab/wikiphedia/entrepreneurs', page: 'entrepreneurs' },
        { title: t('wiki.athletes'), link: '/savoir-lab/wikiphedia/sportifs', page: 'sportifs' }
    ];
  
    if (loading) return <p>{t('sportifs.loading')}</p>;
    if (error) return <p>{t('sportifs.error')} {error.message}</p>;
  
    return (
      <>
        <div className="background-image-sportifs">
          <div className="overlay-text-sportifs">
            <h1 className="sportifs-titre">{t('sportifs.title')}</h1>
            <p className="p-5 sportifs-description">
              {t('sportifs.description')}
            </p>
          </div>
          <div className="button-container">
            {wikidlinks.map((item, index) => (
              <Button
                key={index}
                className={`wikid-button ${currentPath === item.page ? 'active' : ''}`}
                href={item.link}
              >
                {item.title}
              </Button>
            ))}
          </div>
        </div>
  
        <Container className="mt-4">
          <Row>
            <Col>
              <h1 className="Sportifs-title">{t('sportifs.historyTitle')}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              {latestStory.id && (
                <Card className="mb-4 custom-card">
                  {latestStory.attributes?.mediaFiles?.[0] && (
                    <Card.Img 
                      className="latest-wikid" 
                      variant="top" 
                      src={`${BASE_URL}${latestStory.attributes.mediaFiles[0]}`} 
                      alt={latestStory.attributes?.Title || latestStory.title}
                      onError={() => console.error('Image not found:', latestStory.attributes?.mediaFiles[0])}
                    />
                  )}
                  {!latestStory.attributes?.mediaFiles?.[0] && latestStory.imageUrl && (
                    <Card.Img 
                      className="latest-wikid" 
                      variant="top" 
                      src={latestStory.imageUrl} 
                      alt={latestStory.title}
                    />
                  )}
                  <Card.Body>
                    <Card.Title>{latestStory.attributes?.Title || latestStory.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{formatDate(latestStory.attributes?.publishedAt || latestStory.date)}</Card.Subtitle>
                    <Card.Text className="card-text-truncatedd">
                      {getFirstLine(latestStory.attributes?.content || latestStory.content)}
                    </Card.Text>
                    <Button 
                      variant="primary" 
                      href={`/savoir-lab/wikiphedia/${encodeURIComponent(latestStory.attributes?.Title || latestStory.title)}`}
                    >
                      {t('sportifs.readMore')}
                    </Button>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
          <Row>
            {sortedItems.slice(1).map(item => (
              <Col key={item.id} md={4} className="mb-4">
                <Card className="custom-card h-100">
                  {item.attributes?.mediaFiles?.[0] && (
                    <Card.Img
                      className="wikid-card-image"
                      variant="top"
                      src={`${BASE_URL}${item.attributes.mediaFiles[0]}`}
                      alt={item.attributes?.Title || item.title}
                      onError={() => console.error('Image not found:', item.attributes?.mediaFiles[0])}
                    />
                  )}
                  {!item.attributes?.mediaFiles?.[0] && item.imageUrl && (
                    <Card.Img 
                      className="wikid-card-image"
                      variant="top"
                      src={item.imageUrl}
                      alt={item.title}
                    />
                  )}
                  <Card.Body>
                    <Card.Title>{item.attributes?.Title || item.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{formatDate(item.attributes?.publishedAt || item.date)}</Card.Subtitle>
                    <Card.Text className="card-text-truncated">
                      {getFirstLine(item.attributes?.content || item.content)}
                    </Card.Text>
                    <Button
                      variant="primary"
                      href={`/savoir-lab/wikiphedia/${encodeURIComponent(item.attributes?.Title || item.title)}`}
                    >
                      {t('sportifs.readMore')}
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
  
  export default Sportifs;