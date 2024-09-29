import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import './SingleNews.css'; // Import the CSS for single news page
import { newsItems as staticNewsItems } from './newsItems'; // Import static news items
import backnavhead from "../../../Assets/back navhead.jpg";



const SingleNews = () => {
    const { newsTitle } = useParams(); // Get title from URL params
    const [newsItem, setNewsItem] = useState(null); // State to store the news item
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Fetch from the API
                const response = await fetch(`/api/post-blogs?populate=*`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Search in the API data
                const apiNewsItem = data.data.find(
                    (item) => item.attributes.Title === newsTitle
                );

                if (apiNewsItem) {
                    const { Title, content, Mediafiles, Description } = apiNewsItem.attributes;
                    const date = Description?.[1]?.children?.[0]?.text; // Assume date is in Description field
                    const imageUrl = Mediafiles?.data?.[0]?.attributes?.formats?.large?.url
                        ? `${Mediafiles.data[0].attributes.formats.large.url}`
                        : '';
                    setNewsItem({
                        title: Title,
                        date: date,
                        content: content,
                        imageUrl: imageUrl
                    });
                } else {
                    // If not found in API, search in static newsItems
                    const staticNewsItem = staticNewsItems.find(item => item.title === newsTitle);
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
    }, [newsTitle]);

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
                        <Button variant="primary" href="/actualites-et-evenements/actualites">Retour aux nouvelles</Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default SingleNews;
