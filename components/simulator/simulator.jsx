"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, TrendingUp, Shield, Clock, Sparkles, DollarSign, Target, Wallet } from "lucide-react";
import LiteracyCard from "@/components/simulator/LiteracyCard";

function AnimatedNumber({ value, prefix = "", suffix = "" }) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const duration = 500;
    const steps = 30;
    const increment = (value - displayValue) / steps;
    let current = displayValue;
    
    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= value) || (increment < 0 && current <= value)) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="tabular-nums">
      {prefix}{displayValue.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

export default function Simulator() {
  const [monthlySIP, setMonthlySIP] = useState(5000);
  const [equity, setEquity] = useState(50);
  const [gold, setGold] = useState(30);
  const [bonds, setBonds] = useState(20);
  const [includeInflation, setIncludeInflation] = useState(false);
  const [showLiteracy, setShowLiteracy] = useState(false);
  const [activeSlider, setActiveSlider] = useState(null);

  // Calculate estimated returns
  const calculateReturns = () => {
    const years = 10;
    const equityReturn = 0.12;
    const goldReturn = 0.08;
    const bondsReturn = 0.07;
    const inflationRate = 0.06;
    
    const weightedReturn = 
      (equity / 100) * equityReturn + 
      (gold / 100) * goldReturn + 
      (bonds / 100) * bondsReturn;
    
    const realReturn = includeInflation ? weightedReturn - inflationRate : weightedReturn;
    
    // Future value of SIP
    const monthlyRate = realReturn / 12;
    const months = years * 12;
    const futureValue = monthlySIP * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    return Math.round(futureValue);
  };

  const estimatedValue = calculateReturns();
  const totalInvested = monthlySIP * 12 * 10;
  const wealthGained = estimatedValue - totalInvested;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const allocationTotal = equity + gold + bonds;

  const getRiskLevel = () => {
    if (equity > 70) return { level: "High", color: "text-red-500", bg: "bg-red-500/10" };
    if (equity > 40) return { level: "Moderate", color: "text-amber-500", bg: "bg-amber-500/10" };
    return { level: "Conservative", color: "text-emerald-500", bg: "bg-emerald-500/10" };
  };

  const risk = getRiskLevel();

  return (
    <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-[#00A99D] to-[#00B8A9] text-white py-8 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Investment Simulator</h1>
              <p className="text-white/80">Plan your financial future with confidence</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6 -mt-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Monthly SIP Slider */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A99D] to-[#00B8A9] flex items-center justify-center shadow-lg shadow-[#00A99D]/30">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Monthly Investment (SIP)</h2>
                  <p className="text-sm text-gray-500">Set your monthly contribution</p>
                </div>
              </div>
              <motion.div
                key={monthlySIP}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-right"
              >
                <p className="text-3xl font-bold text-[#00A99D]">
                  <AnimatedNumber value={monthlySIP} prefix="₹" />
                </p>
                <p className="text-xs text-gray-400">per month</p>
              </motion.div>
            </div>
            <div className="relative">
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={monthlySIP}
                onChange={(e) => setMonthlySIP(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #00A99D ${(monthlySIP - 1000) / 490}%, #E5E7EB ${(monthlySIP - 1000) / 490}%)`
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-400 mt-3">
              <span>₹1,000</span>
              <span>₹50,000</span>
            </div>
          </motion.div>

          {/* Asset Allocation */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A90E2] to-[#6366F1] flex items-center justify-center shadow-lg shadow-[#4A90E2]/30">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Asset Allocation</h2>
                  <p className="text-sm text-gray-500">Distribute your investments</p>
                </div>
              </div>
              <button
                onClick={() => setShowLiteracy(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00A99D]/10 text-[#00A99D] hover:bg-[#00A99D]/20 transition-colors"
              >
                <Info className="w-4 h-4" />
                <span className="text-sm font-medium">Learn</span>
              </button>
            </div>

            {/* Allocation Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 font-medium">Total Allocation</span>
                <span className={`font-bold ${allocationTotal === 100 ? "text-emerald-500" : "text-amber-500"}`}>
                  {allocationTotal}%
                </span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex shadow-inner">
                <motion.div
                  animate={{ width: `${equity}%` }}
                  className="bg-gradient-to-r from-[#00A99D] to-[#00D4C4] h-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <motion.div
                  animate={{ width: `${gold}%` }}
                  className="bg-gradient-to-r from-[#F5A623] to-[#FFD166] h-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <motion.div
                  animate={{ width: `${bonds}%` }}
                  className="bg-gradient-to-r from-[#4A90E2] to-[#7AB8FF] h-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
              <div className="flex gap-6 mt-3 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-gradient-to-r from-[#00A99D] to-[#00D4C4] rounded-full shadow" />
                  <span className="text-gray-600">Equity</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-gradient-to-r from-[#F5A623] to-[#FFD166] rounded-full shadow" />
                  <span className="text-gray-600">Gold</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-gradient-to-r from-[#4A90E2] to-[#7AB8FF] rounded-full shadow" />
                  <span className="text-gray-600">Bonds</span>
                </span>
              </div>
            </div>

            {/* Individual Sliders */}
            <div className="space-y-6">
              {[
                { name: "Equity", value: equity, setValue: setEquity, color: "#00A99D", gradient: "from-[#00A99D] to-[#00D4C4]" },
                { name: "Gold", value: gold, setValue: setGold, color: "#F5A623", gradient: "from-[#F5A623] to-[#FFD166]" },
                { name: "Bonds", value: bonds, setValue: setBonds, color: "#4A90E2", gradient: "from-[#4A90E2] to-[#7AB8FF]" },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">{item.name}</span>
                    <motion.span
                      key={item.value}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-bold"
                      style={{ color: item.color }}
                    >
                      {item.value}%
                    </motion.span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={item.value}
                    onChange={(e) => item.setValue(Number(e.target.value))}
                    onMouseDown={() => setActiveSlider(item.name)}
                    onMouseUp={() => setActiveSlider(null)}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${item.color} ${item.value}%, #E5E7EB ${item.value}%)`
                    }}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Inflation Toggle */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Include Inflation</h2>
                  <p className="text-sm text-gray-500">Adjust returns for 6% inflation rate</p>
                </div>
              </div>
              <button
                onClick={() => setIncludeInflation(!includeInflation)}
                className={`relative w-16 h-9 rounded-full transition-colors duration-300 ${
                  includeInflation ? "bg-[#00A99D]" : "bg-gray-300"
                }`}
              >
                <motion.div
                  animate={{ x: includeInflation ? 28 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-7 h-7 bg-white rounded-full shadow-md"
                />
              </button>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Estimated Value */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00A99D] to-[#00B8A9] rounded-xl flex items-center justify-center shadow-lg shadow-[#00A99D]/30">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-600 font-medium">Estimated Value</span>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">
                <AnimatedNumber value={estimatedValue} prefix="₹" />
              </p>
              <p className="text-sm text-gray-500">After 10 years</p>
            </motion.div>

            {/* Risk Level */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 ${risk.bg} rounded-xl flex items-center justify-center`}>
                  <Shield className={`w-6 h-6 ${risk.color}`} />
                </div>
                <span className="text-gray-600 font-medium">Risk Level</span>
              </div>
              <p className={`text-3xl font-bold ${risk.color} mb-1`}>{risk.level}</p>
              <p className="text-sm text-gray-500">Based on allocation</p>
            </motion.div>

            {/* Wealth Gained */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-600 font-medium">Wealth Gained</span>
              </div>
              <p className="text-3xl font-bold text-emerald-500 mb-1">
                +<AnimatedNumber value={wealthGained} prefix="₹" />
              </p>
              <p className="text-sm text-gray-500">On ₹{totalInvested.toLocaleString('en-IN')} invested</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Literacy Popup */}
      <LiteracyCard
        isOpen={showLiteracy}
        onClose={() => setShowLiteracy(false)}
        title="Asset Allocation"
        content="Asset allocation is how you divide your investments among different asset classes like stocks (equity), gold, and bonds. A good mix helps balance risk and returns based on your financial goals and risk tolerance."
      />

      {/* Custom Slider Styles */}
      <style jsx global>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15), 0 0 0 3px currentColor;
          border: 3px solid currentColor;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 0 0 4px currentColor;
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 3px solid currentColor;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}
