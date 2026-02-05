import TrendChart from "@/components/trends/TrendChart";

export default function TrendSection() {
  return (
    <section className="bg-[#E0F7FA] py-20">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-[#111827] text-2xl font-bold text-center mb-10">
          Understand Market Trends
        </h2>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <TrendChart />
        </div>

      </div>
    </section>
  );
}
