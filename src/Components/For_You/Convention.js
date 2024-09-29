import React from 'react';
import { Container ,Row,Col,Image} from 'react-bootstrap';
import './Convention.css';
import conventiondoc from "../../Assets/convention.png"

const Convention = () => {
  
  return (
    <>
    <div className="background-image-droits">
    <div className="overlay-text-droits-singlepage">
      <h1 className="p-5 droits-titre-singlepage">Convention relative aux Droits des Personnes Handicapées (CDPH)</h1>
    </div>
  </div>
  
  <Container className="convention-container">
    <Row>
    <div className="definitions-convention">
  <h2>Définitions :</h2>
  <ul>
    <li>
      <b>Personnes handicapées</b>: personnes qui présentent des incapacités physiques,
      mentales, intellectuelles ou sensorielles durables dont l'interaction avec diverses
      barrières peut faire obstacle à leur pleine et effective participation à la société sur
      la base de l'égalité avec les autres.
    </li><br />
    <li>
      <b>Discrimination fondée sur le handicap</b>: toute distinction, exclusion ou
      restriction fondée sur le handicap qui a pour objet ou pour effet de compromettre
      ou réduire à néant la reconnaissance, la jouissance ou l'exercice, sur la base de
      l'égalité avec les autres, de tous les droits de l'homme et de toutes les libertés
      fondamentales dans les domaines politique, économique, social, culturel, civil ou
      autres. La discrimination fondée sur le handicap comprend toutes les formes de
      discrimination, y compris le refus d'aménagement raisonnable.
    </li><br />
    <li>
      <b>Aménagement raisonnable</b>: les modifications et ajustements nécessaires et
      appropriés n'imposant pas de charge disproportionnée ou indue apportés, en
      fonction des besoins dans une situation donnée, pour assurer aux personnes
      handicapées la jouissance ou l'exercice, sur la base de l'égalité avec les autres,
      de tous les droits de l'homme et de toutes les libertés fondamentales.
    </li><br />
  </ul>
  <p>Source: Convention relative aux Droits des Personnes Handicapées</p>
</div>

    </Row>
      <Row>
        <Col>
          <h2 className="convention-title" style={{marginTop:"2em"}}>Convention relative aux Droits des Personnes Handicapées (CDPH)</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="convention-text">
            La Convention relative aux droits des personnes handicapées (CDPH), adoptée le 13 décembre 2006 par l'Assemblée générale des Nations Unies à New York, a pour objet de « promouvoir, protéger et assurer la pleine et égale jouissance de tous les droits de l’homme et de toutes les libertés fondamentales par les personnes handicapées et de promouvoir le respect de leur dignité intrinsèque ».
          </p>
          <p className="convention-text">
            La Convention est un engagement universel pour transformer les sociétés dans le sens de l’inclusion, afin de garantir que les personnes handicapées jouissent des mêmes opportunités, des mêmes possibilités de participation que les autres. Dans ce sens, elle prône la non-discrimination. Elle appelle à ce que les personnes handicapées ne soient plus considérées comme des objets de charité mais bien comme des sujets de droit.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className="convention-subtitle">
            La CDPH fait le lien entre le handicap et les personnes détentrices de droits, et se focalise sur l’interaction des déficiences avec les obstacles de l’environnement qui entravent la participation pleine et entière dans la société.
          </h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="convention-text">Parmi les changements les plus significatifs, il faut retenir que cette Convention :</p>
          <ul className="convention-list">
            <li>Ne crée pas de nouveaux droits pour les personnes handicapées : elle exprime l’ensemble des droits humains en prenant en compte les besoins spécifiques et la situation des personnes handicapées, et énumère les étapes et actions nécessaires à leur réalisation pleine et entière ;</li><br />
            <li>Est juridiquement contraignante pour les États parties : les États doivent régulièrement faire un rapport des mesures entreprises pour l’appliquer ;</li><br />
            <li>Est un outil de développement et un instrument des droits humains :
            <li>Avisée le changement de paradigme sur la question du handicap en appliquant le modèle social du handicap à la totalité du texte de la Convention<sup>1</sup> ;</li><br />
            <li>Est un instrument s’appliquant à tous les types d’incapacités et tous les secteurs ;</li><br />
            <li>Représente « un grand pas en avant pour la promotion de l’accès aux services destinés aux personnes handicapées, dans tous les contextes et à tout moment » ;</li><br />
            </li>
            <li>Stipule clairement le rôle des organisations représentatives des personnes handicapées comme élément moteur dans la promotion des droits des personnes handicapées, exigeant par conséquent leur participation systématique<sup>2</sup> ;</li><br />
          </ul>
        </Col>
      </Row>
      <Row>
        <Col className='liens-conventions'>
          <h3 className="convention-subtitle">Lien utile :</h3>
          <p className="convention-text">
            <a href="https://www.ohchr.org/fr/instruments-mechanisms/instruments/convention-rights-persons-disabilities" className="convention-link">Accéder à la Convention relative aux droits des personnes handicapées (CDPH) en français</a>
          </p>
          <a href={`${process.env.PUBLIC_URL}/pdfs/Convention relative aux droits des personnes handicapées.pdf`} target="_blank" rel="noopener noreferrer">
      <Image src={conventiondoc} fluid className="convention-image" />
          </a>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="convention-subtitle">Consulter :</h4>
          <p style={{borderTop: '1px solid'}}>
            <sup>1</sup><small>CDPH, Article 1. Op, cit.</small><br />
            <sup>2</sup><small>CDPH. Articles 3, 4.3, 29, 30, 32 et 33. Op, cit.</small>
          </p>
          <ul className="convention-list">
            <li><a href="/services-et-droits/droits">Droits</a></li><br /><br />
            <li><a href="/services-et-droits/cadre">Cadre réglementaire concernant le handicap en Tunisie</a></li><br />
          </ul>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Convention;
