import Navbar from "../components/Navbar";
import SignupCard from "../components/SignupCard";

export default function Signup() {
  return (
    <div className="min-h-screen bg-[#05070d] flex flex-col relative overflow-hidden font-sans">
      <Navbar />
      
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-[#05070d] to-[#05070d] z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full mix-blend-screen filter blur-[150px] opacity-60 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
      <div className="starfield opacity-50 z-0" />

      <main className="flex-1 flex items-center justify-center px-6 pt-20 relative z-10 w-full">
        <SignupCard />
      </main>
    </div>
  );
}
