let isGuideActive = false; // Define isGuideActive globally

        function updateGuidePosition(event) {
            const overlay = document.getElementById('unique-overlay');
            const guide = document.getElementById('unique-guide');
            const guideHeight = guide.offsetHeight;
            const viewportY = event.clientY; // Y position relative to the viewport
        
            if (overlay) {
                const guideTop = viewportY - guideHeight / 2;
                guide.style.top = `${guideTop}px`; // Center the guide on the cursor
                overlay.style.clipPath = `polygon(0% 0%, 100% 0%, 100% ${guideTop}px, 0% ${guideTop}px, 0% ${guideTop + guideHeight}px, 100% ${guideTop + guideHeight}px, 100% 100%, 0% 100%)`;
            }
        }
        
        function toggleReadingGuide() {
            const overlay = document.getElementById('unique-overlay');
            const guide = document.getElementById('unique-guide');
        
            if (isGuideActive) {
                // Deactivate the reading guide
                if (overlay) {
                    overlay.style.display = 'none';
                    overlay.style.clipPath = 'none'; // Reset clip-path
                }
                if (guide) {
                    guide.style.display = 'none';
                    document.removeEventListener('mousemove', updateGuidePosition); // Remove event listener
                }
            } else {
                // Activate the reading guide
                if (!overlay) {
                    const newOverlay = document.createElement('div');
                    newOverlay.id = 'unique-overlay';
                    document.body.appendChild(newOverlay);
                }
                if (!guide) {
                    const newGuide = document.createElement('div');
                    newGuide.id = 'unique-guide';
                    document.body.appendChild(newGuide);
                }
        
                document.getElementById('unique-overlay').style.display = 'block';
                document.getElementById('unique-guide').style.display = 'block';
                document.addEventListener('mousemove', updateGuidePosition); // Add event listener
            }
            isGuideActive = !isGuideActive;
        }
        


        

        let readingMode = false;
        let currentUtterance = null;
        
        function toggleReadingMode(enable = !readingMode) {
            readingMode = enable;
            document.body.classList.toggle('active-reader', readingMode);
            if (readingMode) {
                document.querySelectorAll("*").forEach(el => {
                    el.style.cursor = `url("./readercursor.svg"), default`;
                });
                updateOutlineColor();
            } else {
                document.querySelectorAll("*").forEach(el => {
                    el.style.cursor = 'default';
                });
                if (currentUtterance) {
                    window.speechSynthesis.cancel(); // Stop any ongoing speech
                    currentUtterance = null;
                }
            }
        }
        
        function updateOutlineColor() {
            document.querySelectorAll('.active-reader *').forEach(el => {
                const computedStyle = window.getComputedStyle(el);
                const textColor = computedStyle.color;
                el.style.setProperty('--outline-color', textColor);
            });
        }
        
        document.addEventListener('click', function(event) {
            if (readingMode) {
                if (currentUtterance) {
                    window.speechSynthesis.cancel(); // Stop any ongoing speech
                }
                const content = event.target.textContent.trim();
                if (content) {
                    currentUtterance = new SpeechSynthesisUtterance(content);
                    currentUtterance.onend = () => { currentUtterance = null; };
                    window.speechSynthesis.speak(currentUtterance);
                }
            }
        });
        
        document.addEventListener('DOMContentLoaded', () => {
            toggleReadingMode(false); // Ensure screen reader is off by default
            document.querySelectorAll("*").forEach(el => {
                el.style.cursor = 'default';
            });
            document.body.classList.remove('active-reader');
        });


        const saturationLevels = ['default', 'low', 'high', 'monochrome'];
        let saturationIndex = 0; 

        function cycleSaturation() {
            // Get next saturation level
            saturationIndex = (saturationIndex + 1) % saturationLevels.length;
            const level = saturationLevels[saturationIndex];
        
            // Update button icon and text based on the current saturation level
            const icon = document.getElementById('saturation-icon');
            const text = document.getElementById('saturation-text');
            const indicatorLines = document.querySelectorAll('.indicator-line');
            
            switch (level) {
                case 'default':
                    icon.textContent = 'invert_colors'; // Default icon
                    text.textContent = 'Saturation par défaut';
                    break;
                case 'low':
                    icon.textContent = 'invert_colors_off';
                    text.textContent = 'Saturation basse';
                    break;
                case 'high':
                    icon.textContent = 'invert_colors';
                    text.textContent = 'Saturation élevée';
                    break;
                case 'monochrome':
                    icon.textContent = 'monochrome_photos';
                    text.textContent = 'Monochrome';
                    break;
            }
        
            // Update indicator lines
            indicatorLines.forEach((line, index) => {
                line.classList.remove('active');
                if (index === saturationIndex - 1 || (saturationIndex === 0 && index === saturationLevels.length - 1)) {
                    line.classList.add('active');
                }
            });
        
            // Adjust saturation
            adjustSaturation(level);
        }
        
        // Add event listener to button
        document.getElementById('saturation-button').addEventListener('click', cycleSaturation);

        function adjustSaturation(level) {
            // Apply filter to all elements except excluded items
            const allElements = document.querySelectorAll('body *:not(.asw-menu) :not(.accessibility-icon) :not(.indicator-line) :not(.header.scrolled) :not(.navbar.scrolled) :not(.header.visible) :not(.navigation)');
            let saturationValue;
        
            switch (level) {
                case 'low':
                    saturationValue = 'saturate(50%)';
                    break;
                case 'medium':
                    saturationValue = 'saturate(100%)';
                    break;
                case 'high':
                    saturationValue = 'saturate(150%)';
                    break;
                case 'monochrome':
                    saturationValue = 'saturate(0%)';
                    break;
                default:
                    saturationValue = 'saturate(100%)';
            }
            
            // Apply the saturation filter to all elements except those with the 'excluded' class
            allElements.forEach(element => {
                element.style.filter = saturationValue;
            });
        
            // Ensure excluded elements maintain their stat
            const excludedElements = document.querySelectorAll('.asw-menu .accessibility-icon .indicator-line  .navigation .header.visble  .navbar.scrolled .header.scrolled');
            excludedElements.forEach(element => {
                element.style.filter = 'none !important'; // Ensures exclusion
            });
            console.log('Adjusting saturation to:', level);
        }
        const brightnessLevels = ['default', 'low', 'high'];
        let brightnessIndex = 0;

        function adjustBrightness(level) {
            // Apply filter to all elements except excluded items
            const allElements = document.querySelectorAll('body *:not(.asw-menu) :not(.accessibility-icon) :not(.indicator-line) :not(.header.scrolled) :not(.navbar.scrolled) :not(.header.visible) :not(.navigation)');
            let brightnessValue;
        
            switch (level) {
                case 'low':
                    brightnessValue = 'brightness(50%)';
                    break;
                case 'medium':
                    brightnessValue = 'brightness(100%)';
                    break;
                case 'high':
                    brightnessValue = 'brightness(150%)';
                    break;
                default:
                    brightnessValue = 'brightness(100%)';
            }
        
            // Apply the brightness filter to all elements except those with the 'excluded' class
            allElements.forEach(element => {
                element.style.filter = brightnessValue;
            });
        
            // Ensure excluded elements maintain their state
            const excludedElements = document.querySelectorAll('.asw-menu .accessibility-icon .indicator-line .navigation .header.visble  .navbar.scrolled .header.scrolled');
            excludedElements.forEach(element => {
                element.style.filter = 'none !important'; // Ensures exclusion
            });
            console.log('Adjusting brightness to:', level);
        }
        
        function cycleBrightness() {
            // Get next brightness level
            brightnessIndex = (brightnessIndex + 1) % brightnessLevels.length;
            const level = brightnessLevels[brightnessIndex];
        
            // Update button icon and text based on the current brightness level
            const icon = document.getElementById('brightness-icon');
            const text = document.getElementById('brightness-text');
            
            switch (level) {
                case 'default':
                    icon.textContent = 'brightness_medium'; // Default icon
                    text.textContent = 'Luminosité par défaut';
                    break;
                case 'low':
                    icon.textContent = 'brightness_low';
                    text.textContent = 'Luminosité basse';
                    break;
                case 'high':
                    icon.textContent = 'brightness_high';
                    text.textContent = 'Luminosité élevée';
                    break;
            }
        
            // Adjust brightness
            adjustBrightness(level);
        }
        
        // Add event listener to button
        document.getElementById('brightness-button').addEventListener('click', cycleBrightness);

        function handleKeyPress(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                toggleMenu();
            }
        }

          function toggleMenu() {
              var menu = document.getElementById("aswMenu");
              if (menu.style.display === "none") {
                  menu.style.display = "block";
              } else {
                  menu.style.display = "none";
              }
          }
          function adjustFontSize(increment = 0) {
            let isFontSizeEnabled = parseInt(localStorage.getItem('isFontSizeEnabled'));
            
            if (!increment) {
                isFontSizeEnabled = !isFontSizeEnabled;
                increment = 0.1; // Default increment when enabling
            }
            
            if (!isFontSizeEnabled) {
                document.querySelectorAll("*").forEach((el) => {
                    if (!el.classList.contains('material-icons')) {
                        let orgFontSize = el.getAttribute('data-asw-orgFontSize');
                        let fontSizeUnit = el.getAttribute('data-asw-fontSizeUnit');
        
                        if (!orgFontSize) {
                            const computedStyle = window.getComputedStyle(el);
                            orgFontSize = parseFloat(computedStyle.getPropertyValue('font-size'));
                            fontSizeUnit = computedStyle.getPropertyValue('font-size').replace(/[\d.]/g, '');
                            el.setAttribute('data-asw-orgFontSize', orgFontSize);
                            el.setAttribute('data-asw-fontSizeUnit', fontSizeUnit);
                        }
        
                        orgFontSize = parseFloat(orgFontSize);
                        let newFontSize = orgFontSize + orgFontSize * increment;
                        el.style['font-size'] = newFontSize + fontSizeUnit;
                    }
                });
        
                localStorage.setItem('isFontSizeEnabled', 1);
            } else {
                document.querySelectorAll("*").forEach((el) => {
                    if (!el.classList.contains('material-icons')) {
                        let orgFontSize = el.getAttribute('data-asw-orgFontSize');
                        let fontSizeUnit = el.getAttribute('data-asw-fontSizeUnit');
        
                        if (orgFontSize && fontSizeUnit) {
                            el.style['font-size'] = orgFontSize + fontSizeUnit;
                            el.removeAttribute('data-asw-orgFontSize');
                            el.removeAttribute('data-asw-fontSizeUnit');
                        } else {
                            el.style.removeProperty('font-size');
                        }
                    }
                });
        
                localStorage.setItem('isFontSizeEnabled', 0);
            }
        }
        
      
      
              function adjustLetterSpacing(increment = 0) {
                  let isLetterSpacingEnabled = parseInt(localStorage.getItem('isLetterSpacingEnabled'));
                  if(!increment)
                  {
                      isLetterSpacingEnabled = !isLetterSpacingEnabled;
                      increment = 0.1;
                  }
                  if (!isLetterSpacingEnabled) {
                      document
                          .querySelectorAll("*")
                          .forEach((el) => {
                              if (!el.classList.contains('material-icons')) {
      
                                  let orgLetterSpacing = el.getAttribute('data-asw-orgLetterSpacing');
      
                                  if (!orgLetterSpacing) {
                                      orgLetterSpacing = el.style['letter-spacing'];
                                      el.setAttribute('data-asw-orgLetterSpacing', orgLetterSpacing);
                                      if (!(orgLetterSpacing)) {
                                          orgLetterSpacing = 0;
                                      }
                                      orgLetterSpacing = parseFloat(orgLetterSpacing);
                                      let newLetterSpacing = orgLetterSpacing + increment;
                                      el.style['letter-spacing'] = newLetterSpacing + 'em';
                                  }
                              }
                          });
      
                      localStorage.setItem('isLetterSpacingEnabled', 1);
                  } else {
                      document
                          .querySelectorAll("*")
                          .forEach((el) => {
                              if (!el.classList.contains('material-icons')) {
                                  let orgLetterSpacing = el.getAttribute('data-asw-orgLetterSpacing');
                                  if (orgLetterSpacing) {
                                      el.style['letter-spacing'] = orgLetterSpacing;
                                      el.removeAttribute('data-asw-orgLetterSpacing');
                                  }
                                  else
                                  {
                                      el.style.removeProperty('letter-spacing');
                                  }
                              }
                          });
      
                          localStorage.setItem('isLetterSpacingEnabled', 0);
                  }
              }
      
              function enableDyslexicFont(load = false) {
            let isDyslexicFontEnabled = parseInt(localStorage.getItem('isDyslexicFontEnabled'));
            if(load)
            {
                isDyslexicFontEnabled = !isDyslexicFontEnabled;
            }
            if (!isDyslexicFontEnabled) {
                document
                    .querySelectorAll("*")
                    .forEach((el) => {
                        if (!el.classList.contains('material-icons')) {
                            orgFontFamily = el.style['font-family'];
                            el.setAttribute('data-asw-orgFontFamily', orgFontFamily);
                            el.style['font-family'] = 'OpenDyslexic3';
                        }
                    });

                localStorage.setItem('isDyslexicFontEnabled', 1);
            } else {
                document
                    .querySelectorAll("*")
                    .forEach((el) => {
                        if (!el.classList.contains('material-icons')) {
                            orgFontFamily = el.getAttribute('data-asw-orgFontFamily');
                            if (orgFontFamily) {
                                el.style['font-family'] = orgFontFamily;
                                el.removeAttribute('data-asw-orgFontFamily');
                            }
                            else
                            {
                                el.style.removeProperty('font-family');
                            }
                        }
                    });

                localStorage.setItem('isDyslexicFontEnabled', 0);
            }
        }

            
            
      
      
              function enableBigCursor(load = false) {
                  let isBigCursorEnabled = parseInt(localStorage.getItem('isBigCursorEnabled'));
                  if(load)
                  {
                      isBigCursorEnabled = !isBigCursorEnabled;
                  }
                  if (!isBigCursorEnabled) {
                      document
                          .querySelectorAll("*")
                          .forEach((el) => {
                              el.style.cursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 512 512'%3E%3Cpath d='M429.742 319.31L82.49 0l-.231 471.744 105.375-100.826 61.89 141.083 96.559-42.358-61.89-141.083 145.549-9.25zM306.563 454.222l-41.62 18.259-67.066-152.879-85.589 81.894.164-333.193 245.264 225.529-118.219 7.512 67.066 152.878z' xmlns='http://www.w3.org/2000/svg'/%3E%3C/svg%3E"), default`;;
                          });
                      localStorage.setItem('isBigCursorEnabled', 1);
                  } else {
                      document
                          .querySelectorAll("*")
                          .forEach((el) => {
                              el.style.cursor = 'default';
                          });
      
                      localStorage.setItem('isBigCursorEnabled', 0);
                  }
              }
      
      
              function enableHighlightLinks(load = false) {
                  let isHighlightLinks = parseInt(localStorage.getItem('isHighlightLinks'));
                  if(load)
                  {
                      isHighlightLinks = !isHighlightLinks;
                  }
                  if (!isHighlightLinks) {
                      document.querySelectorAll('a,button').forEach((anchor) => {
                          const orgTextDecoration = window.getComputedStyle(anchor).getPropertyValue('text-decoration');
                          const orgFontWeight = window.getComputedStyle(anchor).getPropertyValue('font-weight');
                          const orgFontSize = window.getComputedStyle(anchor).getPropertyValue('font-size');
                          const orgLinkColor = window.getComputedStyle(anchor).getPropertyValue('color');
                          anchor.setAttribute('data-asw-orgLinkTextDecoration', orgTextDecoration);
                          anchor.setAttribute('data-asw-orgLinkFontWeight', orgFontWeight);
                          anchor.setAttribute('data-asw-orgLinkFontSize', orgFontSize);
                          anchor.setAttribute('data-asw-orgLinkColor', orgLinkColor);
                          anchor.style.textDecoration = 'underline';
                          anchor.style.fontWeight = '700';
                          anchor.style['font-size'] = parseInt(orgFontSize) * 1.1 + 'px';
                          anchor.style['color'] = '#ff0000';
                      });
      
                      localStorage.setItem('isHighlightLinks', 1);
                  } else {
                      document.querySelectorAll('a,button').forEach((anchor) => {
                          const orgTextDecoration = anchor.getAttribute('data-asw-orgLinkTextDecoration');
                          const orgFontWeight = anchor.getAttribute('data-asw-orgLinkFontWeight');
                          const orgFontSize = anchor.getAttribute('data-asw-orgLinkFontSize');
                          const orgLinkColor = anchor.getAttribute('data-asw-orgLinkColor');
                          anchor.style.color = orgLinkColor;
                          anchor.style.fontSize = orgFontSize;
                          anchor.style.textDecoration = orgTextDecoration;
                          anchor.style.fontWeight = orgFontWeight;
                      });
      
                      localStorage.setItem('isHighlightLinks', 0);
                  }
              }
      
      
          function enableHighlightHeadings(load = false) {
              let isHighlightHeadings = parseInt(localStorage.getItem('isHighlightHeadings'));
              if(load)
              {
                  isHighlightHeadings = !isHighlightHeadings;
              }
              if (!isHighlightHeadings) {
                  document.querySelectorAll('h1, h2, h3,heading1').forEach((heading) => {
                      const orgTextDecoration = window.getComputedStyle(heading).getPropertyValue('text-decoration');
                      const orgHighlightColor = window.getComputedStyle(heading).getPropertyValue('color');
                      heading.setAttribute('data-asw-orgHighlightTextDecoration', orgTextDecoration)
                      heading.setAttribute('data-asw-orgHighlightColor', orgHighlightColor);
                      heading.style.color = '#ff0000';
                      heading.style.textDecoration = 'underline';
                  });
      
                  localStorage.setItem('isHighlightHeadings', 1);
              } else {
                  document.querySelectorAll('h1, h2, h3,heading1').forEach((heading) => {
                      const orgTextDecoration = heading.getAttribute('data-asw-orgHighlightTextDecoration');
                      const orgHighlightColor = heading.getAttribute('data-asw-orgHighlightColor');
                      heading.style.textDecoration = orgTextDecoration;
                      heading.style.color = orgHighlightColor;
                  });
      
                  localStorage.setItem('isHighlightHeadings', 0);
              }
          }
      
      
          function adjustLineHeight(increment = 0) {
              let isLineHeightEnabled = parseInt(localStorage.getItem('isLineHeightEnabled'));
              if(!increment)
              {
                  isLineHeightEnabled = !isLineHeightEnabled;
                  increment = 1;
              }
              if (!isLineHeightEnabled) {
                  document
                      .querySelectorAll("*")
                      .forEach((el) => {
                          if (!el.classList.contains('material-icons')) {
                              let orgLineHeight = el.getAttribute('data-asw-orgLineHeight');
      
                              if (!orgLineHeight) {
                                  orgLineHeight = el.style['line-height'];
                                  el.setAttribute('data-asw-orgLineHeight', orgLineHeight);
                                  if (!orgLineHeight) {
                                      orgLineHeight = 1.1;
                                  }
                                  orgLineHeight = parseFloat(orgLineHeight);
                                  let newLineHeight = orgLineHeight + increment;
                                  el.style['line-height'] = newLineHeight;
                              }
                          }
                      });
      
                  localStorage.setItem('isLineHeightEnabled', 1);
              } else {
                  document
                      .querySelectorAll("*")
                      .forEach((el) => {
                          if (!el.classList.contains('material-icons')) {
                              let orgLineHeight = el.getAttribute('data-asw-orgLineHeight');
                              if (orgLineHeight) {
                                  el.style['line-height'] = orgLineHeight;
                                  el.removeAttribute('data-asw-orgLineHeight');
                              }
                              else{
                                  el.style.removeProperty('line-height');
                              }
      
                          }
                      });
      
                  localStorage.setItem('isLineHeightEnabled', 0);
              }
          }
      
          function adjustFontWeight(increment = 100) {
              let isFontWeightEnabled = parseInt(localStorage.getItem('isFontWeightEnabled'));
              if (increment === 100) {
                  isFontWeightEnabled = !isFontWeightEnabled;
                  increment = 400;
              }
              if (!isFontWeightEnabled) {
                  document
                  .querySelectorAll("*")
                  .forEach((el) => {
                      if (!el.classList.contains('material-icons')) {
                      let orgBoldFontWeight = window.getComputedStyle(el).getPropertyValue('--org-bold-font-weight');
                      if (!orgBoldFontWeight) {
                          orgBoldFontWeight = window.getComputedStyle(el).getPropertyValue('font-weight');
                          el.style.setProperty('--org-bold-font-weight', orgBoldFontWeight);
                      }
                      let newFontWeight = parseInt(orgBoldFontWeight) + increment;
                      el.style.setProperty('font-weight', newFontWeight);
                      }
                  });
                  localStorage.setItem('isFontWeightEnabled', 1);
              } else {
                  document
                  .querySelectorAll("*")
                  .forEach((el) => {
                      if (!el.classList.contains('material-icons')) {
                      let orgBoldFontWeight = window.getComputedStyle(el).getPropertyValue('--org-bold-font-weight');
                      if (orgBoldFontWeight) {
                          el.style['font-weight']= orgBoldFontWeight;
                      } else {
                          el.style.removeProperty('font-weight');
                      }
                      el.style.removeProperty('--org-bold-font-weight');
                      }
                  });
                  localStorage.setItem('isFontWeightEnabled', 0);
              }
              }
      
          function adjustContrast(load = false) {
              let isContrastEnabled = parseInt(localStorage.getItem('isContrastEnabled'));
              if(load)
              {
                  isContrastEnabled = !isContrastEnabled;
              }
              if (!isContrastEnabled) {
                  document
                  .querySelectorAll("*")
                  .forEach((el) => {
                      let orgColor = el.getAttribute('data-asw-orgContrastColor');
                      let orgBgColor = el.getAttribute('data-asw-orgContrastBgColor');
      
                      if (!orgColor) {
                          orgColor = el.style.color;
                          el.setAttribute('data-asw-orgContrastColor', orgColor);
                      }
                      if(!orgBgColor) {
                          orgBgColor = window.getComputedStyle(el).getPropertyValue('background-color');
                          el.setAttribute('data-asw-orgContrastBgColor', orgBgColor);
                      }
      
                      el.style["color"] = '#ffff00';
                      el.style["background-color"] = '#000';
                  });
      
                  localStorage.setItem('isContrastEnabled', 1);
                  } else {
                      document
                      .querySelectorAll("*")
                      .forEach((el) => {
                          let orgContrastColor = el.getAttribute('data-asw-orgContrastColor');
                          let orgContrastBgColor = el.getAttribute('data-asw-orgContrastBgColor');
                          if (orgContrastColor) {
                          el.style.color = orgContrastColor;
                          } else {
                          el.style.removeProperty('color');
                          }
                          if (orgContrastBgColor) {
                          el.style.backgroundColor = orgContrastBgColor;
                          } else {
                          el.style.removeProperty('background-color');
                          }
                          el.removeAttribute('data-asw-orgContrastColor');
                          el.removeAttribute('data-asw-orgContrastBgColor');
                      });
                  localStorage.setItem('isContrastEnabled', 0);
              }
              }
              function onPageLoad() {
                adjustFontSize();
                adjustLetterSpacing();
                enableDyslexicFont(true);
                enableBigCursor(true);
                enableHighlightLinks(true);
                enableHighlightHeadings(true);
                adjustLineHeight();
                adjustFontWeight();
                adjustContrast(true);
                adjustSaturation('default'); // Set default saturation
                adjustBrightness('medium'); // Set default brightness
                toggleReadingMode(false);
            }
            
            function reset() {
                localStorage.clear();
                onPageLoad();
            }
            
            onPageLoad();