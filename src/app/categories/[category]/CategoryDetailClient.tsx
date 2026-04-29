'use client';

import Link from 'next/link';
import NavBar from '@/components/NavBar';
import ThemeToggle from '@/components/ThemeToggle';
import { PostMeta } from '@/lib/posts';
import { useLanguage } from '@/hooks/useLanguage';

interface Props {
  posts: PostMeta[];
  categoryName: string;
}

export default function CategoryDetailClient({ posts, categoryName }: Props) {
  const { language, mounted } = useLanguage();

  const cap = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

  const getText = (text: string | { en: string; zh: string }) => {
    return typeof text === 'string' ? text : text[language] ?? text.en;
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <NavBar />

      {/* 背景裝飾 */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="w-[40rem] h-[40rem] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl mx-auto -mt-32" />
      </div>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 animate-fade-in">
        <h1 className="text-4xl font-bold mb-10 border-b border-gray-300 dark:border-gray-700 pb-3">
          {language === 'en' ? 'Category' : '分類'}：{cap(categoryName)}
        </h1>

        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {getText(post.title)}
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>

    </div>
  );
}
