import React, { createContext, useContext, useEffect, useState } from 'react';

interface MotionContextType {
  isReducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const MotionContext = createContext<MotionContextType>({
  isReducedMotion: false,
  toggleReducedMotion: () => {},
});

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check localStorage preference first
    const saved = localStorage.getItem('kafeco_reduced_motion');
    if (saved !== null) {
      setIsReducedMotion(saved === 'true');
      if (saved === 'true') {
        document.documentElement.classList.add('reduced-motion');
      }
      return;
    }

    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      document.documentElement.classList.add('reduced-motion');
    }

    const handler = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (e.matches) {
        document.documentElement.classList.add('reduced-motion');
      } else {
        document.documentElement.classList.remove('reduced-motion');
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleReducedMotion = () => {
    setIsReducedMotion((prev) => {
      const next = !prev;
      localStorage.setItem('kafeco_reduced_motion', String(next));
      if (next) {
        document.documentElement.classList.add('reduced-motion');
      } else {
        document.documentElement.classList.remove('reduced-motion');
      }
      return next;
    });
  };

  return (
    <MotionContext.Provider value={{ isReducedMotion, toggleReducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
};

export const useMotion = () => useContext(MotionContext);
