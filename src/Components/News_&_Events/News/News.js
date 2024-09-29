import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './News.css';
import { newsItems as staticNewsItems } from './newsItems';

// Mapping of French month names to English
const monthMapping = {
    janvier: 'January',
    février: 'February',
    mars: 'March',
    avril: 'April',
    mai: 'May',
    juin: 'June',
    juillet: 'July',
    août: 'August',
    septembre: 'September',
    octobre: 'October',
    novembre: 'November',
    décembre: 'December'
};



const formatFrenchDate = (frenchDate) => {
    if (!frenchDate) return new Date(); // Return current date if date is not provided

    const [day, month, year] = frenchDate.split(' ');
    if (!day || !month || !year) return new Date(); // Return current date if any part of the date is missing

    const englishMonth = monthMapping[month.toLowerCase()];
    if (englishMonth) {
        const date = new Date(`${day} ${englishMonth} ${year}`);
        return isNaN(date.getTime()) ? new Date() : date; // Ensure date is valid
    }
    return new Date(); // Return current date if month is not valid
};

const News = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [latestNews, setLatestNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/post-blogs?populate=*');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched data:', data); // Log the fetched data

                // Check if data and data.data are valid
                if (!data || !data.data) {
                    throw new Error('Invalid data structure');
                }

                // Filter based on subcategory "Actualités"
                const actualites = data.data.filter(item => {
                    // Ensure item and item.attributes are valid
                    if (item && item.attributes && item.attributes.subcategory && item.attributes.subcategory.data && item.attributes.subcategory.data.attributes) {
                        return item.attributes.subcategory.data.attributes.name === 'Actualités';
                    }
                    return false;
                });

                // Format the date and construct image URL
                const formattedNews = actualites.map(item => {
                    const { Title, Description, content, Mediafiles } = item.attributes || {};
                    const date = Description?.[1]?.children?.[0]?.text || ''; // Ensure Description is not undefined and access safely
                    const formattedDate = formatFrenchDate(date);

                    // Construct image URL
                    const imageUrl = Mediafiles?.data?.[0]?.attributes?.formats?.large?.url
                        ? `${Mediafiles.data[0].attributes.formats.large.url}`
                        : '';

                    return {
                        id: item.id,
                        title: Title,
                        date: formattedDate,
                        content: content,
                        imageUrl: imageUrl,
                    };
                });

                // Sort news by date in descending order
                formattedNews.sort((a, b) => b.date - a.date);

                // Set latest news and news items
                setLatestNews(formattedNews[0]);
                setNewsItems(formattedNews.slice(1).concat(staticNewsItems.map(item => ({
                    ...item,
                    date: formatFrenchDate(item.date) // Format static dates
                }))).sort((a, b) => b.date - a.date)); // Sort static news items by date
                
            } catch (error) {
                console.error('Error fetching news:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container fluid className="news-container">
            <Container fluid className="news-content">
                <Row>
                    <Col>
                        <h1 className="news-title">Actualités</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="news-description">
                            Explorez les dernières mises à jour sur l'intégration et l'accessibilité des personnes handicapées en Tunisie. Tenez-vous informé des récentes politiques, actions du gouvernement, événements à venir, initiatives locales, et histoires motivantes. Découvrez des outils pratiques et des conseils pour accéder aux différents soutiens disponibles.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2 className="news-une">A La Une</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {latestNews && (
                            <Card className="mb-4">
                                <Card.Img variant="top" src={latestNews.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{latestNews.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {latestNews.date instanceof Date ? 
                                            latestNews.date.toLocaleDateString('fr-FR', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            }) : 'Invalid Date'}
                                    </Card.Subtitle>
                                    <Card.Text className="news-content-desc" dangerouslySetInnerHTML={{ __html: latestNews.content }} />
                                    <Button variant="primary" href={`/actualites-et-evenements/actualites/${latestNews.title}`}>Lire plus</Button>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
                <Row>
                    {newsItems.map(item => (
                        <Col md={4} key={item.id} className="mb-4">
                            <Card className="h-100">
                                <Card.Img className='img-news' variant="top" src={item.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {item.date instanceof Date ? 
                                            item.date.toLocaleDateString('fr-FR', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            }) : 'Invalid Date'}
                                    </Card.Subtitle>
                                    <Card.Text className="news-content-desc" dangerouslySetInnerHTML={{ __html: item.content }} />
                                    <Button variant="primary" href={`/actualites-et-evenements/actualites/${item.title}`}>Lire plus</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
};

export default News;
