// 首頁各區塊共用的 neo-brutalist 樣式 token（與文章頁一致）

export const card =
    'bg-white dark:bg-[#252b27] border-2 border-zinc-900 dark:border-[#3c463f] ' +
    'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(244,241,232,0.18)]';

export const pressable =
    'hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(244,241,232,0.18)] ' +
    'hover:translate-x-[2px] hover:translate-y-[2px] transition-all';

export type Language = 'en' | 'zh';

export const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

export const localized = (
    language: Language,
    text: string | { en: string; zh: string } | undefined
): string => {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return text[language] || text.en || '';
};
