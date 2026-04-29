'use client';

import Link from 'next/link';
import NavBar from '@/components/NavBar';
import ThemeToggle from '@/components/ThemeToggle';
import { PostMeta } from '@/lib/posts';
import { useLanguage } from '@/hooks/useLanguage';

interface Props {
  posts: PostMeta[];
  tag: string;
}

export default function TagDetailClient({ posts, tag }: Props) {
  const { language, mounted } = useLanguage();

  const cap = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

  const getText = (text: string | { en: string; zh: string } | undefined): string => {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return text[language] ?? text.en ?? '';
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <NavBar />

      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="w-[40rem] h-[40rem] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl mx-auto -mt-32" />
      </div>

      <main className="max-w-3xl mx-auto pt-32 pb-24 px-6 animate-fade-in">
        <h1 className="text-4xl font-bold mb-10 border-b border-gray-300 dark:border-gray-700 pb-3">
          {language === 'zh' ? '標籤' : 'Tag'}：{cap(tag)}
        </h1>

        <ul className="space-y-6">
          {posts.map(post => (
            <li key={post.slug} className="border-b pb-4 border-gray-200 dark:border-gray-700">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  {getText(post.title)}
                </h2>
              </Link>
              <p className="text-gray-500 text-sm">{post.date}</p>
              {post.description && (
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {getText(post.description)}
                </p>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link href="/tags" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
            ← {language === 'zh' ? '返回所有標籤' : 'Back to all tags'}
          </Link>
        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>

    </div>
  );
}
