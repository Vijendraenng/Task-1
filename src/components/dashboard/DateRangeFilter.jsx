const RANGES = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
];

export default function DateRangeFilter({ value, onChange }) {
  return (
    <div className="inline-flex rounded-lg border bg-white p-1 self-start" role="group" aria-label="Date range">
      {RANGES.map((r) => (
        <button
          key={r.value}
          type="button"
          aria-pressed={value === r.value}
          onClick={() => onChange(r.value)}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            value === r.value ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-slate-100"
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
