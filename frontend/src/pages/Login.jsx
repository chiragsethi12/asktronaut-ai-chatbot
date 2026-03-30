import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import LoginCard from "../components/LoginCard";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await loginAPI(form);
      login(data);
      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col relative overflow-hidden font-sans">
      <Navbar />
      
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-[#0a0a0f] to-[#0a0a0f] z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full mix-blend-screen filter blur-[150px] opacity-60 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
      <div className="starfield opacity-50 z-0" />

      <main className="flex-1 flex items-center justify-center px-6 pt-20 relative z-10 w-full">
        <LoginCard 
          form={form} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
          loading={loading} 
          error={error} 
        />
      </main>
    </div>
  );
}
