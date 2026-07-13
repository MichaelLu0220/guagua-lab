'use client';

import { useEffect, useState } from 'react';
import Giscus from '@giscus/react';
import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/lib/siteConfig';

// giscus comments (GitHub Discussions based).
// Configure your repo at https://giscus.app, then fill in
// siteConfig.giscus — the section stays hidden until configured.
// 到 https://giscus.app 取得設定值填入 siteConfig.giscus，留空則不顯示留言區。
export default function CommentSection() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { language } = useLanguage();
  const { giscus } = siteConfig;

  // Keep giscus theme in sync with the site's .dark class
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

  if (!giscus.repo || !giscus.repoId || !giscus.categoryId) return null;

  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'zh' ? '留言討論' : 'Comments'}
        </h2>
      </div>

      <Giscus
        key={`${theme}-${language}`}
        repo={giscus.repo as `${string}/${string}`}
        repoId={giscus.repoId}
        category={giscus.category}
        categoryId={giscus.categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme}
        lang={language === 'zh' ? 'zh-TW' : 'en'}
        loading="lazy"
      />
    </section>
  );
}
