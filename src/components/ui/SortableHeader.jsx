export default function SortableHeader({ label, sortKey, currentSort, onSort }) {
  const active = currentSort.key === sortKey;
  return (
    <th
      onClick={() => onSort(sortKey)}
      className="px-4 py-2 font-medium cursor-pointer select-none whitespace-nowrap hover:text-slate-700"
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {active && <span aria-hidden>{currentSort.order === "asc" ? "▲" : "▼"}</span>}
      </span>
    </th>
  );
}
