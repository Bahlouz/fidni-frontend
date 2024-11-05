import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './News.css';
import { newsItems as staticNewsItems } from './newsItems';
import { newsItemsar as staticNewsItemsar } from './newsItemsar';
import { useTranslation } from 'react-i18next';
import Preloader from '../../Preloader';

// Mapping of month names to English
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
    décembre: 'December',
    جانفي: 'January',   // January in Arabic
    فيفري: 'February',   // February in Arabic
    مارس: 'March',       // March in Arabic
    أفريل: 'April',      // April in Arabic
    ماي: 'May',          // May in Arabic
    جوان: 'June',       // June in Arabic
    جويلية: 'July',     // July in Arabic
    أوت: 'August',       // August in Arabic
    سبتمبر: 'September', // September in Arabic
    أكتوبر: 'October',   // October in Arabic
    نوفمبر: 'November',  // November in Arabic
    ديسمبر: 'December'   // December in Arabic
};

const formatDate = (dateString) => {
    if (typeof dateString !== 'string' || !dateString) {
        return null; // Return null if input is not a valid string
    }

    const [day, month, year] = dateString.split(' ');
    if (!day || !month || !year) {
        return null; // Return null if any part is missing
    }

    const englishMonth = monthMapping[month.toLowerCase()];
    if (englishMonth) {
        const date = new Date(`${day} ${englishMonth} ${year}`);
        return isNaN(date.getTime()) ? null : date; // Ensure date is valid
    }

    return null; // Return null if month is not valid
};

const News = () => {
    const {t, i18n } = useTranslation(); // Access the i18n instance
    const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
    const [newsItems, setNewsItems] = useState([]);
    const [latestNews, setLatestNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = 'https://admin.fidni.tn';
    
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/post-blogs?populate=*`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Check if data and data.data are valid
                if (!data || !data.data) {
                    throw new Error('Invalid data structure');
                }

                // Filter based on subcategory "Actualités"
                const actualites = data.data.filter(post => {
                    if (post && post.attributes && post.attributes.subcategory && post.attributes.subcategory.data && post.attributes.subcategory.data.attributes) {
                        return post.attributes.subcategory.data.attributes.name === 'Actualités';
                    }
                    return false;
                });

                // Format the date and construct image URL
                const formattedNews = actualites.map(post => {
                    const { Title, Description, content, Mediafiles } = post.attributes || {};
                    const rawDate = Description?.[0]?.children?.[0]?.text;
        
                    const formattedDate = formatDate(rawDate); // Use the updated date format function
                    
                    // Construct image URL
                    const imageUrl = post.attributes.Mediafiles?.data?.[0]?.attributes?.formats?.large?.url
                        ? `${BASE_URL}${post.attributes.Mediafiles.data[0].attributes.formats.large.url}`
                        : '';

                    return {
                        id: post.id,
                        title: Title,
                        date: formattedDate,
                        content: content,
                        imageUrl: imageUrl,
                    };
                }).filter(news => news.date); // Filter out news items with invalid dates

                // Sort news by date in descending order
                formattedNews.sort((a, b) => b.date - a.date);

                // Set latest news and news items
                setLatestNews(formattedNews[0]);
                const staticData = i18n.language === 'fr' ? staticNewsItems : staticNewsItemsar; // Choose static items based on language
                setNewsItems(formattedNews.slice(1).concat(staticData.map(item => ({
                    ...item,
                    date: formatDate(item.date) // Format static dates
                }))).sort((a, b) => b.date - a.date)); // Sort static news items by date
                
            } catch (error) {
                console.error('Error fetching news:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [i18n.language]); // Include i18n.language in dependency array

    if (loading) return <p><Preloader /></p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container fluid className="news-container">
            <Container fluid className="news-content">
                <Row>
                    <Col>
                        <h1 className="news-title">{t('news.newstitle')}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="news-description">
                            {t('news.newsdesc')}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2 className="news-une">{t('news.topnews')}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {latestNews && (
                            <Card className="mb-4">
                                <Card.Img className='top-news' variant="top" src={latestNews.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{latestNews.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {latestNews.date instanceof Date ? 
                                            latestNews.date.toLocaleDateString(i18n.language === 'fr' ? 'fr' : 'ar', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            }) : 'Invalid Date'}
                                    </Card.Subtitle>
                                    <Card.Text className="news-content-desc" dangerouslySetInnerHTML={{ __html: latestNews.content }} />
                                    <Button
                                        variant="primary"
                                        href={`/actualites-et-evenements/actualites/${encodeURIComponent(latestNews.title)}`}
                                    >
                                        {t('news.button')}
                                    </Button>
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
                                            item.date.toLocaleDateString(i18n.language === 'fr' ? 'fr' : 'ar', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            }) : 'Invalid Date'}
                                    </Card.Subtitle>
                                    <Card.Text className="news-content-desc" dangerouslySetInnerHTML={{ __html: item.content }} />
                                    <Button
                                        variant="primary"
                                        href={`/actualites-et-evenements/actualites/${encodeURIComponent(item.title)}`}
                                    >
                                        {t('news.button')}
                                    </Button>
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
