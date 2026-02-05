"use client";

import { useState, useEffect, useRef } from "react";
import LiteracyCard from "./LiteracyCard";
import { BookOpen, Sparkles, Brain, Lightbulb } from "lucide-react";

export default function LearningSection() {
  const [explanation, setExplanation] = useState("");
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
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#00A99D]/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-[#4A90E2]/5 blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-[#00A99D]/20">
            <BookOpen className="w-4 h-4 text-[#00A99D]" />
            <span className="text-[#9ca3af] text-sm font-medium">Financial Education</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#f8fafc] mb-4">
            Learn <span className="text-gradient">Financial Concepts</span>
          </h2>
          <p className="text-[#9ca3af] text-lg max-w-xl mx-auto">
            Master investing terminology with AI-powered explanations tailored to your level
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* LEFT CARD - Input */}
          <div className="group glass rounded-3xl p-8 hover-lift border border-[#374151]/50 hover:border-[#00A99D]/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00A99D]/20 to-[#4A90E2]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-[#00A99D]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#f8fafc]">
                  Understand Financial Terms
                </h3>
                <p className="text-sm text-[#9ca3af]">Ask anything about investing</p>
              </div>
            </div>
            <LiteracyCard onExplain={setExplanation} />
          </div>

          {/* RIGHT CARD - Explanation */}
          <div className="group glass rounded-3xl p-8 hover-lift border border-[#374151]/50 hover:border-[#F5A623]/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F5A623]/20 to-[#00A99D]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6 text-[#F5A623]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#f8fafc]">
                  AI Explanation
                </h3>
                <p className="text-sm text-[#9ca3af]">Clear, simple breakdowns</p>
              </div>
            </div>

            <div className="min-h-[200px] relative">
              {explanation ? (
                <div className="animate-fade-in-up">
                  <p className="text-[#e5e7eb] leading-relaxed text-lg">
                    {explanation}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px] text-center">
                  <div className="w-16 h-16 rounded-full bg-[#1f2937] flex items-center justify-center mb-4 animate-bounce-subtle">
                    <Sparkles className="w-8 h-8 text-[#F5A623]" />
                  </div>
                  <p className="text-[#9ca3af]">
                    AI-powered explanation will appear here
                  </p>
                  <p className="text-[#6b7280] text-sm mt-2">
                    Try entering a term like ETF, SIP, or Diversification
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
