"use client";

import { useState } from "react";
import { Search, Sparkles, Loader2 } from "lucide-react";

export default function LiteracyCard({
  onExplain,
}: {
  onExplain: (text: string) => void;
}) {
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = ["ETF", "SIP", "Diversification", "Mutual Fund", "P/E Ratio"];

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

  const handleSuggestionClick = (suggestion: string) => {
    setTerm(suggestion);
  };

  return (
    <div className="space-y-4">
      {/* Input Field */}
      <div className={`relative transition-all duration-300 ${isFocused ? 'transform scale-[1.02]' : ''}`}>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]">
          <Search className="w-5 h-5" />
        </div>
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => e.key === 'Enter' && handleExplain()}
          placeholder="Enter a financial term..."
          className="
            w-full
            bg-[#1f2937]
            border-2 border-[#374151]
            rounded-xl
            pl-12 pr-4 py-4
            text-[#f8fafc]
            placeholder:text-[#6b7280]
            focus:border-[#00A99D]
            focus:ring-2
            focus:ring-[#00A99D]/20
            outline-none
            transition-all
            duration-300
          "
        />
        {isFocused && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <kbd className="px-2 py-1 text-xs bg-[#374151] text-[#9ca3af] rounded">Enter</kbd>
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            className="px-3 py-1.5 text-sm bg-[#1f2937] text-[#9ca3af] rounded-lg border border-[#374151] hover:border-[#00A99D]/50 hover:text-[#00A99D] transition-all duration-200 hover:scale-105"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Explain Button */}
      <button
        onClick={handleExplain}
        disabled={loading || !term}
        className="
          w-full
          group
          relative
          bg-gradient-to-r from-[#00A99D] to-[#00D4C8]
          text-[#0a0f1a]
          px-6 py-4
          rounded-xl
          font-semibold
          text-lg
          hover:shadow-lg
          hover:shadow-[#00A99D]/30
          disabled:opacity-50
          disabled:cursor-not-allowed
          transition-all
          duration-300
          hover:scale-[1.02]
          overflow-hidden
        "
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Explain with AI
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-[#00D4C8] to-[#00A99D] opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}
