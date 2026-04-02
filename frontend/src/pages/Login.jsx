import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import LoginCard from "../components/LoginCard";

import BackgroundWrapper from "../components/ui/BackgroundWrapper";

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
    <div className="min-h-screen bg-base flex flex-col relative font-sans">
      <BackgroundWrapper />
      <Navbar />
      
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
