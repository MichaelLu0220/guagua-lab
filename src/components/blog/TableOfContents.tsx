import type { BilingualHeadings } from '@/lib/posts';

interface TableOfContentsProps {
    headings?: BilingualHeadings;
    language: 'en' | 'zh';
}

export default function TableOfContents({ headings, language }: TableOfContentsProps) {
    if (!headings || !headings[language] || headings[language].length <= 2) {
        return null;
    }

    return (
        <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-28 space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
                    {language === 'en' ? 'Contents' : '目錄'}
                </p>
                {headings[language].map((h) => (
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
    );
}
