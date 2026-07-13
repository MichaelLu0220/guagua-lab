'use client';

import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

import type { PostMeta } from '@/lib/posts';
import { card, pressable, cap, localized, type Language } from './ui';

interface LatestPostsProps {
    posts: PostMeta[];
    language: Language;
}

export default function LatestPosts({ posts, language }: LatestPostsProps) {
    const L = (en: string, zh: string) => (language === 'en' ? en : zh);

    return (
        <main className="lg:col-span-2">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                <span className="inline-block px-3 py-1 bg-yellow-300 dark:bg-amber-400 text-zinc-900 border-2 border-zinc-900 dark:border-[#f4f1e8] -rotate-1">
                    {L('Latest Posts', '最新文章')}
                </span>
            </h2>

            <div className="space-y-6">
                {posts.map(post => (
                    <article key={post.slug} className={`${card} ${pressable} p-6`}>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            {post.categories && (
                                <Link
                                    href={`/categories/${post.categories}`}
                                    className="px-3 py-1 bg-cyan-400 dark:bg-teal-700 text-zinc-900 dark:text-[#f4f1e8] font-bold text-xs border-2 border-zinc-900 dark:border-[#f4f1e8]"
                                >
                                    {cap(post.categories)}
                                </Link>
                            )}
                            <time
                                dateTime={post.date}
                                className="px-3 py-1 bg-yellow-300 dark:bg-amber-400 text-zinc-900 font-bold text-xs border-2 border-zinc-900 dark:border-[#f4f1e8]"
                            >
                                📅 {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-TW', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    timeZone: 'UTC',
                                })}
                            </time>
                        </div>

                        <Link href={`/blog/${post.slug}`} className="block group">
                            <h3 className="text-2xl font-black leading-tight mb-3 group-hover:text-pink-500 dark:group-hover:text-teal-300 transition-colors line-clamp-2">
                                {localized(language, post.title)}
                            </h3>
                        </Link>

                        {post.description && (
                            <p className="text-zinc-600 dark:text-stone-300 mb-4 leading-relaxed line-clamp-3">
                                {localized(language, post.description)}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-3">
                            {Array.isArray(post.tags) && post.tags.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.slice(0, 4).map(tag => (
                                        <Link
                                            key={tag}
                                            href={`/tags/${encodeURIComponent(tag)}`}
                                            className="px-2 py-0.5 text-xs font-bold text-zinc-600 dark:text-stone-300 border-2 border-zinc-300 dark:border-[#3c463f] hover:border-zinc-900 dark:hover:border-[#f4f1e8] hover:text-zinc-900 dark:hover:text-[#f4f1e8] transition-colors"
                                        >
                                            #{cap(tag)}
                                        </Link>
                                    ))}
                                    {post.tags.length > 4 && (
                                        <span className="text-zinc-400 dark:text-stone-500 text-xs px-1 py-0.5 font-bold">
                                            +{post.tags.length - 4}
                                        </span>
                                    )}
                                </div>
                            ) : <span />}

                            <Link
                                href={`/blog/${post.slug}`}
                                className="inline-flex items-center gap-2 text-sm font-black text-pink-500 dark:text-teal-300 hover:underline decoration-2 underline-offset-4 group"
                            >
                                {L('Read more', '閱讀更多')}
                                <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}
