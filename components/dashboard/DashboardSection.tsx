import PortfolioPie from "./PortfolioPie";
import RiskRing from "./RiskRing";
import InsightCard from "./InsightCard";

export default function DashboardSection() {
  return (
    <section className="bg-[#F4F6F8] py-20">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-[#111827] text-2xl font-bold text-center mb-10">
          Investment Overview
        </h2>

        {/* Top row */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="text-[#111827] bg-white rounded-2xl p-6 shadow-sm">
            <PortfolioPie />
          </div>

          <div className="text-[#111827] bg-white rounded-2xl p-6 shadow-sm">
            <RiskRing />
          </div>
        </div>

        {/* Insight */}
        <div className="text-[#111827] grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <InsightCard title="High Equity Exposure" description="Strong equity allocation." />
        <InsightCard title="Stable Allocation" description="Gold & bonds add stability." />
        <InsightCard title="Diversified Portfolio" description="Well balanced assets." />
      </div>

      </div>
    </section>
  );
}
