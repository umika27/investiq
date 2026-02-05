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
import { TrendingUp, TrendingDown, Activity, Loader2, Sparkles, Lightbulb } from "lucide-react";

interface DataPoint {
  month: string;
  value: number;
  date?: string;
}

interface TrendChartProps {
  selectedYear: string;
  onYearsLoaded: (years: string[]) => void;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1f2937] border border-[#374151] rounded-xl p-4 shadow-xl">
        <p className="text-[#9ca3af] text-sm mb-1">{label}</p>
        <p className="text-[#00A99D] text-xl font-bold">${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export default function TrendChart({ selectedYear, onYearsLoaded }: TrendChartProps) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Fetch data when year changes
  useEffect(() => {
    setLoading(true);
    setAiAnalysis("");
    
    fetch(`/api/trend?year=${selectedYear}`)
      .then((res) => res.json())
      .then((response) => {
        setData(response.data || []);
        if (response.availableYears) {
          onYearsLoaded(response.availableYears);
        }
        setLoading(false);
      })
      .catch(() => {
        setData([]);
        setLoading(false);
      });
  }, [selectedYear, onYearsLoaded]);

  // Calculate basic trend info
  const getTrendInfo = () => {
    if (!data || data.length === 0) return null;
    
    const first = data[0].value;
    const last = data[data.length - 1].value;
    const values = data.map(d => d.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const percentChange = ((last - first) / first * 100);
    const volatilityRange = ((max - min) / first * 100);
    
    let volatility = "Low";
    if (volatilityRange > 30) volatility = "High";
    else if (volatilityRange > 15) volatility = "Medium";
    
    return {
      trend: last > first ? "Upward" : "Downward",
      percentChange: percentChange.toFixed(2),
      volatility,
      high: max.toFixed(2),
      low: min.toFixed(2)
    };
  };

  const trendInfo = getTrendInfo();

  // Get AI analysis
  const getAIAnalysis = async () => {
    if (!data || data.length === 0) return;
    
    setIsAnalyzing(true);
    setAiAnalysis("");

    try {
      const res = await fetch('/api/trend-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          data, 
          timeframe: selectedYear === 'all' ? 'all available data' : selectedYear 
        }),
      });

      if (!res.ok) throw new Error('Failed to get analysis');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullResponse += chunk;
          setAiAnalysis(fullResponse);
        }
      }
    } catch (error) {
      setAiAnalysis("Unable to get AI analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px]">
        <Loader2 className="w-8 h-8 text-[#00A99D] animate-spin mb-4" />
        <p className="text-[#9ca3af]">Loading market data...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px]">
        <p className="text-[#9ca3af]">No data available for this period</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chart Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-xl font-bold text-[#f8fafc]">
            Market Trend {selectedYear !== 'all' && `(${selectedYear})`}
          </h3>
          <p className="text-[#9ca3af] text-sm">{data.length} data points</p>
        </div>
        {trendInfo && (
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            trendInfo.trend === "Upward" 
              ? 'bg-[#00A99D]/20 text-[#00A99D]' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            {trendInfo.trend === "Upward" ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{trendInfo.percentChange}%</span>
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
              domain={['auto', 'auto']}
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

      {/* Stats & AI Analysis */}
      {trendInfo && (
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#1f2937] rounded-xl p-4 border border-[#374151]/50">
              <div className="flex items-center gap-2 mb-2">
                {trendInfo.trend === "Upward" ? (
                  <TrendingUp className="w-4 h-4 text-[#00A99D]" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className="text-[#9ca3af] text-sm">Trend</span>
              </div>
              <p className="text-[#f8fafc] text-lg font-semibold">{trendInfo.trend}</p>
            </div>
            
            <div className="bg-[#1f2937] rounded-xl p-4 border border-[#374151]/50">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-[#F5A623]" />
                <span className="text-[#9ca3af] text-sm">Volatility</span>
              </div>
              <p className="text-[#f8fafc] text-lg font-semibold">{trendInfo.volatility}</p>
            </div>
            
            <div className="bg-[#1f2937] rounded-xl p-4 border border-[#374151]/50">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#00A99D]" />
                <span className="text-[#9ca3af] text-sm">Period High</span>
              </div>
              <p className="text-[#f8fafc] text-lg font-semibold">${trendInfo.high}</p>
            </div>
            
            <div className="bg-[#1f2937] rounded-xl p-4 border border-[#374151]/50">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-red-400" />
                <span className="text-[#9ca3af] text-sm">Period Low</span>
              </div>
              <p className="text-[#f8fafc] text-lg font-semibold">${trendInfo.low}</p>
            </div>
          </div>

          {/* AI Analysis Button */}
          <button
            onClick={getAIAnalysis}
            disabled={isAnalyzing}
            className="w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-r from-[#4A90E2] to-[#00A99D] text-white hover:shadow-lg hover:shadow-[#4A90E2]/30"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Get AI Insights & Learning Tips
              </>
            )}
          </button>

          {/* AI Analysis Result */}
          {aiAnalysis && (
            <div className="p-5 bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-xl border border-[#4A90E2]/30">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-[#F5A623]" />
                <span className="text-[#F5A623] font-medium">AI Analysis & Learning Tip</span>
              </div>
              <p className="text-[#e5e7eb] leading-relaxed">{aiAnalysis}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
