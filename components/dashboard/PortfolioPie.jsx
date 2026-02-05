"use client";

import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from "recharts";
import { TrendingUp, Sparkles, Loader2, RotateCcw } from "lucide-react";

const ASSET_CONFIG = {
  equity: { name: "Equity", color: "#4A90E2", description: "Stocks & mutual funds" },
  gold: { name: "Gold", color: "#F5A623", description: "Gold & precious metals" },
  bonds: { name: "Bonds", color: "#00A99D", description: "Fixed income securities" },
};

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill="#111827" className="text-2xl font-bold">
        {payload.value}%
      </text>
      <text x={cx} y={cy + 15} textAnchor="middle" fill="#6B7280" className="text-sm">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 16}
        fill={fill}
        opacity={0.3}
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
          <span className="font-semibold text-[#111827]">{data.name}</span>
        </div>
        <p className="text-2xl font-bold text-[#111827]">{data.value}%</p>
        <p className="text-xs text-gray-500 mt-1">{data.description}</p>
      </div>
    );
  }
  return null;
};

export default function PortfolioPie({ allocation, onAllocationChange, onAnalyze, isAnalyzing }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const chartData = useMemo(() => [
    { ...ASSET_CONFIG.equity, value: allocation.equity, key: "equity" },
    { ...ASSET_CONFIG.gold, value: allocation.gold, key: "gold" },
    { ...ASSET_CONFIG.bonds, value: allocation.bonds, key: "bonds" },
  ], [allocation]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleSliderChange = (key, newValue) => {
    const remaining = 100 - newValue;
    const otherKeys = Object.keys(allocation).filter(k => k !== key);
    const otherTotal = otherKeys.reduce((sum, k) => sum + allocation[k], 0);

    const newAllocation = { ...allocation, [key]: newValue };
    
    if (otherTotal === 0) {
      // Distribute equally
      otherKeys.forEach(k => {
        newAllocation[k] = Math.round(remaining / otherKeys.length);
      });
    } else {
      // Distribute proportionally
      otherKeys.forEach(k => {
        newAllocation[k] = Math.round((allocation[k] / otherTotal) * remaining);
      });
    }

    // Ensure total is exactly 100
    const total = Object.values(newAllocation).reduce((a, b) => a + b, 0);
    if (total !== 100) {
      const diff = 100 - total;
      const adjustKey = otherKeys[0];
      newAllocation[adjustKey] += diff;
    }

    onAllocationChange(newAllocation);
  };

  const resetAllocation = () => {
    onAllocationChange({ equity: 50, gold: 30, bonds: 20 });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#4A90E2] to-[#00A99D] rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Asset Allocation</h2>
            <p className="text-sm text-gray-500">Drag sliders to customize</p>
          </div>
        </div>
        <button
          onClick={resetAllocation}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          title="Reset to default"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Chart */}
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={chartData} 
              dataKey="value" 
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              animationBegin={0}
              animationDuration={500}
            >
              {chartData.map((entry, i) => (
                <Cell 
                  key={i} 
                  fill={entry.color}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Sliders */}
      <div className="space-y-4">
        {chartData.map((item, index) => (
          <div key={item.key}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
              </div>
              <span 
                className="text-sm font-bold"
                style={{ color: item.color }}
              >
                {item.value}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={item.value}
              onChange={(e) => handleSliderChange(item.key, Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${item.color} 0%, ${item.color} ${item.value}%, #e5e7eb ${item.value}%, #e5e7eb 100%)`
              }}
            />
          </div>
        ))}
      </div>

      {/* Analyze Button */}
      <button
        onClick={onAnalyze}
        disabled={isAnalyzing}
        className="w-full bg-gradient-to-r from-[#4A90E2] to-[#00A99D] hover:from-[#3a80d2] hover:to-[#009a8d] disabled:from-gray-300 disabled:to-gray-400 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Analyzing with AI...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Get AI Risk Assessment</span>
          </>
        )}
      </button>
    </div>
  );
}
