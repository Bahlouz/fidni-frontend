import React from 'react';
import { useTranslation } from 'react-i18next';
import './AccessibilityFeatures.css';
import backnavhead from "../../Assets/back navhead.jpg";

const AccessibilityFeatures = () => {
  const { t } = useTranslation();
  const osList = ['windows', 'macOS', 'linux']; // Ensure "macOS" matches the JSON casing
  const features = t(`accessw.accessibility.shortcuts.${osList}.features`, { returnObjects: true }) || [];

  return (
    <>
      <img className="backnavhead" src={backnavhead} aria-hidden="true" />
      <div className="accessibility-features">
        <h2 className="accessible-heading">{t('accessw.accessibility.w3cMeasures')}</h2>
        <p className="w3c-measures">{t('accessw.accessibility.w3cMeasures')}</p>
        {osList.map((os) => {
          const features = t(`accessw.accessibility.shortcuts.${os}.features`, { returnObjects: true }) || [];
          return (
            <div key={os}>
              <h2 className="accessible-heading">{t(`accessibility.shortcuts.${os}.title`)}</h2>
              <ul className="features-list">
                {Array.isArray(features) && features.length > 0 ? (
                  features.map((feature, i) => (
                    <li key={i} className="feature-item">
                      <span className="feature-name">{feature.name}</span>
                      <span className="feature-shortcut">{feature.shortcut}</span>
                    </li>
                  ))
                ) : (
                  <li className="feature-item">{t('accessibility.noFeatures')}</li> // Handle case with no features
                )}
              </ul>
            </div>
          );
        })}
        <h2 className="accessible-heading">{t('accessw.accessibility.assistanceApps')}</h2>
        <ul className="apps-list">
          <li className="app-item"><span className="app-name">{t('accessw.accessibility.nvda')}</span></li>
          <li className="app-item"><span className="app-name">{t('accessw.accessibility.jaws')}</span></li>
          <li className="app-item"><span className="app-name">{t('accessw.accessibility.voiceOver')}</span></li>
          <li className="app-item"><span className="app-name">{t('accessw.accessibility.talkBack')}</span></li>
        </ul>
      </div>
    </>
  );
};

export default AccessibilityFeatures;
