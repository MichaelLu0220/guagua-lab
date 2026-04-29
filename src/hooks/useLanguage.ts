'use client';
import { useEffect, useState } from 'react';
import { detectBrowserLanguage } from '@/utils/languageDetector';

export function useLanguage() {
  const [language, setLanguage] = useState<'en' | 'zh'>('zh');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = detectBrowserLanguage();
    setLanguage(saved);
    setMounted(true);

    const handler = (e: CustomEvent<'en' | 'zh'>) => setLanguage(e.detail);
    window.addEventListener('languageChange', handler as EventListener);
    return () => window.removeEventListener('languageChange', handler as EventListener);
  }, []);

  const changeLanguage = (lang: 'en' | 'zh') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
  };

  return { language, changeLanguage, mounted };
}
