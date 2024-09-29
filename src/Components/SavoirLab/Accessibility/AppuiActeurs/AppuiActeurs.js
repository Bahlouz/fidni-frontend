import React from 'react';
import { Container,Table } from 'react-bootstrap';
import './AppuiActeurs.css';
import fiche7 from "../../../../Assets/fiches/fiche7.png";
import fiche8 from "../../../../Assets/fiches/fiche8.png";
import fiche9 from "../../../../Assets/fiches/fiche9.png";
import downloadimg from "../../../../Assets/downloadimg.png"
const AppuiActeurs = () => {

  return (
    <Container fluid className="appui-acteurs-container">
      <div className="appui-acteurs-background">
        <div className="appui-acteurs-overlay">
          <h1 className="appui-acteurs-title">Appui des acteurs médiatiques au processus d'accessibilité</h1>
        </div>
      </div>
      <Container className="appui-acteurs-content">
        <h2>Comprendre l'importance de l'accessibilité pour promouvoir l'inclusivité</h2>
        <p>
          Le lien entre handicap et accessibilité est indiscociable. Comprendre les défis quotidiens des personnes en situation de handicap est essentiel pour saisir le rôle crucial de l'accessibilité. Celle-ci influence de nombreux aspects de la vie quotidienne, incluant l'éducation, la santé, le travail, le transport, et la culture. Rendre le monde accessible est une nécessité pour promouvoir l'inclusivité. Son objectif est d'éliminer tout ce qui entrave la pleine inclusion de la société, quel que soit les capacités individuelles.
        </p>

        <h3>Nuances entre accessibilité et inclusivité réside dans leurs objectifs et leurs portées</h3>
        <Table striped bordered hover responsive className="appui-acteurs-table">
          <thead>
            <tr>
              <th>Accessibilité</th>
              <th>Inclusivité</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Objectif:</strong> L'accessibilité vise à garantir que tous les individus, indépendamment de leurs capacités physiques ou mentales, puissent accéder aux bâtiments, aux services, aux transports, aux technologies numériques, et à toutes les autres formes d'infrastructure et de services disponibles dans la société.
              </td>
              <td>
                <strong>Objectif:</strong> L'inclusivité vise à créer des environnements, des politiques et des pratiques qui accueillent et respectent la diversité de tous les individus, en favorisant leur participation active, leur contribution et leur sentiment d'appartenance dans tous les aspects de la société.
              </td>
            </tr>
            <tr>
              <td>
                <strong>Focus:</strong> Elle se concentre sur la suppression des barrières physiques, sensorielles, cognitives, et autres, qui peuvent empêcher ou limiter l'accès des personnes handicapées à des infrastructures et services.
              </td>
              <td>
                <strong>Focus:</strong> Elle va au-delà de l'accès physique en cherchant à éliminer les barrières sociales, culturelles et comportementales qui peuvent marginaliser ou exclure certaines populations, y compris les personnes handicapées.
              </td>
            </tr>
            <tr>
              <td>
                <strong>Exemples:</strong> Rampes d'accès pour fauteuils roulants, ascenseurs adaptés, systèmes de guidage pour non-voyants, sous-titres pour sourds dans les médias, sites web accessibles, etc.
              </td>
              <td>
                <strong>Exemples:</strong> Initiatives visant à sensibiliser sur les besoins des différentes communautés, politiques d'emploi inclusif, programmes éducatifs accessibles à tous les enfants, espaces publics conçus pour favoriser l'interaction sociale de tous les membres de la communauté, etc.
              </td>
            </tr>
          </tbody>
        </Table>

        <p>
          L'accessibilité garantit que tous les individus puissent accéder sans difficulté aux bâtiments, aux services et aux infrastructures. Elle ne concerne pas uniquement les personnes handicapées, mais aussi d'autres groupes tels que les femmes enceintes, les personnes âgées, et les parents avec des enfants en poussette. Toute personne confrontée à des obstacles temporaires ou permanents doit pouvoir accéder pleinement à tous les lieux et services.
        </p>
        <p>
          <strong>Accessibilité</strong>: Adaptation de l'existant pour répondre aux besoins spécifiques des personnes handicapées à travers des solutions ou équipements spécifiques, comme les guidages podotactiles dans les gares.
        </p>
        <p>
          <strong>Conception Universelle</strong>: Aussi appelée design pour tous, elle vise à créer des solutions qui répondent aux besoins de tous, de ces environnements mêmes stressants pour les personnes handicapées ou ayant un handicap cognitif.
        </p>
        <p>
          <strong>Design Inclusif</strong>: Conception prenant en compte les besoins diversifiés de plusieurs groupes, adaptant la solution en fonction des spécificités de chaque utilisateur.
        </p>
        <p>
          Ces approches se croisent pour un objectif commun: assurer aux personnes en situation de handicap l'accès équitable aux mêmes droits et services que tous les citoyens.
        </p>
        <div className="lexique-column">
        <div className="lexique-preview">
          <img 
            src={fiche7}
            alt="lexique Preview" 
            className="lexique-image" 
          />
          <a 
            href={`${process.env.PUBLIC_URL}/pdfs/Fiche 7 word.pdf` }
            download
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              className="download-button-guide" 
              href={`${process.env.PUBLIC_URL}/pdfs/Fiche 7 word.pdf` }
              target="_blank"
              src={downloadimg} 
              alt="Télécharger" 
              rel="noopener noreferrer"
            />
          </a>
        </div>
        <a 
          href={`${process.env.PUBLIC_URL}/pdfs/Fiche 7 word.pdf` }
          className="french-link"
          terget="_blank"
          rel="noopener noreferrer"
        >
          Accéder au lexique en français
        </a>
        <a 
          href={`${process.env.PUBLIC_URL}/pdfs/Fiche 7  Comprendre l'Importance de l'Accessibilité pour promouvoir l’inclusivité_VAR.pdf` }
          className="french-link"
          terget="_blank"
          rel="noopener noreferrer"
          style={{marginBottom:"3em"}}
        >
          Accéder au lexique en arabe
        </a>
      </div>
        <div className="fiche8">
      <h1 className="fiche8-title">Réaliser un reportage sur l'accessibilité des espaces publics urbains</h1>
      <div className="fiche8-section">
        <h2 className="fiche8-section-title">1. L'Accessibilité des Espaces Publics</h2>
        <p className="fiche8-section-text">L'accessibilité des espaces publics vise à permettre à toutes les personnes, y compris celles en situation de handicap, de circuler librement et de bénéficier pleinement des services et équipements urbains disponibles. Ce droit fondamental garantit l'égalité d'accès à l'espace urbain et aux services publics pour tous les citoyens.</p>
      </div>
      <div className="fiche8-section">
        <h2 className="fiche8-section-title">2. Importance du Travail Journalistique sur l'Accessibilité</h2>
        <p className="fiche8-section-text">Le travail journalistique sur l'accessibilité urbaine consiste à réaliser des reportages de terrain, accompagnés de photos et de vidéos, pour évaluer concrètement l'accessibilité d'un quartier, d'une administration ou d'un établissement public... Ces reportages mettent en lumière les défis rencontrés par les personnes en situation de handicap et permettent de sensibiliser le public et les décideurs sur l'importance d'améliorer l'accessibilité urbaine.</p>
      </div>
      <div className="fiche8-section">
        <h2 className="fiche8-section-title">3. Quelques éléments Clés pour comprendre l'Accessibilité Urbaine</h2>
        <div className="fiche8-subsection">
          <h3 className="fiche8-subsection-title">a. Stationnement</h3>
          <ul className="fiche8-subsection-list">
            <li className="fiche8-subsection-list-item">Stationnement Extérieur: Les places accessibles doivent être proches des entrées principales et être clairement signalées par une signalisation horizontale et verticale appropriée et calires.</li>
          </ul>
        </div>
        <div className="fiche8-subsection">
          <h3 className="fiche8-subsection-title">b. Chaussée et Parcours Piétons</h3>
          <ul className="fiche8-subsection-list">
            <li className="fiche8-subsection-list-item">Trottoirs: Les trottoirs doivent être dégagés de tout encombrement, avec des dévers limités à 2% pour assurer une circulation aisée. Les ressaut doivent être évités ou aménagés avec une inclinaison douce.</li>
            <li className="fiche8-subsection-list-item">Abaissement du Trottoir (Bateau): Un abaissement du trottoir avec une bande d'éveil et de vigilance est nécessaire pour faciliter l'accès aux traversées piétonnes.</li>
            <li className="fiche8-subsection-list-item">Surélévation de la Chaussée (Plateau): Les plateaux surélevés doivent être équipés de pentes latérales douces et d'ilots refuges pour sécuriser les traversées.</li>
            <li className="fiche8-subsection-list-item">Ilots Refuges: Permettent une traversée en deux temps avec des bandes d'éveil et de vigilance pour assurer la sécurité des piétons.</li>
          </ul>
        </div>
        <div className="fiche8-subsection">
          <h3 className="fiche8-subsection-title">c. Mobilier Urbain</h3>
          <ul className="fiche8-subsection-list">
            <li className="fiche8-subsection-list-item">Bancs et Chaises: Les bancs doivent être espacés régulièrement et respecter des dimensions confortables pour tous les usagers.</li>
            <li className="fiche8-subsection-list-item">Signalétique : La signalisation doit être claire, visible et compréhensible par tous, y compris les personnes atteintes de déficiences visuelles ou mentales.</li>
          </ul>
        </div>
      </div>
      <div className="fiche8-section">
        <h2 className="fiche8-section-title">4. Méthodologie du Travail Journalistique</h2>
        <p className="fiche8-section-text">Pour réaliser un reportage sur l'accessibilité urbaine, les journalistes peuvent suivre cette méthodologie simplifiée:</p>
        <ul className="fiche8-section-list">
          <li className="fiche8-section-list-item">Choix du Lieu et Préparation: Sélectionner un quartier, une administration ou un établissement public à observer/évaluer. Préparer une visite en contactant les responsables pour obtenir les autorisations nécessaires.</li>
          <li className="fiche8-section-list-item">Évaluation sur le Terrain: Accompagner une personne en situation de handicap (de préférence représentative du groupe visé) pour tester l'accessibilité réelle. Documenter avec des photos et des vidéos les défis rencontrés.</li>
          <li className="fiche8-section-list-item">Interviews et Témoignages: Recueillir les témoignages des personnes handicapées sur leurs expériences quotidiennes en matière d'accessibilité. Interroger également les responsables municipaux ou administratifs sur les efforts entrepris pour améliorer l'accessibilité.</li>
          <li className="fiche8-section-list-item">Analyse et Rapportage: Analyser les observations recueillies sur le terrain. Identifier les points forts et les déficiences en matière d'accessibilité. Formuler des recommandations/revendications concrètes pour améliorer la situation.</li>
        </ul>
      </div>
      <div className="fiche8-section">
        <h2 className="fiche8-section-title">5. Objectifs du Reportage</h2>
        <ul className="fiche8-section-list">
          <li className="fiche8-section-list-item">Sensibiliser le public aux défis quotidiens rencontrés par les personnes handicapées.</li>
          <li className="fiche8-section-list-item">Encourager les autorités locales à prendre des mesures concrètes pour rendre les espaces publics plus accessibles.</li>
          <li className="fiche8-section-list-item">Promouvoir l'inclusion et l'égalité des droits dans les politiques urbaines (Journalisme de solution).</li>
        </ul>
      </div>
      <div className="lexique-column">
        <div className="lexique-preview">
          <img 
            src={fiche8}
            alt="lexique Preview" 
            className="lexique-image" 
          />
          <a 
            href={`${process.env.PUBLIC_URL}/pdfs/Fiche 8 word.pdf` }
            download
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              className="download-button-guide" 
              href={`${process.env.PUBLIC_URL}/pdfs/Fiche 8 word.pdf` }
              target="_blank"
              src={downloadimg} 
              alt="Télécharger" 
              rel="noopener noreferrer"
            />
          </a>
        </div>
        <a 
          href={`${process.env.PUBLIC_URL}/pdfs/Fiche 8 word.pdf` }
          className="french-link"
          terget="_blank"
          rel="noopener noreferrer"
        >
          Accéder au lexique en français
        </a>
        <a 
          href={`${process.env.PUBLIC_URL}/pdfs/Fiche 8 Réaliser un reportage sur l’accessibilité des Espaces Publics Urbains_ VAR.pdf` }
          className="french-link"
          terget="_blank"
          rel="noopener noreferrer"
          style={{marginBottom:"3em"}}
        >
          Accéder au lexique en arabe
        </a>
      </div>
    </div>
    <div className="fiche9-container">
      <h2 className="fiche9-title">Grille Pratique pour les Journalistes pour le monitoring de l'Accessibilité des Services Numériques Publics</h2>
      <div className="fiche9-section">
        <h3 className="fiche9-section-title">1. Qu'est-ce que l'accessibilité Numérique ?</h3>
        <p className="fiche9-section-paragraph">L'accessibilité numérique consiste à rendre les services en ligne accessibles à tous, y compris les personnes en situation de handicap. Elle vise à garantir que le contenu web soit perceptible, utilisable, compréhensible et robuste pour tous les utilisateurs, indépendamment de leurs capacités physiques ou mentales.</p>
      </div>
      <div className="fiche9-section">
        <h3 className="fiche9-section-title">2. Contexte</h3>
        <p className="fiche9-section-paragraph">Dans le cadre du travail de terrain journalistique, les journalistes peuvent utiliser cette fiche pratique pour observer, comparer et évaluer l'accessibilité des services numériques publics. Cela permet de porter un regard critique et constructif sur les actions des administrations publiques et de sensibiliser les parties prenantes à l'importance de l'accessibilité numérique.</p>
      </div>
      <div className="fiche9-section">
        <h3 className="fiche9-section-title">3. Objectifs de la fiche</h3>
        <ul className="fiche9-section-list">
          <li className="fiche9-section-list-item">Évaluer l'accessibilité des services numériques publics selon les normes WCAG(65).</li>
          <li className="fiche9-section-list-item">Détecter les failles et les points à améliorer en matière d'accessibilité numérique.</li>
          <li className="fiche9-section-list-item">Fournir des recommandations (journalisme de solution) pour améliorer l'accès des personnes en situation de handicap aux services numériques publics.</li>
        </ul>
      </div>
      <h4 className="fiche9-subtitle">Fiche pratique d'observation sur l'accessibilité des services numériques publics</h4>
      <div className="fiche9-section">
        <h5 className="fiche9-section-title">Informations Générales</h5>
        <ul className="fiche9-section-list">
          <li className="fiche9-section-list-item">Nom du site/application: </li>
          <li className="fiche9-section-list-item">URL: </li>
          <li className="fiche9-section-list-item">Secteur public: </li>
          <li className="fiche9-section-list-item">Date de l'observation: </li>
        </ul>
      </div>
      <div className="fiche9-section">
        <h4 className="fiche9-section-title">Évaluation des Critères d'Accessibilité</h4>
        <table className="fiche9-table">
  <thead>
    <tr>
      <th className="fiche9-table-header">N°</th>
      <th className="fiche9-table-header">Recommandation de WebAIM(66)</th>
      <th className="fiche9-table-header">Existant.e</th>
      <th className="fiche9-table-header">Non Existant.e</th>
      <th className="fiche9-table-header">Moyenne d'accessibilité Note (0-10)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="fiche9-table-cell">1</td>
      <td className="fiche9-table-cell">Le contenu important du site est-il accessible sans avoir besoin d'utiliser des scripts?</td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"> <input type="number" className="fiche9-number-input" min="0" max="10" /></td>
    </tr>
    <tr>
      <td className="fiche9-table-cell">2</td>
      <td className="fiche9-table-cell">Les liens sur le site ont-ils un sens hors contexte, en évitant les expressions génériques comme «Cliquez ici»?</td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"> <input type="number" className="fiche9-number-input" min="0" max="10" /></td>
    </tr>
    <tr>
      <td className="fiche9-table-cell">3</td>
      <td className="fiche9-table-cell">Y a-t-il des descriptions alternatives (alt text) pour toutes les images et graphiques?</td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"> <input type="number" className="fiche9-number-input" min="0" max="10" /></td>
    </tr>
    <tr>
      <td className="fiche9-table-cell">4</td>
      <td className="fiche9-table-cell">Des sous-titres sont-ils fournis pour toutes les vidéos et des transcriptions pour les fichiers audios?</td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"> <input type="number" className="fiche9-number-input" min="0" max="10" /></td>
    </tr>
    <tr>
      <td className="fiche9-table-cell">5</td>
      <td className="fiche9-table-cell">Le texte du site utilise-t-il des contrastes de couleurs suffisamment élevés?</td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"> <input type="number" className="fiche9-number-input" min="0" max="10" /></td>
    </tr>
    <tr>
      <td className="fiche9-table-cell">6</td>
      <td className="fiche9-table-cell">Toutes les pages web peuvent-elles être naviguées avec un clavier, sans utiliser la souris?</td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"> <input type="number" className="fiche9-number-input" min="0" max="10" /></td>
    </tr>
    <tr>
      <td className="fiche9-table-cell">7</td>
      <td className="fiche9-table-cell">Les formulaires sont-ils clairement étiquetés et peuvent-ils être utilisés avec un lecteur d'écran ?</td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"> <input type="number" className="fiche9-number-input" min="0" max="10" /></td>
    </tr>
    <tr>
      <td className="fiche9-table-cell">8</td>
      <td className="fiche9-table-cell">Le site évite-t-il d'utiliser uniquement des couleurs pour transmettre de l'information?</td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"> <input type="number" className="fiche9-number-input" min="0" max="10" /></td>
    </tr>
    <tr>
      <td className="fiche9-table-cell">9</td>
      <td className="fiche9-table-cell">Le site fournit-il un moyen de sauter directement au contenu principal de la page ?</td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"> <input type="number" className="fiche9-number-input" min="0" max="10" /></td>
    </tr>
    <tr>
      <td className="fiche9-table-cell">10</td>
      <td className="fiche9-table-cell">Les documents téléchargeables (comme les PDF) sont-ils accessibles, avec des balises et une structure correcte des titres et sections?</td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"> <input type="number" className="fiche9-number-input" min="0" max="10" /></td>
    </tr>
    <tr>
      <td className="fiche9-table-cell">11</td>
      <td className="fiche9-table-cell">Les lecteurs d'écran peuvent-ils lire correctement les tableaux de données grâce à l'utilisation des en-têtes de ligne et de colonne?</td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"> <input type="number" className="fiche9-number-input" min="0" max="10" /></td>
    </tr>
    <tr>
      <td className="fiche9-table-cell">12</td>
      <td className="fiche9-table-cell">Le site offre-t-il des alternatives pour les contenus dynamiques, comme les animations et les carrousels, pour les utilisateurs qui ne peuvent pas les voir ou les utiliser ?</td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"> <input type="number" className="fiche9-number-input" min="0" max="10" /></td>
    </tr>
    <tr>
      <td className="fiche9-table-cell">13</td>
      <td className="fiche9-table-cell">Le site est-il compatible avec les technologies d'assistance, comme les lecteurs d'écran et les navigateurs spécialisés?</td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"> <input type="number" className="fiche9-number-input" min="0" max="10" /></td>
    </tr>
    <tr>
      <td className="fiche9-table-cell">14</td>
      <td className="fiche9-table-cell">Le site évite-t-il les fenêtres contextuelles (pop-ups) qui peuvent être difficiles à fermer pour certains utilisateurs?</td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"> <input type="number" className="fiche9-number-input" min="0" max="10" /></td>
    </tr>
    <tr>
      <td className="fiche9-table-cell">15</td>
      <td className="fiche9-table-cell">Les éléments de navigation sont-ils cohérents sur toutes les pages du site?</td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"><input type="checkbox" className="fiche9-checkbox" /></td>
      <td className="fiche9-table-cell"> <input type="number" className="fiche9-number-input" min="0" max="10" /></td>
    </tr>
  </tbody>
</table>
      </div>
    </div>
    <div className="fiche9">
      
      <div className="fiche9-title">Note totale des moyennes d'accessibilité</div>
      <div className="fiche9-title">Calcul de la Moyenne de Respect des Critères</div>
      <table className="fiche9-table">
        <thead>
          <tr>
            <th>Calcul de la moyenne</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Respect des critères</td>
            <td>Note Totale des moyennes d'accessibilité divisée par le nombre des critères qui sont 15 dans ce cas</td>
          </tr>
        </tbody>
      </table>
      <div className="fiche9-text">La moyenne d'accessibilité pour ce site est donc ... ce qui indique un bon niveau général d'accessibilité. Cependant, des recommandations spécifiques peuvent être faites pour les critères ayant des notes inférieures à 10.</div>
      <div className="fiche9-title">Instructions</div>
      <div className="fiche9-text">1. Critères: Les recommandations sont fractionnées ligne par ligne avec une numérotation pour faciliter le suivi et le monitoring.</div>
      <div className="fiche9-text">2. Existant/Non Existant: Cochez la case correspondante pour chaque critère, selon quil est respecté ou non.</div>
      <div className="fiche9-text">3. Moyen d'accessibilité: Utilisez une échelle de 0 à 10 pour évaluer chaque critère d'accessibilité. Une note de 0 signifie que le critère n'est pas du tout respecté, tandis qu'une note de 10 signifie qu'il est pleinement respecté</div>
      <div className="fiche9-text">4. Calcul de la moyenne: À la fin du tableau, calculez la moyenne du respect des critères pour évaluer l'accessibilité globale.</div>
      <div className="fiche9-text">Cette fiche pratique permet aux journalistes d'évaluer systématiquement l'accessibilité des services numériques publics et de contribuer, à travers leurs articles et reportages, à l'amélioration de ces services pour tous les utilisateurs.</div>
      <div className="lexique-column">
        <div className="lexique-preview">
          <img 
            src={fiche9}
            alt="lexique Preview" 
            className="lexique-image" 
          />
          <a 
            href={`${process.env.PUBLIC_URL}/pdfs/Fiche 9 word.pdf` }
            download
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              className="download-button-guide" 
              href={`${process.env.PUBLIC_URL}/pdfs/Fiche 9 word.pdf` }
              target="_blank"
              src={downloadimg} 
              alt="Télécharger" 
              rel="noopener noreferrer"
            />
          </a>
        </div>
        <a 
          href={`${process.env.PUBLIC_URL}/pdfs/Fiche 9 word.pdf` }
          className="french-link"
          terget="_blank"
          rel="noopener noreferrer"
        >
          Accéder au lexique en français
        </a>
        <a 
          href={`${process.env.PUBLIC_URL}/pdfs/Fiche 9 grille Pratique pour les Journalistes pour le monitoring de l'Accessibilité des Services Numériques Publics_VAR.pdf` }
          className="french-link"
          terget="_blank"
          rel="noopener noreferrer"
          style={{marginBottom:"3em"}}
        >
          Accéder au lexique en arabe
        </a>
      </div>
    </div>
      </Container>
    </Container>
  );
};

export default AppuiActeurs;
