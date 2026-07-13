'use client';
import { useEffect, useState } from 'react';
import { detectBrowserLanguage } from '@/utils/languageDetector';

export function useLanguage() {
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
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
    // 同步 <html lang>，讓 CSS 驅動的 .language-content 雙語切換跟著生效
    document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
  };

  return { language, changeLanguage, mounted };
}
