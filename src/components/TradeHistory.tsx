'use client';

import type { Trade } from '@/lib/backtest';

const HEADERS = {
  zh: ['日期', '類型', '股數', '成交價', '金額', '手續費', '累積持股', '入袋利潤'],
  en: ['Date', 'Type', 'Shares', 'Price', 'Amount', 'Fee', 'Cum. Shares', 'Profit'],
};

function typeLabel(type: Trade['type'], lang: 'en' | 'zh') {
  if (lang === 'en') {
    return type === 'buy' ? '▲ Buy' : type === 'sell' ? '▼ Profit' : '✕ Exit';
  }
  return type === 'buy' ? '▲ 買入' : type === 'sell' ? '▼ 停利' : '✕ 出場';
}

export default function TradeHistory({ trades, lang = 'zh' }: { trades: Trade[]; lang?: 'en' | 'zh' }) {
  if (trades.length === 0)
    return <p className="text-sm text-zinc-500">{lang === 'en' ? 'No trades recorded' : '無交易紀錄'}</p>;

  const headers = HEADERS[lang];

  return (
    <div className="overflow-x-auto max-h-96 overflow-y-auto rounded-xl border border-zinc-800 print:max-h-none print:overflow-visible">
      <table className="w-full text-sm min-w-[640px]">
        <thead className="sticky top-0 bg-zinc-800/95 backdrop-blur-sm print:static print:bg-zinc-200">
          <tr>
            {headers.map((h, i) => (
              <th
                key={h}
                className={`px-3 py-2.5 text-[11px] font-medium text-zinc-400 whitespace-nowrap uppercase tracking-wide ${
                  i > 1 ? 'text-right' : 'text-left'
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, i) => (
            <tr
              key={i}
              className={`border-t border-zinc-800/60 transition-colors hover:bg-zinc-800/40 ${
                i % 2 === 1 ? 'bg-zinc-900/40' : ''
              }`}
            >
              <td className="px-3 py-2.5 text-xs text-zinc-400 tabular-nums whitespace-nowrap">
                {trade.date}
              </td>
              <td className="px-3 py-2.5">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ring-1 ${
                    trade.type === 'buy'
                      ? 'bg-sky-500/10 text-sky-400 ring-sky-500/20'
                      : trade.type === 'sell'
                      ? 'bg-amber-500/10 text-amber-400 ring-amber-500/20'
                      : 'bg-rose-500/10 text-rose-400 ring-rose-500/20'
                  }`}
                >
                  {typeLabel(trade.type, lang)}
                </span>
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-zinc-200">
                {trade.shares.toLocaleString()}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-zinc-200">
                {trade.price.toLocaleString()}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-zinc-200">
                {trade.amount.toLocaleString()}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-xs text-rose-400/70">
                {trade.fee.toLocaleString()}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-zinc-300">
                {trade.cumShares.toLocaleString()}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums">
                {trade.profit != null ? (
                  <span className="font-medium text-emerald-400">
                    +{Math.round(trade.profit).toLocaleString()}
                  </span>
                ) : (
                  <span className="text-zinc-700">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
