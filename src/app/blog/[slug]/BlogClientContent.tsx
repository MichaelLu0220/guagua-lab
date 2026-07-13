'use client';

import { useEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import NavBar from '@/components/NavBar';
import CommentSection from '@/components/CommentSection';
import PostHeader from '@/components/blog/PostHeader';
import PostTags from '@/components/blog/PostTags';
import PostNavigation from '@/components/blog/PostNavigation';
import TableOfContents from '@/components/blog/TableOfContents';
import SiteFooter from '@/components/blog/SiteFooter';
import type { BilingualHeadings } from '@/lib/posts';
import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/lib/siteConfig';

interface PostData {
    title: string | { en: string; zh: string };
    description?: string | { en: string; zh: string };
    date: string;
    category?: string;
    tags?: string[];
    readingTime: number;
}

interface AdjacentPost {
    slug: string;
    title: string | { en: string; zh: string };
}

interface BlogClientContentProps {
    postData: PostData;
    mdxContent: React.ReactElement;
    prevPost?: AdjacentPost | null;
    nextPost?: AdjacentPost | null;
    headings?: BilingualHeadings;
}

export default function BlogClientContent({
    postData,
    mdxContent,
    prevPost,
    nextPost,
    headings,
}: BlogClientContentProps) {
    const { language, mounted } = useLanguage();
    const currentYear = new Date().getFullYear();

    const texts = {
        en: {
            readingTime: 'min read',
            previousArticle: '← Previous',
            nextArticle: 'Next →',
            blogTitle: siteConfig.name,
            blogSubtitle: siteConfig.description.en,
            copyright: `© ${currentYear} ${siteConfig.name}`,
            poweredBy: 'Built with Next.js ❤️',
        },
        zh: {
            readingTime: '分鐘',
            previousArticle: '← 上一篇',
            nextArticle: '下一篇 →',
            blogTitle: siteConfig.name,
            blogSubtitle: siteConfig.description.zh,
            copyright: `© ${currentYear} ${siteConfig.name}`,
            poweredBy: 'Built with Next.js ❤️',
        }
    };

    // Show only the blocks of the active language
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

    // Measure the first paragraph: if it's too short, swap the drop cap
    // for a raised cap so the float doesn't break the layout.
    const adjustCapStyle = () => {
        const visibles = document.querySelectorAll<HTMLElement>(
            '.language-content[data-lang]'
        );
        visibles.forEach((el) => {
            if (el.style.display === 'none') return;
            if (el.dataset.capOriginal === 'drop') {
                el.classList.remove('short-cap');
                el.classList.add('drop-cap');
            } else if (!el.dataset.capOriginal) {
                el.dataset.capOriginal = el.classList.contains('drop-cap') ? 'drop' : 'none';
            }
            if (!el.classList.contains('drop-cap')) return;
            const firstP = el.querySelector(':scope > p');
            if (!firstP) return;
            const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
            const pHeight = (firstP as HTMLElement).getBoundingClientRect().height;
            if (lineHeight > 0 && pHeight < lineHeight * 1.7) {
                el.classList.remove('drop-cap');
                el.classList.add('short-cap');
            }
        });
    };

    useEffect(() => {
        if (mounted) {
            toggleLanguageContent(language);
            requestAnimationFrame(() => adjustCapStyle());
        }
    }, [mounted, language]);

    return (
        <div className="min-h-screen bg-amber-50 dark:bg-[#202521] text-zinc-900 dark:text-[#f4f1e8] transition-colors duration-300">
            {/* NavBar */}
            <NavBar />

            {/* Theme Toggle */}
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16">
                <div className="flex gap-8">
                    {/* Article body */}
                    <div className="flex-1 min-w-0">

                        <PostHeader
                            category={postData.category}
                            title={postData.title}
                            description={postData.description}
                            date={postData.date}
                            readingTime={postData.readingTime}
                            language={language}
                            readingTimeLabel={texts[language].readingTime}
                        />

                        <article className="bg-white dark:bg-[#252b27] border border-zinc-200 dark:border-[#3c463f] p-6 sm:p-8 lg:px-12 lg:py-10 rounded-lg shadow-sm dark:shadow-none">
                            <div className="prose mx-auto max-w-[680px] transition-colors duration-300">
                                {mdxContent}
                            </div>
                        </article>

                        <PostTags tags={postData.tags} />

                        <PostNavigation
                            prevPost={prevPost}
                            nextPost={nextPost}
                            language={language}
                            previousLabel={texts[language].previousArticle}
                            nextLabel={texts[language].nextArticle}
                        />

                        <div className="mt-12">
                            <CommentSection />
                        </div>

                    </div>{/* end flex-1 */}

                    {/* TOC sidebar (desktop only) */}
                    <TableOfContents headings={headings} language={language} />

                </div>{/* end flex gap-8 */}
            </main>

            {/* Footer */}
            <SiteFooter
                blogTitle={texts[language].blogTitle}
                blogSubtitle={texts[language].blogSubtitle}
                copyright={texts[language].copyright}
                poweredBy={texts[language].poweredBy}
            />
        </div>
    );
}
