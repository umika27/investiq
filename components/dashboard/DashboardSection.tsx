"use client";

import { useEffect, useRef, useState } from "react";
import { PieChart, CircleDot, Zap, Shield, Layers } from "lucide-react";
import PortfolioPie from "./PortfolioPie";
import RiskRing from "./RiskRing";
import InsightCard from "./InsightCard";

export default function DashboardSection() {
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

  const insights = [
    { 
      title: "High Equity Exposure", 
      description: "Strong equity allocation for growth potential.",
      icon: Zap,
      color: "from-blue-500 to-blue-600"
    },
    { 
      title: "Stable Allocation", 
      description: "Gold & bonds add stability to your portfolio.",
      icon: Shield,
      color: "from-amber-500 to-amber-600"
    },
    { 
      title: "Diversified Portfolio", 
      description: "Well balanced assets reduce overall risk.",
      icon: Layers,
      color: "from-teal-500 to-teal-600"
    },
  ];

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-b from-white to-[#F4F6F8] py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #00A99D 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-[#4A90E2]/10 px-4 py-2 rounded-full mb-4">
            <PieChart className="w-4 h-4 text-[#4A90E2]" />
            <span className="text-[#4A90E2] text-sm font-semibold tracking-wide uppercase">Portfolio Analytics</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4 tracking-tight">
            Investment{" "}
            <span className="relative inline-block">
              <span className="text-gradient-primary">Overview</span>
              <CircleDot className="absolute -right-6 top-0 w-5 h-5 text-[#F5A623] animate-pulse" />
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Track your portfolio allocation and understand your risk profile
          </p>
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div 
            className={`group text-[#111827] bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#4A90E2]/30 hover-lift ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}
          >
            <PortfolioPie />
          </div>

          <div 
            className={`group text-[#111827] bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#00A99D]/30 hover-lift ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
          >
            <RiskRing />
          </div>
        </div>

        {/* Insights Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 ${isVisible ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'}`}>
          {insights.map((insight, index) => (
            <InsightCard 
              key={insight.title}
              title={insight.title} 
              description={insight.description}
              icon={insight.icon}
              color={insight.color}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
