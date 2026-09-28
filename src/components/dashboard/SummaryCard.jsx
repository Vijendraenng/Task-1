export default function SummaryCard({ label, value }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}
