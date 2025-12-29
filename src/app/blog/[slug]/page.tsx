import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { 
  getPostBySlug, 
  getAllPostSlugs, 
  getLocalizedText,
  getAdjacentPosts 
} from '@/lib/posts';
import { siteConfig } from '@/lib/siteConfig';
import BlogClientContent from './BlogClientContent';

// ============================================
// 靜態路徑生成（SSG 優化）
// ============================================

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(slug => ({ slug }));
}

// ============================================
// 動態 SEO Metadata
// ============================================

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: '文章不存在',
      description: '找不到您要的文章',
    };
  }

  // 取得本地化標題和描述
  const title = getLocalizedText(post.title, 'zh');
  const description = getLocalizedText(post.description, 'zh') || 
    `閱讀 ${title} - ${siteConfig.name}`;

  // 文章 URL
  const url = `${siteConfig.url}/blog/${slug}`;

  return {
    title, // 會自動套用 layout 的 template: "%s | GuaGua's Blog"
    description,
    keywords: post.tags,
    
    // Open Graph（Facebook、LINE 等）
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [siteConfig.author.name],
      tags: post.tags,
      locale: 'zh_TW',
      images: [
        {
          url: `${siteConfig.url}${siteConfig.defaultOgImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteConfig.url}${siteConfig.defaultOgImage}`],
    },
    
    // Canonical URL（避免重複內容問題）
    alternates: {
      canonical: url,
    },
  };
}

// ============================================
// 頁面元件
// ============================================

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  // 取得上下篇文章
  const { prev, next } = getAdjacentPosts(slug);

  // Server-side 渲染 MDX
  const mdxContent = <MDXRemote source={post.content} />;

  return (
    <>
      {/* JSON-LD 結構化資料（幫助 Google 理解文章內容） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: getLocalizedText(post.title, 'zh'),
            description: getLocalizedText(post.description, 'zh'),
            datePublished: post.date,
            dateModified: post.date,
            author: {
              '@type': 'Person',
              name: siteConfig.author.name,
              url: siteConfig.author.github,
            },
            publisher: {
              '@type': 'Person',
              name: siteConfig.author.name,
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${siteConfig.url}/blog/${slug}`,
            },
            keywords: post.tags?.join(', '),
          }),
        }}
      />
      
      <BlogClientContent
        slug={slug}
        postData={{
          title: post.title,
          description: post.description,
          date: post.date,
          category: post.categories,
          tags: post.tags,
          content: post.content,
          readingTime: post.readingTime,
        }}
        mdxContent={mdxContent}
        prevPost={prev ? { slug: prev.slug, title: prev.title } : null}
        nextPost={next ? { slug: next.slug, title: next.title } : null}
      />
    </>
  );
}