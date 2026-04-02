import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import Button from "./ui/Button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-base border-b border-border-subtle">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Sparkles className="w-5 h-5 text-text-muted group-hover:text-white transition-colors" />
          <span className="text-lg font-semibold tracking-tight text-white">Asktronaut</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" className="px-4 py-2">Login</Button>
          </Link>
          <Link to="/signup">
             <Button variant="primary" className="px-4 py-2">Sign up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
