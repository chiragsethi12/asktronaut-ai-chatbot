import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import Button from "./ui/Button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#05070d]/80 border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors duration-300">Asktronaut</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="px-5 py-2.5">Log in</Button>
          </Link>
          <Link to="/signup">
             <Button variant="primary" className="px-5 py-2.5 text-[#05070d] font-semibold">Sign up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
