import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ============================================
// 類型定義
// ============================================

export interface PostMeta {
  title: string | { en: string; zh: string };
  date: string;
  description?: string | { en: string; zh: string };
  categories?: string;
  tags?: string[];
  slug: string;
}

export interface PostWithContent extends PostMeta {
  content: string;
  readingTime: number;
}

// ============================================
// 核心函式
// ============================================

const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * 取得所有文章的 metadata（不含內容）
 */
export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
  
  return files
    .map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      return {
        title: data.title || filename.replace(/\.mdx$/, ''),
        date: typeof data.date === 'string' ? data.date : String(data.date),
        description: data.description || '',
        categories: data.categories || '',
        tags: data.tags || [],
        slug: filename.replace(/\.mdx$/, ''),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * 取得所有文章的 slug（用於 generateStaticParams）
 */
export function getAllPostSlugs(): string[] {
  const files = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
  return files.map(file => file.replace(/\.mdx$/, ''));
}

/**
 * 根據 slug 取得單篇文章（含內容）
 */
export function getPostBySlug(slug: string): PostWithContent | null {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  // 計算閱讀時間（中文約 400 字/分鐘，英文約 200 字/分鐘）
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  
  return {
    title: data.title || slug,
    date: typeof data.date === 'string' ? data.date : String(data.date),
    description: data.description || '',
    categories: data.categories || '',
    tags: data.tags || [],
    slug,
    content,
    readingTime,
  };
}

/**
 * 取得相鄰文章（上一篇、下一篇）
 */
export function getAdjacentPosts(currentSlug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  
  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
}

/**
 * 取得所有分類
 */
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map(post => post.categories).filter(Boolean));
  return Array.from(categories) as string[];
}

/**
 * 取得所有標籤
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap(post => post.tags || []));
  return Array.from(tags);
}

// ============================================
// SEO 輔助函式
// ============================================

/**
 * 取得本地化文字（用於 SEO metadata）
 */
export function getLocalizedText(
  text: string | { en: string; zh: string } | undefined,
  lang: 'en' | 'zh' = 'zh'
): string {
  if (!text) return '';
  if (typeof text === 'string') return text;
  return text[lang] || text.zh || text.en || '';
}
