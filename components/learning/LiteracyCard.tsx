"use client";

import { useState } from "react";

export default function LiteracyCard({
  onExplain,
}: {
  onExplain: (text: string) => void;
}) {
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);

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
      console.log("API response:", data); 
      onExplain(data.explanation);
    } catch {
      onExplain("Error fetching explanation.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h3 className="text-xl font-semibold text-[#111827] mb-4">
        Understand Financial Terms
      </h3>

      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Try ETF, SIP, Diversification"
        className="
          w-full
          border border-gray-300
          rounded-lg
          px-4 py-3
          text-[#111827]
          placeholder:text-gray-500
          focus:ring-2
          focus:ring-[#00A99D]
          outline-none
          mb-4
        "
      />

      {/* ✅ EXPLAIN BUTTON */}
      <button
        onClick={handleExplain}
        className="
          bg-[#00A99D]
          text-white
          px-5 py-2
          rounded-lg
          hover:opacity-90
          transition
        "
      >
        {loading ? "Explaining..." : "Explain"}
      </button>
    </>
  );
}
