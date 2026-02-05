import HeroSection from "@/components/HeroSection";
import LearningSection from "@/components/learning/LearningSection";
import TrendSection from "@/components/TrendSection";
import DashboardSection from "@/components/dashboard/DashboardSection";
import SimulatorSection from "@/components/simulator/SimulatorSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <LearningSection />
      <TrendSection />
      <DashboardSection />
      <SimulatorSection />
      <Footer />
    </main>
  );
}
