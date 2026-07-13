'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

import { siteConfig } from '@/lib/siteConfig';
import type { Language } from './ui';

interface HomeHeroProps {
    language: Language;
}

export default function HomeHero({ language }: HomeHeroProps) {
    const L = (en: string, zh: string) => (language === 'en' ? en : zh);
    const { hero } = siteConfig;

    return (
        <section className="relative overflow-hidden border-b-2 border-zinc-900 dark:border-[#3c463f]">
            {/* Floating decorative blocks 裝飾色塊 */}
            <div className="absolute top-24 right-[8%] hidden md:block lg:top-16 lg:right-[6%] float-slow" aria-hidden="true">
                <div className="w-16 h-16 bg-cyan-400 dark:bg-teal-700 border-2 border-zinc-900 dark:border-[#f4f1e8] rotate-12" />
            </div>
            <div className="absolute bottom-16 right-[18%] hidden md:block lg:bottom-12 lg:right-[36%] float-slow [animation-delay:2s]" aria-hidden="true">
                <div className="w-10 h-10 bg-emerald-300 dark:bg-teal-600 border-2 border-zinc-900 dark:border-[#f4f1e8] -rotate-6" />
            </div>
            <div className="absolute top-40 right-[24%] hidden lg:block lg:top-32 lg:right-[34%] float-slow [animation-delay:4s]" aria-hidden="true">
                <div className="w-7 h-7 bg-pink-500 dark:bg-teal-300 border-2 border-zinc-900 dark:border-[#f4f1e8] rotate-45" />
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-16 sm:pt-36 sm:pb-20 lg:flex lg:items-center lg:justify-between lg:gap-12">
                {/* Left: text */}
                <div>
                    <div className="inline-block px-3 py-1 mb-6 bg-zinc-900 dark:bg-[#f4f1e8] text-amber-50 dark:text-[#202521] font-bold text-xs tracking-[0.2em] -rotate-1">
                        {hero.badge}
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.05] mb-6">
                        <span className="text-cyan-500 dark:text-teal-300 [text-shadow:3px_3px_0_#ec4899] dark:[text-shadow:3px_3px_0_#0f766e]">
                            {hero.title.line1}
                        </span>
                        <span className="block text-pink-500 dark:text-[#f4f1e8] [text-shadow:3px_3px_0_#22d3ee] dark:[text-shadow:3px_3px_0_#0d9488]">
                            {hero.title.line2}
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-zinc-600 dark:text-stone-300 max-w-xl mb-10">
                        {L(hero.subtitle.en, hero.subtitle.zh)}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#articles"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 dark:bg-teal-600 text-white font-bold text-sm border-2 border-zinc-900 dark:border-[#f4f1e8] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,241,232,0.25)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        >
                            {L('Read posts', '閱讀文章')}
                            <FaArrowRight size={12} />
                        </a>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#252b27] font-bold text-sm border-2 border-zinc-900 dark:border-[#f4f1e8] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,241,232,0.25)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        >
                            {L('About me', '關於我')}
                        </Link>
                    </div>
                </div>

                {/* Right: polaroid photo + sticky note 拍立得照片＋便利貼 */}
                <div className="relative w-56 sm:w-64 mx-auto mt-20 lg:mt-0 lg:mx-0 shrink-0 lg:mr-12">
                    <div className="relative w-full aspect-[4/5] rotate-3">
                        <div className="absolute inset-0 flex flex-col bg-white dark:bg-[#252b27] border-2 border-zinc-900 dark:border-[#f4f1e8] p-3 pb-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(244,241,232,0.25)]">
                            <Image
                                src="/images/hero-photo.png"
                                alt={hero.photoCaption}
                                width={280}
                                height={280}
                                className="w-full aspect-square object-cover border-2 border-zinc-900 dark:border-[#3c463f]"
                            />
                            <p className="text-center font-black text-sm flex-1 flex items-center justify-center">
                                {hero.photoCaption}
                            </p>
                            {/* Tape 膠帶 */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-300/80 dark:bg-amber-400/80 border border-zinc-900/30 -rotate-3" aria-hidden="true" />
                        </div>
                    </div>

                    {/* Sticky note 便利貼 */}
                    <div
                        className="absolute -bottom-7 -left-12 z-40 -rotate-6 hover:rotate-0 bg-yellow-300 dark:bg-amber-400 border-2 border-zinc-900 dark:border-[#f4f1e8] px-4 py-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(244,241,232,0.25)] transition-transform duration-200"
                    >
                        <span className="font-black text-sm text-zinc-900 whitespace-nowrap">
                            {L(hero.stickyNote.en, hero.stickyNote.zh)}
                        </span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .float-slow {
                    animation: float-slow 6s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}
