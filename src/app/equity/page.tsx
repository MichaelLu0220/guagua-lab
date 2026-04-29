'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import HomeNavBar from '@/components/HomeNavBar';
import ThemeToggle from '@/components/ThemeToggle';
import TradeHistory from '@/components/TradeHistory';
import { useLanguage } from '@/hooks/useLanguage';
import { runBacktest, type DailyData, type BacktestResult, type BacktestOptions, type Trade } from '@/lib/backtest';

const KLineChart  = dynamic(() => import('@/components/KLineChart'),  { ssr: false });
const EquityCurve = dynamic(() => import('@/components/EquityCurve'), { ssr: false });

/* ── Translations ── */

const LANG = {
  zh: {
    navBadge:        '動態補倉策略',
    heroTitle:       '策略回測',
    heroDesc:        '模擬台股「動態補倉 ＋ 停利出場」策略的歷史績效',
    symbolLabel:     '股票代號',
    symbolPlaceholder: '例：2330',
    loadChart:       '載入圖表',
    loading:         '載入中…',
    errNoData:       '找不到此股票資料，請確認股票代號是否正確',
    errNetwork:      '網路錯誤，請稍後再試',
    fiveYear:        '近 5 年 K 線',
    legendBuy:       '買入',
    legendSell:      '停利',
    startPrefix:     '起始：',
    clickHint:       '↓ 點擊圖表選擇回測起始日期',
    paramX:          '目標部位 X',
    hintX:           '初始買入並維持的部位金額',
    paramY:          '停利金額 Y',
    hintY:           '部位超過 X+Y 時賣出獲利',
    riskTitle:       '風控設定（選填）',
    paramZ1:         'Z1：策略死亡線',
    hintZ1:          '部位市值 ≤ X−Z1 時全數出場',
    paramZ2:         'Z2：最大淨虧損',
    hintZ2:          '累計虧損 ≥ Z2 時全數出場',
    paramZ3:         'Z3：高水位回撤',
    hintZ3:          '總資產從最高點回落 ≥ Z3 時全數出場',
    paramCap:        '補倉上限 Cap',
    hintCap:         '總投入超過 Cap 後停止補倉',
    placeholderZ:    '不設定',
    placeholderCap:  '不限制',
    selectDateFirst: '↑ 請先在上方 K 線圖點擊選擇回測起始日期',
    runBacktest:     '開始回測',
    infoBase:        '開始日以 X 買入最多股數；收盤後部位 < X 補買，部位 ≥ X＋Y 賣出超出部分。',
    infoZ1:          ' Z1 部位跌至 X−Z1 全數出場。',
    infoZ2:          ' Z2 淨虧損達 Z2 全數出場。',
    infoZ3:          ' Z3 總資產從最高點回落 Z3 全數出場。',
    infoCap:         ' Cap 超過上限停止補倉。',
    infoFee:         ' 手續費：買 0.1425%、賣 0.4425%，最低 NT$20。',
    resultLabel:     '回測結果',
    startLabel:      '起始',
    adjust:          '調整參數',
    exportJson:      '下載 JSON',
    print:           '列印',
    slZ1:            'Z1 策略死亡線停損',
    slZ2:            'Z2 最大淨虧損停損',
    slZ3:            'Z3 高水位回撤停損',
    slOn:            '於',
    slTriggered:     '觸發，已全數出場',
    totalInvested:   '總投入金額',
    realizedPnL:     '已實現利潤',
    unrealized:      '未實現部位',
    trueReturn:      '真實報酬率',
    maxCapital:      '最大資金占用',
    capitalEff:      '資金使用效率',
    maxDrawdown:     '最大回撤',
    fees:            '手續費成本',
    buyCount:        '買入次數',
    sellCount:       '停利次數',
    finalShares:     '最終持股',
    lastClose:       '最新收盤',
    winRate:         '勝率',
    avgProfit:       '平均停利',
    trueRR:          '真實風報比',
    stopDate:        '停損觸發日',
    notTriggered:    '未觸發',
    curveTitle:      '資產曲線',
    curveTotalAssets:'總資產',
    curveCumInvested:'累計投入',
    tradesTitle:     '交易明細',
    tradesSuffix:    ' 筆',
    timesSuffix:     '次',
    sharesSuffix:    '股',
    buyDetails:      '買入明細',
    profitDetails:   '獲利明細',
    buysTotal:       (n: number) => `共 ${n} 次買入`,
    profitTotal:     (sell: number, hasExit: boolean) =>
                       `共 ${sell} 次停利${hasExit ? ' + 1 次出場' : ''}`,
    cumDeployed:     '累計資金部署',
    cumRealized:     '累計已實現',
    printStart:      '回測起始：',
    printX:          '目標部位 X = NT$',
    printY:          '　　停利金額 Y = NT$',
    printZ1:         'Z1 策略死亡線（部位市值 ≤ X−Z1 出場）= NT$',
    printZ2:         'Z2 最大淨虧損（累計虧損 ≥ Z2 出場）= NT$',
    printZ3:         'Z3 高水位回撤（總資產從最高點回落 ≥ Z3 出場）= NT$',
    printCap:        '補倉上限 Cap = NT$',
    // modal sub-table headers
    cashInHeaders:   ['日期', '股數', '成交金額', '手續費', '本次投入', '累計投入'],
    profitHeaders:   ['日期', '類型', '股數', '入袋利潤', '累計利潤'],
    typeStop:        '▼ 停利',
    typeExit:        '✕ 出場',
  },
  en: {
    navBadge:        'Rebalancing Strategy',
    heroTitle:       'Strategy Backtest',
    heroDesc:        'Simulate Taiwan stock dynamic rebalancing + take-profit strategy',
    symbolLabel:     'Stock Symbol',
    symbolPlaceholder: 'e.g. 2330',
    loadChart:       'Load Chart',
    loading:         'Loading…',
    errNoData:       'Stock not found. Please check the symbol.',
    errNetwork:      'Network error, please try again later.',
    fiveYear:        '5-Year Chart',
    legendBuy:       'Buy',
    legendSell:      'Take Profit',
    startPrefix:     'Start: ',
    clickHint:       '↓ Click chart to select backtest start date',
    paramX:          'Target Position X',
    hintX:           'Initial capital to buy and hold',
    paramY:          'Take-Profit Amount Y',
    hintY:           'Sell excess when position exceeds X+Y',
    riskTitle:       'Risk Controls (optional)',
    paramZ1:         'Z1: Strategy Floor',
    hintZ1:          'Exit all when position value ≤ X−Z1',
    paramZ2:         'Z2: Max Net Loss',
    hintZ2:          'Exit all when net loss ≥ Z2',
    paramZ3:         'Z3: Drawdown Stop',
    hintZ3:          'Exit all when total assets drop ≥ Z3 from peak',
    paramCap:        'Capital Cap',
    hintCap:         'Stop rebalancing when total invested > Cap',
    placeholderZ:    'None',
    placeholderCap:  'No limit',
    selectDateFirst: '↑ First click the chart above to select a start date',
    runBacktest:     'Run Backtest',
    infoBase:        'On start date buy max shares with X. After close: if position < X rebalance; if position ≥ X+Y sell excess.',
    infoZ1:          ' Z1 exits when position ≤ X−Z1.',
    infoZ2:          ' Z2 exits when net loss ≥ Z2.',
    infoZ3:          ' Z3 exits when total assets drop ≥ Z3 from peak.',
    infoCap:         ' Cap stops new buys when invested > Cap.',
    infoFee:         ' Fees: buy 0.1425%, sell 0.4425%, min NT$20.',
    resultLabel:     'Backtest Results',
    startLabel:      'Start',
    adjust:          'Adjust',
    exportJson:      'Export JSON',
    print:           'Print',
    slZ1:            'Z1 Strategy Floor stop-loss',
    slZ2:            'Z2 Max Net Loss stop-loss',
    slZ3:            'Z3 Drawdown stop-loss',
    slOn:            'on',
    slTriggered:     'triggered, fully exited',
    totalInvested:   'Total Invested',
    realizedPnL:     'Realized P&L',
    unrealized:      'Unrealized',
    trueReturn:      'True Return',
    maxCapital:      'Max Capital Used',
    capitalEff:      'Capital Efficiency',
    maxDrawdown:     'Max Drawdown',
    fees:            'Transaction Fees',
    buyCount:        'Buy Count',
    sellCount:       'Sell Count',
    finalShares:     'Final Shares',
    lastClose:       'Last Close',
    winRate:         'Win Rate',
    avgProfit:       'Avg Take Profit',
    trueRR:          'True Risk:Reward',
    stopDate:        'Stop-Loss Date',
    notTriggered:    'Not Triggered',
    curveTitle:      'Equity Curve',
    curveTotalAssets:'Total Assets',
    curveCumInvested:'Total Invested',
    tradesTitle:     'Trade History',
    tradesSuffix:    ' trades',
    timesSuffix:     '',
    sharesSuffix:    '',
    buyDetails:      'Buy Details',
    profitDetails:   'Profit Details',
    buysTotal:       (n: number) => `${n} buys total`,
    profitTotal:     (sell: number, hasExit: boolean) =>
                       `${sell} take-profits${hasExit ? ' + 1 exit' : ''}`,
    cumDeployed:     'Total Deployed',
    cumRealized:     'Total Realized',
    printStart:      'Start: ',
    printX:          'Target position X = NT$',
    printY:          '    Take-profit Y = NT$',
    printZ1:         'Z1 Strategy floor (exit when pos ≤ X−Z1) = NT$',
    printZ2:         'Z2 Max net loss (exit when loss ≥ Z2) = NT$',
    printZ3:         'Z3 Drawdown stop (exit when drop ≥ Z3 from peak) = NT$',
    printCap:        'Capital cap = NT$',
    cashInHeaders:   ['Date', 'Shares', 'Amount', 'Fee', 'This Buy', 'Cum. Invested'],
    profitHeaders:   ['Date', 'Type', 'Shares', 'Profit', 'Cum. Profit'],
    typeStop:        '▼ Profit',
    typeExit:        '✕ Exit',
  },
} as const;

