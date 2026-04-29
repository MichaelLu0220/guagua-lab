'use client';

import { useEffect, useRef } from 'react';
import { createChart, AreaSeries, LineSeries, ColorType, CrosshairMode } from 'lightweight-charts';
import type { DailySnapshot } from '@/lib/backtest';

interface Props {
  snapshots: DailySnapshot[];
  lang?: 'en' | 'zh';
}

export default function EquityCurve({ snapshots, lang = 'zh' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || snapshots.length === 0) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#18181b' },
        textColor: '#a1a1aa',
      },
      grid: {
        vertLines: { color: '#27272a' },
        horzLines: { color: '#27272a' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { color: '#52525b', width: 1, style: 3, labelBackgroundColor: '#3f3f46' },
        horzLine: { color: '#52525b', width: 1, style: 3, labelBackgroundColor: '#3f3f46' },
      },
      width: containerRef.current.clientWidth,
      height: 280,
      rightPriceScale: {
        borderColor: '#27272a',
        scaleMargins: { top: 0.12, bottom: 0.08 },
      },
      timeScale: { borderColor: '#27272a', fixLeftEdge: true, fixRightEdge: true },
    });

    // Total wealth — area chart with gradient fill
    const wealthSeries = chart.addSeries(AreaSeries, {
      lineColor: '#a5b4fc',
      topColor: 'rgba(99, 102, 241, 0.4)',
      bottomColor: 'rgba(99, 102, 241, 0.0)',
      lineWidth: 2,
      title: lang === 'en' ? 'Total Assets' : '總資產',
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      crosshairMarkerBorderColor: '#a5b4fc',
      crosshairMarkerBackgroundColor: '#18181b',
      crosshairMarkerBorderWidth: 2,
    });
    wealthSeries.setData(
      snapshots.map((s) => ({
        time: s.date as `${number}-${number}-${number}`,
        value: s.wealth,
      }))
    );

    // Capital deployed — dashed reference line
    const capitalSeries = chart.addSeries(LineSeries, {
      color: '#71717a',
      lineWidth: 1,
      lineStyle: 2,
      title: lang === 'en' ? 'Total Invested' : '累計投入',
      crosshairMarkerVisible: false,
    });
    capitalSeries.setData(
      snapshots.map((s) => ({
        time: s.date as `${number}-${number}-${number}`,
        value: s.totalCashIn,
      }))
    );

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [snapshots, lang]);

  return <div ref={containerRef} className="w-full rounded-lg overflow-hidden" />;
}
