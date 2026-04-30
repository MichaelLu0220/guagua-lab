// utils/languageDetector.ts
//
// Site default is English (drives <html lang>, SEO metadata, OG tags, JSON-LD).
// On the client, however, we auto-flip to Chinese for visitors whose browser
// language family is Chinese — so a Taiwanese / HK / mainland reader does not
// have to manually toggle on every visit.
//
// Resolution order:
//   1. localStorage 'language'  — returning visitor, honor their choice
//   2. navigator.languages      — first-time visitor, sniff browser language
//   3. fall through to 'en'

export function detectBrowserLanguage(): 'en' | 'zh' {
  // SSR-safe: server has no navigator/localStorage
  if (typeof window === 'undefined') {
    return 'en';
  }

  const savedLanguage = localStorage.getItem('language') as 'en' | 'zh' | null;
  if (savedLanguage) {
    return savedLanguage;
  }

  const browserLanguages = navigator.languages || [navigator.language];
  const hasChineseLang = browserLanguages.some(lang => {
    const lowerLang = (lang || '').toLowerCase();
    return lowerLang.includes('zh') ||
           lowerLang.includes('chinese') ||
           lowerLang.includes('cn') ||
           lowerLang.includes('tw') ||
           lowerLang.includes('hk');
  });

  const detectedLanguage: 'en' | 'zh' = hasChineseLang ? 'zh' : 'en';

  // Persist the detection so subsequent visits skip the sniff and avoid the
  // brief EN → ZH flicker on Chinese-browser visitors.
  localStorage.setItem('language', detectedLanguage);
  return detectedLanguage;
}

export function initializeLanguage(): 'en' | 'zh' {
  const language = detectBrowserLanguage();

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('languageChange', { detail: language }));
  }

  return language;
}
