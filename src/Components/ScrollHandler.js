import { useState, useEffect } from 'react';

const useScrollVisibility = () => {
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    let scrollPosition = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      setVisible(scrollPosition > currentScrollPosition || currentScrollPosition < 10);
      scrollPosition = currentScrollPosition;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isVisible;
};

export default useScrollVisibility;
