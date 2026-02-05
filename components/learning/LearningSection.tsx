"use client";

import { useState } from "react";
import LiteracyCard from "./LiteracyCard";

export default function LearningSection() {
  const [explanation, setExplanation] = useState("");

  return (
    <section className="bg-[#F4F6F8] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-[#111827] text-2xl font-bold text-center mb-10">
          Learn Financial Concepts
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT CARD */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <LiteracyCard onExplain={setExplanation} />
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <h4 className="text-lg font-semibold text-[#111827] mb-2">
              Explanation
            </h4>

            <p className="text-[#1F2937] leading-relaxed">
              {explanation || "AI-powered explanation will appear here."}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
