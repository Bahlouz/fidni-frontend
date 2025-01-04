import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Events.css'; // Import the CSS file for styling
import backnavhead from "../../../Assets/back navhead.jpg";
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { eventsitems as staticEvents } from './eventsitems';
import { eventsitemsar as staticEventsar } from './eventsitemsar';

// Function to format dates based on language


const Events = () => {
    const [events, setEvents] = useState([]);
    const BASE_URL = 'http://localhost:1338';
    const { t, i18n } = useTranslation();

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
        const handleLanguageChange = () => {
            window.location.reload();
        };

        i18n.on('languageChanged', handleLanguageChange);

        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [i18n]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/evenements?populate=*`);
                const data = await response.json();

                const apiEvents = data.data.map((item) => {
                    const {
                        Title_french,
                        Title_arabic,
                        Date_JJ_MMMM_AA,
                        Location_French,
                        Location_arabic,
                        Content_french,
                        Content_arabic,
                        Image,
                    } = item.attributes;

                    const imageUrl = Image?.data?.attributes?.formats?.large?.url
                        ? `${BASE_URL}${Image.data.attributes.formats.large.url}`
                        : '';

                    return {
                        id: item.id,
                        title: i18n.language === 'ar' ? Title_arabic : Title_french,
                        date: Date_JJ_MMMM_AA,
                        location: i18n.language === 'ar' ? Location_arabic : Location_French,
                        content: i18n.language === 'ar' ? Content_arabic : Content_french,
                        imageUrl,
                    };
                });

                const staticData = i18n.language === 'fr' ? staticEvents : staticEventsar;
                const allEvents = [...staticData, ...apiEvents];

                const parsedItems = allEvents.map((item) => {
                    let formattedDate = item.date;

                    if (formattedDate && formattedDate.includes('/')) {
                        const [day, month, year] = formattedDate.split('/');
                        const dateObj = new Date(year, month - 1, day); // Adjust month index (0-based)
                        const isValidDate = !isNaN(dateObj.getTime()); // Check if date is valid

                        return {
                            ...item,
                            date: isValidDate ? dateObj : new Date(),
                            formattedDate: isValidDate ? formattedDate : 'Invalid Date',
                        };
                    } else {
                        return {
                            ...item,
                            date: new Date(),
                            formattedDate: 'Invalid Date',
                        };
                    }
                });

                const events = parsedItems.sort((a, b) => b.date - a.date);
                setEvents(events);
            } catch (error) {
                console.error('Error fetching events data from API:', error);
            }
        };

        fetchEvents();
    }, [i18n.language]);

    return (
        <>
            <Row>
                <img className="backnavhead" src={backnavhead} aria-hidden="true" alt="Background" />
            </Row>
            <Container className="py-5">
                <h1 className="events-title">{t('events.eventstitle')}</h1>
                <p>{t('events.eventsdescription')}</p>
                <Row className="row-cols-1 row-cols-md-3 g-4">
                    {events.map(event => (
                        <Col key={event.id}>
                            <Link to={`/actualites-et-evenements/evenements/${encodeURIComponent(event.title)}`} className="text-decoration-none">
                                <div className="custom-card h-100" style={{ position: 'relative' }}>
                                    <div className="custom-bottom-right">
                                        {formatDate(event.formattedDate)}
                                    </div>
                                    <div className="custom-top-right">
                                        <div className="custom-tags-list mb-2">
                                            <span className="custom-tags-list-town text-uppercase">{event.location.split(',')[0]}</span>
                                        </div>
                                    </div>
                                    <div className="custom-image-container">
                                        <div className="custom-bottom-left">
                                            <div className="custom-thumbnail" style={{ backgroundColor: '#ffa5009e' }}>
                                                <div className="custom-thumbnail-date">
                                                    <span className="custom-thumbnail-date-day">{formatDate(event.formattedDate, i18n.language).split(' ')[0]}</span>
                                                    <span className="custom-thumbnail-date-month">{formatDate(event.formattedDate, i18n.language).split(' ')[1]}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <img
                                            src={event.imageUrl}
                                            className="custom-card-img-top"
                                            alt={event.title}
                                        />
                                        <div className="custom-image-overlay custom-text-over text-center d-flex justify-content-center align-items-center text-uppercase">
                                            <div>{event.title}</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default Events;
