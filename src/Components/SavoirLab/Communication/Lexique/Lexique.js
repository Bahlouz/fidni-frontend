import React from 'react';
import './Lexique.css';
import lexiquedoc1 from "../../../../Assets/lexiquedoc1.png";
import tableaudoc from "../../../../Assets/tableau.png";
import downloadimg from '../../../../Assets/download.png'
const Lexique = () => {
  return (
    <>
    <div className="background-image-Communication"></div>
    <div className="lexique-container">
        
        <div className="overlay-text-Communication">
          <h1 className="Communication-titre">Le lexique de communication inclusive des personnes handicapées  </h1>
          </div>
      <div className="lexique-column">
        <div className="lexique-preview">
          <img 
            src={tableaudoc}
            alt="lexique Preview" 
            className="lexique-image" 
          />
          <a 
            href={`${process.env.PUBLIC_URL}/pdfs/undis_communication_guidelines.pdf` }
            download
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              className="download-button-guide" 
              href={`${process.env.PUBLIC_URL}/pdfs/undis_communication_guidelines.pdf` }
              target="_blank"
              src={downloadimg} 
              alt="Télécharger" 
              rel="noopener noreferrer"
            />
          </a>
        </div>
        <a 
          href={`${process.env.PUBLIC_URL}/pdfs/Fiche lexique word.pdf` }
          className="french-link"
          terget="_blank"
          rel="noopener noreferrer"
        >
          Accéder au lexique en français
        </a>
        <a 
          href={`${process.env.PUBLIC_URL}/pdfs/Terminologie appropriée et expressions à éviter VAR.pdf` }
          className="french-link"
          terget="_blank"
          rel="noopener noreferrer"
          style={{marginBottom:"3em"}}
        >
          Accéder au lexique en arabe
        </a>
        <div className="lexique-preview">
          <img 
            src={lexiquedoc1}
            alt="lexique Preview" 
            className="lexique-image" 
          />
          <a 
            href={`${process.env.PUBLIC_URL}/pdfs/undis_communication_guidelines.pdf` }
            download
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              className="download-button-guide" 
              href={`${process.env.PUBLIC_URL}/pdfs/undis_communication_guidelines.pdf` }
              target="_blank"
              src={downloadimg} 
              alt="Télécharger" 
              rel="noopener noreferrer"
            />
          </a>
        </div>
        <a 
          href={`${process.env.PUBLIC_URL}/pdfs/undis_communication_guidelines.pdf` }
          className="french-link"
          terget="_blank"
          rel="noopener noreferrer"
        >
          Accéder aux Lignes directrices pour l’inclusion du handicap dans les communications des Nations Unies 
        </a>
      </div>
      
      <div className="lexique-content">
        <h2>Lignes directrices pour l’inclusion du handicap dans les communications.</h2>
        <div className="context-section">
          <h4>Contexte :</h4>
          <p>
          Les mots ont du pouvoir : ils peuvent à la fois libérer
et opprimer. Bien choisir ses mots est important,
notamment pour la représentation des personnes
handicapées. Un langage qui respecte et valorise
chaque individu sans renforcer les stéréotypes ou
les préjugés doit être privilégié.
          </p>
          <p>
          En choisissant soigneusement les mots et les
terminologies, les médias ont le pouvoir de
transformer la perception publique du handicap. Un
langage inclusif et respectueux renforce l’intégration
sociale des personnes handicapées et promeut une
culture médiatique qui est véritablement
représentative de la diversité de la société.
          </p>
          <p>
          En utilisant un vocabulaire inadapté, les contenus
produits participent à la stigmatisation des
personnes en situation de handicap. Cela se traduit
par un vocabulaire qui tend à considérer les
personnes handicapées comme des individus en
dehors de la société, mettant en avant leur handicap
pour susciter de la compassion et les assignant à un
statut d’infériorité sociale. Ils nourrissent les
stéréotypes, considérant que les personnes
handicapées formeraient un seul et unique groupe
homogène, sans mettre en avant le fait qu’ils ont
des capacités variables pouvant contribuer au bien-
être de la société. Par conséquent, ce traitement
médiatique peut amener à ne plus considérer les
personnes en situation de handicap comme des
citoyens possédant des droits.
          </p>
          <p>
          Un tableau de terminologie (non exhaustif) à éviter
          et/ou à favoriser est téléchargeable sur cette page.
          </p>
          <p>
          Pour approfondir ce sujet, vous pouvez également
consulter les « Lignes directrices pour l’inclusion du
handicap dans les communications » des Nations
Unies. Ce document produit pour les membres du
personnel des Nations Unies, fournit des précisions
sur les moyens pratiques à mettre en place dans le
développement d’un contenu inclusif et accessible
pour tous.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Lexique;
