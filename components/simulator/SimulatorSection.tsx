"use client";

import { useRef, useState, useEffect } from "react";
import Simulator from "./simulator";
import { Calculator, Sparkles, Play, ArrowRight } from "lucide-react";

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, threshold]);

  return isInView;
}

export default function SimulatorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef);

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-b from-[#F4F6F8] to-white py-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-20 w-72 h-72 bg-[#00A99D]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-[#F5A623]/5 rounded-full blur-3xl" />
        
        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#00A99D 1px, transparent 1px), linear-gradient(90deg, #00A99D 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00A99D]/10 to-[#4A90E2]/10 px-5 py-2.5 rounded-full mb-6 border border-[#00A99D]/20">
            <Calculator className="w-4 h-4 text-[#00A99D]" />
            <span className="text-[#00A99D] text-sm font-semibold tracking-wide">Interactive Tool</span>
            <Sparkles className="w-4 h-4 text-[#F5A623]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4 tracking-tight">
            Investment{" "}
            <span className="relative inline-block">
              <span className="text-gradient">Simulator</span>
              <Play className="absolute -top-2 -right-8 w-6 h-6 text-[#F5A623] animate-bounce-subtle fill-current" />
            </span>
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            {"Experiment with different investment strategies risk-free. Adjust your allocation and see potential outcomes in real-time."}
          </p>
        </div>

        {/* Feature highlights */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { label: "Real-time calculations", icon: "calculate" },
            { label: "Risk assessment", icon: "shield" },
            { label: "No real money involved", icon: "safe" },
          ].map((feature, i) => (
            <div 
              key={feature.label}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md shadow-black/5 border border-[#E5E7EB]/50"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="w-2 h-2 rounded-full bg-[#00A99D]" />
              <span className="text-sm font-medium text-[#374151]">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* Simulator Container */}
        <div className={`relative transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Decorative frame */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00A99D] via-[#4A90E2] to-[#F5A623] rounded-[2rem] opacity-20 blur-sm" />
          
          <div className="relative bg-white rounded-3xl shadow-2xl shadow-black/10 border border-[#E5E7EB]/50 overflow-hidden">
            <Simulator />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-[#6B7280] mb-4">Want personalized investment advice?</p>
          <button className="magnetic-btn group inline-flex items-center gap-3 bg-gradient-to-r from-[#00A99D] to-[#00B8A9] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-[#00A99D]/30 transition-all duration-300">
            <span>Get Started for Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
