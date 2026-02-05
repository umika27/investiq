"use client";

import { useState } from "react";
import { Search, Loader2, ArrowRight } from "lucide-react";

export default function LiteracyCard({
  onExplain,
}: {
  onExplain: (text: string) => void;
}) {
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = ["ETF", "SIP", "Diversification", "Mutual Fund", "Index"];

  async function handleExplain() {
    if (!term) return;

    setLoading(true);
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term }),
      });

      const data = await res.json();
      onExplain(data.explanation);
    } catch {
      onExplain("Error fetching explanation.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className={`relative transition-all duration-300 ${isFocused ? 'transform scale-[1.02]' : ''}`}>
        <div className={`absolute inset-0 bg-gradient-to-r from-[#00A99D] to-[#4A90E2] rounded-2xl blur-md opacity-0 transition-opacity duration-300 ${isFocused ? 'opacity-30' : ''}`} />
        <div className="relative flex items-center">
          <Search className={`absolute left-4 w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-[#00A99D]' : 'text-gray-400'}`} />
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => e.key === 'Enter' && handleExplain()}
            placeholder="Search any financial term..."
            className="
              w-full
              bg-gray-50
              border-2 border-gray-100
              rounded-2xl
              pl-12 pr-4 py-4
              text-[#111827]
              text-lg
              placeholder:text-gray-400
              focus:border-[#00A99D]
              focus:bg-white
              outline-none
              transition-all
              duration-300
            "
          />
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-500 mr-1">Try:</span>
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setTerm(suggestion)}
            className="px-3 py-1.5 bg-gray-100 hover:bg-[#00A99D]/10 hover:text-[#00A99D] text-gray-600 text-sm rounded-full transition-all duration-300 hover:scale-105"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Explain Button */}
      <button
        onClick={handleExplain}
        disabled={loading || !term}
        className={`
          group
          w-full
          bg-gradient-to-r from-[#00A99D] to-[#008a7d]
          hover:from-[#008a7d] hover:to-[#007a6d]
          disabled:from-gray-300 disabled:to-gray-400
          text-white
          px-6 py-4
          rounded-2xl
          font-semibold
          text-lg
          shadow-lg
          shadow-[#00A99D]/25
          hover:shadow-xl
          hover:shadow-[#00A99D]/30
          disabled:shadow-none
          transition-all
          duration-300
          flex
          items-center
          justify-center
          gap-3
          ${!loading && term ? 'hover:scale-[1.02]' : ''}
        `}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <span>Get Explanation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </>
        )}
      </button>
    </div>
  );
}
