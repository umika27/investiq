"use client";

import { useState } from "react";

export default function InsightCard({ title, description, icon: Icon, color, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient on hover */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />
      
      {/* Icon */}
      <div className={`relative w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
        {Icon && <Icon className="w-6 h-6 text-white" />}
      </div>

      {/* Content */}
      <h3 className="relative font-bold text-lg text-[#111827] mb-2 group-hover:text-[#00A99D] transition-colors duration-300">
        {title}
      </h3>
      <p className="relative text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>

      {/* Arrow indicator */}
      <div className={`absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#00A99D]/10 flex items-center justify-center transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`}>
        <svg className="w-4 h-4 text-[#00A99D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
