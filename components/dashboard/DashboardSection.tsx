"use client";

import { useEffect, useRef, useState } from "react";
import PortfolioPie from "./PortfolioPie";
import RiskRing from "./RiskRing";
import InsightCard from "./InsightCard";
import { PieChart, Lightbulb, Shield, TrendingUp, Coins, BarChart } from "lucide-react";

export default function DashboardSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} className="bg-[#0a0f1a] py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-[#F5A623]/5 blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#00A99D]/5 blur-[120px] animate-float-delayed" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-[#F5A623]/20">
            <PieChart className="w-4 h-4 text-[#F5A623]" />
            <span className="text-[#9ca3af] text-sm font-medium">Portfolio Analytics</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#f8fafc] mb-4">
            Investment <span className="text-gradient-gold">Overview</span>
          </h2>
          <p className="text-[#9ca3af] text-lg max-w-xl mx-auto">
            Track your portfolio performance with intuitive visualizations
          </p>
        </div>

        {/* Top row */}
        <div className={`grid md:grid-cols-2 gap-8 mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Portfolio Pie Card */}
          <div className="group glass rounded-3xl p-8 hover-lift border border-[#374151]/50 hover:border-[#4A90E2]/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4A90E2]/20 to-[#00A99D]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart className="w-6 h-6 text-[#4A90E2]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#f8fafc]">Asset Allocation</h3>
                <p className="text-sm text-[#9ca3af]">Portfolio distribution</p>
              </div>
            </div>
            <PortfolioPie />
          </div>

          {/* Risk Ring Card */}
          <div className="group glass rounded-3xl p-8 hover-lift border border-[#374151]/50 hover:border-[#00A99D]/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00A99D]/20 to-[#F5A623]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-[#00A99D]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#f8fafc]">Risk Assessment</h3>
                <p className="text-sm text-[#9ca3af]">Portfolio risk level</p>
              </div>
            </div>
            <RiskRing />
          </div>
        </div>

        {/* Insight Cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <InsightCard 
            icon={<TrendingUp className="w-5 h-5" />}
            iconColor="#00A99D"
            title="High Equity Exposure" 
            description="Strong equity allocation for long-term growth potential." 
          />
          <InsightCard 
            icon={<Coins className="w-5 h-5" />}
            iconColor="#F5A623"
            title="Stable Allocation" 
            description="Gold & bonds provide stability against market volatility." 
          />
          <InsightCard 
            icon={<Lightbulb className="w-5 h-5" />}
            iconColor="#4A90E2"
            title="Diversified Portfolio" 
            description="Well-balanced assets reduce overall investment risk." 
          />
        </div>
      </div>
    </section>
  );
}
