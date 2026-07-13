'use client';

import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import NavBar from '@/components/NavBar';
import ThemeToggle from '@/components/ThemeToggle';
import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/lib/siteConfig';

// ✏️ Write your own story here! 在這裡寫下你自己的故事！
export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="relative min-h-screen bg-amber-50 dark:bg-[#202521] text-zinc-900 dark:text-[#f4f1e8] transition-colors duration-300">
      <NavBar />

      {/* Decorative blocks */}
      <div className="absolute top-28 right-[10%] w-12 h-12 bg-cyan-400 dark:bg-teal-700 border-2 border-zinc-900 dark:border-[#f4f1e8] rotate-12 hidden md:block" aria-hidden="true" />
      <div className="absolute top-48 right-[18%] w-6 h-6 bg-pink-500 dark:bg-teal-300 border-2 border-zinc-900 dark:border-[#f4f1e8] rotate-45 hidden md:block" aria-hidden="true" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        <div className="inline-block px-3 py-1 mb-4 bg-zinc-900 dark:bg-[#f4f1e8] text-amber-50 dark:text-[#202521] font-bold text-xs tracking-[0.2em] -rotate-1">
          ABOUT
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-10 [text-shadow:3px_3px_0_#22d3ee] dark:[text-shadow:3px_3px_0_#0d9488]">
          {language === 'en' ? 'About Me' : '關於我'}
        </h1>

        <div className="bg-white dark:bg-[#252b27] border-2 border-zinc-900 dark:border-[#3c463f] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(244,241,232,0.18)] p-6 sm:p-10">
          {/* Profile row */}
          <div className="flex flex-wrap items-center gap-5 pb-6 mb-6 border-b-2 border-dashed border-zinc-300 dark:border-[#3c463f]">
            <Image
              src={siteConfig.author.avatar}
              alt={`${siteConfig.author.name} avatar`}
              width={72}
              height={72}
              className="border-2 border-zinc-900 dark:border-[#f4f1e8] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,241,232,0.25)]"
            />
            <div>
              <p className="text-xl font-black">{siteConfig.author.name}</p>
              <p className="text-pink-500 dark:text-teal-300 font-bold text-sm">{siteConfig.author.alias}</p>
            </div>
            <a
              href={siteConfig.author.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-[#f4f1e8] text-amber-50 dark:text-[#202521] font-bold text-xs border-2 border-zinc-900 dark:border-[#f4f1e8] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.35)] dark:shadow-[3px_3px_0px_0px_rgba(244,241,232,0.25)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.35)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              aria-label="GitHub Profile"
            >
              <FaGithub size={14} />
              GitHub
            </a>
          </div>

          <section className="space-y-6 text-lg leading-relaxed text-zinc-700 dark:text-stone-300 [&_strong]:text-zinc-900 dark:[&_strong]:text-[#f4f1e8]">
            {language === 'en' ? (
              <>
                <p>
                  Hello! I&apos;m <strong>{siteConfig.author.name}</strong>. This is where you introduce
                  yourself — what you do, what you love, and what this blog is about.
                </p>
                <p>
                  This blog is my digital notebook — a place to share thoughts, document learnings,
                  and sometimes just talk about life.
                </p>
                <p>
                  Built with <strong>Next.js</strong>, <strong>Tailwind CSS</strong>, and{' '}
                  <strong>MDX</strong>, this site is statically generated and hand-written in markdown.
                </p>
              </>
            ) : (
              <>
                <p>
                  哈囉！我是 <strong>{siteConfig.author.name}</strong>。在這裡介紹你自己 —
                  你在做什麼、你熱愛什麼、以及這個部落格的主題。
                </p>
                <p>
                  這個部落格是我的數位筆記本，用來分享心得、記錄學習過程，也偶爾聊聊生活。
                </p>
                <p>
                  本站使用 <strong>Next.js</strong>、<strong>Tailwind CSS</strong> 與{' '}
                  <strong>MDX</strong> 架構，所有文章皆手動撰寫並靜態部署。
                </p>
              </>
            )}
          </section>
        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}
