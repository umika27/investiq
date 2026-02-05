"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { name: "Equity", value: 50, color: "#4A90E2", description: "Stocks & mutual funds" },
  { name: "Gold", value: 30, color: "#F5A623", description: "Gold & precious metals" },
  { name: "Bonds", value: 20, color: "#00A99D", description: "Fixed income securities" },
];

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;

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

export default function PortfolioPie() {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#4A90E2] to-[#00A99D] rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Asset Allocation</h2>
            <p className="text-sm text-gray-500">Portfolio distribution</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={data} 
              dataKey="value" 
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, i) => (
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

      {/* Legend */}
      <div className="flex justify-center gap-6">
        {data.map((item, index) => (
          <button
            key={item.name}
            onClick={() => setActiveIndex(index)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${activeIndex === index ? 'bg-gray-100 scale-105' : 'hover:bg-gray-50'}`}
          >
            <div 
              className="w-3 h-3 rounded-full transition-transform duration-300"
              style={{ 
                backgroundColor: item.color,
                transform: activeIndex === index ? 'scale(1.3)' : 'scale(1)'
              }} 
            />
            <span className={`text-sm transition-colors duration-300 ${activeIndex === index ? 'font-semibold text-[#111827]' : 'text-gray-600'}`}>
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
