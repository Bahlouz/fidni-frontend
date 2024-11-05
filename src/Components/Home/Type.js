import React from "react";
import Typewriter from "typewriter-effect";
import { useTranslation } from "react-i18next"; // Import the hook

function Type() {
  const { t, i18n } = useTranslation(); // Initialize translation and i18n

  // Determine text direction based on the selected language
  const textDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div style={{ direction: textDirection, textAlign: textDirection === 'rtl' ? 'right' : 'left' }}  >
      <Typewriter
        options={{
          strings: t('typewriter', { returnObjects: true }), // Get the array of strings for the typewriter
          autoStart: true,
          loop: true,
          deleteSpeed: 40,
          delay: 100,
          pauseFor: 5000,
        }}
      />
    </div>
  );
}

export default Type;
