import React from 'react';
import './AccessibilityFeatures.css';
import backnavhead from "../../Assets/back navhead.jpg";
const AccessibilityFeatures = () => {
  const w3cMeasures = "Les mesures d'accessibilité du W3C (World Wide Web Consortium) sont conçues pour rendre le contenu web accessible à tous, y compris aux personnes handicapées. Ces mesures comprennent l'amélioration de la perceptibilité, de l'utilisabilité, de la compréhensibilité et de la robustesse du contenu web.";

  const features = [
    {
      navigator: 'Windows',
      shortcuts: [
        { name: 'Augmenter la taille de la police', shortcut: 'Ctrl + +' },
        { name: 'Diminuer la taille de la police', shortcut: 'Ctrl + -' },
        { name: 'Activer le mode contraste élevé', shortcut: 'Alt + Maj + Impr écran' },
        { name: 'Lancer le Narrateur', shortcut: 'Win + Ctrl + Entrée' }
      ]
    },
    {
      navigator: 'macOS',
      shortcuts: [
        { name: 'Zoom avant', shortcut: 'Cmd + Opt + =' },
        { name: 'Zoom arrière', shortcut: 'Cmd + Opt + -' },
        { name: 'Activer VoiceOver', shortcut: 'Cmd + F5' },
        { name: 'Inverser les couleurs', shortcut: 'Cmd + Opt + Ctrl + 8' }
      ]
    },
    {
      navigator: 'Linux',
      shortcuts: [
        { name: 'Augmenter la taille de la police', shortcut: 'Ctrl + +' },
        { name: 'Diminuer la taille de la police', shortcut: 'Ctrl + -' },
        { name: 'Activer Orca (lecteur d\'écran)', shortcut: 'Alt + Super + S' }
      ]
    }
  ];

  return (
    <>
    <img className="backnavhead" src={backnavhead} aria-hidden="true" />
    <div className="accessibility-features">
      <h2 className="accessible-heading">Mesures d'accessibilité du W3C</h2>
      <p className="w3c-measures">{w3cMeasures}</p>
      {features.map((group, index) => (
        <div key={index}>
          <h2 className="accessible-heading">Raccourcis pour {group.navigator}</h2>
          <ul className="features-list">
            {group.shortcuts.map((feature, i) => (
              <li key={i} className="feature-item">
                <span className="feature-name">{feature.name}</span>
                <span className="feature-shortcut">{feature.shortcut}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h2 className="accessible-heading">Applications d'assistance</h2>
      <ul className="apps-list">
        <li className="app-item"><span className="app-name">NVDA</span> - NonVisual Desktop Access</li>
        <li className="app-item"><span className="app-name">JAWS</span> - Job Access With Speech</li>
        <li className="app-item"><span className="app-name">VoiceOver</span> - Lecteur d'écran pour macOS et iOS</li>
        <li className="app-item"><span className="app-name">TalkBack</span> - Lecteur d'écran pour Android</li>
      </ul>
    </div>
    </>
  );
};

export default AccessibilityFeatures;
