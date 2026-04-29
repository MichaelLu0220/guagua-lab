'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import NavBar from '@/components/NavBar';
import CommentSection from '@/components/CommentSection';
import type { Heading } from '@/lib/posts';

interface PostData {
    title: string | { en: string; zh: string };
    description?: string | { en: string; zh: string };
    date: string;
    category?: string;
    tags?: string[];
    content: string;
    readingTime: number;
}

interface AdjacentPost {
    slug: string;
    title: string | { en: string; zh: string };
}

interface BlogClientContentProps {
    slug: string;
    postData: PostData;
    mdxContent: React.ReactElement;
    prevPost?: AdjacentPost | null;
    nextPost?: AdjacentPost | null;
    headings?: Heading[];
}

export default function BlogClientContent({
    slug,
    postData,
    mdxContent,
    prevPost,
    nextPost,
    headings,
}: BlogClientContentProps) {
    const [language, setLanguage] = useState<'en' | 'zh'>('zh');
    const [mounted, setMounted] = useState(false);

    // 語言文字對照
    const texts = {
        en: {
            readingTime: 'min read',
            tags: 'Tags',
            previousArticle: '← Previous',
            nextArticle: 'Next →',
            blogTitle: "GuaGua's Blog",
            blogSubtitle: 'Sharing tech, life and thoughts',
            copyright: '© 2022 - 2025 GuaGua\'s Blog',
            poweredBy: 'Built with Next.js ❤️',
            loading: 'Loading...',
        },
        zh: {
            readingTime: '分鐘',
            tags: '標籤',
            previousArticle: '← 上一篇',
            nextArticle: '下一篇 →',
            blogTitle: "GuaGua's Blog",
            blogSubtitle: '分享技術、生活與思考',
            copyright: '© 2022 - 2025 GuaGua\'s Blog',
            poweredBy: 'Built with Next.js ❤️',
            loading: '載入中...',
        }
    };

    // 獲取本地化文字
    const getLocalizedText = (text: string | { en: string; zh: string } | undefined) => {
        if (!text) return '';
        if (typeof text === 'string') return text;
        return text[language] || text.en;
    };

    // 切換語言內容顯示
    const toggleLanguageContent = (lang: 'en' | 'zh') => {
        const allContent = document.querySelectorAll('.language-content');
        allContent.forEach((element) => {
            const htmlElement = element as HTMLElement;
            if (htmlElement.dataset.lang === lang) {
                htmlElement.style.display = 'block';
            } else {
                htmlElement.style.display = 'none';
            }
        });
    };

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') as 'en' | 'zh' | null;
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            toggleLanguageContent(language);
        }
    }, [mounted, language]);

    useEffect(() => {
        const handleLanguageChange = (event: CustomEvent<'en' | 'zh'>) => {
            setLanguage(event.detail);
        };
        window.addEventListener('languageChange', handleLanguageChange as EventListener);
        return () => {
            window.removeEventListener('languageChange', handleLanguageChange as EventListener);
        };
    }, []);

    // Loading 狀態
    if (!mounted) {
        return (
            <div className="min-h-screen bg-amber-50 dark:bg-zinc-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-zinc-900 dark:border-white border-t-pink-500 animate-spin mx-auto mb-4"></div>
                    <p className="font-bold text-zinc-900 dark:text-white">{texts[language].loading}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-amber-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
            {/* NavBar */}
            <NavBar />
            
            {/* Theme Toggle */}
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16">
                <div className="flex gap-8">
                    {/* 文章主體 */}
                    <div className="flex-1 min-w-0">

                        {/* ========== Header Section ========== */}
                        <header className="mb-10">
                            {/* Category Tag */}
                            {postData.category && (
                                <div className="mb-6">
                                    <Link
                                        href={`/categories/${encodeURIComponent(postData.category)}`}
                                        className="inline-block px-4 py-2 bg-cyan-400 dark:bg-cyan-600 text-zinc-900 dark:text-white font-bold text-sm border-2 border-zinc-900 dark:border-zinc-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                                    >
                                        {postData.category.charAt(0).toUpperCase() + postData.category.slice(1)}
                                    </Link>
                                </div>
                            )}

                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 leading-[1.1]">
                                {(() => {
                                    const title = getLocalizedText(postData.title);

                                    // 定義可能的分隔符號（依優先順序）
                                    const separators = ['：', ':', '，', ' - ', '—'];
                                    let separator = '';

                                    // 找到第一個存在的分隔符號
                                    for (const sep of separators) {
                                        if (title.includes(sep)) {
                                            separator = sep;
                                            break;
                                        }
                                    }

                                    // 如果沒有分隔符號，直接顯示完整標題
                                    if (!separator) {
                                        return (
                                            <span className="text-zinc-900 dark:text-white">
                                                {title}
                                            </span>
                                        );
                                    }

                                    // 分割標題
                                    const parts = title.split(separator);
                                    const firstPart = parts[0].trim();
                                    const secondPart = parts.slice(1).join(separator).trim();

                                    return (
                                        <>
                                            <span className="text-zinc-900 dark:text-white">
                                                {firstPart}
                                                {separator !== ' - ' && separator !== '—' ? separator : ''}
                                            </span>
                                            <span className="block text-pink-500 dark:text-pink-400">
                                                {secondPart}
                                            </span>
                                        </>
                                    );
                                })()}
                            </h1>

                            {/* Description */}
                            {postData.description && (
                                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
                                    {getLocalizedText(postData.description)}
                                </p>
                            )}

                            {/* Meta Info */}
                            <div className="flex flex-wrap gap-3">
                                {/* Date */}
                                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-300 dark:bg-yellow-500 text-zinc-900 font-bold text-sm border-2 border-zinc-900 dark:border-zinc-100">
                                    <span>📅</span>
                                    <time dateTime={postData.date}>
                                        {new Date(postData.date).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-TW', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </time>
                                </div>

                                {/* Reading Time */}
                                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-300 dark:bg-emerald-600 text-zinc-900 dark:text-white font-bold text-sm border-2 border-zinc-900 dark:border-zinc-100">
                                    <span>⏱️</span>
                                    <span>{postData.readingTime} {texts[language].readingTime}</span>
                                </div>
                            </div>
                        </header>

                        {/* ========== Article Content ========== */}
                        <article className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-6 sm:p-8 rounded-lg shadow-sm dark:shadow-none">
                            <div className="
                                prose prose-lg dark:prose-invert max-w-none

                                /* Headings */
                                prose-headings:tracking-tight
                                prose-h1:text-3xl prose-h1:font-black prose-h1:mt-10 prose-h1:mb-6
                                prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h2:flex prose-h2:items-center prose-h2:gap-3
                                prose-h2:before:content-[''] prose-h2:before:w-1 prose-h2:before:h-8 prose-h2:before:bg-pink-300 prose-h2:before:inline-block
                                prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3

                                /* Paragraphs */
                                prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-4

                                /* Links */
                                prose-a:text-pink-600 dark:prose-a:text-pink-400 prose-a:font-bold prose-a:no-underline
                                hover:prose-a:underline hover:prose-a:decoration-2 hover:prose-a:underline-offset-2

                                /* Strong */
                                prose-strong:font-black prose-strong:text-zinc-900 dark:prose-strong:text-white

                                /* Code inline */
                                prose-code:bg-zinc-200 dark:prose-code:bg-zinc-700
                                prose-code:px-2 prose-code:py-1
                                prose-code:border prose-code:border-zinc-300 dark:prose-code:border-zinc-500
                                prose-code:font-mono prose-code:text-sm prose-code:font-bold
                                prose-code:before:content-none prose-code:after:content-none

                                /* Code blocks */
                                prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-950
                                prose-pre:border-4 prose-pre:border-zinc-900 dark:prose-pre:border-zinc-600
                                prose-pre:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:prose-pre:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]
                                prose-pre:p-4 prose-pre:my-6 prose-pre:overflow-x-auto

                                /* Blockquotes */
                                prose-blockquote:border-l-4 prose-blockquote:border-pink-500
                                prose-blockquote:bg-pink-50 dark:prose-blockquote:bg-pink-900/20
                                prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:my-6
                                prose-blockquote:not-italic prose-blockquote:font-bold

                                /* Lists */
                                prose-ul:pl-0 prose-ol:pl-0
                                prose-li:pl-0 prose-li:mb-3
                                prose-li:marker:text-pink-500 prose-li:marker:font-bold

                                /* Tables */
                                prose-table:border-2 prose-table:border-zinc-900 dark:prose-table:border-zinc-600
                                prose-th:bg-zinc-200 dark:prose-th:bg-zinc-700 prose-th:p-3 prose-th:font-bold
                                prose-td:p-3 prose-td:border-t-2 prose-td:border-zinc-900 dark:prose-td:border-zinc-600

                                /* Images */
                                prose-img:border-4 prose-img:border-zinc-900 dark:prose-img:border-zinc-600
                                prose-img:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:prose-img:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]
                                prose-img:my-6

                                /* Horizontal Rule */
                                prose-hr:border-2 prose-hr:border-zinc-300 dark:prose-hr:border-zinc-600 prose-hr:my-8

                                transition-colors duration-300
                            ">
                                {mdxContent}
                            </div>
                        </article>

                        {/* ========== Tags Section ========== */}
                        {postData.tags && postData.tags.length > 0 && (
                            <div className="mt-8 flex flex-wrap gap-3">
                                {postData.tags.map((tag: string) => (
                                    <Link
                                        key={tag}
                                        href={`/tags/${encodeURIComponent(tag)}`}
                                        className="px-4 py-2 bg-violet-300 dark:bg-violet-600 text-zinc-900 dark:text-white font-bold text-sm border-2 border-zinc-900 dark:border-zinc-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                                    >
                                        #{tag.charAt(0).toUpperCase() + tag.slice(1)}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* ========== Navigation ========== */}
                        <div className="mt-10 grid sm:grid-cols-2 gap-4">
                            {/* Previous Post */}
                            {prevPost ? (
                                <Link
                                    href={`/blog/${prevPost.slug}`}
                                    className="group p-4 bg-white dark:bg-zinc-800 border-2 border-zinc-900 dark:border-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                                >
                                    <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                                        {texts[language].previousArticle}
                                    </span>
                                    <div className="font-black mt-1 group-hover:text-pink-500 transition-colors line-clamp-2">
                                        {getLocalizedText(prevPost.title)}
                                    </div>
                                </Link>
                            ) : (
                                <div className="hidden sm:block" />
                            )}

                            {/* Next Post */}
                            {nextPost ? (
                                <Link
                                    href={`/blog/${nextPost.slug}`}
                                    className="group p-4 bg-white dark:bg-zinc-800 border-2 border-zinc-900 dark:border-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-right"
                                >
                                    <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                                        {texts[language].nextArticle}
                                    </span>
                                    <div className="font-black mt-1 group-hover:text-pink-500 transition-colors line-clamp-2">
                                        {getLocalizedText(nextPost.title)}
                                    </div>
                                </Link>
                            ) : (
                                <div className="hidden sm:block" />
                            )}
                        </div>

                        {/* ========== Comments Section ========== */}
                        <div className="mt-12">
                            <CommentSection postSlug={slug} />
                        </div>

                    </div>{/* end flex-1 */}

                    {/* TOC sidebar（只在桌面顯示，有 headings 才顯示） */}
                    {headings && headings.length > 2 && (
                        <aside className="hidden xl:block w-56 shrink-0">
                            <div className="sticky top-28 space-y-1">
                                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">目錄</p>
                                {headings.map((h) => (
                                    <a
                                        key={h.id}
                                        href={`#${h.id}`}
                                        className={`block text-sm leading-snug py-1 transition-colors text-zinc-600 dark:text-zinc-400 hover:text-pink-500 dark:hover:text-pink-400 ${h.level === 3 ? 'pl-3 text-xs' : ''}`}
                                    >
                                        {h.text}
                                    </a>
                                ))}
                            </div>
                        </aside>
                    )}

                </div>{/* end flex gap-8 */}
            </main>

            {/* ========== Footer ========== */}
            <footer className="bg-zinc-900 dark:bg-zinc-950 text-white py-10 border-t-4 border-pink-500">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <h3 className="text-xl font-black mb-2">{texts[language].blogTitle}</h3>
                    <p className="text-zinc-400 mb-4">{texts[language].blogSubtitle}</p>
                    <p className="text-zinc-500 text-sm">{texts[language].copyright}</p>
                    <p className="text-zinc-600 text-xs mt-1">{texts[language].poweredBy}</p>
                </div>
            </footer>
        </div>
    );
}