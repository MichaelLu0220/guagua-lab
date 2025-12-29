import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/siteConfig';
import ClientHomePage from '@/components/ClientHomePage';

// ============================================
// 首頁 SEO Metadata
// ============================================

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name, // 首頁不套用 template
  },
  description: siteConfig.description.zh,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description.zh,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'zh_TW',
    images: [
      {
        url: `${siteConfig.url}${siteConfig.defaultOgImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

// ============================================
// 首頁元件
// ============================================

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      {/* JSON-LD 結構化資料 - 網站資訊 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: siteConfig.name,
            description: siteConfig.description.zh,
            url: siteConfig.url,
            author: {
              '@type': 'Person',
              name: siteConfig.author.name,
              url: siteConfig.author.github,
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: `${siteConfig.url}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      
      <ClientHomePage posts={posts} />
    </>
  );
}
