import Link from 'next/link';

interface PostTagsProps {
    tags?: string[];
}

export default function PostTags({ tags }: PostTagsProps) {
    if (!tags || tags.length === 0) return null;

    return (
        <div className="mt-8 flex flex-wrap gap-3">
            {tags.map((tag: string) => (
                <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="px-4 py-2 bg-violet-300 dark:bg-violet-600 text-zinc-900 dark:text-white font-bold text-sm border-2 border-zinc-900 dark:border-zinc-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                    #{tag.charAt(0).toUpperCase() + tag.slice(1)}
                </Link>
            ))}
        </div>
    );
}
