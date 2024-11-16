import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import './SingleNews.css'; // Import the CSS for single news page
import { newsItems as staticNewsItems } from './newsItems'; // Import static news items
import { newsItemsar as staticNewsItemsar } from './newsItemsar';
import backnavhead from "../../../Assets/back navhead.jpg";
import { useTranslation } from 'react-i18next';



const SingleNews = () => {
    const { newsTitle } = useParams(); // Get title from URL params
    const {t, i18n } = useTranslation(); // Access the i18n instance
    const decodedNewsTitle = decodeURIComponent(newsTitle); // Decode the title for comparison
    const [newsItem, setNewsItem] = useState(null); // State to store the news item
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = 'https://admin.fidni.tn';


    const formatDate = (dateString) => {
        if (!dateString) return 'Invalid Date';
    
        const [day, month, year] = dateString.split('/'); // Assuming date format JJ/MM/AAAA
    
        const frenchMonths = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
    
        const arabicMonths = [
            'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
        ];
    
        // Check the current language (either 'fr' for French or 'ar' for Arabic)
        if (i18n.language === 'ar') {
            // Arabic format: "24 جانفي 2024"
            return `${day} ${arabicMonths[parseInt(month, 10) - 1]} ${year}`;
        } else {
            // French format: "24 Janvier 2024"
            return `${day} ${frenchMonths[parseInt(month, 10) - 1]} ${year}`;
        }
    };
    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Fetch from the API
                const response = await fetch(`${BASE_URL}/api/actualites?populate=*`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
    
                // Search in the API data
                const apiNewsItem = data.data.find(
                    (item) =>
                        i18n.language === 'fr'
                            ? item.attributes.Title_french === decodedNewsTitle
                            : item.attributes.Title_arabic === decodedNewsTitle
                );
    
                if (apiNewsItem) {
                    const {
                        Title_french,
                        Title_arabic,
                        Content_french,
                        Content_arabic,
                        Date_JJ_MMMM_AA,
                        Image,
                    } = apiNewsItem.attributes;
    
                    const imageUrl = Image?.data?.attributes?.formats?.large?.url
                        ? `${BASE_URL}${Image.data.attributes.formats.large.url}`
                        : '';
    
                    setNewsItem({
                        title: i18n.language === 'fr' ? Title_french : Title_arabic,
                        date: formatDate(Date_JJ_MMMM_AA),
                        content: i18n.language === 'fr' ? Content_french : Content_arabic,
                        imageUrl: imageUrl,
                    });
                } else {
                    // If not found in API, search in static newsItems
                    const staticData = i18n.language === 'fr' ? staticNewsItems : staticNewsItemsar;
                    const staticNewsItem = staticData.find(item => item.title === decodedNewsTitle);
                    if (staticNewsItem) {
                        setNewsItem(staticNewsItem);
                    } else {
                        throw new Error("News not found");
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchNews();
    }, [decodedNewsTitle, i18n.language]);
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!newsItem) {
        return <div>News not found</div>;
    }

    return (
        <>
            <img className="backnavhead" src={backnavhead} aria-hidden="true" />
            <Container className="p-0 single-news-container mt-4">
                <Card className="mb-4">
                    <Card.Img variant="top" src={newsItem.imageUrl} className="single-news-image" />
                    <Card.Body>
                        <Card.Title className="single-news-title">{newsItem.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{newsItem.date}</Card.Subtitle>
                        <Card.Text className="single-news-content" dangerouslySetInnerHTML={{ __html: newsItem.content }} />
                        <Button variant="primary" href="/actualites-et-evenements/actualites">{t('news.getback')}</Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default SingleNews;
