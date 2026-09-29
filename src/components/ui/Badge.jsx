const styles = {
  Active: "bg-green-100 text-green-700",
  Completed: "bg-green-100 text-green-700",
  Inactive: "bg-gray-200 text-gray-600",
  Pending: "bg-amber-100 text-amber-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function Badge({ status }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}
