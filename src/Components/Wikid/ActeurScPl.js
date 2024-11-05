import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // Import useTranslation for language support
import { ActeurScPlitems } from './ActeurScPlitems'; 
import { ActeurScPlitemsar } from './ActeurScPlitemsar'; 
import "./Wikid.css";
import "./ActeurScPl.css";

// Function to extract the first line of HTML content
const getFirstLine = (htmlContent) => {
    const tempDiv = document.createElement('ActeurSc.div');
    tempDiv.innerHTML = htmlContent;
    const firstLine = tempDiv.textContent.split('ActeurSc.\n')[0];
    return firstLine;
};

// Function to format date
const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
};

// Function to check if the description contains the <acteurscpl> tag
const containsActeursCplTag = (description) => {
    return description.some(paragraph => 
        paragraph.children.some(child => child.text === '<acteurscpl>')
    );
};

// Function to encode the title for URL
const encodeTitleForURL = (title) => {
    return encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'));
};

const ActeurScPl = () => {
    const { t, i18n } = useTranslation(); // Use i18n for language handling
    const location = useLocation();
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
    
                const filteredItems = data.data.filter(item => 
                    item.attributes?.subcategory?.data?.attributes?.name === 'WikiPhédia' &&
                    containsActeursCplTag(item.attributes?.Description || [])
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

    // Determine static items based on the current language
    const staticItems = i18n.language === 'fr' ? ActeurScPlitems : ActeurScPlitemsar;

    // Combine static and API data
    const combinedItems = [...staticItems, ...apiItems];

    // Sort combined items by publishedAt date to find the latest story
    const sortedItems = combinedItems.sort((a, b) => 
        new Date(b.attributes?.publishedAt || b.attributes?.publishedAt) - new Date(a.attributes?.publishedAt || a.attributes?.publishedAt)
    );

    const latestStory = sortedItems[0] || {};

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
            <div className="background-image-acteursc">
                <div className="overlay-text-acteursc">
                    <h1 className="acteursc-titre">{t('ActeurSc.Les acteurs sociaux et politiques')}</h1>
                    <p className="p-5 acteursc-description">
                        {t('ActeurSc.Découvrez des profils détaillés d\'acteurs sociaux et politiques engagés, explorez leurs réalisations, parcours et contributions dans le domaine de l\'activisme et des politiques publiques. Inspirez-vous de leurs efforts pour faire progresser la société.')}
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
                        <h1 className="ActeurScPl-title">{t('ActeurSc.Histoires des acteurs sociaux et politiques')}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* Display the latest story */}
                        {latestStory.id && (
                            <Card className="mb-4 custom-card">
                                {/* Handle image rendering for dynamic images */}
                                {latestStory.attributes?.mediaFiles?.[0] && (
                                    <Card.Img 
                                        className="latest-wikid" 
                                        variant="top" 
                                        src={`${BASE_URL}${latestStory.attributes.mediaFiles[0]}`} 
                                        alt={latestStory.attributes?.Title || latestStory.title}
                                        onError={() => console.error('Image not found:', latestStory.attributes?.mediaFiles[0])}
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
                                    <Card.Subtitle className="mb-2 text-muted">{formatDate(latestStory.attributes?.publishedAt || latestStory.date)}</Card.Subtitle>
                                    <Card.Text className="card-text-truncatedd">
                                        {getFirstLine(latestStory.attributes?.content || latestStory.content)}
                                    </Card.Text>
                                    <Button 
                                        variant="primary" 
                                        href={`/savoir-lab/wikiphedia/${encodeURIComponent(latestStory.attributes?.Title || latestStory.title)}`}
                                    >
                                        {t('ActeurSc.Lire plus')}
                                    </Button>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
                <Row>
                    {/* Display remaining stories */}
                    {sortedItems.slice(1).map(item => (
                        <Col key={item.id} md={4} className="mb-4">
                            <Card className="custom-card h-100">
                                {/* Handle image rendering for dynamic images */}
                                {item.attributes?.mediaFiles?.[0] && (
                                    <Card.Img 
                                        variant="top" 
                                        className="wikid-card-image" 
                                        src={`${BASE_URL}${item.attributes.mediaFiles[0]}`} 
                                        alt={item.attributes?.Title || item.title}
                                        onError={() => console.error('Image not found:', item.attributes?.mediaFiles[0])}
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
                                    <Card.Subtitle className="mb-2 text-muted">{formatDate(item.attributes?.publishedAt || item.date)}</Card.Subtitle>
                                    <Card.Text className="card-text-truncatedd">
                                        {getFirstLine(item.attributes?.content || item.content)}
                                    </Card.Text>
                                    <Button 
                                        variant="primary" 
                                        href={`/savoir-lab/wikiphedia/${encodeURIComponent(item.attributes?.Title || item.title)}`}
                                    >
                                        {t('ActeurSc.Lire plus')}
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

export default ActeurScPl;
