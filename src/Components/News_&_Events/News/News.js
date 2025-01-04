import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button,Pagination  } from 'react-bootstrap';
import './News.css';
import { newsItems as staticNewsItems } from './newsItems';
import { newsItemsar } from './newsItemsar';
import { useTranslation } from 'react-i18next';
import Preloader from '../../Preloader';

const BASE_URL = 'https://admin.fidni.tn';
const tunisianArabicMonths = [
    'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان',
    'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const News = () => {
    const { t, i18n } = useTranslation();
    const [apiItems, setApiItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Number of items per page
  
    const staticItems = i18n.language === 'fr' ? staticNewsItems : newsItemsar;
    const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';

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
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/actualites?populate=*`);
                if (!response.ok) throw new Error('Network response was not ok');
                const { data } = await response.json();

                const transformedData = data.map((item) => {
                    const attributes = item.attributes || {};
                    const [day, month, year] = attributes.Date_JJ_MMMM_AA.split('/'); // Parse JJ/MM/AAAA
                    const dateObj = new Date(year, month - 1, day); // Create Date object

                    return {
                        id: item.id,
                        title: i18n.language === 'ar' ? attributes.Title_arabic : attributes.Title_french,
                        date: attributes.Date_JJ_MMMM_AA, // Valid Date object for sorting
                        formattedDate: attributes.Date_JJ_MMMM_AA, // Display date
                        content: i18n.language === 'ar' ? attributes.Content_arabic : attributes.Content_french,
                        imageUrl: attributes.Image?.data?.attributes?.formats?.large?.url
                            ? `${BASE_URL}${attributes.Image.data.attributes.formats.large.url}`
                            : ''
                    };
                });

                setApiItems(transformedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [i18n.language]);

    // Add date parsing to static data to ensure sorting works
    

    const combinedItems = [...staticItems, ...apiItems];
    const parsedItems = combinedItems.map((item) => {
        const [day, month, year] = item.formattedDate.split('/'); // Assuming the static date is in the same format
        const dateObj = new Date(year, month - 1, day); // Create Date object for static items
        return {
            ...item,
            date: dateObj,
        };
    });
    const sortedItems = parsedItems.sort((a, b) => b.date - a.date); // Sort by date
    const latestStory = sortedItems[0]; // Get the latest story
    const remainingItems = sortedItems.slice(1); // Remaining stories

    const totalPages = Math.ceil(remainingItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = remainingItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <Preloader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container fluid className="news-container" style={{ direction: textDirection }}>
      <Container fluid className="news-content">
        {/* Latest Story */}
        {latestStory && (
          <Row>
            <Col>
              <Card className="mb-4">
                <Card.Img className="top-news" variant="top" src={latestStory.imageUrl} />
                <Card.Body>
                  <Card.Title>{latestStory.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {formatDate(latestStory.formattedDate)}
                  </Card.Subtitle>
                  <Card.Text
                    className="news-content-desc"
                    dangerouslySetInnerHTML={{ __html: latestStory.content }}
                  />
                  <Button
                    variant="primary"
                    href={`/actualites-et-evenements/actualites/${encodeURIComponent(latestStory.title)}`}
                  >
                    {t('news.button')}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Paginated Items */}
        <Row>
          {paginatedItems.map((item) => (
            <Col md={4} key={item.id} className="mb-4">
              <Card className="h-100">
                <Card.Img className="img-news" variant="top" src={item.imageUrl} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {formatDate(item.formattedDate)}
                  </Card.Subtitle>
                  <Card.Text
                    className="news-content-desc"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
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

        {/* Pagination Controls */}
        <Row>
          <Col>
            <Pagination className="justify-content-center">
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default News;