import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './SavoirLab.css';

const SavoirLab = () => {
  const pdfList = [
    {
      title: 'Etude sur les violences sexuelles et les besoins en santé sexuelle et reproductive des jeunes et des femmes en situation de handicap',
      description: '',
      link: '/assets/savoirlab/Etude_sur_les_violences_sexuelles_et_les_besoins_en_santé_sexuelle_et_reproductive_des_jeunes_et_des_femmes_en_situation_de_handicap.pdf',
    },
    {
      title: 'ETUDE SUR L’ACCESSIBILITE AUX STRUCTURES DE PRISE EN CHARGE DES VIOLENCES BASEES SUR LE GENRE POUR LES FEMMES EN SITUATION DE HANDICAP VICTIMES DE VIOLENCE',
      description: '',
      link: '/assets/savoirlab/ETUDE_SUR_L_ACCESSIBILITE_AUX_STRUCTURES_DE_PRISE_EN_CHARGE_DES_VIOLENCES_BASEES_SUR_LE_GENRE_POUR_LES_FEMMES_EN_SITUATION_DE_HANDICAP_VICTIMES_DE_VIOLENCE.pdf',
    },
    // Add more PDFs as needed
  ];

  return (
    <Container fluid className="savoirlab-container">
      <div className="background-image-savoir-lab">
        <div className="overlay-text">
          <h1 className="savoirlab-titre">SavoirLab</h1>
          <p className="savoirlab-description">Explorez notre collection de PDF</p>
        </div>
      </div>
      <Row className="pdf-list">
        {pdfList.map((pdf, index) => (
          <Col key={index} xs={12} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{pdf.title}</Card.Title>
                <Card.Text>{pdf.description}</Card.Text>
                <Card.Link href={pdf.link} target="_blank" rel="noopener noreferrer">
                  Voir PDF
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SavoirLab;
