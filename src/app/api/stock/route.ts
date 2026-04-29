import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate') || new Date().toISOString().split('T')[0];

  if (!symbol || !startDate) {
    return NextResponse.json({ error: '缺少股票代號或起始日期' }, { status: 400 });
  }

  const token = process.env.FINMIND_TOKEN || '';
  const params = new URLSearchParams({
    dataset: 'TaiwanStockPrice',
    data_id: symbol,
    start_date: startDate,
    end_date: endDate,
    ...(token && { token }),
  });

  try {
    const res = await fetch(`https://api.finmindtrade.com/api/v4/data?${params}`, {
      next: { revalidate: 3600 },
    });
    const json = await res.json();

    if (json.status !== 200) {
      return NextResponse.json(
        { error: json.msg || '無法取得股票資料' },
        { status: 400 }
      );
    }

    return NextResponse.json(json.data);
  } catch {
    return NextResponse.json({ error: '無法連線至資料服務，請稍後再試' }, { status: 500 });
  }
}
