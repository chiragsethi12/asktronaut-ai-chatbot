export default function InputField({ icon: Icon, endAdornment, className = "", ...props }) {
  return (
    <div className={`relative group ${className}`}>
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors duration-300">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <input
        className={`w-full bg-[#05070d]/50 text-white text-sm rounded-xl py-3 border border-white/10 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-white/5 focus:shadow-glow-focus placeholder-text-muted/50 ${
          Icon ? "pl-12" : "pl-4"
        } ${endAdornment ? "pr-11" : "pr-4"}`}
        {...props}
      />
      {endAdornment && (
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
          {endAdornment}
        </div>
      )}
    </div>
  );
}
