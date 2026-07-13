'use client';

import { useEffect, useState } from 'react';
import HomeNavBar from '@/components/HomeNavBar';
import { FaArrowUp } from 'react-icons/fa';

interface NavBarProps {
  showScrollTop?: boolean;
}

export default function NavBar({ showScrollTop = true }: NavBarProps) {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setIsVisible(currentScrollY < lastScrollY);
      } else {
        setIsVisible(true);
      }

      if (showScrollTop) {
        setScrollTopVisible(currentScrollY > 600);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, showScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <HomeNavBar isVisible={isVisible} />

      {showScrollTop && scrollTopVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-7 right-20 z-50 bg-pink-500 dark:bg-teal-600 text-white p-3 border-2 border-zinc-900 dark:border-[#f4f1e8] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,241,232,0.25)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(244,241,232,0.25)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={16} />
        </button>
      )}
    </>
  );
}
