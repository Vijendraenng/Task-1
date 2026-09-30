export default function SortableHeader({ label, sortKey, currentSort, onSort }) {
  const active = currentSort.key === sortKey;
  return (
    <th
      scope="col"
      aria-sort={active ? (currentSort.order === "asc" ? "ascending" : "descending") : "none"}
      className="px-4 py-2 font-medium whitespace-nowrap"
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className="inline-flex items-center gap-1 select-none hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
      >
        {label}
        {active && <span aria-hidden>{currentSort.order === "asc" ? "▲" : "▼"}</span>}
      </button>
    </th>
  );
}
