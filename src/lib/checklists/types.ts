import type { ReactNode } from 'react';

export type Locale = 'en' | 'zh';

export type LocalizedString = string | { en: string; zh: string };
export type LocalizedNode = ReactNode | { en: ReactNode; zh: ReactNode };

function isLocaleObject<T>(v: unknown): v is { en: T; zh: T } {
  return (
    typeof v === 'object' &&
    v !== null &&
    'en' in (v as Record<string, unknown>) &&
    'zh' in (v as Record<string, unknown>) &&
    !('$$typeof' in (v as Record<string, unknown>))
  );
}

export function pickString(value: LocalizedString, lang: Locale): string {
  if (typeof value === 'string') return value;
  return value[lang] ?? value.en ?? '';
}

export function pickNode(value: LocalizedNode, lang: Locale): ReactNode {
  if (isLocaleObject<ReactNode>(value)) {
    return value[lang] ?? value.en;
  }
  return value;
}

export type ChecklistBlock =
  | { kind: 'item'; text: LocalizedNode }
  | { kind: 'memo'; content: LocalizedNode }
  | { kind: 'alert'; content: LocalizedNode };

export interface ChecklistSection {
  title: LocalizedString;
  blocks: ChecklistBlock[];
}

export interface ChecklistTheme {
  pageBg: string;
  headerBg: string;
  headerColor: string;
  headerBorder: string;
  accent: string;
  accentSoft: string;
  itemBg: string;
  itemBorder: string;
  highlightBg: string;
  highlightColor: string;
  linkColor: string;
  linkHoverColor: string;
  progressBorder: string;
  progressFill: string;
  progressFillComplete: string;
  footerBg: string;
  footerColor: string;
}

export interface ChecklistFooter {
  emoji: string;
  title: LocalizedString;
  subtitle?: LocalizedString;
}

export interface Checklist {
  slug: string;
  title: LocalizedString;
  /** Short label for nav dropdowns and tight UI (defaults to full title). */
  shortTitle?: LocalizedString;
  emoji: string;
  subtitle?: LocalizedString;
  shortDescription: LocalizedString;
  metaDescription: LocalizedString;
  sections: ChecklistSection[];
  footer: ChecklistFooter;
  theme: ChecklistTheme;
}
