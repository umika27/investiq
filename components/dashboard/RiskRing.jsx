"use client";

import { useState, useEffect, useRef } from "react";

export default function RiskRing() {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const targetValue = 70;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500;
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setAnimatedValue(targetValue);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible]);

  const circumference = 2 * Math.PI * 56;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  const getRiskColor = (value) => {
    if (value < 40) return { color: "#22C55E", label: "Low Risk", bg: "bg-emerald-500/10" };
    if (value < 70) return { color: "#F59E0B", label: "Moderate Risk", bg: "bg-amber-500/10" };
    return { color: "#EF4444", label: "High Risk", bg: "bg-red-500/10" };
  };

  const risk = getRiskColor(animatedValue);

  return (
    <div ref={ref} className="flex flex-col items-center py-4">
      {/* Ring Container */}
      <div className="relative w-48 h-48 group">
        {/* Glow effect */}
        <div 
          className="absolute inset-4 rounded-full blur-xl opacity-30 transition-opacity duration-500 group-hover:opacity-50"
          style={{ backgroundColor: risk.color }}
        />
        
        {/* SVG Ring */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          {/* Background ring */}
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="#E5E7EB"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress ring */}
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke={risk.color}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 0.5s ease-out, stroke 0.3s ease',
            }}
          />
          {/* Decorative dots */}
          {[0, 25, 50, 75, 100].map((tick, i) => {
            const angle = (tick / 100) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const x = 64 + 56 * Math.cos(rad);
            const y = 64 + 56 * Math.sin(rad);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="2"
                fill={tick <= animatedValue ? risk.color : "#E5E7EB"}
                style={{ transition: 'fill 0.3s ease' }}
              />
            );
          })}
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span 
            className="text-4xl font-bold transition-colors duration-300"
            style={{ color: risk.color }}
          >
            {animatedValue}%
          </span>
          <span className="text-sm text-gray-500 mt-1">Risk Score</span>
        </div>
      </div>

      {/* Risk Label */}
      <div className={`mt-6 px-4 py-2 rounded-full ${risk.bg} transition-all duration-300`}>
        <span 
          className="text-sm font-semibold"
          style={{ color: risk.color }}
        >
          {risk.label}
        </span>
      </div>

      {/* Risk Indicators */}
      <div className="flex items-center gap-4 mt-6">
        {[
          { label: "Low", color: "#22C55E", range: "0-40%" },
          { label: "Medium", color: "#F59E0B", range: "40-70%" },
          { label: "High", color: "#EF4444", range: "70-100%" },
        ].map((level) => (
          <div key={level.label} className="flex items-center gap-2">
            <span 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: level.color }}
            />
            <span className="text-xs text-gray-500">{level.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
