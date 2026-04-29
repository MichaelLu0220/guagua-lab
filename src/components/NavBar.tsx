'use client';

import { useEffect, useState } from 'react';
import HomeNavBar from '@/components/HomeNavBar';
import { FaArrowUp } from 'react-icons/fa';

export default function NavBar() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setIsVisible(currentScrollY < lastScrollY);
      } else {
        setIsVisible(true);
      }

      setShowScrollTop(currentScrollY > 600);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <HomeNavBar styleVariant="default" isVisible={isVisible} />

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-7 right-20 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={16} />
        </button>
      )}
    </>
  );
}
