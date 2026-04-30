'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { getAllChecklists } from '@/lib/checklists';
import { pickString } from '@/lib/checklists/types';

export default function ChecklistIndexClient() {
  const { language, mounted } = useLanguage();
  const checklists = getAllChecklists();
  const L = (en: string, zh: string) => (language === 'en' ? en : zh);

  return (
    <div className="cl-index">
      <div className="container">
        <Link href="/" className="back-link">
          {L('← Back to home', '← 回首頁')}
        </Link>
        <header className="hero">
          <h1>🧳 {L('Travel Checklists', '旅遊清單')}</h1>
          <p>
            {L(
              'Pre-departure preparation by country. Tick items off and track progress as you pack.',
              '出發前的準備事項，依國家分類，可勾選追蹤進度。'
            )}
          </p>
        </header>

        <div className="grid">
          {checklists.map(c => {
            const title = mounted ? pickString(c.title, language) : pickString(c.title, 'en');
            const desc = mounted
              ? pickString(c.shortDescription, language)
              : pickString(c.shortDescription, 'en');
            return (
              <Link key={c.slug} href={`/checklist/${c.slug}`} className="card">
                <div className="card-emoji">{c.emoji}</div>
                <h2>{title}</h2>
                <p>{desc}</p>
                <span className="card-cta">
                  {L('View checklist →', '查看清單 →')}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .cl-index {
          font-family: 'Microsoft JhengHei', '微軟正黑體', Arial, sans-serif;
          background: #fafafa;
          min-height: 100vh;
          color: #2c3e50;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 24px 20px 60px;
        }
        .back-link {
          display: inline-block;
          margin-bottom: 20px;
          color: #4338ca;
          text-decoration: none;
          font-size: 0.95em;
          font-weight: bold;
        }
        .back-link:hover {
          text-decoration: underline;
        }
        .hero {
          text-align: center;
          padding: 30px 16px;
          margin-bottom: 30px;
        }
        .hero h1 {
          font-size: 2.4em;
          margin: 0 0 10px;
        }
        .hero p {
          color: #6b7280;
          font-size: 1.05em;
          margin: 0;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }
        .card {
          display: block;
          padding: 24px;
          background: #fff;
          border-radius: 14px;
          border: 2px solid #e5e7eb;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          color: inherit;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
          border-color: #4338ca;
        }
        .card-emoji {
          font-size: 2.5em;
          margin-bottom: 10px;
        }
        .card h2 {
          margin: 0 0 8px;
          font-size: 1.3em;
        }
        .card p {
          color: #6b7280;
          font-size: 0.95em;
          line-height: 1.5;
          margin: 0 0 14px;
        }
        .card-cta {
          color: #4338ca;
          font-weight: bold;
          font-size: 0.95em;
        }
      `}</style>
    </div>
  );
}
