export default function GlassCard({ children, className = "" }) {
  return (
    <div className={`relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-lg ${className}`}>
      {children}
    </div>
  );
}
