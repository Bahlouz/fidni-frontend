import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaBullseye } from 'react-icons/fa';
import './Description.css';

const DescriptionOfConcept = () => {
    return (
        <Container fluid className="p-0 description-container">
            <Row className="flex-grow-1 d-flex align-items-stretch">
                <Col md={5} lg={4} className="flex-grow-1 d-flex align-items-stretch">
                    <section className="concept-section">
                        <div className="icon-container">
                            <FaEye className="concept-icon" aria-hidden="true" />
                        </div>
                        <h2 tabIndex="3" className="description-title">Notre Vision</h2>
                        <p tabIndex="4" className="description-p">
                            La plateforme FIDNI est une plateforme en ligne centralisée et
                            accessible visant à faciliter la collecte, la centralisation et la diffusion d'informations
                            pertinentes, de données, d'analyses et de recherches stratégiques sur le handicap,
                            en réponse à l'impératif d'une meilleure accessibilité à l'information, et à la prise de
                            décision politique éclairée.
                        </p>
                    </section>
                </Col>
                <Col md={5} lg={4} className="flex-grow-1 d-flex align-items-stretch">
                    <section className="concept-section">
                        <div className="icon-container">
                            <FaBullseye className="concept-icon" aria-hidden="true" />
                        </div>
                        <h2 tabIndex="5" className="description-title">Notre Mission</h2>
                        <p tabIndex="6" className="description-p">
                            <ul>
                                <li>Faciliter l'accès à l'information.</li>
                                <li>Promouvoir l'adoption de politiques inclusives fondées sur des recherches et
                                    ancrées dans les connaissances scientifiques.</li>
                                <li>Favoriser les échanges entre les personnes en situation de handicap en
                                    Tunisie, les chercheurs, les journalistes, les acteurs de la société civile et les
                                    décideurs.</li>
                            </ul>
                        </p>
                    </section>
                </Col>
            </Row>
        </Container>
    );
};

export default DescriptionOfConcept;
    