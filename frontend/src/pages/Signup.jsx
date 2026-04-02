import Navbar from "../components/Navbar";
import SignupCard from "../components/SignupCard";
import BackgroundWrapper from "../components/ui/BackgroundWrapper";

export default function Signup() {
  return (
    <div className="min-h-screen bg-base flex flex-col relative font-sans">
      <BackgroundWrapper />
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-6 pt-20 relative z-10 w-full">
        <SignupCard />
      </main>
    </div>
  );
}
