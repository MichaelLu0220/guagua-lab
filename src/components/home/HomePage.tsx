'use client';

import NavBar from '@/components/NavBar';
import ThemeToggle from '@/components/ThemeToggle';
import SiteFooter from '@/components/blog/SiteFooter';
import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/lib/siteConfig';
import type { PostMeta } from '@/lib/posts';

import HomeHero from './HomeHero';
import LatestPosts from './LatestPosts';
import HomeSidebar from './HomeSidebar';

interface HomePageProps {
    posts: PostMeta[];
}

export default function HomePage({ posts }: HomePageProps) {
    const { language } = useLanguage();
    const currentYear = new Date().getFullYear();
    const L = (en: string, zh: string) => (language === 'en' ? en : zh);

    return (
        <div className="min-h-screen bg-amber-50 dark:bg-[#202521] text-zinc-900 dark:text-[#f4f1e8] transition-colors duration-300">
            <NavBar showScrollTop={false} />

            <HomeHero language={language} />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12" id="articles">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <LatestPosts posts={posts} language={language} />
                    <HomeSidebar posts={posts} language={language} />
                </div>
            </div>

            <SiteFooter
                blogTitle={siteConfig.name}
                blogSubtitle={L(siteConfig.description.en, siteConfig.description.zh)}
                copyright={`© ${currentYear} ${siteConfig.name}`}
                poweredBy="Built with Next.js ❤️"
            />

            <div className="fixed bottom-6 right-6 z-50">
                <ThemeToggle />
            </div>
        </div>
    );
}
