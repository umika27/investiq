"use client";

import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, TrendingDown, Activity, Loader2 } from "lucide-react";

interface DataPoint {
  month: string;
  value: number;
}

interface Insight {
  trend: string;
  volatility: string;
  tip: string;
}

function analyzeTrend(data: DataPoint[]): Insight | null {
  if (!data || data.length === 0) return null;

  const first = data[0].value;
  const last = data[data.length - 1].value;

  const trend = last > first ? "Upward" : "Downward";

  const values = data.map((d) => d.value);
  const diff = Math.max(...values) - Math.min(...values);

  let volatility = "Low";
  if (diff > 40) volatility = "High";
  else if (diff > 20) volatility = "Medium";

  const tip =
    trend === "Upward"
      ? "Markets grow over time, but patience is key."
      : "Short-term declines are normal. Avoid emotional decisions.";

  return { trend, volatility, tip };
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1f2937] border border-[#374151] rounded-xl p-4 shadow-xl">
        <p className="text-[#9ca3af] text-sm mb-1">{label}</p>
        <p className="text-[#00A99D] text-xl font-bold">${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function TrendChart() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/trend")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const insight = analyzeTrend(data);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px]">
        <Loader2 className="w-8 h-8 text-[#00A99D] animate-spin mb-4" />
        <p className="text-[#9ca3af]">Loading market data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chart Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#f8fafc]">Market Trend</h3>
          <p className="text-[#9ca3af] text-sm">{data.length} data points</p>
        </div>
        {insight && (
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            insight.trend === "Upward" 
              ? 'bg-[#00A99D]/20 text-[#00A99D]' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            {insight.trend === "Upward" ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{insight.trend} Trend</span>
          </div>
        )}
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00A99D" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00A99D" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              stroke="#9ca3af" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#374151' }}
            />
            <YAxis 
              stroke="#9ca3af" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#374151' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00A99D"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      {insight && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#1f2937] rounded-xl p-4 border border-[#374151]/50 hover:border-[#00A99D]/30 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              {insight.trend === "Upward" ? (
                <TrendingUp className="w-5 h-5 text-[#00A99D]" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-400" />
              )}
              <span className="text-[#9ca3af] text-sm">Trend</span>
            </div>
            <p className="text-[#f8fafc] text-lg font-semibold">{insight.trend}</p>
          </div>
          
          <div className="bg-[#1f2937] rounded-xl p-4 border border-[#374151]/50 hover:border-[#F5A623]/30 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-[#F5A623]" />
              <span className="text-[#9ca3af] text-sm">Volatility</span>
            </div>
            <p className="text-[#f8fafc] text-lg font-semibold">{insight.volatility}</p>
          </div>
          
          <div className="bg-[#1f2937] rounded-xl p-4 border border-[#374151]/50 hover:border-[#4A90E2]/30 transition-colors md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#4A90E2]">*</span>
              <span className="text-[#9ca3af] text-sm">Learning Tip</span>
            </div>
            <p className="text-[#e5e7eb] text-sm leading-relaxed">{insight.tip}</p>
          </div>
        </div>
      )}
    </div>
  );
}
