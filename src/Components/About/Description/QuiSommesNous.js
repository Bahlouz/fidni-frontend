import React from 'react';
import './QuiSommesNous.css';
import { useTranslation } from 'react-i18next'; // Import the hook

const QuiSommesNous = () => {
  const { t, i18n } = useTranslation(); // Initialize translation

  // Determine alignment and direction based on current language
  const textAlignment = i18n.language === 'ar' ? 'text-right' : 'text-left';
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="qui-sommes-nous-container" style={{ direction }}>
      <h1 className={`qui-sommes-nous-title ${textAlignment}`}>{t("quiSommesNous.title")}</h1>
      <p className={`qui-sommes-nous-text ${textAlignment}`}>
        {t("quiSommesNous.paragraph1")}
      </p>
      <p className={`qui-sommes-nous-text ${textAlignment}`}>
        {t("quiSommesNous.paragraph2")}
      </p>
    </div>
  );
}

export default QuiSommesNous;
