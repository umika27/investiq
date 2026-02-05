"use client";

import { useEffect, useRef, useState } from "react";
import TrendChart from "@/components/trends/TrendChart";
import { Activity, BarChart2 } from "lucide-react";

export default function TrendSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [availableYears, setAvailableYears] = useState<string[]>([]);

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
    <section ref={sectionRef} className="bg-gradient-to-b from-[#0a0f1a] to-[#0f1729] py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#00A99D]/5 blur-[120px] animate-float-slow" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#4A90E2]/5 blur-[100px] animate-float-delayed" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-[#4A90E2]/20">
            <Activity className="w-4 h-4 text-[#4A90E2]" />
            <span className="text-[#9ca3af] text-sm font-medium">Market Analysis</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#f8fafc] mb-4">
            Understand <span className="text-gradient">Market Trends</span>
          </h2>
          <p className="text-[#9ca3af] text-lg max-w-xl mx-auto">
            Visualize market movements and get AI-powered insights and learning tips
          </p>
        </div>

        {/* Chart Card */}
        <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="glass rounded-3xl p-8 border border-[#374151]/50">
            {/* Card Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4A90E2]/20 to-[#00A99D]/20 flex items-center justify-center">
                  <BarChart2 className="w-7 h-7 text-[#4A90E2]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#f8fafc]">Market Performance</h3>
                  <p className="text-[#9ca3af]">Select a year to view historical data</p>
                </div>
              </div>
              
              {/* Year filters */}
              <div className="flex items-center gap-2 bg-[#1f2937] p-1 rounded-xl flex-wrap">
                <button
                  onClick={() => setSelectedYear("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedYear === "all"
                      ? 'bg-[#00A99D] text-[#0a0f1a]' 
                      : 'text-[#9ca3af] hover:text-[#f8fafc] hover:bg-[#374151]'
                  }`}
                >
                  All
                </button>
                {availableYears.slice(0, 5).map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedYear === year
                        ? 'bg-[#00A99D] text-[#0a0f1a]' 
                        : 'text-[#9ca3af] hover:text-[#f8fafc] hover:bg-[#374151]'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="bg-[#111827] rounded-2xl p-6">
              <TrendChart 
                selectedYear={selectedYear} 
                onYearsLoaded={setAvailableYears}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
