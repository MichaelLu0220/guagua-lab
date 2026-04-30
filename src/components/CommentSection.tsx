'use client';

import { useEffect, useState } from 'react';
import Giscus from '@giscus/react';

export default function CommentSection() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  const [hasInteracted, setHasInteracted] = useState(false);

  // theme 同步
  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // 語言同步
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<'en' | 'zh'>) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);

    const savedLanguage = localStorage.getItem('language') as 'en' | 'zh' | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'zh' ? '留言討論' : 'Comments'}
        </h2>
      </div>

      <div onClick={() => setHasInteracted(true)}>
        <Giscus
          key={`${theme}-${language}`}
          repo="MichaelLu0220/guagua-lab"
          repoId="R_kgDOPWLGQg"
          category="Announcements"
          categoryId="DIC_kwDOPWLGQs4C8Cbr"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={theme}
          lang={language === 'zh' ? 'zh-TW' : 'en'}
          loading="lazy"
        />
      </div>
    </section>
  );
}