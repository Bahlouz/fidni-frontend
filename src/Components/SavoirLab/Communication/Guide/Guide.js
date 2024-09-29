import React from 'react';
import './Guide.css';
import guidedoc1 from "../../../../Assets/guidedoc1.png";
import downloadimg from '../../../../Assets/download.png'

const Guide = () => {
  return (
    <>
    <div className="background-image-Communication"></div>
    <div className="guide-container">
        
        <div className="overlay-text-Communication">
          <h1 className="Communication-titre">Le guide de bonnes pratiques éditoriales et éthiques </h1>
        </div>
      <div className="guide-column">
        <div className="guide-preview">
          <img 
            src={guidedoc1}
            alt="Guide Preview" 
            className="guide-image" 
          />
          <a 
            href={`${process.env.PUBLIC_URL}/pdfs/Guide Unesco.pdf` }
            download
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              className="download-button-guide" 
              href={`${process.env.PUBLIC_URL}/pdfs/Guide Unesco.pdf` }
              target="_blank"
              src={downloadimg} 
              alt="Télécharger" 
            />
          </a>
        </div>
        <a 
          href={`${process.env.PUBLIC_URL}/pdfs/Guide Unesco.pdf`} 
          className="french-link"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Accéder au guide en français
        </a>
      </div>
      <div className="guide-content">
        <h2>Vers une communication inclusive :</h2>
        <h3>
          Changer de regard sur le handicap et promouvoir les droits des 
          personnes handicapées en Tunisie.
        </h3>
        <div className="context-section">
          <h4>Contexte :</h4>
          <p>
            Dans le cadre du développement de ce guide, l’approche adoptée par 
            l’UNESCO vise à limiter la reproduction de normes culturelles qui 
            perpétuent et nourrissent les discriminations, les préjugés et les 
            stéréotypes vis-à-vis des personnes en situation de handicap. De ce 
            fait, elle promeut la communication inclusive et des politiques visant 
            à embrasser l’approche fondée sur les droits humains, sur les principes 
            de non-discrimination et d’égalité tels que définis dans le cadre du 
            UNPRPD.
          </p>
          <p>
            Par conséquent, cette vision inclusive et participative nécessite la 
            mise en place de projets innovants en matière de communication inclusive, 
            mais également en démocratisant l’accès aux informations portant sur les 
            défis liés à l’accès aux services et aux droits des personnes handicapées 
            en Tunisie.
          </p>
          <p>
            À l’heure où les médias jouent un rôle central dans le façonnement de nos 
            perceptions d’autrui, une représentation précise et respectueuse des 
            personnes handicapées n’est pas seulement souhaitable, mais essentielle. 
            Cette représentation influence non seulement la manière dont les personnes 
            handicapées se voient elles-mêmes, mais aussi la façon dont elles sont 
            perçues et intégrées par la société.
          </p>
          <p>
            C’est pour cela qu’une approche éditoriale bien conçue est la clé pour une 
            représentation respectueuse et équilibrée des personnes handicapées. 
            Dorénavant, les médias doivent utiliser des approches éditoriales inclusives 
            pour présenter les personnes handicapées de manière éthique et efficace.
          </p>
          <p>
            D’où la création de ce guide, qui s’est faite sur la base d’une consultation nationale multipartite en Tunisie et sur une étude nationale de diagnostic. Sa publication a permis de développer une formation pour les professionnels des médias, afin de les sensibiliser sur les questions liées au handicap. A ce jour, 60 journalistes tunisiens ont bénéficié de ces formations. Cela a abouti à des résultats concrets, notamment à des productions médiatiques inclusives, tels que des films d’animation ou des podcasts.  
            Par conséquent, ce n’est pas un simple manuel, c’est un appel à l’action. Il invite les médias tunisiens à adopter des approches éditoriales qui reflètent la diversité et la richesse des expériences des personnes handicapées. A travers des principes éthiques rigoureux, une terminologie respectueuse, et une accessibilité accrue, le guide accompagnera la transformation du paysage médiatique.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Guide;
