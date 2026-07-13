'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  FaIdCard, FaArchive, FaTags, FaFolderOpen, FaBars, FaTimes,
} from 'react-icons/fa';
import { siteConfig } from '@/lib/siteConfig';

interface Props {
  isVisible?: boolean;
}

// The logo already links home, so there is no separate Home item.
const NAV_ITEMS = [
  { href: '/about',      Icon: FaIdCard,     en: 'About',      zh: '關於' },
  { href: '/archives',   Icon: FaArchive,    en: 'Archives',   zh: '歸檔' },
  { href: '/categories', Icon: FaFolderOpen, en: 'Categories', zh: '分類' },
  { href: '/tags',       Icon: FaTags,       en: 'Tags',       zh: '標籤' },
] as const;

export default function HomeNavBar({ isVisible = true }: Props) {
  const { language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navbarClass =
    scrollY > 100
      ? 'bg-amber-50/95 dark:bg-[#202521]/95 backdrop-blur-md border-b-2 border-zinc-900 dark:border-[#3c463f]'
      : 'bg-amber-50/80 dark:bg-[#202521]/80 backdrop-blur-md border-b-2 border-transparent';

  const textColorClass = 'text-zinc-900 dark:text-[#f4f1e8]';

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const L = (en: string, zh: string) => language === 'en' ? en : zh;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${navbarClass}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className={`font-bold text-lg tracking-wider transition-all duration-200 hover:text-pink-500 dark:hover:text-teal-300 hover:translate-x-0.5 ${textColorClass}`}
          >
            {siteConfig.name.toUpperCase()}
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map(({ href, Icon, en, zh }) => (
              <li key={href}>
                <Link href={href} className={`group flex items-center gap-2 font-bold transition-colors duration-300 ${textColorClass} hover:text-pink-500 dark:hover:text-teal-300`}>
                  <Icon className="transition-transform duration-200 group-hover:scale-110" size={16} />
                  <span className="text-sm font-medium">{L(en, zh)}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 hover:text-pink-500 dark:hover:text-teal-300 ${textColorClass}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-amber-50 dark:bg-[#202521] border-b-2 border-zinc-900 dark:border-[#3c463f] shadow-[0_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_0px_0px_rgba(244,241,232,0.1)]">
            <ul className="px-6 py-4 space-y-3">
              {NAV_ITEMS.map(({ href, Icon, en, zh }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center gap-3 py-2 font-bold text-zinc-900 dark:text-[#f4f1e8] hover:text-pink-500 dark:hover:text-teal-300 transition-colors"
                  >
                    <Icon className="group-hover:scale-110 transition-transform duration-200" size={16} />
                    <span className="font-medium">{L(en, zh)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
