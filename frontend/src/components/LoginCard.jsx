import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import GlassCard from "./ui/GlassCard";

export default function LoginCard({ form, handleChange, handleSubmit, loading, error }) {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="w-full max-w-md relative z-10 animate-fade-up">
      {/* Decorative background glow behind the card */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-dim rounded-[2rem] blur-xl opacity-20 z-0"></div>
      
      <GlassCard className="p-8 sm:p-10">
        <div className="mb-8 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-text-muted text-sm">Sign in to continue your journey.</p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center relative z-10">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-[13px] font-medium text-text-secondary mb-2">Email Address</label>
            <InputField
              icon={Mail}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[13px] font-medium text-text-secondary">Password</label>
              <Link to="/forgot-password" className="text-[12px] text-primary hover:text-primary-light transition-colors duration-200">
                Forgot Password?
              </Link>
            </div>
            <InputField
              icon={Lock}
              type={showPw ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="text-text-muted hover:text-white transition-colors duration-200"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 bg-primary hover:bg-primary-light text-[#05070d] gap-2 shadow-glow hover:shadow-glow-hover"
          >
            {loading ? "Authenticating..." : "Sign In"}
            {!loading && <ArrowRight className="w-4 h-4 text-[#05070d]" />}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center relative z-10">
          <p className="text-text-muted text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-white font-medium hover:text-primary transition-colors duration-200">
              Sign up
            </Link>
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
