"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PieChart, CircleDot, Sparkles, Brain } from "lucide-react";
import PortfolioPie from "./PortfolioPie";
import RiskRing from "./RiskRing";
import AIInsights from "./AIInsights";

export interface Allocation {
  equity: number;
  gold: number;
  bonds: number;
}

export interface RiskAssessment {
  riskScore: number;
  riskLevel: "Low" | "Moderate" | "High";
  assessment: string;
  recommendation: string;
  marketRisk: number;
  creditRisk: number;
  liquidityRisk: number;
}

export default function DashboardSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [allocation, setAllocation] = useState<Allocation>({ equity: 50, gold: 30, bonds: 20 });
  const [riskData, setRiskData] = useState<RiskAssessment | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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

  const analyzeRisk = useCallback(async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/risk-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allocation),
      });

      if (!res.ok) throw new Error('Failed to analyze');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullResponse += decoder.decode(value, { stream: true });
        }
      }

      // Parse JSON from response (handle potential markdown code blocks)
      let jsonStr = fullResponse.trim();
      if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```/g, '');
      }
      
      const data = JSON.parse(jsonStr);
      setRiskData(data);
    } catch (error) {
      console.error('Error analyzing risk:', error);
      // Fallback to calculated risk if AI fails
      const equityWeight = allocation.equity / 100;
      const calculatedRisk = Math.round(equityWeight * 85 + (allocation.gold / 100) * 40 + (allocation.bonds / 100) * 20);
      setRiskData({
        riskScore: calculatedRisk,
        riskLevel: calculatedRisk >= 70 ? "High" : calculatedRisk >= 40 ? "Moderate" : "Low",
        assessment: "Based on your allocation, your portfolio has a balanced risk profile. Equity provides growth potential while gold and bonds offer stability.",
        recommendation: "Consider rebalancing periodically to maintain your target allocation.",
        marketRisk: Math.round(allocation.equity * 0.8),
        creditRisk: Math.round(allocation.bonds * 0.5),
        liquidityRisk: Math.round(allocation.gold * 0.3 + allocation.bonds * 0.4),
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [allocation]);

  // Run initial analysis
  useEffect(() => {
    if (isVisible && !riskData) {
      analyzeRisk();
    }
  }, [isVisible, riskData, analyzeRisk]);

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
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4A90E2]/10 to-[#00A99D]/10 px-4 py-2 rounded-full mb-4 border border-[#4A90E2]/20">
            <Brain className="w-4 h-4 text-[#4A90E2]" />
            <span className="text-[#4A90E2] text-sm font-semibold tracking-wide uppercase">AI-Powered Analytics</span>
            <Sparkles className="w-4 h-4 text-[#F5A623]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4 tracking-tight">
            Investment{" "}
            <span className="relative inline-block">
              <span className="text-gradient-primary">Overview</span>
              <CircleDot className="absolute -right-6 top-0 w-5 h-5 text-[#F5A623] animate-pulse" />
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Customize your portfolio allocation and get AI-powered risk assessment
          </p>
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div 
            className={`group text-[#111827] bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#4A90E2]/30 hover-lift ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}
          >
            <PortfolioPie 
              allocation={allocation} 
              onAllocationChange={setAllocation}
              onAnalyze={analyzeRisk}
              isAnalyzing={isAnalyzing}
            />
          </div>

          <div 
            className={`group text-[#111827] bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#00A99D]/30 hover-lift ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
          >
            <RiskRing 
              riskData={riskData}
              isLoading={isAnalyzing}
            />
          </div>
        </div>

        {/* AI Insights */}
        <div className={`${isVisible ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'}`}>
          <AIInsights 
            riskData={riskData}
            isLoading={isAnalyzing}
          />
        </div>
      </div>
    </section>
  );
}
