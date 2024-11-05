import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Artistesitems } from './Artistesitems'; // Import static data
import { Artistesitemsar } from './Artistesitemsar'; // Import static data
import './Wikid.css';
import './Artistes.css';

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

// Function to check if the description contains the <artiste> tag
const containsArtisteTag = (description) => {
    return description.some(paragraph => 
        paragraph.children.some(child => child.text === '<artiste>')
    );
};

// Function to encode the title for URL
const encodeTitleForURL = (title) => {
    return encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'));
};



const Artistes = () => {
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const currentPath = location.pathname.split('/').pop(); // Extract current page from URL

    const [apiItems, setApiItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = 'https://admin.fidni.tn';
    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/post-blogs?populate=*`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
    
                // Filter items based on subcategory 'WikiPhédia' and the presence of <artiste> tag in description
                const filteredItems = data.data.filter(item => 
                    item.attributes?.subcategory?.data?.attributes?.name === 'WikiPhédia' &&
                    containsArtisteTag(item.attributes?.Description || [])
                );
    
                // Map to include media files if available
                const itemsWithImages = filteredItems.map(item => {
                    const mediaFiles = item.attributes?.Mediafiles?.data || [];
                    return {
                        ...item,
                        attributes: {
                            ...item.attributes,
                            mediaFiles: mediaFiles.map(file => file.attributes?.url || ''), // Extract URLs safely
                            imageUrl: mediaFiles[0]?.attributes?.url ? `${BASE_URL}${mediaFiles[0].attributes.url}` : '' // Full URL for image
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
    
    // Combine static and API data
    const staticItems = i18n.language === 'fr' ? Artistesitems : Artistesitemsar;
    const combinedItems = [...staticItems, ...apiItems];
    // Sort combined items by publishedAt date to find the latest story
    const sortedItems = combinedItems.sort((a, b) => 
        new Date(b.attributes?.publishedAt || b.attributes?.publishedAt) - new Date(a.attributes?.publishedAt || a.attributes?.publishedAt)
    );

    // Latest story based on sorted items
    const latestStory = sortedItems[0] || {};

    // Updated links based on your provided categories
    const wikidlinks = [
        { title: t('wiki.actorSocialAndPolitical'), link: '/savoir-lab/wikiphedia/acteurs-sociaux-politiques', page: 'acteurs-sociaux-politiques' },
        { title: t('wiki.artists'), link: '/savoir-lab/wikiphedia/artistes', page: 'artistes' },
        { title: t('wiki.researchers'), link: '/savoir-lab/wikiphedia/chercheurs', page: 'chercheurs' },
        { title: t('wiki.entrepreneurs'), link: '/savoir-lab/wikiphedia/entrepreneurs', page: 'entrepreneurs' },
        { title: t('wiki.athletes'), link: '/savoir-lab/wikiphedia/sportifs', page: 'sportifs' }
    ];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <div className="background-image-artistes">
                <div className="overlay-text-artistes">
                    <h1 className="artistes-titre">{t('artistes.title')}</h1>
                    <p className="p-5 artistes-description">
                        {t('artistes.description')}
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
                        <h1 className="Artistes-title">{t('artistes.latest_story')}</h1>
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
                                    />
                                )}
                                {/* Handle image rendering for static data */}
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
                                    <Card.Subtitle className="mb-2 text-muted">{formatDate(latestStory.attributes?.publishedAt)}</Card.Subtitle>
                                    <Card.Text className="card-text-truncatedd">
                                        {getFirstLine(latestStory.attributes?.content || latestStory.content)}
                                    </Card.Text>
                                    <Button 
                                        variant="primary" 
                                        href={`/savoir-lab/wikiphedia/${encodeURIComponent(latestStory.attributes?.Title || latestStory.title)}`}
                                    >
                                        {t('artistes.read_more')}
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
                                        variant="top" 
                                        className="wikid-card-image" 
                                        src={`${BASE_URL}${item.attributes.mediaFiles[0]}`} 
                                        alt={item.attributes?.Title || item.title}
                                    />
                                )}
                                {/* Handle image rendering for static data */}
                                {!item.attributes?.mediaFiles?.[0] && item.imageUrl && (
                                    <Card.Img 
                                        variant="top" 
                                        className="wikid-card-image" 
                                        src={item.imageUrl} 
                                        alt={item.title}
                                    />
                                )}
                                <Card.Body>
                                    <Card.Title>{item.attributes?.Title || item.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{formatDate(item.attributes?.publishedAt)}</Card.Subtitle>
                                    <Card.Text className="card-text-truncatedd">
                                        {getFirstLine(item.attributes?.content || item.content)}
                                    </Card.Text>
                                    <Button 
                                        variant="primary" 
                                        href={`/savoir-lab/wikiphedia/${encodeURIComponent(item.attributes?.Title || item.title)}`}
                                    >
                                        {t('artistes.read_more')}
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

export default Artistes;