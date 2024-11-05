import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import "./Wikid.css";
import WikidiPreview from './WikidiPreview';

const Wikidi = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('wiki./').pop();
    const { t } = useTranslation(); // Use the translation hook

    const wikidlinks = [
        { title: t('wiki.actorSocialAndPolitical'), link: '/savoir-lab/wikiphedia/acteurs-sociaux-politiques', page: 'acteurs-sociaux-politiques' },
        { title: t('wiki.artists'), link: '/savoir-lab/wikiphedia/artistes', page: 'artistes' },
        { title: t('wiki.researchers'), link: '/savoir-lab/wikiphedia/chercheurs', page: 'chercheurs' },
        { title: t('wiki.entrepreneurs'), link: '/savoir-lab/wikiphedia/entrepreneurs', page: 'entrepreneurs' },
        { title: t('wiki.athletes'), link: '/savoir-lab/wikiphedia/sportifs', page: 'sportifs' }
    ];

    return (
        <>
            <div className="background-image-wikiphedia">
                <div className="overlay-text-wikiphedia">
                    <h1 className="wikiphedia-titre">{t('wiki.wikiphedia')}</h1>
                    <p className="p-5 sportifs-description">
                        {t('wiki.description')}
                    </p>
                </div>

                <div className="button-container">
                    {wikidlinks.map((item, index) => (
                        <Button
                            key={index}
                            className={`wikid-button ${currentPath === item.page ? 'active' : ''}`}
                            href={item.link}
                        >
                            {item.title}
                        </Button>
                    ))}
                </div>
            </div>

            <Container>
                <Row>
                    <p className="mt-5  wikiphedia-description">
                        {t('wiki.detailed_profiles')}
                    </p>
                    <Col>
                        <WikidiPreview />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Wikidi;
