'use client';

import Link from 'next/link';
import NavBar from '@/components/NavBar';
import ThemeToggle from '@/components/ThemeToggle';
import { PostMeta } from '@/lib/posts';
import { useLanguage } from '@/hooks/useLanguage';

interface Props {
  posts: PostMeta[];
}

export default function ArchiveClient({ posts }: Props) {
  const { language } = useLanguage();

  const getText = (text: string | { en: string; zh: string }) => {
    return typeof text === 'string' ? text : text[language] ?? text.en;
  };

  // 依年份分組（新到舊）
  const byYear: Record<string, PostMeta[]> = {};
  posts.forEach(post => {
    const year = new Date(post.date).getFullYear().toString();
    (byYear[year] ??= []).push(post);
  });
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="relative min-h-screen bg-amber-50 dark:bg-[#202521] text-zinc-900 dark:text-[#f4f1e8] transition-colors duration-300">
      <NavBar />

      {/* 裝飾色塊 */}
      <div className="absolute top-28 right-[10%] w-12 h-12 bg-yellow-300 dark:bg-amber-400 border-2 border-zinc-900 dark:border-[#f4f1e8] -rotate-6 hidden md:block" aria-hidden="true" />
      <div className="absolute top-48 right-[18%] w-6 h-6 bg-pink-500 dark:bg-teal-300 border-2 border-zinc-900 dark:border-[#f4f1e8] rotate-45 hidden md:block" aria-hidden="true" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        <div className="inline-block px-3 py-1 mb-4 bg-zinc-900 dark:bg-[#f4f1e8] text-amber-50 dark:text-[#202521] font-bold text-xs tracking-[0.2em] -rotate-1">
          ARCHIVES
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3 [text-shadow:3px_3px_0_#22d3ee] dark:[text-shadow:3px_3px_0_#0d9488]">
          {language === 'en' ? 'Archives' : '歸檔'}
        </h1>
        <p className="text-zinc-500 dark:text-stone-400 font-bold mb-12">
          {language === 'en' ? `${posts.length} posts in total` : `共 ${posts.length} 篇文章`}
        </p>

        <div className="space-y-12">
          {years.map(year => (
            <section key={year}>
              <h2 className="inline-block px-3 py-1 mb-4 bg-yellow-300 dark:bg-amber-400 text-zinc-900 font-black text-xl border-2 border-zinc-900 dark:border-[#f4f1e8] -rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,241,232,0.25)]">
                {year}
                <span className="ml-2 text-sm font-bold opacity-60">×{byYear[year].length}</span>
              </h2>

              <ul>
                {byYear[year].map(post => (
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
                        className="shrink-0 w-20 text-sm font-bold text-zinc-500 dark:text-stone-400"
                      >
                        {new Date(post.date).toLocaleDateString(language === 'zh' ? 'zh-TW' : 'en-US', {
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
            </section>
          ))}
        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}
