import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import './SingleEvents.css'; // Import the CSS for single news page
import { staticEvents as eventsData } from './Events.js'; // Import your events data
import backnavhead from "../../../Assets/back navhead.jpg";

// Adjust the base URL as needed

const SingleEvents = () => {
    const { eventTitle } = useParams(); // Assume URL contains event title
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                // Fetch event from API
                const response = await fetch(`/api/post-blogs?filters[Title][$eq]=${eventTitle}&populate=*`);
                const data = await response.json();

                if (data.data.length > 0) {
                    const apiEvent = data.data[0].attributes;
                    const eventData = {
                        id: data.data[0].id,
                        title: apiEvent.Title || 'No Title',
                        date: extractDate(apiEvent.Description) || 'Unknown Date',
                        location: extractLocation(apiEvent.Description) || 'Unknown Location',
                        description: apiEvent.content || 'No Content',
                        imageUrl: apiEvent.Mediafiles?.data?.[0]?.attributes?.formats?.large?.url
                            ? `${apiEvent.Mediafiles.data[0].attributes.formats.large.url}`
                            : '',
                        subcategory: apiEvent.subcategory?.data?.attributes?.name || 'Unknown'
                    };
                    setEvent(eventData);
                } else {
                    // Fallback to static data if API data is not available
                    const staticEvent = eventsData.find(item => item.title.toLowerCase() === eventTitle.toLowerCase());
                    if (staticEvent) {
                        setEvent(staticEvent);
                    } else {
                        setError('Event not found');
                    }
                }
            } catch (error) {
                console.error("Error fetching event data from API:", error);
                setError('An error occurred while fetching event details.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventTitle]);

    const extractDate = (description) => {
        if (description) {
            for (const paragraph of description) {
                for (const child of paragraph.children) {
                    const text = child.text || '';
                    const match = text.match(/<date>(.*?)<\/date>/);
                    if (match) {
                        return match[1];
                    }
                }
            }
        }
        return 'Unknown Date';
    };

    const extractLocation = (description) => {
        if (description) {
            for (const paragraph of description) {
                for (const child of paragraph.children) {
                    const text = child.text || '';
                    const match = text.match(/<location>(.*?)<\/location>/);
                    if (match) {
                        return match[1];
                    }
                }
            }
        }
        return 'Unknown Location';
    };

    if (loading) {
        return <div>Loading...</div>; // Handle loading state
    }

    if (error) {
        return <div>{error}</div>; // Handle error state
    }

    if (!event) {
        return <div>Event not found</div>; // Handle if event is not found
    }

    return (
        <>
            <img className="backnavhead" src={backnavhead} alt="Background" aria-hidden="true" />
            <Container className="p-0 single-news-container mt-4">
                <Card className="mb-4">
                    <Card.Img variant="top" src={event.imageUrl} className="single-news-image" />
                    <Card.Body>
                        <Card.Title className="single-news-title">{event.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{event.date}</Card.Subtitle>
                        <Card.Text 
                            className="single-news-content" 
                            dangerouslySetInnerHTML={{ __html: event.description }} // Render HTML safely
                        />
                        <Button variant="primary" href="/actualites-et-evenements/evenements">Retour aux nouvelles</Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default SingleEvents;
