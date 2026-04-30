'use client';

import React, { useState, useEffect, useMemo, type CSSProperties } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { pickString, pickNode, type Checklist } from '@/lib/checklists/types';

interface Props {
  checklist: Checklist;
}

export default function ChecklistView({ checklist }: Props) {
  const { language, mounted } = useLanguage();
  const storageKey = `checklist-${checklist.slug}`;

  const [checklistState, setChecklistState] = useState<{ [key: number]: boolean }>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setChecklistState(JSON.parse(saved));
      } catch {
        console.error('Failed to parse saved checklist state');
      }
    }
    setIsLoaded(true);
  }, [storageKey]);

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newState = { ...checklistState, [index]: checked };
    setChecklistState(newState);
    localStorage.setItem(storageKey, JSON.stringify(newState));
  };

  // Flatten all sections so each item gets a stable sequential id (independent of language)
  const flatSections = useMemo(() => {
    let id = 0;
    return checklist.sections.map(section => ({
      title: section.title,
      blocks: section.blocks.map(block =>
        block.kind === 'item' ? { ...block, id: id++ } : block
      ),
    }));
  }, [checklist]);

  const totalItems = useMemo(
    () =>
      checklist.sections.reduce(
        (sum, s) => sum + s.blocks.filter(b => b.kind === 'item').length,
        0
      ),
    [checklist]
  );
  const completedItems = Object.values(checklistState).filter(Boolean).length;
  const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const t = checklist.theme;
  const themeVars = {
    '--cl-page-bg': t.pageBg,
    '--cl-header-bg': t.headerBg,
    '--cl-header-color': t.headerColor,
    '--cl-header-border': t.headerBorder,
    '--cl-accent': t.accent,
    '--cl-accent-soft': t.accentSoft,
    '--cl-item-bg': t.itemBg,
    '--cl-item-border': t.itemBorder,
    '--cl-highlight-bg': t.highlightBg,
    '--cl-highlight-color': t.highlightColor,
    '--cl-link': t.linkColor,
    '--cl-link-hover': t.linkHoverColor,
    '--cl-progress-border': t.progressBorder,
    '--cl-footer-bg': t.footerBg,
    '--cl-footer-color': t.footerColor,
  } as CSSProperties;

  const L = (en: string, zh: string) => (language === 'en' ? en : zh);

  if (!mounted || !isLoaded) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontFamily: 'Microsoft JhengHei, 微軟正黑體, Arial, sans-serif',
        }}
      >
        <div>{L('Loading...', '載入中...')}</div>
      </div>
    );
  }

  const isComplete = completedItems === totalItems;
  const headerTitle = pickString(checklist.title, language);
  const headerSubtitle = checklist.subtitle ? pickString(checklist.subtitle, language) : null;
  const footerTitle = pickString(checklist.footer.title, language);
  const footerSubtitle = checklist.footer.subtitle
    ? pickString(checklist.footer.subtitle, language)
    : null;

  return (
    <div className="checklist-page" style={themeVars}>
      <style jsx>{`
        .checklist-page {
          font-family: 'Microsoft JhengHei', '微軟正黑體', Arial, sans-serif;
          line-height: 1.6;
          background-color: var(--cl-page-bg);
          color: #2c3e50;
          min-height: 100vh;
          padding: 0;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .back-link {
          display: inline-block;
          margin-bottom: 12px;
          color: var(--cl-accent);
          text-decoration: none;
          font-size: 0.95em;
          font-weight: bold;
        }
        .back-link:hover { text-decoration: underline; }

        .header {
          text-align: center;
          background: var(--cl-header-bg);
          color: var(--cl-header-color);
          padding: 25px;
          border-radius: 15px;
          margin-bottom: 25px;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
          border: var(--cl-header-border);
        }

        .header h1 {
          margin: 0;
          font-size: 2.2em;
          font-weight: bold;
        }

        .header .subtitle {
          margin-top: 10px;
          font-size: 0.95em;
          opacity: 0.9;
        }

        .section {
          background: #ffffff;
          margin: 15px 0;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          border-left: 4px solid var(--cl-accent);
          border-top: 1px solid var(--cl-accent-soft);
          border-right: 1px solid var(--cl-accent-soft);
          border-bottom: 1px solid var(--cl-accent-soft);
        }

        .section-title {
          color: var(--cl-accent);
          font-size: 1.3em;
          font-weight: bold;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 2px dashed var(--cl-accent-soft);
          padding-bottom: 8px;
        }

        .checklist-item {
          display: flex;
          align-items: flex-start;
          margin: 12px 0;
          padding: 10px;
          background: var(--cl-item-bg);
          border-radius: 8px;
          border: 1px solid var(--cl-item-border);
          transition: all 0.3s ease;
        }
        .checklist-item:hover {
          transform: translateX(3px);
          filter: brightness(0.97);
        }
        .checklist-item.completed {
          background: #e8f5e8;
          border-color: #c8e6c9;
          opacity: 0.7;
          text-decoration: line-through;
        }

        .checkbox {
          width: 20px;
          height: 20px;
          margin-right: 12px;
          margin-top: 2px;
          cursor: pointer;
          accent-color: #27ae60;
        }

        .item-text {
          flex: 1;
          font-size: 1.05em;
          line-height: 1.5;
        }

        .item-text :global(.highlight) {
          background: var(--cl-highlight-bg);
          padding: 2px 4px;
          font-weight: bold;
          color: var(--cl-highlight-color);
        }

        .item-text :global(.warn) {
          background: #fef9c3;
          padding: 2px 4px;
          font-weight: bold;
          color: #92400e;
        }

        .item-text :global(.link) {
          color: var(--cl-link);
          text-decoration: underline;
          word-break: break-all;
        }
        .item-text :global(.link:hover) { color: var(--cl-link-hover); }

        .progress-bar {
          position: sticky;
          top: 10px;
          background: #fff;
          padding: 15px;
          border-radius: 25px;
          margin-bottom: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          border: 2px solid var(--cl-progress-border);
          z-index: 100;
        }

        .progress-container {
          background: #ecf0f1;
          height: 20px;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          width: ${percentage}%;
          background: ${isComplete ? t.progressFillComplete : t.progressFill};
          transition: width 0.3s ease;
          border-radius: 10px;
        }

        .progress-text {
          text-align: center;
          margin-top: 8px;
          font-weight: bold;
          color: #2c3e50;
        }

        .memo-note {
          background: #fff3cd;
          border: 2px dashed #f39c12;
          border-radius: 8px;
          padding: 12px;
          margin: 10px 0;
          font-style: italic;
          color: #856404;
        }

        .alert-note {
          background: #fef2f2;
          border: 2px dashed #f87171;
          border-radius: 8px;
          padding: 12px;
          margin: 10px 0;
          color: #991b1b;
        }

        .footer {
          text-align: center;
          margin-top: 30px;
          padding: 20px;
          background: var(--cl-footer-bg);
          color: var(--cl-footer-color);
          border-radius: 15px;
        }

        @media (max-width: 600px) {
          .container { padding: 10px; }
          .header h1 { font-size: 1.8em; }
          .section { padding: 15px; }
          .checklist-item { padding: 8px; }
        }
      `}</style>

      <div className="container">
        <Link href="/checklist" className="back-link">
          {L('← Back to all checklists', '← 回到所有清單')}
        </Link>

        <div className="progress-bar">
          <div className="progress-container">
            <div className="progress-fill" />
          </div>
          <div className="progress-text">
            {isComplete
              ? L(
                  `🎊 All done! ${completedItems}/${totalItems} (${percentage}%)`,
                  `🎊 全部完成！${completedItems}/${totalItems}（${percentage}%）`
                )
              : L(
                  `Progress: ${completedItems}/${totalItems} (${percentage}%)`,
                  `完成進度：${completedItems}/${totalItems}（${percentage}%）`
                )}
          </div>
        </div>

        <div className="header">
          <div style={{ fontSize: '2em', marginBottom: '8px', lineHeight: 1 }}>
            {checklist.emoji}
          </div>
          <h1>{headerTitle}</h1>
          {headerSubtitle && <div className="subtitle">{headerSubtitle}</div>}
        </div>

        {flatSections.map((section, sIdx) => (
          <div key={sIdx} className="section">
            <div className="section-title">{pickString(section.title, language)}</div>
            {section.blocks.map((block, bIdx) => {
              if (block.kind === 'memo') {
                return (
                  <div key={bIdx} className="memo-note">
                    {pickNode(block.content, language)}
                  </div>
                );
              }
              if (block.kind === 'alert') {
                return (
                  <div key={bIdx} className="alert-note">
                    {pickNode(block.content, language)}
                  </div>
                );
              }
              const item = block as { kind: 'item'; text: typeof block.text; id: number };
              const checked = checklistState[item.id] || false;
              return (
                <div
                  key={bIdx}
                  className={`checklist-item ${checked ? 'completed' : ''}`}
                >
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={checked}
                    onChange={e => handleCheckboxChange(item.id, e.target.checked)}
                  />
                  <div className="item-text">{pickNode(item.text, language)}</div>
                </div>
              );
            })}
          </div>
        ))}

        <div className="footer">
          <div style={{ fontSize: '1.5em', marginBottom: '10px' }}>{checklist.footer.emoji}</div>
          <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{footerTitle}</div>
          {footerSubtitle && (
            <div style={{ fontSize: '0.9em', marginTop: '8px', opacity: 0.9 }}>
              {footerSubtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
