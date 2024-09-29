import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./Quote.css";
import unescoImage from './eric.jpg';
import ibsarImage from './masnouri.jpg';
import beforefooter from "../../Assets/beforefooter.svg";

function QuoteComponent() {
  return (
    <Container fluid className='p-0 testimony-container d-flex flex-column align-items-center justify-content-center'>
      <Container fluid className="quote-container">
        <Row>
          <Col xs={12} className="text-center">
            <h2 className="quote-text">
              Chaque voix mérite d'être entendue
            </h2>
          </Col>
        </Row>
        <Row className="align-items-center justify-content-center">
          <Col md={4} className="quote-container-left text-center">
            <div className="quote-author">
              <div className="quote-mot">
                Mot d'Eric FALT:
              </div>
              Directeur régional du bureau
              <br />
              de l'UNESCO pour le Maghreb
            </div>
            <img src={unescoImage} alt="Eric Falt" className="unesco-logo" aria-label="Image d'Eric Falt" />
          </Col>
          <Col md={6} className="quote-content text-center">
            <div className="quote-body">
              <p>
                Portée par la conviction que chaque voix mérite d'être entendue,
                I'UNESCO, Organisation des Nations Unies pour l'éducation, la
                science et la culture, s'est engagée sur le chantier d'une
                communication plus des personnes en situation de handicap en
                Tunisie.
              </p>
              <p>
                Ce voyage vers l'inclusion a débuté avec la signature pionnière de
                la Tunisie en 2007 et sa ratification dès 2008 de la Convention
                relative aux droits des personnes handicapées, et l'inclusion
                historique dans la Constitution tunisienne de l'obligation de l'État de
                protéger les personnes handicapées contre toute discrimination et
                de prendre des mesures qui garantissent leur pleine inclusion dans
                la société. Malgré des progrès notables, les rapports récents du
                Comité des droits des personnes handicapées révèlent un écart
                entre les aspirations tunisiennes et la réalisation de la Convention,
                notamment en matière de dignité des personnes handicapées dans
                les médias. Cette plateforme est notre réponse à cet impératif, et
                illustre notre engagement à briser les barrières des préjugés, en
                commençant par la transformation des mentalités.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className="quote-container">
        <Row className="align-items-center justify-content-center">
          <Col md={6} className="quote-content text-center">
            <div className="quote-body">
              <p>
                "Fidni" est une plateforme innovante dédiée à la production et à la diffusion d'informations sur le handicap, visant à garantir l'accès à l'information pour les personnes en situation de handicap, leurs familles, et les professionnels concernés.
              </p>
              <p>
                Cette plateforme répond à un besoin crucial en matière d'accessibilité à l'information pour les personnes handicapées, en offrant un accès centralisé et simplifié à des ressources sur des sujets essentiels comme l'emploi, l'éducation, la santé, et les droits légaux.
              </p>
              <p>
                "Fidni" se distingue par son approche inclusive et holistique, en proposant une variété de contenus regroupés en un seul endroit, facilitant ainsi la vie quotidienne et l'intégration sociale et professionnelle des personnes en situation de handicap.
              </p>
              <p>
                La plateforme s'adresse également aux journalistes et chercheurs, offrant une source fiable et accessible d'informations actuelles et pertinentes, avec un accent particulier sur l'accessibilité et la clarté des informations présentées.
              </p>
              <p>
                En somme, "Fidni" révolutionne l'accès à l'information pour les personnes en situation de handicap, leurs familles, et tous ceux qui œuvrent pour une société plus inclusive et équitable.
              </p>
            </div>
          </Col>
          <Col md={4} className="quote-container-left text-center">
            <div className="quote-author">
              <div className="quote-mot">
                Mot de Mohammed Mansouri :
              </div>
              Président et Fondateur
              <br />
              de ​l’association IBSAR
            </div>
            <img src={ibsarImage} alt="Mohammed Mansouri" className="unesco-logo" aria-label="Image de Mohammed Mansouri" />
          </Col>
        </Row>
      </Container>
      <img className="before-footer"  aria-hidden="true" />    
    </Container>
  );
}

export default QuoteComponent;
