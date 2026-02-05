"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from "recharts";

const data = [
  { name: "Equity", value: 50, color: "#00A99D" },
  { name: "Gold", value: 30, color: "#F5A623" },
  { name: "Bonds", value: 20, color: "#4A90E2" },
];

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: 'drop-shadow(0 0 10px rgba(0, 169, 157, 0.5))' }}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 14}
        fill={fill}
      />
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#f8fafc" className="text-lg font-bold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 15} textAnchor="middle" fill="#9ca3af" className="text-sm">
        {`${value}% (${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1f2937] border border-[#374151] rounded-xl p-3 shadow-xl">
        <p className="text-[#f8fafc] font-medium">{payload[0].name}</p>
        <p className="text-[#9ca3af] text-sm">{payload[0].value}% of portfolio</p>
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
    <div className="space-y-6">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
            onMouseEnter={onPieEnter}
            style={{ cursor: 'pointer' }}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                style={{ 
                  filter: index === activeIndex ? 'brightness(1.2)' : 'brightness(1)',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center gap-6">
        {data.map((item, index) => (
          <button
            key={item.name}
            onClick={() => setActiveIndex(index)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              activeIndex === index 
                ? 'bg-[#1f2937] scale-105' 
                : 'hover:bg-[#1f2937]/50'
            }`}
          >
            <span 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[#f8fafc] text-sm font-medium">{item.name}</span>
            <span className="text-[#9ca3af] text-sm">{item.value}%</span>
          </button>
        ))}
      </div>
    </div>
  );
}
