import Badge from "../ui/Badge";

export default function RecentRequestsTable({ requests }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <h2 className="font-semibold p-4 border-b">Recent service requests</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-gray-500">
            <tr>
              {["ID", "Customer", "Service", "Date", "Status"].map((h) => (
                <th key={h} className="px-4 py-2 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-3">{r.id}</td>
                <td className="px-4 py-3">{r.customer}</td>
                <td className="px-4 py-3">{r.service}</td>
                <td className="px-4 py-3">{r.date}</td>
                <td className="px-4 py-3"><Badge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
