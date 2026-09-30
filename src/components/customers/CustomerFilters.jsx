import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

const STATUS_OPTIONS = ["All", "Active", "Inactive", "Pending"];

export default function CustomerFilters({ query, setQuery, status, setStatus, onAdd }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <Input
        aria-label="Search customers by name or email"
        placeholder="Search by name or email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1"
      />
      <Select
        aria-label="Filter customers by status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        options={STATUS_OPTIONS}
        className="sm:w-48"
      />
      <Button onClick={onAdd}>Add customer</Button>
    </div>
  );
}
