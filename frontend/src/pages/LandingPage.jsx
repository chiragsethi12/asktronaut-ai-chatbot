import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import BackgroundWrapper from "../components/ui/BackgroundWrapper";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-base text-text-primary font-sans relative">
      <BackgroundWrapper />
      <Navbar />
      <HeroSection />
    </div>
  );
}
