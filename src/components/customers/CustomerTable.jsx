import Badge from "../ui/Badge";

export default function CustomerTable({ customers, onView }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 text-gray-500">
          <tr>
            {["Name", "Email", "Plan", "Status", ""].map((h) => (
              <th key={h} className="px-4 py-2 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="px-4 py-3 font-medium">{c.name}</td>
              <td className="px-4 py-3">{c.email}</td>
              <td className="px-4 py-3">{c.plan}</td>
              <td className="px-4 py-3"><Badge status={c.status} /></td>
              <td className="px-4 py-3 text-right">
                <button onClick={() => onView(c)} className="text-indigo-600 hover:underline">View</button>
              </td>
            </tr>
          ))}
          {customers.length === 0 && (
            <tr>
              <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                No customers match your search. Clear the filters or add a customer.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
