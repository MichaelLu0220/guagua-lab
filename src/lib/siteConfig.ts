// ============================================
// 網站設定 - 請根據你的需求修改
// ============================================

export const siteConfig = {
  // 基本資訊
  name: "GuaGua's Blog",
  url: 'https://newblogpage.vercel.app', // ⚠️ 請改成你的網域
  
  // SEO 描述
  description: {
    zh: '分享技術、生活與思考的個人部落格',
    en: 'A personal blog sharing tech insights, life stories, and thoughts',
  },
  
  // 作者資訊
  author: {
    name: 'GuaGua',
    github: 'https://github.com/MichaelLu0220',
    // email: 'your-email@example.com', // 選填
  },
  
  // 社群分享預設圖片（Open Graph）
  // 建議尺寸：1200 x 630 px
  defaultOgImage: '/images/og-default.png', // ⚠️ 請確保此圖片存在
  
  // 語言設定
  defaultLocale: 'zh-TW',
  locales: ['zh-TW', 'en'],
  
  // 關鍵字
  keywords: ['技術部落格', 'Web 開發', 'Next.js', 'React', '程式設計', 'GuaGua'],
};

// ============================================
// SEO 預設值
// ============================================

export const defaultSEO = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description.zh,
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
    description: siteConfig.description.zh,
    images: [`${siteConfig.url}${siteConfig.defaultOgImage}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
