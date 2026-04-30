'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import NavBar from '@/components/NavBar';
import CommentSection from '@/components/CommentSection';
import PostHeader from '@/components/blog/PostHeader';
import PostTags from '@/components/blog/PostTags';
import PostNavigation from '@/components/blog/PostNavigation';
import TableOfContents from '@/components/blog/TableOfContents';
import SiteFooter from '@/components/blog/SiteFooter';
import type { BilingualHeadings } from '@/lib/posts';
import { detectBrowserLanguage } from '@/utils/languageDetector';

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
    headings?: BilingualHeadings;
}

export default function BlogClientContent({
    slug,
    postData,
    mdxContent,
    prevPost,
    nextPost,
    headings,
}: BlogClientContentProps) {
    const [language, setLanguage] = useState<'en' | 'zh'>('en');
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
        setLanguage(detectBrowserLanguage());
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
                        <PostHeader
                            category={postData.category}
                            title={postData.title}
                            description={postData.description}
                            date={postData.date}
                            readingTime={postData.readingTime}
                            language={language}
                            readingTimeLabel={texts[language].readingTime}
                        />

                        {/* ========== Article Content ========== */}
                        <article className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-6 sm:p-8 lg:px-12 lg:py-10 rounded-lg shadow-sm dark:shadow-none">
                            <div className="prose mx-auto max-w-[680px] transition-colors duration-300">
                                {mdxContent}
                            </div>
                        </article>

                        {/* ========== Tags Section ========== */}
                        <PostTags tags={postData.tags} />

                        {/* ========== Navigation ========== */}
                        <PostNavigation
                            prevPost={prevPost}
                            nextPost={nextPost}
                            language={language}
                            previousLabel={texts[language].previousArticle}
                            nextLabel={texts[language].nextArticle}
                        />

                        {/* ========== Comments Section ========== */}
                        <div className="mt-12">
                            <CommentSection postSlug={slug} />
                        </div>

                    </div>{/* end flex-1 */}

                    {/* TOC sidebar（只在桌面顯示，有 headings 才顯示） */}
                    <TableOfContents headings={headings} language={language} />

                </div>{/* end flex gap-8 */}
            </main>

            {/* ========== Footer ========== */}
            <SiteFooter
                blogTitle={texts[language].blogTitle}
                blogSubtitle={texts[language].blogSubtitle}
                copyright={texts[language].copyright}
                poweredBy={texts[language].poweredBy}
            />
        </div>
    );
}