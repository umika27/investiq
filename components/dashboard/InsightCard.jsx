"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function InsightCard({ title, description, icon: Icon, gradientColor, bgColor, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100 hover:shadow-xl hover:shadow-black/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient background on hover */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />
      
      {/* Icon */}
      <div className={`relative w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
        {Icon && (
          <Icon 
            className={`w-6 h-6 bg-gradient-to-br ${gradientColor} bg-clip-text`}
            style={{ 
              color: gradientColor.includes('emerald') ? '#10B981' : 
                     gradientColor.includes('amber') ? '#F59E0B' : '#3B82F6'
            }}
          />
        )}
      </div>

      {/* Content */}
      <h3 className="relative font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
        {title}
      </h3>
      <p className="relative text-sm text-gray-500 group-hover:text-gray-600 transition-colors leading-relaxed">
        {description}
      </p>

      {/* Learn more link */}
      <div className={`relative flex items-center gap-1 mt-4 text-sm font-medium transition-all duration-300 ${
        isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
      }`} style={{ 
        color: gradientColor.includes('emerald') ? '#10B981' : 
               gradientColor.includes('amber') ? '#F59E0B' : '#3B82F6'
      }}>
        <span>Learn more</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>

      {/* Corner decoration */}
      <div 
        className={`absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-10 transition-all duration-500 blur-xl`}
      />
    </div>
  );
}
