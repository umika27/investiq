import { NextResponse } from "next/server";
import trendData from "@/data/trend.json";

export async function GET() {
  try {
    const raw = trendData["Monthly Time Series"];

    const monthNames = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const data = Object.entries(raw)
      .slice(0, 6)
      .map(([date, value]: any) => {
        const monthIndex = parseInt(date.slice(5, 7)) - 1;
        return {
          month: monthNames[monthIndex],
          value: parseFloat(value["4. close"])
        };
      })
      .reverse();
    

    console.log("TREND API RESPONSE:", data);
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json([]);
  }
}
