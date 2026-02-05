"use client";

import { useState, useEffect } from "react";

export default function RiskRing() {
  const [progress, setProgress] = useState(0);
  const targetProgress = 70;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < targetProgress) {
        setProgress(prev => Math.min(prev + 1, targetProgress));
      }
    }, 20);
    return () => clearTimeout(timer);
  }, [progress]);

  const circumference = 2 * Math.PI * 56;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getRiskLevel = (value) => {
    if (value < 30) return { label: "Low Risk", color: "#00A99D" };
    if (value < 70) return { label: "Moderate Risk", color: "#F5A623" };
    return { label: "High Risk", color: "#ef4444" };
  };

  const risk = getRiskLevel(progress);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Ring */}
      <div className="relative w-48 h-48">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          {/* Background circle */}
          <circle 
            cx="64" 
            cy="64" 
            r="56" 
            stroke="#1f2937" 
            strokeWidth="12" 
            fill="none" 
          />
          {/* Progress circle with gradient */}
          <defs>
            <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00A99D" />
              <stop offset="50%" stopColor="#F5A623" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="url(#riskGradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ 
              transition: 'stroke-dashoffset 0.3s ease-out',
              filter: 'drop-shadow(0 0 10px rgba(245, 166, 35, 0.5))'
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-[#f8fafc]">{progress}%</span>
          <span className="text-[#9ca3af] text-sm mt-1">Risk Score</span>
        </div>
      </div>

      {/* Risk Level Badge */}
      <div 
        className="px-4 py-2 rounded-full text-sm font-medium"
        style={{ 
          backgroundColor: `${risk.color}20`,
          color: risk.color
        }}
      >
        {risk.label}
      </div>

      {/* Risk Breakdown */}
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[#9ca3af] text-sm">Market Risk</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-[#1f2937] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#00A99D] to-[#F5A623] rounded-full transition-all duration-500"
                style={{ width: '65%' }}
              />
            </div>
            <span className="text-[#f8fafc] text-sm font-medium">65%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#9ca3af] text-sm">Volatility</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-[#1f2937] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#00A99D] to-[#4A90E2] rounded-full transition-all duration-500"
                style={{ width: '45%' }}
              />
            </div>
            <span className="text-[#f8fafc] text-sm font-medium">45%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#9ca3af] text-sm">Diversification</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-[#1f2937] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#00A99D] rounded-full transition-all duration-500"
                style={{ width: '80%' }}
              />
            </div>
            <span className="text-[#f8fafc] text-sm font-medium">80%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
