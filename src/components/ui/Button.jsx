const variants = {
  primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
  outline: "border border-gray-300 hover:bg-slate-50 text-slate-700",
  ghost: "text-indigo-600 hover:underline px-0 py-0",
};

export default function Button({ variant = "primary", className = "", children, ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
