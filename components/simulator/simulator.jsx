"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Info, TrendingUp, Shield, Clock, AlertCircle, CheckCircle } from "lucide-react";
import LiteracyCard from "@/components/simulator/LiteracyCard";

export default function Simulator() {
  // Slider states
  const [monthlySIP, setMonthlySIP] = useState(5000);
  const [equity, setEquity] = useState(50);
  const [gold, setGold] = useState(30);
  const [bonds, setBonds] = useState(20);
  const [years, setYears] = useState(10);

  // Toggle state
  const [includeInflation, setIncludeInflation] = useState(false);

  // Literacy popup state
  const [showLiteracy, setShowLiteracy] = useState(false);

  // Expected annual returns (historical averages)
  const RETURNS = {
    equity: 0.12, // 12% annual return
    gold: 0.08,   // 8% annual return
    bonds: 0.07,  // 7% annual return
  };

  // Inflation rate
  const INFLATION_RATE = 0.06; // 6% annual inflation

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Allocation total
  const allocationTotal = equity + gold + bonds;

  // Smart allocation adjustment - when one slider changes, adjust others proportionally
  const handleAllocationChange = (type, newValue) => {
    const remaining = 100 - newValue;
    
    if (type === "equity") {
      const otherTotal = gold + bonds;
      if (otherTotal === 0) {
        setEquity(newValue);
        setGold(remaining / 2);
        setBonds(remaining / 2);
      } else {
        setEquity(newValue);
        setGold(Math.round((gold / otherTotal) * remaining));
        setBonds(Math.round((bonds / otherTotal) * remaining));
      }
    } else if (type === "gold") {
      const otherTotal = equity + bonds;
      if (otherTotal === 0) {
        setGold(newValue);
        setEquity(remaining / 2);
        setBonds(remaining / 2);
      } else {
        setGold(newValue);
        setEquity(Math.round((equity / otherTotal) * remaining));
        setBonds(Math.round((bonds / otherTotal) * remaining));
      }
    } else if (type === "bonds") {
      const otherTotal = equity + gold;
      if (otherTotal === 0) {
        setBonds(newValue);
        setEquity(remaining / 2);
        setGold(remaining / 2);
      } else {
        setBonds(newValue);
        setEquity(Math.round((equity / otherTotal) * remaining));
        setGold(Math.round((gold / otherTotal) * remaining));
      }
    }
  };

  // Calculate estimated future value using SIP formula
  const calculations = useMemo(() => {
    // Weighted average return based on allocation
    const weightedReturn = 
      (equity / 100) * RETURNS.equity +
      (gold / 100) * RETURNS.gold +
      (bonds / 100) * RETURNS.bonds;

    // Adjust for inflation if enabled
    const effectiveReturn = includeInflation 
      ? weightedReturn - INFLATION_RATE 
      : weightedReturn;

    // Monthly rate
    const monthlyRate = effectiveReturn / 12;
    const totalMonths = years * 12;

    // SIP Future Value Formula: P * [((1 + r)^n - 1) / r] * (1 + r)
    let futureValue;
    if (monthlyRate === 0) {
      futureValue = monthlySIP * totalMonths;
    } else {
      futureValue = monthlySIP * 
        (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    }

    // Total invested
    const totalInvested = monthlySIP * totalMonths;

    // Gains
    const totalGains = futureValue - totalInvested;

    // Risk calculation based on equity percentage
    let riskLevel, riskColor, riskDescription;
    if (equity >= 70) {
      riskLevel = "High";
      riskColor = "text-red-600";
      riskDescription = "Aggressive growth";
    } else if (equity >= 40) {
      riskLevel = "Moderate";
      riskColor = "text-amber-600";
      riskDescription = "Balanced portfolio";
    } else {
      riskLevel = "Low";
      riskColor = "text-green-600";
      riskDescription = "Conservative approach";
    }

    return {
      futureValue: Math.round(futureValue),
      totalInvested,
      totalGains: Math.round(totalGains),
      weightedReturn: (weightedReturn * 100).toFixed(1),
      effectiveReturn: (effectiveReturn * 100).toFixed(1),
      riskLevel,
      riskColor,
      riskDescription,
    };
  }, [monthlySIP, equity, gold, bonds, years, includeInflation]);

  return (
    <div className="bg-gray-50">
      <main className="max-w-4xl mx-auto p-4 md:p-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Monthly SIP Slider */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Monthly Investment (SIP)
              </h2>
              <motion.span
                key={monthlySIP}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-teal-600"
              >
                {formatCurrency(monthlySIP)}
              </motion.span>
            </div>
            <input
              type="range"
              min="1000"
              max="50000"
              step="500"
              value={monthlySIP}
              onChange={(e) => setMonthlySIP(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-teal"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>{formatCurrency(1000)}</span>
              <span>{formatCurrency(50000)}</span>
            </div>
          </motion.div>

          {/* Asset Allocation Sliders */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Asset Allocation
              </h2>
              <button
                onClick={() => setShowLiteracy(true)}
                className="flex items-center gap-1 text-teal-600 hover:text-teal-700 transition-colors"
              >
                <Info className="w-4 h-4" />
                <span className="text-sm font-medium">Learn</span>
              </button>
            </div>

            {/* Allocation Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Total Allocation</span>
                <span
                  className={`font-medium ${
                    allocationTotal === 100 ? "text-green-600" : "text-amber-600"
                  }`}
                >
                  {allocationTotal}%
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden flex">
                <motion.div
                  animate={{ width: `${equity}%` }}
                  className="bg-teal-500 h-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <motion.div
                  animate={{ width: `${gold}%` }}
                  className="bg-amber-400 h-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <motion.div
                  animate={{ width: `${bonds}%` }}
                  className="bg-blue-400 h-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
              <div className="flex gap-4 mt-2 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-teal-500 rounded-full" />
                  Equity
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-amber-400 rounded-full" />
                  Gold
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-blue-400 rounded-full" />
                  Bonds
                </span>
              </div>
            </div>

            {/* Individual Sliders */}
            <div className="space-y-5">
              {/* Equity Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium">Equity</span>
                    <span className="text-xs text-gray-400">(12% avg return)</span>
                  </div>
                  <motion.span
                    key={equity}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-teal-600 font-semibold"
                  >
                    {equity}%
                  </motion.span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={equity}
                  onChange={(e) => handleAllocationChange("equity", Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-teal"
                />
              </div>

              {/* Gold Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium">Gold</span>
                    <span className="text-xs text-gray-400">(8% avg return)</span>
                  </div>
                  <motion.span
                    key={gold}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-amber-500 font-semibold"
                  >
                    {gold}%
                  </motion.span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={gold}
                  onChange={(e) => handleAllocationChange("gold", Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-gold"
                />
              </div>

              {/* Bonds Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium">Bonds</span>
                    <span className="text-xs text-gray-400">(7% avg return)</span>
                  </div>
                  <motion.span
                    key={bonds}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-blue-500 font-semibold"
                  >
                    {bonds}%
                  </motion.span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={bonds}
                  onChange={(e) => handleAllocationChange("bonds", Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                />
              </div>
            </div>

            {/* Allocation Status */}
            {allocationTotal !== 100 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span className="text-sm text-amber-700">
                  Total allocation is {allocationTotal}%. Adjust sliders to reach 100%.
                </span>
              </motion.div>
            )}
            {allocationTotal === 100 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-700">
                  Perfect! Your allocation totals 100%.
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* Time Horizon Slider */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Investment Duration
              </h2>
              <motion.span
                key={years}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-teal-600"
              >
                {years} {years === 1 ? "Year" : "Years"}
              </motion.span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-teal"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </motion.div>

          {/* Inflation Toggle */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Include Inflation
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Adjust returns for 6% annual inflation
                </p>
              </div>
              <button
                onClick={() => setIncludeInflation(!includeInflation)}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                  includeInflation ? "bg-teal-600" : "bg-gray-300"
                }`}
              >
                <motion.div
                  animate={{ x: includeInflation ? 24 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                />
              </button>
            </div>
            {includeInflation && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-xs text-teal-600 mt-3 bg-teal-50 p-2 rounded-lg"
              >
                Values shown in today&apos;s purchasing power
              </motion.p>
            )}
          </motion.div>

          

          {/* Result Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Estimated Value Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-5 shadow-lg text-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-teal-100 font-medium">Future Value</span>
              </div>
              <motion.p 
                key={calculations.futureValue}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold"
              >
                {formatCurrency(calculations.futureValue)}
              </motion.p>
              <p className="text-sm text-teal-100 mt-1">
                After {years} {years === 1 ? "year" : "years"}
                {includeInflation && " (inflation-adjusted)"}
              </p>
              <div className="mt-3 pt-3 border-t border-white/20 flex justify-between text-sm">
                <span className="text-teal-100">Invested: {formatCurrency(calculations.totalInvested)}</span>
                <span className="text-white font-medium">Gains: {formatCurrency(calculations.totalGains)}</span>
              </div>
            </motion.div>

            {/* Risk Level Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-gray-600 font-medium">Risk Level</span>
              </div>
              <motion.p 
                key={calculations.riskLevel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-2xl font-bold ${calculations.riskColor}`}
              >
                {calculations.riskLevel}
              </motion.p>
              <p className="text-sm text-gray-500 mt-1">{calculations.riskDescription}</p>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Expected return: <span className="font-semibold text-gray-700">{calculations.effectiveReturn}% p.a.</span>
                </p>
              </div>
            </motion.div>

            {/* Summary Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-600 font-medium">Investment Summary</span>
              </div>
              <motion.p 
                key={years}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold text-gray-800"
              >
                {years} {years === 1 ? "Year" : "Years"}
              </motion.p>
              <p className="text-sm text-gray-500 mt-1">
                {years <= 3 ? "Short-term" : years <= 7 ? "Medium-term" : "Long-term"} investment
              </p>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Monthly SIP: <span className="font-semibold text-gray-700">{formatCurrency(monthlySIP)}</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Literacy Popup */}
      <LiteracyCard
        isOpen={showLiteracy}
        onClose={() => setShowLiteracy(false)}
        title="Asset Allocation"
        content="Asset allocation is how you divide your investments among different asset classes like stocks (equity), gold, and bonds. A good mix helps balance risk and returns based on your financial goals."
      />

      {/* Custom Slider Styles */}
      <style jsx global>{`
        .slider-teal::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0d9488;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(13, 148, 136, 0.4);
        }
        .slider-teal::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0d9488;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(13, 148, 136, 0.4);
        }
        .slider-gold::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(245, 158, 11, 0.4);
        }
        .slider-gold::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(245, 158, 11, 0.4);
        }
        .slider-blue::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
        }
        .slider-blue::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </div>
  );
}
