import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-text-primary selection:bg-primary/30 selection:text-white font-sans">
      <Navbar />
      <HeroSection />
    </div>
  );
}
