import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import "./Wikid.css";
import "./Entrepreneurs.css";
import { Entrepreneursitems } from './Entrepreneursitems';
import { Entrepreneursitemsar } from './Entrepreneursitemsar'; 

const getFirstLine = (htmlContent) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const firstLine = tempDiv.textContent.split('\n')[0];
    return firstLine;
};

const tunisianArabicMonths = [
    'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 
    'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const Entrepreneurs = () => {
    const { t, i18n } = useTranslation(); // Use i18n for language handling
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop(); // Extract current page from URL

    const [apiItems, setApiItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = 'https://admin.fidni.tn';
    
    const formatDate = (dateString) => {
        const options = { day: '2-digit', year: '2-digit' };
        const date = new Date(dateString);
        const day = date.toLocaleDateString('fr-FR', { day: '2-digit' });
        const year = date.toLocaleDateString('fr-FR', { year: '2-digit' });
        const monthIndex = date.getMonth();
        
        return i18n.language === 'ar'
            ? `${day} ${tunisianArabicMonths[monthIndex]} ${year}`
            : date.toLocaleDateString('fr-FR', { ...options, month: 'long' });
    };

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
    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/wikiphedias?populate=*`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                const filteredApiData = data.data
                    ?.filter(post => post.attributes?.Choose === 'Les entrepreneurs')
                    .map(post => {
                        const attributes = post.attributes || {};

                        const title = i18n.language === 'ar' ? attributes.Title_arabic : attributes.Title_french;
                        const description = i18n.language === 'ar' ? attributes.Description_arabic : attributes.Description_french;
                        const content = i18n.language === 'ar' ? attributes.Content_arabic : attributes.Content_french;
                        const imageUrl = attributes.Image?.data?.attributes?.formats?.large?.url 
                        ? `${BASE_URL}${attributes.Image.data.attributes.formats.large.url}` 
                        : ``;

                    return { ...post, title, description, content, imageUrl };
                });
               
    
                setApiItems(filteredApiData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [t,i18n.language]);

    // Determine static items based on the current language
    const staticItems = i18n.language === 'fr' ? Entrepreneursitems : Entrepreneursitemsar;

    // Combine static and API data
    const combinedItems = [...staticItems, ...apiItems];

    
const sortedItems = combinedItems.sort((a, b) =>
    new Date(a.attributes?.publishedAt || a.date) - new Date(b.attributes?.publishedAt || b.date)
  );
  
  // Get the latest story as the last item in the sorted array
  const latestStory = sortedItems[sortedItems.length - 1] || {};
  
  // Filter out the latest story from the list of items to display in the rest of the section
  const remainingItems = sortedItems.filter(item => item.id !== latestStory.id);

    const wikidlinks = [
        { title: t('wiki.actorSocialAndPolitical'), link: '/savoir-lab/wikiphedia/acteurs-sociaux-politiques', page: 'acteurs-sociaux-politiques' },
        { title: t('wiki.artists'), link: '/savoir-lab/wikiphedia/artistes', page: 'artistes' },
        { title: t('wiki.researchers'), link: '/savoir-lab/wikiphedia/chercheurs', page: 'chercheurs' },
        { title: t('wiki.entrepreneurs'), link: '/savoir-lab/wikiphedia/entrepreneurs', page: 'entrepreneurs' },
        { title: t('wiki.athletes'), link: '/savoir-lab/wikiphedia/sportifs', page: 'sportifs' }
    ];

    if (loading) return <p>{t('ActeurSc.Loading...')}</p>;
    if (error) return <p>{t('ActeurSc.Error:')} {error.message}</p>;


    return (
        <>
            <div className="background-image-entrepreneurs">
                <div className="overlay-text-entrepreneurs">
                    <h1 className="entrepreneurs-titre">{t('entrepreneurs.title')}</h1>
                    <p className="p-5 entrepreneurs-description">
                        {t('entrepreneurs.description')}
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
                        <h1 className="Entrepreneurs-title">{t('entrepreneurs.historyTitle')}</h1>
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
  {remainingItems.map(item => (
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

export default Entrepreneurs;
