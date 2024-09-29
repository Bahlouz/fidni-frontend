import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import rec1 from "../../../../../Assets/rec1.png";
import rec2 from "../../../../../Assets/rec2.png";
import rec3 from "../../../../../Assets/rec3.png";
import "./Adoption.css"
const RecommendationsComponent = () => {
  return (
    <>
    <div className="background-image-Recommandation">
        <div className="p-5 overlay-text-Recommandation">
          <h1 className="Recommandation-titre">Accéder aux Recommandations Stratégiques pour l'Inclusion Médiatique des Personnes Handicapées </h1>

        </div>
      </div>
    <Container className="mt-4">
      <Row>
        <Col xs={2}>
          <Image
            src={rec1}
            alt="Regulation"
            fluid
          />
        </Col>
        <Col xs={10}>
          <p><b>a) Recommandations au niveau de la régulation des médias</b></p>
          <p><b>i. Régulation nationale</b></p>
          <ul>
            <li>
              La Haute Autorité Indépendante de la Communication Audiovisuelle (HAICA) est
              appelée à produire des rapports annuels sur le respect par les institutions
              médiatiques des dispositions énoncées dans les cahiers des charges relatifs
              aux personnes handicapées.
            </li>
            <li>
              Appel à concevoir un guide pour l’accès des personnes handicapées aux programmes télévisés 
            </li>
          </ul>
          <p><b>ii. Auto-régulation</b></p>
          <ul>
            <li>
              Appel à concevoir un guide pour l'accès des personnes handicapées aux
              programmes télévisés.
            </li>
            <li>
              Appeler le Conseil de presse à inclure des principes liés au respect des
              droits humains et à la dignité des personnes handicapées.
            </li>
            <li>
              Inciter les institutions médiatiques publiques et privées qui disposent de
              chartes éthiques à inclure des principes particuliers dans les chartes qui ont
              été établies.
            </li>
          </ul>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={2}>
          <Image
            src={rec2}
            alt="Formation"
            fluid
          />
        </Col>
        <Col xs={10}>
          <p><b>b) Recommandations au niveau de la formation</b></p>
          <p><b>i. Formation académique</b></p>
          <ul>
            <li>
              Inclure le contenu du guide dans les matières qui enseignent l’éthique
              journalistique aux niveaux de la licence et du Master.
            </li>
            <li>
              Sensibiliser les enseignants de l’Institut de Presse et des Sciences de
              l'Information (IPSI) à inclure les questions liées au handicap et aux
              personnes handicapées dans les activités pédagogiques destinées aux étudiants.
            </li>
          </ul>
          <p><b>ii. Formation professionnelle</b></p>
          <ul>
            <li>
              Développer des programmes en coopération avec le Centre africain de formation
              des journalistes pour le journalisme professionnel dans les médias, basés sur
              les principes du Guide des bonnes pratiques journalistiques.
            </li>
            <li>
              Ces programmes pilotes s’adressent à toutes les catégories professionnelles:
              journalistes, hommes et femmes, producteurs de programmes, animateurs,
              présentateurs, commentateurs, analystes.
            </li>
            <li>
              Développer des programmes de formation en coopération avec le SNJT et avec les
              institutions journalistiques dans le cadre de formations « in situ » afin
              d’orienter la formation vers les agents professionnels et des producteurs de
              contenu.
            </li>
          </ul>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={2}>
          <Image
            src={rec3}
            alt="National"
            fluid
          />
        </Col>
        <Col xs={10}>
          <p><b>c) Recommandations au niveau national</b></p>
          <ul>
            <li>
            Créer, à l'initiative conjointe de l'UNESCO, des associations représentatives des personnes handicapées, de la Haute Autorité Indépendante de la Communication Audiovisuelle (HAICA) ou du Conseil de presse, ce que l'on pourrait appeler la « Coalition nationale pour des médias inclusifs et accessibles aux personnes handicapées », qui regrouperait les organisations liées à l’inclusion du handicap dans les médias, à savoir :
            </li>
            <ul className="hyphen-list">
            <li>
              Institutions de formation : Institut de Presse et des Sciences de l’Information (IPSI) et Centre Africain de Formation professionnelle des journalistes. 
            </li>
            <li>
            Les syndicats : le Syndicat national des journalistes tunisiens (SNJT) et les syndicats des institutions privées de radio et de télévision. 
            </li>
            <li>
            Les instances de régulation et d’autorégulation des médias, le Conseil de Presse et la HAICA. 
            </li>
            <li>
            Associations pour les droits des personnes handicapées. 
            </li>
            </ul>
          </ul>
        </Col>
      </Row>

    <p>Cette coalition permet de réaliser les missions suivantes :</p>

    <ul className="mission-list">
        <li>Mettre en place un comité de suivi de l'évolution du traitement médiatique des problématiques liées aux personnes handicapées, sur la base des rapports qui peuvent être fournis par l'Observatoire de la HAICA, publier un bref rapport de monitoring sur le traitement médiatique des personnes handicapées.</li>
        <li>Organiser des rencontres régulières (tous les 6 mois) pour élaborer des propositions adressées à tous les départements impliqués dans les médias.</li>
        <li>Créer un prix professionnel pour récompenser les bonnes initiatives journalistiques et médiatiques institutionnelles et professionnelles.</li>
    </ul>
    </Container>
    </>
  );
};

export default RecommendationsComponent;
