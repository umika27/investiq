"use client";
import { Sparkles, TrendingUp, Shield } from "lucide-react";

export default function HeroSection() {
  return (
    <main className="bg-[#F4F6F8] text-[#333333]">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00A99D] via-[#00B8A9] to-[#00A99D] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#F5A623]/10 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-[#4A90E2]/10 blur-2xl animate-float-slow" />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
          <path 
            d="M0,100 Q250,50 500,100 T1000,100" 
            fill="none" 
            stroke="white" 
            strokeWidth="2"
            className="animate-wave"
          />
          <path 
            d="M0,200 Q250,150 500,200 T1000,200" 
            fill="none" 
            stroke="white" 
            strokeWidth="1.5"
            className="animate-wave-delayed"
          />
        </svg>
      </div>
      
      <div className="relative z-10 text-center px-6">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
          <Sparkles className="w-4 h-4 text-[#F5A623]" />
          <span className="text-white/90 text-sm font-medium">Smart investing for everyone</span>
        </div>
        
        {/* Main title with staggered animation */}
        <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight animate-fade-in-up animation-delay-100">
          Invest<span className="text-[#F5A623]">IQ</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-xl mx-auto font-light animate-fade-in-up animation-delay-200">
          Learn how investing works while you invest
        </p>
        
        {/* Stats row */}
        <div className="flex items-center justify-center gap-8 mb-12 animate-fade-in-up animation-delay-300">
          <div className="flex items-center gap-2 text-white/80">
            <TrendingUp className="w-5 h-5 text-[#F5A623]" />
            <span className="text-sm">Real-time insights</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/30" />
          <div className="flex items-center gap-2 text-white/80">
            <Shield className="w-5 h-5 text-[#4A90E2]" />
            <span className="text-sm">Risk-free learning</span>
          </div>
        </div>
        
        <div className="animate-fade-in-up animation-delay-400">
          <button 
            className="group bg-white text-[#00A99D] hover:bg-white/95 px-12 py-7 text-lg font-semibold rounded-full shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all duration-300 hover:scale-105"
          >
            Get Started
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-scroll-dot" />
        </div>
      </div>
      </section>
    </main>
  );
}