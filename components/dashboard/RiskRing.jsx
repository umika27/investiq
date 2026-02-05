"use client";

import { useState, useEffect } from "react";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

export default function RiskRing() {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const targetProgress = 70;

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= targetProgress) {
            clearInterval(interval);
            return targetProgress;
          }
          return prev + 1;
        });
      }, 20);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const circumference = 2 * Math.PI * 56;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getRiskLevel = (value) => {
    if (value < 40) return { label: "Low Risk", color: "#00A99D", icon: CheckCircle, bg: "bg-green-50" };
    if (value < 70) return { label: "Moderate Risk", color: "#F5A623", icon: AlertTriangle, bg: "bg-amber-50" };
    return { label: "High Risk", color: "#EF4444", icon: AlertTriangle, bg: "bg-red-50" };
  };

  const risk = getRiskLevel(targetProgress);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00A99D] to-[#4A90E2] rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Risk Assessment</h2>
            <p className="text-sm text-gray-500">Portfolio risk score</p>
          </div>
        </div>
      </div>

      {/* Ring Chart */}
      <div 
        className="relative w-48 h-48 mx-auto cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow effect */}
        <div 
          className={`absolute inset-4 rounded-full transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            background: `radial-gradient(circle, ${risk.color}20 0%, transparent 70%)`,
          }}
        />
        
        <svg className="w-full h-full rotate-[-90deg]">
          {/* Background circle */}
          <circle 
            cx="96" 
            cy="96" 
            r="56" 
            stroke="#e5e7eb" 
            strokeWidth="12" 
            fill="none"
            className="transition-all duration-300"
          />
          {/* Progress circle */}
          <circle
            cx="96"
            cy="96"
            r="56"
            stroke={risk.color}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-out"
            style={{
              filter: isHovered ? `drop-shadow(0 0 8px ${risk.color}80)` : 'none'
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span 
            className="text-4xl font-bold transition-all duration-300"
            style={{ color: risk.color }}
          >
            {progress}%
          </span>
          <span className="text-sm text-gray-500 mt-1">Risk Score</span>
        </div>
      </div>

      {/* Risk Label */}
      <div className={`${risk.bg} rounded-2xl p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <risk.icon className="w-6 h-6" style={{ color: risk.color }} />
          <div>
            <p className="font-semibold text-[#111827]">{risk.label}</p>
            <p className="text-sm text-gray-600">Balanced growth potential</p>
          </div>
        </div>
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${risk.color}20` }}
        >
          <span className="text-sm font-bold" style={{ color: risk.color }}>{targetProgress}</span>
        </div>
      </div>

      {/* Risk Breakdown */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Market", value: 25, color: "#4A90E2" },
          { label: "Credit", value: 15, color: "#F5A623" },
          { label: "Liquidity", value: 30, color: "#00A99D" },
        ].map((item) => (
          <div key={item.label} className="text-center p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
            <div className="text-lg font-bold" style={{ color: item.color }}>{item.value}%</div>
            <div className="text-xs text-gray-500">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
