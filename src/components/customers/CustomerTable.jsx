import Badge from "../ui/Badge";
import EmptyState from "../ui/EmptyState";

export default function CustomerTable({ customers, onView }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 text-gray-500">
          <tr>
            {["Name", "Email", "Plan", "Status", ""].map((h) => (
              <th key={h} className="px-4 py-2 font-medium whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr
              key={c.id}
              onClick={() => onView(c)}
              className="border-t cursor-pointer hover:bg-slate-50"
            >
              <td className="px-4 py-3 font-medium whitespace-nowrap">{c.name}</td>
              <td className="px-4 py-3 whitespace-nowrap">{c.email}</td>
              <td className="px-4 py-3 whitespace-nowrap">{c.plan}</td>
              <td className="px-4 py-3"><Badge status={c.status} /></td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={(e) => { e.stopPropagation(); onView(c); }}
                  className="text-indigo-600 hover:underline"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {customers.length === 0 && (
        <EmptyState
          title="No customers found"
          message="Try a different search term or status filter, or add a new customer."
        />
      )}
    </div>
  );
}
