"use client";

import { useState } from "react";

export default function InsightCard({ icon, iconColor = "#00A99D", title, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative glass rounded-2xl p-6 hover-lift border border-[#374151]/50 hover:border-[#00A99D]/30 transition-all duration-500 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${iconColor}10 0%, transparent 70%)`,
        }}
      />
      
      {/* Shimmer effect on hover */}
      <div className={`absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative z-10">
        {/* Icon with animation */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
          style={{ 
            backgroundColor: `${iconColor}15`,
            boxShadow: isHovered ? `0 0 20px ${iconColor}30` : 'none',
          }}
        >
          <span style={{ color: iconColor }} className="transition-transform duration-300 group-hover:scale-110">
            {icon}
          </span>
        </div>

        {/* Title with gradient on hover */}
        <h4 
          className="text-lg font-bold mb-2 transition-all duration-300"
          style={{ 
            color: isHovered ? iconColor : '#f8fafc',
          }}
        >
          {title}
        </h4>

        {/* Description */}
        <p className="text-[#9ca3af] text-sm leading-relaxed group-hover:text-[#d1d5db] transition-colors duration-300">
          {description}
        </p>

        {/* Bottom accent line */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] transition-all duration-500 ease-out"
          style={{ 
            width: isHovered ? '100%' : '0%',
            backgroundColor: iconColor,
            boxShadow: `0 0 10px ${iconColor}`,
          }}
        />
      </div>

      {/* Corner decoration */}
      <div 
        className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${iconColor}10 50%)`,
        }}
      />
    </div>
  );
}
