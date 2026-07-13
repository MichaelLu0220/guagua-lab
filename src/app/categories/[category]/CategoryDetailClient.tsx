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
  const { language } = useLanguage();

  const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

  const getText = (text: string | { en: string; zh: string }) => {
    return typeof text === 'string' ? text : text[language] ?? text.en;
  };

  return (
    <div className="relative min-h-screen bg-amber-50 dark:bg-[#202521] text-zinc-900 dark:text-[#f4f1e8] transition-colors duration-300">
      <NavBar />

      {/* 裝飾色塊 */}
      <div className="absolute top-28 right-[10%] w-12 h-12 bg-cyan-400 dark:bg-teal-700 border-2 border-zinc-900 dark:border-[#f4f1e8] rotate-12 hidden md:block" aria-hidden="true" />
      <div className="absolute top-48 right-[18%] w-6 h-6 bg-pink-500 dark:bg-teal-300 border-2 border-zinc-900 dark:border-[#f4f1e8] rotate-45 hidden md:block" aria-hidden="true" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        <div className="inline-block px-3 py-1 mb-4 bg-zinc-900 dark:bg-[#f4f1e8] text-amber-50 dark:text-[#202521] font-bold text-xs tracking-[0.2em] -rotate-1">
          CATEGORY
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3 [text-shadow:3px_3px_0_#22d3ee] dark:[text-shadow:3px_3px_0_#0d9488]">
          {cap(categoryName)}
        </h1>
        <p className="text-zinc-500 dark:text-stone-400 font-bold mb-12">
          {language === 'zh' ? `共 ${posts.length} 篇文章` : `${posts.length} posts in total`}
        </p>

        <ul>
          {posts.map(post => (
            <li
              key={post.slug}
              className="border-b-2 border-dashed border-zinc-300 dark:border-[#3c463f]"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-baseline gap-4 py-3.5"
              >
                <time
                  dateTime={post.date}
                  className="shrink-0 w-24 text-sm font-bold text-zinc-500 dark:text-stone-400"
                >
                  {new Date(post.date).toLocaleDateString(language === 'zh' ? 'zh-TW' : 'en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    timeZone: 'UTC',
                  })}
                </time>
                <span className="font-bold text-lg leading-snug group-hover:text-pink-500 dark:group-hover:text-teal-300 transition-colors">
                  {getText(post.title)}
                </span>
                <span
                  className="ml-auto shrink-0 self-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-pink-500 dark:text-teal-300 font-black"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Link
            href="/categories"
            className="inline-block px-4 py-2 bg-white dark:bg-[#252b27] font-bold text-sm border-2 border-zinc-900 dark:border-[#f4f1e8] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,241,232,0.25)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            ← {language === 'zh' ? '返回所有分類' : 'Back to all categories'}
          </Link>
        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}
