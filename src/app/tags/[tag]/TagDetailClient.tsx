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
  const { language } = useLanguage();

  const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

  const getText = (text: string | { en: string; zh: string } | undefined): string => {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return text[language] ?? text.en ?? '';
  };

  return (
    <div className="relative min-h-screen bg-amber-50 dark:bg-[#202521] text-zinc-900 dark:text-[#f4f1e8] transition-colors duration-300">
      <NavBar />

      {/* 裝飾色塊 */}
      <div className="absolute top-28 right-[10%] w-12 h-12 bg-violet-300 dark:bg-violet-600 border-2 border-zinc-900 dark:border-[#f4f1e8] rotate-12 hidden md:block" aria-hidden="true" />
      <div className="absolute top-48 right-[18%] w-6 h-6 bg-cyan-400 dark:bg-teal-700 border-2 border-zinc-900 dark:border-[#f4f1e8] rotate-45 hidden md:block" aria-hidden="true" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        <div className="inline-block px-3 py-1 mb-4 bg-zinc-900 dark:bg-[#f4f1e8] text-amber-50 dark:text-[#202521] font-bold text-xs tracking-[0.2em] -rotate-1">
          TAG
        </div>
        <h1 className="flex flex-wrap items-center gap-4 text-4xl sm:text-5xl font-black tracking-tight mb-3">
          <span className="inline-block px-4 py-1 bg-violet-300 dark:bg-violet-600 text-zinc-900 dark:text-white border-2 border-zinc-900 dark:border-zinc-100 -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
            #{cap(tag)}
          </span>
        </h1>
        <p className="text-zinc-500 dark:text-stone-400 font-bold mb-12">
          {language === 'zh' ? `共 ${posts.length} 篇文章` : `${posts.length} posts in total`}
        </p>

        <div className="space-y-6">
          {posts.map(post => (
            <article
              key={post.slug}
              className="bg-white dark:bg-[#252b27] border-2 border-zinc-900 dark:border-[#3c463f] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(244,241,232,0.18)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(244,241,232,0.18)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all p-6"
            >
              <time
                dateTime={post.date}
                className="inline-block px-3 py-1 mb-3 bg-yellow-300 dark:bg-amber-400 text-zinc-900 font-bold text-xs border-2 border-zinc-900 dark:border-[#f4f1e8]"
              >
                📅 {new Date(post.date).toLocaleDateString(language === 'zh' ? 'zh-TW' : 'en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  timeZone: 'UTC',
                })}
              </time>
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-xl font-black leading-snug group-hover:text-pink-500 dark:group-hover:text-teal-300 transition-colors">
                  {getText(post.title)}
                </h2>
              </Link>
              {post.description && (
                <p className="mt-2 text-zinc-600 dark:text-stone-300 leading-relaxed line-clamp-2">
                  {getText(post.description)}
                </p>
              )}
            </article>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/tags"
            className="inline-block px-4 py-2 bg-white dark:bg-[#252b27] font-bold text-sm border-2 border-zinc-900 dark:border-[#f4f1e8] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,241,232,0.25)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
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
