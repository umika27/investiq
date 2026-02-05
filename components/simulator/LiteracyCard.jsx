"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Info, Lightbulb, BookOpen, Sparkles } from "lucide-react";

export default function LiteracyCard({ isOpen, onClose, title, content }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header with gradient */}
              <div className="relative bg-gradient-to-r from-[#00A99D] to-[#00B8A9] px-6 py-5 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                      initial={{ rotate: -10 }}
                      animate={{ rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <Lightbulb className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="text-xl font-bold text-white"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {title || "Did You Know?"}
                      </motion.h3>
                      <motion.p 
                        className="text-white/70 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        Financial Insight
                      </motion.p>
                    </div>
                  </div>
                  <motion.button
                    onClick={onClose}
                    className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#00A99D]/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-[#00A99D]" />
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {content ||
                      "Volatility refers to how much an investment's price changes over time. Higher volatility means bigger price swings, which can mean higher potential returns but also higher risk."}
                  </p>
                </motion.div>

                {/* Pro tip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 p-4 bg-gradient-to-r from-[#F5A623]/10 to-[#FFD700]/10 rounded-xl border border-[#F5A623]/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#F5A623]" />
                    <span className="text-sm font-semibold text-[#F5A623]">Pro Tip</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Understanding these concepts helps you make better investment decisions and manage risk effectively.
                  </p>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6">
                <motion.button
                  onClick={onClose}
                  className="w-full py-4 bg-gradient-to-r from-[#00A99D] to-[#00B8A9] text-white font-semibold rounded-xl shadow-lg shadow-[#00A99D]/30 hover:shadow-xl hover:shadow-[#00A99D]/40 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Got it, thanks!
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
