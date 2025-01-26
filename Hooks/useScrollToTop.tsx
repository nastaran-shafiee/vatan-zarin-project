// @mui
import { useEffect, useRef, useState } from 'react';

// ----------------------------------------------------------------------

export default function useScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const prevScrollPos = useRef(0);
  useEffect(() => {
    const toggleVisibility = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > 250 && currentScrollPos > prevScrollPos.current) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      prevScrollPos.current = currentScrollPos;
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [isVisible]);
  return { isVisible };
}
