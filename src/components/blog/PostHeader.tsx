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

  const renderTitle = () => {
    const titleText = getLocalizedText(title);
    // '\n' lets a title opt into the two-tone effect via an explicit line break.
    const separators = ['\n', '：', ':', ' - '];
    const separator = separators.find(sep => titleText.includes(sep));

    if (!separator) {
      return <span className="text-zinc-900 dark:text-[#f4f1e8]">{titleText}</span>;
    }

    const parts = titleText.split(separator);
    const firstPart = parts[0].trim();
    const secondPart = parts.slice(1).join(separator).trim();
    // Colon-style separators stay attached to the first line; line breaks / dashes don't.
    const keepSeparator = separator === '：' || separator === ':';

    return (
      <>
        <span className="text-zinc-900 dark:text-[#f4f1e8]">
          {firstPart}
          {keepSeparator ? separator : ''}
        </span>
        <span className="block text-pink-500 dark:text-teal-300">{secondPart}</span>
      </>
    );
  };

  return (
    <header className="mb-10">
      {category && (
        <div className="mb-6">
          <Link
            href={`/categories/${encodeURIComponent(category)}`}
            className="inline-block px-4 py-2 bg-cyan-400 dark:bg-teal-700 text-zinc-900 dark:text-[#f4f1e8] font-bold text-sm border-2 border-zinc-900 dark:border-[#f4f1e8] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,241,232,0.25)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        </div>
      )}

      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 leading-[1.1]">
        {renderTitle()}
      </h1>

      {description && (
        <p className="text-lg text-zinc-600 dark:text-stone-300 mb-6">
          {getLocalizedText(description)}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-300 dark:bg-amber-400 text-zinc-900 font-bold text-sm border-2 border-zinc-900 dark:border-[#f4f1e8]">
          <span aria-hidden="true">📅</span>
          <time dateTime={date}>
            {new Date(date).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-TW', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              timeZone: 'UTC', // keep SSR and client on the same day across timezones
            })}
          </time>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-300 dark:bg-teal-700 text-zinc-900 dark:text-[#f4f1e8] font-bold text-sm border-2 border-zinc-900 dark:border-[#f4f1e8]">
          <span aria-hidden="true">⏱</span>
          <span>
            {readingTime} {readingTimeLabel}
          </span>
        </div>
      </div>
    </header>
  );
}
