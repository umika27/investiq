import Simulator from "./simulator";

export default function SimulatorSection() {
  return (
    <section className="bg-[#FFFFFF] py-20">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-[#111827] text-2xl font-bold text-center mb-10">
          Interactive Investment Simulator
        </h2>

        <div className="bg-[#F4F6F8] rounded-2xl p-8 shadow-sm">
          <Simulator />
        </div>

      </div>
    </section>
  );
}
