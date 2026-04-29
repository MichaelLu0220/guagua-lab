'use client';

import { useEffect, useRef } from 'react';
import {
  createChart,
  CandlestickSeries,
  ColorType,
  createSeriesMarkers,
} from 'lightweight-charts';
import type { IChartApi, SeriesType, ISeriesApi, Time, ISeriesMarkersPluginApi } from 'lightweight-charts';
import type { DailyData, Trade } from '@/lib/backtest';

interface Props {
  data: DailyData[];
  trades: Trade[];
  onDateSelect?: (date: string) => void;
  selectedDate?: string;
}

function timeToDateStr(t: Time): string {
  if (typeof t === 'string') return t;
  if (typeof t === 'number') return new Date(t * 1000).toISOString().split('T')[0];
  const { year, month, day } = t as { year: number; month: number; day: number };
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function KLineChart({ data, trades, onDateSelect, selectedDate }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<SeriesType> | null>(null);
  const markersPluginRef = useRef<ISeriesMarkersPluginApi<Time> | null>(null);
  const onDateSelectRef = useRef(onDateSelect);

  useEffect(() => {
    onDateSelectRef.current = onDateSelect;
  });

  // Create chart when data changes
  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#18181b' },
        textColor: '#a1a1aa',
      },
      grid: {
        vertLines: { color: '#27272a' },
        horzLines: { color: '#27272a' },
      },
      width: containerRef.current.clientWidth,
      height: 420,
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#ef4444',
      downColor: '#22c55e',
      borderVisible: false,
      wickUpColor: '#ef4444',
      wickDownColor: '#22c55e',
    });

    candleSeries.setData(
      data.map((d) => ({
        time: d.date as `${number}-${number}-${number}`,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
      }))
    );

    chart.subscribeClick((param) => {
      if (param.time == null || !onDateSelectRef.current) return;
      onDateSelectRef.current(timeToDateStr(param.time));
    });

    chart.timeScale().fitContent();
    chartRef.current = chart;
    seriesRef.current = candleSeries as unknown as ISeriesApi<SeriesType>;

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
      markersPluginRef.current = null;
    };
  }, [data]);

  // Update markers — reuse the same plugin instance to avoid stacking layers
  useEffect(() => {
    if (!seriesRef.current) return;

    const markers = [
      ...(selectedDate
        ? [{
            time: selectedDate as `${number}-${number}-${number}`,
            position: 'inBar' as const,
            shape: 'circle' as const,
            color: '#fbbf24',
            size: 2,
            text: '',
          }]
        : []),
      ...trades.map((t) => ({
        time: t.date as `${number}-${number}-${number}`,
        position: t.type === 'buy' ? ('belowBar' as const) : ('aboveBar' as const),
        shape: t.type === 'buy' ? ('arrowUp' as const) : ('arrowDown' as const),
        color: t.type === 'buy' ? '#38bdf8' : '#f97316',
        text: String(t.shares),
      })),
    ];

    if (markersPluginRef.current) {
      markersPluginRef.current.setMarkers(markers);
    } else {
      markersPluginRef.current = createSeriesMarkers(seriesRef.current, markers);
    }
  }, [trades, selectedDate]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-lg overflow-hidden"
      style={{ cursor: onDateSelect ? 'crosshair' : 'default' }}
    />
  );
}
