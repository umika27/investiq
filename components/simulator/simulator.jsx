"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Info, TrendingUp, Shield, Clock } from "lucide-react";
import LiteracyCard from "@/components/simulator/LiteracyCard";

export default function Simulator() {
  // Slider states with dummy values
  const [monthlySIP, setMonthlySIP] = useState(5000);
  const [equity, setEquity] = useState(50);
  const [gold, setGold] = useState(30);
  const [bonds, setBonds] = useState(20);

  // Toggle state
  const [includeInflation, setIncludeInflation] = useState(false);

  // Literacy popup state
  const [showLiteracy, setShowLiteracy] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-teal-600 text-white py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Investment Simulator</h1>
          <p className="text-teal-100 mt-1">Plan your financial future</p>
        </div>
      </header>

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
                  <span className="text-gray-700 font-medium">Equity</span>
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
                  onChange={(e) => setEquity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-teal"
                />
              </div>

              {/* Gold Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium">Gold</span>
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
                  onChange={(e) => setGold(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-gold"
                />
              </div>

              {/* Bonds Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium">Bonds</span>
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
                  onChange={(e) => setBonds(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                />
              </div>
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
                  Adjust returns for inflation impact
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
          </motion.div>

          

          {/* Result Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Estimated Value Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-teal-600" />
                </div>
                <span className="text-gray-600 font-medium">Estimated Value</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(320000)}
              </p>
              <p className="text-sm text-gray-500 mt-1">After 10 years</p>
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
              <p className="text-2xl font-bold text-gray-800">Moderate</p>
              <p className="text-sm text-gray-500 mt-1">Balanced portfolio</p>
            </motion.div>

            {/* Time Horizon Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-600 font-medium">Time Horizon</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">10 Years</p>
              <p className="text-sm text-gray-500 mt-1">Long-term growth</p>
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
