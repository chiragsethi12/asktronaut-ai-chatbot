import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "./ui/Button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center animate-fade-up">
        
        <h1 className="text-5xl md:text-6xl font-semibold text-white tracking-tight leading-tight mb-6">
          Explore the Universe of AI <br className="hidden md:block" />
          <span className="text-primary mt-2 block">with Asktronaut</span>
        </h1>
        
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
          Smart conversations. Context-aware responses. Your premium AI assistant. 
          Experience the next generation of conversational intelligence.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full sm:w-auto px-8 py-3 text-base">
              Get Started
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto px-8 py-3 text-base">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
