// ============================================
// Site configuration — edit everything here first!
// 網站設定 — 從這個檔案開始客製化你的網站
// ============================================

export const siteConfig = {
  // Basic info 基本資訊
  name: "My Blog",
  url: 'https://example.com', // ⚠️ Change to your domain 請改成你的網域

  // SEO description
  description: {
    zh: '分享技術、生活與思考的個人部落格',
    en: 'A personal blog sharing tech insights, life stories, and thoughts',
  },

  // Author info 作者資訊
  author: {
    name: 'Your Name',
    alias: 'your alias', // shown under your name in the sidebar 側欄暱稱
    github: 'https://github.com/your-username',
    avatar: '/images/avatar.png', // sidebar / about page avatar 頭像
  },

  // Homepage hero 首頁主視覺
  hero: {
    badge: 'TECH · LIFE · STORIES',
    // Two-line two-tone title 兩行雙色標題
    title: { line1: 'My', line2: 'Blog' },
    subtitle: {
      en: 'Notes on life, and lessons learned along the way.',
      zh: '記錄生活，以及一路上的所學所想。',
    },
    photoCaption: 'Hello there ✦',
    stickyNote: { en: 'Welcome!', zh: '歡迎來坐坐！' },
  },

  // Default Open Graph image (1200 x 630 px recommended)
  // 社群分享預設圖片
  defaultOgImage: '/images/og-default.png',

  // giscus comments (https://giscus.app) — leave repo empty to hide comments
  // giscus 留言設定 — repo 留空則不顯示留言區
  giscus: {
    repo: '',        // e.g. 'your-username/your-repo'
    repoId: '',
    category: 'Announcements',
    categoryId: '',
  },

  // Language 語言設定
  defaultLocale: 'en',
  locales: ['en', 'zh-TW'],

  // Keywords 關鍵字
  keywords: ['Blog', 'Web Development', 'Next.js', 'React'],
};

// ============================================
// SEO defaults（一般不需要改動）
// ============================================

export const defaultSEO = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description.en,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  openGraph: {
    type: 'website',
    locale: siteConfig.defaultLocale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.defaultOgImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description.en,
    images: [`${siteConfig.url}${siteConfig.defaultOgImage}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
};
