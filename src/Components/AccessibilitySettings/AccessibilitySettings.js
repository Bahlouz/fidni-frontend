import React , {useEffect,useState,useCallback, useRef}from 'react';

const AccessibilityIcon = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isGuideActive, setGuideActive] = useState(false);
  const overlayRef = useRef(null);
  const guideRef = useRef(null);


  useEffect(() => {
    onPageLoad();
  }, []);

  const onPageLoad = () => {


  };

  const reset = () => {
    localStorage.clear();
    onPageLoad();
  };

  const [contrastLevel, setContrastLevel] = useState(() => {
    return parseInt(localStorage.getItem('contrastLevel')) || 0;
  });

  useEffect(() => {
    document.querySelectorAll("*").forEach((el) => {
      if (contrastLevel === 1) {
        
        const orgColor = el.getAttribute('data-asw-orgContrastColor');
        const orgBgColor = el.getAttribute('data-asw-orgContrastBgColor');

        if (!orgColor) {
          el.setAttribute('data-asw-orgContrastColor', el.style.color);
        }
        if (!orgBgColor) {
          el.setAttribute('data-asw-orgContrastBgColor', getComputedStyle(el).backgroundColor);
        }

        el.style.color = '#ffff00'; 
        el.style.backgroundColor = '#000'; 
      } else {
        // Default mode
        const orgColor = el.getAttribute('data-asw-orgContrastColor');
        const orgBgColor = el.getAttribute('data-asw-orgContrastBgColor');

        if (orgColor) {
          el.style.color = orgColor;
          el.removeAttribute('data-asw-orgContrastColor');
        } else {
          el.style.removeProperty('color');
        }

        if (orgBgColor) {
          el.style.backgroundColor = orgBgColor;
          el.removeAttribute('data-asw-orgContrastBgColor');
        } else {
          el.style.removeProperty('background-color');
        }
      }
    });

    localStorage.setItem('contrastLevel', contrastLevel);
  }, [contrastLevel]);

  const toggleContrast = () => {
    setContrastLevel((prev) => (prev === 1 ? 0 : 1)); 
  };

  const [lineHeightLevel, setLineHeightLevel] = useState(() => {
    return parseInt(localStorage.getItem('lineHeightLevel')) || 1;
  });

  useEffect(() => {
    document.querySelectorAll('*').forEach((el) => {
      if (!el.classList.contains('material-icons')) {
        let orgLineHeight = el.getAttribute('data-asw-orgLineHeight');
        if (lineHeightLevel > 1) {
          if (!orgLineHeight) {
            orgLineHeight = el.style.lineHeight || '1.1';
            el.setAttribute('data-asw-orgLineHeight', orgLineHeight);
          }
          el.style.lineHeight = (parseFloat(orgLineHeight) + lineHeightLevel - 1).toFixed(1);
        } else {
          if (orgLineHeight) {
            el.style.lineHeight = orgLineHeight;
            el.removeAttribute('data-asw-orgLineHeight');
          } else {
            el.style.removeProperty('line-height');
          }
        }
      }
    });
    localStorage.setItem('lineHeightLevel', lineHeightLevel);
  }, [lineHeightLevel]);

  const toggleLineHeight = () => {
    setLineHeightLevel((prev) => (prev % 3) + 1);
  };

  
  const [isBold, setIsBold] = useState(() => {
    return localStorage.getItem('isBold') === '1';
  });

  useEffect(() => {
    document.querySelectorAll('*').forEach((el) => {
      if (!el.classList.contains('material-icons')) {
        if (isBold) {
          
          let orgFontWeight = window.getComputedStyle(el).getPropertyValue('font-weight');
          if (!el.hasAttribute('data-asw-orgFontWeight')) {
            el.setAttribute('data-asw-orgFontWeight', orgFontWeight);
          }
          el.style.fontWeight = '700'; 
        } else {
          
          let orgFontWeight = el.getAttribute('data-asw-orgFontWeight');
          if (orgFontWeight) {
            el.style.fontWeight = orgFontWeight;
            el.removeAttribute('data-asw-orgFontWeight');
          } else {
            el.style.removeProperty('font-weight');
          }
        }
      }
    });
    localStorage.setItem('isBold', isBold ? '1' : '0');
  }, [isBold]);

  const toggleFontWeight = () => {
    setIsBold((prev) => !prev);
  };


  if (localStorage.getItem('isHighlightHeadings') === null) {
    localStorage.setItem('isHighlightHeadings', '1');
  }

  const [isHighlightHeadings, setIsHighlightHeadings] = useState(() => {
    return localStorage.getItem('isHighlightHeadings') === '1';
  });

  useEffect(() => {
    const headings = document.querySelectorAll('h1, h2, h3, heading1');
    headings.forEach((heading) => {
      if (isHighlightHeadings) {
        // Restore original styles
        const orgTextDecoration = heading.getAttribute('data-asw-orgHighlightTextDecoration');
        const orgHighlightColor = heading.getAttribute('data-asw-orgHighlightColor');
        if (orgTextDecoration) heading.style.textDecoration = orgTextDecoration;
        if (orgHighlightColor) heading.style.color = orgHighlightColor;
      } else {
        
        const computedStyle = window.getComputedStyle(heading);
        const orgTextDecoration = computedStyle.getPropertyValue('text-decoration');
        const orgHighlightColor = computedStyle.getPropertyValue('color');
        
        heading.setAttribute('data-asw-orgHighlightTextDecoration', orgTextDecoration);
        heading.setAttribute('data-asw-orgHighlightColor', orgHighlightColor);
        
        heading.style.color = '#ff0000';
        heading.style.textDecoration = 'underline';
      }
    });

    
    localStorage.setItem('isHighlightHeadings', isHighlightHeadings ? '1' : '0');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHighlightHeadings]);

  const toggleHighlightHeadings = () => {
    setIsHighlightHeadings((prev) => !prev);
  };


  

  const [isBigCursorEnabled, setIsBigCursorEnabled] = useState(() => {
    return Boolean(parseInt(localStorage.getItem('isBigCursorEnabled'))) || false;
  });

  useEffect(() => {
    
    const elements = document.querySelectorAll('*');
    elements.forEach((el) => {
      if (isBigCursorEnabled) {
        el.style.cursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 512 512'%3E%3Cpath d='M429.742 319.31L82.49 0l-.231 471.744 105.375-100.826 61.89 141.083 96.559-42.358-61.89-141.083 145.549-9.25zM306.563 454.222l-41.62 18.259-67.066-152.879-85.589 81.894.164-333.193 245.264 225.529-118.219 7.512 67.066 152.878z' xmlns='http://www.w3.org/2000/svg'/%3E%3C/svg%3E"), default`;
      } else {
        el.style.cursor = 'default';
      }
    });

    
    localStorage.setItem('isBigCursorEnabled', isBigCursorEnabled ? 1 : 0);
  }, [isBigCursorEnabled]);

  const toggleBigCursor = () => {
    setIsBigCursorEnabled((prev) => !prev);
  };

  
  const fontSizeLevels = [1, 1.1, 1.2, 1.3]; 
  const [currentFontSizeIndex, setCurrentFontSizeIndex] = useState(0);

  useEffect(() => {
    
    const elements = document.querySelectorAll('*');
    elements.forEach((el) => {
      if (!el.classList.contains('material-icons')) {
        let orgFontSize = el.getAttribute('data-asw-orgFontSize');
        let fontSizeUnit = el.getAttribute('data-asw-fontSizeUnit');
        if (orgFontSize && fontSizeUnit) {
          el.style['font-size'] = `${parseFloat(orgFontSize) * fontSizeLevels[currentFontSizeIndex]}${fontSizeUnit}`;
        } else {
          const computedStyle = window.getComputedStyle(el);
          orgFontSize = parseFloat(computedStyle.getPropertyValue('font-size'));
          fontSizeUnit = computedStyle.getPropertyValue('font-size').replace(/[\d.]/g, '');
          el.setAttribute('data-asw-orgFontSize', orgFontSize);
          el.setAttribute('data-asw-fontSizeUnit', fontSizeUnit);
          el.style['font-size'] = `${orgFontSize * fontSizeLevels[currentFontSizeIndex]}${fontSizeUnit}`;
        }
      }
    });
    localStorage.setItem('isFontSizeEnabled', 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFontSizeIndex]);

  const handleButtonFontSize = () => {
    setCurrentFontSizeIndex((prevIndex) => (prevIndex + 1) % fontSizeLevels.length);
  };


  const spacingLevels = [0, 0.1, 0.2, 0.3];
  const [currentSpacingIndex, setCurrentSpacingIndex] = useState(0);

  useEffect(() => {
    
    const elements = document.querySelectorAll('*');
    elements.forEach((el) => {
      if (!el.classList.contains('material-icons')) {
        let orgLetterSpacing = el.getAttribute('data-asw-orgLetterSpacing');
        if (orgLetterSpacing) {
          el.style['letter-spacing'] = orgLetterSpacing;
        }
        if (currentSpacingIndex === 0) {
          el.style.removeProperty('letter-spacing');
        } else {
          el.style['letter-spacing'] = `${spacingLevels[currentSpacingIndex]}em`;
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSpacingIndex]);

  const handleButtonClick = () => {
    setCurrentSpacingIndex((prevIndex) => (prevIndex + 1) % spacingLevels.length);
  };

  const saturationLevels = ['default', 'low', 'high', 'monochrome'];
    const [saturationIndex, setSaturationIndex] = useState(0);

    
    const iconRef = useRef(null);
    const textRef = useRef(null);
    const indicatorLinesRef = useRef([]);

    const cycleSaturation = () => {
      setSaturationIndex(prevIndex => (prevIndex + 1) % saturationLevels.length);
  };

  useEffect(() => {
      const level = saturationLevels[saturationIndex];

      
      if (iconRef.current && textRef.current) {
          switch (level) {
              case 'default':
                  iconRef.current.textContent = 'invert_colors'; // Default icon
                  textRef.current.textContent = 'Saturation par défaut';
                  break;
              case 'low':
                  iconRef.current.textContent = 'invert_colors_off';
                  textRef.current.textContent = 'Saturation basse';
                  break;
              case 'high':
                  iconRef.current.textContent = 'invert_colors';
                  textRef.current.textContent = 'Saturation élevée';
                  break;
              case 'monochrome':
                  iconRef.current.textContent = 'monochrome_photos';
                  textRef.current.textContent = 'Monochrome';
                  break;
              default:
                  break;
          }
      }

      
      if (indicatorLinesRef.current.length > 0) {
          indicatorLinesRef.current.forEach((line, index) => {
              if (line) {
                  line.classList.remove('active');
                  if (index === saturationIndex - 1 || (saturationIndex === 0 && index === saturationLevels.length - 1)) {
                      line.classList.add('active');
                  }
              }
          });
      }

      adjustSaturation(level);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saturationIndex]);
  const adjustSaturation = (level) => {
    
    
};  


    
  const [readingMode, setReadingMode] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);

  const toggleReadingMode = () => {
    setReadingMode(prevMode => {
      const newMode = !prevMode;
      document.body.classList.toggle('active-reader', newMode);

      if (newMode) {
        document.querySelectorAll('*').forEach(el => {
          el.style.cursor = 'url("./readercursor.svg"), default';
        });
        updateOutlineColor();
      } else {
        document.querySelectorAll('*').forEach(el => {
          el.style.cursor = 'default';
        });
        if (currentUtterance) {
          window.speechSynthesis.cancel(); 
          setCurrentUtterance(null);
        }
      }

      return newMode;
    });
  };

  // Update outline color for text elements
  const updateOutlineColor = () => {
    document.querySelectorAll('.active-reader *').forEach(el => {
      const computedStyle = window.getComputedStyle(el);
      const textColor = computedStyle.color;
      el.style.setProperty('--outline-color', textColor);
    });
  };

  // Handle clicks to read content aloud
  useEffect(() => {
    const handleClick = (event) => {
      if (readingMode) {
        if (currentUtterance) {
          window.speechSynthesis.cancel(); // Stop any ongoing speech
          setCurrentUtterance(null);
        }
        const content = event.target.textContent.trim();
        if (content) {
          const newUtterance = new SpeechSynthesisUtterance(content);
          newUtterance.lang = 'fr-FR';
          newUtterance.onend = () => setCurrentUtterance(null);
          window.speechSynthesis.speak(newUtterance);
          setCurrentUtterance(newUtterance);
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
    
  }, [readingMode, currentUtterance]);

  // Handle page refresh or navigation
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (readingMode) {
        window.speechSynthesis.cancel(); // Stop any ongoing speech
        setCurrentUtterance(null);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [readingMode]);

  // Ensure reading mode is off when component mounts
  useEffect(() => {
    // Initialize the state and set styles accordingly
    document.body.classList.remove('active-reader');
    document.querySelectorAll('*').forEach(el => {
      el.style.cursor = 'default';
    });
    if (currentUtterance) {
      window.speechSynthesis.cancel(); // Ensure speech is stopped on unmount
      setCurrentUtterance(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


    const toggleMenu = () => {
        setMenuVisible(prev => !prev);
    };
    // Define handleKeyPress with useCallback
    const handleKeyPress = useCallback((event) => {
        if (event.key === 'Enter') {
            toggleMenu();
        }
    }, []); 

    const updateGuidePosition = useCallback((event) => {
      const overlay = overlayRef.current;
      const guide = guideRef.current;

      if (overlay && guide) {
          const guideHeight = guide.offsetHeight;
          const viewportY = event.clientY; // Y position relative to the viewport
          const guideTop = viewportY - guideHeight / 2;

          guide.style.top = `${guideTop}px`; // Center the guide on the cursor
          overlay.style.clipPath = `polygon(0% 0%, 100% 0%, 100% ${guideTop}px, 0% ${guideTop}px, 0% ${guideTop + guideHeight}px, 100% ${guideTop + guideHeight}px, 100% 100%, 0% 100%)`;
      }
  }, []);

  const toggleReadingGuide = () => {
      setGuideActive(prevState => {
          const newState = !prevState;
          if (newState) {
              if (!overlayRef.current) {
                  const newOverlay = document.createElement('div');
                  newOverlay.id = 'unique-overlay';
                  document.body.appendChild(newOverlay);
                  overlayRef.current = newOverlay;
              }
              if (!guideRef.current) {
                  const newGuide = document.createElement('div');
                  newGuide.id = 'unique-guide';
                  document.body.appendChild(newGuide);
                  guideRef.current = newGuide;
              }

              overlayRef.current.style.display = 'block';
              guideRef.current.style.display = 'block';
              document.addEventListener('mousemove', updateGuidePosition);
          } else {
              if (overlayRef.current) {
                  overlayRef.current.style.display = 'none';
                  overlayRef.current.style.clipPath = 'none'; // Reset clip-path
              }
              if (guideRef.current) {
                  guideRef.current.style.display = 'none';
              }
              document.removeEventListener('mousemove', updateGuidePosition);
          }
          return newState;
      });
  };



  useEffect(() => {
    // Set up event listeners
    document.addEventListener('keydown', handleKeyPress);

    // Create and append the <link> element for Material Icons
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons&amp;text=ads_click,text_rotation_none,text_fields,format_size,blind,restart_alt,close,link,local_parking,contrast,spellcheck,local_library,format_bold,format_line_spacing,brightness_low,brightness_medium,brightness_high,monochrome_photos,invert_colors_off,invert_colors';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Cleanup function to remove event listeners and <link> element
    return () => {
        document.head.removeChild(link);
        document.removeEventListener('keydown', handleKeyPress);
        if (isGuideActive) {
            document.removeEventListener('mousemove', updateGuidePosition);
        }
    };
}, [handleKeyPress, isGuideActive, updateGuidePosition]); 
        return (
<div>
      <div 
        className="accessibility-container" 
        tabIndex="0" 
        role="button" 
        aria-label="bouton d'accessibilité"
        onClick={toggleMenu}

      ></div>
   
      {menuVisible && (
        <div className="asw-menu" id="aswMenu">
          <div className="asw-menu-header">
            <div className="asw-translate">Paramètres d'accessibilité</div>
            <div>

              <div 
                role="button" 
                className="asw-menu-close" 
                aria-label="Fermer La fenêtre d'accessibilité" 
                onClick={toggleMenu}
              >
                <span className="material-icons">close</span>
              </div>
            </div>
          </div>
          <div className="asw-menu-content">
            <div className="asw-card">
              <p className="asw-title-card">Contrôle des polices</p>
              <div className="asw-items content">
              <button
              className="asw-btn"
              type="button"
              onClick={handleButtonFontSize}
              aria-label="Agrandir la taille de la police"
            >
              <span className="material-icons">format_size</span>
              <span className="asw-translate">Agrandir la taille de la police</span>
              </button>
              <button
      className="asw-btn"
      type="button"
      onClick={toggleLineHeight}
      aria-label="Espacement des lignes"
    >
      <span className="material-icons">format_line_spacing</span>
      <span className="asw-translate">
        {lineHeightLevel === 1 ? 'Espacement normal' : lineHeightLevel === 2 ? 'Espacement moyen' : 'Espacement large'}
      </span>
    </button>
                <button
                className="asw-btn"
                type="button"
                onClick={handleButtonClick}
                aria-label="Espacement des lettres"
              >
                <span className="material-icons">text_rotation_none</span>
                <span className="asw-translate">Espacement des lettres</span>
                </button>
                
      <button
      className="asw-btn"
      type="button"
      onClick={toggleFontWeight}
      aria-label="Épaisseur de la police"
    >
      <span className="material-icons">format_bold</span>
      <span className="asw-translate">
        {isBold ? 'Gras' : 'Normal'}
      </span>
    </button>
              </div>
            </div>
            <div className="asw-card">
              <p className="asw-title-card">Assistance à la lecture</p>
              <div className="asw-items content">
              <button 
                className="asw-btn" 
                type="button" 
                onClick={toggleReadingMode} 
                aria-label={readingMode ? "Désactiver Lecteur d'écran" : "Activer Lecteur d'écran"}
              >
                <span className="material-icons" aria-label="">
                  {readingMode ? 'volume_off' : 'volume_up'}
                </span>
                <span className="asw-translate">
                  {readingMode ? 'Désactiver Lecteur d\'écran' : 'Activer Lecteur d\'écran'}
                </span>
              </button>
                <button 
                  className="asw-btn" 
                  type="button" 
                  onClick={() => toggleReadingGuide(true)} 
                  aria-label="Activate Reading Guide"
                >
                  <span className="reading-guide-icon material-icons" aria-hidden="true">visibility</span>
                  <span className="reading-guide-text">Activer Masque de lecture</span>
                </button>
                <button
                  className="asw-btn"
                  type="button"
                  onClick={toggleHighlightHeadings}
                  aria-label={isHighlightHeadings ? "Désactiver la surbrillance des titres" : "Activer la surbrillance des titres"}
                >
                  <span className="material-icons">local_parking</span>
                  <span className="asw-translate">
                    {isHighlightHeadings ? "Activer le surlignage des titres" : " Désactiver le surlignage des titres"}
                  </span>
                </button>
                
                <button
                className="asw-btn"
                type="button"
                onClick={toggleBigCursor}
                aria-label="Curseur Agrandi"
              >
                <span className="material-icons">ads_click</span>
                <span className="asw-translate">Curseur Agrandi</span>
                </button>
              </div>
            </div>
            <div className="asw-card">
              <p className="asw-title-card">Contrôle des couleurs</p>
              <div className="asw-items content">
                <button
      className="asw-btn"
      type="button"
      onClick={toggleContrast}
      aria-label={contrastLevel === 1 ? "Contraste par défaut" : "Contraste élevé"}
    >
      <span className="material-icons">
        {contrastLevel === 1 ? 'high_quality' : 'contrast'}
      </span>
      <span className="asw-translate">
        {contrastLevel === 1 ? 'Contraste élevé' : 'Contraste par défaut'}
      </span>
    </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
        );       
}

export default AccessibilityIcon;
