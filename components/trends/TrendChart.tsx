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
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Activity } from "lucide-react";

function analyzeTrend(data: any[]) {
  if (!data || data.length === 0) return null;

  const first = data[0].value;
  const last = data[data.length - 1].value;

  const isUpward = last > first;
  const trend = isUpward ? "Upward" : "Downward";
  const percentChange = ((last - first) / first * 100).toFixed(1);

  const values = data.map((d) => d.value);
  const diff = Math.max(...values) - Math.min(...values);

  let volatility = "Low";
  let volatilityColor = "text-green-600";
  if (diff > 40) {
    volatility = "High";
    volatilityColor = "text-red-500";
  } else if (diff > 20) {
    volatility = "Medium";
    volatilityColor = "text-amber-500";
  }

  const tip = isUpward
    ? "Markets grow over time, but patience is key."
    : "Short-term declines are normal. Avoid emotional decisions.";

  return { trend, volatility, volatilityColor, tip, isUpward, percentChange };
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100">
        <p className="text-sm font-semibold text-[#111827] mb-1">{label}</p>
        <p className="text-2xl font-bold text-[#00A99D]">{payload[0].value}</p>
        <p className="text-xs text-gray-500 mt-1">Market Value</p>
      </div>
    );
  }
  return null;
};

export default function TrendChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
        <div className="w-16 h-16 border-4 border-[#00A99D]/20 border-t-[#00A99D] rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading market data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00A99D] to-[#4A90E2] rounded-xl flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#111827]">Market Trend</h3>
            <p className="text-sm text-gray-500">{data.length} data points analyzed</p>
          </div>
        </div>
        {insight && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${insight.isUpward ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {insight.isUpward ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="font-semibold">{insight.percentChange}%</span>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="w-full h-[300px] min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data}
            onMouseMove={(e) => {
              if (e.activeTooltipIndex !== undefined) {
                setActiveIndex(e.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00A99D" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00A99D" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00A99D"
              strokeWidth={3}
              fill="url(#colorValue)"
              dot={(props) => {
                const { cx, cy, index } = props;
                return (
                  <circle
                    key={index}
                    cx={cx}
                    cy={cy}
                    r={activeIndex === index ? 8 : 4}
                    fill={activeIndex === index ? "#00A99D" : "#fff"}
                    stroke="#00A99D"
                    strokeWidth={2}
                    style={{ transition: 'all 0.2s ease' }}
                  />
                );
              }}
              activeDot={{ r: 8, fill: "#00A99D", stroke: "#fff", strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Insights Grid */}
      {insight && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Trend Card */}
          <div className={`p-4 rounded-2xl ${insight.isUpward ? 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200' : 'bg-gradient-to-br from-red-50 to-red-100 border border-red-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              {insight.isUpward ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
              <span className="font-semibold text-gray-700">Trend</span>
            </div>
            <p className={`text-2xl font-bold ${insight.isUpward ? 'text-green-700' : 'text-red-600'}`}>
              {insight.trend}
            </p>
          </div>

          {/* Volatility Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className={`w-5 h-5 ${insight.volatilityColor}`} />
              <span className="font-semibold text-gray-700">Volatility</span>
            </div>
            <p className={`text-2xl font-bold ${insight.volatilityColor}`}>
              {insight.volatility}
            </p>
          </div>

          {/* Tip Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">Learning Tip</span>
            </div>
            <p className="text-sm text-blue-700 leading-relaxed">{insight.tip}</p>
          </div>
        </div>
      )}
    </div>
  );
}
