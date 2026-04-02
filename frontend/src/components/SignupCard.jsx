import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { signupAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import Card from "./ui/Card";

export default function SignupCard() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await signupAPI(form);
      login(data);
      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md animate-fade-up">
      <Card className="p-8 sm:p-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h2>
          <p className="text-text-muted text-sm">Join Asktronaut for free.</p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-text-secondary mb-1.5">Full Name</label>
            <InputField
              icon={User}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              required
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-text-secondary mb-1.5">Email Address</label>
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
            <label className="block text-[13px] font-medium text-text-secondary mb-1.5">Password</label>
            <InputField
              icon={Lock}
              type={showPw ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
              required
              minLength={6}
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
            className="w-full mt-4 py-3.5"
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border-subtle text-center">
          <p className="text-text-muted text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-white font-medium hover:text-primary transition-colors duration-200">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
