'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  FaHome, FaIdCard, FaArchive, FaTags, FaBars, FaTimes,
  FaChartLine, FaWrench, FaChevronDown, FaSuitcase,
} from 'react-icons/fa';
import { getAllChecklists } from '@/lib/checklists';
import { pickString } from '@/lib/checklists/types';

interface Props {
  styleVariant?: 'home' | 'default';
  isVisible?: boolean;
}

const NAV_ITEMS = [
  { href: '/',         Icon: FaHome,    en: 'Home',     zh: '首頁' },
  { href: '/about',    Icon: FaIdCard,  en: 'About',    zh: '關於' },
  { href: '/archives', Icon: FaArchive, en: 'Archives', zh: '歸檔' },
  { href: '/tags',     Icon: FaTags,    en: 'Tags',     zh: '標籤' },
] as const;

const TOOLS = [
  { href: '/equity', Icon: FaChartLine, en: 'TW Stock Backtest', zh: '台股回測' },
] as const;

export default function HomeNavBar({ styleVariant = 'default', isVisible = true }: Props) {
  const { language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [checklistsOpen, setChecklistsOpen] = useState(false);
  const [mobileChecklistsOpen, setMobileChecklistsOpen] = useState(false);
  const checklists = getAllChecklists();

  const navbarClass =
    styleVariant === 'home'
      ? scrollY > 100
        ? 'bg-gray-900/90 backdrop-blur-md border-b border-gray-700/50 shadow-lg'
        : 'bg-gray-900/20 backdrop-blur-md border-b border-gray-700/30'
      : scrollY > 100
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg'
        : 'bg-white/80 dark:bg-gray-900/20 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-700/30';

  const textColorClass = styleVariant === 'home'
    ? 'text-white'
    : scrollY > 100
      ? 'text-gray-800 dark:text-white'
      : 'text-gray-900 dark:text-white';

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
          <Link href="/" className={`font-bold text-lg tracking-wider transition-all duration-300 hover:text-blue-400 ${textColorClass}`}>
            GUAGUA&apos;S BLOG
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map(({ href, Icon, en, zh }) => (
              <li key={href}>
                <Link href={href} className={`group flex items-center gap-2 transition-colors duration-300 ${textColorClass} hover:text-blue-500`}>
                  <Icon className="transition-transform duration-200 group-hover:scale-110" size={16} />
                  <span className="text-sm font-medium">{L(en, zh)}</span>
                </Link>
              </li>
            ))}

            {/* Checklists dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setChecklistsOpen(true)}
              onMouseLeave={() => setChecklistsOpen(false)}
            >
              <Link
                href="/checklist"
                className={`group flex items-center gap-2 transition-colors duration-300 ${textColorClass} hover:text-blue-500`}
              >
                <FaSuitcase className="transition-transform duration-200 group-hover:scale-110" size={15} />
                <span className="text-sm font-medium">{L('Checklists', '清單')}</span>
                <FaChevronDown
                  size={10}
                  className={`transition-transform duration-200 ${checklistsOpen ? 'rotate-180' : ''}`}
                />
              </Link>

              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-56 z-50 transition-all duration-200 ${
                checklistsOpen
                  ? 'opacity-100 pointer-events-auto translate-y-0'
                  : 'opacity-0 pointer-events-none -translate-y-1'
              }`}>
                <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 p-1.5">
                  <Link
                    href="/checklist"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-300 transition-colors text-sm font-medium group/item"
                  >
                    <span className="inline-flex items-center justify-center w-5 shrink-0">
                      <FaSuitcase size={14} className="transition-transform duration-200 group-hover/item:scale-110" />
                    </span>
                    <span className="whitespace-nowrap">{L('All checklists', '所有清單')}</span>
                  </Link>
                  <div className="my-1 h-px bg-gray-200 dark:bg-gray-700" />
                  {checklists.map(c => (
                    <Link
                      key={c.slug}
                      href={`/checklist/${c.slug}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-300 transition-colors text-sm font-medium"
                    >
                      <span className="inline-flex items-center justify-center w-5 shrink-0 text-base leading-none">
                        {c.emoji}
                      </span>
                      <span className="whitespace-nowrap">
                        {pickString(c.shortTitle ?? c.title, language)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* Tools dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button className={`group flex items-center gap-2 transition-colors duration-300 ${textColorClass} hover:text-blue-500`}>
                <FaWrench className="transition-transform duration-200 group-hover:scale-110" size={15} />
                <span className="text-sm font-medium">{L('Tools', '工具')}</span>
                <FaChevronDown
                  size={10}
                  className={`transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown panel */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-52 z-50 transition-all duration-200 ${
                toolsOpen
                  ? 'opacity-100 pointer-events-auto translate-y-0'
                  : 'opacity-0 pointer-events-none -translate-y-1'
              }`}>
                <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 p-1.5">
                  {TOOLS.map(({ href, Icon, en, zh }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-800 dark:text-gray-100 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors text-sm font-medium group/item"
                    >
                      <Icon size={14} className="transition-transform duration-200 group-hover/item:scale-110" />
                      <span>{L(en, zh)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 hover:text-blue-400 ${textColorClass}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg">
            <ul className="px-6 py-4 space-y-3">
              {NAV_ITEMS.map(({ href, Icon, en, zh }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center gap-3 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <Icon className="group-hover:scale-110 transition-transform duration-200" size={16} />
                    <span className="font-medium">{L(en, zh)}</span>
                  </Link>
                </li>
              ))}

              {/* Mobile Checklists section */}
              <li>
                <button
                  onClick={() => setMobileChecklistsOpen(!mobileChecklistsOpen)}
                  className="group flex items-center justify-between w-full py-2 text-gray-300 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FaSuitcase className="group-hover:scale-110 transition-transform duration-200" size={16} />
                    <span className="font-medium">{L('Checklists', '清單')}</span>
                  </div>
                  <FaChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${mobileChecklistsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileChecklistsOpen && (
                  <ul className="pl-8 mt-2 space-y-2">
                    <li>
                      <Link
                        href="/checklist"
                        onClick={() => { setMobileMenuOpen(false); setMobileChecklistsOpen(false); }}
                        className="flex items-center gap-3 py-1.5 text-blue-300 hover:text-blue-100 transition-colors text-sm"
                      >
                        <span className="inline-flex items-center justify-center w-5 shrink-0">
                          <FaSuitcase size={14} />
                        </span>
                        <span>{L('All checklists', '所有清單')}</span>
                      </Link>
                    </li>
                    {checklists.map(c => (
                      <li key={c.slug}>
                        <Link
                          href={`/checklist/${c.slug}`}
                          onClick={() => { setMobileMenuOpen(false); setMobileChecklistsOpen(false); }}
                          className="flex items-center gap-3 py-1.5 text-blue-300 hover:text-blue-100 transition-colors text-sm"
                        >
                          <span className="inline-flex items-center justify-center w-5 shrink-0 text-base leading-none">
                            {c.emoji}
                          </span>
                          <span>{pickString(c.shortTitle ?? c.title, language)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Mobile Tools section */}
              <li>
                <button
                  onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                  className="group flex items-center justify-between w-full py-2 text-gray-300 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FaWrench className="group-hover:scale-110 transition-transform duration-200" size={16} />
                    <span className="font-medium">{L('Tools', '工具')}</span>
                  </div>
                  <FaChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${mobileToolsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileToolsOpen && (
                  <ul className="pl-8 mt-2 space-y-2">
                    {TOOLS.map(({ href, Icon, en, zh }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={() => { setMobileMenuOpen(false); setMobileToolsOpen(false); }}
                          className="group flex items-center gap-3 py-1.5 text-indigo-300 hover:text-indigo-100 transition-colors text-sm"
                        >
                          <Icon className="group-hover:scale-110 transition-transform duration-200" size={14} />
                          <span>{L(en, zh)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
