import type { Metadata, Viewport } from 'next';
import { siteConfig, defaultSEO } from '@/lib/siteConfig';
import './globals.css';

// ============================================
// Global metadata
// ============================================

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: defaultSEO.title,
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
  authors: defaultSEO.authors,
  creator: defaultSEO.creator,
  openGraph: defaultSEO.openGraph,
  twitter: defaultSEO.twitter,
  robots: defaultSEO.robots,
  icons: {
    icon: '/favicon.ico',
  },
  // Google Search Console verification (optional)
  // verification: {
  //   google: 'your-verification-code',
  // },
};

// ============================================
// Viewport
// ============================================

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
};

// ============================================
// Root Layout
// ============================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Applies dark mode and the detected language to <html> BEFORE first paint,
  // so there is no flash and bilingual content renders in the right language
  // immediately. suppressHydrationWarning on <html> covers both attributes.
  // 首次繪製前套用主題與語言，避免閃爍。
  const bootstrapScript = `(function(){try{
var t=localStorage.getItem('theme');
if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark');
var l=localStorage.getItem('language');
if(l!=='en'&&l!=='zh'){var s=(navigator.languages||[navigator.language||'']).join(',').toLowerCase();l=/zh|chinese|cn|tw|hk/.test(s)?'zh':'en';localStorage.setItem('language',l);}
document.documentElement.lang=l==='zh'?'zh-TW':'en';
}catch(e){}})();`;

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-black text-gray-800 dark:text-gray-100">
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
        {children}
      </body>
    </html>
  );
}
