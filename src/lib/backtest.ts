export interface DailyData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Trade {
  date: string;
  type: 'buy' | 'sell' | 'exit'; // 'exit' = stop-loss full liquidation
  price: number;
  shares: number;
  amount: number;
  fee: number;
  cumShares: number;
  profit?: number;
}

export interface DailySnapshot {
  date: string;
  positionValue: number; // shares × close
  totalCashIn: number;   // cumulative capital deployed
  wealth: number;        // totalProfit + positionValue (total realised + unrealised)
}

export interface BacktestOptions {
  /** Z1: exit when positionValue <= X - z1 (strategy dead line) */
  z1?: number;
  /** Z2: exit when totalCashIn - totalProfit - positionValue >= z2 (true net loss limit) */
  z2?: number;
  /** Z3: exit when peakWealth - currentWealth >= z3 (high-water-mark drawdown stop) */
  z3?: number;
  /** cap: max total capital investment – skip rebalance buys beyond this */
  cap?: number;
}

export interface BacktestResult {
  trades: Trade[];
  totalCashIn: number;
  totalProfit: number;
  finalShares: number;
  finalPrice: number;
  finalPositionValue: number;
  realReturnRate: number;
  totalBuyCount: number;
  totalSellCount: number;
  // Stop-loss
  stopLossTriggered: boolean;
  stopLossDate?: string;
  stopLossReason?: 'z1' | 'z2' | 'z3';
  // Risk metrics
  maxCashIn: number;
  totalFees: number;
  maxDrawdownPct: number;
  winRate: number;
  capitalEfficiency: number;
  avgTakeProfitAmount: number;
  // Equity curve data
  snapshots: DailySnapshot[];
}

const BUY_FEE_RATE = 0.001425;
const SELL_FEE_RATE = 0.001425 + 0.003;

function calcFee(amount: number, isSell: boolean): number {
  const rate = isSell ? SELL_FEE_RATE : BUY_FEE_RATE;
  return Math.max(Math.round(amount * rate), 20);
}

