"use client";

import { useState, useEffect, useRef } from "react";
import { BookOpen, Sparkles, Brain, Lightbulb } from "lucide-react";
import LiteracyCard from "./LiteracyCard";

export default function LearningSection() {
  const [explanation, setExplanation] = useState("");
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
    <section ref={sectionRef} className="bg-gradient-to-b from-[#F4F6F8] to-white py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-[#00A99D]/10 px-4 py-2 rounded-full mb-4">
            <Brain className="w-4 h-4 text-[#00A99D]" />
            <span className="text-[#00A99D] text-sm font-semibold tracking-wide uppercase">Financial Education</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4 tracking-tight">
            Learn Financial{" "}
            <span className="text-gradient-primary">Concepts</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Master the fundamentals of investing with our AI-powered learning tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT CARD */}
          <div 
            className={`group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#00A99D]/30 hover-lift ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00A99D] to-[#4A90E2] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#111827]">Term Explorer</h3>
                <p className="text-sm text-gray-500">Search any financial term</p>
              </div>
            </div>
            <LiteracyCard onExplain={setExplanation} />
          </div>

          {/* RIGHT CARD */}
          <div 
            className={`group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#F5A623]/30 hover-lift ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F5A623] to-[#FF8C00] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#111827]">AI Explanation</h3>
                <p className="text-sm text-gray-500">Powered by advanced AI</p>
              </div>
            </div>

            <div className="relative min-h-[200px]">
              {explanation ? (
                <div className="animate-fade-in-up">
                  <div className="flex items-start gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-1" />
                    <p className="text-[#1F2937] leading-relaxed text-lg">{explanation}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px] text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">Your AI-powered explanation</p>
                  <p className="text-gray-400 text-sm mt-1">will appear here</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
