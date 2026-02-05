import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import trendData from "@/data/trend.json";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year") || "all";

    const raw = trendData["Monthly Time Series"] as Record<string, Record<string, string>>;

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Get all available years
    const availableYears = [...new Set(
      Object.keys(raw).map(date => date.slice(0, 4))
    )].sort().reverse();

    let filteredEntries = Object.entries(raw);

    if (year !== "all") {
      filteredEntries = filteredEntries.filter(([date]) => date.startsWith(year));
    } else {
      // Default to last 12 months
      filteredEntries = filteredEntries.slice(0, 12);
    }

    const data = filteredEntries
      .map(([date, value]) => {
        const monthIndex = parseInt(date.slice(5, 7)) - 1;
        const yearStr = date.slice(0, 4);
        const close = parseFloat(value["4. close"]);
        const open = parseFloat(value["1. open"]);
        const high = parseFloat(value["2. high"]);
        const low = parseFloat(value["3. low"]);
        const volume = parseInt(value["5. volume"]);

        return {
          month: `${monthNames[monthIndex]} ${yearStr.slice(2)}`,
          fullDate: date,
          value: close,
          open,
          high,
          low,
          close,
          volume,
          change: ((close - open) / open * 100).toFixed(2),
        };
      })
      .reverse();

    return NextResponse.json({
      data,
      availableYears,
      selectedYear: year,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ data: [], availableYears: [], selectedYear: "all" });
  }
}
