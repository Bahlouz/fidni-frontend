import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Events.css'; // Import the CSS file for styling
import backnavhead from "../../../Assets/back navhead.jpg";
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { eventsitems as staticEvents } from './eventsitems';
import { eventsitemsar as staticEventsar } from './eventsitemsar';

// Month mapping
const monthMap = {
  janvier: 'January', février: 'February', mars: 'March', avril: 'April', mai: 'May',
  juin: 'June', juillet: 'July', août: 'August', septembre: 'September', octobre: 'October',
  novembre: 'November', décembre: 'December',
  جانفي: 'January', فيفري: 'February', مارس: 'March', أفريل: 'April', ماي: 'May',
  جوان: 'June', جويلية: 'July', أوت: 'August', سبتمبر: 'September', أكتوبر: 'October',
  نوفمبر: 'November', ديسمبر: 'December'
};

// Parse date function
const parseDate = (dateString) => {
  try {
    const normalizedDateString = dateString.trim().replace(/\s+/g, ' ');
    const [day, month, year] = normalizedDateString.split(' ');

    // Use monthMap for both Arabic and French months
    const englishMonth = monthMap[month.trim()];
    if (!englishMonth) throw new Error(`Invalid month: ${month}`);

    const date = new Date(`${englishMonth} ${day}, ${year}`);
    return isNaN(date.getTime()) ? null : date;
  } catch (error) {
    console.error("Error parsing date:", dateString, error);
    return null; // Return null for invalid dates
  }
};


// Function to format the date in the desired language
const formatDateLocalized = (date, language) => {
  if (!date || isNaN(date.getTime())) {
    console.warn("Date is invalid or null:", date);
    return 'Invalid Date';
  }

  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat(language === 'ar' ? 'ar-TN' : 'fr-FR', options).format(date);
};


// Function to sort events by date in ascending order
const sortEventsByDate = (events) => {
  return events.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const BASE_URL = 'https://admin.fidni.tn';
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleLanguageChange = () => {
      window.location.reload();
    };

    i18n.on('languageChanged', handleLanguageChange);

    // Cleanup on component unmount
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/post-blogs?populate=*`);
        const data = await response.json();

        const apiEvents = data.data.map((item) => {
          const { Title, Description, content, Mediafiles, subcategory } = item.attributes;

          let date = null;
          let location = 'Unknown Location';

          if (Description) {
            Description.forEach(paragraph => {
              const text = paragraph?.children?.map(child => child.text).join('') || '';
              const dateMatch = text.match(/<date>(.*?)<\/date>/);
              const locationMatch = text.match(/<location>(.*?)<\/location>/);

              if (dateMatch) date = parseDate(dateMatch[1]);
              if (locationMatch) location = locationMatch[1];
            });
          }

          const imageUrl = Mediafiles?.data?.[0]?.attributes?.formats?.large?.url
            ? `${BASE_URL}${Mediafiles.data[0].attributes.formats.large.url}`
            : '';

          return {
            id: item.id,
            title: Title || 'No Title',
            date,
            location,
            content: content || 'No Content',
            imageUrl,
            subcategory: subcategory?.data?.attributes?.name || 'Unknown'
          };
        }).filter((item) => item.date && item.subcategory === "Événements");

        const staticData = i18n.language === 'fr' ? staticEvents : staticEventsar;
        const allEvents = [...staticData, ...apiEvents];

        setEvents(sortEventsByDate(allEvents));
      } catch (error) {
        console.error("Error fetching events data from API:", error);
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
              <Link to={`/actualites-et-evenements/evenements/${event.title}`} className="text-decoration-none">
                <div className="custom-card h-100" style={{ position: 'relative' }}>
                  <div className="custom-bottom-right">
                    {formatDateLocalized(new Date(event.date), i18n.language)}
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
                          <span className="custom-thumbnail-date-day">{new Date(event.date)?.getDate() || 'N/A'}</span>
                          <span className="custom-thumbnail-date-month">{new Date(event.date)?.toLocaleString('default', { month: 'short' }) || 'N/A'}</span>
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
