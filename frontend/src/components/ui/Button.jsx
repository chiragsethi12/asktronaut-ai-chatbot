export default function Button({ children, variant = "primary", className = "", ...props }) {
  const baseClasses = "flex items-center justify-center text-sm font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dim shadow-glow hover:shadow-glow-hover",
    gradient: "bg-gradient-to-r from-primary to-primary-light text-[#05070d] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] shadow-[0_0_15px_rgba(34,211,238,0.3)]",
    glass: "backdrop-blur-md bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:shadow-glow",
    ghost: "bg-transparent text-text-secondary hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
