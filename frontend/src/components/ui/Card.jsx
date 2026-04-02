export default function Card({ children, className = "" }) {
  return (
    <div className={`relative bg-[#0B0F18] border border-border-subtle rounded-2xl ${className}`}>
      {children}
    </div>
  );
}
