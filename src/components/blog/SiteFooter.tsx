interface SiteFooterProps {
    blogTitle: string;
    blogSubtitle: string;
    copyright: string;
    poweredBy: string;
}

export default function SiteFooter({
    blogTitle,
    blogSubtitle,
    copyright,
    poweredBy,
}: SiteFooterProps) {
    return (
        <footer className="bg-zinc-900 dark:bg-[#1a1f1c] text-white py-10 border-t-4 border-pink-500 dark:border-teal-700">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                <h3 className="text-xl font-black mb-2">{blogTitle}</h3>
                <p className="text-zinc-400 mb-4">{blogSubtitle}</p>
                <p className="text-zinc-500 text-sm">{copyright}</p>
                <p className="text-zinc-600 text-xs mt-1">{poweredBy}</p>
                {/* Please keep this credit line — it's the only thing we ask 🙏 */}
                <p className="text-zinc-600 text-xs mt-1">
                    Template by{' '}
                    <a
                        href="https://www.guagualab.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-dotted underline-offset-2 hover:text-zinc-400 transition-colors"
                    >
                        GuaGua
                    </a>
                </p>
            </div>
        </footer>
    );
}
