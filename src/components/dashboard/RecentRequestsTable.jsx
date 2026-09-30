import { useMemo, useState } from "react";
import Badge from "../ui/Badge";
import Input from "../ui/Input";
import Select from "../ui/Select";
import SortableHeader from "../ui/SortableHeader";
import EmptyState from "../ui/EmptyState";

const STATUS_OPTIONS = ["All", "Pending", "In Progress", "Completed", "Cancelled"];
const COLUMNS = [
  { key: "id", label: "ID" },
  { key: "customer", label: "Customer" },
  { key: "service", label: "Service" },
  { key: "date", label: "Date" },
  { key: "status", label: "Status" },
];

export default function RecentRequestsTable({ requests }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState({ key: "date", order: "desc" });

  const handleSort = (key) =>
    setSort((prev) =>
      prev.key === key ? { key, order: prev.order === "asc" ? "desc" : "asc" } : { key, order: "asc" }
    );

  const visibleRequests = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = requests.filter((r) => {
      const matchesStatus = status === "All" || r.status === status;
      const matchesQuery =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.customer.toLowerCase().includes(q) ||
        r.service.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });

    return [...filtered].sort((a, b) => {
      const dir = sort.order === "asc" ? 1 : -1;
      if (a[sort.key] < b[sort.key]) return -1 * dir;
      if (a[sort.key] > b[sort.key]) return 1 * dir;
      return 0;
    });
  }, [requests, query, status, sort]);

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="font-semibold">Recent service requests</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            aria-label="Search requests by ID, customer or service"
            placeholder="Search ID, customer or service"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="sm:w-64"
          />
          <Select
            aria-label="Filter requests by status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={STATUS_OPTIONS}
            className="sm:w-40"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-gray-500">
            <tr>
              {COLUMNS.map((c) => (
                <SortableHeader key={c.key} label={c.label} sortKey={c.key} currentSort={sort} onSort={handleSort} />
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRequests.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-3 whitespace-nowrap">{r.id}</td>
                <td className="px-4 py-3 max-w-[160px] truncate" title={r.customer}>{r.customer}</td>
                <td className="px-4 py-3 max-w-[160px] truncate" title={r.service}>{r.service}</td>
                <td className="px-4 py-3 whitespace-nowrap">{r.date}</td>
                <td className="px-4 py-3"><Badge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleRequests.length === 0 && (
          <EmptyState
            title="No matching requests"
            message="Try a different search term or status filter."
          />
        )}
      </div>
    </div>
  );
}
