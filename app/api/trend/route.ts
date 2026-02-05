import { NextResponse } from "next/server";
import trendData from "@/data/trend.json";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year') || 'all';
    
    const raw = trendData["Monthly Time Series"];

    const monthNames = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    let entries = Object.entries(raw);
    
    // Filter by year if specified
    if (year !== 'all') {
      entries = entries.filter(([date]) => date.startsWith(year));
    }

    // Get data based on timeframe
    const sliceCount = year === 'all' ? 12 : entries.length;
    
    const data = entries
      .slice(0, sliceCount)
      .map(([date, value]: [string, unknown]) => {
        const monthIndex = parseInt(date.slice(5, 7)) - 1;
        const yearStr = date.slice(0, 4);
        const val = value as { "4. close": string };
        return {
          month: year === 'all' ? `${monthNames[monthIndex]} ${yearStr.slice(2)}` : monthNames[monthIndex],
          value: parseFloat(val["4. close"]),
          date: date
        };
      })
      .reverse();
    
    // Get available years from data
    const availableYears = [...new Set(Object.keys(raw).map(date => date.slice(0, 4)))].sort().reverse();

    return NextResponse.json({ data, availableYears });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ data: [], availableYears: [] });
  }
}
