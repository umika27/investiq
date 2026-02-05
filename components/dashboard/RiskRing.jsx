"use client";

export default function RiskRing() {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center">
      <h2 className="font-semibold mb-4">Risk Level</h2>
      <div className="relative w-32 h-32">
        <svg className="w-full h-full rotate-[-90deg]">
          <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="10" fill="none" />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="#14b8a6"
            strokeWidth="10"
            fill="none"
            strokeDasharray="351"
            strokeDashoffset="105"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-bold">
          70%
        </div>
      </div>
      <p className="mt-2 text-sm">Moderate Risk</p>
    </div>
  );
}
