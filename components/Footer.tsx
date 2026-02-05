"use client";

import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#111827] text-white overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111827] via-[#111827] to-[#0a0f18]" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00A99D]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#4A90E2]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Brand section */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A99D] to-[#00B8A9] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold">
              Invest<span className="text-[#F5A623]">IQ</span>
            </span>
          </div>
          <p className="text-[#9CA3AF] max-w-md leading-relaxed">
            Learn how investing works while you invest. Smart financial education for everyone.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Copyright */}
        <div className="text-center text-[#6B7280] text-sm">
          <span>&copy; 2025 InvestIQ. All rights reserved.</span>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="h-1 bg-gradient-to-r from-[#00A99D] via-[#4A90E2] to-[#F5A623]" />
    </footer>
  );
}