type Tx = (typeof LANG)[keyof typeof LANG];

/* ── Helpers ── */

const INPUT =
  'w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 hover:border-zinc-600 focus:border-indigo-500';

function wanHint(n: number, lang: 'en' | 'zh'): string {
  if (n < 10000) return '';
  if (lang === 'en') {
    return n >= 1000000
      ? `${(n / 1000000).toFixed(1).replace(/\.0$/, '')}M`
      : `${(n / 1000).toFixed(0)}K`;
  }
  const wan = n / 10000;
  return `${wan % 1 === 0 ? wan.toFixed(0) : wan.toFixed(1)} 萬`;
}

function fmt(n: number) {
  return Math.round(n).toLocaleString();
}

/* ── Component ── */

export default function EquityPage() {
  const { language } = useLanguage();
  const t: Tx = LANG[language as keyof typeof LANG];

  const [symbol, setSymbol] = useState('2330');
  const [chartLoading, setChartLoading] = useState(false);
  const [chartData, setChartData] = useState<DailyData[]>([]);
  const [selectedDate, setSelectedDate] = useState('');

  const [budget, setBudget] = useState(100000);
  const [profitThreshold, setProfitThreshold] = useState(5000);
  const [z1Input, setZ1Input] = useState('');
  const [z2Input, setZ2Input] = useState('');
  const [z3Input, setZ3Input] = useState('');
  const [capInput, setCapInput] = useState('');

  const [stockName, setStockName] = useState('');
  const [result, setResult] = useState<BacktestResult | null>(null);
  const [error, setError] = useState('');
  const [detailType, setDetailType] = useState<'cashIn' | 'profit' | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  /* ── Handlers ── */

  const handleLoadChart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol.trim()) return;

    setChartLoading(true);
    setError('');
    setChartData([]);
    setSelectedDate('');
    setResult(null);
    setStockName('');

    fetch(`/api/stock-info?symbol=${encodeURIComponent(symbol.trim())}`)
      .then((r) => r.json())
      .then((info) => { if (info.name) setStockName(info.name); })
      .catch(() => {});

    const today = new Date();
    const startDate = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate())
      .toISOString().split('T')[0];

    try {
      const res = await fetch(
        `/api/stock?symbol=${encodeURIComponent(symbol.trim())}&startDate=${startDate}`
      );
      const raw = await res.json();

      if (!res.ok) { setError(raw.error || t.errNetwork); return; }
      if (!Array.isArray(raw) || raw.length === 0) { setError(t.errNoData); return; }

      setChartData(
        raw.map((d: Record<string, number | string>) => ({
          date: d.date as string,
          open: Number(d.open),
          high: Number(d.max),
          low: Number(d.min),
          close: Number(d.close),
          volume: Number(d.Trading_Volume),
        }))
      );
    } catch {
      setError(t.errNetwork);
    } finally {
      setChartLoading(false);
    }
  };

  const handleBacktest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || chartData.length === 0) return;
    const subset = chartData.filter((d) => d.date >= selectedDate);
    if (subset.length === 0) return;

    const opts: BacktestOptions = {};
    if (z1Input.trim() !== '') opts.z1 = Number(z1Input);
    if (z2Input.trim() !== '') opts.z2 = Number(z2Input);
    if (z3Input.trim() !== '') opts.z3 = Number(z3Input);
    if (capInput.trim() !== '') opts.cap = Number(capInput);

    setResult(runBacktest(subset, budget, profitThreshold, opts));
  };

  const handleReset = () => {
    setResult(null);
    setSelectedDate('');
    chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSaveJSON = () => {
    if (!result) return;
    const payload = {
      symbol,
      startDate: selectedDate,
      params: {
        x: budget, y: profitThreshold,
        ...(z1Input && { z1: Number(z1Input) }),
        ...(z2Input && { z2: Number(z2Input) }),
        ...(z3Input && { z3: Number(z3Input) }),
        ...(capInput && { cap: Number(capInput) }),
      },
      result,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backtest_${symbol}_${selectedDate}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const netLossOnStop = result?.stopLossTriggered
    ? Math.max(0, result.totalCashIn - result.totalProfit)
    : 0;
  const trueRRValue =
    result?.stopLossTriggered && result?.avgTakeProfitAmount > 0
      ? `${(netLossOnStop / result.avgTakeProfitAmount).toFixed(1)} : 1`
      : '—';

  const slReason = result?.stopLossReason === 'z2' ? t.slZ2
    : result?.stopLossReason === 'z3' ? t.slZ3
    : t.slZ1;

  /* ── Render ── */

  return (
    <>
      <HomeNavBar styleVariant="default" isVisible={true} />
      <div id="equity-page" className="min-h-screen bg-zinc-950 text-zinc-100">

        <main className="max-w-5xl mx-auto px-4 md:px-6 pt-20 pb-8 space-y-5">

          {/* ── Hero ── */}
          <div className="print:hidden">
            <h1 className="text-2xl font-bold tracking-tight text-white">{t.heroTitle}</h1>
            <p className="mt-1 text-sm text-zinc-400">{t.heroDesc}</p>
          </div>

          {/* ── Step 1: Load chart ── */}
          <form
            onSubmit={handleLoadChart}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 flex gap-3 items-end print:hidden"
          >
            <div className="flex-1 space-y-1.5">
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wide">
                {t.symbolLabel}
              </label>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.trim().toUpperCase())}
                className={`${INPUT} font-mono`}
                placeholder={t.symbolPlaceholder}
                required
              />
            </div>
            <button
              type="submit"
              disabled={chartLoading}
              className="h-[42px] px-5 rounded-xl text-sm font-semibold transition-colors bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-white flex items-center gap-2 shrink-0"
            >
              {chartLoading ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t.loading}
                </>
              ) : t.loadChart}
            </button>
          </form>

          {/* ── Error ── */}
          {error && (
            <div className="rounded-xl border border-rose-900/50 bg-rose-950/30 p-4 flex items-start gap-2.5 text-sm text-rose-300 print:hidden">
              <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              {error}
            </div>
          )}

          {/* ── Step 2: K-line chart ── */}
          {chartData.length > 0 && (
            <div ref={chartRef} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 print:hidden">
              <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-white font-mono">{symbol}</span>
                  {stockName && (
                    <span className="text-sm text-zinc-300 truncate max-w-[160px]">{stockName}</span>
                  )}
                  <span className="text-xs text-zinc-500 shrink-0">{t.fiveYear}</span>
                </div>
                <div className="flex items-center gap-4">
                  {result && (
                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-sky-400 block" />{t.legendBuy}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400 block" />{t.legendSell}
                      </span>
                    </div>
                  )}
                  {selectedDate ? (
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="w-2 h-2 rounded-full bg-yellow-400 block" />
                      <span className="text-yellow-400 font-medium tabular-nums">{t.startPrefix}{selectedDate}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-zinc-500 animate-pulse">{t.clickHint}</span>
                  )}
                </div>
              </div>
              <KLineChart
                data={chartData}
                trades={result?.trades ?? []}
                onDateSelect={setSelectedDate}
                selectedDate={selectedDate}
              />
            </div>
          )}

          {/* ── Step 3: Backtest params ── */}
          {chartData.length > 0 && (
            <form
              ref={formRef}
              onSubmit={handleBacktest}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 space-y-4 print:hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label={t.paramX} hint={t.hintX}>
                  <NtdInput value={budget} onChange={setBudget} min={1000} step={1000} required />
                  {wanHint(budget, language) && <Hint>{wanHint(budget, language)}</Hint>}
                </Field>
                <Field label={t.paramY} hint={t.hintY}>
                  <NtdInput value={profitThreshold} onChange={setProfitThreshold} min={100} step={100} required />
                  {wanHint(profitThreshold, language) && <Hint>{wanHint(profitThreshold, language)}</Hint>}
                </Field>
              </div>

              <div>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-3">
                  {t.riskTitle}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Field label={t.paramZ1} hint={t.hintZ1}>
                    <NtdInput value={z1Input} onChangeStr={setZ1Input} min={100} step={100} placeholder={t.placeholderZ} />
                    {z1Input !== '' && wanHint(Number(z1Input), language) && <Hint>{wanHint(Number(z1Input), language)}</Hint>}
                  </Field>
                  <Field label={t.paramZ2} hint={t.hintZ2}>
                    <NtdInput value={z2Input} onChangeStr={setZ2Input} min={100} step={100} placeholder={t.placeholderZ} />
                    {z2Input !== '' && wanHint(Number(z2Input), language) && <Hint>{wanHint(Number(z2Input), language)}</Hint>}
                  </Field>
                  <Field label={t.paramZ3} hint={t.hintZ3}>
                    <NtdInput value={z3Input} onChangeStr={setZ3Input} min={100} step={100} placeholder={t.placeholderZ} />
                    {z3Input !== '' && wanHint(Number(z3Input), language) && <Hint>{wanHint(Number(z3Input), language)}</Hint>}
                  </Field>
                  <Field label={t.paramCap} hint={t.hintCap}>
                    <NtdInput value={capInput} onChangeStr={setCapInput} min={1000} step={1000} placeholder={t.placeholderCap} />
                    {capInput !== '' && wanHint(Number(capInput), language) && <Hint>{wanHint(Number(capInput), language)}</Hint>}
                  </Field>
                </div>
              </div>

              <div className="flex gap-2.5 rounded-xl bg-zinc-800/40 border border-zinc-800 px-4 py-3 text-xs text-zinc-500">
                <svg className="w-3.5 h-3.5 text-indigo-400/70 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <span>
                  {t.infoBase}
                  {z1Input.trim() !== '' && t.infoZ1}
                  {z2Input.trim() !== '' && t.infoZ2}
                  {z3Input.trim() !== '' && t.infoZ3}
                  {capInput.trim() !== '' && t.infoCap}
                  {t.infoFee}
                </span>
              </div>

              {!selectedDate && (
                <p className="text-xs text-zinc-600 text-center">{t.selectDateFirst}</p>
              )}

              <button
                type="submit"
                disabled={!selectedDate}
                className="w-full h-10 rounded-xl text-sm font-semibold transition-colors bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-white flex items-center justify-center"
              >
                {t.runBacktest}
              </button>
            </form>
          )}

          {/* ── Results ── */}
          {result && (
            <div className="space-y-4 animate-fade-in">

              {/* Params summary + action bar */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-[11px] text-zinc-500 uppercase tracking-wide font-medium">{t.resultLabel}</p>
                  {/* Screen: compact one-liner */}
                  <p className="text-xs text-zinc-400 truncate print:hidden">
                    <span className="font-semibold text-zinc-200 font-mono">{symbol}</span>
                    {stockName && <span className="text-zinc-300"> {stockName}</span>}
                    <span className="text-zinc-600"> · </span>{t.startLabel} {selectedDate}
                    <span className="text-zinc-600"> · </span>X={fmt(budget)}
                    <span className="text-zinc-600"> · </span>Y={fmt(profitThreshold)}
                    {z1Input && <><span className="text-zinc-600"> · </span>Z1={fmt(Number(z1Input))}</>}
                    {z2Input && <><span className="text-zinc-600"> · </span>Z2={fmt(Number(z2Input))}</>}
                    {z3Input && <><span className="text-zinc-600"> · </span>Z3={fmt(Number(z3Input))}</>}
                    {capInput && <><span className="text-zinc-600"> · </span>Cap={fmt(Number(capInput))}</>}
                  </p>
                  {/* Print: descriptive multi-line */}
                  <div className="hidden print:block text-xs space-y-0.5 mt-1">
                    <p>
                      <span className="font-mono font-semibold">{symbol}</span>
                      {stockName && ` ${stockName}`}
                      {language === 'zh' ? '　' : '  '}{t.printStart}{selectedDate}
                    </p>
                    <p>{t.printX}{fmt(budget)}{t.printY}{fmt(profitThreshold)}</p>
                    {(z1Input || z2Input || z3Input || capInput) && (
                      <p>
                        {z1Input && <>{t.printZ1}{fmt(Number(z1Input))}{language === 'zh' ? '　' : '  '}</>}
                        {z2Input && <>{t.printZ2}{fmt(Number(z2Input))}{language === 'zh' ? '　' : '  '}</>}
                        {z3Input && <>{t.printZ3}{fmt(Number(z3Input))}{language === 'zh' ? '　' : '  '}</>}
                        {capInput && <>{t.printCap}{fmt(Number(capInput))}</>}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0 print:hidden">
                  <button type="button" onClick={handleReset}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 text-zinc-300 transition-colors">
                    {t.adjust}
                  </button>
                  <button type="button" onClick={handleSaveJSON}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 text-zinc-300 transition-colors">
                    {t.exportJson}
                  </button>
                  <button type="button" onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 text-zinc-300 transition-colors">
                    {t.print}
                  </button>
                </div>
              </div>

              {/* Stop-loss banner */}
              {result.stopLossTriggered && (
                <div className="rounded-xl border border-rose-800/50 bg-rose-950/30 px-4 py-3 flex items-center gap-2.5 text-sm text-rose-300">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  {language === 'zh' ? (
                    <>{slReason}{' '}{t.slOn}{' '}<strong className="tabular-nums">{result.stopLossDate}</strong>{' '}{t.slTriggered}</>
                  ) : (
                    <>{slReason}{' '}{t.slOn}{' '}<strong className="tabular-nums">{result.stopLossDate}</strong>,{' '}{t.slTriggered}</>
                  )}
                </div>
              )}

              {/* Row 1 */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard label={t.totalInvested} value={fmt(result.totalCashIn)} prefix="NT$" onClick={() => setDetailType('cashIn')} />
                <StatCard label={t.realizedPnL}
                  value={(result.totalProfit >= 0 ? '+' : '') + fmt(result.totalProfit)}
                  prefix="NT$" accent={result.totalProfit >= 0 ? 'emerald' : 'rose'}
                  onClick={() => setDetailType('profit')}
                />
                <StatCard label={t.unrealized}        value={fmt(result.finalPositionValue)} prefix="NT$" />
                <StatCard label={t.trueReturn}
                  value={(result.realReturnRate >= 0 ? '+' : '') + result.realReturnRate.toFixed(2) + '%'}
                  accent={result.realReturnRate >= 0 ? 'emerald' : 'rose'} large
                />
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard label={t.maxCapital}    value={fmt(result.maxCashIn)}    prefix="NT$" accent="sky" />
                <StatCard label={t.capitalEff}
                  value={(result.capitalEfficiency >= 0 ? '+' : '') + result.capitalEfficiency.toFixed(2) + '%'}
                  accent={result.capitalEfficiency >= 0 ? 'emerald' : 'rose'}
                />
                <StatCard label={t.maxDrawdown}   value={result.maxDrawdownPct.toFixed(2) + '%'} accent="amber" />
                <StatCard label={t.fees}          value={fmt(result.totalFees)}    prefix="NT$" accent="rose" />
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard label={t.buyCount}    value={String(result.totalBuyCount)}       suffix={t.timesSuffix} accent="sky" />
                <StatCard label={t.sellCount}   value={String(result.totalSellCount)}      suffix={t.timesSuffix} accent="amber" />
                <StatCard label={t.finalShares} value={result.finalShares.toLocaleString()} suffix={t.sharesSuffix} />
                <StatCard label={t.lastClose}   value={result.finalPrice.toLocaleString()} prefix="NT$" />
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard label={t.winRate}
                  value={result.winRate.toFixed(1) + '%'}
                  accent={result.winRate >= 80 ? 'emerald' : result.winRate >= 50 ? 'amber' : 'rose'}
                />
                <StatCard label={t.avgProfit}
                  value={result.avgTakeProfitAmount > 0 ? fmt(result.avgTakeProfitAmount) : '—'}
                  prefix={result.avgTakeProfitAmount > 0 ? 'NT$' : undefined}
                  accent="amber"
                />
                <StatCard label={t.trueRR}    value={trueRRValue} accent={result.stopLossTriggered ? 'rose' : 'zinc'} />
                <StatCard label={t.stopDate}
                  value={result.stopLossTriggered ? (result.stopLossDate ?? '—') : t.notTriggered}
                  accent={result.stopLossTriggered ? 'rose' : 'zinc'}
                />
              </div>

              {/* Equity curve */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 print:hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-white">{t.curveTitle}</span>
                  <div className="flex items-center gap-4 text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-4 h-0.5 bg-indigo-500 block" />{t.curveTotalAssets}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-4 h-0.5 bg-zinc-500 block" />{t.curveCumInvested}
                    </span>
                  </div>
                </div>
                <EquityCurve snapshots={result.snapshots} lang={language} />
              </div>

              {/* Trade history */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-white">{t.tradesTitle}</span>
                  <span className="text-xs text-zinc-500 tabular-nums">
                    {result.trades.length}{t.tradesSuffix}
                  </span>
                </div>
                <TradeHistory trades={result.trades} lang={language} />
              </div>

            </div>
          )}
        </main>

        {/* ── Detail modal ── */}
        {detailType && result && (
          <DetailModal
            type={detailType}
            trades={result.trades}
            totalCashIn={result.totalCashIn}
            totalProfit={result.totalProfit}
            totalBuyCount={result.totalBuyCount}
            totalSellCount={result.totalSellCount}
            stopLossTriggered={result.stopLossTriggered}
            onClose={() => setDetailType(null)}
            t={t}
          />
        )}
      </div>

      {/* Settings gear button */}
      <ThemeToggle />
    </>
  );
}

/* ── Sub-components ── */

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wide">
        {label}
        {hint && <span className="block normal-case font-normal text-zinc-600 mt-0.5">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs text-zinc-500 tabular-nums">{children}</p>;
}

function NtdInput({
  value, onChange, onChangeStr, min, step, required, placeholder,
}: {
  value: number | string;
  onChange?: (v: number) => void;
  onChangeStr?: (v: string) => void;
  min?: number;
  step?: number;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 pointer-events-none select-none">
        NT$
      </span>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          if (onChangeStr) onChangeStr(e.target.value);
          else if (onChange) onChange(Number(e.target.value));
        }}
        className={`${INPUT} pl-9`}
        min={min}
        step={step}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}

type Accent = 'emerald' | 'rose' | 'sky' | 'amber' | 'zinc';

const ACCENT: Record<Accent, { border: string; text: string }> = {
  emerald: { border: 'border-l-emerald-500', text: 'text-emerald-400' },
  rose:    { border: 'border-l-rose-500',    text: 'text-rose-400'    },
  sky:     { border: 'border-l-sky-500',     text: 'text-sky-400'     },
  amber:   { border: 'border-l-amber-400',   text: 'text-amber-400'   },
  zinc:    { border: 'border-l-zinc-700',    text: 'text-white'       },
};

function StatCard({
  label, value, prefix, suffix, accent = 'zinc', large = false, onClick,
}: {
  label: string; value: string; prefix?: string; suffix?: string;
  accent?: Accent; large?: boolean; onClick?: () => void;
}) {
  const { border, text } = ACCENT[accent];
  return (
    <div
      className={`rounded-xl border border-zinc-800 border-l-2 ${border} bg-zinc-900 p-4 ${onClick ? 'cursor-pointer hover:bg-zinc-800/70 transition-colors group' : ''}`}
      onClick={onClick}
    >
      <p className="text-xs text-zinc-500 mb-2 flex items-center justify-between">
        <span>{label}</span>
        {onClick && <span className="opacity-0 group-hover:opacity-70 transition-opacity text-zinc-400 text-[10px] font-normal">details ↗</span>}
      </p>
      <p className={`font-bold tabular-nums leading-tight ${large ? 'text-2xl' : 'text-xl'} ${text}`}>
        {prefix && <span className="text-xs text-zinc-600 font-normal mr-0.5">{prefix}</span>}
        {value}
        {suffix && <span className="text-sm text-zinc-400 font-normal ml-1">{suffix}</span>}
      </p>
    </div>
  );
}

/* ── Detail modal ── */

const MODAL_TD = 'px-4 py-2.5 text-xs tabular-nums';

function CashInTable({ trades, t }: { trades: Trade[]; t: Tx }) {
  const rows: (Trade & { cumCashIn: number })[] = [];
  let cum = 0;
  for (const tr of trades.filter((tr) => tr.type === 'buy')) {
    cum += tr.amount + tr.fee;
    rows.push({ ...tr, cumCashIn: cum });
  }
  const [h0, h1, h2, h3, h4, h5] = t.cashInHeaders;
  const TH = 'px-4 py-2.5 text-[11px] font-medium text-zinc-400 uppercase tracking-wide whitespace-nowrap';
  return (
    <table className="w-full text-sm min-w-[480px]">
      <thead className="sticky top-0 bg-zinc-800/95 backdrop-blur-sm">
        <tr>
          <th className={`${TH} text-left`}>{h0}</th>
          <th className={`${TH} text-right`}>{h1}</th>
          <th className={`${TH} text-right`}>{h2}</th>
          <th className={`${TH} text-right`}>{h3}</th>
          <th className={`${TH} text-right`}>{h4}</th>
          <th className={`${TH} text-right`}>{h5}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((tr, i) => (
          <tr key={i} className={`border-t border-zinc-800/60 ${i % 2 === 1 ? 'bg-zinc-900/40' : ''}`}>
            <td className={`${MODAL_TD} text-zinc-400`}>{tr.date}</td>
            <td className={`${MODAL_TD} text-right text-zinc-200`}>{tr.shares.toLocaleString()}</td>
            <td className={`${MODAL_TD} text-right text-zinc-200`}>{tr.amount.toLocaleString()}</td>
            <td className={`${MODAL_TD} text-right text-rose-400/70`}>{tr.fee.toLocaleString()}</td>
            <td className={`${MODAL_TD} text-right text-zinc-300`}>{(tr.amount + tr.fee).toLocaleString()}</td>
            <td className={`${MODAL_TD} text-right font-medium text-sky-400`}>{Math.round(tr.cumCashIn).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ProfitTable({ trades, t }: { trades: Trade[]; t: Tx }) {
  const rows: (Trade & { cumProfit: number })[] = [];
  let cum = 0;
  for (const tr of trades.filter((tr) => tr.type === 'sell' || tr.type === 'exit')) {
    cum += tr.profit ?? 0;
    rows.push({ ...tr, cumProfit: cum });
  }
  const [h0, h1, h2, h3, h4] = t.profitHeaders;
  const TH = 'px-4 py-2.5 text-[11px] font-medium text-zinc-400 uppercase tracking-wide whitespace-nowrap';
  return (
    <table className="w-full text-sm min-w-[480px]">
      <thead className="sticky top-0 bg-zinc-800/95 backdrop-blur-sm">
        <tr>
          <th className={`${TH} text-left`}>{h0}</th>
          <th className={`${TH} text-left`}>{h1}</th>
          <th className={`${TH} text-right`}>{h2}</th>
          <th className={`${TH} text-right`}>{h3}</th>
          <th className={`${TH} text-right`}>{h4}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((tr, i) => (
          <tr key={i} className={`border-t border-zinc-800/60 ${i % 2 === 1 ? 'bg-zinc-900/40' : ''}`}>
            <td className={`${MODAL_TD} text-zinc-400`}>{tr.date}</td>
            <td className="px-4 py-2">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ring-1 ${
                tr.type === 'sell'
                  ? 'bg-amber-500/10 text-amber-400 ring-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 ring-rose-500/20'
              }`}>
                {tr.type === 'sell' ? t.typeStop : t.typeExit}
              </span>
            </td>
            <td className={`${MODAL_TD} text-right text-zinc-200`}>{tr.shares.toLocaleString()}</td>
            <td className={`${MODAL_TD} text-right font-medium ${(tr.profit ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {(tr.profit ?? 0) >= 0 ? '+' : ''}{Math.round(tr.profit ?? 0).toLocaleString()}
            </td>
            <td className={`${MODAL_TD} text-right font-medium ${tr.cumProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {tr.cumProfit >= 0 ? '+' : ''}{Math.round(tr.cumProfit).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DetailModal({
  type, trades, totalCashIn, totalProfit, totalBuyCount, totalSellCount,
  stopLossTriggered, onClose, t,
}: {
  type: 'cashIn' | 'profit';
  trades: Trade[];
  totalCashIn: number;
  totalProfit: number;
  totalBuyCount: number;
  totalSellCount: number;
  stopLossTriggered: boolean;
  onClose: () => void;
  t: Tx;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-zinc-900 rounded-2xl border border-zinc-800 w-full max-w-xl max-h-[78vh] flex flex-col shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 shrink-0">
          <div>
            <h3 className="font-semibold text-white">
              {type === 'cashIn' ? t.buyDetails : t.profitDetails}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              {type === 'cashIn'
                ? t.buysTotal(totalBuyCount)
                : t.profitTotal(totalSellCount, stopLossTriggered)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="overflow-auto flex-1">
          {type === 'cashIn' ? <CashInTable trades={trades} t={t} /> : <ProfitTable trades={trades} t={t} />}
        </div>

        <div className="px-5 py-3 border-t border-zinc-800 shrink-0 flex items-center justify-between text-sm">
          {type === 'cashIn' ? (
            <>
              <span className="text-zinc-500">{t.cumDeployed}</span>
              <span className="font-semibold text-zinc-100 tabular-nums">NT${fmt(totalCashIn)}</span>
            </>
          ) : (
            <>
              <span className="text-zinc-500">{t.cumRealized}</span>
              <span className={`font-semibold tabular-nums ${totalProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {totalProfit >= 0 ? '+' : ''}NT${fmt(totalProfit)}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
