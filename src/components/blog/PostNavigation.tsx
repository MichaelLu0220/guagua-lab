import Link from 'next/link';

interface AdjacentPost {
    slug: string;
    title: string | { en: string; zh: string };
}

interface PostNavigationProps {
    prevPost?: AdjacentPost | null;
    nextPost?: AdjacentPost | null;
    language: 'en' | 'zh';
    previousLabel: string;
    nextLabel: string;
}

export default function PostNavigation({
    prevPost,
    nextPost,
    language,
    previousLabel,
    nextLabel,
}: PostNavigationProps) {
    const getLocalizedText = (text: string | { en: string; zh: string } | undefined) => {
        if (!text) return '';
        if (typeof text === 'string') return text;
        return text[language] || text.en;
    };

    return (
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {/* Previous Post */}
            {prevPost ? (
                <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group p-4 bg-white dark:bg-zinc-800 border-2 border-zinc-900 dark:border-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                    <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                        {previousLabel}
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
                        {nextLabel}
                    </span>
                    <div className="font-black mt-1 group-hover:text-pink-500 transition-colors line-clamp-2">
                        {getLocalizedText(nextPost.title)}
                    </div>
                </Link>
            ) : (
                <div className="hidden sm:block" />
            )}
        </div>
    );
}
