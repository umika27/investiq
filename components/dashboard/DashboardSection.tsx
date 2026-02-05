"use client";

import { useEffect, useRef, useState } from "react";
import { PieChart, Shield, Sparkles, Loader2 } from "lucide-react";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

interface AllocationData {
  name: string;
  value: number;
  color: string;
}

const renderActiveShape = (props: {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: { name: string };
  percent: number;
  value: number;
}) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: 'drop-shadow(0 0 10px rgba(0, 169, 157, 0.5))' }}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 14}
        fill={fill}
      />
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#f8fafc" className="text-lg font-bold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 15} textAnchor="middle" fill="#9ca3af" className="text-sm">
        {`${value}%`}
      </text>
    </g>
  );
};

export default function DashboardSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Asset allocation state
  const [equity, setEquity] = useState(50);
  const [gold, setGold] = useState(30);
  const [bonds, setBonds] = useState(20);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // AI analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");

  const allocationData: AllocationData[] = [
    { name: "Equity", value: equity, color: "#00A99D" },
    { name: "Gold", value: gold, color: "#F5A623" },
    { name: "Bonds", value: bonds, color: "#4A90E2" },
  ];

  const totalAllocation = equity + gold + bonds;

  // Calculate risk score based on allocation
  const getRiskScore = () => {
    // Higher equity = higher risk
    const equityRisk = equity * 1.0;
    const goldRisk = gold * 0.5;
    const bondsRisk = bonds * 0.3;
    return Math.min(100, Math.round((equityRisk + goldRisk + bondsRisk) / 1.8));
  };

  const riskScore = getRiskScore();

  const getRiskLevel = (score: number) => {
    if (score < 35) return { label: "Low Risk", color: "#00A99D" };
    if (score < 65) return { label: "Moderate Risk", color: "#F5A623" };
    return { label: "High Risk", color: "#ef4444" };
  };

  const risk = getRiskLevel(riskScore);

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

  const analyzeWithAI = async () => {
    if (totalAllocation !== 100) {
      setAiAnalysis("Please ensure total allocation equals 100% before analysis.");
      return;
    }

    setIsAnalyzing(true);
    setAiAnalysis("");

    try {
      const res = await fetch('/api/risk-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ equity, gold, bonds, totalAllocation }),
      });

      if (!res.ok) throw new Error('Failed to get analysis');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullResponse += chunk;
          setAiAnalysis(fullResponse);
        }
      }
    } catch (error) {
      setAiAnalysis("Unable to get AI analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSliderChange = (type: 'equity' | 'gold' | 'bonds', value: number) => {
    const others = type === 'equity' ? gold + bonds : type === 'gold' ? equity + bonds : equity + gold;
    const maxValue = 100 - (100 - others - value < 0 ? others : 0);
    const newValue = Math.min(value, maxValue);
    
    if (type === 'equity') setEquity(newValue);
    else if (type === 'gold') setGold(newValue);
    else setBonds(newValue);
    
    // Clear AI analysis when allocation changes
    setAiAnalysis("");
  };

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
            Customize your asset allocation and get AI-powered risk assessment
          </p>
        </div>

        {/* Main Grid */}
        <div className={`grid lg:grid-cols-2 gap-8 mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Asset Allocation Card */}
          <div className="glass rounded-3xl p-8 border border-[#374151]/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4A90E2]/20 to-[#00A99D]/20 flex items-center justify-center">
                <PieChart className="w-6 h-6 text-[#4A90E2]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#f8fafc]">Asset Allocation</h3>
                <p className="text-sm text-[#9ca3af]">Drag sliders to customize</p>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="mb-6">
              <ResponsiveContainer width="100%" height={220}>
                <RechartsPie>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    {allocationData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        style={{ 
                          filter: index === activeIndex ? 'brightness(1.2)' : 'brightness(1)',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </Pie>
                </RechartsPie>
              </ResponsiveContainer>
            </div>

            {/* Allocation Total */}
            <div className="flex justify-between items-center mb-4 px-1">
              <span className="text-[#9ca3af] text-sm">Total Allocation</span>
              <span className={`font-bold ${totalAllocation === 100 ? 'text-[#00A99D]' : 'text-[#F5A623]'}`}>
                {totalAllocation}%
              </span>
            </div>

            {/* Sliders */}
            <div className="space-y-5">
              {[
                { name: "Equity", value: equity, setter: (v: number) => handleSliderChange('equity', v), color: "#00A99D" },
                { name: "Gold", value: gold, setter: (v: number) => handleSliderChange('gold', v), color: "#F5A623" },
                { name: "Bonds", value: bonds, setter: (v: number) => handleSliderChange('bonds', v), color: "#4A90E2" },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[#f8fafc] text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-sm" style={{ color: item.color }}>{item.value}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={item.value}
                    onChange={(e) => item.setter(Number(e.target.value))}
                    className="w-full h-2 bg-[#1f2937] rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${item.color} ${item.value}%, #1f2937 ${item.value}%)`
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Risk Assessment Card */}
          <div className="glass rounded-3xl p-8 border border-[#374151]/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00A99D]/20 to-[#F5A623]/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#00A99D]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#f8fafc]">Risk Assessment</h3>
                <p className="text-sm text-[#9ca3af]">AI-powered analysis</p>
              </div>
            </div>

            {/* Risk Ring */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r="52" stroke="#1f2937" strokeWidth="10" fill="none" />
                  <defs>
                    <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00A99D" />
                      <stop offset="50%" stopColor="#F5A623" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    stroke="url(#riskGradient)"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${riskScore * 3.27} 327`}
                    style={{ transition: 'stroke-dasharray 0.5s ease-out' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-[#f8fafc]">{riskScore}%</span>
                  <span className="text-[#9ca3af] text-xs mt-1">Risk Score</span>
                </div>
              </div>
              <div 
                className="mt-4 px-4 py-2 rounded-full text-sm font-medium"
                style={{ backgroundColor: `${risk.color}20`, color: risk.color }}
              >
                {risk.label}
              </div>
            </div>

            {/* AI Analysis Button */}
            <button
              onClick={analyzeWithAI}
              disabled={isAnalyzing || totalAllocation !== 100}
              className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                totalAllocation === 100
                  ? 'bg-gradient-to-r from-[#00A99D] to-[#00B8A9] text-[#0a0f1a] hover:shadow-lg hover:shadow-[#00A99D]/30'
                  : 'bg-[#1f2937] text-[#6b7280] cursor-not-allowed'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Get AI Risk Analysis
                </>
              )}
            </button>

            {/* AI Analysis Result */}
            {aiAnalysis && (
              <div className="mt-4 p-4 bg-[#1f2937] rounded-xl border border-[#374151]/50">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#00A99D]" />
                  <span className="text-[#00A99D] text-sm font-medium">AI Analysis</span>
                </div>
                <p className="text-[#e5e7eb] text-sm leading-relaxed">{aiAnalysis}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
