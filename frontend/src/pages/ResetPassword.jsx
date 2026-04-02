import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { resetPasswordAPI } from "../services/api";
import { Lock } from "lucide-react";
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

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.newPassword.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }
    if (form.newPassword !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);

    try {
      await resetPasswordAPI(token, form.newPassword);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000); // redirect to login securely
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired token.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-base flex flex-col items-center justify-center relative overflow-hidden px-6 py-12">
        <div className="w-full max-w-sm mx-auto text-center">
          <AuthLogo />
          <h2 className="text-2xl font-bold text-white mb-3">Password Reset!</h2>
          <p className="text-text-muted text-sm mb-6">
            Your password has been successfully updated.
          </p>
          <Link to="/login">
            <Button className="w-full py-3.5" variant="primary">
              Go to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-center relative overflow-hidden px-6 py-12">
      <div className="w-full max-w-md animate-fade-up">
        <Card className="p-8 sm:p-10">
          <AuthLogo />

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
              Reset Password
            </h2>
            <p className="text-text-muted text-sm">
              Please enter your new password below.
            </p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] font-medium text-text-secondary mb-2">
                New Password
              </label>
              <InputField
                icon={Lock}
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-text-secondary mb-2">
                Confirm Password
              </label>
              <InputField
                icon={Lock}
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5"
            >
              {loading ? "Updating…" : "Reset Password"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
