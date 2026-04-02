export default function InputField({ icon: Icon, endAdornment, className = "", ...props }) {
  return (
    <div className={`relative group ${className}`}>
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted group-focus-within:text-white transition-colors duration-150">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <input
        className={`w-full bg-[#111827] text-white text-sm rounded-xl py-3 border border-white/10 outline-none transition-colors duration-150 focus:border-primary focus:bg-[#1f2937] placeholder-text-muted/50 ${
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
