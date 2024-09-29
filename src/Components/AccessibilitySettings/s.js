if (localStorage.getItem('highlightLinks') === null) {
    localStorage.setItem('highlightLinks', '1'); // Default to no highlighting
  }

  // Initialize state based on localStorage
  const [isHighlightLinks, setIsHighlightLinks] = useState(() => {
    return localStorage.getItem('highlightLinks') === '1';
  });

  useEffect(() => {
    const elements = document.querySelectorAll('a, button');
    elements.forEach((element) => {
      if (isHighlightLinks) {
        // Restore original styles
        const orgTextDecoration = element.getAttribute('data-asw-orgLinkTextDecoration');
        const orgFontWeight = element.getAttribute('data-asw-orgLinkFontWeight');
        const orgFontSize = element.getAttribute('data-asw-orgLinkFontSize');
        const orgLinkColor = element.getAttribute('data-asw-orgLinkColor');

        if (orgTextDecoration) element.style.textDecoration = orgTextDecoration;
        if (orgFontWeight) element.style.fontWeight = orgFontWeight;
        if (orgFontSize) element.style.fontSize = orgFontSize;
        if (orgLinkColor) element.style.color = orgLinkColor;
      } else {
        // Save current styles and apply new highlight styles
        const computedStyle = window.getComputedStyle(element);
        const orgTextDecoration = computedStyle.getPropertyValue('text-decoration');
        const orgFontWeight = computedStyle.getPropertyValue('font-weight');
        const orgFontSize = computedStyle.getPropertyValue('font-size');
        const orgLinkColor = computedStyle.getPropertyValue('color');

        element.setAttribute('data-asw-orgLinkTextDecoration', orgTextDecoration);
        element.setAttribute('data-asw-orgLinkFontWeight', orgFontWeight);
        element.setAttribute('data-asw-orgLinkFontSize', orgFontSize);
        element.setAttribute('data-asw-orgLinkColor', orgLinkColor);

        element.style.textDecoration = 'underline';
        element.style.fontWeight = '700';
        element.style.fontSize = `${parseFloat(orgFontSize) * 1.1}px`;
        element.style.color = '#ff0000';
      }
    });

    // Store the current state in localStorage
    localStorage.setItem('highlightLinks', isHighlightLinks ? '1' : '0');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHighlightLinks]);

  const toggleHighlightLinks = () => {
    setIsHighlightLinks((prev) => !prev);
  };

  <button
  className="asw-btn"
  type="button"
  onClick={toggleHighlightLinks}
  aria-label={isHighlightLinks ? "Désactiver la surbrillance des liens" : "Activer la surbrillance des liens"}
>
  <span className="material-icons">link</span>
  <span className="asw-translate">
    {isHighlightLinks ? "Surligner les liens" : "Désactiver la surbrillance"}
  </span>
</button>

const [isDyslexicFontEnabled, setIsDyslexicFontEnabled] = useState(() => {
    // Return true if localStorage is 'true', otherwise false
    return localStorage.getItem('isDyslexicFontEnabled') === 'true';
});

// Effect to apply or remove dyslexic font
useEffect(() => {
    const elements = document.querySelectorAll('*');
    elements.forEach((el) => {
        if (!el.classList.contains('material-icons')) {
            if (isDyslexicFontEnabled) {
                // Apply dyslexic font
                let orgFontFamily = el.style.fontFamily;
                el.setAttribute('data-asw-orgFontFamily', orgFontFamily);
                el.style.fontFamily = 'OpenDyslexic3';
            } else {
                // Revert to original font
                let orgFontFamily = el.getAttribute('data-asw-orgFontFamily');
                if (orgFontFamily) {
                    el.style.fontFamily = orgFontFamily;
                    el.removeAttribute('data-asw-orgFontFamily');
                } else {
                    el.style.removeProperty('font-family');
                }
            }
        }
    });

    // Update localStorage
    localStorage.setItem('isDyslexicFontEnabled', isDyslexicFontEnabled ? 'true' : 'false');
}, [isDyslexicFontEnabled]);

// Toggle function
const toggleDyslexicFont = () => {
    setIsDyslexicFontEnabled((prev) => !prev);
};
<button
        className="asw-btn"
        type="button"
        onClick={toggleDyslexicFont}
        aria-label={isDyslexicFontEnabled ? "Désactiver la police dyslexique" : "Activer la police dyslexique"}
      >
        <span className="material-icons">spellcheck</span>
        <span className="asw-translate">
          {isDyslexicFontEnabled ? "Désactiver la police dyslexique" : "Activer la police dyslexique"}
        </span>
      </button>