export function runBacktest(
  data: DailyData[],
  x: number,
  y: number,
  opts: BacktestOptions = {}
): BacktestResult {
  const { z1, z2, z3, cap } = opts;

  let shares = 0;
  let totalCashIn = 0;
  let totalProfit = 0;
  let totalFees = 0;
  let maxCashIn = 0;
  let peakWealth = 0;
  let maxDrawdownPct = 0;
  let stopLossTriggered = false;
  let stopLossDate: string | undefined;
  let stopLossReason: 'z1' | 'z2' | 'z3' | undefined;

  const trades: Trade[] = [];
  const snapshots: DailySnapshot[] = [];

  for (let i = 0; i < data.length; i++) {
    const { date, close } = data[i];
    let shouldBreak = false;

    if (i === 0) {
      // ── Initial buy ──
      const sharesToBuy = Math.floor(x / close);
      if (sharesToBuy > 0) {
        const amount = sharesToBuy * close;
        const fee = calcFee(amount, false);
        if (cap === undefined || totalCashIn + amount + fee <= cap) {
          shares += sharesToBuy;
          totalCashIn += amount + fee;
          totalFees += fee;
          trades.push({ date, type: 'buy', price: close, shares: sharesToBuy, amount, fee, cumShares: shares });
        }
      }
    } else {
      const positionValue = shares * close;

      // ── Z1: strategy dead line ──
      if (!shouldBreak && z1 !== undefined && z1 > 0 && shares > 0 && positionValue <= x - z1) {
        const amount = shares * close;
        const fee = calcFee(amount, true);
        const profit = amount - fee;
        totalProfit += profit;
        totalFees += fee;
        trades.push({ date, type: 'exit', price: close, shares, amount, fee, cumShares: 0, profit });
        shares = 0;
        stopLossTriggered = true;
        stopLossDate = date;
        stopLossReason = 'z1';
        shouldBreak = true;
      }

      // ── Z2: true net loss stop ──
      if (!shouldBreak && z2 !== undefined && z2 > 0 && shares > 0
          && totalCashIn - totalProfit - positionValue >= z2) {
        const amount = shares * close;
        const fee = calcFee(amount, true);
        const profit = amount - fee;
        totalProfit += profit;
        totalFees += fee;
        trades.push({ date, type: 'exit', price: close, shares, amount, fee, cumShares: 0, profit });
        shares = 0;
        stopLossTriggered = true;
        stopLossDate = date;
        stopLossReason = 'z2';
        shouldBreak = true;
      }

      // ── Z3: high-water-mark drawdown stop ──
      if (!shouldBreak && z3 !== undefined && z3 > 0 && shares > 0 && peakWealth > 0) {
        const currentWealth = totalProfit + positionValue;
        if (peakWealth - currentWealth >= z3) {
          const amount = shares * close;
          const fee = calcFee(amount, true);
          const profit = amount - fee;
          totalProfit += profit;
          totalFees += fee;
          trades.push({ date, type: 'exit', price: close, shares, amount, fee, cumShares: 0, profit });
          shares = 0;
          stopLossTriggered = true;
          stopLossDate = date;
          stopLossReason = 'z3';
          shouldBreak = true;
        }
      }

      if (!shouldBreak) {
        const pv = shares * close;

        // ── Take profit ──
        if (pv >= x + y) {
          const sharesToSell = Math.floor((pv - x) / close);
          if (sharesToSell > 0) {
            const amount = sharesToSell * close;
            const fee = calcFee(amount, true);
            const profit = amount - fee;
            shares -= sharesToSell;
            totalProfit += profit;
            totalFees += fee;
            trades.push({ date, type: 'sell', price: close, shares: sharesToSell, amount, fee, cumShares: shares, profit });
          }
        } else if (pv < x) {
          // ── Rebalance buy (respect cap) ──
          const sharesToBuy = Math.floor((x - pv) / close);
          if (sharesToBuy > 0) {
            const amount = sharesToBuy * close;
            const fee = calcFee(amount, false);
            if (cap === undefined || totalCashIn + amount + fee <= cap) {
              shares += sharesToBuy;
              totalCashIn += amount + fee;
              totalFees += fee;
              trades.push({ date, type: 'buy', price: close, shares: sharesToBuy, amount, fee, cumShares: shares });
            }
          }
        }
      }
    }

    // ── Daily snapshot (always recorded, even on exit day) ──
    const pv = shares * close;
    const wealth = totalProfit + pv;
    peakWealth = Math.max(peakWealth, wealth);
    if (peakWealth > 0) {
      maxDrawdownPct = Math.max(maxDrawdownPct, ((peakWealth - wealth) / peakWealth) * 100);
    }
    maxCashIn = Math.max(maxCashIn, totalCashIn);
    snapshots.push({ date, positionValue: pv, totalCashIn, wealth });

    if (shouldBreak) break;
  }

  const finalPrice = data.length > 0 ? data[data.length - 1].close : 0;
  const finalPositionValue = shares * finalPrice;
  const realReturnRate =
    totalCashIn > 0
      ? ((totalProfit + finalPositionValue - totalCashIn) / totalCashIn) * 100
      : 0;

  const sellCount = trades.filter((t) => t.type === 'sell').length;
  const exitCount = trades.filter((t) => t.type === 'exit').length;
  const winRate =
    sellCount + exitCount > 0
      ? (sellCount / (sellCount + exitCount)) * 100
      : 100;

  const totalPnL = totalProfit + finalPositionValue - totalCashIn;
  const capitalEfficiency = maxCashIn > 0 ? (totalPnL / maxCashIn) * 100 : 0;

  const sellTrades = trades.filter((t) => t.type === 'sell');
  const avgTakeProfitAmount =
    sellTrades.length > 0
      ? sellTrades.reduce((sum, t) => sum + (t.profit ?? 0), 0) / sellTrades.length
      : 0;

  return {
    trades,
    totalCashIn,
    totalProfit,
    finalShares: shares,
    finalPrice,
    finalPositionValue,
    realReturnRate,
    totalBuyCount: trades.filter((t) => t.type === 'buy').length,
    totalSellCount: sellCount,
    stopLossTriggered,
    stopLossDate,
    stopLossReason,
    maxCashIn,
    totalFees,
    maxDrawdownPct,
    winRate,
    capitalEfficiency,
    avgTakeProfitAmount,
    snapshots,
  };
}
