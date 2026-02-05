"use client";

import { useEffect, useState, useCallback } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Lightbulb, 
  Activity, 
  Calendar,
  Sparkles,
  Loader2,
  Brain,
  Target,
  ArrowRight
} from "lucide-react";

interface TrendData {
  month: string;
  fullDate: string;
  value: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: string;
}

interface AIAnalysis {
  volatility: string;
  volatilityScore: number;
  volatilityExplanation: string;
  trend: string;
  trendStrength: string;
  learningTip: string;
  keyInsight: string;
  recommendation: string;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ payload: TrendData }>; label?: string }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100">
        <p className="text-sm font-semibold text-[#111827] mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-[#00A99D]">${data.value.toFixed(2)}</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <span className="text-gray-500">Open: <span className="text-gray-700">${data.open?.toFixed(2)}</span></span>
            <span className="text-gray-500">High: <span className="text-green-600">${data.high?.toFixed(2)}</span></span>
            <span className="text-gray-500">Low: <span className="text-red-500">${data.low?.toFixed(2)}</span></span>
            <span className={`text-gray-500`}>Change: <span className={parseFloat(data.change) >= 0 ? 'text-green-600' : 'text-red-500'}>{data.change}%</span></span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function TrendChart() {
  const [data, setData] = useState<TrendData[]>([]);
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const fetchData = useCallback(async (year: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/trend?year=${year}`);
      const result = await res.json();
      setData(result.data || []);
      setAvailableYears(result.availableYears || []);
      setSelectedYear(result.selectedYear || "all");
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData("all");
  }, [fetchData]);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setAiAnalysis(null);
    fetchData(year);
  };

  const analyzeWithAI = async () => {
    if (data.length === 0) return;
    
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/trend-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, year: selectedYear }),
      });

      if (!res.ok) throw new Error('Analysis failed');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullResponse += decoder.decode(value, { stream: true });
        }
      }

      // Parse JSON from response
      let jsonStr = fullResponse.trim();
      if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```/g, '');
      }
      
      const analysis = JSON.parse(jsonStr);
      setAiAnalysis(analysis);
    } catch (error) {
      console.error('AI analysis failed:', error);
      // Fallback analysis
      const values = data.map(d => d.value);
      const first = values[0];
      const last = values[values.length - 1];
      const max = Math.max(...values);
      const min = Math.min(...values);
      const range = ((max - min) / ((max + min) / 2)) * 100;

      setAiAnalysis({
        volatility: range > 30 ? "High" : range > 15 ? "Medium" : "Low",
        volatilityScore: Math.min(100, Math.round(range * 2)),
        volatilityExplanation: `Price ranged from $${min.toFixed(2)} to $${max.toFixed(2)} during this period.`,
        trend: last > first ? "Bullish" : "Bearish",
        trendStrength: Math.abs(last - first) / first > 0.2 ? "Strong" : "Moderate",
        learningTip: "Diversification helps manage volatility. Consider spreading investments across different asset classes.",
        keyInsight: `The market ${last > first ? 'gained' : 'lost'} ${Math.abs(((last - first) / first) * 100).toFixed(1)}% over this period.`,
        recommendation: "Focus on long-term trends rather than short-term fluctuations.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Calculate basic stats for display
  const stats = data.length > 0 ? {
    first: data[0].value,
    last: data[data.length - 1].value,
    isUpward: data[data.length - 1].value > data[0].value,
    percentChange: ((data[data.length - 1].value - data[0].value) / data[0].value * 100).toFixed(1),
  } : null;

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00A99D] to-[#4A90E2] rounded-xl flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#111827]">Market Trend</h3>
            <p className="text-sm text-gray-500">{data.length} data points analyzed</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Year Selector */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
            <Calendar className="w-4 h-4 text-gray-500 ml-2" />
            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
              className="bg-transparent text-sm font-medium text-gray-700 pr-2 py-1 focus:outline-none cursor-pointer"
            >
              <option value="all">Last 12 Months</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Change Badge */}
          {stats && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${stats.isUpward ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {stats.isUpward ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="font-semibold">{stats.percentChange}%</span>
            </div>
          )}
        </div>
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
              tick={{ fill: '#6B7280', fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              domain={['dataMin - 5', 'dataMax + 5']}
              tickFormatter={(value) => `$${value}`}
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

      {/* AI Analysis Button */}
      <button
        onClick={analyzeWithAI}
        disabled={isAnalyzing || data.length === 0}
        className="w-full bg-gradient-to-r from-[#00A99D] to-[#4A90E2] hover:from-[#009a8d] hover:to-[#3a80d2] disabled:from-gray-300 disabled:to-gray-400 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:shadow-none"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Analyzing with Grok AI...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Generate AI Trend Analysis</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      {/* AI Analysis Results */}
      {aiAnalysis && (
        <div className="space-y-4 animate-fade-in-up">
          {/* Main Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Trend Card */}
            <div className={`p-5 rounded-2xl ${aiAnalysis.trend === 'Bullish' ? 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200' : aiAnalysis.trend === 'Bearish' ? 'bg-gradient-to-br from-red-50 to-red-100 border border-red-200' : 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-3">
                {aiAnalysis.trend === 'Bullish' ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : aiAnalysis.trend === 'Bearish' ? (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                ) : (
                  <Activity className="w-5 h-5 text-gray-600" />
                )}
                <span className="font-semibold text-gray-700">Trend Direction</span>
              </div>
              <p className={`text-2xl font-bold ${aiAnalysis.trend === 'Bullish' ? 'text-green-700' : aiAnalysis.trend === 'Bearish' ? 'text-red-600' : 'text-gray-700'}`}>
                {aiAnalysis.trend}
              </p>
              <p className="text-sm text-gray-600 mt-1">{aiAnalysis.trendStrength} strength</p>
            </div>

            {/* Volatility Card */}
            <div className={`p-5 rounded-2xl ${aiAnalysis.volatility === 'High' ? 'bg-gradient-to-br from-red-50 to-red-100 border border-red-200' : aiAnalysis.volatility === 'Medium' ? 'bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200' : 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200'}`}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className={`w-5 h-5 ${aiAnalysis.volatility === 'High' ? 'text-red-500' : aiAnalysis.volatility === 'Medium' ? 'text-amber-500' : 'text-green-600'}`} />
                <span className="font-semibold text-gray-700">Volatility</span>
              </div>
              <p className={`text-2xl font-bold ${aiAnalysis.volatility === 'High' ? 'text-red-600' : aiAnalysis.volatility === 'Medium' ? 'text-amber-600' : 'text-green-700'}`}>
                {aiAnalysis.volatility}
              </p>
              <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${aiAnalysis.volatility === 'High' ? 'bg-red-500' : aiAnalysis.volatility === 'Medium' ? 'bg-amber-500' : 'bg-green-500'}`}
                  style={{ width: `${aiAnalysis.volatilityScore}%` }}
                />
              </div>
            </div>

            {/* Learning Tip Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-700">Learning Tip</span>
              </div>
              <p className="text-sm text-blue-700 leading-relaxed">{aiAnalysis.learningTip}</p>
            </div>
          </div>

          {/* Key Insight & Recommendation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-gray-700">AI Key Insight</span>
              </div>
              <p className="text-sm text-purple-700 leading-relaxed">{aiAnalysis.keyInsight}</p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-teal-600" />
                <span className="font-semibold text-gray-700">Recommendation</span>
              </div>
              <p className="text-sm text-teal-700 leading-relaxed">{aiAnalysis.recommendation}</p>
            </div>
          </div>

          {/* Volatility Explanation */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">Volatility Analysis:</span> {aiAnalysis.volatilityExplanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
