import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaBullseye } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'; // Import the hook
import './Description.css';

const DescriptionOfConcept = () => {
    const { t, i18n } = useTranslation(); // Initialize translation
    const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
    // Determine alignment and direction based on current language
    const textAlignment = i18n.language === 'ar' ? 'text-right ' : 'text-left';
    const direction = i18n.language === 'ar' ? 'rtl !important' : 'ltr';

    return (
        <Container fluid className="p-0 description-container" style={{ direction }}>
            <Row className="flex-grow-1 d-flex align-items-stretch">
                <Col md={5} lg={4} className="flex-grow-1 d-flex align-items-stretch">
                    <section className="concept-section">
                        <div className="icon-container">
                            <FaEye className="concept-icon" aria-hidden="true" />
                        </div>
                        <h2 tabIndex="3" className={`description-title ${textAlignment}`} >
                            {t("description.vision.title")}
                        </h2>
                        <p tabIndex="4" className={`description-p ${textAlignment}`}style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
                            {t("description.vision.content")}
                        </p>
                    </section>
                </Col>
                <Col md={5} lg={4} className="flex-grow-1 d-flex align-items-stretch">
                    <section className="concept-section">
                        <div className="icon-container">
                            <FaBullseye className="concept-icon" aria-hidden="true" />
                        </div>
                        <h2 tabIndex="5" className={`description-title ${textAlignment}`}>
                            {t("description.mission.title")}
                        </h2>
                        <ul className={`description-p ${textAlignment}`} style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}>
                            {t("description.mission.content", { returnObjects: true }).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </section>
                </Col>
            </Row>
        </Container>
    );
};

export default DescriptionOfConcept;
