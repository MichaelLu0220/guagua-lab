import Link from 'next/link';

interface PostHeaderProps {
    category?: string;
    title: string | { en: string; zh: string };
    description?: string | { en: string; zh: string };
    date: string;
    readingTime: number;
    language: 'en' | 'zh';
    readingTimeLabel: string;
}

export default function PostHeader({
    category,
    title,
    description,
    date,
    readingTime,
    language,
    readingTimeLabel,
}: PostHeaderProps) {
    const getLocalizedText = (text: string | { en: string; zh: string } | undefined) => {
        if (!text) return '';
        if (typeof text === 'string') return text;
        return text[language] || text.en;
    };

    return (
        <header className="mb-10">
            {/* Category Tag */}
            {category && (
                <div className="mb-6">
                    <Link
                        href={`/categories/${encodeURIComponent(category)}`}
                        className="inline-block px-4 py-2 bg-cyan-400 dark:bg-cyan-600 text-zinc-900 dark:text-white font-bold text-sm border-2 border-zinc-900 dark:border-zinc-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Link>
                </div>
            )}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 leading-[1.1]">
                {(() => {
                    const titleText = getLocalizedText(title);

                    // 定義可能的分隔符號（依優先順序）
                    const separators = ['：', ':', '，', ' - ', '—'];
                    let separator = '';

                    // 找到第一個存在的分隔符號
                    for (const sep of separators) {
                        if (titleText.includes(sep)) {
                            separator = sep;
                            break;
                        }
                    }

                    // 如果沒有分隔符號，直接顯示完整標題
                    if (!separator) {
                        return (
                            <span className="text-zinc-900 dark:text-white">
                                {titleText}
                            </span>
                        );
                    }

                    // 分割標題
                    const parts = titleText.split(separator);
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
            {description && (
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
                    {getLocalizedText(description)}
                </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-3">
                {/* Date */}
                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-300 dark:bg-yellow-500 text-zinc-900 font-bold text-sm border-2 border-zinc-900 dark:border-zinc-100">
                    <span>📅</span>
                    <time dateTime={date}>
                        {new Date(date).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-TW', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </time>
                </div>

                {/* Reading Time */}
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-300 dark:bg-emerald-600 text-zinc-900 dark:text-white font-bold text-sm border-2 border-zinc-900 dark:border-zinc-100">
                    <span>⏱️</span>
                    <span>{readingTime} {readingTimeLabel}</span>
                </div>
            </div>
        </header>
    );
}
