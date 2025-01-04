import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import './SingleEvents.css'; // Import the CSS for single event page
import { eventsitems as staticEventsItems } from './eventsitems'; // Import static event items
import { eventsitemsar as staticEventsItemsar } from './eventsitemsar';
import backnavhead from "../../../Assets/back navhead.jpg";
import { useTranslation } from 'react-i18next';

const SingleEvents = () => {
    const { eventTitle } = useParams(); // Get title from URL params
    const { t, i18n } = useTranslation(); // Access the i18n instance
    const decodedEventTitle = decodeURIComponent(eventTitle); // Decode the title for comparison
    const [eventItem, setEventItem] = useState(null); // State to store the event item
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = 'http://localhost:1338'; // Replace with your API base URL

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
        const fetchEvent = async () => {
            try {
                // Fetch from the API
                const response = await fetch(`${BASE_URL}/api/evenements?populate=*`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Search in the API data
                const apiEventItem = data.data.find(
                    (item) =>
                        i18n.language === 'fr'
                            ? item.attributes.Title_french === decodedEventTitle
                            : item.attributes.Title_arabic === decodedEventTitle
                );

                if (apiEventItem) {
                    const {
                        Title_french,
                        Title_arabic,
                        Content_french,
                        Content_arabic,
                        Date_JJ_MMMM_AA,
                        Location_french,
                        Location_arabic,
                        Image,
                    } = apiEventItem.attributes;

                    const imageUrl = Image?.data?.attributes?.formats?.large?.url
                        ? `${BASE_URL}${Image.data.attributes.formats.large.url}`
                        : '';

                    setEventItem({
                        title: i18n.language === 'fr' ? Title_french : Title_arabic,
                        date: formatDate(Date_JJ_MMMM_AA),
                        content: i18n.language === 'fr' ? Content_french : Content_arabic,
                        location: i18n.language === 'fr' ? Location_french : Location_arabic,
                        imageUrl: imageUrl,
                    });
                } else {
                    // If not found in API, search in static eventItems
                    const staticData = i18n.language === 'fr' ? staticEventsItems : staticEventsItemsar;
                    const staticEventItem = staticData.find(item => item.title === decodedEventTitle);
                    if (staticEventItem) {
                        setEventItem(staticEventItem);
                    } else {
                        throw new Error("Event not found");
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [decodedEventTitle, i18n.language]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!eventItem) {
        return <div>Event not found</div>;
    }

    return (
        <>
            <img className="backnavhead" src={backnavhead} aria-hidden="true" />
            <Container className="p-0 single-event-container mt-4">
                <Card className="mb-4">
                    <Card.Img variant="top" src={eventItem.imageUrl} className="single-event-image" />
                    <Card.Body>
                        <Card.Title className="single-event-title">{eventItem.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{eventItem.date}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">{eventItem.location}</Card.Subtitle>
                        <Card.Text className="single-event-content" dangerouslySetInnerHTML={{ __html: eventItem.content }} />
                        <Button variant="primary" href="/actualites-et-evenements/evenements">{t('retour')}</Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default SingleEvents;
