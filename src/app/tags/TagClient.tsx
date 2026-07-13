'use client';

import Link from 'next/link';
import NavBar from '@/components/NavBar';
import ThemeToggle from '@/components/ThemeToggle';
import { PostMeta } from '@/lib/posts';
import { useLanguage } from '@/hooks/useLanguage';

interface Props {
  posts: PostMeta[];
}

export default function TagClient({ posts }: Props) {
  const { language } = useLanguage();

  const tagMap: Record<string, number> = {};
  posts.forEach(post => {
    (post.tags || []).forEach(tag => {
      tagMap[tag] = (tagMap[tag] || 0) + 1;
    });
  });

  const tags = Object.keys(tagMap).sort();
  const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

  return (
    <div className="relative min-h-screen bg-amber-50 dark:bg-[#202521] text-zinc-900 dark:text-[#f4f1e8] transition-colors duration-300">
      <NavBar />

      {/* 裝飾色塊 */}
      <div className="absolute top-28 right-[10%] w-12 h-12 bg-violet-300 dark:bg-violet-600 border-2 border-zinc-900 dark:border-[#f4f1e8] rotate-12 hidden md:block" aria-hidden="true" />
      <div className="absolute top-48 right-[18%] w-6 h-6 bg-cyan-400 dark:bg-teal-700 border-2 border-zinc-900 dark:border-[#f4f1e8] rotate-45 hidden md:block" aria-hidden="true" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        <div className="inline-block px-3 py-1 mb-4 bg-zinc-900 dark:bg-[#f4f1e8] text-amber-50 dark:text-[#202521] font-bold text-xs tracking-[0.2em] -rotate-1">
          TAGS
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3 [text-shadow:3px_3px_0_#22d3ee] dark:[text-shadow:3px_3px_0_#0d9488]">
          {language === 'zh' ? '標籤總覽' : 'All Tags'}
        </h1>
        <p className="text-zinc-500 dark:text-stone-400 font-bold mb-12">
          {language === 'zh' ? `共 ${tags.length} 個標籤` : `${tags.length} tags in total`}
        </p>

        <div className="flex flex-wrap gap-4">
          {tags.map(tag => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="px-4 py-2 bg-violet-300 dark:bg-violet-600 text-zinc-900 dark:text-white font-bold text-sm border-2 border-zinc-900 dark:border-zinc-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              #{cap(tag)}
              <span className="ml-1.5 text-xs opacity-70">×{tagMap[tag]}</span>
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
