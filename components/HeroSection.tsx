"use client";
import { useState, useEffect, useMemo } from "react";
import { Sparkles, TrendingUp, Shield, ArrowRight, ChevronDown, Zap, BarChart3, Users } from "lucide-react";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Generate particle positions only after mounting to avoid hydration mismatch
  const particles = useMemo(() => {
    if (!isMounted) return [];
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
    }));
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="bg-[#0a0f1a] text-[#f8fafc]">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0f1729] to-[#0a1628]">
          {/* Animated gradient orbs */}
          <div 
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00A99D]/20 blur-[100px] animate-float"
            style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#F5A623]/10 blur-[120px] animate-float-delayed"
            style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
          />
          <div 
            className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-[#4A90E2]/15 blur-[80px] animate-float-slow"
          />
          
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}
          />

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-1 h-1 bg-[#00A99D]/40 rounded-full animate-float"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Animated Badge */}
          <div 
            className={`inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full mb-8 border border-[#00A99D]/30 animate-border-glow transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Sparkles className="w-4 h-4 text-[#F5A623] animate-bounce-subtle" />
            <span className="text-[#f8fafc]/90 text-sm font-medium tracking-wide">Smart investing for everyone</span>
            <div className="w-2 h-2 rounded-full bg-[#00A99D] animate-pulse" />
          </div>
          
          {/* Main Title with gradient text */}
          <h1 
            className={`text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span className="text-gradient">Invest</span>
            <span className="text-gradient-gold animate-text-glow">IQ</span>
          </h1>
          
          {/* Subtitle with typing effect styling */}
          <p 
            className={`text-xl md:text-2xl lg:text-3xl text-[#9ca3af] mb-10 max-w-2xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Learn how investing works{" "}
            <span className="text-gradient-animated font-medium">while you invest</span>
          </p>
          
          {/* Interactive Stats Row */}
          <div 
            className={`flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="group flex items-center gap-3 glass px-5 py-3 rounded-xl hover-lift cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-[#00A99D]/20 flex items-center justify-center group-hover:bg-[#00A99D]/30 transition-colors">
                <TrendingUp className="w-5 h-5 text-[#00A99D] group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left">
                <span className="block text-sm text-[#9ca3af]">Real-time</span>
                <span className="block text-[#f8fafc] font-medium">Market Insights</span>
              </div>
            </div>
            
            <div className="group flex items-center gap-3 glass px-5 py-3 rounded-xl hover-lift cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-[#4A90E2]/20 flex items-center justify-center group-hover:bg-[#4A90E2]/30 transition-colors">
                <Shield className="w-5 h-5 text-[#4A90E2] group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left">
                <span className="block text-sm text-[#9ca3af]">Risk-free</span>
                <span className="block text-[#f8fafc] font-medium">Learning</span>
              </div>
            </div>
            
            <div className="group flex items-center gap-3 glass px-5 py-3 rounded-xl hover-lift cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-[#F5A623]/20 flex items-center justify-center group-hover:bg-[#F5A623]/30 transition-colors">
                <Zap className="w-5 h-5 text-[#F5A623] group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left">
                <span className="block text-sm text-[#9ca3af]">AI-Powered</span>
                <span className="block text-[#f8fafc] font-medium">Education</span>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <button 
              className="group relative bg-gradient-to-r from-[#00A99D] to-[#00D4C8] text-[#0a0f1a] px-10 py-5 text-lg font-semibold rounded-2xl shadow-2xl shadow-[#00A99D]/30 hover:shadow-[#00A99D]/50 transition-all duration-300 hover:scale-105 animate-pulse-glow overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D4C8] to-[#00A99D] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <button 
              className="group glass px-8 py-5 text-lg font-medium rounded-2xl text-[#f8fafc] hover-lift border border-[#374151] hover:border-[#00A99D]/50 transition-all"
            >
              <span className="flex items-center gap-2">
                Watch Demo
                <BarChart3 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </button>
          </div>
          
          {/* Social Proof */}
          <div 
            className={`mt-16 flex flex-col items-center gap-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00A99D] to-[#4A90E2] border-2 border-[#0a0f1a] flex items-center justify-center text-sm font-medium"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-[#1f2937] border-2 border-[#0a0f1a] flex items-center justify-center">
                <Users className="w-4 h-4 text-[#9ca3af]" />
              </div>
            </div>
            <p className="text-[#9ca3af] text-sm">
              Join <span className="text-[#00A99D] font-semibold">10,000+</span> investors learning smarter
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 cursor-pointer group">
            <span className="text-xs text-[#9ca3af] group-hover:text-[#00A99D] transition-colors">Explore</span>
            <div className="w-8 h-12 border-2 border-[#374151] group-hover:border-[#00A99D]/50 rounded-full flex justify-center pt-2 transition-colors">
              <div className="w-1.5 h-3 bg-[#00A99D] rounded-full animate-scroll-dot" />
            </div>
            <ChevronDown className="w-5 h-5 text-[#9ca3af] group-hover:text-[#00A99D] transition-colors" />
          </div>
        </div>
      </section>
    </main>
  );
}
