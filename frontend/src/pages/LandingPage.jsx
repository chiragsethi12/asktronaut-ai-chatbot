import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#05070d] text-white selection:bg-primary/30 selection:text-white font-sans">
      <Navbar />
      <HeroSection />
    </div>
  );
}
