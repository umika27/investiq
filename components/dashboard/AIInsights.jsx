"use client";

import { Sparkles, Lightbulb, TrendingUp, Shield, Loader2 } from "lucide-react";

export default function AIInsights({ riskData, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-[#00A99D]" />
          <span className="text-gray-600 font-medium">AI is analyzing your portfolio...</span>
        </div>
      </div>
    );
  }

  if (!riskData) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">Customize your allocation and click "Get AI Risk Assessment"</p>
          <p className="text-sm text-gray-400 mt-1">to receive personalized insights</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[#F5A623] to-[#FF8C00] rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#111827]">AI Insights</h3>
          <p className="text-sm text-gray-500">Personalized recommendations from Grok AI</p>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Assessment Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <h4 className="font-semibold text-[#111827]">Portfolio Assessment</h4>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {riskData.assessment}
          </p>
        </div>

        {/* Recommendation Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-amber-600" />
            </div>
            <h4 className="font-semibold text-[#111827]">Recommendation</h4>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {riskData.recommendation}
          </p>
        </div>
      </div>

      {/* Risk Summary Bar */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#00A99D]/10 to-[#4A90E2]/10 rounded-2xl border border-[#00A99D]/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#00A99D]" />
            <span className="font-medium text-[#111827]">Risk Profile:</span>
            <span className={`font-bold ${
              riskData.riskLevel === "Low" ? "text-green-600" :
              riskData.riskLevel === "Moderate" ? "text-amber-600" : "text-red-600"
            }`}>
              {riskData.riskLevel}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Market: <strong className="text-blue-600">{riskData.marketRisk}%</strong></span>
            <span>Credit: <strong className="text-amber-600">{riskData.creditRisk}%</strong></span>
            <span>Liquidity: <strong className="text-teal-600">{riskData.liquidityRisk}%</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
