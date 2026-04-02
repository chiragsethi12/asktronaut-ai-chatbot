export default function Button({ children, variant = "primary", className = "", ...props }) {
  const baseClasses = "flex items-center justify-center text-sm font-medium rounded-xl transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dim",
    ghost: "bg-transparent text-text-secondary hover:text-white hover:bg-white/5 border border-transparent",
    outline: "bg-transparent text-text-primary border border-white/10 hover:bg-white/5",
  };

  return (
    <button className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
