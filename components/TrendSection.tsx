"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, BarChart3, Activity, Brain, Sparkles } from "lucide-react";
import TrendChart from "@/components/trends/TrendChart";

export default function TrendSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#E0F7FA] py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#00A99D]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#4A90E2]/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-sm border border-white/50">
            <Brain className="w-4 h-4 text-[#00A99D]" />
            <span className="text-[#00A99D] text-sm font-semibold tracking-wide uppercase">AI-Powered Analytics</span>
            <Sparkles className="w-4 h-4 text-[#F5A623]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4 tracking-tight">
            Understand Market{" "}
            <span className="relative inline-block">
              <span className="text-gradient-primary">Trends</span>
              <TrendingUp className="absolute -right-8 -top-2 w-6 h-6 text-[#00A99D] animate-bounce" />
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Select different time periods and get AI-powered insights on market volatility and trends
          </p>
        </div>

        {/* Stats Row */}
        <div className={`grid grid-cols-3 gap-4 mb-10 ${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
          {[
            { label: "Historical Data", value: "10Y+", icon: BarChart3 },
            { label: "Year Selection", value: "Custom", icon: Activity },
            { label: "AI Analysis", value: "Grok", icon: Brain },
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className="w-6 h-6 text-[#00A99D] mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-2xl font-bold text-[#111827]">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Chart Card */}
        <div className={`bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 ${isVisible ? 'animate-scale-in animation-delay-300' : 'opacity-0'}`}>
          <TrendChart />
        </div>
      </div>
    </section>
  );
}
