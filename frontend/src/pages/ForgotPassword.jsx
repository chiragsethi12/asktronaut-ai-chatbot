import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPasswordAPI } from "../services/api";
import { Mail } from "lucide-react";
import Card from "../components/ui/Card";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";

function AuthLogo() {
  return (
    <div className="flex items-center gap-2.5 mb-8 justify-center">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L14.5 9H9.5L12 2Z" fill="#3b82f6" opacity="0.9" />
        <rect x="9" y="8" width="6" height="8" rx="1" fill="#3b82f6" opacity="0.7" />
        <path d="M9 13L6 17H9V13Z" fill="#3b82f6" opacity="0.5" />
        <path d="M15 13L18 17H15V13Z" fill="#3b82f6" opacity="0.5" />
        <circle cx="12" cy="11" r="1.5" fill="#05070d" />
        <rect x="10.5" y="16" width="3" height="2" rx="0.5" fill="#3b82f6" opacity="0.4" />
      </svg>
      <span className="text-xl font-bold tracking-tight text-white">Asktronaut</span>
    </div>
  );
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const { data } = await forgotPasswordAPI(email);
      setMessage(data.message || "If an account exists, a reset link has been sent.");
      setEmail("");
    } catch (err) {
      // Intentionally don't reveal if email doesn't exist, just show generic or server error
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-center relative overflow-hidden px-6 py-12">
      <div className="w-full max-w-md animate-fade-up">
        <Card className="p-8 sm:p-10">
          <AuthLogo />

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
              Forgot Password
            </h2>
            <p className="text-text-muted text-sm">
              Enter your email to receive a password reset link.
            </p>
          </div>

          {message && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium text-center">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] font-medium text-text-secondary mb-2">
                Email Address
              </label>
              <InputField
                icon={Mail}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5"
            >
              {loading ? "Sending link…" : "Send Reset Link"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border-subtle text-center">
            <p className="text-text-muted text-sm">
              Remembered your password?{" "}
              <Link to="/login" className="text-white font-medium hover:text-primary transition-colors duration-200">
                Back to login
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
