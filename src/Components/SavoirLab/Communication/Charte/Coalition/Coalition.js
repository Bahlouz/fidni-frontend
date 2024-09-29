import React from 'react';
import { Container, Row,Col,Image,} from 'react-bootstrap';
import coalitiondoc from '../../../../../Assets/coalition1.png';
import downloadimg from '../../../../../Assets/download.png'
import './Coalition.css';

const Droits = () => {
    
  return (
    <Container fluid className="droits-container">
      <div className="background-image-coalition">
        <div className="p-5 overlay-text-droits">
          <h1 className="droits-titre">La charte nationale pour des médias inclusifs et accessibles aux personnes handicapées en Tunisie </h1>
        </div>
      </div>
      <div>
        <div className="coalition-description">
        <Container className="convention-container">
      <Row>
        <Col>
          <p className="convention-text">
          Adoptée par la <b>« Coalition nationale pour des médias inclusifs et accessibles aux personnes handicapées »</b>, la charte vise à promouvoir l'inclusion et l'accessibilité des personnes handicapées dans les médias tunisiens.
          </p>
          <p className="convention-text">
          Les principaux acteurs de cette initiative comprennent des institutions de recherche et de formation, des organisations professionnelles, des organismes de régulation et d'autorégulation des médias, des associations de défense des droits des personnes handicapées, des organisations internationales et de nombreux médias tunisiens, ainsi que des personnalités médiatiques et des membres de l'Assemblée des représentants du peuple. Avec pour objectifs clés la création d'un comité de suivi du traitement médiatique des questions liées au handicap, l'organisation de campagnes de plaidoyer régulières et l'institution d'un prix professionnel annuel, le "Prix de l'accessibilité et de l'inclusion", pour honorer les initiatives médiatiques exemplaires.
          </p>
          <p>
          Réunie lors de la conférence « Vers une communication inclusive : Changer de regard sur le handicap et promouvoir les droits des personnes handicapées en Tunisie » le 19 juillet 2024 à Tunis, cette coalition s’appuie sur l’engagement historique de la Tunisie dans le développement de la charte adoptée.
En effet, la Tunisie a été l'un des premiers pays à ratifier la Convention relative aux droits des personnes handicapées (CDPH) en 2008 et a inscrit la protection contre les discriminations dans sa Constitution de 2014 et 2022. De plus, la Loi-cadre 83-2005 renforce les droits des personnes handicapées en garantissant l'égalité des chances et en protégeant contre toutes formes de discrimination.
          </p>
          <p>
          En adoptant cette charte, la coalition vise à transformer les perceptions publiques et à sensibiliser sur les enjeux de l'inclusion en utilisant le pouvoir des médias pour influencer les perceptions et servir de plateforme pour les voix des personnes handicapées, en garantissant une représentation équitable des personnes handicapées et en facilitant leur accès aux droits et services essentiels.
          </p>
        </Col>
      </Row>
      <Row>
        <Col className='liens-conventions'>
          <h3 className="convention-subtitle">Lien utile :</h3>
          <div className="guide-preview">
          <img 
            src={coalitiondoc}
            alt="Guide Preview" 
            className="guide-image" 
          />
          <a 
            href={`${process.env.PUBLIC_URL}/pdfs/نهاىي  الميثاق الاعلامي الدامج للاشخاص ذوي الاعاقة .docx` }
            download
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              className="download-button-guide" 
              href={`${process.env.PUBLIC_URL}/pdfs/نهاىي  الميثاق الاعلامي الدامج للاشخاص ذوي الاعاقة .docx` }
              target="_blank"
              src={downloadimg} 
              alt="Télécharger" 
            />
          </a>
        </div>
          <a 
          href={`${process.env.PUBLIC_URL}/pdfs/نهاىي  الميثاق الاعلامي الدامج للاشخاص ذوي الاعاقة .docx`} 
          className="french-link"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Accéder à la Charte en arabe 
        </a>
        </Col>
      </Row>
    </Container>
        
        </div>  
      </div>
      
    </Container>
  );
};

export default Droits;
