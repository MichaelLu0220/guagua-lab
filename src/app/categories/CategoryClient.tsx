'use client';

import Link from 'next/link';
import { FaFolderOpen, FaArrowRight } from 'react-icons/fa';
import NavBar from '@/components/NavBar';
import ThemeToggle from '@/components/ThemeToggle';
import { PostMeta } from '@/lib/posts';
import { useLanguage } from '@/hooks/useLanguage';

interface Props {
  posts: PostMeta[];
}

export default function CategoryClient({ posts }: Props) {
  const { language } = useLanguage();

  const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

  const categoryMap: Record<string, PostMeta[]> = {};
  posts.forEach(post => {
    const category = post.categories || 'Uncategorized';
    (categoryMap[category] ??= []).push(post);
  });
  const categories = Object.entries(categoryMap).sort((a, b) => b[1].length - a[1].length);

  return (
    <div className="relative min-h-screen bg-amber-50 dark:bg-[#202521] text-zinc-900 dark:text-[#f4f1e8] transition-colors duration-300">
      <NavBar />

      {/* 裝飾色塊 */}
      <div className="absolute top-28 right-[10%] w-12 h-12 bg-cyan-400 dark:bg-teal-700 border-2 border-zinc-900 dark:border-[#f4f1e8] -rotate-6 hidden md:block" aria-hidden="true" />
      <div className="absolute top-48 right-[18%] w-6 h-6 bg-yellow-300 dark:bg-amber-400 border-2 border-zinc-900 dark:border-[#f4f1e8] rotate-45 hidden md:block" aria-hidden="true" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        <div className="inline-block px-3 py-1 mb-4 bg-zinc-900 dark:bg-[#f4f1e8] text-amber-50 dark:text-[#202521] font-bold text-xs tracking-[0.2em] -rotate-1">
          CATEGORIES
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3 [text-shadow:3px_3px_0_#22d3ee] dark:[text-shadow:3px_3px_0_#0d9488]">
          {language === 'zh' ? '分類總覽' : 'All Categories'}
        </h1>
        <p className="text-zinc-500 dark:text-stone-400 font-bold mb-12">
          {language === 'zh' ? `共 ${categories.length} 個分類` : `${categories.length} categories in total`}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categories.map(([category, items]) => (
            <Link
              key={category}
              href={`/categories/${encodeURIComponent(category)}`}
              className="group flex items-center gap-4 p-5 bg-white dark:bg-[#252b27] border-2 border-zinc-900 dark:border-[#3c463f] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(244,241,232,0.18)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(244,241,232,0.18)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <div className="w-11 h-11 bg-cyan-400 dark:bg-teal-700 border-2 border-zinc-900 dark:border-[#f4f1e8] flex items-center justify-center shrink-0">
                <FaFolderOpen size={17} className="text-zinc-900 dark:text-[#f4f1e8]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-black text-lg truncate group-hover:text-pink-500 dark:group-hover:text-teal-300 transition-colors">
                  {cap(category)}
                </p>
                <p className="text-sm font-bold text-zinc-500 dark:text-stone-400">
                  {language === 'zh' ? `${items.length} 篇文章` : `${items.length} post${items.length > 1 ? 's' : ''}`}
                </p>
              </div>
              <FaArrowRight
                size={14}
                className="shrink-0 text-pink-500 dark:text-teal-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
              />
            </Link>
          ))}
        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}
