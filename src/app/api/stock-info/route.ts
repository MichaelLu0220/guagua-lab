import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ name: null }, { status: 400 });
  }

  const token = process.env.FINMIND_TOKEN || '';
  const params = new URLSearchParams({
    dataset: 'TaiwanStockInfo',
    data_id: symbol,
    ...(token && { token }),
  });

  try {
    const res = await fetch(
      `https://api.finmindtrade.com/api/v4/data?${params}`,
      { next: { revalidate: 86400 } }
    );
    const json = await res.json();

    if (json.status !== 200 || !Array.isArray(json.data) || json.data.length === 0) {
      return NextResponse.json({ name: null });
    }

    const name: string | null = json.data[0].company_name ?? json.data[0].stock_name ?? null;
    return NextResponse.json({ name });
  } catch {
    return NextResponse.json({ name: null });
  }
}
