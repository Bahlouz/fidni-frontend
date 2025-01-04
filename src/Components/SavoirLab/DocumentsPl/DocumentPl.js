import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './DocumentPl.css';

export const pdfList = [
    {
        title: 'document_pl.pdf_list.title1',
        description: "document_pl.pdf_list.description1",
        link: `${process.env.PUBLIC_URL}/pdfs/Etude Sur Les Droits Politiques Et Culturels Des Personnes Handicapées En Tunisie.pdf`,
        imageUrl: `${process.env.PUBLIC_URL}/pdfs/etude2.png` 
    },
    {
        title: 'document_pl.pdf_list.title2',
        description: "document_pl.pdf_list.description2",
        link: `${process.env.PUBLIC_URL}/pdfs/Guide de formation sur l’Education Complète a la sexualité pour des personnes en situation de handicap.pdf`,
        imageUrl: `${process.env.PUBLIC_URL}/pdfs/guide.png` 
    },
    {
        title: 'document_pl.pdf_list.title3',
        description: "document_pl.pdf_list.description3",
        link: `${process.env.PUBLIC_URL}/pdfs/ETUDE SUR L’ACCESSIBILITE AUX STRUCTURES DE PRISE EN CHARGE DES VIOLENCES BASEES SUR LE GENRE POUR.pdf`,
        imageUrl: `${process.env.PUBLIC_URL}/pdfs/etude1.png`
    },
];

const DocumentPl = () => {
    const { t, i18n } = useTranslation();
    const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(true);

    const BASE_URL = 'http://localhost:1338';

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
        const fetchData = () => {
            fetch(`${BASE_URL}/api/documents-de-plaidoyers?populate=*`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const fetchedDoc = data.data.map(post => ({
                        title: i18n.language === 'fr' ? post.attributes.Title_french : post.attributes.Title_arabic,
                        description: i18n.language === 'fr' ? post.attributes.Description_french : post.attributes.Description_arabic,
                        link: post.attributes.Preview_image_and_file?.data?.find(file => file.attributes.mime === "application/pdf")
                        ? `${BASE_URL}${post.attributes.Preview_image_and_file.data.find(file => file.attributes.mime === "application/pdf").attributes.url}`
                        : '',
                        imageUrl: post.attributes.Preview_image_and_file?.data?.[1]?.attributes?.formats?.large?.url 
                            ? `${BASE_URL}${post.attributes.Preview_image_and_file.data[1].attributes.formats.large.url}` 
                            : ''   
                    }));

                    const combinedData = [
                        ...pdfList.map(card => ({
                            title: t(card.title),
                            description: t(card.description),
                            link: card.link,
                            imageUrl: card.imageUrl
                        })),
                        ...fetchedDoc
                    ];

                    setFetchedData(combinedData);
                    setLoading(false);
                })
                .catch(error => console.error('Error fetching data:', error));
        };

        fetchData();
    }, [i18n.language, t]);

    const handlePdfOpen = (pdfLink) => {
        window.open(pdfLink, '_blank');
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <div className="background-image-DocumentPl"></div>
            <Container fluid className="DocumentPl-container">
                <div className="p-5 overlay-text-DocumentPl" style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
                    <h1 className="DocumentPl-titre">{t('document_pl.title')}</h1>
                    <p className="DocumentPl-description">
                        {t('document_pl.description')}
                    </p>
                </div>
                <Row className="pdf-list">
                    {fetchedData.map((pdf, index) => (
                        <Col key={index} xs={12} className="mb-4">
                            <Card className="card-plaidoyer">
                                <Card.Body className="d-flex align-items-start">
                                    {pdf.imageUrl && (
                                        <img src={pdf.imageUrl} alt={pdf.title} className="pdf-image me-3" />
                                    )}
                                    <div>
                                        <Card.Title>{pdf.title}</Card.Title>
                                        <Card.Text className="DocumentPl-description">{pdf.description}</Card.Text>
                                        <Card.Link
                                            href="#"
                                            onClick={() => handlePdfOpen(pdf.link)}
                                            rel="noopener noreferrer"
                                        >
                                            {t('document_pl.voirpdf')}
                                        </Card.Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default DocumentPl;
