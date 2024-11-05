import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // Import the language detector

import translationFR from './locales/fr/translation.json';
import translationAR from './locales/ar/translation.json';

const resources = {
  fr: { translation: translationFR },
  ar: { translation: translationAR },
};

i18n
  .use(LanguageDetector) // Use the language detector plugin
  .use(initReactI18next) // Initialize react-i18next
  .init({
    resources,
    fallbackLng: 'fr', // Default language if detection fails
    interpolation: {
      escapeValue: false, // React handles XSS
    },
    detection: {
      order: ['localStorage', 'navigator'], // Check localStorage first, then browser settings
      caches: ['localStorage'], // Save the language setting in localStorage
    },
  });

export default i18n;
