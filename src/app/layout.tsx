import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { siteConfig, defaultSEO } from '@/lib/siteConfig';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// ============================================
// 全站 Metadata
// ============================================

export const metadata: Metadata = {
  // 基本設定
  metadataBase: new URL(siteConfig.url),
  title: defaultSEO.title,
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
  authors: defaultSEO.authors,
  creator: defaultSEO.creator,
  
  // Open Graph
  openGraph: defaultSEO.openGraph,
  
  // Twitter Card
  twitter: defaultSEO.twitter,
  
  // 搜尋引擎
  robots: defaultSEO.robots,
  
  // 其他
  icons: {
    icon: '/favicon.ico',
    // apple: '/apple-touch-icon.png', // 如果有的話
  },
  
  // 驗證碼（選填，之後可加）
  verification: {
    google: 'aTHCEHwFVaXqLVBna0PXjqGfh6OfZeBVyi-or3b6fRk',
  },
};

// ============================================
// Viewport 設定（Next.js 14+ 分離）
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
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-gray-800 dark:text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
