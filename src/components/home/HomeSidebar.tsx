'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';

import type { PostMeta } from '@/lib/posts';
import { siteConfig } from '@/lib/siteConfig';
import { card, cap, type Language } from './ui';

interface HomeSidebarProps {
    posts: PostMeta[];
    language: Language;
}

export default function HomeSidebar({ posts, language }: HomeSidebarProps) {
    const L = (en: string, zh: string) => (language === 'en' ? en : zh);

    const tagMap: Record<string, number> = {};
    posts.forEach(post => {
        (post.tags || []).forEach(tag => {
            tagMap[tag] = (tagMap[tag] || 0) + 1;
        });
    });

    return (
        <aside className="space-y-6 lg:mt-[3.25rem]">
            {/* Profile */}
            <div className={`${card} p-6 text-center`}>
                <div className="relative inline-block mb-4">
                    <Image
                        src={siteConfig.author.avatar}
                        alt={`${siteConfig.author.name} avatar`}
                        width={80}
                        height={80}
                        className="border-2 border-zinc-900 dark:border-[#f4f1e8] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,241,232,0.25)]"
                    />
                    <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 bg-emerald-400 border-2 border-zinc-900 dark:border-[#f4f1e8]"></div>
                </div>
                <h3 className="text-xl font-black">{siteConfig.author.name}</h3>
                <p className="text-pink-500 dark:text-teal-300 font-bold text-sm mb-3">{siteConfig.author.alias}</p>
                <p className="text-sm text-zinc-600 dark:text-stone-300 mb-4 leading-relaxed">
                    {L(siteConfig.description.en, siteConfig.description.zh)}
                </p>
                <a
                    href={siteConfig.author.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-[#f4f1e8] text-amber-50 dark:text-[#202521] font-bold text-xs border-2 border-zinc-900 dark:border-[#f4f1e8] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.35)] dark:shadow-[3px_3px_0px_0px_rgba(244,241,232,0.25)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.35)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                    aria-label="GitHub Profile"
                >
                    <FaGithub size={14} />
                    GitHub
                </a>
            </div>

            {/* Tags */}
            <div className={`${card} p-6`}>
                <h3 className="font-black mb-4">
                    <span className="bg-violet-300 dark:bg-violet-600 px-2 py-0.5 border-2 border-zinc-900 dark:border-[#f4f1e8] text-zinc-900 dark:text-white text-sm inline-block -rotate-1">
                        {L('Tags', '標籤')}
                    </span>
                </h3>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(tagMap)
                        .sort((a, b) => b[1] - a[1])
                        .map(([tag, count]) => (
                            <Link
                                key={tag}
                                href={`/tags/${encodeURIComponent(tag)}`}
                                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold border-2 border-zinc-300 dark:border-[#3c463f] text-zinc-600 dark:text-stone-300 hover:border-zinc-900 dark:hover:border-[#f4f1e8] hover:text-zinc-900 dark:hover:text-[#f4f1e8] transition-colors"
                            >
                                #{cap(tag)}
                                <span className="text-zinc-400 dark:text-stone-500">{count}</span>
                            </Link>
                        ))}
                </div>
            </div>

            {/* Statistics */}
            <div className={`${card} p-6`}>
                <h3 className="font-black mb-4">
                    <span className="bg-emerald-300 dark:bg-teal-700 px-2 py-0.5 border-2 border-zinc-900 dark:border-[#f4f1e8] text-zinc-900 dark:text-[#f4f1e8] text-sm inline-block -rotate-1">
                        {L('Statistics', '統計資訊')}
                    </span>
                </h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                        { label: L('Posts', '文章'), value: posts.length },
                        { label: L('Categories', '分類'), value: new Set(posts.map(p => p.categories).filter(Boolean)).size },
                        { label: L('Tags', '標籤'), value: Object.keys(tagMap).length },
                    ].map(({ label, value }) => (
                        <div key={label} className="border-2 border-zinc-900 dark:border-[#3c463f] bg-amber-50 dark:bg-[#202521] py-3">
                            <div className="text-2xl font-black text-pink-500 dark:text-teal-300">{value}</div>
                            <div className="text-xs font-bold text-zinc-500 dark:text-stone-400 mt-1">{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
