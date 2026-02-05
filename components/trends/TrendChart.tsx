"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function analyzeTrend(data: any[]) {
  if (!data || data.length === 0) return null;

  const first = data[0].value;
  const last = data[data.length - 1].value;

  const trend = last > first ? "Upward 📈" : "Downward 📉";

  const values = data.map((d) => d.value);
  const diff = Math.max(...values) - Math.min(...values);

  let volatility = "Low";
  if (diff > 40) volatility = "High";
  else if (diff > 20) volatility = "Medium";

  const tip =
    trend.includes("Upward")
      ? "Markets grow over time, but patience is key."
      : "Short-term declines are normal. Avoid emotional decisions.";

  return { trend, volatility, tip };
}

export default function TrendChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/trend")
      .then((res) => res.json())
      .then((d) => {
        console.log("Trend data:", d);
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const insight = analyzeTrend(data);

  if (loading) {
    return <p className="text-[#111827]">Loading chart...</p>;
  }

  return (
    <>
      <h3 className="text-lg font-semibold text-[#111827] mb-2">
        Market Trend
      </h3>

      <p className="text-xs text-gray-500 mb-2">
        Data points: {data.length}
      </p>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00A99D"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {insight && (
        <div className="mt-6 p-4 bg-[#E0F7FA] rounded-lg text-[#111827]">
          <p><strong>Trend:</strong> {insight.trend}</p>
          <p><strong>Volatility:</strong> {insight.volatility}</p>
          <p><strong>Learning Tip:</strong> {insight.tip}</p>
        </div>
      )}
    </>
  );
}
