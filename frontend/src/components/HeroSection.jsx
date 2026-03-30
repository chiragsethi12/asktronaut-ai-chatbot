import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "./ui/Button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-[#05070d] to-[#05070d] z-0" />
      
      {/* Decorative blurred blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-screen filter blur-[120px] opacity-30 z-0" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] z-0" />

      {/* Starfield for extra depth */}
      <div className="starfield opacity-50 z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-primary text-sm font-medium mb-8 shadow-glow">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Asktronaut v2.0 is live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight leading-tight mb-6">
          Explore the Universe of AI <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300 filter drop-shadow-[0_0_20px_rgba(0,240,255,0.3)] pb-2">with Asktronaut</span>
        </h1>
        
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
          Smart conversations. Context-aware responses. Your premium AI assistant. 
          Experience the next generation of conversational intelligence.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup" className="w-full sm:w-auto">
            <Button variant="gradient" className="w-full py-4 text-base gap-2 px-8 font-semibold">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button variant="glass" className="w-full py-4 text-base px-8 font-semibold">
              Log in to your account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
