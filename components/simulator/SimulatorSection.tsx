"use client";

import { useEffect, useRef, useState } from "react";
import { Calculator, Sparkles, Play } from "lucide-react";
import Simulator from "./simulator";

export default function SimulatorSection() {
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
    <section ref={sectionRef} className="relative bg-gradient-to-br from-white via-[#F4F6F8] to-white py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#F5A623]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#00A99D]/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F5A623]/10 to-[#00A99D]/10 px-4 py-2 rounded-full mb-4 border border-[#F5A623]/20">
            <Sparkles className="w-4 h-4 text-[#F5A623]" />
            <span className="text-[#F5A623] text-sm font-semibold tracking-wide uppercase">Interactive Tool</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4 tracking-tight">
            Investment{" "}
            <span className="relative inline-block">
              <span className="text-gradient-gold">Simulator</span>
              <Calculator className="absolute -right-10 top-0 w-8 h-8 text-[#F5A623] animate-bounce" />
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            Experiment with different investment strategies and see projected outcomes
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {["Real-time Calculations", "Risk Analysis", "No Real Money"].map((feature) => (
              <span 
                key={feature}
                className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#00A99D]/30 transition-all duration-300"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Simulator Card */}
        <div className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 ${isVisible ? 'animate-scale-in animation-delay-300' : 'opacity-0'}`}>
          {/* Top Bar */}
          <div className="bg-gradient-to-r from-[#00A99D] to-[#4A90E2] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <div className="w-3 h-3 rounded-full bg-white/30" />
              </div>
              <span className="text-white/90 font-medium hidden sm:block">Investment Simulator</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <Play className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Live Mode</span>
            </div>
          </div>
          
          {/* Simulator Content */}
          <div className="p-0">
            <Simulator />
          </div>
        </div>
      </div>
    </section>
  );
}
