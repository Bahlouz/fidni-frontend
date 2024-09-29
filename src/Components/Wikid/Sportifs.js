import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Sportifsitems } from './Sportifsitems'; // Import static data
import "./Wikid.css";
import "./Sportifs.css"; // Assuming you have a specific CSS file for Sportifs

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
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop(); // Extract current page from URL

    const [apiItems, setApiItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/post-blogs?populate=*');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
    
                // Filter items based on subcategory 'WikiPhédia' and the presence of <sportif> tag in description
                const filteredItems = data.data.filter(item => 
                    item.attributes?.subcategory?.data?.attributes?.name === 'WikiPhédia' &&
                    containsSportifTag(item.attributes?.Description || [])
                );
    
                // Map to include media files if available
                const itemsWithImages = filteredItems.map(item => {
                    const mediaFiles = item.attributes?.Mediafiles?.data || [];
                    return {
                        ...item,
                        attributes: {
                            ...item.attributes,
                            mediaFiles: mediaFiles.map(file => file.attributes?.url || ''), // Extract URLs safely
                            imageUrl: mediaFiles[0]?.attributes?.url ? `${mediaFiles[0].attributes.url}` : '' // Full URL for image
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
    const combinedItems = [...Sportifsitems, ...apiItems];

    // Sort combined items by publishedAt date to find the latest story
    const sortedItems = combinedItems.sort((a, b) => 
        new Date(b.attributes?.publishedAt || b.attributes?.publishedAt) - new Date(a.attributes?.publishedAt || b.attributes?.publishedAt)
    );

    // Latest story based on sorted items
    const latestStory = sortedItems[0] || {};

    // Updated links based on your provided categories
    const wikidlinks = [
        { title: 'Les acteurs sociaux et politiques', link: '/savoir-lab/wikiphedia/acteurs-sociaux-politiques', page: 'acteurs-sociaux-politiques' },
        { title: 'Les artistes', link: '/savoir-lab/wikiphedia/artistes', page: 'artistes' },
        { title: 'Les chercheurs', link: '/savoir-lab/wikiphedia/chercheurs', page: 'chercheurs' },
        { title: 'Les entrepreneurs', link: '/savoir-lab/wikiphedia/entrepreneurs', page: 'entrepreneurs' },
        { title: 'Les sportifs', link: '/savoir-lab/wikiphedia/sportifs', page: 'sportifs' }
    ];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <div className="background-image-sportifs">
                <div className="overlay-text-sportifs">
                    <h1 className="sportifs-titre">Les sportifs</h1>
                    <p className="p-5 sportifs-description">
                        Découvrez des profils détaillés de sportifs engagés, explorez leurs réalisations, parcours et contributions dans le monde du sport. Inspirez-vous de leurs efforts pour exceller dans leur domaine.
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
                        <h1 className="Sportifs-title">Histoires des sportifs</h1>
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
                                        src={`${latestStory.attributes.mediaFiles[0]}`} 
                                        alt={latestStory.attributes?.Title || latestStory.title}
                                        onError={() => console.error('Image not found:', latestStory.attributes?.mediaFiles[0])} // Error handling
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
                                    <Button variant="primary" href={`/savoir-lab/wikiphedia/${encodeTitleForURL(latestStory.attributes?.Title || latestStory.title)}`}>Lire plus</Button>
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
                                        src={`${item.attributes.mediaFiles[0]}`} 
                                        alt={item.attributes?.Title || item.title}
                                        onError={() => console.error('Image not found:', item.attributes?.mediaFiles[0])} // Error handling
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
                                    <Button variant="primary" href={`/savoir-lab/wikiphedia/${encodeTitleForURL(item.attributes?.Title || item.title)}`}>Lire plus</Button>
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
