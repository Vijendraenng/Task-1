const variants = {
  primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
  outline: "border border-gray-300 hover:bg-slate-50 text-slate-700",
  ghost: "text-indigo-600 hover:underline px-0 py-0",
};

export default function Button({ variant = "primary", type = "button", className = "", children, ...props }) {
  return (
    <button
      type={type}
      {...props}
      className={`px-4 py-2 rounded font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
