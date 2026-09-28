export default function CustomerFilters({ query, setQuery, status, setStatus, onAdd }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or email"
        className="flex-1 border rounded px-3 py-2 bg-white"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded px-3 py-2 bg-white">
        {["All", "Active", "Inactive", "Pending"].map((s) => <option key={s}>{s}</option>)}
      </select>
      <button onClick={onAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
        Add customer
      </button>
    </div>
  );
}
